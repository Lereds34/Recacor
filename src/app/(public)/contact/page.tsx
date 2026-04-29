import type { Metadata } from "next";
import { ContactClient } from "./client";
import { getSetting } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Recacor — Garage Pneus Montpellier Le Crès",
  description:
    "Contactez Recacor au Crès : téléphone, formulaire, horaires et itinéraire. Réponse sous 1h.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const heroImage = await getSetting("hero_image_contact");
  return <ContactClient heroImage={heroImage} />;
}
