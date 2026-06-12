import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAudio } from "@/hooks/useAudio";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: {
    isEnabled: vi.fn(() => false),
    toggle: vi.fn(() => true),
    playToggleSound: vi.fn(),
  },
}));

describe("useAudio", () => {
  it("returns initial audio state", () => {
    const { result } = renderHook(() => useAudio());
    expect(result.current.isAudioActive).toBe(false);
  });

  it("toggles audio on call", () => {
    const { result } = renderHook(() => useAudio());
    act(() => {
      result.current.toggleMasterAudio();
    });
    expect(result.current.isAudioActive).toBe(true);
  });
});
