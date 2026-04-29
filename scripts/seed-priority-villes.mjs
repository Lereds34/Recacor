/**
 * Insère les 5 articles villes prioritaires avec contenu unique
 * (écrase les versions générées par template via ON CONFLICT).
 */
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant");
  process.exit(1);
}
const sql = neon(DATABASE_URL);

const articles = [
  {
    slug: "pneus-voiture-montpellier",
    titre: "Pneus Voiture à Montpellier — Garage Recacor Le Crès à 10 min",
    meta_description: "Pneus voiture à Montpellier : Recacor Le Crès à 10 min via RN113. Toutes marques en stock, montage 15 min dès 45€, sans rendez-vous. Parallélisme offert.",
    date: "2026-04-20",
    read_time: "5 min",
    body: `## Pneus voiture à Montpellier — pourquoi venir au Crès ?

Montpellier concentre 300 000 habitants et une densité automobile parmi les plus fortes du Languedoc. Pourtant, trouver un garage pneus disponible sans attendre plusieurs jours dans l'Écusson ou à Odysseum relève parfois du parcours du combattant. Recacor Le Crès change la donne : situé à **10 minutes du centre-ville** via la RN113 ou l'A709, notre atelier accueille les Montpelliérains **sans rendez-vous**, du lundi au samedi.

Que vous soyez étudiant à la Faculté de Médecine, salarié à l'Euromédecine ou résident d'Antigone, le trajet jusqu'au Crès est direct et sans embouteillages en sortant de la ville côté est.

## Toutes marques en stock immédiat

Recacor stocke en permanence les dimensions les plus courantes pour les véhicules qui circulent à Montpellier : de la **185/65 R15** pour les citadines (Clio, 208) aux **245/45 R18** pour les SUV (Peugeot 3008, Renault Kadjar, Volkswagen Tiguan) qui ont envahi le périphérique montpelliérain.

Marques disponibles : **Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Hankook, Dunlop**. Dimensions spéciales disponibles sous 24-48h.

## Tarifs clairs, sans surprise

| Prestation | Tarif |
|---|---|
| Pneu monté + équilibré | dès 45€ |
| Vidange huile + filtre | dès 79€ |
| Parallélisme + réglage | dès 65€ |
| Contrôle parallélisme | offert avec achat pneus |
| Plaquettes avant ou arrière | dès 89€ |

Le devis est communiqué avant toute intervention. Aucune facturation sans accord préalable.

## Venir depuis Montpellier : les itinéraires

**Depuis le centre (Comédie, Antigone)** : prendre la direction Nîmes via la RN113 — 10 à 12 minutes selon la circulation.

**Depuis Odysseum** : longer la RN113 vers le Crès — 5 minutes.

**Depuis les Hauts-de-Massane ou Pompignane** : descendre vers la RN113 via la D66 — 8 minutes.

Parking sur place, accès poids lourd et utilitaire.

## FAQ — Pneus à Montpellier chez Recacor

**Le trafic autour de Montpellier n'est-il pas problématique pour venir au Crès ?**
Le Crès est situé à l'est de Montpellier, dans le sens inverse du flux domicile-travail le matin. En dehors des heures de pointe (8h30-9h et 17h30-18h30), la RN113 est fluide. Le samedi matin, le trajet prend moins de 10 minutes depuis la place de la Comédie.

**Acceptez-vous les véhicules électriques et hybrides ?**
Oui. Les véhicules électriques (Renault Zoé, Tesla, Peugeot e-208) ont souvent des dimensions spécifiques et un poids plus élevé — nous avons ces dimensions en stock et nos techniciens sont formés à leurs contraintes.

**Puis-je déposer mon véhicule et revenir le chercher ?**
Oui, la plupart des clients de Montpellier déposent leur véhicule le matin et le récupèrent en fin de matinée ou dans l'après-midi.

**Y a-t-il un service de navette ou de voiture de prêt ?**
Pas de navette pour l'instant. Pour les interventions longues, nous pouvons vous indiquer les arrêts de bus à proximité pour rejoindre Montpellier le temps de l'intervention.

## Recacor Le Crès — Contact

- 📞 **Téléphone** : 04 99 53 33 90
- 💬 **WhatsApp** : 06 07 62 10 43
- 📍 **Adresse** : 1240 Route de Nîmes, 34920 Le Crès
- 🕐 **Horaires** : Lun–Ven 8h–17h · Samedi 8h–12h`,
  },
  {
    slug: "pneus-castelnau-le-lez",
    titre: "Pneus Voiture Castelnau-le-Lez — Recacor Le Crès à 5 min",
    meta_description: "Pneus voiture à Castelnau-le-Lez : Recacor Le Crès à 5 min via D66. Montage rapide dès 45€, toutes marques, sans rendez-vous. Parallélisme offert.",
    date: "2026-04-21",
    read_time: "4 min",
    body: `## Castelnau-le-Lez et Le Crès : deux villes voisines, un seul garage de référence

Castelnau-le-Lez et Le Crès sont séparées par à peine **5 minutes via la D66**. Pour les habitants de Castelnau — qu'ils résident près du Polygone Riviera, dans les quartiers résidentiels de La Martine ou autour du château — Recacor Le Crès est littéralement le garage le plus proche pour un changement de pneus rapide et au juste prix.

Pas besoin de traverser Montpellier, pas d'embouteillage sur le périphérique. La D66 mène directement au 1240 Route de Nîmes.

## Pourquoi les habitants de Castelnau choisissent Recacor

Castelnau-le-Lez compte une population motorisée importante, avec un fort taux de SUV et de véhicules familiaux (Renault Scénic, Peugeot 5008, Citroën C5 Aircross). Ces véhicules portent des dimensions plus larges (225/55 R17, 235/50 R18) que les citadines — dimensions que nous avons systématiquement en stock.

Autre avantage : le **samedi matin**, quand les centres auto de Montpellier affichent complet, notre atelier reste accessible sans rendez-vous jusqu'à 12h.

## Tarifs & prestations

| Prestation | Tarif |
|---|---|
| Pneu monté + équilibré | dès 45€ |
| Vidange huile + filtre | dès 79€ |
| Parallélisme complet | dès 65€ |
| Contrôle parallélisme | offert avec achat pneus |

Les routes de Castelnau — notamment la D66 et les giratoires autour du Polygone — sollicitent fortement la géométrie des véhicules. Nous recommandons un contrôle de parallélisme tous les 2 ans ou après tout choc sur un trottoir ou nid-de-poule.

## FAQ — Pneus Castelnau-le-Lez

**Depuis le Polygone Riviera, quel est le trajet exact ?**
Sortez du parking Polygone direction Le Crès, prenez la D66 vers l'est. Le garage Recacor est à 4 minutes, sur votre droite avant le centre du Crès.

**Mes pneus spécifiques BMW/Audi/Mercedes sont-ils disponibles ?**
Les dimensions premium (245/40 R18, 255/35 R19, run-flat) sont disponibles sur commande sous 24h. Appelez-nous au 04 99 53 33 90 pour vérifier le stock avant de vous déplacer.

**Proposez-vous le stockage de pneus saisonniers ?**
Nous ne proposons pas encore de stockage saisonnier. Nos clients de Castelnau préfèrent généralement les pneus 4 saisons, évitant la contrainte du stockage.

## Recacor Le Crès — Contact

- 📞 **Téléphone** : 04 99 53 33 90
- 💬 **WhatsApp** : 06 07 62 10 43
- 📍 **Adresse** : 1240 Route de Nîmes, 34920 Le Crès
- 🕐 **Horaires** : Lun–Ven 8h–17h · Samedi 8h–12h`,
  },
  {
    slug: "pneus-lunel",
    titre: "Pneus à Lunel — Montage Rapide & Équilibrage chez Recacor",
    meta_description: "Pneus voiture à Lunel : Recacor Le Crès à 20 min via A9. Stock toutes marques, montage sans rendez-vous dès 45€. Spécialiste pneus VL et PL Hérault.",
    date: "2026-04-22",
    read_time: "4 min",
    body: `## Lunel et l'Hérault est : Recacor, votre garage pneus à 20 min

Lunel (34400) est le carrefour entre l'Hérault et le Gard, à mi-chemin entre Montpellier et Nîmes sur l'A9. Sa zone commerciale et industrielle génère un trafic intense de véhicules particuliers et utilitaires, ce qui use les pneus plus rapidement qu'en milieu urbain classique.

Recacor Le Crès est accessible depuis Lunel en **20 minutes via l'A9** direction Montpellier, sortie Le Crès/Vendargues. Pas de bouchon sur ce trajet, autoroute fluide sauf en période estivale.

## Un spécialiste pneus VL et PL pour la région de Lunel

Contrairement aux centres auto classiques, Recacor est spécialiste **pneus voiture ET poids lourd**. Pour les artisans et transporteurs de Lunel qui cherchent un interlocuteur unique pour leur flotte et leurs véhicules personnels, c'est un avantage concret.

Nous intervenons également sur site en Hérault pour les flottes PL — contactez-nous pour un contrat flotte adapté.

## Tarifs depuis Lunel

| Prestation | Tarif |
|---|---|
| Pneu VL monté + équilibré | dès 45€ |
| Vidange huile + filtre | dès 79€ |
| Parallélisme | dès 65€ |
| Contrôle parallélisme | offert avec achat pneus |

Le trajet Lunel → Le Crès par l'A9 est gratuit (pas de péage sur ce tronçon). Le temps de transport s'intègre facilement dans une demi-journée : départ Lunel 9h, arrivée au garage 9h20, intervention 45 min, retour 10h30.

## FAQ — Pneus à Lunel

**Y a-t-il un péage entre Lunel et Le Crès ?**
Non. Le tronçon A9 entre Lunel et la sortie Le Crès/Vendargues est gratuit. Comptez 20 minutes de trajet.

**Recacor intervient-il pour les poids lourds basés à Lunel ?**
Oui. Recacor Le Crès est spécialiste PL. Pour les interventions sur site dans la zone de Lunel, contactez-nous au 04 99 53 33 90 pour organiser un déplacement.

**Puis-je faire mes pneus et ma vidange le même jour ?**
Oui, c'est le cas le plus fréquent. Pneus + vidange + parallélisme en une seule visite : comptez 1h30 au total.

## Recacor Le Crès — Contact

- 📞 **Téléphone** : 04 99 53 33 90
- 💬 **WhatsApp** : 06 07 62 10 43
- 📍 **Adresse** : 1240 Route de Nîmes, 34920 Le Crès
- 🕐 **Horaires** : Lun–Ven 8h–17h · Samedi 8h–12h`,
  },
  {
    slug: "pneus-sete",
    titre: "Pneus à Sète — Garage Recacor Le Crès à 30 min",
    meta_description: "Pneus voiture à Sète : Recacor Le Crès à 30 min via A9. Spécialiste pneus toutes marques, montage sans rendez-vous, tarifs compétitifs en Hérault.",
    date: "2026-04-23",
    read_time: "4 min",
    body: `## Sète, l'île singulière — et ses contraintes automobiles particulières

Sète est une ville à part dans l'Hérault. Coincée entre l'étang de Thau et la Méditerranée, sa géographie insulaire concentre la circulation sur peu d'axes. La RN300 et le pont de la Saône absorbent un trafic dense, surtout en été quand le tourisme gonfle la population de 70 000 à plus de 200 000 habitants.

Ces conditions — routes saturées, bitume chaud, poids des caravanes et camping-cars en été — accélèrent l'usure des pneus. Beaucoup de Sétois préfèrent s'éloigner de l'île pour un changement de pneus sans attente. Recacor Le Crès est à **30 minutes via l'A9**, accessible toute l'année même en pleine saison estivale.

## Stock adapté aux véhicules de la côte

Les habitants de Sète roulent souvent en véhicules polyvalents capables de tracteur une remorque ou un bateau : **Volkswagen Transporter, Ford Transit, Renault Trafic** côté utilitaires, et **Toyota RAV4, Dacia Duster, Jeep Renegade** côté SUV. Ces véhicules portent des dimensions que nous avons systématiquement en stock.

Nous sommes aussi équipés pour les **pneus de camping-car** (dimensions 225/75 R16C, 235/65 R16C) — une demande croissante dans la région de Sète et de l'étang de Thau.

## Tarifs

| Prestation | Tarif |
|---|---|
| Pneu VL monté + équilibré | dès 45€ |
| Pneu utilitaire/camping-car | sur devis |
| Vidange huile + filtre | dès 79€ |
| Parallélisme | dès 65€ |

## FAQ — Pneus à Sète

**En été, le trajet Sète → Le Crès est-il fluide ?**
L'A9 entre Sète et la sortie Vendargues/Le Crès reste fluide même en juillet-août. Les bouchons se concentrent sur la RN300 dans Sète. Comptez 30-35 min en haute saison.

**Gérez-vous les pneus de camping-car ?**
Oui. Appelez au préalable au 04 99 53 33 90 pour confirmer la disponibilité de votre dimension.

**Proposez-vous un service pour les flottes d'entreprises sétoises ?**
Oui, nous proposons des contrats flotte pour les utilitaires et camionnettes des entreprises de la région de Sète.

## Recacor Le Crès — Contact

- 📞 **Téléphone** : 04 99 53 33 90
- 💬 **WhatsApp** : 06 07 62 10 43
- 📍 **Adresse** : 1240 Route de Nîmes, 34920 Le Crès
- 🕐 **Horaires** : Lun–Ven 8h–17h · Samedi 8h–12h`,
  },
  {
    slug: "pneus-nimes",
    titre: "Pneus Nîmes — Garage Spécialiste Recacor à 35 min",
    meta_description: "Pneus voiture à Nîmes : Recacor Le Crès à 35 min via A9. Spécialiste pneus VL et PL, 70 ans d'expertise, toutes marques en stock. Sans rendez-vous.",
    date: "2026-04-24",
    read_time: "5 min",
    body: `## Pourquoi des Nîmois viennent chez Recacor Le Crès ?

Nîmes est dans le Gard, à 35 minutes de Le Crès via l'A9. Ce n'est pas la porte à côté — mais il y a de bonnes raisons pour lesquelles des clients nîmois font le déplacement chez Recacor.

Premièrement, Recacor est **spécialiste pneus poids lourd** avec 70 ans d'expertise. Pour les transporteurs et artisans du Gard qui cherchent un interlocuteur sérieux pour leur flotte, Recacor est une référence régionale. Deuxièmement, pour les particuliers nîmois qui passent régulièrement sur l'A9 direction Montpellier, s'arrêter au Crès sur le trajet revient à ne pas perdre de temps.

## Nîmes et ses routes : des pneus sollicités

Les conducteurs nîmois empruntent quotidiennement des axes exigeants : **A9, RN106, voies rapides urbaines** autour des arènes. La chaleur du Gard en été accélère la dégradation des flancs de pneus. Un contrôle annuel est recommandé.

Les **véhicules sportifs** sont plus fréquents à Nîmes — Alpine, BMW Série 3, Audi A4. Ces véhicules portent des montages basses sections (225/40 R18, 245/35 R19) que nous avons ou commandons sous 24h.

## Tarifs

| Prestation | Tarif |
|---|---|
| Pneu VL monté + équilibré | dès 45€ |
| Vidange huile + filtre | dès 79€ |
| Parallélisme | dès 65€ |
| Contrôle parallélisme | offert avec achat pneus |
| Pneus PL (camion, remorque) | sur devis |

## Recacor et les professionnels du Gard

Recacor couvre commercialement le **département du Gard (30)** pour les prestations poids lourd. Si vous êtes transporteur, agriculteur ou gestionnaire de flotte basé à Nîmes, Alès ou Beaucaire, contactez-nous pour un contrat flotte adapté.

## FAQ — Pneus à Nîmes chez Recacor

**Le trajet Nîmes → Le Crès est-il facturé ou compensé ?**
Non, aucun frais lié à la distance. Les tarifs sont identiques quel que soit votre lieu de résidence.

**Recacor peut-il intervenir directement à Nîmes pour les poids lourds ?**
Oui, pour les interventions PL et contrats flotte, nous pouvons nous déplacer dans le Gard. Contactez-nous au 04 99 53 33 90.

**Y a-t-il un péage sur l'A9 entre Nîmes et Le Crès ?**
Oui, le péage de Gallargues est sur ce tronçon. Environ 3-4€ en voiture. Pour une intervention complète (4 pneus + parallélisme + vidange), l'économie sur les pièces compense largement.

**Puis-je prendre rendez-vous à l'avance depuis Nîmes ?**
Oui, appelez la veille au 04 99 53 33 90 ou WhatsApp au 06 07 62 10 43 pour réserver votre créneau.

## Recacor Le Crès — Contact

- 📞 **Téléphone** : 04 99 53 33 90
- 💬 **WhatsApp** : 06 07 62 10 43
- 📍 **Adresse** : 1240 Route de Nîmes, 34920 Le Crès
- 🕐 **Horaires** : Lun–Ven 8h–17h · Samedi 8h–12h`,
  },
];

