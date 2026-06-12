import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
    vi.stubGlobal("AudioContext", vi.fn(() => ({
      createOscillator: () => ({ connect: vi.fn(), start: vi.fn(), stop: vi.fn(), type: "", frequency: { setValueAtTime: vi.fn() } }),
      createGain: () => ({ connect: vi.fn(), gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } }),
      currentTime: 0,
      destination: {},
      close: vi.fn(),
    })));
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

  it("cycles oscillator type on OSC click", () => {
    render(<WidgetPocketSynth />);
    const btn = screen.getByText(/OSC:/);
    expect(btn.textContent).toMatch(/triangle/i);
    fireEvent.click(btn);
    expect(screen.getByText(/OSC: sine/i)).toBeDefined();
  });

  it("increases decay on Decay click", () => {
    render(<WidgetPocketSynth />);
    const btn = screen.getByText(/DECAY:/);
    fireEvent.click(btn);
    expect(screen.getByText(/DECAY: 0.45/)).toBeDefined();
  });

  it("cycles octave on Octave click", () => {
    render(<WidgetPocketSynth />);
    const btn = screen.getByText(/OCT:/);
    fireEvent.click(btn);
    expect(screen.getByText(/OCT: 5/)).toBeDefined();
  });
});
