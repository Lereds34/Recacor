import { sql, ensureSchema } from "./db";

export interface LegalPage {
  slug: string;
  titre: string;
  content: string;
  updated_at?: string;
}

const DEFAULTS: Record<string, LegalPage> = {
  "mentions-legales": {
    slug: "mentions-legales",
    titre: "Mentions légales",
    content:
      "**Éditeur :** Recacor — SARL au capital de [X] €\n\n**Siège social :** 1240 Route de Nîmes, 34920 Le Crès\n\n**Téléphone :** 06 07 62 10 43\n\n**Email :** contact@recacor.fr\n\n**SIRET :** [à compléter]\n\n**Directeur de publication :** [à compléter]\n\n**Hébergeur :** Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  },
  cgv: {
    slug: "cgv",
    titre: "Conditions générales de vente",
    content: "Contenu CGV à compléter.",
  },
  confidentialite: {
    slug: "confidentialite",
    titre: "Politique de confidentialité",
    content:
      "Recacor s'engage à protéger vos données personnelles conformément au RGPD.\n\n## Données collectées\nVia les formulaires de contact et de devis, nous collectons : nom, prénom, téléphone, email, code postal et toute information que vous nous transmettez volontairement.\n\n## Utilisation des données\nVos données sont utilisées uniquement pour répondre à votre demande, établir un devis et vous recontacter. Elles ne sont jamais revendues.\n\n## Vos droits\nConformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous à contact@recacor.fr.",
  },
};

export async function getLegalPage(slug: string): Promise<LegalPage> {
  try {
    await ensureSchema();
    const rows = (await sql`SELECT * FROM legal_pages WHERE slug = ${slug} LIMIT 1`) as LegalPage[];
    if (rows[0]) return rows[0];
  } catch {}
  return DEFAULTS[slug] || { slug, titre: slug, content: "" };
}

export async function listLegalPages(): Promise<LegalPage[]> {
  try {
    await ensureSchema();
    const rows = (await sql`SELECT * FROM legal_pages ORDER BY slug`) as LegalPage[];
    const found = new Set(rows.map((r) => r.slug));
    const merged = [...rows];
    for (const slug of Object.keys(DEFAULTS)) {
      if (!found.has(slug)) merged.push(DEFAULTS[slug]);
    }
    return merged.sort((a, b) => a.slug.localeCompare(b.slug));
  } catch {
    return Object.values(DEFAULTS);
  }
}

export async function updateLegalPage(slug: string, titre: string, content: string): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO legal_pages (slug, titre, content, updated_at)
    VALUES (${slug}, ${titre}, ${content}, NOW())
    ON CONFLICT (slug) DO UPDATE SET
      titre = EXCLUDED.titre,
      content = EXCLUDED.content,
      updated_at = NOW();
  `;
}
