import type { Metadata } from "next";
import { MecaniqueClient } from "./client";
import { RelatedArticles } from "@/components/related-articles";
import { getSetting } from "@/lib/db";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vidange & Révision Montpellier | Sans RDV — Garage Recacor Le Crès",
  description:
    "Vidange à partir de 79€, freinage, parallélisme, révision. Garage mécanique sans rendez-vous à Montpellier — Le Crès. Devis gratuit.",
  alternates: { canonical: "/mecanique" },
};

export default async function MecaniquePage() {
  const heroImage = await getSetting("hero_image_mecanique");
  return (
    <>
      <MecaniqueClient heroImage={heroImage} />
      <RelatedArticles categorie="mecanique" />
    </>
  );
}
