import type { Metadata } from "next";
import { ControleTechniqueClient } from "./client";

export const metadata: Metadata = {
  title: "Contrôle technique Montpellier : pré-contrôle + prise en charge",
  description:
    "Recacor Le Crès prépare votre voiture avant le contrôle technique, propose un devis si un point bloque, puis peut gérer le passage au CT. Pré-contrôle dès 29€.",
  alternates: { canonical: "/services/prise-en-charge-controle-technique" },
  openGraph: {
    title: "Contrôle technique Montpellier : pré-contrôle + prise en charge",
    description:
      "Pré-contrôle, devis, réparations validées puis prise en charge du contrôle technique au Crès, près de Montpellier.",
    url: "https://www.recacor.fr/services/prise-en-charge-controle-technique",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ControleTechniquePage() {
  return <ControleTechniqueClient />;
}
