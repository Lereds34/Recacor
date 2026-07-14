import type { Metadata } from "next";
import Script from "next/script";
import { MecaniqueClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Garage mécanique Montpellier — entretien auto sans RDV",
  description:
    "Garage mécanique à Montpellier — Le Crès : vidange, freinage, révision et parallélisme sans rendez-vous. Devis gratuit et intervention rapide.",
  alternates: { canonical: "/mecanique" },
  openGraph: {
    title: "Garage mécanique Montpellier — entretien auto sans RDV",
    description:
      "Entretien auto sans rendez-vous à Montpellier — Le Crès : vidange, freinage, révision et parallélisme chez Recacor.",
    url: "https://www.recacor.fr/mecanique",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Garage mécanique automobile Montpellier",
  serviceType: "Auto Repair",
  description: "Entretien mécanique automobile à Montpellier — Le Crès : vidange, freinage, révision et parallélisme sans rendez-vous. Toutes marques.",
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
    name: "Entretien mécanique automobile",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Vidange" },
        priceSpecification: { "@type": "PriceSpecification", price: "79", priceCurrency: "EUR", minPrice: "79" },
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
