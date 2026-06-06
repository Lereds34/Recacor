import type { Metadata } from "next";
import Script from "next/script";
import { PneusVoitureClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus Voiture Montpellier | À partir de 45€ montés — Recacor Le Crès",
  description:
    "Pneus été, hiver et 4 saisons dès 45€ montés. Stock immédiat, montage en 15 min sans RDV à Montpellier — Le Crès. Toutes marques.",
  alternates: { canonical: "/pneus-voiture" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Montage pneus voiture Montpellier",
  serviceType: "Tire Installation",
  description: "Montage et équilibrage de pneus toutes marques sans rendez-vous. Stock immédiat, intervention en 15 minutes.",
  url: "https://www.recacor.fr/pneus-voiture",
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
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "45",
      priceCurrency: "EUR",
      minPrice: "45",
      description: "À partir de 45€ le pneu monté et équilibré",
    },
    availability: "https://schema.org/InStock",
    seller: { "@type": "AutoRepair", name: "Recacor" },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pneus voiture",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pneus été" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pneus hiver" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pneus 4 saisons" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Équilibrage roues" } },
    ],
  },
};

export default async function PneusVoiturePage() {
  const heroImage = await getAsset("vl_visual_image", "");
  return (
    <>
      <Script
        id="schema-pneus-voiture"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PneusVoitureClient heroImage={heroImage} />
      <RelatedArticles categorie="pneus-voiture" />
    </>
  );
}
