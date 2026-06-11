import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isDev = process.env.NODE_ENV === "development";

const scriptSrc = ["'strict-dynamic'", "'nonce-{nonce}'", ...(isDev ? ["'unsafe-eval'"] : [])].join(
  " ",
);

const CONTENT_SECURITY_POLICY = [
  `default-src 'self'`,
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.ingest.sentry.io https://*.ingest.us.sentry.io wss://*",
  "media-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=(), fullscreen=(self)",
  "X-Permitted-Cross-Domain-Policies": "none",
  "X-DNS-Prefetch-Control": "off",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Powered-By": "",
};

const NONCE_HEADER = "x-nonce";

export function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(NONCE_HEADER, nonce);

  const csp = CONTENT_SECURITY_POLICY.replace("{nonce}", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set(NONCE_HEADER, nonce);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (value) {
      response.headers.set(key, value);
    } else {
      response.headers.delete(key);
    }
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api/|_next/|_static|_vercel|favicon|robots|sitemap|opengraph-image).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
