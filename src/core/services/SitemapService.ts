import { escapeXml } from "@/utils/escape";

export const runtime = "edge";

const SITE_URL = "https://josmarypirela.dev";

function url(
  loc: string,
  priority: string,
  lastmod: string,
  alternates: { hreflang: string; href: string }[],
) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
${alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escapeXml(a.href)}"/>`).join("\n")}
  </url>`;
}

export async function generateSitemapResponse(): Promise<Response> {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${url(`${SITE_URL}/`, "1.0", today, [
  { hreflang: "es", href: `${SITE_URL}/` },
  { hreflang: "en", href: `${SITE_URL}/en/` },
  { hreflang: "x-default", href: `${SITE_URL}/` },
])}
${url(`${SITE_URL}/en/`, "1.0", today, [
  { hreflang: "es", href: `${SITE_URL}/` },
  { hreflang: "en", href: `${SITE_URL}/en/` },
  { hreflang: "x-default", href: `${SITE_URL}/` },
])}
</urlset>`;

    return new Response(xml, {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=86400, s-maxage=3600, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("[api/sitemap]", error);
    return new Response("Failed to generate sitemap", { status: 500 });
  }
}
