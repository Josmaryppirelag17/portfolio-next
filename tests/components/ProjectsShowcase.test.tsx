import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsShowcase from "@/components/organisms/ProjectsShowcase";

vi.mock("@/context/LanguageContext", () => ({
  useLanguage: () => ({ t: (key: string) => key, projects: mockProjects }),
}));

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn() },
}));

const mockProjects = [
  {
    id: "polyform-3d",
    title: "Polyform 3D Engine",
    category: "Creative Frontend & Canvas",
    description: "An interactive WebGL procedural shape customizer.",
    longDescription: "A browser-based 3D engine for procedural geometry.",
    techStack: ["React", "Three.js", "GLSL"],
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
    liveUrl: "https://synth.example.com",
    githubUrl: "https://github.com/user/neon-vibe-synth",
    imageGlowColor: "#FD1EB1",
    accentColor: "brand-pink",
    features: ["Preset waves", "Oscillator blending"],
  },
];

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

  it("renders tech stack tags", () => {
    render(<ProjectsShowcase />);
    expect(screen.getAllByText(/^React$/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^GLSL$/).length).toBeGreaterThan(0);
  });

  it("renders first project features by default", () => {
    render(<ProjectsShowcase />);
    expect(screen.getByText("Real-time vertex manipulation")).toBeDefined();
  });
});
