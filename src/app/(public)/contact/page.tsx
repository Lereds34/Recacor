import type { Metadata } from "next";
import { ContactClient } from "./client";
import { getAsset } from "@/lib/site-assets";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact garage pneus Montpellier",
  description:
    "Contactez Recacor au Crès : téléphone, formulaire, horaires et itinéraire. Réponse sous 1h.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const heroImage = await getAsset("hero_image_contact", "");
  return <ContactClient heroImage={heroImage} />;
}
