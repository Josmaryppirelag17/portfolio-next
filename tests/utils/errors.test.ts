import { describe, it, expect } from "vitest";
import { getErrorMessage } from "@/utils/errors";

describe("getErrorMessage", () => {
  it("returns message from Error instance", () => {
    expect(getErrorMessage(new Error("fail"))).toBe("fail");
  });

  it("returns string representation for non-errors", () => {
    expect(getErrorMessage("oops")).toBe("oops");
  });

  it("returns fallback when value is falsy", () => {
    expect(getErrorMessage("", "FALLBACK")).toBe("FALLBACK");
  });
});
