import type { Metadata } from "next";
import { PneusVoitureClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getSetting } from "@/lib/db";

export const metadata: Metadata = {
  title: "Pneus Voiture Montpellier — Toutes marques au Crès",
  description:
    "Pneus été, hiver et 4 saisons à prix discount. Stock disponible, montage en 15min sans RDV à Montpellier — Le Crès.",
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
