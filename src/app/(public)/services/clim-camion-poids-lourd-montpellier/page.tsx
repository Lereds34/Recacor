import type { Metadata } from "next";
import { getAsset } from "@/lib/site-assets";
import { ClimCamionClient } from "./client";

export const metadata: Metadata = {
  title: "Clim camion Montpellier - Recharge clim poids lourd dès 149€",
  description:
    "Clim camion et poids lourd à Montpellier. Recharge clim dès 149€ pour poids lourds, TP et agricoles, au garage du Crès ou sur site.",
  alternates: { canonical: "/services/clim-camion-poids-lourd-montpellier" },
  openGraph: {
    title: "Clim camion Montpellier - Recharge clim poids lourd dès 149€",
    description:
      "Offre réservée aux poids lourds, TP et agricoles. Recharge clim au garage du Crès ou sur site sur Montpellier et agglomération.",
    url: "https://www.recacor.fr/services/clim-camion-poids-lourd-montpellier",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Clim camion Montpellier - Recharge clim poids lourd dès 149€",
    description:
      "Offre clim poids lourd, camion, TP et agricole. Garage du Crès ou intervention sur site sur Montpellier et agglomération.",
  },
};

export default async function ClimCamionPage() {
  const heroImage = await getAsset(
    "hero_image_clim_camion",
    "/images/services/clim-camion-poids-lourd-recacor-hero.webp",
  );
  return <ClimCamionClient heroImage={heroImage} />;
}
