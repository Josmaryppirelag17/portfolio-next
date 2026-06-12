import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHeader, { SectionSystemLabel } from "@/components/atoms/SectionHeader";

describe("SectionHeader", () => {
  it("renders heading text", () => {
    render(<SectionHeader heading="Hello World" />);
    expect(screen.getByText("Hello World")).toBeDefined();
  });

  it("renders label when provided", () => {
    render(<SectionHeader heading="Test" labelKey="MY_LABEL" />);
    expect(screen.getByText("MY_LABEL")).toBeDefined();
  });

  it("does not render label when omitted", () => {
    const { container } = render(<SectionHeader heading="No Label" />);
    const labelEl = container.querySelector(".font-mono.text-xs");
    expect(labelEl).toBeNull();
  });

  it("applies custom stroke color", () => {
    render(<SectionHeader heading="Custom" strokeColor="#00FF00" />);
    const h2 = screen.getByText("Custom");
    expect(h2.style.webkitTextStroke).toBe("2px #00FF00");
  });
});

describe("SectionSystemLabel", () => {
  it("renders children", () => {
    const { container } = render(<SectionSystemLabel>TEST_LABEL</SectionSystemLabel>);
    expect(container.firstChild).toBeDefined();
  });
});
