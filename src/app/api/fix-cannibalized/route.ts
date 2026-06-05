import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SECRET = "RC_FIX_2026_DEL";

const PHONE = "04 99 53 33 90";
const PHONE_TEL = "+33499533390";
const ADRESSE = "1240 Route de Nîmes, 34920 Le Crès";
const HORAIRES = "Lun–Ven 8h–17h · Samedi 8h–12h";

const truncMeta = (s: string) => (s.length <= 155 ? s : s.slice(0, 152).trimEnd() + "…");
const readTime = (md: string) => `${Math.max(2, Math.round(md.split(/\s+/).length / 200))} min`;

function cta() {
  return `
## Recacor Le Crès — Votre garage de proximité

- **Téléphone** : ${PHONE}
- **Adresse** : ${ADRESSE}
- **Horaires** : ${HORAIRES}

[Demander un devis gratuit](/contact#devis) ou [Appeler le ${PHONE}](tel:${PHONE_TEL}) — réponse sous 2h en jours ouvrés.
`.trim();
}

function tplVidangeVille({ ville, distance, axe, cp }: { ville: string; distance: string; axe: string; cp: string }) {
  const titre = `Vidange Voiture à ${ville} — Recacor Le Crès à ${distance}`;
  const meta = truncMeta(`Vidange voiture à ${ville} (${cp}) à partir de 79€ tout compris — huile + filtre. Recacor Le Crès à ${distance} via ${axe}, sans rendez-vous.`);
  const body = `
## Vidange voiture à ${ville} — 79€ tout compris chez Recacor

Vous cherchez un **garage pour une vidange à ${ville}** sans attendre des semaines ? Recacor Le Crès est à **${distance}** via **${axe}**, accessible sans traverser le centre-ville. **Vidange complète à partir de 79€** — huile moteur et filtre inclus, aucun frais caché. Sans rendez-vous, du lundi au samedi.

## Ce que comprend la vidange à 79€

- **Vidange** de l'huile moteur usagée
- **Remplacement du filtre** à huile
- Appoint en **huile neuve** adaptée à votre véhicule (synthétique ou semi-synthétique selon préconisation constructeur)
- **Contrôle visuel** des niveaux (refroidissement, liquide de frein, lave-glace)
- **Rapport d'intervention** remis en fin de prestation

Durée : **30 minutes en moyenne**, sans rendez-vous. Tous véhicules acceptés — citadines, berlines, SUV, utilitaires légers, toutes marques.

## À quelle fréquence vidanger sa voiture ?

- **Moteur essence récent** : tous les 15 000 à 20 000 km, ou une fois par an
- **Moteur diesel** : tous les 10 000 à 15 000 km, ou une fois par an
- **Usage urbain** (trajets courts autour de ${ville}) : une vidange annuelle est recommandée même sans atteindre le kilométrage — les démarrages fréquents usent l'huile plus vite

## FAQ — Vidange voiture à ${ville}

**Faut-il prendre rendez-vous depuis ${ville} ?**
Non. Recacor Le Crès accueille **sans rendez-vous** du lundi au vendredi de 8h à 17h et le samedi de 8h à 12h. Comptez ${distance} depuis ${ville} via ${axe}.

**Quelle huile utilisez-vous ?**
L'huile est choisie selon les **préconisations constructeur** de votre véhicule — synthétique longue durée, semi-synthétique ou spécification particulière (BMW Longlife, PSA B71 2290, etc.).

**Peut-on combiner vidange et changement de pneus ?**
Oui. Pneus à partir de **45€ montés** et **contrôle parallélisme offert** avec chaque changement de pneus — idéal pour tout régler en un seul passage depuis ${ville}.

${cta()}
`.trim();
  return { titre, meta, categorie: "mecanique", body, rt: readTime(body) };
}

