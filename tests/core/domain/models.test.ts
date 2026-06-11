import { describe, it, expect } from "vitest";
import { ok, err } from "@/core/domain/models";

describe("ok", () => {
  it("creates a success result", () => {
    const result = ok(42);
    expect(result.success).toBe(true);
    if (result.success) expect(result.value).toBe(42);
  });
});

describe("err", () => {
  it("creates an error result", () => {
    const result = err("fail");
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBe("fail");
  });
});
