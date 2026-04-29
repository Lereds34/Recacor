import type { Metadata } from "next";
import { PlClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getSetting } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pneus Poids Lourd Hérault — Agricole & Industriel",
  description:
    "Spécialiste pneus PL, agricoles et industriels en Hérault. Recreusage, assistance sur site 24/7. Devis gratuit.",
  alternates: { canonical: "/pneus-utilitaires-pl" },
};

export default async function PlPage() {
  const heroImage = await getSetting("hero_image_pneus_pl");
  return (
    <>
      <PlClient heroImage={heroImage} />
      <RelatedArticles categorie="pneus-pl" />
    </>
  );
}
