import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import WidgetCoreBalancer from "@/components/molecules/WidgetCoreBalancer";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playHover: vi.fn() },
}));

describe("WidgetCoreBalancer", () => {
  const onCoreStateChange = vi.fn();

  beforeAll(() => {
    vi.stubGlobal("window", { ...window, AudioContext: vi.fn(), webkitAudioContext: undefined });
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
});
