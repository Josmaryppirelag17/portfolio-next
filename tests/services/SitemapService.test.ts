import { describe, it, expect } from "vitest";
import handler from "@/core/services/SitemapService";

describe("SitemapService", () => {
  it("returns XML response with 200", async () => {
    const res = await handler();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/xml");
  });

  it("contains urlset with xmlns", async () => {
    const res = await handler();
    const text = await res.text();
    expect(text).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(text).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  });

  it("includes alternate language links", async () => {
    const res = await handler();
    const text = await res.text();
    expect(text).toContain('hreflang="es"');
    expect(text).toContain('hreflang="en"');
    expect(text).toContain('hreflang="x-default"');
  });

  it("includes both / and /en/ URLs", async () => {
    const res = await handler();
    const text = await res.text();
    expect(text).toContain("<loc>https://josmarypirela.dev/</loc>");
    expect(text).toContain("<loc>https://josmarypirela.dev/en/</loc>");
  });

  it("sets cache headers", async () => {
    const res = await handler();
    expect(res.headers.get("cache-control")).toContain("public");
  });
});
