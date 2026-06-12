import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

describe("usePrefersReducedMotion", () => {
  it("returns false by default in jsdom", () => {
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });
});
