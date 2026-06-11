import { describe, it, expect } from "vitest";
import { capturePageView } from "@/utils/analytics";

describe("capturePageView", () => {
  it("executes without throwing", () => {
    expect(() => capturePageView()).not.toThrow();
  });
});
