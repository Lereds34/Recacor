import type { Metadata } from "next";
import { MecaniqueClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";

export const metadata: Metadata = {
  title: "Mécanique Légère Montpellier — Garage Recacor Le Crès",
  description:
    "Révision, freinage, amortisseurs, train roulant. Mécanique légère pour particuliers à Montpellier — Le Crès. Sans RDV.",
  alternates: { canonical: "/mecanique" },
};

export default function MecaniquePage() {
  return (
    <>
      <MecaniqueClient />
      <RelatedArticles categorie="mecanique" />
    </>
  );
}
