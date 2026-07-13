import type { Metadata } from "next";
import { VidangeClient } from "./client";

export const metadata: Metadata = {
  title: "Vidange voiture Montpellier — dès 79€",
  description:
    "Vidange complète sans RDV à Montpellier — Le Crès. Huile + filtre inclus. Résultat en 30min. Appelez ou devis en ligne.",
  alternates: { canonical: "/services/vidange" },
  openGraph: {
    title: "Vidange voiture Montpellier — dès 79€",
    description:
      "Vidange complète sans rendez-vous à Montpellier — Le Crès. Huile + filtre inclus, résultat en 30 minutes.",
    url: "https://www.recacor.fr/services/vidange",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function VidangePage() {
  return <VidangeClient />;
}
