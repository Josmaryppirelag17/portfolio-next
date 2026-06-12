import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMatrixEasterEgg } from "@/hooks/useMatrixEasterEgg";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: {
    playSuccess: vi.fn(),
    playSynthKey: vi.fn(),
  },
}));

describe("useMatrixEasterEgg", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns isMatrixActive false initially", () => {
    const { result } = renderHook(() => useMatrixEasterEgg());
    expect(result.current.isMatrixActive).toBe(false);
  });

  it("triggers matrix on konami key sequence", () => {
    const { result } = renderHook(() => useMatrixEasterEgg());
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "m" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "t" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "i" }));
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "x" }));
    });
    expect(result.current.isMatrixActive).toBe(true);
  });

  it("closes overlay via closeMatrixOverlay", () => {
    const { result } = renderHook(() => useMatrixEasterEgg());
    act(() => {
      result.current.triggerMatrix();
    });
    expect(result.current.isMatrixActive).toBe(true);
    act(() => {
      result.current.closeMatrixOverlay();
    });
    expect(result.current.isMatrixActive).toBe(false);
  });
});
