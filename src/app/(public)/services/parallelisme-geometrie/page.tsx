import type { Metadata } from "next";
import { ParallelismeClient } from "./client";

export const metadata: Metadata = {
  title: "Parallélisme Montpellier — sans RDV",
  description:
    "Parallélisme et géométrie voiture à Montpellier — Le Crès. Résultat en 30min. Prix discount, sans rendez-vous.",
  alternates: { canonical: "/services/parallelisme-geometrie" },
  openGraph: {
    title: "Parallélisme Montpellier — sans RDV",
    description:
      "Parallélisme et géométrie voiture à Montpellier — Le Crès. Réglage précis, sans rendez-vous.",
    url: "https://www.recacor.fr/services/parallelisme-geometrie",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ParallelismePage() {
  return <ParallelismeClient />;
}
