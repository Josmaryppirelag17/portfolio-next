import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AboutSection from "@/components/organisms/AboutSection";

const { mockPlayClick, mockPlaySuccess } = vi.hoisted(() => ({
  mockPlayClick: vi.fn(),
  mockPlaySuccess: vi.fn(),
}));

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({ t: (key: string) => key }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: mockPlayClick, playSuccess: mockPlaySuccess },
}));

vi.mock("@/components/organisms/CyberAvatar", () => ({
  default: () => <div data-testid="cyber-avatar" />,
}));

vi.mock("@/components/organisms/CyberConsoleWidgets", () => ({
  default: () => <div data-testid="cyber-console-widgets" />,
}));

describe("AboutSection", () => {
  it("renders section with id", () => {
    const { container } = render(<AboutSection />);
    expect(container.querySelector("#about")).toBeDefined();
  });

  it("renders tab buttons", () => {
    render(<AboutSection />);
    expect(screen.getByText("tab_bio")).toBeDefined();
    expect(screen.getByText("tab_philosophy")).toBeDefined();
    expect(screen.getByText("tab_vibes")).toBeDefined();
  });

  it("switches content on tab click", () => {
    render(<AboutSection />);
    fireEvent.click(screen.getByText("tab_philosophy"));
    expect(screen.getByText("philosophy_title")).toBeDefined();
    expect(mockPlayClick).toHaveBeenCalled();
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

  it("triggers boost on stat click", () => {
    render(<AboutSection />);
    const stat = screen.getByLabelText(/visual_polish/);
    fireEvent.click(stat);
    expect(mockPlaySuccess).toHaveBeenCalled();
  });

  it("renders CyberConsoleWidgets", () => {
    render(<AboutSection />);
    expect(screen.getByTestId("cyber-console-widgets")).toBeDefined();
  });
});
