import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RelatedArticles } from "@/components/related-articles";
import { findVehicleBrandPage, listPublishedVehicleBrandPages } from "@/data/vehicle-brand-pages";
import { VehicleBrandPageClient } from "./client";

export const revalidate = 86400;

export async function generateStaticParams() {
  return listPublishedVehicleBrandPages().map((page) => ({ marque: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marque: string }>;
}): Promise<Metadata> {
  const { marque } = await params;
  const page = findVehicleBrandPage(marque);
  if (!page || !page.published) return { title: "Page introuvable" };

  return {
    title: { absolute: `${page.title} | Recacor` },
    description: page.description,
    alternates: { canonical: `/pneus-voiture/${page.slug}` },
    openGraph: {
      title: `${page.title} | Recacor`,
      description: page.description,
      url: `https://www.recacor.fr/pneus-voiture/${page.slug}`,
      siteName: "Recacor",
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${page.title} | Recacor`,
      description: page.description,
    },
  };
}

export default async function VehicleBrandPage({
  params,
}: {
  params: Promise<{ marque: string }>;
}) {
  const { marque } = await params;
  const page = findVehicleBrandPage(marque);
  if (!page || !page.published) notFound();

  return (
    <>
      <VehicleBrandPageClient page={page} />
      <RelatedArticles categorie="pneus-voiture" />
    </>
  );
}
