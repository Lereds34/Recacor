import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findVille } from "@/lib/villes";
import { VillePageClient } from "@/components/ville-page";

export const revalidate = 3600;

const RESERVED_SLUGS = new Set([
  "blog", "contact", "merci", "maquette", "mecanique",
  "pneus-voiture", "pneus-utilitaires-pl", "nos-centres",
  "a-propos", "mentions-legales", "cgv", "confidentialite",
  "services", "admin", "api",
]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville: slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};
  const v = await findVille(slug);
  if (!v) return { title: "Ville introuvable" };
  return {
    title: v.meta_title || `Pneus ${v.nom} — Garage Recacor Le Crès`,
    description:
      v.meta_description ||
      `Pneus voiture à ${v.nom} dès 45€ montés — Recacor Le Crès (à ${v.distance}). Stock immédiat, montage en 15 min sans RDV. Devis gratuit.`,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function VillePage({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville: slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();
  const v = await findVille(slug);
  if (!v || !v.published) notFound();
  return <VillePageClient ville={v} />;
}
