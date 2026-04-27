import matter from "gray-matter";
import { sql, ensureSchema } from "./db";
import type { ArticleFrontmatter, Categorie } from "./blog";

export interface AdminArticle extends ArticleFrontmatter {
  body: string;
  raw: string;
}

interface AdminRow {
  slug: string;
  titre: string;
  meta_description: string;
  categorie: string;
  date: string | null;
  auteur: string | null;
  read_time: string | null;
  body: string;
  raw: string;
}

export async function listArticles(): Promise<ArticleFrontmatter[]> {
  await ensureSchema();
  const rows = (await sql`
    SELECT slug, titre, meta_description, categorie, date, auteur, read_time
    FROM articles
    ORDER BY date DESC NULLS LAST
  `) as AdminRow[];
  return rows.map((r) => ({
    slug: r.slug,
    titre: r.titre,
    meta_description: r.meta_description,
    categorie: r.categorie as Categorie,
    date: r.date || undefined,
    auteur: r.auteur || undefined,
    read_time: r.read_time || undefined,
  }));
}

export async function readArticle(slug: string): Promise<AdminArticle | null> {
  await ensureSchema();
  const rows = (await sql`SELECT * FROM articles WHERE slug = ${slug} LIMIT 1`) as AdminRow[];
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    slug: r.slug,
    titre: r.titre,
    meta_description: r.meta_description,
    categorie: r.categorie as Categorie,
    date: r.date || undefined,
    auteur: r.auteur || undefined,
    read_time: r.read_time || undefined,
    body: r.body,
    raw: r.raw,
  };
}

export async function writeArticle(slug: string, raw: string): Promise<void> {
  await ensureSchema();
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw new Error("Slug invalide (lettres minuscules, chiffres, tirets)");
  }
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  if (!fm.titre) throw new Error("Frontmatter 'titre' requis");
  if (!fm.categorie) throw new Error("Frontmatter 'categorie' requis");

  await sql`
    INSERT INTO articles (slug, titre, meta_description, categorie, date, auteur, read_time, body, raw, updated_at)
    VALUES (
      ${slug},
      ${fm.titre},
      ${fm.meta_description || ""},
      ${fm.categorie},
      ${fm.date || null},
      ${fm.auteur || null},
      ${fm.read_time || null},
      ${content},
      ${raw},
      NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      titre = EXCLUDED.titre,
      meta_description = EXCLUDED.meta_description,
      categorie = EXCLUDED.categorie,
      date = EXCLUDED.date,
      auteur = EXCLUDED.auteur,
      read_time = EXCLUDED.read_time,
      body = EXCLUDED.body,
      raw = EXCLUDED.raw,
      updated_at = NOW();
  `;
}

export async function renameArticle(oldSlug: string, newSlug: string): Promise<void> {
  await ensureSchema();
  if (!/^[a-z0-9][a-z0-9-]*$/.test(newSlug)) {
    throw new Error("Slug invalide");
  }
  await sql`UPDATE articles SET slug = ${newSlug} WHERE slug = ${oldSlug}`;
}

export async function deleteArticle(slug: string): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM articles WHERE slug = ${slug}`;
}

export const VALID_CATEGORIES: Categorie[] = [
  "pneus-voiture",
  "mecanique",
  "pneus-pl",
  "blog",
];
