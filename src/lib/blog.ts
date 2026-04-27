import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { sql } from "./db";

export type Categorie = "pneus-voiture" | "mecanique" | "pneus-pl" | "blog";

export interface ArticleFrontmatter {
  titre: string;
  slug: string;
  meta_description: string;
  categorie: Categorie;
  date?: string;
  auteur?: string;
  image?: string;
  read_time?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  html: string;
  faq: { q: string; a: string }[];
  excerpt: string;
}

const CATEGORY_LABELS: Record<Categorie, string> = {
  "pneus-voiture": "Pneus voiture",
  mecanique: "Mécanique",
  "pneus-pl": "Pneus PL",
  blog: "Actualités",
};

export const CTA_PER_CATEGORY: Record<
  Categorie,
  { label: string; anchor: string; parentPage: string }
> = {
  "pneus-voiture": {
    label: "Demander un devis pneus",
    anchor: "/pneus-voiture#devis",
    parentPage: "/pneus-voiture",
  },
  mecanique: {
    label: "Demander un devis mécanique",
    anchor: "/mecanique#devis",
    parentPage: "/mecanique",
  },
  "pneus-pl": {
    label: "Demander un devis professionnel",
    anchor: "/pneus-utilitaires-pl#devis",
    parentPage: "/pneus-utilitaires-pl",
  },
  blog: {
    label: "Contactez-nous",
    anchor: "/contact",
    parentPage: "/blog",
  },
};

export const categoryLabel = (c: Categorie) => CATEGORY_LABELS[c];

interface ArticleRow {
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

function rowToFrontmatter(row: ArticleRow): ArticleFrontmatter {
  return {
    slug: row.slug,
    titre: row.titre,
    meta_description: row.meta_description,
    categorie: row.categorie as Categorie,
    date: row.date || undefined,
    auteur: row.auteur || undefined,
    read_time: row.read_time || undefined,
  };
}

function extractFaq(content: string): { q: string; a: string }[] {
  const faqMatch = content.match(/##\s+FAQ\s*\n([\s\S]*?)(?=\n##\s|\n*$)/i);
  if (!faqMatch) return [];
  const faqBlock = faqMatch[1];
  const items: { q: string; a: string }[] = [];
  const regex = /\*\*([^*]+\?)\*\*\s*\n([\s\S]*?)(?=\n\*\*[^*]+\?\*\*|\n*$)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(faqBlock)) !== null) {
    items.push({ q: m[1].trim(), a: m[2].trim() });
  }
  return items;
}

function makeExcerpt(content: string, maxWords = 35): string {
  const cleaned = content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^#.*$/gm, "")
    .replace(/\*\*|__|_|\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  const words = cleaned.split(/\s+/).slice(0, maxWords);
  return words.join(" ") + (words.length === maxWords ? "…" : "");
}

async function rowToArticle(row: ArticleRow): Promise<Article> {
  const faq = extractFaq(row.body);
  const excerpt = makeExcerpt(row.body);
  const bodyWithoutFaq = row.body.replace(/##\s+FAQ[\s\S]*?(?=\n##\s|$)/i, "");
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(bodyWithoutFaq);
  return {
    frontmatter: rowToFrontmatter(row),
    html: processed.toString(),
    faq,
    excerpt,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = (await sql`SELECT slug FROM articles`) as { slug: string }[];
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const rows = (await sql`SELECT * FROM articles WHERE slug = ${slug} LIMIT 1`) as ArticleRow[];
    if (rows.length === 0) return null;
    return rowToArticle(rows[0]);
  } catch {
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = (await sql`SELECT * FROM articles ORDER BY date DESC NULLS LAST`) as ArticleRow[];
    return Promise.all(rows.map(rowToArticle));
  } catch {
    return [];
  }
}

export async function getArticlesByCategory(cat: Categorie): Promise<Article[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = (await sql`
      SELECT * FROM articles
      WHERE categorie = ${cat}
      ORDER BY date DESC NULLS LAST
    `) as ArticleRow[];
    return Promise.all(rows.map(rowToArticle));
  } catch {
    return [];
  }
}

/* Helpers réutilisés par admin (parsing markdown) */
export function parseMarkdown(raw: string): {
  frontmatter: ArticleFrontmatter;
  body: string;
} {
  const { data, content } = matter(raw);
  return { frontmatter: data as ArticleFrontmatter, body: content };
}
