import { describe, it, expect } from "vitest";

describe("db schema", () => {
  it("exports expected schema objects", async () => {
    const schema = await import("@/lib/db/schema");
    expect(schema.messages).toBeDefined();
    expect(schema.rateLimits).toBeDefined();
  });
});
