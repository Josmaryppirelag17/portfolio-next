import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsShowcase from "@/components/organisms/ProjectsShowcase";

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    projects: [
      {
        id: "polyform-3d",
        title: "Polyform 3D Engine",
        category: "Creative Frontend & Canvas",
        description: "An interactive WebGL procedural shape customizer.",
        longDescription: "A browser-based 3D engine for procedural geometry.",
        techStack: ["React", "Three.js", "GLSL", "WebGPU"],
        liveUrl: "https://polyform.example.com",
        githubUrl: "https://github.com/user/polyform-3d",
        imageGlowColor: "#18BEC7",
        accentColor: "brand-cyan",
        features: ["Real-time vertex manipulation", "Custom shader pipeline"],
      },
      {
        id: "neon-vibe-synth",
        title: "Neon Vibe Synth",
        category: "Audio Visual",
        description: "A Web Audio API synthesizer.",
        longDescription: "A monophonic synthesizer with preset waves.",
        techStack: ["Web Audio API", "React"],
        liveUrl: "",
        githubUrl: "https://github.com/user/neon-vibe-synth",
        imageGlowColor: "#FD1EB1",
        accentColor: "brand-pink",
        features: ["Preset waves", "Oscillator blending"],
      },
    ],
  }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn() },
}));

describe("ProjectsShowcase", () => {
  it("renders project titles", () => {
    render(<ProjectsShowcase />);
    expect(screen.getAllByText("Polyform 3D Engine").length).toBeGreaterThan(0);
    expect(screen.getByText("Neon Vibe Synth")).toBeDefined();
  });

  it("renders section heading", () => {
    render(<ProjectsShowcase />);
    expect(screen.getByText("exhibition_heading")).toBeDefined();
  });

  it("renders first project features by default", () => {
    render(<ProjectsShowcase />);
    expect(screen.getByText("Real-time vertex manipulation")).toBeDefined();
  });

  it("shows more tech link when >3 items", () => {
    render(<ProjectsShowcase />);
    expect(screen.getByText("+1 more")).toBeDefined();
  });

  it("renders all tech stack items in detail panel", () => {
    render(<ProjectsShowcase />);
    expect(screen.getByText("WebGPU")).toBeDefined();
  });
});
