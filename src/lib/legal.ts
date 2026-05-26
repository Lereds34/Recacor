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
      "Recacor s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679).\n\n**Responsable du traitement :** Recacor — 1240 RN 113, 34920 Le Crès — contact@recacor.fr\n\n## Données collectées\n\nNous collectons les données suivantes via nos formulaires en ligne et nos publicités Meta (Facebook / Instagram Lead Ads) :\n\n- Nom et prénom\n- Numéro de téléphone\n- Adresse e-mail\n- Code postal\n- Type de véhicule et besoin exprimé\n\n## Utilisation des données\n\nVos données sont utilisées exclusivement pour répondre à votre demande de devis, vous recontacter et améliorer notre service. Elles ne sont jamais revendues à des tiers.\n\n## Données collectées via Meta (Facebook / Instagram)\n\nNous utilisons Meta Lead Ads dans le cadre de nos campagnes publicitaires sur Facebook et Instagram. Les données soumises via ces formulaires sont transmises à Recacor via l'API Meta, stockées dans notre système interne, et utilisées uniquement pour vous recontacter au sujet de votre demande.\n\nRecacor agit en tant que responsable du traitement pour ces données. Elles ne sont pas transmises à d'autres annonceurs ou partenaires commerciaux.\n\nPolitique de confidentialité de Meta : https://www.facebook.com/privacy/policy\n\n## Durée de conservation\n\nVos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernière interaction avec Recacor.\n\n## Vos droits\n\nConformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, d'opposition et de portabilité de vos données. Pour exercer ces droits ou demander la suppression de vos données, contactez-nous à contact@recacor.fr\n\nRéclamation auprès de la CNIL : https://www.cnil.fr\n\n## Cookies\n\nCe site utilise des cookies de mesure d'audience (Google Analytics) et des pixels publicitaires (Meta, TikTok). Vous pouvez gérer vos préférences via le bandeau cookies affiché lors de votre première visite.\n\n*Dernière mise à jour : mai 2026*",
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
