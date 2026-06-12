import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { StructuredData } from "@/components/atoms/StructuredData";

describe("StructuredData (Portfolio)", () => {
  it("renders a script tag with JSON-LD type", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector("script[type='application/ld+json']");
    expect(script).toBeDefined();
  });

  it("contains valid JSON with WebSite and Person", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector("script")!;
    const json = JSON.parse(script.innerHTML);
    expect(json["@context"]).toBe("https://schema.org");
    const types = json["@graph"].map((item: any) => item["@type"]);
    expect(types).toContain("WebSite");
    expect(types).toContain("Person");
  });
});
