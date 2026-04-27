import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { ArticleFrontmatter, Categorie } from "./blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface AdminArticle extends ArticleFrontmatter {
  body: string;
  raw: string; // markdown complet (frontmatter + body)
}

async function ensureDir() {
  try {
    await fs.access(BLOG_DIR);
  } catch {
    await fs.mkdir(BLOG_DIR, { recursive: true });
  }
}

export async function listArticles(): Promise<ArticleFrontmatter[]> {
  await ensureDir();
  const files = await fs.readdir(BLOG_DIR);
  const articles: ArticleFrontmatter[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    articles.push(data as ArticleFrontmatter);
  }
  return articles.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function readArticle(slug: string): Promise<AdminArticle | null> {
  await ensureDir();
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { ...(data as ArticleFrontmatter), body: content, raw };
  } catch {
    return null;
  }
}

export async function writeArticle(slug: string, raw: string): Promise<void> {
  await ensureDir();
  // Validation : slug safe (alphanumeric + tirets)
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw new Error("Slug invalide");
  }
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  await fs.writeFile(filePath, raw, "utf-8");
}

export async function deleteArticle(slug: string): Promise<void> {
  await ensureDir();
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  await fs.unlink(filePath);
}

export const VALID_CATEGORIES: Categorie[] = [
  "pneus-voiture",
  "mecanique",
  "pneus-pl",
  "blog",
];

export function buildMarkdown(
  fm: ArticleFrontmatter,
  body: string
): string {
  const frontmatter = `---
titre: ${fm.titre}
slug: ${fm.slug}
meta_description: ${fm.meta_description}
categorie: ${fm.categorie}
date: ${fm.date || new Date().toISOString().split("T")[0]}
auteur: ${fm.auteur || "Équipe Recacor"}
read_time: ${fm.read_time || "3 min"}
---
`;
  return frontmatter + "\n" + body.trim() + "\n";
}
