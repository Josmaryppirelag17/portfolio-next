import { describe, it, expect, vi } from "vitest";
import { generateSitemapResponse } from "@/core/services/SitemapService";

describe("SitemapService", () => {
  it("returns XML response with 200", async () => {
    const res = await generateSitemapResponse();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/xml");
  });

  it("contains urlset with xmlns", async () => {
    const res = await generateSitemapResponse();
    const text = await res.text();
    expect(text).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(text).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it("includes alternate language links", async () => {
    const res = await generateSitemapResponse();
    const text = await res.text();
    expect(text).toContain('hreflang="es"');
    expect(text).toContain('hreflang="en"');
    expect(text).toContain('hreflang="x-default"');
  });

  it("includes both / and /en/ URLs", async () => {
    const res = await generateSitemapResponse();
    const text = await res.text();
    expect(text).toContain("<loc>https://josmarypirela.dev/</loc>");
    expect(text).toContain("<loc>https://josmarypirela.dev/en/</loc>");
  });

  it("sets cache headers", async () => {
    const res = await generateSitemapResponse();
    expect(res.headers.get("cache-control")).toContain("public");
  });

  it("returns 500 when generation fails", async () => {
    vi.resetModules();
    vi.doMock("@/utils/escape", () => ({
      escapeXml: () => { throw new Error("mock error"); },
    }));
    const mod = await import("@/core/services/SitemapService");
    const res = await mod.generateSitemapResponse();
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).toContain("Failed to generate sitemap");
  });
});
