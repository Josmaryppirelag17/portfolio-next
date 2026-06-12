import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WidgetCoreBalancer from "@/components/molecules/WidgetCoreBalancer";

const { mockPlayHover, mockPlaySuccess, onCoreStateChange } = vi.hoisted(() => ({
  mockPlayHover: vi.fn(),
  mockPlaySuccess: vi.fn(),
  onCoreStateChange: vi.fn(),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: mockPlaySuccess, playHover: mockPlayHover },
}));

describe("WidgetCoreBalancer", () => {
  beforeAll(() => {
    vi.stubGlobal("AudioContext", vi.fn(() => ({
      createOscillator: () => ({ connect: vi.fn(), start: vi.fn(), stop: vi.fn(), type: "", frequency: { setValueAtTime: vi.fn() } }),
      createGain: () => ({ connect: vi.fn(), gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } }),
      currentTime: 0,
      destination: {},
      close: vi.fn(),
    })));
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sliders with labels", () => {
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    expect(screen.getByLabelText("PLUTONIUM SHIELD FLUX")).toBeDefined();
    expect(screen.getByLabelText("plasma CONDENSATE")).toBeDefined();
    expect(screen.getByLabelText("WARP CORE STRETCH")).toBeDefined();
  });

  it("renders status indicator", () => {
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    expect(screen.getByText("SYS_STABLE")).toBeDefined();
  });

  it("renders warp composer flux percentage", () => {
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    const avg = Math.round((65 + 45 + 55) / 3);
    expect(screen.getAllByText(`${avg}%`).length).toBeGreaterThan(0);
  });

  it("reports stable state initially", () => {
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    expect(onCoreStateChange).toHaveBeenCalledWith("stable");
  });

  it("plays hover sound on slider change", () => {
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    const slider = screen.getByLabelText("PLUTONIUM SHIELD FLUX");
    fireEvent.change(slider, { target: { value: "80" } });
    expect(mockPlayHover).toHaveBeenCalled();
  });

  it("enters unstable state when average >= 85", () => {
    vi.useFakeTimers();
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    fireEvent.change(screen.getByLabelText("PLUTONIUM SHIELD FLUX"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText("plasma CONDENSATE"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText("WARP CORE STRETCH"), { target: { value: "100" } });
    expect(onCoreStateChange).toHaveBeenCalledWith("unstable");
    expect(screen.getByText(/EMERGENCY COOLANT DEPRESSURIZE/)).toBeDefined();
    vi.useRealTimers();
  });

  it("triggers vent mode on emergency click", () => {
    vi.useFakeTimers();
    render(<WidgetCoreBalancer onCoreStateChange={onCoreStateChange} />);
    fireEvent.change(screen.getByLabelText("PLUTONIUM SHIELD FLUX"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText("plasma CONDENSATE"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText("WARP CORE STRETCH"), { target: { value: "100" } });
    fireEvent.click(screen.getByText(/EMERGENCY COOLANT DEPRESSURIZE/));
    expect(onCoreStateChange).toHaveBeenCalledWith("venting");
    expect(mockPlaySuccess).toHaveBeenCalled();
    vi.advanceTimersByTime(2000);
    expect(onCoreStateChange).toHaveBeenCalledWith("stable");
    vi.useRealTimers();
  });
});
