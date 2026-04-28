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
      "Vous habitez Montpellier et cherchez un garage pneus proche ? Recacor Le Crès est à seulement 8 km du centre-ville, accessible depuis la route de Nîmes. Stock immédiat toutes marques, montage en 15 minutes, avec ou sans rendez-vous. Pneus été, hiver et 4 saisons à partir de 45€. Vidange à partir de 79€.",
  },
  {
    slug: "castelnau-le-lez",
    nom: "Castelnau-le-Lez",
    cp: "34170",
    distance: "5 km",
    description:
      "Depuis Castelnau-le-Lez, le garage Recacor Le Crès est à 5 minutes via la D66. Le garage le plus proche de Castelnau pour vos pneus toutes marques et votre mécanique légère. Stock disponible sur place, montage rapide, avec ou sans rendez-vous.",
  },
  {
    slug: "vendargues",
    nom: "Vendargues",
    cp: "34740",
    distance: "5 km",
    description:
      "Vendargues est à 5 minutes du garage Recacor Le Crès via la route de Nîmes. Pneus voiture toutes marques en stock immédiat, montage en 15 minutes. Vidange, parallélisme et mécanique légère disponibles avec ou sans rendez-vous.",
  },
  {
    slug: "mauguio",
    nom: "Mauguio",
    cp: "34130",
    distance: "8 km",
    description:
      "Depuis Mauguio, rejoignez le garage Recacor Le Crès en 10 minutes par la D189. Pneus toutes dimensions en stock, montage rapide, prix discount. Nous intervenons aussi pour les professionnels et les flottes de l'étang de l'Or.",
  },
  {
    slug: "lattes",
    nom: "Lattes",
    cp: "34970",
    distance: "10 km",
    description:
      "Le garage Recacor Le Crès est à 10 minutes de Lattes par la route de Nîmes. Pneus voiture et utilitaires toutes marques, mécanique légère, parallélisme laser 3D. Avec ou sans rendez-vous du lundi au vendredi 8h-17h et le samedi 8h-12h.",
  },
  {
    slug: "perols",
    nom: "Pérols",
    cp: "34470",
    distance: "10 km",
    description:
      "Depuis Pérols, le garage Recacor Le Crès est accessible en 12 minutes via l'A9 et la route de Nîmes. Stock immédiat pneus été, hiver et 4 saisons. Montage en 15 minutes, vidange à partir de 79€, avec ou sans rendez-vous.",
  },
  {
    slug: "jacou",
    nom: "Jacou",
    cp: "34830",
    distance: "7 km",
    description:
      "Jacou est à 7 km du garage Recacor Le Crès par la D172. Pneus voiture toutes marques à prix discount, montage sans attente, parallélisme offert avec tout changement de pneus. Ouvert le samedi matin.",
  },
  {
    slug: "saint-jean-de-vedas",
    nom: "Saint-Jean-de-Védas",
    cp: "34430",
    distance: "12 km",
    description:
      "Depuis Saint-Jean-de-Védas, rejoignez Recacor Le Crès en 15 minutes via l'A709. Garage pneus et mécanique légère proche de Montpellier ouest. Stock immédiat, toutes marques, avec ou sans rendez-vous.",
  },
  {
    slug: "lunel",
    nom: "Lunel",
    cp: "34400",
    distance: "18 km",
    description:
      "Lunel est à 18 km du garage Recacor Le Crès par la N113. Pour vos pneus voiture et utilitaires dans le secteur de Lunel, Recacor est le spécialiste le plus proche avec stock immédiat et montage rapide. Devis gratuit sous 2h.",
  },
  {
    slug: "palavas-les-flots",
    nom: "Palavas-les-Flots",
    cp: "34250",
    distance: "15 km",
    description:
      "Depuis Palavas-les-Flots, le garage Recacor Le Crès est à 15 km par la D986. Pneus voiture toutes marques et toutes dimensions en stock. Montage en 15 minutes, prix discount, avec ou sans rendez-vous. Idéal pour les résidents et saisonniers du littoral héraultais.",
  },
  {
    slug: "nimes",
    nom: "Nîmes",
    cp: "30000",
    distance: "35 km",
    description:
      "Nîmes est à 35 km du garage Recacor Le Crès par la N113. Pour les conducteurs et professionnels nîmois à la recherche d'un spécialiste pneus compétitif, Recacor Le Crès propose stock immédiat, montage rapide et assistance PL. Devis gratuit en 2h.",
  },
  {
    slug: "sete",
    nom: "Sète",
    cp: "34200",
    distance: "30 km",
    description:
      "Depuis Sète, le garage Recacor Le Crès est à 30 km par l'A9. Pneus voiture et poids lourd toutes marques, recreusage, assistance PL en Hérault. Pour les professionnels du port de Sète, Recacor propose des contrats flotte avec tarifs négociés et intervention sur site.",
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

  for (const v of villes) {
    await sql`
      INSERT INTO villes (slug, nom, cp, distance, description, published)
      VALUES (${v.slug}, ${v.nom}, ${v.cp}, ${v.distance}, ${v.description}, TRUE)
      ON CONFLICT (slug) DO UPDATE SET
        nom = EXCLUDED.nom,
        cp = EXCLUDED.cp,
        distance = EXCLUDED.distance,
        description = EXCLUDED.description,
        published = EXCLUDED.published;
    `;
    console.log(`✅ ${v.nom.padEnd(22)} (${v.cp}) — ${v.distance}`);
  }

  const rows = await sql`SELECT COUNT(*)::int AS n FROM villes WHERE published = TRUE`;
  console.log(`\n🎉 ${villes.length} villes upsertées — total publiées en DB : ${rows[0].n}`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
