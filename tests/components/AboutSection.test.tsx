import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutSection from "@/components/organisms/AboutSection";

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn() },
}));

vi.mock("@/components/organisms/CyberAvatar", () => ({
  default: () => <div data-testid="cyber-avatar" />,
}));

describe("AboutSection", () => {
  it("renders section with id", () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector("#about");
    expect(section).toBeDefined();
  });

  it("renders tab buttons", () => {
    render(<AboutSection />);
    expect(screen.getByText("tab_bio")).toBeDefined();
    expect(screen.getByText("tab_philosophy")).toBeDefined();
    expect(screen.getByText("tab_vibes")).toBeDefined();
  });

  it("renders CyberAvatar", () => {
    render(<AboutSection />);
    expect(screen.getByTestId("cyber-avatar")).toBeDefined();
  });

  it("renders stat bars", () => {
    render(<AboutSection />);
    expect(screen.getByText("visual_polish")).toBeDefined();
    expect(screen.getByText("code_efficiency")).toBeDefined();
    expect(screen.getByText("audio_synths")).toBeDefined();
    expect(screen.getByText("caffeine_burn")).toBeDefined();
  });

  it("renders CyberConsoleWidgets", () => {
    render(<AboutSection />);
    expect(screen.getByText(/SUBSYSTEMS_OVERRIDE_ACTIVE|CYBERNETIC DIAGNOSTICS/)).toBeDefined();
  });
});
