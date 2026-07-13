import type { Metadata } from "next";
import { PlClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus poids lourd Hérault - Assistance 24/7, recreusage",
  description:
    "Spécialiste pneus poids lourd, agricoles et industriels dans l'Hérault. Assistance sur site 24/7, recreusage et devis flotte rapide avec Recacor.",
  alternates: { canonical: "/pneus-utilitaires-pl" },
  openGraph: {
    title: "Pneus poids lourd Hérault - Assistance 24/7, recreusage",
    description:
      "Pneus poids lourd, agricoles et industriels dans l'Hérault. Assistance sur site 24/7, recreusage et devis flotte rapide.",
    url: "https://www.recacor.fr/pneus-utilitaires-pl",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function PlPage() {
  const heroImage = await getAsset("pl_hero_image", "");
  return (
    <>
      <PlClient heroImage={heroImage} />
      <RelatedArticles categorie="pneus-pl" />
    </>
  );
}
