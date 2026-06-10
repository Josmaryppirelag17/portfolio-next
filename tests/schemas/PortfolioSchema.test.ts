import { describe, it, expect } from "vitest";
import { messages, rateLimits } from "@/lib/db/schema";

describe("Portfolio DB schema", () => {
  describe("messages table", () => {
    it("has correct column names", () => {
      const colNames = Object.keys(messages).filter(
        (k) => typeof (messages as any)[k] === "object" && (messages as any)[k].table === messages
      );
      expect(colNames).toContain("id");
      expect(colNames).toContain("name");
      expect(colNames).toContain("email");
      expect(colNames).toContain("message");
      expect(colNames).toContain("createdAt");
      expect(colNames).toContain("fax");
      expect(colNames).toContain("website");
      expect(colNames).toContain("formTimestamp");
    });

    it("has id as serial primary key", () => {
      expect(messages.id.primary).toBe(true);
      expect(messages.id.notNull).toBe(true);
    });

    it("has name not null", () => {
      expect(messages.name.notNull).toBe(true);
    });

    it("has email not null", () => {
      expect(messages.email.notNull).toBe(true);
    });

    it("has message not null", () => {
      expect(messages.message.notNull).toBe(true);
    });

    it("has createdAt with default", () => {
      expect(messages.createdAt.hasDefault).toBe(true);
    });

    it("has fax nullable", () => {
      expect(messages.fax.notNull).toBe(false);
    });

    it("has website nullable", () => {
      expect(messages.website.notNull).toBe(false);
    });

    it("has formTimestamp nullable", () => {
      expect(messages.formTimestamp.notNull).toBe(false);
    });
  });

  describe("rate_limits table", () => {
    it("has correct column names", () => {
      const cols = Object.keys(rateLimits).filter(
        (k) => typeof (rateLimits as any)[k] === "object" && (rateLimits as any)[k].table === rateLimits
      );
      expect(cols).toContain("id");
      expect(cols).toContain("ip");
      expect(cols).toContain("attemptedAt");
    });

    it("has id as serial primary key", () => {
      expect(rateLimits.id.primary).toBe(true);
      expect(rateLimits.id.notNull).toBe(true);
    });

    it("has ip not null", () => {
      expect(rateLimits.ip.notNull).toBe(true);
    });

    it("has attemptedAt with default", () => {
      expect(rateLimits.attemptedAt.hasDefault).toBe(true);
    });
  });
});
