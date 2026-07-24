import type { Metadata } from "next";
import { RecreusageClient } from "./client";

export const metadata: Metadata = {
  title: "Recreusage pneus poids lourd : service flotte depuis Le Crès",
  description:
    "Recreusage pneus poids lourd pour transporteurs et flottes. Contrôle de carcasse, lecture du parc et devis B2B depuis Le Crès près de Montpellier.",
  alternates: { canonical: "/services/recreusage" },
  openGraph: {
    title: "Recreusage pneus poids lourd : service flotte depuis Le Crès",
    description:
      "Recreusage pneus poids lourd pour flottes et transporteurs, avec contrôle de carcasse et devis B2B depuis Le Crès.",
    url: "https://www.recacor.fr/services/recreusage",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RecreusagePage() {
  return <RecreusageClient />;
}
