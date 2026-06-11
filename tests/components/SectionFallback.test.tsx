import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SectionFallback from "@/components/atoms/SectionFallback";

describe("SectionFallback", () => {
  it("renders a div", () => {
    const { container } = render(<SectionFallback />);
    expect(container.firstChild).toBeDefined();
  });

  it("has aria-hidden", () => {
    const { container } = render(<SectionFallback />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("has min-height class", () => {
    const { container } = render(<SectionFallback />);
    expect(container.firstChild).toHaveClass("min-h-[40rem]");
  });
});
