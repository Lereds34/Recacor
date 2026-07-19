import type { Metadata } from "next";
import { VidangeClient } from "./client";

export const metadata: Metadata = {
  title: "Vidange voiture Montpellier : dès 79€ au Crès",
  description:
    "Vidange voiture à Montpellier dès 79€ au Crès : huile et filtre inclus, sans rendez-vous possible. Appelez Recacor ou demandez un devis.",
  alternates: { canonical: "/services/vidange" },
  openGraph: {
    title: "Vidange voiture Montpellier : dès 79€ au Crès",
    description:
      "Vidange voiture à Montpellier au Crès dès 79€ : huile et filtre inclus, sans rendez-vous possible selon la charge atelier.",
    url: "https://www.recacor.fr/services/vidange",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function VidangePage() {
  return <VidangeClient />;
}
