import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CyberConsoleWidgets from "@/components/organisms/CyberConsoleWidgets";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playError: vi.fn() },
}));

vi.mock("@/components/molecules/WidgetMatrixRain", () => ({
  default: () => <div data-testid="widget-matrix-rain" />,
}));
vi.mock("@/components/molecules/WidgetPocketSynth", () => ({
  default: () => <div data-testid="widget-pocket-synth" />,
}));
vi.mock("@/components/molecules/WidgetCoreBalancer", () => ({
  default: ({ onCoreStateChange }: { onCoreStateChange: (s: string) => void }) => (
    <div data-testid="widget-core-balancer" data-onchange={String(!!onCoreStateChange)} />
  ),
}));
vi.mock("@/components/molecules/WidgetBiorhythmECG", () => ({
  default: () => <div data-testid="widget-biorhythm-ecg" />,
}));
vi.mock("@/components/molecules/WidgetMemoryCollector", () => ({
  default: () => <div data-testid="widget-memory-collector" />,
}));
vi.mock("@/components/molecules/WidgetRetroTerminal", () => ({
  default: ({ onTriggerGlitch }: { onTriggerGlitch: () => void }) => (
    <div data-testid="widget-retro-terminal" data-trigger-glitch={String(!!onTriggerGlitch)} />
  ),
}));

describe("CyberConsoleWidgets", () => {
  it("renders section with aria-label", () => {
    render(<CyberConsoleWidgets />);
    expect(screen.getByLabelText("Cybernetics diagnostics and telemetry dock")).toBeDefined();
  });

  it("renders heading", () => {
    render(<CyberConsoleWidgets />);
    expect(screen.getByText(/CYBERNETIC DIAGNOSTICS/)).toBeDefined();
  });

  it("renders all six widget placeholders", () => {
    render(<CyberConsoleWidgets />);
    expect(screen.getByTestId("widget-matrix-rain")).toBeDefined();
    expect(screen.getByTestId("widget-pocket-synth")).toBeDefined();
    expect(screen.getByTestId("widget-core-balancer")).toBeDefined();
    expect(screen.getByTestId("widget-biorhythm-ecg")).toBeDefined();
    expect(screen.getByTestId("widget-memory-collector")).toBeDefined();
    expect(screen.getByTestId("widget-retro-terminal")).toBeDefined();
  });
});
