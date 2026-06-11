import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import WidgetPocketSynth from "@/components/molecules/WidgetPocketSynth";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playSynthKey: vi.fn(), isEnabled: () => true },
}));

vi.mock("@/components/atoms/WidgetShell", () => ({
  default: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="widget-shell" data-title={title}>{children}</div>
  ),
}));

describe("WidgetPocketSynth", () => {
  beforeAll(() => {
    vi.stubGlobal("window", { ...window, AudioContext: vi.fn(), webkitAudioContext: undefined });
  });

  it("renders white keys", () => {
    render(<WidgetPocketSynth />);
    expect(screen.getByText("C")).toBeDefined();
    expect(screen.getByText("D")).toBeDefined();
    expect(screen.getByText("E")).toBeDefined();
    expect(screen.getByText("F")).toBeDefined();
    expect(screen.getByText("G")).toBeDefined();
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    expect(screen.getByText("C5")).toBeDefined();
  });

  it("renders sharp keys", () => {
    render(<WidgetPocketSynth />);
    expect(screen.getByText("C#")).toBeDefined();
    expect(screen.getByText("D#")).toBeDefined();
    expect(screen.getByText("F#")).toBeDefined();
    expect(screen.getByText("G#")).toBeDefined();
    expect(screen.getByText("A#")).toBeDefined();
  });

  it("renders OSC type button", () => {
    render(<WidgetPocketSynth />);
    expect(screen.getByText(/OSC:/)).toBeDefined();
  });

  it("renders Decay button", () => {
    render(<WidgetPocketSynth />);
    expect(screen.getByText(/DECAY:/)).toBeDefined();
  });

  it("renders Octave button", () => {
    render(<WidgetPocketSynth />);
    expect(screen.getByText(/OCT:/)).toBeDefined();
  });
});
