import type { Metadata } from "next";
import { PneusVoitureClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getSetting } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pneus Voiture Montpellier | À partir de 45€ montés — Recacor Le Crès",
  description:
    "Pneus été, hiver et 4 saisons dès 45€ montés. Stock immédiat, montage en 15 min sans RDV à Montpellier — Le Crès. Toutes marques.",
  alternates: { canonical: "/pneus-voiture" },
};

export default async function PneusVoiturePage() {
  const heroImage = await getSetting("hero_image_pneus_vl");
  return (
    <>
      <PneusVoitureClient heroImage={heroImage} />
      <RelatedArticles categorie="pneus-voiture" />
    </>
  );
}
