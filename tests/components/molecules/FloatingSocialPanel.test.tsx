import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloatingSocialPanel from "@/components/molecules/FloatingSocialPanel";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playHover: vi.fn() },
}));

vi.mock("@/components/organisms/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    language: "es" as const,
  }),
}));

describe("FloatingSocialPanel", () => {
  it("renders share button", () => {
    render(<FloatingSocialPanel />);
    expect(screen.getByLabelText("panel_open")).toBeDefined();
  });

  it("opens panel on click and shows items", async () => {
    const user = userEvent.setup();
    render(<FloatingSocialPanel />);

    const btn = screen.getByLabelText("panel_open");
    await user.click(btn);

    expect(screen.getByLabelText("panel_cv_aria")).toBeDefined();
    expect(screen.getByLabelText("panel_saber_mas_aria")).toBeDefined();
    expect(screen.getByLabelText("LinkedIn")).toBeDefined();
    expect(screen.getByLabelText("GitHub")).toBeDefined();
  });

  it("toggles panel closed when button clicked again", async () => {
    const user = userEvent.setup();
    render(<FloatingSocialPanel />);

    const btn = screen.getByLabelText("panel_open");
    await user.click(btn);
    expect(screen.getByLabelText("panel_close")).toBeDefined();

    await user.click(btn);
    expect(screen.getByLabelText("panel_open")).toBeDefined();
  });
});