function buildRaw(a) {
  return [
    "---",
    `titre: ${JSON.stringify(a.titre)}`,
    `slug: ${a.slug}`,
    `meta_description: ${JSON.stringify(a.meta_description)}`,
    "categorie: pneus-voiture",
    `date: ${a.date}`,
    "auteur: Recacor",
    `read_time: ${JSON.stringify(a.read_time)}`,
    "---",
    "",
    a.body,
  ].join("\n");
}

async function main() {
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';`;
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;`;

  for (const a of articles) {
    const raw = buildRaw(a);
    await sql`
      INSERT INTO articles (slug, titre, meta_description, categorie, date, auteur, read_time, body, raw, status, publish_at, updated_at)
      VALUES (${a.slug}, ${a.titre}, ${a.meta_description}, 'pneus-voiture', ${a.date}, 'Recacor', ${a.read_time}, ${a.body}, ${raw}, 'published', NULL, NOW())
      ON CONFLICT (slug) DO UPDATE SET
        titre = EXCLUDED.titre,
        meta_description = EXCLUDED.meta_description,
        categorie = EXCLUDED.categorie,
        date = EXCLUDED.date,
        auteur = EXCLUDED.auteur,
        read_time = EXCLUDED.read_time,
        body = EXCLUDED.body,
        raw = EXCLUDED.raw,
        status = 'published',
        publish_at = NULL,
        updated_at = NOW();
    `;
    console.log(`✅ ${a.slug.padEnd(30)} (${a.date})`);
  }

  console.log(`\n🎉 ${articles.length} articles villes prioritaires upsertés en 'published'`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
