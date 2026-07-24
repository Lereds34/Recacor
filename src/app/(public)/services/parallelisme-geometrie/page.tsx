import type { Metadata } from "next";
import { ParallelismeClient } from "./client";

export const metadata: Metadata = {
  title: "Parallélisme Montpellier : contrôle offert, réglage dès 65€",
  description:
    "Parallélisme et géométrie voiture au Crès près de Montpellier. Contrôle offert avec changement de pneus, réglage dès 65€ selon le véhicule.",
  alternates: { canonical: "/services/parallelisme-geometrie" },
  openGraph: {
    title: "Parallélisme Montpellier : contrôle offert, réglage dès 65€",
    description:
      "Parallélisme et géométrie voiture au Crès près de Montpellier. Contrôle offert avec changement de pneus, réglage dès 65€.",
    url: "https://www.recacor.fr/services/parallelisme-geometrie",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ParallelismePage() {
  return <ParallelismeClient />;
}
