import { sql, ensureSchema } from "./db";

export interface AssetDef {
  key: string;
  label: string;
  type: "image" | "video" | "media";
  fallback: string;
  alt?: string;
  description?: string;
}

export interface PageAssets {
  id: string;
  page: string;
  description?: string;
  assets: AssetDef[];
}

/* ─── Définition de tous les placeholders modifiables ─── */
export const SITE_ASSETS: PageAssets[] = [
  {
    id: "home",
    page: "Accueil",
    description: "Vidéo et images de la page d'accueil",
    assets: [
      {
        key: "home_hero_video",
        label: "Hero d'accueil (image ou vidéo)",
        type: "media",
        fallback: "/VIDEO/animation transition.mp4",
        description: "Image ou vidéo affichée en fond derrière le titre",
      },
      {
        key: "home_services_image",
        label: "Image section Services (droite)",
        type: "image",
        fallback: "/Design sans titre (29)/1.webp",
        alt: "RECACOR - Pneumatiques",
      },
      {
        key: "home_pro_image",
        label: "Image section Professionnalisme",
        type: "image",
        fallback: "/Design sans titre (29)/2.webp",
        alt: "RECACOR - Hankook iON",
      },
      {
        key: "home_centres_image",
        label: "Image bandeau 'Nos centres'",
        type: "image",
        fallback: "/Design sans titre (29)/3.webp",
        alt: "Pile de pneumatiques",
      },
      {
        key: "home_faq_video",
        label: "Bloc bas de page (image ou vidéo)",
        type: "media",
        fallback: "/Vidéo_d_une_roue_sur_camion.mp4",
        description: "Image ou vidéo affichée sous la FAQ",
      },
      {
        key: "home_europe_map",
        label: "Carte Europe (présence)",
        type: "image",
        fallback: "/carte/europe-map-CBh8PVWh.webp",
        alt: "Carte de présence européenne",
      },
    ],
  },
  {
    id: "pneus-voiture",
    page: "Pneus voiture (VL)",
    description: "Images de la page /pneus-voiture",
    assets: [
      {
        key: "vl_visual_image",
        label: "Image visuelle (section devis)",
        type: "image",
        fallback: "/hero-generated/pneus-voiture-master.webp",
        alt: "Pneus voiture",
      },
    ],
  },
  {
    id: "mecanique",
    page: "Mécanique",
    assets: [
      {
        key: "mecanique_visual",
        label: "Image visuelle mécanique",
        type: "image",
        fallback: "/hero-generated/mecanique-master.webp",
        alt: "Mécanique légère",
      },
    ],
  },
  {
    id: "pneus-pl",
    page: "Pneus PL / Agricole / Industriel",
    assets: [
      {
        key: "pl_hero_image",
        label: "Image héro PL",
        type: "image",
        fallback: "/hero-generated/pl-master.webp",
        alt: "Pneumatiques poids lourd",
      },
    ],
  },
  {
    id: "marques",
    page: "Logos marques (carousel homepage)",
    description: "10 logos de marques pneumatiques affichés en carousel infini",
    assets: [
      { key: "logo_michelin", label: "Michelin", type: "image", fallback: "/LOGO_MARQUE/Michelin_G_S_Fr_WhiteBG_RGB_0618-01.webp" },
      { key: "logo_bridgestone", label: "Bridgestone", type: "image", fallback: "/LOGO_MARQUE/Bridgestone-logo-730x300-2018_0_1.webp" },
      { key: "logo_continental", label: "Continental", type: "image", fallback: "/LOGO_MARQUE/continental.webp" },
      { key: "logo_goodyear", label: "Goodyear", type: "image", fallback: "/LOGO_MARQUE/Logo-goodyear.webp" },
      { key: "logo_pirelli", label: "Pirelli", type: "image", fallback: "/LOGO_MARQUE/Logo-Pirelli.webp" },
      { key: "logo_hankook", label: "Hankook", type: "image", fallback: "/LOGO_MARQUE/Hankook_logo.webp" },
      { key: "logo_dunlop", label: "Dunlop", type: "image", fallback: "/LOGO_MARQUE/dunlop1HEADER.webp" },
      { key: "logo_firestone", label: "Firestone", type: "image", fallback: "/LOGO_MARQUE/firestone1517239246_0.webp" },
      { key: "logo_yokohama", label: "Yokohama", type: "image", fallback: "/LOGO_MARQUE/yokohama-logo.webp" },
      { key: "logo_bfgoodrich", label: "BFGoodrich", type: "image", fallback: "/LOGO_MARQUE/bfgoodrich-logo.webp" },
    ],
  },
  {
    id: "hero-images",
    page: "Images hero (pages)",
    description: "Image affichée en haut de chaque page. Uploadez une image pour remplacer le fallback.",
    assets: [
      {
        key: "hero_image_pneus_vl",
        label: "Hero — Pneus Voiture",
        type: "image",
        fallback: "/hero-generated/pneus-voiture-master.webp",
        alt: "Pneus voiture Recacor",
      },
      {
        key: "hero_image_villes_vl",
        label: "Hero — Pages villes VL",
        type: "image",
        fallback: "/hero-generated/villes-vl-master.webp",
        alt: "Garage pneus voiture Recacor",
      },
      {
        key: "hero_image_mecanique",
        label: "Hero — Mécanique",
        type: "image",
        fallback: "/hero-generated/mecanique-master.webp",
        alt: "Mécanique légère Recacor",
      },
      {
        key: "hero_image_climatisation",
        label: "Hero — Climatisation auto",
        type: "image",
        fallback: "/hero-generated/clim-master.webp",
        alt: "Recharge climatisation auto Recacor",
      },
      {
        key: "hero_image_pneus_pl",
        label: "Hero — Pneus PL",
        type: "image",
        fallback: "/hero-generated/pl-master.webp",
        alt: "Pneus poids lourd Recacor",
      },
      {
        key: "hero_image_blog",
        label: "Hero — Blog",
        type: "image",
        fallback: "/Design sans titre (29)/2.webp",
        alt: "Blog Recacor",
      },
      {
        key: "hero_image_nos_centres",
        label: "Hero — Notre Garage",
        type: "image",
        fallback: "/Img/IMG_5379.webp",
        alt: "Nos centres Recacor",
      },
      {
        key: "hero_image_contact",
        label: "Hero — Contact",
        type: "image",
        fallback: "/Img/IMG_5379.webp",
        alt: "Contact Recacor",
      },
    ],
  },
  {
    id: "branding",
    page: "Identité (logo + favicon)",
    assets: [
      {
        key: "site_logo",
        label: "Logo Recacor (header + footer)",
        type: "image",
        fallback: "/logo-recacor.webp",
        alt: "Recacor",
      },
    ],
  },
];

