/**
 * Génère les 200 articles blog Recacor à partir des specs et templates,
 * et les insère en base Neon avec status='scheduled' et publish_at planifié
 * (4 articles/jour à 08:00, 10:00, 12:00, 14:00 heure de Paris).
 *
 * Usage :
 *   node --env-file=.env.local scripts/generate-blog-articles.mjs           # tout
 *   node --env-file=.env.local scripts/generate-blog-articles.mjs --limit 5 # 5 premiers
 *   node --env-file=.env.local scripts/generate-blog-articles.mjs --dry-run # pas d'insert
 *   node --env-file=.env.local scripts/generate-blog-articles.mjs --start 2026-04-30
 *   node --env-file=.env.local scripts/generate-blog-articles.mjs --replace # réécrit même si slug existe
 */

import { neon } from "@neondatabase/serverless";
import {
  VILLES_VL,
  SERVICES_VL,
  MARQUES,
  GUIDES_VL,
  PL_DEPT,
  PL_VILLES,
  GUIDES_PL,
  FAQS,
  SAISONNIERS,
} from "./blog-spec.mjs";
import {
  tplVilleVl,
  tplServiceVl,
  tplMarque,
  tplGuideVl,
  tplPlDept,
  tplPlVille,
  tplGuidePl,
  tplFaq,
  tplSaisonnier,
} from "./blog-templates.mjs";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant — vérifie .env.local");
  process.exit(1);
}
const sql = neon(DATABASE_URL);

