import type { MetadataRoute } from "next";
import { listVilles } from "@/lib/villes";
import { getAllArticles } from "@/lib/blog";

// Dates de dernière modification RÉELLE du contenu, par page.
// À mettre à jour uniquement quand le contenu visible change — jamais automatiquement.
// Un lastmod identique sur tout le sitemap à chaque déploiement fait perdre
// à Google toute confiance dans ce signal (il l'ignore alors complètement).
const CONTENT_UPDATED: Record<string, string> = {
  "": "2026-07-14",
  "/pneus-voiture": "2026-07-14",
  "/mecanique": "2026-07-18",
  "/pneus-utilitaires-pl": "2026-07-19",
  "/pneus-utilitaires-pl/zone-sud-corse": "2026-07-18",
  "/pneus-utilitaires-pl/zone-nord-est-centre": "2026-07-22",
  "/services/vidange": "2026-07-18",
  "/services/parallelisme-geometrie": "2026-07-18",
  "/services/climatisation-auto-montpellier": "2026-07-18",
  "/services/clim-camion-poids-lourd-montpellier": "2026-07-18",
  "/services/recreusage": "2026-07-18",
  "/nos-centres": "2026-06-06",
  "/blog": "2026-06-17",
  "/contact": "2026-06-15",
  "/a-propos": "2026-07-14",
  "/guide-local": "2026-07-14",
  "/mentions-legales": "2026-05-28",
  "/cgv": "2026-05-28",
  "/confidentialite": "2026-05-28",
};

// Dernière vague de modification réelle des pages villes (villes-seo.ts / table villes).
const VILLES_UPDATED = "2026-07-14";

// Filet de sécurité pour un article sans date exploitable.
const BLOG_FALLBACK_UPDATED = "2026-07-17";

function toDate(value: string | undefined, fallback: string): Date {
  if (value) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date(fallback);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.recacor.fr";

  const villes = await listVilles();
  const articles = await getAllArticles();

  return [
    ...Object.entries(CONTENT_UPDATED).map(([path, updated]) => ({
      url: `${base}${path}`,
      lastModified: new Date(updated),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...villes.map((v) => ({
      url: `${base}/${v.slug}`,
      lastModified: new Date(VILLES_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${base}/blog/${article.frontmatter.slug}`,
      lastModified: toDate(article.frontmatter.date, BLOG_FALLBACK_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
