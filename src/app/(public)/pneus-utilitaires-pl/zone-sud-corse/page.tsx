import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { RelatedArticles } from "@/components/related-articles";
import { PlZoneSudCorseClient } from "./client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus poids lourd Zone Sud & Corse | Transport, remorque, TP",
  description:
    "Page zone Recacor pour les demandes pneus poids lourd orientées transport, remorque, TP et flotte régionale, avec prise en charge selon point d'appui et disponibilité.",
  alternates: { canonical: "/pneus-utilitaires-pl/zone-sud-corse" },
  openGraph: {
    title: "Pneus poids lourd Zone Sud & Corse | Transport, remorque, TP",
    description:
      "Dimensions, multi-essieux, remorque, chantier, premium ou budget : une page zone Recacor pensée pour les vraies demandes PL.",
    url: "https://www.recacor.fr/pneus-utilitaires-pl/zone-sud-corse",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function PlZoneSudCorsePage() {
  const heroImage = await getAsset("pl_hero_image", "");
  return (
    <>
      <PlZoneSudCorseClient heroImage={heroImage} />
      <RelatedArticles categorie="pneus-pl" />
    </>
  );
}
