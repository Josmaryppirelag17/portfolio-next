import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/components/templates/App";

vi.mock("@/components/organisms/LanguageContext", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useLanguage: () => ({
    t: (key: string) => key,
    language: "es" as const,
    setLanguage: vi.fn(),
    toggleLanguage: vi.fn(),
    projects: [],
    experience: [],
  }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playHover: vi.fn() },
}));

vi.mock("@/components/organisms/HeroPlayground", () => ({
  default: () => <div data-testid="hero" />,
}));
vi.mock("@/components/organisms/AboutSection", () => ({
  default: () => <div data-testid="about" />,
}));
vi.mock("@/components/organisms/ExperienceTimeline", () => ({
  default: () => <div data-testid="experience" />,
}));
vi.mock("@/components/organisms/ProjectsShowcase", () => ({
  default: () => <div data-testid="projects" />,
}));
vi.mock("@/components/organisms/InteractiveSkills", () => ({
  default: () => <div data-testid="skills" />,
}));
vi.mock("@/components/organisms/ContactTerminal", () => ({
  default: () => <div data-testid="contact" />,
}));
vi.mock("@/components/organisms/AdminConsole", () => ({
  default: () => <div data-testid="admin" />,
}));
vi.mock("@/components/molecules/MatrixRainOverlay", () => ({
  default: () => <div data-testid="matrix-rain" />,
}));
vi.mock("@/components/molecules/SiteHeader", () => ({
  default: () => <div data-testid="site-header" />,
}));
vi.mock("@/components/molecules/SiteFooter", () => ({
  default: () => <div data-testid="site-footer" />,
}));
vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => false,
}));
vi.mock("@/hooks/useAudio", () => ({
  useAudio: () => ({ isAudioActive: true, toggleMasterAudio: vi.fn() }),
}));
vi.mock("@/hooks/useClock", () => ({
  useClock: () => ({ timeStr: "12:00" }),
}));
vi.mock("@/hooks/useMatrixEasterEgg", () => ({
  useMatrixEasterEgg: () => ({
    isMatrixActive: false,
    closeMatrixOverlay: vi.fn(),
    handleLogoTap: vi.fn(),
  }),
}));
vi.mock("@/hooks/useMobileMenu", () => ({
  useMobileMenu: () => ({
    isMobileMenuOpen: false,
    isMobileMenuExiting: false,
    menuRef: { current: null },
    closeMobileMenu: vi.fn(),
    handleDrawerAnimationEnd: vi.fn(),
    setIsMobileMenuOpen: vi.fn(),
    setIsMobileMenuExiting: vi.fn(),
  }),
}));
vi.mock("@/utils/analytics", () => ({
  capturePageView: vi.fn(),
}));

describe("App", () => {
  it("renders main sections", () => {
    render(<App />);
    expect(screen.getByTestId("hero")).toBeDefined();
    expect(screen.getByTestId("site-header")).toBeDefined();
    expect(screen.getByTestId("site-footer")).toBeDefined();
  });

  it("renders skip to content link", () => {
    render(<App />);
    expect(screen.getByText("skip_to_content")).toBeDefined();
  });

  it("renders main content region", () => {
    render(<App />);
    expect(screen.getByLabelText("main_content_label")).toBeDefined();
  });
});
