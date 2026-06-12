import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "@/app/error";

describe("Error page", () => {
  it("renders error state with reload button", () => {
    const reset = vi.fn();
    render(<ErrorPage error={new Error("test")} reset={reset} />);
    expect(screen.getByText("SYSTEM ERROR")).toBeDefined();
    expect(screen.getByLabelText("Recargar página")).toBeDefined();
  });

  it("calls reset on button click", () => {
    const reset = vi.fn();
    render(<ErrorPage error={new Error("test")} reset={reset} />);
    screen.getByLabelText("Recargar página").click();
    expect(reset).toHaveBeenCalledOnce();
  });
});
