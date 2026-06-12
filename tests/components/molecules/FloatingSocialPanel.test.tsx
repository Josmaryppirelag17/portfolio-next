import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
