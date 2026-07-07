import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { ClimatisationClient } from "./client";

export const metadata: Metadata = {
  title: "Recharge clim voiture Montpellier — dès 59€",
  description:
    "Recharge clim voiture à Montpellier — Le Crès dès 59€. Contrôle du fonctionnement avant recharge, avec ou sans rendez-vous. Devis clim en ligne.",
  alternates: { canonical: "/services/climatisation-auto-montpellier" },
};

export default async function ClimatisationPage() {
  const heroImage = await getAsset("hero_image_climatisation", "");
  return <ClimatisationClient heroImage={heroImage} />;
}
