import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import InteractiveSkills from "@/components/organisms/InteractiveSkills";

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn() },
}));

vi.mock("@/types", () => ({
  SKILLS_DATA: [
    { name: "React", category: "Architecture", color: "brand-cyan" },
    { name: "TypeScript", category: "Architecture", color: "brand-pink" },
    { name: "Docker", category: "Tooling & DevOps", color: "brand-lime" },
  ],
}));

describe("InteractiveSkills", () => {
  it("renders all skills by default", () => {
    render(<InteractiveSkills />);
    expect(screen.getByText("React")).toBeDefined();
    expect(screen.getByText("TypeScript")).toBeDefined();
    expect(screen.getByText("Docker")).toBeDefined();
  });

  it("renders filter category buttons", () => {
    render(<InteractiveSkills />);
    expect(screen.getByText("ARCHITECTURE")).toBeDefined();
    expect(screen.getByText("TOOLING & DEVOPS")).toBeDefined();
  });
});
