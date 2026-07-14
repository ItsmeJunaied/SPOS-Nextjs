/**
 * Site-wide JSON-LD structured data (Organization + WebSite + SoftwareApplication).
 * Rendered in the root layout so every page ships rich-result metadata for search
 * engines. Server component — emitted in the initial HTML.
 */
const BASE = "https://salonix.io";

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Salonix",
      url: BASE,
      logo: `${BASE}/logo.png`,
      description:
        "All-in-one POS, bookings, inventory and payroll for modern salons.",
      sameAs: [
        "https://www.facebook.com/salonix",
        "https://www.linkedin.com/company/salonix",
        "https://twitter.com/salonix",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Salonix",
      publisher: { "@id": `${BASE}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Salonix",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Windows, Android, iOS",
      description:
        "Salon management and POS: bookings, inventory, payroll and multi-branch dashboards.",
      offers: {
        "@type": "Offer",
        price: "4900",
        priceCurrency: "BDT",
        category: "subscription",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "120",
      },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
