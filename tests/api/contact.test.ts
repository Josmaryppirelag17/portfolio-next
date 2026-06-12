import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ContactFormData, ContactResult } from "@/core/services/ContactService";
import type { RateLimitResult } from "@/core/services/RateLimitService";

const mockIsOriginAllowed = vi.fn();
const mockProcessContactForm = vi.fn();
const mockReportError = vi.fn();
const mockCheckContactRateLimit = vi.fn();
const mockContactSchemaSafeParse = vi.fn();
const mockFormatZodErrors = vi.fn();
const mockIsFormTimestampValid = vi.fn();
const mockCreateLogger = vi.fn();

vi.mock("@/core/services/ContactService", () => ({
  isOriginAllowed: mockIsOriginAllowed,
  processContactForm: mockProcessContactForm,
  reportError: mockReportError,
}));

vi.mock("@/core/services/RateLimitService", () => ({
  checkContactRateLimit: mockCheckContactRateLimit,
}));

vi.mock("@/core/services/ValidationService", () => ({
  contactSchema: { safeParse: mockContactSchemaSafeParse },
  formatZodErrors: mockFormatZodErrors,
  isFormTimestampValid: mockIsFormTimestampValid,
}));

vi.mock("@/core/services/LoggerService", () => ({
  createLogger: mockCreateLogger,
}));

vi.mock("next/server", () => ({
  NextRequest: class extends Request {},
  NextResponse: class extends Response {
    static json(data: unknown, init?: ResponseInit) {
      const headers: Record<string, string> = {
        "content-type": "application/json",
      };
      if (init?.headers) {
        for (const [k, v] of new Headers(init.headers).entries()) {
          headers[k] = v;
        }
      }
      return new Response(JSON.stringify(data), {
        status: init?.status ?? 200,
        headers,
      });
    }
  },
}));

const { POST, OPTIONS } = await import("@/app/api/contact/route");

function makeLogger() {
  return {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    response: vi.fn(),
  };
}

function makeRequest(body: unknown, origin = "https://josmarypirela.dev"): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body),
  });
}

describe("api/contact (POST)", () => {
  const validData: ContactFormData = {
    name: "Test User",
    email: "test@example.com",
    message: "Hello there",
    fax: "",
    website: "",
    formTimestamp: Date.now(),
  };

  const validRateLimit: RateLimitResult = {
    allowed: true,
    limit: 10,
    remaining: 9,
    reset: Date.now() + 3600000,
    skipped: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateLogger.mockReturnValue(makeLogger());
    mockIsOriginAllowed.mockReturnValue(true);
    mockCheckContactRateLimit.mockResolvedValue(validRateLimit);
    mockContactSchemaSafeParse.mockReturnValue({ success: true, data: validData });
    mockIsFormTimestampValid.mockReturnValue({ valid: true });
    mockProcessContactForm.mockResolvedValue({
      db: true,
      email: true,
      telegram: false,
      warnings: [],
    } satisfies ContactResult);
  });

  it("processes a valid contact message successfully", async () => {
    const res = await POST(makeRequest(validData));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.db).toBe(true);
    expect(body.data.email).toBe(true);
  });

  it("rejects requests from disallowed origin", async () => {
    mockIsOriginAllowed.mockReturnValue(false);
    const res = await POST(makeRequest(validData, "https://evil.com"));
    expect(res.status).toBe(403);
  });

  it("rejects when rate limit exceeded", async () => {
    mockCheckContactRateLimit.mockResolvedValue({
      ...validRateLimit,
      allowed: false,
      reset: Date.now() + 60000,
    });
    const res = await POST(makeRequest(validData));
    expect(res.status).toBe(429);
  });

  it("rejects invalid body with 400", async () => {
    mockContactSchemaSafeParse.mockReturnValue({
      success: false,
      error: { format: () => ({ _errors: ["Invalid"] }) },
    });
    mockFormatZodErrors.mockReturnValue(["Invalid email"]);
    const res = await POST(makeRequest({ name: "" }));
    expect(res.status).toBe(400);
  });

  it("silently accepts honeypot (fax/website) with 200", async () => {
    const honeyData = { ...validData, fax: "12345", website: "spam.com" };
    mockContactSchemaSafeParse.mockReturnValue({ success: true, data: honeyData });
    const res = await POST(makeRequest(honeyData));
    expect(res.status).toBe(200);
    expect(mockProcessContactForm).not.toHaveBeenCalled();
  });

  it("rejects invalid form timestamp", async () => {
    mockIsFormTimestampValid.mockReturnValue({ valid: false, reason: "Timestamp too old" });
    const res = await POST(makeRequest(validData));
    expect(res.status).toBe(400);
  });

  it("returns 500 when all services fail", async () => {
    mockProcessContactForm.mockResolvedValue({
      db: false,
      email: false,
      telegram: false,
      warnings: ["DB_ERR: connection failed", "EMAIL_ERR: send failed"],
    });
    const res = await POST(makeRequest(validData));
    expect(res.status).toBe(500);
  });

  it("handles unexpected fatal errors", async () => {
    mockCheckContactRateLimit.mockRejectedValue(new Error("DB connection lost"));
    const res = await POST(makeRequest(validData));
    expect(res.status).toBe(500);
  });
});

describe("api/contact (OPTIONS)", () => {
  it("returns 200 for allowed origin", async () => {
    mockIsOriginAllowed.mockReturnValue(true);
    const req = new Request("http://localhost/api/contact", {
      method: "OPTIONS",
      headers: { origin: "https://josmarypirela.dev" },
    });
    const res = await OPTIONS(req);
    expect(res.status).toBe(200);
  });

  it("returns 403 for disallowed origin", async () => {
    mockIsOriginAllowed.mockReturnValue(false);
    const req = new Request("http://localhost/api/contact", {
      method: "OPTIONS",
      headers: { origin: "https://evil.com" },
    });
    const res = await OPTIONS(req);
    expect(res.status).toBe(403);
  });
});
