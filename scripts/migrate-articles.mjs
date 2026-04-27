import { neon } from "@neondatabase/serverless";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant. Crée un fichier .env.local avec ton URL Neon.");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

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
  await sql`CREATE INDEX IF NOT EXISTS idx_articles_categorie ON articles (categorie);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_articles_date ON articles (date DESC);`;
  console.log("✅ Schema OK");
}

async function migrate() {
  await ensureSchema();

  let files;
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    console.log("ℹ️  Aucun dossier content/blog — rien à migrer");
    return;
  }

  const mdFiles = files.filter((f) => f.endsWith(".md"));
  if (mdFiles.length === 0) {
    console.log("ℹ️  Aucun fichier .md trouvé");
    return;
  }

  console.log(`📦 ${mdFiles.length} fichier(s) à migrer\n`);

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    if (!data.titre) {
      console.log(`⚠️  ${file} : pas de 'titre' — skipped`);
      continue;
    }

    await sql`
      INSERT INTO articles (slug, titre, meta_description, categorie, date, auteur, read_time, body, raw, updated_at)
      VALUES (
        ${slug},
        ${data.titre},
        ${data.meta_description || ""},
        ${data.categorie || "blog"},
        ${data.date || null},
        ${data.auteur || null},
        ${data.read_time || null},
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
    console.log(`✅ ${slug}`);
  }

  console.log("\n🎉 Migration terminée");
}

migrate().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
