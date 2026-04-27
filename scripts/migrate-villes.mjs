import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant.");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const villes = [
  {
    slug: "montpellier",
    nom: "Montpellier",
    cp: "34000",
    distance: "10 min",
    description:
      "La capitale de l'Hérault est à seulement 10 minutes de notre garage au Crès. Pas besoin de vous déplacer loin pour trouver les meilleurs prix pneus de la région.",
    meta_title: "Pneus Montpellier — Garage Recacor Le Crès",
    meta_description:
      "Pneus voiture à Montpellier, montage sans RDV chez Recacor au Crès (à 10min). Stock immédiat, prix discount.",
  },
  {
    slug: "lattes",
    nom: "Lattes",
    cp: "34970",
    distance: "15 min",
    description:
      "Entre Montpellier et la mer, Lattes est à 15 minutes de nos ateliers. Venez changer vos pneus en toute simplicité sans rendez-vous.",
    meta_title: "Pneus Lattes — Garage Recacor Montpellier Le Crès",
    meta_description:
      "Pneus voiture à Lattes, montage sans RDV chez Recacor au Crès (à 15min). Stock immédiat, prix discount.",
  },
  {
    slug: "lunel",
    nom: "Lunel",
    cp: "34400",
    distance: "20 min",
    description:
      "À 20 minutes du Crès via l'A9, Lunel est une ville rapidement accessible. Nos techniciens vous attendent pour pneus, vidange et parallélisme.",
    meta_title: "Pneus Lunel — Garage Recacor Montpellier Le Crès",
    meta_description:
      "Pneus voiture à Lunel, montage sans RDV chez Recacor au Crès (à 20min). Stock immédiat, prix discount.",
  },
  {
    slug: "le-cres",
    nom: "Le Crès",
    cp: "34920",
    distance: "Notre garage",
    description:
      "Notre garage principal est installé au Crès, 1240 Route de Nîmes. Un accueil chaleureux, un stock immédiat et des prix imbattables.",
    meta_title: "Pneus Le Crès — Garage Recacor Montpellier",
    meta_description:
      "Garage Recacor au Crès (34920). Pneus VL et PL toutes marques, montage sans RDV, stock immédiat.",
  },
];

async function migrate() {
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
      INSERT INTO villes (slug, nom, cp, distance, description, meta_title, meta_description, published)
      VALUES (${v.slug}, ${v.nom}, ${v.cp}, ${v.distance}, ${v.description}, ${v.meta_title}, ${v.meta_description}, TRUE)
      ON CONFLICT (slug) DO UPDATE SET
        nom = EXCLUDED.nom,
        cp = EXCLUDED.cp,
        distance = EXCLUDED.distance,
        description = EXCLUDED.description,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description;
    `;
    console.log(`✅ ${v.nom}`);
  }

  console.log("\n🎉 Migration villes terminée");
}

migrate().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
