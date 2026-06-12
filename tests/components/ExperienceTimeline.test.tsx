import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ExperienceTimeline from "@/components/organisms/ExperienceTimeline";

const { mockPlayHover, mockPlayClick } = vi.hoisted(() => ({
  mockPlayHover: vi.fn(),
  mockPlayClick: vi.fn(),
}));

const mockExperience = vi.fn(() => []);

const dict: Record<string, string> = {
  journey_system_file: "JOURNEY_SYS",
  journey_heading: "MY PATH",
  empty_experience: "NO MILESTONES",
  empty_experience_desc: "Nothing to show yet",
};

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => dict[key] || key,
    experience: mockExperience(),
  }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playHover: mockPlayHover, playClick: mockPlayClick },
}));

const milestone = {
  id: "m1",
  period: "2024",
  role: "Developer",
  company: "ACME",
  description: "Built stuff",
  bullets: ["Feature X"],
  tags: ["React"],
};

describe("ExperienceTimeline", () => {
  it("renders section with translated heading", () => {
    render(<ExperienceTimeline />);
    expect(screen.getByText("JOURNEY_SYS")).toBeDefined();
    expect(screen.getByText("MY PATH")).toBeDefined();
  });

  it("shows empty state when no milestones", () => {
    render(<ExperienceTimeline />);
    expect(screen.getByText("NO MILESTONES")).toBeDefined();
    expect(screen.getByText("Nothing to show yet")).toBeDefined();
  });

  it("renders milestones when present", () => {
    mockExperience.mockReturnValue([milestone]);
    render(<ExperienceTimeline />);
    expect(screen.getByText("Developer")).toBeDefined();
    expect(screen.getByText(/ACME/)).toBeDefined();
    expect(screen.getByText("Feature X")).toBeDefined();
  });

  it("plays hover sound on mouse enter", () => {
    mockExperience.mockReturnValue([milestone]);
    render(<ExperienceTimeline />);
    const card = screen.getByLabelText("2024: Developer at ACME");
    fireEvent.mouseEnter(card);
    expect(mockPlayHover).toHaveBeenCalled();
  });

  it("plays click sound on mouse click", () => {
    mockExperience.mockReturnValue([milestone]);
    render(<ExperienceTimeline />);
    const card = screen.getByLabelText("2024: Developer at ACME");
    fireEvent.click(card);
    expect(mockPlayClick).toHaveBeenCalled();
  });

  it("plays click sound on Enter key", () => {
    mockExperience.mockReturnValue([milestone]);
    render(<ExperienceTimeline />);
    const card = screen.getByLabelText("2024: Developer at ACME");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(mockPlayClick).toHaveBeenCalled();
  });
});
