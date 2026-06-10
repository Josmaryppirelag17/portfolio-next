import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkContactRateLimit, getClientIp, RateLimitService } from "@/core/services/RateLimitService";

vi.mock("@/lib/db/connection", () => ({
  getDb: vi.fn(),
}));

import { getDb } from "@/lib/db/connection";

function mockRequest(ip = "10.0.0.1"): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
  });
}

describe("RateLimitService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getClientIp", () => {
    it("extracts IP from x-forwarded-for", () => {
      const req = new Request("http://localhost", { headers: { "x-forwarded-for": "1.2.3.4" } });
      expect(getClientIp(req as any)).toBe("1.2.3.4");
    });

    it("uses x-real-ip fallback", () => {
      const req = new Request("http://localhost", { headers: { "x-real-ip": "5.6.7.8" } });
      expect(getClientIp(req as any)).toBe("5.6.7.8");
    });

    it("returns unknown when no IP headers", () => {
      const req = new Request("http://localhost");
      expect(getClientIp(req as any)).toBe("unknown");
    });

    it("takes first IP from comma-separated x-forwarded-for", () => {
      const req = new Request("http://localhost", { headers: { "x-forwarded-for": " 1.1.1.1, 2.2.2.2 " } });
      expect(getClientIp(req as any)).toBe("1.1.1.1");
    });
  });

  describe("checkContactRateLimit", () => {
    it("skips limit when DB is not configured", async () => {
      (getDb as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
      const result = await checkContactRateLimit(mockRequest() as any);
      expect(result.allowed).toBe(true);
      expect(result.skipped).toBe(true);
    });

    it("allows request within limit", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) }),
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([{ count: 1 }]),
          }),
        }),
      };
      (getDb as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDb);
      const result = await checkContactRateLimit(mockRequest() as any);
      expect(result.allowed).toBe(true);
      expect(result.skipped).toBe(false);
      expect(result.remaining).toBe(9);
    });

    it("blocks when limit exceeded", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) }),
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([{ count: 11 }]),
          }),
        }),
      };
      (getDb as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDb);
      const result = await checkContactRateLimit(mockRequest() as any);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it("skips on DB error", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({ values: vi.fn().mockRejectedValue(new Error("DB down")) }),
      };
      (getDb as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDb);
      const result = await checkContactRateLimit(mockRequest() as any);
      expect(result.allowed).toBe(true);
      expect(result.skipped).toBe(true);
    });

    it("returns at-limit exactly", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({ values: vi.fn().mockResolvedValue(undefined) }),
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([{ count: 10 }]),
          }),
        }),
      };
      (getDb as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDb);
      const result = await checkContactRateLimit(mockRequest() as any);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(0);
    });
  });

  describe("RateLimitService static", () => {
    it("exposes functions", () => {
      expect(RateLimitService.checkContactRateLimit).toBe(checkContactRateLimit);
      expect(RateLimitService.getClientIp).toBe(getClientIp);
    });
  });
});
