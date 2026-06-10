import { describe, it, expect, vi, beforeEach } from "vitest";
import { processContactForm, isOriginAllowed } from "@/core/services/ContactService";

vi.mock("@/lib/db/connection", () => ({
  getDb: vi.fn(),
}));

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

import { getDb } from "@/lib/db/connection";
import * as Sentry from "@sentry/nextjs";

const validData = {
  name: "John",
  email: "john@test.com",
  message: "Hello there",
  fax: "",
  website: "",
  formTimestamp: Date.now() - 10_000,
};

describe("ContactService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("isOriginAllowed", () => {
    it("allows production domain", () => {
      expect(isOriginAllowed("https://josmarypirela.dev")).toBe(true);
    });

    it("allows www subdomain", () => {
      expect(isOriginAllowed("https://www.josmarypirela.dev")).toBe(true);
    });

    it("allows localhost with any port", () => {
      expect(isOriginAllowed("http://localhost:3000")).toBe(true);
      expect(isOriginAllowed("http://localhost")).toBe(true);
      expect(isOriginAllowed("http://127.0.0.1:5173")).toBe(true);
    });

    it("rejects null origin", () => {
      expect(isOriginAllowed(null)).toBe(false);
    });

    it("rejects unknown origin", () => {
      expect(isOriginAllowed("https://evil.com")).toBe(false);
    });
  });

  describe("processContactForm", () => {
    it("returns warnings when DB + email + telegram all fail", async () => {
      (getDb as any).mockReturnValue(null);
      vi.stubEnv("RESEND_API_KEY", "");
      vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
      vi.stubEnv("TELEGRAM_CHAT_ID", "");

      const result = await processContactForm(validData);
      expect(result.db).toBe(false);
      expect(result.email).toBe(false);
      expect(result.telegram).toBe(false);
      expect(result.warnings.length).toBeGreaterThanOrEqual(2);
    });

    it("saves to DB successfully", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockResolvedValue(undefined),
        }),
      };
      (getDb as any).mockReturnValue(mockDb);
      vi.stubEnv("RESEND_API_KEY", "");
      vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
      vi.stubEnv("TELEGRAM_CHAT_ID", "");

      const result = await processContactForm(validData);
      expect(result.db).toBe(true);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("handles DB insert error gracefully", async () => {
      const mockDb = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockRejectedValue(new Error("Connection failed")),
        }),
      };
      (getDb as any).mockReturnValue(mockDb);
      vi.stubEnv("RESEND_API_KEY", "");
      vi.stubEnv("TELEGRAM_BOT_TOKEN", "");
      vi.stubEnv("TELEGRAM_CHAT_ID", "");

      const result = await processContactForm(validData);
      expect(result.db).toBe(false);
      expect(result.warnings.some((w) => w.includes("DB_ERR"))).toBe(true);
    });

    it("sends Telegram notification when configured", async () => {
      (getDb as any).mockReturnValue(null);
      vi.stubEnv("RESEND_API_KEY", "");
      vi.stubEnv("TELEGRAM_BOT_TOKEN", "bot:token");
      vi.stubEnv("TELEGRAM_CHAT_ID", "123456");

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );

      const result = await processContactForm(validData);
      expect(result.telegram).toBe(true);
    });

    it("handles Telegram API error", async () => {
      (getDb as any).mockReturnValue(null);
      vi.stubEnv("RESEND_API_KEY", "");
      vi.stubEnv("TELEGRAM_BOT_TOKEN", "bot:token");
      vi.stubEnv("TELEGRAM_CHAT_ID", "123456");

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
        new Response(JSON.stringify({ description: "Bad request" }), { status: 400 }),
      );

      const result = await processContactForm(validData);
      expect(result.telegram).toBe(false);
      expect(result.warnings.some((w) => w.includes("TELEGRAM_ERR"))).toBe(true);
    });
  });

  describe("reportError", () => {
    it("calls Sentry.captureException", async () => {
      const { reportError } = await import("@/core/services/ContactService");
      reportError(new Error("test"));
      expect(Sentry.captureException).toHaveBeenCalled();
    });
  });
});
