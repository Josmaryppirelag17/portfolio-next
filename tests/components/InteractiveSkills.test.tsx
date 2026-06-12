import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InteractiveSkills from "@/components/organisms/InteractiveSkills";

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

vi.mock("@/types", () => ({
  SKILLS_DATA: [
    { name: "React", category: "Architecture", color: "brand-cyan" },
    { name: "TypeScript", category: "Architecture", color: "brand-pink" },
    { name: "Docker", category: "Tooling & DevOps", color: "brand-lime" },
  ],
}));

describe("InteractiveSkills", () => {
  beforeEach(() => vi.clearAllMocks());

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

  it("clicking filter plays sound", () => {
    render(<InteractiveSkills />);
    fireEvent.click(screen.getByText("ARCHITECTURE"));
    expect(mockPlayClick).toHaveBeenCalled();
  });

  it("clicking All filter resets view", () => {
    render(<InteractiveSkills />);
    fireEvent.click(screen.getByText("ARCHITECTURE"));
    fireEvent.click(screen.getByText("btn_filter_all"));
    expect(mockPlayClick).toHaveBeenCalledTimes(2);
  });

  it("plays success on skill card click", () => {
    render(<InteractiveSkills />);
    const reactCard = screen.getByLabelText("React: undefined%");
    fireEvent.click(reactCard);
    expect(mockPlaySuccess).toHaveBeenCalled();
  });

  it("plays success on skill card Enter key", () => {
    render(<InteractiveSkills />);
    const reactCard = screen.getByLabelText("React: undefined%");
    fireEvent.keyDown(reactCard, { key: "Enter" });
    expect(mockPlaySuccess).toHaveBeenCalled();
  });
});
