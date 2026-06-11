import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "@/app/layout";

vi.mock("next/font/google", () => ({
  JetBrains_Mono: () => ({ className: "jetbrains", variable: "--font-mono" }),
  Space_Grotesk: () => ({ className: "space", variable: "--font-sans" }),
  Syne: () => ({ className: "syne", variable: "--font-display" }),
}));

vi.mock("next/headers", () => ({
  headers: () => new Map([["x-nonce", "test-nonce"]]),
}));

vi.mock("@/components/templates/App", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/organisms/LanguageContext", () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));

describe("RootLayout", () => {
  it("renders without error", () => {
    const { container } = render(<RootLayout><div>Hello</div></RootLayout>);
    expect(container.querySelector("div")).toBeDefined();
  });
});
