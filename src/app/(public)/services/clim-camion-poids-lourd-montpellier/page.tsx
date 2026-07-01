import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { ClimCamionClient } from "./client";

export const metadata: Metadata = {
  title: "Clim camion Montpellier - Recharge clim poids lourd dès 149€",
  description:
    "Clim camion et poids lourd à Montpellier. Recharge clim dès 149€ pour poids lourds, TP et agricoles, au garage du Crès ou sur site.",
  alternates: { canonical: "/services/clim-camion-poids-lourd-montpellier" },
};

export default async function ClimCamionPage() {
  const heroImage = await getAsset("hero_image_climatisation", "");
  return <ClimCamionClient heroImage={heroImage} />;
}
