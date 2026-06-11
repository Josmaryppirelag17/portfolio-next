import { describe, it, expect } from "vitest";
import { escapeHtml, escapeXml } from "@/utils/escape";

describe("escapeHtml", () => {
  it("escapes & < > \" ' /", () => {
    const result = escapeHtml(`&<>"'/`);
    expect(result).toBe("&amp;&lt;&gt;&quot;&#x27;&#x2F;");
  });

  it("returns safe strings unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });
});

describe("escapeXml", () => {
  it("escapes & < > \" but not ' or /", () => {
    const result = escapeXml(`&<>"'/`);
    expect(result).toBe("&amp;&lt;&gt;&quot;'/");
  });

  it("returns safe strings unchanged", () => {
    expect(escapeXml("hello world")).toBe("hello world");
  });
});
