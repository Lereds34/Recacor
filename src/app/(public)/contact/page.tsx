import type { Metadata } from "next";
import { ContactClient } from "./client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact garage pneus Montpellier",
  description:
    "Contactez Recacor au Crès : téléphone, formulaire, horaires et itinéraire. Réponse sous 1h.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  // L'asset CMS "hero_image_contact" pointe par erreur vers le logo Recacor
  // (pas une photo) : étiré en fond de hero, ça casse visuellement.
  // On repasse sur le fond uni en attendant qu'une vraie photo soit assignée.
  return <ContactClient />;
}