function tplParallelismeVille({ ville, distance, axe, cp }: { ville: string; distance: string; axe: string; cp: string }) {
  const titre = `Parallélisme à ${ville} — Contrôle Géométrie Offert chez Recacor`;
  const meta = truncMeta(`Parallélisme voiture à ${ville} (${cp}) à partir de 65€ — contrôle géométrie 3D offert. Recacor Le Crès à ${distance} via ${axe}, sans rendez-vous.`);
  const body = `
## Parallélisme & géométrie voiture à ${ville} — dès 65€, contrôle offert

Vous habitez ${ville} et vos pneus s'usent asymétriquement, votre volant tire d'un côté ou votre voiture dérive sur route droite ? Ce sont les **signes d'un parallélisme déréglé**. Recacor Le Crès est à **${distance}** de ${ville} via **${axe}** — parallélisme complet à partir de **65€**, et **contrôle de géométrie offert** avec tout changement de pneus.

## Les signes d'un mauvais parallélisme

- **Usure irrégulière** : un côté des pneus s'use plus vite que l'autre
- **Voiture qui tire** d'un côté même sur route droite
- **Volant non centré** en ligne droite
- **Surconsommation de carburant** (friction latérale non visible mais réelle)
- **Vibrations** dans le volant à partir de 80–100 km/h

Un parallélisme déréglé peut **diviser par deux** la durée de vie de vos pneus. Le corriger rapidement est une économie directe.

## Notre service géométrie laser 3D à Le Crès

Recacor Le Crès dispose d'un **équipement géométrie laser 3D** qui mesure précisément les angles de chaque roue (pincement, carrossage, chasse). L'intervention prend **30 à 45 minutes** :

1. Mesure complète des 4 roues
2. Comparaison avec les données constructeur de votre véhicule
3. Réglage si nécessaire
4. Rapport d'intervention remis

**Tarif** : contrôle offert + réglage à partir de **65€**.

## FAQ — Parallélisme à ${ville}

**Quand faut-il faire son parallélisme ?**
Après un **choc important** (trou, trottoir), après un **changement de pneus ou amortisseurs**, ou dès qu'une usure asymétrique apparaît. En usage normal, un contrôle tous les **30 000 km** est conseillé.

**Le contrôle est-il vraiment offert ?**
Oui — **le contrôle géométrie est offert** avec tout changement de pneus chez Recacor. Si un réglage est nécessaire, il est facturé à partir de 65€.

**Combien de temps depuis ${ville} ?**
**${distance}** via ${axe}. Sans rendez-vous, du lundi au vendredi de 8h à 17h et le samedi de 8h à 12h.

${cta()}
`.trim();
  return { titre, meta, categorie: "mecanique", body, rt: readTime(body) };
}

function tplGarageMecaniqueVille({ ville, distance, axe, cp }: { ville: string; distance: string; axe: string; cp: string }) {
  const titre = `Garage Mécanique à ${ville} — Vidange, Pneus & Parallélisme Recacor`;
  const meta = truncMeta(`Garage mécanique à ${ville} (${cp}) — vidange 79€, pneus 45€, parallélisme 65€. Recacor Le Crès à ${distance} via ${axe}, sans rendez-vous.`);
  const body = `
## Garage mécanique le plus proche de ${ville} — Recacor à ${distance}

Vous habitez ${ville} et cherchez un **garage mécanique fiable, rapide et sans rendez-vous** ? Recacor Le Crès est à **${distance}** de chez vous via **${axe}**, au 1240 Route de Nîmes. Ouvert du lundi au samedi, sans délai d'attente pour les particuliers.

Pneus, vidange, parallélisme : tout se règle en un seul passage.

## Nos services depuis ${ville}

**Pneus voiture**
- Toutes marques en stock : Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook
- Montage + équilibrage + valves neuves : **à partir de 45€**
- Toutes dimensions courantes disponibles immédiatement

**Vidange**
- Vidange complète (huile + filtre) : **à partir de 79€**
- Huile adaptée à votre véhicule (synthétique, semi-synthétique)
- Durée : **30 min**, sans rendez-vous

**Parallélisme & géométrie**
- Contrôle géométrie laser 3D : **offert** avec tout changement de pneus
- Réglage complet : **à partir de 65€**
- Durée : 30 à 45 min

## Pourquoi venir depuis ${ville} ?

- **${distance}** via ${axe} — accès direct, parking sur place
- **Sans rendez-vous** : aucune attente pour fixer un créneau
- **Prix transparents** : devis communiqué avant toute intervention
- **70 ans d'expertise** Recacor (groupe fondé en 1950, présent dans 60+ ateliers en Europe)

## FAQ — Garage mécanique ${ville}

**Faut-il appeler avant de venir depuis ${ville} ?**
Non, Recacor Le Crès est ouvert sans rendez-vous. Pour les prestations longues ou pour vérifier le stock d'une dimension spécifique, un appel au **${PHONE}** permet de préparer votre visite.

**Quels véhicules acceptez-vous ?**
Tous véhicules particuliers et utilitaires légers, toutes marques — Peugeot, Renault, Citroën, Volkswagen, Ford, Toyota, BMW, Mercedes…

**Peut-on tout faire en un seul passage ?**
Oui. Vidange + 4 pneus + contrôle parallélisme dans la même visite : comptez **1h30 à 2h** pour tout régler depuis ${ville}.

${cta()}
`.trim();
  return { titre, meta, categorie: "mecanique", body, rt: readTime(body) };
}

