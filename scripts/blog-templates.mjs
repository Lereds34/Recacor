// Templates Markdown déterministes par catégorie d'article.
// Chaque template retourne { metaDescription, body, readTime }.

const PHONE = "04 99 53 33 90";
const PHONE_TEL = "+33499533390";
const WHATSAPP = "06 07 62 10 43";
const ADRESSE = "1240 Route de Nîmes, 34920 Le Crès";
const HORAIRES = "Lun–Ven 8h–17h · Samedi 8h–12h";
const CTA_DEVIS = "[Demander un devis gratuit](/contact#devis)";
const CTA_TEL = `[Appeler le ${PHONE}](tel:${PHONE_TEL})`;

const truncMeta = (s) => (s.length <= 155 ? s : s.slice(0, 152).trimEnd() + "…");
const readTime = (md) => {
  const words = md.split(/\s+/).length;
  return `${Math.max(2, Math.round(words / 200))} min`;
};

function ctaBlock() {
  return `
## Recacor Le Crès — Votre garage pneus de proximité

Pour un devis ou un montage immédiat :

- 📞 **Téléphone** : ${PHONE}
- 💬 **WhatsApp** : ${WHATSAPP}
- 📍 **Adresse** : ${ADRESSE}
- 🕐 **Horaires** : ${HORAIRES}

${CTA_DEVIS} ou ${CTA_TEL} — réponse sous 2h en jours ouvrés.
`.trim();
}

