import type { Metadata } from "next";
import { PlClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";

export const metadata: Metadata = {
  title: "Pneus Poids Lourd Hérault — Agricole & Industriel",
  description:
    "Spécialiste pneus PL, agricoles et industriels en Hérault. Recreusage, assistance sur site 24/7. Devis gratuit.",
  alternates: { canonical: "/pneus-utilitaires-pl" },
};

export default function PlPage() {
  return (
    <>
      <PlClient />
      <RelatedArticles categorie="pneus-pl" />
    </>
  );
}
