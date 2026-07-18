import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import fs from "fs/promises";
import path from "path";
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

const LOCAL_BLOG_DIR = path.join(process.cwd(), "content", "blog");

const CATEGORY_DEFAULT_IMAGE: Record<Categorie, string> = {
  "pneus-voiture": "/Design sans titre (29)/1.webp",
  "mecanique":     "/Img/IMG_5380.webp",
  "pneus-pl":      "/Design sans titre (29)/3.webp",
  "blog":          "/Design sans titre (29)/2.webp",
};

function rowToFrontmatter(row: ArticleRow): ArticleFrontmatter {
  const imgMatch = row.raw?.match(/^image:\s*(.+)$/m);
  const image = imgMatch?.[1]?.trim() || CATEGORY_DEFAULT_IMAGE[row.categorie as Categorie];
  return {
    slug: row.slug,
    titre: row.titre,
    meta_description: row.meta_description,
    categorie: row.categorie as Categorie,
    date: row.date || undefined,
    auteur: row.auteur || undefined,
    read_time: row.read_time || undefined,
    image,
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
    .replace(/\*\*|__|_|\*|`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();
  const words = cleaned.split(/\s+/).slice(0, maxWords);
  return words.join(" ") + (words.length === maxWords ? "…" : "");
}

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu;

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function slugifyHeading(text: string): string {
  return decodeHtmlEntities(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " et ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function addHeadingIds(html: string): string {
  const slugMap: Record<string, number> = {};
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (_, level, attrs, inner) => {
    const text = decodeHtmlEntities(inner.replace(/<[^>]+>/g, "").trim());
    const base = slugifyHeading(text);
    slugMap[base] = (slugMap[base] ?? 0) + 1;
    const id = slugMap[base] > 1 ? `${base}-${slugMap[base]}` : base;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

async function rowToArticle(row: ArticleRow): Promise<Article> {
  const faq = extractFaq(row.body);
  const excerpt = makeExcerpt(row.body);
  const bodyWithoutFaq = row.body.replace(/#{2,3}\s+(?:FAQ|Questions?)[^\n]*\n[\s\S]*?(?=\n#{1,3}\s|$)/i, "");
  // Le template affiche déjà le titre en H1 dans le hero.
  // Retirer les H1 Markdown évite un second H1 identique dans le corps.
  const bodyWithoutH1 = bodyWithoutFaq.replace(/^#\s+.*(?:\r?\n|$)/gm, "");
  // Normalise les sauts de ligne : une seule newline → double newline pour markdown
  const normalised = bodyWithoutH1.replace(/([^\n])\n([^\n])/g, "$1\n\n$2");
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
      text: decodeHtmlEntities(hm[3].replace(/<[^>]+>/g, "").trim()),
    });
  }
  return { frontmatter: rowToFrontmatter(row), html, faq, excerpt, headings };
}

async function readLocalArticleRows(): Promise<ArticleRow[]> {
  try {
    const files = (await fs.readdir(LOCAL_BLOG_DIR))
      .filter((file) => file.endsWith(".md"))
      .sort();

    const rows: Array<ArticleRow | null> = await Promise.all(
      files.map(async (file) => {
        const raw = await fs.readFile(path.join(LOCAL_BLOG_DIR, file), "utf-8");
        const { frontmatter, body } = parseMarkdown(raw);
        if (!frontmatter.slug || !frontmatter.titre || !frontmatter.categorie) return null;
        return {
          slug: frontmatter.slug,
          titre: frontmatter.titre,
          meta_description: frontmatter.meta_description || "",
          categorie: frontmatter.categorie,
          date: frontmatter.date || null,
          auteur: frontmatter.auteur || null,
          read_time: frontmatter.read_time || null,
          body,
          raw,
        } satisfies ArticleRow;
      }),
    );

    return rows.filter((row): row is ArticleRow => row !== null);
  } catch {
    return [];
  }
}

async function getLocalArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await readLocalArticleRows();
  const row = rows.find((item) => item.slug === slug);
  return row ? rowToArticle(row) : null;
}

async function getLocalArticles(): Promise<Article[]> {
  const rows = await readLocalArticleRows();
  return Promise.all(rows.map(rowToArticle));
}

function mergeArticles(primary: Article[], secondary: Article[]): Article[] {
  const merged = new Map<string, Article>();
  for (const article of primary) merged.set(article.frontmatter.slug, article);
  for (const article of secondary) {
    if (!merged.has(article.frontmatter.slug)) {
      merged.set(article.frontmatter.slug, article);
    }
  }
  return Array.from(merged.values()).sort((a, b) => {
    const left = a.frontmatter.date || "";
    const right = b.frontmatter.date || "";
    return right.localeCompare(left);
  });
}

// Filtre runtime : un article est public dès que `status='published'`,
// OU s'il est `status='scheduled'` ET que sa `publish_at` est passée.
// Plus besoin de cron pour flipper le status — la lecture matche les dates dynamiquement.

export async function getAllSlugs(): Promise<string[]> {
  if (!process.env.DATABASE_URL) {
    const local = await getLocalArticles();
    return local.map((article) => article.frontmatter.slug);
  }
  try {
    const rows = (await sql`
      SELECT slug FROM articles
      WHERE status = 'published'
         OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW())
    `) as { slug: string }[];
    const local = await getLocalArticles();
    return Array.from(new Set([...rows.map((r) => r.slug), ...local.map((article) => article.frontmatter.slug)]));
  } catch {
    const local = await getLocalArticles();
    return local.map((article) => article.frontmatter.slug);
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!process.env.DATABASE_URL) return getLocalArticleBySlug(slug);
  // Ne pas catch : si la DB est KO, on laisse l'erreur remonter pour afficher maintenance
  const rows = (await sql`
    SELECT * FROM articles
    WHERE slug = ${slug}
      AND (status = 'published'
           OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW()))
    LIMIT 1
  `) as ArticleRow[];
  if (rows.length === 0) return getLocalArticleBySlug(slug);
  return rowToArticle(rows[0]);
}

export async function getAllArticles(): Promise<Article[]> {
  if (!process.env.DATABASE_URL) return getLocalArticles();
  try {
    const rows = (await sql`
      SELECT * FROM articles
      WHERE status = 'published'
         OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW())
      ORDER BY date DESC NULLS LAST
    `) as ArticleRow[];
    const dbArticles = await Promise.all(rows.map(rowToArticle));
    const localArticles = await getLocalArticles();
    return mergeArticles(dbArticles, localArticles);
  } catch {
    return getLocalArticles();
  }
}

export async function getArticlesByCategory(cat: Categorie): Promise<Article[]> {
  if (!process.env.DATABASE_URL) {
    const local = await getLocalArticles();
    return local.filter((article) => article.frontmatter.categorie === cat);
  }
  try {
    const rows = (await sql`
      SELECT * FROM articles
      WHERE categorie = ${cat}
        AND (status = 'published'
             OR (status = 'scheduled' AND publish_at IS NOT NULL AND publish_at <= NOW()))
      ORDER BY date DESC NULLS LAST
    `) as ArticleRow[];
    const dbArticles = await Promise.all(rows.map(rowToArticle));
    const localArticles = (await getLocalArticles()).filter((article) => article.frontmatter.categorie === cat);
    return mergeArticles(dbArticles, localArticles);
  } catch {
    const local = await getLocalArticles();
    return local.filter((article) => article.frontmatter.categorie === cat);
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
