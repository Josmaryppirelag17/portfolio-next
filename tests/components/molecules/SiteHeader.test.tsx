import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SiteHeader from "@/components/molecules/SiteHeader";

const defaultProps = {
  t: (key: string) => key,
  language: "es" as const,
  setLanguage: vi.fn(),
  isAudioActive: true,
  toggleMasterAudio: vi.fn(),
  timeStr: "14:30",
  onLogoTap: vi.fn(),
  onNavClick: vi.fn(),
  onAdminOpen: vi.fn(),
  isMobileMenuOpen: false,
  isMobileMenuExiting: false,
  menuRef: { current: null },
  onMobileToggle: vi.fn(),
  onMobileClose: vi.fn(),
  onDrawerEnd: vi.fn(),
};

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playHover: vi.fn(), playSuccess: vi.fn() },
}));

vi.mock("@utils/focusTrap", () => ({
  trapTabFocus: vi.fn(),
}));

describe("SiteHeader", () => {
  it("renders logo with JP initials", () => {
    render(<SiteHeader {...defaultProps} />);
    expect(screen.getByText("JP")).toBeDefined();
  });

  it("renders navigation links", () => {
    render(<SiteHeader {...defaultProps} />);
    expect(screen.getByText("nav_about")).toBeDefined();
    expect(screen.getByText("nav_journey")).toBeDefined();
    expect(screen.getByText("nav_exhibitions")).toBeDefined();
    expect(screen.getByText("nav_skills")).toBeDefined();
    expect(screen.getByText("nav_transmitter")).toBeDefined();
  });

  it("renders language selector with ES active", () => {
    render(<SiteHeader {...defaultProps} />);
    const esBtns = screen.getAllByLabelText("Español");
    expect(esBtns.length).toBeGreaterThanOrEqual(1);
    expect(esBtns[0]).toHaveAttribute("aria-pressed", "true");
  });

  it("renders audio toggle button", () => {
    render(<SiteHeader {...defaultProps} />);
    const btns = screen.getAllByLabelText("Desactivar sonido");
    expect(btns.length).toBeGreaterThanOrEqual(1);
  });

  it("renders admin access button", () => {
    render(<SiteHeader {...defaultProps} />);
    expect(screen.getByLabelText("Abrir consola de administración")).toBeDefined();
  });

  it("shows system time", () => {
    render(<SiteHeader {...defaultProps} />);
    expect(screen.getByText("14:30")).toBeDefined();
  });

  it("calls onNavClick on nav link click", () => {
    render(<SiteHeader {...defaultProps} />);
    const aboutLink = screen.getByText("nav_about").closest("a")!;
    fireEvent.click(aboutLink);
    expect(defaultProps.onNavClick).toHaveBeenCalledWith("about");
  });

  it("calls onLogoTap on logo click", () => {
    render(<SiteHeader {...defaultProps} />);
    const logo = screen.getByLabelText("Ir al inicio");
    fireEvent.click(logo);
    expect(defaultProps.onLogoTap).toHaveBeenCalledOnce();
  });

  it("calls setLanguage when ES is clicked while EN active", () => {
    render(<SiteHeader {...defaultProps} language="en" />);
    const esBtns = screen.getAllByLabelText("Español");
    fireEvent.click(esBtns[0]);
    expect(defaultProps.setLanguage).toHaveBeenCalledWith("es");
  });

  it("renders mobile menu when open", () => {
    render(<SiteHeader {...defaultProps} isMobileMenuOpen={true} />);
    expect(screen.getByLabelText("Menú de navegación móvil")).toBeDefined();
  });

  it("renders mobile menu when exiting", () => {
    render(<SiteHeader {...defaultProps} isMobileMenuExiting={true} />);
    expect(screen.getByLabelText("Menú de navegación móvil")).toBeDefined();
  });

  it("shows mobile nav links", () => {
    render(<SiteHeader {...defaultProps} isMobileMenuOpen={true} />);
    expect(screen.getByText("nav_about_mobile")).toBeDefined();
    expect(screen.getByText("nav_journey_mobile")).toBeDefined();
  });

  it("renders mobile admin button", () => {
    render(<SiteHeader {...defaultProps} isMobileMenuOpen={true} />);
    const adminBtns = screen.getAllByLabelText("Abrir consola de administración");
    expect(adminBtns.length).toBeGreaterThanOrEqual(2);
  });
});