// ── parse args ────────────────────────────────────────────────
const args = process.argv.slice(2);
function flag(name) {
  return args.includes(`--${name}`);
}
function arg(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const LIMIT = parseInt(arg("limit", "0"), 10) || 0;
const DRY_RUN = flag("dry-run");
const REPLACE = flag("replace");
const START_DATE_RAW = arg("start", null); // ISO YYYY-MM-DD

// ── construit la liste ordonnée des 200 specs ─────────────────
// Ordre = ordre de publication recommandé par le brief Max.
function buildAllSpecs() {
  const all = [];

  // Cat A — villes VL (60)
  for (const v of VILLES_VL) {
    all.push({
      template: "ville-vl",
      payload: v,
      slug: v.slug,
      titre: v.titre,
      metaTitle: v.metaTitle,
      categorie: "pneus-voiture",
    });
  }
  // Cat B — services VL (20)
  for (const s of SERVICES_VL) {
    all.push({
      template: "service-vl",
      payload: s,
      slug: s.slug,
      titre: s.titre,
      metaTitle: s.metaTitle,
      categorie: s.categorie,
    });
  }
  // Cat C — marques (12)
  for (const m of MARQUES) {
    all.push({
      template: "marque",
      payload: m,
      slug: m.slug,
      titre: m.titre,
      metaTitle: m.metaTitle,
      categorie: "pneus-voiture",
    });
  }
  // Cat D — guides VL (25)
  for (const g of GUIDES_VL) {
    all.push({
      template: "guide-vl",
      payload: g,
      slug: g.slug,
      titre: g.titre,
      metaTitle: g.metaTitle,
      categorie: g.categorie,
    });
  }
  // Cat E — PL département (8)
  for (const p of PL_DEPT) {
    all.push({
      template: "pl-dept",
      payload: p,
      slug: p.slug,
      titre: p.titre,
      metaTitle: p.metaTitle,
      categorie: "pneus-pl",
    });
  }
  // Cat F — PL ville (22)
  for (const p of PL_VILLES) {
    all.push({
      template: "pl-ville",
      payload: p,
      slug: p.slug,
      titre: p.titre,
      metaTitle: p.metaTitle,
      categorie: "pneus-pl",
    });
  }
  // Cat G — guides PL (18)
  for (const g of GUIDES_PL) {
    all.push({
      template: "guide-pl",
      payload: g,
      slug: g.slug,
      titre: g.titre,
      metaTitle: g.metaTitle,
      categorie: "pneus-pl",
    });
  }
  // Cat H — FAQ (15)
  for (const f of FAQS) {
    all.push({
      template: "faq",
      payload: f,
      slug: f.slug,
      titre: f.titre,
      metaTitle: f.metaTitle,
      categorie: "blog",
    });
  }
  // Cat I — saisonniers (20)
  for (const s of SAISONNIERS) {
    all.push({
      template: "saisonnier",
      payload: s,
      slug: s.slug,
      titre: s.titre,
      metaTitle: s.metaTitle,
      categorie: "blog",
    });
  }
  return all;
}

function buildArticle(spec) {
  switch (spec.template) {
    case "ville-vl": return tplVilleVl(spec.payload);
    case "service-vl": return tplServiceVl(spec.payload);
    case "marque": return tplMarque(spec.payload);
    case "guide-vl": return tplGuideVl(spec.payload);
    case "pl-dept": return tplPlDept(spec.payload);
    case "pl-ville": return tplPlVille(spec.payload);
    case "guide-pl": return tplGuidePl(spec.payload);
    case "faq": return tplFaq(spec.payload);
    case "saisonnier": return tplSaisonnier(spec.payload);
    default: throw new Error(`Template inconnu: ${spec.template}`);
  }
}

// ── planning : 4 articles/jour à 08, 10, 12, 14 (Paris) ──────
// On stocke en UTC. On ne se soucie pas du fuseau précis (DST) :
// stocker à 06:00 UTC ≈ 08:00 Europe/Paris (heure d'été 07h en hiver),
// le cron qui tourne chaque heure rattrape de toute façon.
const SLOTS_HOURS_UTC = [6, 8, 10, 12]; // ≈ 08, 10, 12, 14 Paris en été

function computePublishAt(index, startDate) {
  const dayIndex = Math.floor(index / SLOTS_HOURS_UTC.length);
  const slotIndex = index % SLOTS_HOURS_UTC.length;
  const d = new Date(startDate);
  d.setUTCDate(d.getUTCDate() + dayIndex);
  d.setUTCHours(SLOTS_HOURS_UTC[slotIndex], 0, 0, 0);
  return d;
}

function buildRaw({ titre, slug, categorie, date, auteur, readTime, metaDescription, body }) {
  const fm = [
    "---",
    `titre: ${JSON.stringify(titre)}`,
    `slug: ${slug}`,
    `categorie: ${categorie}`,
    `meta_description: ${JSON.stringify(metaDescription)}`,
    `date: ${date}`,
    `auteur: ${JSON.stringify(auteur)}`,
    `read_time: ${JSON.stringify(readTime)}`,
    "---",
    "",
  ].join("\n");
  return fm + body;
}

async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      slug          TEXT PRIMARY KEY,
      titre         TEXT NOT NULL,
      meta_description TEXT NOT NULL DEFAULT '',
      categorie     TEXT NOT NULL DEFAULT 'blog',
      date          TEXT,
      auteur        TEXT,
      read_time     TEXT,
      body          TEXT NOT NULL,
      raw           TEXT NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';`;
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;`;
  await sql`CREATE INDEX IF NOT EXISTS idx_articles_status_publishat ON articles (status, publish_at);`;
}

async function existingSlugs() {
  const rows = (await sql`SELECT slug FROM articles`);
  return new Set(rows.map((r) => r.slug));
}

async function insertArticle({ slug, titre, metaDescription, categorie, date, auteur, readTime, body, raw, publishAt }) {
  await sql`
    INSERT INTO articles (
      slug, titre, meta_description, categorie, date, auteur, read_time,
      body, raw, status, publish_at, updated_at
    ) VALUES (
      ${slug}, ${titre}, ${metaDescription}, ${categorie}, ${date}, ${auteur}, ${readTime},
      ${body}, ${raw}, 'scheduled', ${publishAt.toISOString()}, NOW()
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
      status = 'scheduled',
      publish_at = EXCLUDED.publish_at,
      updated_at = NOW();
  `;
}

async function main() {
  const startDate = (() => {
    if (START_DATE_RAW) {
      const d = new Date(START_DATE_RAW + "T00:00:00Z");
      if (isNaN(d.getTime())) throw new Error(`--start invalide: ${START_DATE_RAW}`);
      return d;
    }
    // Par défaut : demain
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + 1);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  })();

  console.log("─────────────────────────────────────────────────────────");
  console.log("📝 Génération blog Recacor — 200 articles planifiés");
  console.log("─────────────────────────────────────────────────────────");
  console.log(`📅 Premier article : ${startDate.toISOString().slice(0, 10)} 06:00 UTC (~08h Paris)`);
  console.log(`⏱️  Cadence : 4 articles/jour (08h, 10h, 12h, 14h Paris)`);
  if (LIMIT) console.log(`🔬 LIMIT : ${LIMIT} articles seulement`);
  if (DRY_RUN) console.log(`🚧 DRY-RUN : aucun INSERT en base`);
  if (REPLACE) console.log(`♻️  REPLACE : remplace les slugs existants`);
  console.log("");

  await ensureSchema();
  const existing = REPLACE ? new Set() : await existingSlugs();

  const allSpecs = buildAllSpecs();
  const limited = LIMIT > 0 ? allSpecs.slice(0, LIMIT) : allSpecs;

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < limited.length; i++) {
    const spec = limited[i];
    if (existing.has(spec.slug)) {
      skipped++;
      console.log(`⏭️  [${String(i + 1).padStart(3)}/${limited.length}] ${spec.slug} — skip (existe déjà)`);
      continue;
    }

    const { metaDescription, body, readTime } = buildArticle(spec);
    const publishAt = computePublishAt(i, startDate);
    const date = publishAt.toISOString().slice(0, 10);
    const auteur = "Équipe Recacor";

    const raw = buildRaw({
      titre: spec.titre,
      slug: spec.slug,
      categorie: spec.categorie,
      date,
      auteur,
      readTime,
      metaDescription,
      body,
    });

    if (!DRY_RUN) {
      await insertArticle({
        slug: spec.slug,
        titre: spec.titre,
        metaDescription,
        categorie: spec.categorie,
        date,
        auteur,
        readTime,
        body,
        raw,
        publishAt,
      });
    }

    inserted++;
    console.log(
      `✅ [${String(i + 1).padStart(3)}/${limited.length}] ${spec.slug} — ${publishAt.toISOString().slice(0, 16).replace("T", " ")} UTC (${spec.categorie})`,
    );
  }

  console.log("");
  console.log(`🎉 Terminé : ${inserted} insérés / ${skipped} skipped / total ${limited.length}`);
  console.log(`⏰ Le cron Vercel /api/cron/publish-articles va flipper status='scheduled' → 'published' à chaque passage horaire.`);
  console.log("");
  console.log("Prochaines étapes :");
  console.log("  1. git push (déploie /api/cron/publish-articles + vercel.json)");
  console.log("  2. Vercel dashboard → Settings → Environment Variables : ajouter CRON_SECRET (optionnel mais recommandé)");
  console.log("  3. Vercel dashboard → Cron Jobs : vérifier que /api/cron/publish-articles est bien actif (1 / heure)");
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
