import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Code } from "lucide-react";
import WidgetShell from "@/components/atoms/WidgetShell";

describe("WidgetShell", () => {
  it("renders title and status", () => {
    render(
      <WidgetShell title="Test Widget" icon={Code} status="ACTIVE">
        <div data-testid="child" />
      </WidgetShell>,
    );
    expect(screen.getByText("Test Widget")).toBeDefined();
    expect(screen.getByText("ACTIVE")).toBeDefined();
    expect(screen.getByTestId("child")).toBeDefined();
  });
});
