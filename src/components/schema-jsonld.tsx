import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <Script
      id={`breadcrumb-${items[items.length - 1].name.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "AutoRepair", name: "Recacor" },
    areaServed: "Montpellier, Hérault",
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "EUR",
      },
    }),
  };
  return (
    <Script
      id={`service-${name.toLowerCase().replace(/\s/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  q: string;
  a: string;
}

export function FaqJsonLd({ items, id = "faq" }: { items: FaqItem[]; id?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <Script
      id={`faq-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Recacor Montpellier — Le Crès",
    image: "https://www.recacor.fr/logo-recacor.webp",
    url: "https://www.recacor.fr",
    telephone: "+33499533390",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1240 Route de Nîmes",
      addressLocality: "Le Crès",
      postalCode: "34920",
      addressRegion: "Hérault",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6285,
      longitude: 3.9412,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    priceRange: "€€",
    areaServed: [
      { "@type": "City", name: "Montpellier" },
      { "@type": "AdministrativeArea", name: "Hérault" },
    ],
    hasMap: "https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès",
  };
  return (
    <Script
      id="local-business"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
