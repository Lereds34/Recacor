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

export interface ArticleHeading { id: string; text: string; level: 2 | 3 }

export interface Article {
  frontmatter: ArticleFrontmatter;
  html: string;
  faq: { q: string; a: string }[];
  excerpt: string;
  headings: ArticleHeading[];
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
  // Extrait image depuis le raw frontmatter (pas stocké en colonne dédiée pour l'instant)
  const imgMatch = row.raw?.match(/^image:\s*(.+)$/m);
  return {
    slug: row.slug,
    titre: row.titre,
    meta_description: row.meta_description,
    categorie: row.categorie as Categorie,
    date: row.date || undefined,
    auteur: row.auteur || undefined,
    read_time: row.read_time || undefined,
    image: imgMatch?.[1]?.trim() || undefined,
  };
}

function extractFaq(content: string): { q: string; a: string }[] {
  // Accepte ## FAQ, ### FAQ, ## Questions, etc.
  const faqMatch = content.match(/#{2,3}\s+(?:FAQ|Questions?[^\n]*)\s*\n([\s\S]*?)(?=\n#{1,3}\s|\n*$)/i);
  if (!faqMatch) return [];
  const faqBlock = faqMatch[1];
  const items: { q: string; a: string }[] = [];
  // Accepte **Question?** ou **Question** (avec ou sans point d'interrogation)
  const regex = /\*\*([^*]+?)\*\*\s*\n([\s\S]*?)(?=\n\*\*[^*]+?\*\*|\n*$)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(faqBlock)) !== null) {
    const q = m[1].trim();
    const a = m[2].trim();
    if (q && a) items.push({ q, a });
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

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu;

function addHeadingIds(html: string): string {
  const slugMap: Record<string, number> = {};
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (_, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const base = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 60);
    slugMap[base] = (slugMap[base] ?? 0) + 1;
    const id = slugMap[base] > 1 ? `${base}-${slugMap[base]}` : base;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

async function rowToArticle(row: ArticleRow): Promise<Article> {
  const faq = extractFaq(row.body);
  const excerpt = makeExcerpt(row.body);
  const bodyWithoutFaq = row.body.replace(/#{2,3}\s+(?:FAQ|Questions?)[^\n]*\n[\s\S]*?(?=\n#{1,3}\s|$)/i, "");
  // Normalise les sauts de ligne : une seule newline → double newline pour markdown
  const normalised = bodyWithoutFaq.replace(/([^\n])\n([^\n])/g, "$1\n\n$2");
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(normalised);
  const rawHtml = processed.toString().replace(EMOJI_RE, "");
  const html = addHeadingIds(rawHtml);
  const headings: ArticleHeading[] = [];
  const hRe = /<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let hm: RegExpExecArray | null;
  while ((hm = hRe.exec(html)) !== null) {
    headings.push({
      level: parseInt(hm[1]) as 2 | 3,
      id: hm[2],
      text: hm[3].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return { frontmatter: rowToFrontmatter(row), html, faq, excerpt, headings };
}

// Filtre runtime : un article est public dès que `status='published'`,
// OU s'il est `status='scheduled'` ET que sa `publish_at` est passée.
// Plus besoin de cron pour flipper le status — la lecture matche les dates dynamiquement.

export async function getAllSlugs(): Promise<string[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = (await sql`
      SELECT slug FROM articles
      WHERE status = 'published'
         OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW())
    `) as { slug: string }[];
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!process.env.DATABASE_URL) return null;
  // Ne pas catch : si la DB est KO, on laisse l'erreur remonter pour afficher maintenance
  const rows = (await sql`
    SELECT * FROM articles
    WHERE slug = ${slug}
      AND (status = 'published'
           OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW()))
    LIMIT 1
  `) as ArticleRow[];
  if (rows.length === 0) return null;
  return rowToArticle(rows[0]);
}

export async function getAllArticles(): Promise<Article[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const rows = (await sql`
      SELECT * FROM articles
      WHERE status = 'published'
         OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW())
      ORDER BY date DESC NULLS LAST
    `) as ArticleRow[];
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
        AND (status = 'published'
             OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW()))
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
