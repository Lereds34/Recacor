import type { Metadata } from "next";
import { ControleTechniqueClient } from "./client";

export const metadata: Metadata = {
  title: "Contrôle technique Montpellier : pré-contrôle offert",
  description:
    "Recacor Le Crès propose le contrôle, le devis et la prise en charge avant le contrôle technique, avec pré-contrôle offert.",
  alternates: { canonical: "/services/prise-en-charge-controle-technique" },
  openGraph: {
    title: "Contrôle technique Montpellier : pré-contrôle offert",
    description:
      "Pré-contrôle offert, devis clair et prise en charge au Crès près de Montpellier avant le contrôle technique.",
    url: "https://www.recacor.fr/services/prise-en-charge-controle-technique",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ControleTechniquePage() {
  return <ControleTechniqueClient />;
}