// ─────────────────────────────────────────────────────────────
// Catégorie A — Pneus voiture par ville
// ─────────────────────────────────────────────────────────────
export function tplVilleVl({ ville, distance, axe, cp }) {
  const meta = `Pneus voiture à ${ville} (${cp}) : Recacor Le Crès à ${distance} via ${axe}. Stock toutes marques, montage 15 min, dès 45€ monté. Sans rendez-vous.`;
  const body = `
## Un garage pneus à proximité de ${ville}

Vous habitez ${ville} (${cp}) et cherchez un garage pneus rapide et fiable ? Le garage Recacor Le Crès est situé à seulement **${distance}** via **${axe}**, au 1240 Route de Nîmes. Stock immédiat toutes marques, montage en 15 minutes, **sans rendez-vous** pour les particuliers.

Nous accueillons chaque jour les conducteurs de ${ville} et de l'agglomération de Montpellier qui cherchent un montage rapide à un prix juste, sans devis interminable ni délai de plusieurs jours.

## Pneus toutes marques en stock — dès 45€ monté

Recacor Le Crès propose un stock permanent des plus grandes marques mondiales : **Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Hankook, Dunlop**, ainsi que des références économiques de qualité. Toutes dimensions courantes disponibles immédiatement, des autres dimensions livrées sous 24-48h.

**Tarifs depuis ${ville}** :

- Pneu **monté + équilibré** : à partir de **45€**
- **Vidange** complète (huile + filtre) : à partir de **79€**
- **Parallélisme** : à partir de **65€** — *contrôle offert avec tout changement de pneus*

## Comment venir depuis ${ville}

Depuis le centre de ${ville}, comptez **${distance}** par **${axe}** pour rejoindre notre atelier. Parking sur place, accès facile en voiture comme en utilitaire. Adresse exacte : **${ADRESSE}**.

Ouvert du **lundi au vendredi de 8h à 17h** et le **samedi de 8h à 12h** — un samedi matin suffit pour faire vos 4 pneus + équilibrage + parallélisme.

## FAQ — Pneus à ${ville}

**Faut-il prendre rendez-vous depuis ${ville} ?**
Non. Recacor Le Crès accueille les particuliers sans rendez-vous du lundi au vendredi de 8h à 17h et le samedi de 8h à 12h.

**Combien de temps pour un changement de pneus ?**
Comptez **15 minutes par pneu**, soit environ **45 minutes pour 4 pneus** avec équilibrage. Pour un trajet rapide depuis ${ville} (${distance}), une demi-heure d'attente suffit.

**Quelles marques de pneus sont disponibles immédiatement ?**
Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama, Hankook, Dunlop, Firestone et plusieurs marques économiques. Stock vérifiable par téléphone au ${PHONE}.

**Le contrôle de parallélisme est-il vraiment offert ?**
Oui — le contrôle de géométrie est **systématiquement offert** avec tout changement de pneus chez Recacor Le Crès. Le réglage éventuel est facturé à partir de 65€.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie B — Service VL (vidange, parallélisme, etc.)
// ─────────────────────────────────────────────────────────────
export function tplServiceVl({ service, titre }) {
  const meta = `${titre.split(" — ")[0]} : Recacor Le Crès, garage spécialiste à 10 min de Montpellier. Stock, montage rapide, prix discount. Tél. ${PHONE}.`;
  const body = `
## ${service[0].toUpperCase()}${service.slice(1)} à Montpellier — Recacor Le Crès

Vous cherchez un spécialiste pour votre **${service}** dans l'agglomération de Montpellier ? Le garage Recacor Le Crès est situé à 10 minutes du centre-ville, accessible depuis la RN113 ou l'A709. Stock disponible sur place, intervention rapide, **avec ou sans rendez-vous**.

Recacor, c'est un groupe pneumatique fondé en **1950 à Córdoba** (Espagne), avec plus de **70 ans d'expertise** et 60+ ateliers en Europe. À Le Crès, ce savoir-faire est mis au service des particuliers et professionnels du bassin montpelliérain.

## Notre intervention ${service}

Nos techniciens interviennent sur tous types de véhicules — citadines, berlines, SUV, utilitaires — pour votre **${service}**. Outils calibrés régulièrement, pièces de qualité d'origine ou équivalentes constructeur.

**Tarifs Recacor Le Crès** :

- Pneu monté + équilibré : **dès 45€**
- Vidange (huile + filtre) : **dès 79€**
- Parallélisme : **dès 65€** — *contrôle offert avec tout changement de pneus*
- Plaquettes de frein avant ou arrière : **dès 89€**

Devis clair affiché avant intervention, pas de surprise sur la facture.

## Comment ça se passe chez Recacor Le Crès

1. **Accueil sans rendez-vous** : présentez-vous au 1240 Route de Nîmes, 34920 Le Crès, du lundi au vendredi 8h-17h et le samedi 8h-12h.
2. **Diagnostic + devis immédiat** : un technicien évalue votre véhicule et vous présente un devis en quelques minutes.
3. **Intervention rapide** : la plupart des prestations sont réalisées dans la journée, certaines (montage pneu, équilibrage) en moins de 30 minutes.
4. **Paiement sécurisé** : CB, espèces, virement pour les professionnels.

## FAQ — ${service[0].toUpperCase()}${service.slice(1)} chez Recacor

**Faut-il prendre rendez-vous ?**
Non, Recacor Le Crès accepte les particuliers sans rendez-vous. Pour les interventions longues (révision complète), un coup de fil au ${PHONE} permet de réserver le créneau idéal.

**Quels véhicules acceptez-vous ?**
Tous types de véhicules de tourisme et utilitaires légers, toutes marques. Pour les poids lourds, agricoles et industriels, nous proposons un service dédié à Le Crès.

**Combien de temps prend l'intervention ?**
Variable selon la prestation : 15 min pour un pneu, 30 min pour une vidange, 30-45 min pour un parallélisme.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie C — Marque (Michelin, Bridgestone, etc.)
// ─────────────────────────────────────────────────────────────
export function tplMarque({ marque, titre }) {
  const meta = `Pneus ${marque} à Montpellier — Recacor Le Crès, stock permanent et montage rapide. Toutes dimensions, dès 45€ monté. Tél. ${PHONE}.`;
  const body = `
## Pneus ${marque} disponibles immédiatement à Montpellier

Le garage Recacor Le Crès est partenaire de **${marque}** et tient en stock permanent les références les plus demandées : pneus été, hiver, 4 saisons, dimensions standard et tailles basses pour SUV et berlines premium. Montage et équilibrage en 15 minutes par pneu, sans rendez-vous.

Nous sommes situés à **10 minutes du centre de Montpellier**, accessibles depuis la RN113 ou l'A709, au 1240 Route de Nîmes (34920 Le Crès).

## Pourquoi choisir un pneu ${marque} ?

${marque} fait partie des **références mondiales** de l'industrie pneumatique. La marque investit dans la R&D pour offrir un meilleur rendement, une meilleure adhérence sur sol mouillé et une longévité supérieure aux pneus économiques. Sur autoroute comme en agglomération, vous gagnez en sécurité et en confort de conduite.

Nos techniciens vous conseillent la **gamme ${marque} la plus adaptée** à votre véhicule, votre kilométrage annuel et votre budget. Pas de vente forcée — nous proposons aussi des marques économiques fiables si vos contraintes budgétaires l'exigent.

## Tarifs ${marque} chez Recacor Le Crès

- **Pneu ${marque} monté + équilibré** : à partir de **45€** (dimensions citadines courantes)
- **Pneu ${marque} taille basse SUV / berline** : à partir de **89€**
- **Vidange** : dès **79€** · **Parallélisme** : dès **65€** (offert avec tout changement de pneus)

Stock vérifiable instantanément par téléphone au ${PHONE} ou via notre [formulaire de devis](/contact#devis).

## FAQ — Pneus ${marque} à Montpellier

**Toutes les dimensions ${marque} sont-elles en stock ?**
Les dimensions courantes (175 à 235 mm de largeur, jantes 14 à 19 pouces) sont en stock immédiat. Les dimensions rares ou tailles XXL sont livrées sous 24 à 48h.

**${marque} est-elle la meilleure marque pour ma voiture ?**
Pas forcément — cela dépend de votre véhicule, votre style de conduite et votre budget. Nos techniciens vous conseillent la marque la plus adaptée parmi Michelin, ${marque}, Continental, Goodyear, Pirelli et d'autres.

**Le montage est-il garanti ?**
Oui — montage et équilibrage sont garantis. En cas de défaut sur la pose, retour atelier sans frais.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie D — Guide VL (sujets techniques et conseils)
// ─────────────────────────────────────────────────────────────
export function tplGuideVl({ sujet, titre }) {
  const meta = `${titre.split(" — ")[0]} : conseils pratiques par Recacor Le Crès, garage pneus à Montpellier. Tél. ${PHONE}.`;
  const body = `
## ${titre.split(" — ")[0]}

Le sujet de la **${sujet}** revient régulièrement chez les conducteurs de l'agglomération de Montpellier. À Recacor Le Crès, nous l'abordons chaque jour avec nos clients particuliers et nos techniciens. Voici l'essentiel à connaître pour faire les bons choix et rouler en sécurité.

## Ce qu'il faut savoir sur ${sujet}

La **${sujet}** est un sujet à la fois technique et pratique. Quelques points clés :

- **Sécurité d'abord** : un pneu en mauvais état augmente la distance de freinage de 30 à 50% sur sol mouillé.
- **Législation** : la **profondeur minimale légale** est de **1,6 mm** sur l'ensemble de la bande de roulement.
- **Économie de carburant** : un pneu sous-gonflé de 20% consomme jusqu'à **3% de carburant en plus**.
- **Durée de vie** : un pneu correctement entretenu peut durer **40 000 à 60 000 km**, parfois plus.

Le contrôle régulier (pression, usure, chocs visibles) reste la meilleure manière de préserver votre sécurité et de retarder le remplacement.

## Comment Recacor vous accompagne

Nos techniciens du Crès réalisent gratuitement un **diagnostic visuel** de vos pneus à chaque passage : profondeur, usure asymétrique, déformations, hernies. Si un remplacement s'impose, nous vous proposons plusieurs options budget vs premium, sans vente forcée.

Tarifs de référence :

- Pneu monté + équilibré : **dès 45€**
- Vidange complète : **dès 79€**
- Parallélisme : **dès 65€** — *offert avec tout changement de pneus*

## FAQ — ${titre.split(" — ")[0]}

**Quand consulter un professionnel ?**
Dès qu'un voyant TPMS s'allume, qu'un pneu se dégonfle anormalement, qu'une usure asymétrique apparaît ou que vous ressentez des vibrations dans le volant à plus de 80 km/h.

**Peut-on rouler avec un pneu usé ?**
Légalement, jusqu'à **1,6 mm** de profondeur. En pratique, l'adhérence sur sol mouillé chute fortement dès **3 mm** — nous recommandons donc un remplacement à ce seuil.

**Faut-il forcément choisir une marque premium ?**
Non. Une marque **milieu de gamme** (Hankook, Falken, Kumho) reste un bon choix qualité/prix pour un usage quotidien. Le premium se justifie surtout pour les berlines puissantes, SUV lourds et longs trajets autoroutiers.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie E — PL Hérault (vue d'ensemble)
// ─────────────────────────────────────────────────────────────
export function tplPlDept({ sujet, titre }) {
  const meta = `${titre.split(" — ")[0]} avec Recacor Le Crès : 70 ans d'expertise pneumatique, intervention sur site, recreusage. Hérault entier. Tél. ${PHONE}.`;
  const body = `
## ${titre.split(" — ")[0]}

Recacor est l'un des spécialistes pneumatique poids lourd les plus reconnus du sud-est. Pour la **${sujet}**, nous proposons une offre complète depuis notre garage de Le Crès, avec intervention sur site dans tout le département de l'**Hérault (34)**.

Notre groupe est actif depuis **1950**, avec **plus de 60 ateliers en Europe**. Cette expérience industrielle nous permet d'offrir aux transporteurs, exploitants agricoles et entreprises de TP des solutions adaptées à chaque usage.

## Notre offre pour les professionnels de l'Hérault

- **Vente toutes marques** : Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook
- **Pose en atelier ou sur site** dans tout le 34
- **Recreusage industriel** réalisé par nos techniciens certifiés
- **Assistance pneumatique** pour vos véhicules immobilisés
- **Contrats flotte** avec tarifs négociés et facturation centralisée

Que vous gériez **2 ou 200 véhicules**, nous adaptons notre offre. Demandez un **bilan pneumatique gratuit** : nos équipes se déplacent sur votre site pour évaluer l'état du parc et identifier les leviers d'économie.

## Pourquoi Recacor pour la ${sujet}

- **70 ans d'expertise** transmise depuis l'Espagne
- **Intervention rapide** dans tout l'Hérault (Montpellier, Béziers, Sète, Lunel, Pézenas, Lodève…)
- **Recreusage** : prolongez la vie de vos pneus PL et réduisez de 25 à 40% votre facture pneumatique annuelle
- **Tarifs négociés** pour les flottes
- **Interlocuteur dédié** pour le suivi de vos commandes et interventions

## FAQ — ${titre.split(" — ")[0]}

**Intervenez-vous sur site ?**
Oui, dans tout le département de l'Hérault (34). Nos camions ateliers se déplacent sur votre dépôt, votre chantier ou directement sur la route en cas d'immobilisation.

**Quelles marques proposez-vous en PL ?**
Toutes les grandes marques : Michelin, Bridgestone, Continental, Goodyear, Hankook, et plusieurs marques économiques fiables pour les usages moins exigeants.

**Comment obtenir un devis flotte ?**
Contactez-nous au ${PHONE} ou via le [formulaire dédié](/contact#devis). Un commercial vous rappelle sous 24h ouvrées avec une grille tarifaire négociée.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie F — PL par ville Hérault
// ─────────────────────────────────────────────────────────────
export function tplPlVille({ ville, distance, titre }) {
  const meta = `Pneus poids lourd à ${ville} : Recacor à ${distance}, intervention sur site, recreusage, assistance flotte. 70 ans d'expertise. Tél. ${PHONE}.`;
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

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie G — Guide PL
// ─────────────────────────────────────────────────────────────
export function tplGuidePl({ sujet, titre }) {
  const meta = `${titre.split(" — ")[0]} : conseils experts par Recacor, spécialiste pneumatique PL à Montpellier — Le Crès. Tél. ${PHONE}.`;
  const body = `
## ${titre.split(" — ")[0]}

Pour les transporteurs, gestionnaires de flotte et exploitants agricoles, la question de la **${sujet}** a un impact direct sur la sécurité, la conformité réglementaire et le budget annuel. Voici les points-clés à connaître, par les techniciens Recacor Le Crès.

## Ce que dit la pratique sur ${sujet}

Le pneumatique représente en moyenne **15 à 25% du coût d'exploitation** d'un poids lourd. Optimiser sa **${sujet}** permet de réaliser des économies substantielles sur l'année :

- **Recreusage** : prolonge de **25 à 40%** la durée de vie d'un pneu PL conforme
- **Pression contrôlée** : un pneu sous-gonflé de 20% consomme **3% de carburant en plus** et s'use **30% plus vite**
- **Géométrie alignée** : une mauvaise géométrie cause une **usure asymétrique** qui peut diviser par deux la durée de vie d'un train de pneus
- **Surveillance TPMS** : alerte précoce sur les fuites et anomalies de pression

## L'approche Recacor sur ${sujet}

Recacor accompagne les flottes de l'Hérault avec une approche **données et terrain** :

1. **Bilan pneumatique gratuit** sur votre site : audit visuel, mesure de pression et de profondeur, analyse du parc.
2. **Plan d'action** : préconisations de remplacement, recreusage, géométrie, formation conducteurs.
3. **Suivi** : interlocuteur dédié, facturation centralisée, alertes sur les véhicules à risque.

Pour les pannes : **assistance pneumatique** dans tout l'Hérault, intervention rapide en zone industrielle, sur autoroute (A9, A75) ou directement chez vous.

## FAQ — ${titre.split(" — ")[0]}

**Comment optimiser le coût pneumatique de sa flotte ?**
Trois leviers : **recreusage** systématique des pneus éligibles, **contrôle de pression** mensuel sur tout le parc, **alignement / géométrie** annuels. Cumulés, ces actions réduisent la facture annuelle de 20 à 35%.

**Le recreusage est-il autorisé sur tous les pneus PL ?**
Non — seuls les pneus conçus pour être recreusés (mention ETRTO sur le flanc) peuvent l'être. Nos techniciens vérifient la conformité avant chaque intervention.

**Recacor propose-t-il un suivi numérique ?**
Oui — pour les flottes importantes, un suivi par véhicule est mis en place : kilométrage, dates d'intervention, alertes de remplacement.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie H — FAQ développée
// ─────────────────────────────────────────────────────────────
export function tplFaq({ sujet, titre }) {
  const meta = `${titre} — Réponse complète par Recacor Le Crès, garage pneus et mécanique à 10 min de Montpellier. Tél. ${PHONE}.`;
  const body = `
## ${titre}

C'est l'une des questions que nous recevons régulièrement à Recacor Le Crès. Voici une réponse complète, basée sur l'expérience quotidienne de nos techniciens et sur les standards de l'industrie pneumatique.

## La réponse en bref

Sur le sujet de la **${sujet}**, plusieurs éléments comptent : la qualité de la prestation, la transparence des prix, la disponibilité du stock et la rapidité de l'intervention. À Recacor Le Crès, ces quatre piliers sont la base de notre fonctionnement quotidien.

### Tarifs de référence

- Pneu **monté + équilibré** : à partir de **45€**
- **Vidange** complète (huile + filtre) : à partir de **79€**
- **Parallélisme** : à partir de **65€** — *offert avec tout changement de pneus*
- Plaquettes de frein avant ou arrière : **dès 89€**

## Pourquoi venir chez Recacor

- **Stock immédiat** toutes marques (Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama)
- **Sans rendez-vous** pour les particuliers
- **70 ans d'expertise** Recacor (groupe fondé en 1950, présent dans 60+ ateliers en Europe)
- **Tarifs clairs** affichés avant intervention
- **Devis gratuit** en 2h

## FAQ complémentaire

**Faut-il prendre rendez-vous ?**
Non, Recacor Le Crès accueille les clients sans rendez-vous du lundi au vendredi de 8h à 17h et le samedi de 8h à 12h.

**Quels moyens de paiement ?**
CB, espèces, virement (pour les pros). Possibilité de paiement en plusieurs fois pour les particuliers.

**Le contrôle parallélisme est-il vraiment offert ?**
Oui, le contrôle est offert avec tout changement de pneus. Le réglage éventuel reste facturé à partir de 65€.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}

// ─────────────────────────────────────────────────────────────
// Catégorie I — Saisonnier / Actualités
// ─────────────────────────────────────────────────────────────
export function tplSaisonnier({ sujet, titre }) {
  const meta = `${titre.split(" — ")[0]} : actualités et conseils Recacor Le Crès. Garage pneus et mécanique à Montpellier. Tél. ${PHONE}.`;
  const body = `
## ${titre.split(" — ")[0]}

L'actualité pneumatique évolue chaque saison. Sur le thème de **${sujet}**, voici l'essentiel à connaître pour les conducteurs de l'agglomération de Montpellier et les professionnels de l'Hérault.

## Le contexte

La région **Occitanie** présente des conditions climatiques spécifiques : étés chauds, pluies courtes mais intenses, vents soutenus, et plusieurs zones soumises à la **Loi Montagne** dans les contreforts cévenols. Tous ces facteurs influencent la durée de vie de vos pneus et la sécurité de vos déplacements.

À Recacor Le Crès, nous adaptons notre offre saisonnière en fonction de ces réalités locales : stock de pneus 4 saisons toujours disponible, **transition été/hiver** simplifiée pour les conducteurs concernés par la réglementation montagne, et conseils personnalisés selon votre véhicule et votre kilométrage.

## L'approche Recacor

- **Diagnostic gratuit** à chaque passage : profondeur, usure, hernies, pression
- **Stock saisonnier** des dimensions courantes (été, hiver, 4 saisons)
- **Tarifs identiques** toute l'année — pas de hausse en pleine saison de remplacement
- **Stockage de pneus saisonniers** sur place (option) pour éviter le double trajet domicile-garage

Tarifs de référence Recacor Le Crès :

- Pneu monté + équilibré : **dès 45€**
- Vidange (huile + filtre) : **dès 79€**
- Parallélisme : **dès 65€** — *offert avec tout changement de pneus*

## Notre conseil pratique

Avant chaque grand trajet (vacances, départ professionnel, week-end), vérifiez **5 points en 5 minutes** :

1. **Pression** : vérifiée à froid, selon recommandation constructeur (étiquette portière ou trappe carburant)
2. **Profondeur** : minimum **3 mm** pour la pluie, **1,6 mm** est le seuil légal
3. **Usure asymétrique** : un côté plus usé indique une géométrie déréglée
4. **Hernies, coupures, clous** : tout dommage sur le flanc impose un remplacement
5. **Roue de secours / kit anti-crevaison** : présent et utilisable

Un passage chez Recacor Le Crès avant un long trajet ne coûte rien (diagnostic visuel offert) et peut éviter une panne sur autoroute.

## FAQ — ${sujet}

**Quand penser au remplacement saisonnier ?**
En **octobre/novembre** pour passer aux pneus hiver, en **mars/avril** pour repasser aux pneus été. Les pneus 4 saisons évitent ce changement.

**Peut-on rouler avec des pneus été en Occitanie l'hiver ?**
Oui dans la plupart des cas — sauf zones soumises à la **Loi Montagne** (équipement obligatoire du 1er novembre au 31 mars). Vérifiez votre zone sur le site du gouvernement.

**Le stockage de pneus est-il payant chez Recacor ?**
Service disponible à Recacor Le Crès — tarif annuel modeste, retour des pneus garanti à la prochaine demande de remontage.

${ctaBlock()}
`.trim();
  return { metaDescription: truncMeta(meta), body, readTime: readTime(body) };
}
