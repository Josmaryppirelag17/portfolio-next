import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PortfolioErrorBoundary from "@/components/molecules/ErrorBoundary";

vi.mock("@sentry/react", () => ({ captureException: vi.fn() }));

describe("PortfolioErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <PortfolioErrorBoundary>
        <div>Child Content</div>
      </PortfolioErrorBoundary>
    );
    expect(screen.getByText("Child Content")).toBeDefined();
  });

  it("renders error fallback on error", () => {
    const Throw = () => { throw new Error("Test error"); };
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <PortfolioErrorBoundary>
        <Throw />
      </PortfolioErrorBoundary>
    );
    expect(screen.getByText(/Oops/)).toBeDefined();
    expect(screen.getByText(/Recargar la pagina/)).toBeDefined();
    expect(screen.getByRole("alert")).toBeDefined();
    spy.mockRestore();
  });

  it("shows error message in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    const Throw = () => { throw new Error("Dev error"); };
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <PortfolioErrorBoundary>
        <Throw />
      </PortfolioErrorBoundary>
    );
    expect(screen.getByText("Dev error")).toBeDefined();
    spy.mockRestore();
    vi.unstubAllEnvs();
  });
});
