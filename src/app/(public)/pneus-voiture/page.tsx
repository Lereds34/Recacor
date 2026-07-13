import type { Metadata } from "next";
import Script from "next/script";
import { PneusVoitureClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus Montpellier dès 45€ montés | Garage pneu Recacor",
  description:
    "Garage pneu à Montpellier — Le Crès. Changement, montage et équilibrage de pneus voiture dès 45€ montés, sans rendez-vous et avec stock immédiat.",
  alternates: { canonical: "/pneus-voiture" },
  openGraph: {
    title: "Pneus Montpellier dès 45€ montés | Garage pneu Recacor",
    description:
      "Changement et montage de pneus voiture à Montpellier — Le Crès. Toutes marques, stock immédiat et devis rapide sans rendez-vous.",
    url: "https://www.recacor.fr/pneus-voiture",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pneus Montpellier dès 45€ montés | Garage pneu Recacor",
    description:
      "Garage pneu à Montpellier — Le Crès. Pneus voiture, montage rapide, équilibrage et devis gratuit sans rendez-vous.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Garage pneu Montpellier",
  serviceType: "Tire Installation",
  description:
    "Changement, montage et équilibrage de pneus voiture à Montpellier — Le Crès. Toutes marques, stock immédiat, sans rendez-vous.",
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
