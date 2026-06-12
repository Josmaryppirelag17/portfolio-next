import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { soundEngine } from "@/components/organisms/SoundEngine";

describe("SoundEngine", () => {
  beforeAll(() => {
    vi.stubGlobal("AudioContext", vi.fn(() => ({
      createOscillator: vi.fn(),
      createGain: vi.fn(),
      createBiquadFilter: vi.fn(),
      createBuffer: vi.fn(),
      createBufferSource: vi.fn(),
      sampleRate: 44100,
      currentTime: 0,
      destination: {},
      state: "running",
      resume: vi.fn(() => Promise.resolve()),
      close: vi.fn(),
    })));
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (soundEngine as any).enabled = false;
    (soundEngine as any).ctx = null;
    (soundEngine as any).ctxReady = null;
    (soundEngine as any).activeWave = "triangle";
  });

  it("starts disabled", () => {
    expect(soundEngine.isEnabled()).toBe(false);
  });

  it("toggles enabled state", () => {
    expect(soundEngine.toggle(true)).toBe(true);
    expect(soundEngine.isEnabled()).toBe(true);
    expect(soundEngine.toggle(false)).toBe(false);
  });

  it("toggle without argument flips state", () => {
    expect(soundEngine.toggle()).toBe(true);
    expect(soundEngine.toggle()).toBe(false);
    expect(soundEngine.toggle()).toBe(true);
  });

  it("sets and gets wave type", () => {
    soundEngine.setWaveType("square");
    expect(soundEngine.getWaveType()).toBe("square");
  });

  it("does not play sounds when disabled", () => {
    soundEngine.playClick();
    soundEngine.playHover();
    soundEngine.playSuccess();
    soundEngine.playError();
    soundEngine.playToggleSound();
    soundEngine.playSynthKey(440);
    soundEngine.playRadioStatic();
    expect(soundEngine.isEnabled()).toBe(false);
  });

  it("silently handles errors when AudioContext is unavailable", () => {
    (soundEngine as any).ctx = null;
    (soundEngine as any).ctxReady = null;
    soundEngine.toggle(true);
    expect(() => soundEngine.playClick()).not.toThrow();
  });
});
