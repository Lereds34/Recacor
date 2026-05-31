import { sql, ensureSchema } from "./db";
import { findVilleSeo } from "@/data/villes-seo";

export interface Ville {
  slug: string;
  nom: string;
  cp: string;
  distance: string;
  description: string;
  meta_title?: string | null;
  meta_description?: string | null;
  published: boolean;
}

interface VilleRow {
  slug: string;
  nom: string;
  cp: string;
  distance: string;
  description: string;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
}

export async function listVilles(includeUnpublished = false): Promise<Ville[]> {
  try {
    await ensureSchema();
    const rows = (includeUnpublished
      ? await sql`SELECT * FROM villes ORDER BY nom`
      : await sql`SELECT * FROM villes WHERE published = TRUE ORDER BY nom`) as VilleRow[];
    return rows;
  } catch {
    return [];
  }
}

export async function findVille(slug: string): Promise<Ville | null> {
  try {
    await ensureSchema();
    const rows = (await sql`SELECT * FROM villes WHERE slug = ${slug} LIMIT 1`) as VilleRow[];
    if (rows[0]) return rows[0];
  } catch {
    // Neon unavailable — fall through to static data
  }
  const seo = findVilleSeo(slug);
  if (!seo) return null;
  return {
    slug: seo.slug,
    nom: seo.nom,
    cp: seo.cp,
    distance: seo.distance,
    description: seo.description,
    meta_title: null,
    meta_description: null,
    published: seo.published,
  };
}

export async function upsertVille(v: Ville): Promise<void> {
  await ensureSchema();
  if (!/^[a-z0-9][a-z0-9-]*$/.test(v.slug)) {
    throw new Error("Slug invalide");
  }
  await sql`
    INSERT INTO villes (slug, nom, cp, distance, description, meta_title, meta_description, published)
    VALUES (${v.slug}, ${v.nom}, ${v.cp}, ${v.distance}, ${v.description}, ${v.meta_title || null}, ${v.meta_description || null}, ${v.published})
    ON CONFLICT (slug) DO UPDATE SET
      nom = EXCLUDED.nom,
      cp = EXCLUDED.cp,
      distance = EXCLUDED.distance,
      description = EXCLUDED.description,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      published = EXCLUDED.published;
  `;
}

export async function deleteVille(slug: string): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM villes WHERE slug = ${slug}`;
}
