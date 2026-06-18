import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import { headers } from "next/headers";
import { StructuredData } from "@/components/atoms/StructuredData";
import GAScript from "@/components/atoms/GAScript";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  fallback: ["Consolas", "Monaco", "monospace"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "optional",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  weight: ["700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://josmarypirela.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111232",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Josmary Pirela | Creative Full-Stack Developer",
    template: "%s | Josmary Pirela",
  },
  description:
    "Portfolio de Josmary Pirela: interfaces interactivas, React, Next.js y experiencias web de alto rendimiento. Proyectos, trayectoria y contacto.",
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/en" },
  },
  openGraph: {
    title: "Josmary Pirela | Creative Full-Stack Developer",
    description:
      "Portfolio de Josmary Pirela: interfaces interactivas, React, Next.js y experiencias web de alto rendimiento.",
    url: SITE_URL,
    siteName: "Josmary Pirela",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Josmary Pirela — Creative Full-Stack Developer",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josmary Pirela | Creative Full-Stack Developer",
    description:
      "Portfolio de Josmary Pirela: interfaces interactivas, React, Next.js y experiencias web de alto rendimiento.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html
      lang="es"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} ${syne.variable}`}
      nonce={nonce}
      suppressHydrationWarning
    >
      <body>
        <GAScript />
        <StructuredData />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
