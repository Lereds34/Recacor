/**
 * Publie un article blog directement sur recacor.fr sans passer par /admin.
 *
 * Usage :
 *   node scripts/publish-article.mjs scripts/articles/pneu-creve-montpellier.md
 *
 * Prérequis : CRON_SECRET dans .env.claude (gitignored) ou en variable d'env.
 *   CRON_SECRET=xxx node scripts/publish-article.mjs article.md
 *
 * Pour récupérer CRON_SECRET : Vercel dashboard > projet recacor > Settings > Environment Variables
 */

import { readFileSync, existsSync } from "fs";
import { basename } from "path";

// Charge .env.claude si présent
if (existsSync(".env.claude")) {
  const lines = readFileSync(".env.claude", "utf-8").split("\n");
  for (const line of lines) {
    const [key, ...parts] = line.split("=");
    if (key && parts.length) process.env[key.trim()] = parts.join("=").trim();
  }
}

const secret = process.env.CRON_SECRET;
const filePath = process.argv[2];

if (!filePath) {
  console.error("❌ Usage : node scripts/publish-article.mjs scripts/articles/slug.md");
  process.exit(1);
}
if (!existsSync(filePath)) {
  console.error(`❌ Fichier introuvable : ${filePath}`);
  process.exit(1);
}
if (!secret) {
  console.error("❌ CRON_SECRET manquant.\n   Crée le fichier .env.claude avec : CRON_SECRET=xxx\n   (valeur dans Vercel > projet recacor > Settings > Environment Variables)");
  process.exit(1);
}

const raw = readFileSync(filePath, "utf-8");
const slug = basename(filePath, ".md");

console.log(`📤 Publication de "${slug}"...`);

const res = await fetch("https://www.recacor.fr/api/blog/publish", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${secret}`,
  },
  body: JSON.stringify({ slug, raw }),
});

const data = await res.json();

if (res.ok) {
  console.log(`✅ Article publié avec succès !`);
  console.log(`   URL : ${data.url}`);
} else {
  console.error(`❌ Erreur ${res.status} : ${data.error}`);
  process.exit(1);
}
