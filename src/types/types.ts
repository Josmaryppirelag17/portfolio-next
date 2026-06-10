export type Language = "es" | "en";
export interface SkillItem {
  name: string;
  category:
    | "Architecture"
    | "Systems & Security"
    | "Tooling & DevOps"
    | "Creative Engineering";
  level: number;
  color: string;
}

export const SKILLS_DATA: SkillItem[] = [
  {
    name: "Next.js 16",
    category: "Architecture",
    level: 92,
    color: "brand-cyan",
  },
  {
    name: "React 19",
    category: "Architecture",
    level: 94,
    color: "brand-cyan",
  },
  {
    name: "Vite",
    category: "Architecture",
    level: 84,
    color: "brand-cyan"
  },
  {
    name: "TypeScript 5.8",
    category: "Architecture",
    level: 90,
    color: "brand-pink",
  },
  {
    name: "Tailwind CSS",
    category: "Architecture",
    level: 96,
    color: "brand-lime",
  },
  {
    name: "React Hook Form + Zod",
    category: "Architecture",
    level: 88,
    color: "brand-pink",
  },
  {
    name: "Node.js",
    category: "Systems & Security",
    level: 85,
    color: "brand-lime",
  },
  {
    name: "PostgreSQL + Drizzle",
    category: "Systems & Security",
    level: 84,
    color: "brand-cyan",
  },
  {
    name: "Cybersecurity (Fortinet/ISC2)",
    category: "Systems & Security",
    level: 75,
    color: "brand-pink",
  },
  {
    name: "Framer Motion",
    category: "Creative Engineering",
    level: 92,
    color: "brand-pink",
  },
  {
    name: "Canvas API",
    category: "Creative Engineering",
    level: 85,
    color: "brand-lime",
  },
  {
    name: "Web Audio API",
    category: "Creative Engineering",
    level: 82,
    color: "brand-cyan",
  },
  {
    name: "Turborepo & pnpm",
    category: "Tooling & DevOps",
    level: 75,
    color: "brand-pink",
  },
  {
    name: "Docker",
    category: "Tooling & DevOps",
    level: 72,
    color: "brand-lime",
  },
  {
    name: "GitHub Actions / CI/CD",
    category: "Tooling & DevOps",
    level: 84,
    color: "brand-cyan",
  },
  {
    name: "Vitest / Playwright",
    category: "Tooling & DevOps",
    level: 81,
    color: "brand-pink",
  },
  {
    name: "Sentry / PostHog",
    category: "Tooling & DevOps",
    level: 80,
    color: "brand-lime",
  },
];
