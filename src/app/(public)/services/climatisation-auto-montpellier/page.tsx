import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { ClimatisationClient } from "./client";

export const metadata: Metadata = {
  title: "Recharge clim voiture Montpellier — dès 59€",
  description:
    "Recharge clim voiture à Montpellier — Le Crès dès 59€. Contrôle du fonctionnement avant recharge, avec ou sans rendez-vous. Devis clim en ligne.",
  alternates: { canonical: "/services/climatisation-auto-montpellier" },
  openGraph: {
    title: "Recharge clim voiture Montpellier — dès 59€",
    description:
      "Recharge clim voiture à Montpellier — Le Crès dès 59€, avec contrôle du fonctionnement avant intervention.",
    url: "https://www.recacor.fr/services/climatisation-auto-montpellier",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function ClimatisationPage() {
  const heroImage = await getAsset("hero_image_climatisation", "");
  return <ClimatisationClient heroImage={heroImage} />;
}
