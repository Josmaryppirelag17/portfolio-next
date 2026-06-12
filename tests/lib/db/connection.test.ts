import { describe, it, expect } from "vitest";

describe("db connection", () => {
  it("returns null when DATABASE_URL is not set", async () => {
    const orig = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    const mod = await import("@/lib/db/connection");
    expect(mod.getDb()).toBeNull();
    process.env.DATABASE_URL = orig;
  });
});
