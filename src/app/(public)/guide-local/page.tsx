import type { Metadata } from "next";
import { GuideLocalClient } from "./client";
import { BreadcrumbJsonLd } from "@/components/schema-jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guide local Montpellier — partenaires et bonnes adresses",
  description:
    "Recacor Le Crès recommande ses partenaires locaux à Montpellier : traiteur événementiel, restauration professionnelle et artisans de confiance en Hérault.",
  alternates: { canonical: "/guide-local" },
};

export default function GuideLocalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://recacor.fr" },
          { name: "Guide local", url: "https://recacor.fr/guide-local" },
        ]}
      />
      <GuideLocalClient />
    </>
  );
}