function tplPlVilleInline({ ville, distance }: { ville: string; distance: string }) {
  const titre = `Pneus Poids Lourd ${ville} — Recacor Spécialiste PL Hérault`;
  const meta = truncMeta(`Pneus poids lourd à ${ville} : Recacor à ${distance}, intervention sur site, recreusage, assistance flotte. 70 ans d'expertise. Tél. ${PHONE}.`);
  const body = `
## Pneus poids lourd à ${ville} — Recacor Le Crès

Vous gérez une flotte de poids lourds, utilitaires ou véhicules industriels à **${ville}** ? Recacor est implanté à **${distance}** du Crès, avec intervention possible sur votre site ou directement sur route en cas d'immobilisation.

Notre groupe **fondé en 1950 à Córdoba** dispose d'une expertise pneumatique reconnue : vente toutes marques, pose, recreusage industriel et assistance dépannage 7j/7.

## Notre offre PL à proximité de ${ville}

- **Vente** toutes marques (Michelin, Bridgestone, Continental, Goodyear, Hankook)
- **Pose** en atelier ou sur site
- **Recreusage** : économies de 25 à 40% par rapport au remplacement
- **Assistance** pour vos véhicules immobilisés en zone de ${ville}
- **Contrats flotte** avec facturation centralisée et tarifs négociés
- **Bilan pneumatique gratuit** sur votre dépôt

Pour une intervention rapide à ${ville}, appelez le ${PHONE} — nos techniciens se déplacent dans la journée selon disponibilité.

## Pourquoi choisir Recacor depuis ${ville}

Recacor n'est pas un revendeur classique : c'est un groupe **fabricant historique** présent dans plus de **60 ateliers en Europe**. À Le Crès, vous bénéficiez de cette puissance industrielle au service de votre activité de transport, de TP ou d'agriculture.

Tarifs et délais clairs, **interlocuteur dédié** pour le suivi de vos commandes, **réactivité** sur les pannes urgentes : c'est ce qui fait la différence pour les transporteurs de ${ville} et de la région.

## FAQ — Pneus PL à ${ville}

**Vous déplacez-vous à ${ville} ?**
Oui. Notre équipe intervient à ${ville} et dans toute la zone (${distance} du Crès) pour la pose en atelier, sur site ou en assistance route.

**Combien coûte un pneu PL ?**
Variable selon la marque et la dimension. Comptez en moyenne **350 à 600€** pour un pneu PL premium 315/80 R22.5. Devis gratuit sous 24h pour votre flotte.

**Le recreusage est-il fiable ?**
Oui, réalisé selon les normes ETRTO sur des pneus encore conformes. Il prolonge la durée de vie d'environ **30%** et **divise les coûts pneumatiques** d'autant.

## Recacor Le Crès — Votre spécialiste PL

- **Téléphone** : ${PHONE}
- **Adresse** : ${ADRESSE}
- **Horaires** : ${HORAIRES}

[Demander un devis professionnel](/pneus-utilitaires-pl#devis) ou [Appeler le ${PHONE}](tel:${PHONE_TEL}) — réponse sous 2h en jours ouvrés.
`.trim();
  return { titre, meta, categorie: "pneus-pl", body, rt: readTime(body) };
}

const FIXES = [
  { slug: "pneus-voiture-montpellier", data: () => tplVidangeVille({ ville: "Montpellier", distance: "10 min", axe: "RN113 ou A709", cp: "34000" }) },
  { slug: "pneus-lattes",              data: () => tplParallelismeVille({ ville: "Lattes", distance: "12 min", axe: "contournement Est", cp: "34970" }) },
  { slug: "pneus-mauguio",             data: () => tplVidangeVille({ ville: "Mauguio", distance: "10 min", axe: "D189", cp: "34130" }) },
  { slug: "pneus-vendargues",          data: () => tplGarageMecaniqueVille({ ville: "Vendargues", distance: "5 min", axe: "route de Nîmes", cp: "34740" }) },
  { slug: "pneus-jacou",               data: () => tplParallelismeVille({ ville: "Jacou", distance: "10 min", axe: "D172", cp: "34830" }) },
  { slug: "pneus-juvignac",            data: () => tplVidangeVille({ ville: "Juvignac", distance: "20 min", axe: "A750", cp: "34990" }) },
  { slug: "pneus-lunel",               data: () => tplGarageMecaniqueVille({ ville: "Lunel", distance: "20 min", axe: "A9", cp: "34400" }) },
  { slug: "pneus-nimes",               data: () => tplPlVilleInline({ ville: "Nîmes", distance: "35 min via A9" }) },
  { slug: "pneus-sete",                data: () => tplPlVilleInline({ ville: "Sète", distance: "30 min via A9" }) },
  { slug: "pneus-castelnau-le-lez",    data: () => tplVidangeVille({ ville: "Castelnau-le-Lez", distance: "5 min", axe: "D66", cp: "34170" }) },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("token") !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const results: { slug: string; titre: string; ok: boolean; error?: string }[] = [];

  for (const { slug, data } of FIXES) {
    try {
      const { titre, meta, categorie, body, rt } = data();
      const raw = `---\ntitre: ${titre}\nslug: ${slug}\nmeta_description: ${meta}\ncategorie: ${categorie}\ndate: ${new Date().toISOString().split("T")[0]}\nauteur: Équipe Recacor\nread_time: ${rt}\nimage:\n---\n\n# ${titre}\n\n${body}`;

      await sql`
        UPDATE articles SET
          titre            = ${titre},
          meta_description = ${meta},
          categorie        = ${categorie},
          body             = ${body},
          raw              = ${raw},
          read_time        = ${rt},
          updated_at       = NOW()
        WHERE slug = ${slug}
      `;
      results.push({ slug, titre, ok: true });
    } catch (e) {
      results.push({ slug, titre: "?", ok: false, error: String(e) });
    }
  }

  return NextResponse.json({ results, done: results.filter((r) => r.ok).length });
}
