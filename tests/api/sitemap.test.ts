import { describe, it, expect, vi } from "vitest";

vi.mock("next/server", () => ({
  NextRequest: class extends Request {},
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) =>
      new Response(JSON.stringify(body), {
        status: init?.status ?? 200,
        headers: { "content-type": "application/json" },
      }),
  },
}));

const { GET } = await import("@/app/api/sitemap/route");

describe("sitemap route handler", () => {
  it("returns 200 with XML content-type", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe(
      "application/xml; charset=utf-8"
    );
  });

  it("includes both ES and EN URLs", async () => {
    const res = await GET();
    const text = await res.text();
    expect(text).toContain("josmarypirela.dev/");
    expect(text).toContain("josmarypirela.dev/en/");
  });

  it("includes x-default hreflang", async () => {
    const res = await GET();
    const text = await res.text();
    expect(text).toContain('hreflang="x-default"');
  });

  it("returns valid XML structure", async () => {
    const res = await GET();
    const text = await res.text();
    expect(text).toContain('<?xml version="1.0"');
    expect(text).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(text).toContain("<loc>");
    expect(text).toContain("<priority>");
    expect(text).toContain("<lastmod>");
  });
});
