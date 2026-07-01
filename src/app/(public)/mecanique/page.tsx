import type { Metadata } from "next";
import Script from "next/script";
import { MecaniqueClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vidange et révision Montpellier — sans RDV",
  description:
    "Vidange à partir de 65€, freinage, parallélisme, révision. Garage mécanique sans rendez-vous à Montpellier — Le Crès. Devis gratuit.",
  alternates: { canonical: "/mecanique" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mécanique automobile Montpellier",
  serviceType: "Auto Repair",
  description: "Vidange, freinage, révision et parallélisme sans rendez-vous à Montpellier — Le Crès. Toutes marques.",
  url: "https://www.recacor.fr/mecanique",
  provider: {
    "@type": "AutoRepair",
    name: "Recacor",
    url: "https://www.recacor.fr",
    telephone: "+33499533390",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1240 Route de Nîmes",
      addressLocality: "Le Crès",
      postalCode: "34920",
      addressCountry: "FR",
    },
  },
  areaServed: [
    { "@type": "City", name: "Montpellier" },
    { "@type": "City", name: "Le Crès" },
    { "@type": "AdministrativeArea", name: "Hérault" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services mécaniques",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Vidange" },
        priceSpecification: { "@type": "PriceSpecification", price: "65", priceCurrency: "EUR", minPrice: "65" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Parallélisme et géométrie" },
        priceSpecification: { "@type": "PriceSpecification", price: "65", priceCurrency: "EUR", minPrice: "65" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Freinage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Révision" } },
    ],
  },
};

export default async function MecaniquePage() {
  const heroImage = await getAsset("mecanique_visual", "");
  return (
    <>
      <Script
        id="schema-mecanique"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <MecaniqueClient heroImage={heroImage} />
      <RelatedArticles categorie="mecanique" />
    </>
  );
}
