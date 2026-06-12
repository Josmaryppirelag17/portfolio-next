import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

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
});
