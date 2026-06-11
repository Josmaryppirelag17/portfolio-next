import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperienceTimeline from "@/components/organisms/ExperienceTimeline";

const mockExperience = vi.fn(() => []);

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const dict: Record<string, string> = {
        journey_system_file: "JOURNEY_SYS",
        journey_heading: "MY PATH",
        empty_experience: "NO MILESTONES",
        empty_experience_desc: "Nothing to show yet",
      };
      return dict[key] || key;
    },
    experience: mockExperience(),
  }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playHover: vi.fn() },
}));

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
    mockExperience.mockReturnValue([
      {
        id: "m1",
        period: "2024",
        role: "Developer",
        company: "ACME",
        description: "Built stuff",
        bullets: ["Feature X"],
        tags: ["React"],
      },
    ]);
    render(<ExperienceTimeline />);
    expect(screen.getByText("Developer")).toBeDefined();
    expect(screen.getByText(/ACME/)).toBeDefined();
    expect(screen.getByText("Feature X")).toBeDefined();
  });
});
