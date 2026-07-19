import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { RelatedArticles } from "@/components/related-articles";
import { PlZoneSudCorseClient } from "./client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus poids lourd Zone Sud & Corse | Transport, remorque, TP",
  description:
    "Recacor accompagne les demandes pneus poids lourd sur la zone Sud & Corse pour le transport, la remorque, le chantier et les flottes régionales, avec relais selon le secteur.",
  alternates: { canonical: "/pneus-utilitaires-pl/zone-sud-corse" },
  openGraph: {
    title: "Pneus poids lourd Zone Sud & Corse | Transport, remorque, TP",
    description:
      "Une page zone Recacor pour les besoins pneus poids lourd en transport, remorque, chantier et flotte régionale.",
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
