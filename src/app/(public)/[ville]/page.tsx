import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findVille, listVilles } from "@/lib/villes";
import { VillePageClient } from "@/components/ville-page";
import { findVilleSeo } from "@/data/villes-seo";

export const revalidate = 3600;

const RESERVED_SLUGS = new Set([
  "blog", "contact", "merci", "maquette", "mecanique",
  "pneus-voiture", "pneus-utilitaires-pl", "nos-centres",
  "a-propos", "mentions-legales", "cgv", "confidentialite",
  "services", "admin", "api",
]);

// Pré-construit toutes les pages ville au build : la DB n'est touchée qu'une
// seule fois à la construction, au lieu d'une régénération à chaque visite
// (cause majeure d'activité DB permanente sur Neon serverless).
export async function generateStaticParams() {
  const villes = await listVilles();
  return villes
    .filter((v) => !RESERVED_SLUGS.has(v.slug))
    .map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville: slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};
  const v = await findVille(slug);
  if (!v) return { title: "Ville introuvable" };
  if (slug === "le-cres") {
    return {
      title: { absolute: "Garage auto Le Crès - Pneus, vidange, parallélisme | Recacor" },
      description: "Garage auto au Crès : pneus dès 45€ montés, vidange, parallélisme et entretien voiture sans rendez-vous. Recacor Le Crès, stock immédiat.",
      alternates: { canonical: `/${slug}` },
    };
  }
  const seo = findVilleSeo(slug);
  const distance = seo?.distance || v.distance;
  return {
    title: { absolute: `Pneus ${v.nom} — Recacor Le Crès (${distance})` },
    description: `Pneus à ${v.nom} dès 45€ montés. Recacor Le Crès à ${distance} : stock immédiat, montage sans RDV et contrôle parallélisme offert.`,
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
