export interface VilleSeo {
  slug: string;
  nom: string;
  cp: string;
  distance: string;
  region: string;
  variant: 1 | 2 | 3 | 4;
  hero_subtitle: string;
  description: string;
  angle_title: string;
  angle_text: string;
  faqs: { q: string; a: string }[];
  published: boolean;
}

export const VILLES_SEO: VilleSeo[] = [
  {
    slug: "pneus-montpellier",
    nom: "Montpellier",
    cp: "34000",
    distance: "5 km",
    region: "centre de Montpellier",
    variant: 1,
    hero_subtitle: "Pneus voiture à prix discount, montage en 15 min sans rendez-vous. À 5 km du centre de Montpellier via la RN113.",
    description: "Depuis Montpellier centre, Recacor est à 10 minutes en voiture via la Route de Nîmes. Pas besoin de prendre rendez-vous : venez directement avec votre véhicule. Nos mécaniciens montent et équilibrent vos pneus en 15 minutes sur place, stock immédiat toutes dimensions.",
    angle_title: "Le garage pneus le plus accessible depuis Montpellier",
    angle_text: "Situé à Le Crès, Recacor dessert quotidiennement les habitants de Montpellier qui veulent un service rapide et des prix discount, sans les embouteillages du centre-ville.",
    faqs: [
      { q: "Recacor est-il facilement accessible depuis Montpellier ?", a: "Oui, depuis Montpellier centre, Recacor au Crès est à 5 km via la RN113 (Route de Nîmes). Comptez 10 minutes en voiture, avec parking gratuit sur place." },
      { q: "Faut-il un rendez-vous pour changer ses pneus ?", a: "Non. Recacor accepte les clients sans rendez-vous du lundi au vendredi 8h–17h et le samedi 8h–12h. Venez directement." },
      { q: "Quel est le tarif pour 4 pneus VL montés ?", a: "À partir de 45€ le pneu monté (180€ pour 4 pneus). Le prix exact dépend de la dimension et de la marque choisie — demandez un devis gratuit en ligne." },
      { q: "Proposez-vous des pneus Michelin à Montpellier ?", a: "Oui, Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook et bien d'autres sont disponibles en stock à Le Crès. Toutes les marques, tous les budgets." },
    ],
    published: true,
  },
  {
    slug: "pneus-castelnau-le-lez",
    nom: "Castelnau-le-Lez",
    cp: "34170",
    distance: "3 km",
    region: "Castelnau-le-Lez",
    variant: 2,
    hero_subtitle: "Le garage pneus voisin de Castelnau. 3 km, sans RDV, à partir de 45€ monté.",
    description: "Castelnau-le-Lez et Le Crès sont communes limitrophes. Recacor est littéralement à côté : 5 minutes depuis n'importe quel quartier de Castelnau. Montage, équilibrage, parallélisme — tout en une seule visite sans rendez-vous.",
    angle_title: "Votre voisin pneus à Castelnau-le-Lez",
    angle_text: "Communes limitrophes, Castelnau-le-Lez et Le Crès ne sont séparées que par quelques centaines de mètres. Recacor est votre garage de proximité pour l'entretien de vos pneus.",
    faqs: [
      { q: "Où est situé Recacor par rapport à Castelnau-le-Lez ?", a: "Recacor est à 3 km de Castelnau-le-Lez, au 1240 Route de Nîmes à Le Crès. C'est littéralement la commune voisine, à 5 minutes en voiture." },
      { q: "Puis-je faire contrôler mon parallélisme en même temps que mes pneus ?", a: "Oui, et c'est fortement recommandé après un changement de pneus. Le contrôle parallélisme est offert avec chaque changement de pneus chez Recacor." },
      { q: "Avez-vous des pneus pour SUV et crossover ?", a: "Oui. Nous avons en stock les dimensions courantes pour SUV (215/65R16, 225/65R17, 235/55R18, etc.). Votre dimension absente ? Livraison 24-48h." },
      { q: "Quels horaires pour venir de Castelnau ?", a: "Lundi–Vendredi 8h–17h, Samedi 8h–12h. Pas besoin de rendez-vous, vous pouvez arriver directement." },
    ],
    published: true,
  },
  {
    slug: "pneus-lattes",
    nom: "Lattes",
    cp: "34970",
    distance: "8 km",
    region: "Lattes et Port Marianne",
    variant: 3,
    hero_subtitle: "Depuis Lattes, 8 km pour des pneus à 45€ montés. Équilibrage inclus, sans rendez-vous.",
    description: "Recacor est à 8 km de Lattes via la D986 ou l'A9. Que vous habitiez Lattes centre, Maurin ou Port Marianne, le trajet prend moins de 15 minutes. Venez sans rendez-vous — nos techniciens vous prennent en charge immédiatement.",
    angle_title: "Prix transparents pour les habitants de Lattes",
    angle_text: "Pas de surprises : nos tarifs sont affichés. À partir de 45€ le pneu VL monté, équilibrage inclus, valves neuves offertes. Devis gratuit en 2 minutes sur cette page.",
    faqs: [
      { q: "Quel est le trajet depuis Lattes jusqu'à Recacor ?", a: "Depuis Lattes, prenez la D986 direction Montpellier puis la RN113 vers Le Crès. Environ 8 km, 12 minutes. GPS : 1240 Route de Nîmes, 34920 Le Crès." },
      { q: "Le montage et l'équilibrage sont-ils inclus dans le prix ?", a: "Oui. Chez Recacor, le prix annoncé inclut toujours le démontage, le montage, l'équilibrage dynamique et les valves neuves. Aucun frais caché." },
      { q: "Avez-vous des pneus hiver pour l'hiver à la montagne ?", a: "Oui, nous stockons des pneus hiver toutes dimensions. Si vous prévoyez un départ aux sports d'hiver, contactez-nous en avance pour réserver votre montage." },
      { q: "Faites-vous la vidange en même temps que les pneus ?", a: "Oui. Recacor propose aussi la vidange, le freinage et le parallélisme. Profitez de votre visite pneus pour grouper les entretiens." },
    ],
    published: true,
  },
  {
    slug: "pneus-mauguio",
    nom: "Mauguio",
    cp: "34130",
    distance: "10 km",
    region: "Mauguio et Carnon",
    variant: 4,
    hero_subtitle: "À 10 km de Mauguio, Recacor Le Crès — pneus VL sans RDV, toutes marques, à partir de 45€.",
    description: "Depuis Mauguio et Carnon Plage, Recacor est à 15 minutes via la N113. Idéal pour les habitants du Pays de l'Or qui cherchent un garage de confiance sans les prix du centre-ville. Devis gratuit en ligne, réponse sous 2h.",
    angle_title: "La confiance des habitants de Mauguio depuis des années",
    angle_text: "Les avis Google parlent d'eux-mêmes : nos clients de Mauguio, Carnon et du Pays de l'Or nous font confiance pour l'entretien de leurs pneus. Note 5,0 sur 34 avis.",
    faqs: [
      { q: "Recacor est-il proche de Mauguio ?", a: "Oui, à 10 km via la RN113. Depuis le centre de Mauguio ou Carnon Plage, comptez 15 minutes en voiture. Adresse : 1240 Route de Nîmes, 34920 Le Crès." },
      { q: "Proposez-vous des pneus pour utilitaires légers ?", a: "Oui, nous avons en stock les dimensions pour utilitaires légers (Trafic, Master, Transit, Boxer, etc.) en plus des pneus voiture classiques." },
      { q: "Peut-on confier la voiture et revenir la chercher plus tard ?", a: "Oui. Si vous avez besoin de temps, nous pouvons garder votre véhicule pendant l'intervention. Appelez-nous en arrivant pour organiser ça." },
      { q: "Quelle marque de pneu choisir pour rouler sur l'A9 et la côte ?", a: "Pour une utilisation mixte autoroute/côte, nous recommandons du Michelin, Continental ou Bridgestone en été. Pour les 4 saisons, le Goodyear Vector 4Seasons est très populaire dans la région." },
    ],
    published: true,
  },
  {
    slug: "pneus-saint-bres",
    nom: "Saint-Brès",
    cp: "34670",
    distance: "7 km",
    region: "Saint-Brès et Mudaison",
    variant: 1,
    hero_subtitle: "Saint-Brès à 7 km de Recacor Le Crès. Pneus VL montés à partir de 45€, sans rendez-vous.",
    description: "Les habitants de Saint-Brès et Mudaison sont à moins de 10 minutes de Recacor via la RN113. Un garage de proximité avec le stock et les prix d'un grand professionnel. Venez sans rendez-vous ou demandez un devis en ligne.",
    angle_title: "Le professionnel de proximité de Saint-Brès",
    angle_text: "Saint-Brès, Mudaison, Saint-Aunès : vos communes sont à 7-10 km de Recacor. Profitez d'un service professionnel et rapide sans aller jusqu'à Montpellier.",
    faqs: [
      { q: "Comment venir de Saint-Brès chez Recacor ?", a: "Depuis Saint-Brès, prenez la direction de Montpellier puis la RN113 jusqu'à Le Crès. Environ 7 km, 10 minutes. Adresse : 1240 Route de Nîmes, 34920 Le Crès." },
      { q: "Faites-vous le montage de pneus pour motos ?", a: "Non, Recacor est spécialisé pneus et mécanique pour voitures (VL) et poids lourds (PL). Nous n'intervenons pas sur les deux-roues." },
      { q: "Proposez-vous un service de rotation des pneus ?", a: "Oui. La rotation des pneus (permuter avant/arrière) permet d'égaliser l'usure et d'allonger la durée de vie. Demandez-le lors de votre visite." },
      { q: "Que comprend le prix 'pneu monté' ?", a: "Le prix 'pneu monté' chez Recacor inclut : le pneu neuf, le démontage de l'ancien, le montage du neuf, l'équilibrage dynamique et les valves neuves. Rien à ajouter." },
    ],
    published: true,
  },
  {
    slug: "pneus-vendargues",
    nom: "Vendargues",
    cp: "34740",
    distance: "8 km",
    region: "Vendargues et la Pompignane",
    variant: 2,
    hero_subtitle: "8 km de Vendargues, pneus en stock immédiat. Commande spéciale livrée en 24h.",
    description: "Depuis Vendargues, Recacor est à 8 km via la RN113. Ce qui nous différencie : un stock important sur place et la capacité à commander toute dimension introuvable sous 24 à 48h. Service professionnel, prix justes.",
    angle_title: "Stock immédiat ou livraison 24h depuis Vendargues",
    angle_text: "Votre dimension est absente de notre stock ? Pas de problème. Nous commandons et recevons la grande majorité des pneus VL en 24 à 48h. Appelez-nous pour vérifier.",
    faqs: [
      { q: "Ma dimension de pneu est rare — pouvez-vous la commander ?", a: "Oui. Recacor a accès à un large catalogue fournisseurs. La plupart des dimensions atypiques sont disponibles sous 24 à 48h ouvrés. Appelez-nous ou soumettez un devis pour vérifier." },
      { q: "Comment venir de Vendargues ?", a: "Depuis Vendargues, prenez la direction Castelnau puis la RN113 vers Le Crès. Environ 8 km, 12 minutes. Adresse : 1240 Route de Nîmes, 34920 Le Crès." },
      { q: "Les pneus runflat sont-ils disponibles chez Recacor ?", a: "Oui, nous proposons des pneus runflat (à flancs renforcés) pour BMW, Mercedes et autres véhicules qui en ont besoin. Sur commande si hors stock." },
      { q: "Peut-on faire réparer une crevaison sans changer le pneu ?", a: "Parfois oui. Si la crevaison est sur la bande de roulement (pas sur les flancs) et que le pneu n'est pas trop usé, une réparation est possible. Amenez votre roue et nous l'évaluons gratuitement." },
    ],
    published: true,
  },
  {
    slug: "pneus-jacou",
    nom: "Jacou",
    cp: "34830",
    distance: "6 km",
    region: "Jacou et Clapiers",
    variant: 3,
    hero_subtitle: "Jacou à 6 km de Recacor. Pneus montés à partir de 45€ + contrôle parallélisme offert.",
    description: "Depuis Jacou et Clapiers, Recacor est à 10 minutes via le contournement nord de Montpellier. Spécialité : la géométrie 3D laser offerte avec chaque changement de pneus. Un service complet en une seule visite.",
    angle_title: "Pneus + parallélisme offert pour Jacou et Clapiers",
    angle_text: "Le parallélisme est souvent négligé après un changement de pneus. Chez Recacor, le contrôle est systématiquement offert. Une économie réelle et une sécurité garantie.",
    faqs: [
      { q: "Recacor est-il loin de Jacou ?", a: "Non, Jacou est à 6 km de Recacor au Crès. Via le contournement nord de Montpellier, comptez 10 minutes. Adresse : 1240 Route de Nîmes, 34920 Le Crès." },
      { q: "Pourquoi faire la géométrie après un changement de pneus ?", a: "Un mauvais parallélisme use les pneus plus vite (jusqu'à -30% de durée de vie) et dégrade la tenue de route. Le contrôle est offert chez Recacor avec chaque changement." },
      { q: "Combien coûte un réglage complet de géométrie 4 roues ?", a: "La géométrie 4 roues complète est à 89€ chez Recacor. Le simple contrôle parallélisme est offert. Si un réglage s'avère nécessaire, nous vous prévenons avant d'intervenir." },
      { q: "Acceptez-vous les voitures électriques et hybrides ?", a: "Oui. Les voitures électriques et hybrides ont souvent des pneus renforcés (marquage EV ou HL). Nous avons les références adaptées en stock ou sur commande 24h." },
    ],
    published: true,
  },
  {
    slug: "pneus-lunel",
    nom: "Lunel",
    cp: "34400",
    distance: "22 km",
    region: "Lunel et l'est de l'Hérault",
    variant: 4,
    hero_subtitle: "22 km de Lunel. Pourquoi les habitants de Lunel viennent chez Recacor : prix, stock et confiance.",
    description: "Lunel est à 22 km de Recacor au Crès, soit 20-25 minutes via la N113. La distance est compensée par des prix parmi les plus bas du département 34, un stock immédiat et un service sans rendez-vous. Nos clients de Lunel et de l'est héraultais nous plébiscitent.",
    angle_title: "Pourquoi les lunellois font 22 km pour leurs pneus",
    angle_text: "Prix discount, stock immédiat, service honnête : c'est pour ça que des clients de Lunel, Vauvert et Aigues-Mortes font régulièrement le trajet. Les économies réalisées justifient largement les 22 km.",
    faqs: [
      { q: "Ça vaut le déplacement depuis Lunel ?", a: "Oui. Sur 4 pneus, nos clients de Lunel économisent régulièrement 50 à 150€ par rapport aux prix concessionnaires. L'aller-retour Lunel–Le Crès prend 45 minutes pour un service sans attente." },
      { q: "Quel est le trajet depuis Lunel ?", a: "Depuis Lunel, prenez la N113 direction Montpellier jusqu'à Le Crès. Environ 22 km, 20 à 25 minutes. Adresse GPS : 1240 Route de Nîmes, 34920 Le Crès." },
      { q: "Puis-je déposer ma voiture et prendre le train pendant l'intervention ?", a: "Le Crès n'a pas de gare TER. Cependant, si vous avez quelqu'un pour vous déposer, le montage de 4 pneus prend 30 à 45 minutes, le temps d'attente sur place est court." },
      { q: "Avez-vous de meilleures offres que les grandes surfaces de Lunel ?", a: "Souvent oui. Nous comptons sur un approvisionnement direct auprès de nos fournisseurs pour vous proposer des prix compétitifs, avec un service professionnel que les grandes surfaces ne font pas toujours." },
    ],
    published: true,
  },
];

export function findVilleSeo(slug: string): VilleSeo | undefined {
  return VILLES_SEO.find(v => v.slug === slug && v.published);
}
