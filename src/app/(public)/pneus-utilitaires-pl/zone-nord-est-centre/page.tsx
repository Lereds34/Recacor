import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { RelatedArticles } from "@/components/related-articles";
import { PlZoneNordEstCentreClient } from "./client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus poids lourd Zone Nord-Est & Centre | Transport, remorque",
  description:
    "Recacor accompagne les besoins pneus poids lourd sur la zone Nord-Est & Centre, avec un focus transport, remorque, TP et parc multi-sites.",
  alternates: { canonical: "/pneus-utilitaires-pl/zone-nord-est-centre" },
  openGraph: {
    title: "Pneus poids lourd Zone Nord-Est & Centre | Transport, remorque",
    description:
      "Une page zone Recacor pour les demandes pneus poids lourd orientées transport, remorque, TP et flotte multi-sites.",
    url: "https://www.recacor.fr/pneus-utilitaires-pl/zone-nord-est-centre",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function PlZoneNordEstCentrePage() {
  const heroImage = await getAsset("pl_hero_image", "");
  return (
    <>
      <PlZoneNordEstCentreClient heroImage={heroImage} />
      <RelatedArticles categorie="pneus-pl" />
    </>
  );
}
