import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
}

export function getAllSlugs(): string[] {
  ensureBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function extractFaq(content: string): { q: string; a: string }[] {
  // Recherche section ## FAQ et extrait **Question ?**\nRéponse pairs
  const faqMatch = content.match(/##\s+FAQ\s*\n([\s\S]*?)(?=\n##\s|\n*$)/i);
  if (!faqMatch) return [];
  const faqBlock = faqMatch[1];
  const items: { q: string; a: string }[] = [];
  // Match **Question ?**\nRéponse jusqu'au prochain ** ou fin
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

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  ensureBlogDir();
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const faq = extractFaq(content);
  const excerpt = makeExcerpt(content);

  // Retire la section FAQ du body markdown (sera générée séparément + Schema.org)
  const bodyWithoutFaq = content.replace(/##\s+FAQ[\s\S]*?(?=\n##\s|$)/i, "");

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(bodyWithoutFaq);

  return {
    frontmatter: data as ArticleFrontmatter,
    html: processed.toString(),
    faq,
    excerpt,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = getAllSlugs();
  const articles = await Promise.all(slugs.map((s) => getArticleBySlug(s)));
  return articles
    .filter((a): a is Article => a !== null)
    .sort((a, b) => {
      const da = a.frontmatter.date || "";
      const db = b.frontmatter.date || "";
      return db.localeCompare(da);
    });
}

export async function getArticlesByCategory(cat: Categorie): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.frontmatter.categorie === cat);
}
