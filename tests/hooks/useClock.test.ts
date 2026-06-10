import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useClock } from "@/hooks/useClock";

describe("useClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial time string", () => {
    vi.setSystemTime(new Date("2026-06-09T12:30:00"));
    const { result } = renderHook(() => useClock());
    expect(typeof result.current.timeStr).toBe("string");
    expect(result.current.timeStr.length).toBeGreaterThanOrEqual(5);
  });

  it("updates time every second", () => {
    vi.setSystemTime(new Date("2026-06-09T12:30:00"));
    const { result } = renderHook(() => useClock());
    const initial = result.current.timeStr;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeStr).not.toBe(initial);
  });
});
