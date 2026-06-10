import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SiteFooter from "@/components/molecules/SiteFooter";

describe("SiteFooter", () => {
  it("renders footer with translated text", () => {
    const t = (key: string) => key === "rebuilt_paracas" ? "REBUILT" : key === "compiler_stable" ? "STABLE" : key;
    const { container } = render(<SiteFooter t={t} onScrollToTop={() => {}} />);
    expect(screen.getByText(/JOSMARY.DEV/)).toBeDefined();
    expect(screen.getByText("REBUILT")).toBeDefined();
    expect(container.innerHTML).toContain("STABLE");
  });

  it("has scroll to top button", () => {
    const onScrollToTop = vi.fn();
    render(<SiteFooter t={(k: string) => k} onScrollToTop={onScrollToTop} />);
    const btn = screen.getByLabelText("Volver al inicio de la página");
    expect(btn).toBeDefined();
    btn.click();
    expect(onScrollToTop).toHaveBeenCalledOnce();
  });

  it("displays current year", () => {
    render(<SiteFooter t={(k: string) => k} onScrollToTop={() => {}} />);
    expect(screen.getByText(/2026/)).toBeDefined();
  });
});
