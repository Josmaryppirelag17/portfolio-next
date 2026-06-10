import { describe, it, expect } from "vitest";
import { contactSchema, isFormTimestampValid, formatZodErrors, ValidationService } from "@/core/services/ValidationService";

describe("ValidationService", () => {
  describe("contactSchema", () => {
    const valid = { name: "John", email: "john@test.com", message: "Hello", formTimestamp: Date.now() };

    it("accepts valid input", () => {
      const r = contactSchema.safeParse(valid);
      expect(r.success).toBe(true);
    });

    it("rejects empty name", () => {
      const r = contactSchema.safeParse({ ...valid, name: "" });
      expect(r.success).toBe(false);
    });

    it("rejects name > 120 chars", () => {
      const r = contactSchema.safeParse({ ...valid, name: "a".repeat(121) });
      expect(r.success).toBe(false);
    });

    it("rejects invalid email", () => {
      const r = contactSchema.safeParse({ ...valid, email: "not-an-email" });
      expect(r.success).toBe(false);
    });

    it("rejects email > 200 chars", () => {
      const r = contactSchema.safeParse({ ...valid, email: "a".repeat(200) + "@b.com" });
      expect(r.success).toBe(false);
    });

    it("rejects empty message", () => {
      const r = contactSchema.safeParse({ ...valid, message: "" });
      expect(r.success).toBe(false);
    });

    it("rejects message > 5000 chars", () => {
      const r = contactSchema.safeParse({ ...valid, message: "a".repeat(5001) });
      expect(r.success).toBe(false);
    });

    it("trims name", () => {
      const r = contactSchema.safeParse({ ...valid, name: "  John  " });
      expect(r.success).toBe(true);
      if (r.success) {
        expect(r.data.name).toBe("John");
      }
    });

    it("lowercases and trims email", () => {
      const r = contactSchema.safeParse({ ...valid, email: "  JOHN@TEST.COM  " });
      expect(r.success).toBe(false);
    });

    it("rejects missing formTimestamp", () => {
      const { name, email, message } = valid;
      const r = contactSchema.safeParse({ name, email, message });
      expect(r.success).toBe(false);
    });
  });

  describe("isFormTimestampValid", () => {
    it("returns valid for timestamps within window", () => {
      const r = isFormTimestampValid(Date.now() - 10_000);
      expect(r.valid).toBe(true);
    });

    it("returns invalid for future timestamps", () => {
      const r = isFormTimestampValid(Date.now() + 60_000);
      expect(r.valid).toBe(false);
      expect(r.reason).toContain("future");
    });

    it("returns invalid for too-fast submissions (bot)", () => {
      const r = isFormTimestampValid(Date.now() - 500);
      expect(r.valid).toBe(false);
      expect(r.reason).toContain("too quickly");
    });

    it("returns invalid for expired timestamps (> 1h)", () => {
      const r = isFormTimestampValid(Date.now() - 3_700_000);
      expect(r.valid).toBe(false);
      expect(r.reason).toContain("expired");
    });
  });

  describe("formatZodErrors", () => {
    it("formats zod issues into string array", () => {
      const r = contactSchema.safeParse({ name: "", email: "bad", message: "", formTimestamp: -1 });
      expect(r.success).toBe(false);
      if (!r.success) {
        const msgs = formatZodErrors(r.error);
        expect(msgs.length).toBeGreaterThanOrEqual(3);
        expect(msgs.some((m) => m.includes("Name"))).toBe(true);
        expect(msgs.some((m) => m.includes("email"))).toBe(true);
      }
    });
  });

  describe("ValidationService static", () => {
    it("exposes isFormTimestampValid statically", () => {
      expect(ValidationService.isFormTimestampValid(Date.now() - 10_000).valid).toBe(true);
    });

    it("exposes formatZodErrors statically", () => {
      const r = contactSchema.safeParse({ name: "", email: "x", message: "", formTimestamp: 0 });
      if (!r.success) {
        expect(ValidationService.formatZodErrors(r.error).length).toBeGreaterThan(0);
      }
    });
  });
});
