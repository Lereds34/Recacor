import type { MetadataRoute } from "next";
import { listVilles } from "@/lib/villes";
import { getAllSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.recacor.fr";
  const now = new Date();

  const staticRoutes = [
    "",
    "/pneus-voiture",
    "/mecanique",
    "/pneus-utilitaires-pl",
    "/services/vidange",
    "/services/parallelisme-geometrie",
    "/services/climatisation-auto-montpellier",
    "/services/recreusage",
    "/nos-centres",
    "/blog",
    "/contact",
    "/a-propos",
    "/guide-local",
    "/mentions-legales",
    "/cgv",
    "/confidentialite",
  ];

  const villes = await listVilles();
  const blogSlugs = await getAllSlugs();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...villes.map((v) => ({
      url: `${base}/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