interface AssetRow {
  key: string;
  url: string;
  type: string;
  alt: string;
}

let cache: { data: Record<string, AssetRow>; ts: number } | null = null;
const TTL = 5 * 60_000; // 5 min

async function loadAll(): Promise<Record<string, AssetRow>> {
  if (cache && Date.now() - cache.ts < TTL) return cache.data;
  try {
    await ensureSchema();
    const rows = (await sql`SELECT key, url, type, alt FROM site_assets`) as AssetRow[];
    const map: Record<string, AssetRow> = {};
    for (const r of rows) map[r.key] = r;
    cache = { data: map, ts: Date.now() };
    return map;
  } catch {
    return {};
  }
}

export function invalidateAssetsCache() {
  cache = null;
}

const _assetFallbackMap: Record<string, string> = Object.fromEntries(
  SITE_ASSETS.flatMap((p) => p.assets).map((a) => [a.key, a.fallback])
);

/* Helpers de lecture pour les pages publiques */
export async function getAsset(key: string, fallback: string): Promise<string> {
  const all = await loadAll();
  const stored = all[key]?.url;
  return stored || fallback || _assetFallbackMap[key] || "";
}

export async function getAssetWithAlt(
  key: string,
  fallback: string,
  fallbackAlt = ""
): Promise<{ url: string; alt: string }> {
  const all = await loadAll();
  const row = all[key];
  const url = row?.url || fallback || _assetFallbackMap[key] || "";
  return {
    url,
    alt: row?.alt || fallbackAlt,
  };
}

export async function getAllAssets(): Promise<Record<string, AssetRow>> {
  return loadAll();
}

/* Admin */
export async function setAsset(
  key: string,
  url: string,
  type: "image" | "video",
  alt = ""
): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO site_assets (key, url, type, alt, updated_at)
    VALUES (${key}, ${url}, ${type}, ${alt}, NOW())
    ON CONFLICT (key) DO UPDATE SET
      url = EXCLUDED.url,
      type = EXCLUDED.type,
      alt = EXCLUDED.alt,
      updated_at = NOW();
  `;
  invalidateAssetsCache();
}

/** Stocke le binaire d'un asset directement dans Neon (bytea) */
export async function setAssetBinary(
  key: string,
  buffer: Buffer,
  type: "image" | "video",
  mime: string,
  filename: string,
  alt = ""
): Promise<string> {
  await ensureSchema();
  // L'URL pointe vers notre endpoint /api/asset/[key] avec un cache-bust
  const url = `/api/asset/${encodeURIComponent(key)}?v=${Date.now()}`;
  await sql`
    INSERT INTO site_assets (key, url, type, alt, mime, filename, data, size_bytes, updated_at)
    VALUES (${key}, ${url}, ${type}, ${alt}, ${mime}, ${filename}, ${buffer}, ${buffer.length}, NOW())
    ON CONFLICT (key) DO UPDATE SET
      url = EXCLUDED.url,
      type = EXCLUDED.type,
      alt = EXCLUDED.alt,
      mime = EXCLUDED.mime,
      filename = EXCLUDED.filename,
      data = EXCLUDED.data,
      size_bytes = EXCLUDED.size_bytes,
      updated_at = NOW();
  `;
  invalidateAssetsCache();
  return url;
}

export interface AssetBlob {
  data: Buffer;
  mime: string;
  filename: string;
}

export async function getAssetBinary(key: string): Promise<AssetBlob | null> {
  try {
    await ensureSchema();
    const rows = (await sql`
      SELECT data, mime, filename FROM site_assets WHERE key = ${key} LIMIT 1
    `) as { data: Buffer | null; mime: string; filename: string }[];
    if (rows.length === 0 || !rows[0].data) return null;
    return {
      data: Buffer.isBuffer(rows[0].data) ? rows[0].data : Buffer.from(rows[0].data),
      mime: rows[0].mime || "application/octet-stream",
      filename: rows[0].filename || key,
    };
  } catch {
    return null;
  }
}

export async function resetAsset(key: string): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM site_assets WHERE key = ${key}`;
  invalidateAssetsCache();
}
