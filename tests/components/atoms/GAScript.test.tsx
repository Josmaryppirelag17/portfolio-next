import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";

// We need to mock next/script for the GA_ID set case
vi.mock("next/script", () => ({
  default: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe("GAScript", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns null when GA_ID is not set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    const { default: GAScript } = await import("@/components/atoms/GAScript");
    const { container } = render(<GAScript />);
    expect(container.innerHTML).toBe("");
  });

  it("renders Script tags when GA_ID is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-XXXXXXXXXX");
    const { default: GAScript } = await import("@/components/atoms/GAScript");
    const { container } = render(<GAScript />);
    expect(container.innerHTML).not.toBe("");
  });
});
