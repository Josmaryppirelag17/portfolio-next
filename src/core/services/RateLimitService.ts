import type { NextRequest } from "next/server";
import { eq, sql, and, gte } from "drizzle-orm";
import { getDb } from "@/lib/db/connection";
import { rateLimits } from "@/lib/db/schema";
import { getErrorMessage } from "@/utils/errors";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
  skipped: boolean;
}

const MAX_REQUESTS_PER_HOUR = 10;
const WINDOW_MS = 3_600_000;

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function checkContactRateLimit(req: NextRequest): Promise<RateLimitResult> {
  const db = getDb();

  if (!db) {
    console.warn("[rate-limit] DATABASE_URL not configured — limit disabled");
    return {
      allowed: true,
      limit: MAX_REQUESTS_PER_HOUR,
      remaining: MAX_REQUESTS_PER_HOUR,
      reset: Date.now() + WINDOW_MS,
      skipped: true,
    };
  }

  const ip = getClientIp(req);

  try {
    await db.insert(rateLimits).values({ ip });

    const oneHourAgo = new Date(Date.now() - WINDOW_MS);

    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(rateLimits)
      .where(and(eq(rateLimits.ip, ip), gte(rateLimits.attemptedAt, oneHourAgo)));

    const count = result[0]?.count ?? 0;

    return {
      allowed: count <= MAX_REQUESTS_PER_HOUR,
      limit: MAX_REQUESTS_PER_HOUR,
      remaining: Math.max(0, MAX_REQUESTS_PER_HOUR - count),
      reset: Date.now() + WINDOW_MS,
      skipped: false,
    };
  } catch (err) {
    const message = getErrorMessage(err, String(err));
    console.error("[rate-limit] Error:", message);
    return {
      allowed: true,
      limit: MAX_REQUESTS_PER_HOUR,
      remaining: MAX_REQUESTS_PER_HOUR,
      reset: Date.now() + WINDOW_MS,
      skipped: true,
    };
  }
}

export class RateLimitService {
  static getClientIp = getClientIp;
  static checkContactRateLimit = checkContactRateLimit;
}
