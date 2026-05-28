import type { Metadata } from "next";
import { MecaniqueClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getSetting } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Mécanique Légère Montpellier — Garage Recacor Le Crès",
  description:
    "Révision, freinage, amortisseurs, train roulant. Mécanique légère pour particuliers à Montpellier — Le Crès. Sans RDV.",
  alternates: { canonical: "/mecanique" },
};

export default async function MecaniquePage() {
  const heroImage = await getSetting("hero_image_mecanique");
  return (
    <>
      <MecaniqueClient heroImage={heroImage} />
      <RelatedArticles categorie="mecanique" />
    </>
  );
}
