import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isOriginAllowed, processContactForm, reportError } from "@/core/services/ContactService";
import { checkContactRateLimit } from "@/core/services/RateLimitService";
import {
  contactSchema,
  formatZodErrors,
  isFormTimestampValid,
} from "@/core/services/ValidationService";
import { createLogger } from "@/core/services/LoggerService";
import { getErrorMessage } from "@/utils/errors";
import {
  badRequest,
  tooManyRequests,
  forbidden,
  serverError,
  ok,
} from "@/core/services/ErrorsService";

export async function POST(request: NextRequest) {
  const log = createLogger(request);

  try {
    const origin = request.headers.get("origin");
    if (!origin || !isOriginAllowed(origin)) {
      if (origin) {
        log.warn("Origin not allowed", { origin });
        return forbidden("Origin not allowed");
      }
    }

    const rate = await checkContactRateLimit(request);
    if (!rate.allowed) {
      const retryAfterSec = Math.max(1, Math.ceil((rate.reset - Date.now()) / 1000));
      log.warn("Rate limit exceeded", { retryAfter: retryAfterSec });
      return tooManyRequests(retryAfterSec);
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      log.warn("Invalid JSON body");
      return badRequest("Invalid JSON in request body");
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = formatZodErrors(parsed.error);
      log.warn("Validation failed", { errors });
      return badRequest("Validation failed", errors);
    }

    const { name, email, message, fax, website, formTimestamp } = parsed.data;

    if (fax || website) {
      log.warn("Honeypot detected — request discarded");
      return ok({ success: true });
    }

    const tsCheck = isFormTimestampValid(formTimestamp);
    if (!tsCheck.valid) {
      log.warn("Invalid timestamp", { reason: tsCheck.reason });
      return badRequest(tsCheck.reason ?? "Invalid timestamp");
    }

    log.info("Processing contact message", { name, email, messageLength: message.length });

    const result = await processContactForm({ name, email, message, fax, website, formTimestamp });

    const hasAnySuccess = result.db || result.email || result.telegram;

    if (!hasAnySuccess) {
      log.error("All services failed", result.warnings.join(", "), { errorLog: result.warnings });
      return serverError("Could not process the message in any service", result.warnings);
    }

    log.response(200, { db: result.db, email: result.email, telegram: result.telegram });
    return ok({
      db: result.db,
      email: result.email,
      telegram: result.telegram,
      warnings: result.warnings.length > 0 ? result.warnings : undefined,
    });
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    log.error("Unhandled fatal error", message);
    reportError(err);
    return serverError("Unexpected server error. Please try again.", [message]);
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || !isOriginAllowed(origin)) {
    return forbidden("Origin not allowed");
  }
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, Accept",
    },
  });
}
