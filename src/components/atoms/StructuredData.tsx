const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://josmarypirela.dev";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Josmary Pirela",
      description: "Portfolio de Josmary Pirela: desarrollo full-stack creativo con React y Next.js.",
      inLanguage: ["es", "en"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Josmary Pirela",
      url: SITE_URL,
      jobTitle: "Creative Full-Stack Developer",
      sameAs: ["https://github.com/josmaryppirelag17"],
      knowsAbout: ["React", "TypeScript", "Next.js", "UI Engineering", "Tailwind CSS"],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
