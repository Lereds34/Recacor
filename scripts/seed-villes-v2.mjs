import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const villes = [
  {
    slug: "montpellier",
    nom: "Montpellier",
    cp: "34000",
    distance: "8 km",
    description:
      "Vous habitez Montpellier et cherchez un garage pneus proche ? Recacor Le Crès est à seulement 8 km du centre-ville, accessible depuis le rond-point de Lattes ou la route de Nîmes. Stock immédiat toutes marques, montage en 15 minutes, avec ou sans rendez-vous. Pneus été, hiver et 4 saisons à partir de 45€.",
    meta_title: "Pneus Montpellier — Garage Recacor Le Crès (8 km)",
    meta_description:
      "Pneus voiture à Montpellier, montage sans RDV chez Recacor au Crès (à 8 km). Stock immédiat toutes marques, prix discount, à partir de 45€.",
  },
  {
    slug: "castelnau-le-lez",
    nom: "Castelnau-le-Lez",
    cp: "34170",
    distance: "5 km",
    description:
      "Depuis Castelnau-le-Lez, le garage Recacor Le Crès est à 5 minutes en voiture via la D66. Stock disponible sur place, toutes marques et toutes dimensions. Montage rapide, prix discount, avec ou sans rendez-vous.",
    meta_title: "Pneus Castelnau-le-Lez — Recacor Le Crès (5 km)",
    meta_description:
      "Pneus à Castelnau-le-Lez : Recacor Le Crès à 5 km via la D66. Stock immédiat, montage 15 min sans RDV, prix discount.",
  },
  {
    slug: "vendargues",
    nom: "Vendargues",
    cp: "34740",
    distance: "5 km",
    description:
      "Vendargues est à 5 minutes de notre garage Le Crès via la D610. Pneus toutes marques en stock, mécanique légère sur place : vidange, parallélisme, freinage. Sans rendez-vous pour les particuliers.",
    meta_title: "Pneus Vendargues — Recacor Le Crès (5 km)",
    meta_description:
      "Pneus à Vendargues : garage Recacor à 5 km via la D610. Stock toutes marques, montage rapide sans RDV.",
  },
  {
    slug: "mauguio",
    nom: "Mauguio",
    cp: "34130",
    distance: "8 km",
    description:
      "Depuis Mauguio, comptez 8 km via la D24 pour rejoindre Recacor Le Crès. Pneus VL et utilitaires en stock immédiat, équilibrage et géométrie sur place. Particuliers et professionnels bienvenus.",
    meta_title: "Pneus Mauguio — Recacor Le Crès (8 km)",
    meta_description:
      "Pneus à Mauguio : Recacor Le Crès à 8 km via la D24. VL et utilitaires en stock, montage 15 min, sans RDV.",
  },
  {
    slug: "lattes",
    nom: "Lattes",
    cp: "34970",
    distance: "10 km",
    description:
      "Entre Montpellier et la mer, Lattes est à 10 km de notre atelier Le Crès via le contournement Est. Stock pneus toutes marques, montage rapide sans rendez-vous. Pneus été, hiver et 4 saisons à partir de 45€.",
    meta_title: "Pneus Lattes — Recacor Le Crès (10 km)",
    meta_description:
      "Pneus à Lattes : Recacor Le Crès à 10 km via le contournement. Stock immédiat, prix discount, sans RDV.",
  },
  {
    slug: "perols",
    nom: "Pérols",
    cp: "34470",
    distance: "10 km",
    description:
      "Pérols est à 10 km du garage Recacor Le Crès, accessible facilement par la rocade de Montpellier. Stock pneus toutes dimensions, montage rapide, géométrie laser 3D. Avec ou sans rendez-vous.",
    meta_title: "Pneus Pérols — Recacor Le Crès (10 km)",
    meta_description:
      "Pneus à Pérols : Recacor à 10 km via la rocade. Toutes dimensions en stock, géométrie 3D, sans RDV.",
  },
  {
    slug: "jacou",
    nom: "Jacou",
    cp: "34830",
    distance: "7 km",
    description:
      "Depuis Jacou, le garage Recacor Le Crès est à seulement 7 km via la D65. Pneus VL toutes marques, mécanique légère et parallélisme sur place. Service rapide sans rendez-vous.",
    meta_title: "Pneus Jacou — Recacor Le Crès (7 km)",
    meta_description:
      "Pneus à Jacou : Recacor à 7 km via la D65. VL toutes marques, mécanique sur place, sans RDV.",
  },
  {
    slug: "saint-jean-de-vedas",
    nom: "Saint-Jean-de-Védas",
    cp: "34430",
    distance: "12 km",
    description:
      "À 12 km de Saint-Jean-de-Védas via la rocade Est de Montpellier, Recacor Le Crès vous accueille pour vos pneus VL et PL. Stock immédiat, montage 15 minutes, sans rendez-vous.",
    meta_title: "Pneus Saint-Jean-de-Védas — Recacor Le Crès (12 km)",
    meta_description:
      "Pneus à Saint-Jean-de-Védas : Recacor à 12 km via la rocade. VL et PL en stock, montage rapide sans RDV.",
  },
  {
    slug: "lunel",
    nom: "Lunel",
    cp: "34400",
    distance: "18 km",
    description:
      "À 20 minutes du Crès via l'A9, Lunel est rapidement accessible depuis notre garage Recacor. Nos techniciens vous attendent pour pneus VL et PL, vidange, parallélisme et géométrie. Sans rendez-vous.",
    meta_title: "Pneus Lunel — Recacor Le Crès (18 km via A9)",
    meta_description:
      "Pneus à Lunel : Recacor au Crès à 18 km via l'A9. VL et PL toutes marques, vidange et parallélisme sur place.",
  },
  {
    slug: "palavas-les-flots",
    nom: "Palavas-les-Flots",
    cp: "34250",
    distance: "15 km",
    description:
      "Vous résidez à Palavas-les-Flots ? Recacor Le Crès est à 15 km via la D986 et le contournement de Montpellier. Pneus toutes marques en stock, montage rapide, prix discount. Avec ou sans rendez-vous.",
    meta_title: "Pneus Palavas-les-Flots — Recacor Le Crès (15 km)",
    meta_description:
      "Pneus à Palavas-les-Flots : Recacor à 15 km via la D986. Toutes marques en stock, montage rapide, sans RDV.",
  },
  {
    slug: "nimes",
    nom: "Nîmes",
    cp: "30000",
    distance: "35 km",
    description:
      "Depuis Nîmes, comptez 35 minutes via l'A9 direction Montpellier pour rejoindre Recacor Le Crès. Spécialistes pneus VL, PL, agricoles et industriels. Recreusage poids lourd et assistance sur site en Hérault.",
    meta_title: "Pneus Nîmes — Recacor Le Crès (35 km via A9)",
    meta_description:
      "Pneus à Nîmes : Recacor à 35 km via l'A9. VL, PL, agricoles, industriels. Recreusage et assistance Hérault.",
  },
  {
    slug: "sete",
    nom: "Sète",
    cp: "34200",
    distance: "30 km",
    description:
      "Sète est à 30 km du garage Recacor Le Crès via l'A9 direction Montpellier. Pneus toutes marques en stock, mécanique légère, parallélisme et freinage. Service pro pour transporteurs et flottes du port.",
    meta_title: "Pneus Sète — Recacor Le Crès (30 km via A9)",
    meta_description:
      "Pneus à Sète : Recacor à 30 km via l'A9. VL, PL et flottes. Stock immédiat, mécanique sur place.",
  },
];

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS villes (
      slug        TEXT PRIMARY KEY,
      nom         TEXT NOT NULL,
      cp          TEXT NOT NULL DEFAULT '',
      distance    TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      meta_title  TEXT,
      meta_description TEXT,
      published   BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("✅ Schema OK\n");

  // Supprime les anciennes villes obsolètes (le-cres était fictif)
  await sql`DELETE FROM villes WHERE slug = 'le-cres'`;

  for (const v of villes) {
    await sql`
      INSERT INTO villes (slug, nom, cp, distance, description, meta_title, meta_description, published)
      VALUES (${v.slug}, ${v.nom}, ${v.cp}, ${v.distance}, ${v.description}, ${v.meta_title}, ${v.meta_description}, TRUE)
      ON CONFLICT (slug) DO UPDATE SET
        nom = EXCLUDED.nom,
        cp = EXCLUDED.cp,
        distance = EXCLUDED.distance,
        description = EXCLUDED.description,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        published = TRUE;
    `;
    console.log(`✅ ${v.nom.padEnd(22)} (${v.cp}) — ${v.distance}`);
  }

  console.log(`\n🎉 ${villes.length} villes créées / mises à jour dans Neon`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
