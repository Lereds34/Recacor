export interface VehicleBrandPageData {
  slug: string;
  brand: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  heroVariant?: "cover" | "cutout";
  heroOverlayTone?: "default" | "strong";
  heroImagePosition?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroHighlights: Array<{ title: string; text: string }>;
  introHeading: string;
  modelsHeading: string;
  intro: string[];
  technicalSection?: {
    heading: string;
    paragraphs: string[];
    points: string[];
  };
  models: string[];
  dimensions: Array<{ size: string; fits: string }>;
  strengths: string[];
  workshopChecks: string[];
  tireBrands: string[];
  serviceLinks: Array<{ href: string; label: string }>;
  cityLinks: Array<{ href: string; label: string }>;
  faqs: Array<{ q: string; a: string }>;
  published: boolean;
}

const BRAND_PAGES: VehicleBrandPageData[] = [
  {
    slug: "peugeot",
    brand: "Peugeot",
    title: "Pneus Peugeot au Cres pres de Montpellier",
    description:
      "Pneus Peugeot au Cres pres de Montpellier : 208, 308, 2008, 3008, Partner, Expert. Stock rapide, montage sans rendez-vous et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/peugeot-hero-20260723.webp",
    heroAlt: "Peugeot compacte prise en charge dans l'atelier Recacor pour un changement de pneus",
    heroVariant: "cutout",
    heroTitle: "Pneus Peugeot au Cres",
    heroSubtitle: "208, 308, 2008 ou 3008 : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "208, 308, 2008, 3008, Partner, Expert" },
      { title: "Dimensions courantes", text: "185/65 R15, 195/65 R15, 205/55 R16, 215/65 R16" },
      { title: "Point atelier utile", text: "Parallellisme a controler si l'usure est irreguliere" },
    ],
    introHeading: "Monter des pneus sur une Peugeot",
    modelsHeading: "208, 308, 2008, 3008 : les modeles qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor voit passer tres souvent des Peugeot 208, 308, 2008 et 3008, avec aussi des profils utilitaires legers comme Partner ou Expert selon la monte.",
      "Le plus simple est de confirmer la dimension avant de venir, puis de faire le montage sur place avec devis clair et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Usure irreguliere, parallellisme et tenue de route sur Peugeot",
      paragraphs: [
        "Sur une Peugeot 208, 308, 2008 ou 3008, un pneu qui s'use plus a l'interieur, un volant pas tout a fait droit ou une voiture qui tire legerement sont souvent les premiers signes a regarder avant de remonter un train neuf.",
        "Au garage du Cres, Recacor peut monter les pneus puis controler si la geometrie doit etre revue, pour eviter de perdre rapidement le benefice du remplacement et retrouver une tenue de route plus nette au quotidien.",
      ],
      points: [
        "Usure interieure ou exterieure a lire avant le montage",
        "Volant qui tire ou tenue de route moins franche apres choc, trottoir ou route abimee",
        "Controle de parallellisme utile si l'ancien train s'est use de travers",
      ],
    },
    models: ["208", "308", "2008", "3008", "Partner", "Expert"],
    dimensions: [
      { size: "185/65 R15", fits: "208, petites Peugeot urbaines" },
      { size: "195/65 R15", fits: "308, Partner, vehicules compacts" },
      { size: "205/55 R16", fits: "308, 2008, flottes legeres" },
      { size: "215/65 R16", fits: "3008, SUV compacts" },
    ],
    strengths: [
      "208, 308, 2008 et 3008 font partie des Peugeot les plus courantes au garage",
      "Peugeot couvre a la fois la citadine, la compacte, le SUV et l'utilitaire leger",
      "Le meme passage peut aussi servir a controler le parallellisme ou l'entretien courant",
    ],
    workshopChecks: [
      "Controle d'usure reguliere apres changement de pneus",
      "Parallellisme sur 208, 308, 2008 ou 3008 si usure irreguliere",
      "Vidange ou entretien courant si le vehicule est deja sur place",
      "Recharge climatisation auto pour les usages urbains et periurbains",
    ],
    tireBrands: ["Michelin", "Continental", "Bridgestone", "Goodyear", "Hankook"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Controler le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la recharge clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/lattes", label: "Pneus Lattes" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/castelnau-le-lez", label: "Pneus Castelnau-le-Lez" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Peugeot 208, 308 ou 3008 en stock ?",
        a: "Oui, ce sont des modeles qui reviennent souvent au garage. Si la monte est plus specifique, un appel permet de confirmer le stock avant de venir.",
      },
      {
        q: "Faut-il faire le parallellisme apres des pneus neufs sur une Peugeot ?",
        a: "Si l'ancienne usure etait irreguliere, si le vehicule tire d'un cote ou si la tenue de route a change, un controle de parallellisme est utile dans le meme passage atelier.",
      },
      {
        q: "Proposez-vous des pneus 4 saisons pour une Peugeot a Montpellier ?",
        a: "Oui. Pour beaucoup d'usages locaux ou periurbains autour de Montpellier, le 4 saisons peut etre un bon choix selon le kilometrage, le budget et la dimension.",
      },
      {
        q: "Recacor travaille-t-il aussi sur les utilitaires Peugeot ?",
        a: "Oui, notamment sur des vehicules legers type Partner ou Expert, selon la dimension et l'usage du vehicule.",
      },
    ],
    published: true,
  },
  {
    slug: "renault",
    brand: "Renault",
    title: "Pneus Renault au Cres pres de Montpellier",
    description:
      "Pneus Renault au Cres pres de Montpellier : Clio, Megane, Captur, Scenic, Kadjar, Twingo, Trafic. Montage rapide, devis clair et atelier Recacor.",
    heroImage: "/illustrations/marques-vl/renault-hero-20260723.webp",
    heroAlt: "Renault citadine prise en charge au Cres pour des pneus voiture",
    heroVariant: "cutout",
    heroTitle: "Pneus Renault au Cres",
    heroSubtitle: "Clio, Megane, Captur ou Scenic : devis simple, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Clio, Megane, Captur, Scenic, Kadjar, Trafic" },
      { title: "Dimensions courantes", text: "175/65 R14, 185/65 R15, 195/65 R15, 205/60 R16" },
      { title: "Point atelier utile", text: "Bon cas d'usage pour les pneus 4 saisons et le controle de geometrie" },
    ],
    introHeading: "Monter des pneus sur une Renault",
    modelsHeading: "Clio, Megane, Captur, Scenic : les Renault qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor voit passer tres souvent des Renault Clio, Megane, Captur et Scenic, avec aussi des profils comme Kadjar, Twingo ou Trafic selon la monte.",
      "Le plus utile est de confirmer la dimension avant de venir, puis de faire le montage sur place avec devis simple et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Usure et geometrie a surveiller sur Renault",
      paragraphs: [
        "Sur Clio, Megane, Captur ou Scenic, une usure irreguliere ou une direction qui ne revient pas proprement au centre peut justifier un controle de geometrie en meme temps que le changement de pneus.",
        "L'interet est simple : repartir avec une monte neuve, un comportement plus sain et moins de risque d'user trop vite le train suivant.",
      ],
      points: [
        "Lecture de l'usure avant remplacement",
        "Controle de parallellisme si la voiture tire ou si le volant est decale",
        "Verification utile apres route abimee, trottoir ou choc leger",
      ],
    },
    models: ["Clio", "Megane", "Captur", "Scenic", "Kadjar", "Twingo", "Trafic"],
    dimensions: [
      { size: "175/65 R14", fits: "Twingo, petites Renault urbaines" },
      { size: "185/65 R15", fits: "Clio, Renault du quotidien" },
      { size: "195/65 R15", fits: "Megane, Scenic selon monte" },
      { size: "205/60 R16", fits: "Captur, Kadjar, crossovers Renault" },
    ],
    strengths: [
      "Clio, Megane et Captur font partie des Renault les plus courantes au garage",
      "Bon cas d'usage pour les pneus 4 saisons et les trajets du quotidien",
      "Le meme passage peut aussi servir a faire une vidange ou un controle de parallellisme",
    ],
    workshopChecks: [
      "Verification de l'usure pour eviter une nouvelle degradation rapide",
      "Controle du parallellisme sur Clio, Megane, Captur ou Kadjar",
      "Vidange et entretien courant si le vehicule est deja a l'atelier",
      "Climatisation auto si le besoin remonte en meme temps que les pneus",
    ],
    tireBrands: ["Michelin", "Goodyear", "Continental", "Bridgestone", "Hankook"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Verifier la geometrie" },
      { href: "/services/vidange", label: "Voir le service vidange" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/jacou", label: "Pneus Jacou" },
      { href: "/vendargues", label: "Pneus Vendargues" },
      { href: "/lunel", label: "Pneus Lunel" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Renault Clio, Captur ou Megane ?",
        a: "Oui, ce sont des modeles tres frequents au garage. L'appel reste utile si la dimension exacte, la finition ou la monte actuelle changent le besoin.",
      },
      {
        q: "Les pneus 4 saisons sont-ils adaptes a une Renault autour de Montpellier ?",
        a: "Souvent oui, surtout pour un usage local ou periurbain. Le bon choix depend ensuite du kilometrage, de la dimension et du niveau de budget vise.",
      },
      {
        q: "Pouvez-vous prendre aussi une Renault Trafic ou un utilitaire leger ?",
        a: "Oui, sur les dimensions et usages compatibles avec l'offre VL / utilitaire leger du site. Le plus simple est de verifier la monte par telephone.",
      },
      {
        q: "Quand ajouter une vidange ou un controle de parallellisme ?",
        a: "Quand la voiture est deja sur place, c'est le bon moment pour traiter une usure anormale, une geometrie douteuse ou un entretien courant en retard.",
      },
    ],
    published: true,
  },
  {
    slug: "citroen",
    brand: "Citroen",
    title: "Pneus Citroen au Cres pres de Montpellier",
    description:
      "Pneus Citroen au Cres pres de Montpellier : C3, C4, C5 Aircross, Berlingo, Picasso, Jumpy. Stock rapide, montage sans rendez-vous et conseil atelier utile.",
    heroImage: "/illustrations/marques-vl/citroen-hero-20260723.webp",
    heroAlt: "Citroen familiale en atelier pour montage de pneus au Cres",
    heroVariant: "cutout",
    heroTitle: "Pneus Citroen au Cres",
    heroSubtitle: "C3, C4, C5 Aircross ou Berlingo : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "C3, C4, C5 Aircross, Berlingo, Picasso, Jumpy" },
      { title: "Dimensions courantes", text: "185/65 R15, 195/65 R15, 205/55 R16, 215/65 R16" },
      { title: "Point atelier utile", text: "Controle de geometrie pertinent sur les usages famille et utilitaires legers" },
    ],
    introHeading: "Monter des pneus sur une Citroen",
    modelsHeading: "C3, C4, C5 Aircross, Berlingo : les Citroen qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor prend en charge les Citroen les plus courantes, des C3 et C4 jusqu'aux C5 Aircross, Berlingo, Picasso ou Jumpy selon la dimension.",
      "Le plus simple est de confirmer la monte avant de venir, puis de faire le montage sur place avec devis clair et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Parallellisme et confort de route sur Citroen",
      paragraphs: [
        "Sur une Citroen de tous les jours, l'usure des pneus raconte vite si la geometrie travaille bien, surtout quand la voiture roule chargee, prend souvent la ville ou enchaine les ralentisseurs.",
        "Si un train s'est use de biais, si le vehicule flotte un peu ou si le volant n'est plus bien centre, le controle de parallellisme permet de repartir sur une base plus propre.",
      ],
      points: [
        "Usure en facettes ou sur un seul bord a signaler a l'atelier",
        "Controle utile sur C3, C4, Berlingo ou C5 Aircross selon le comportement ressenti",
        "Tenue de route plus reguliere apres correction de geometrie quand c'est necessaire",
      ],
    },
    models: ["C3", "C4", "C5 Aircross", "Berlingo", "Picasso", "Jumpy"],
    dimensions: [
      { size: "185/65 R15", fits: "C3, petits trajets et usage quotidien" },
      { size: "195/65 R15", fits: "C4, Picasso, vehicules familiaux" },
      { size: "205/55 R16", fits: "C4, C4 Picasso, usage mixte" },
      { size: "215/65 R16", fits: "C5 Aircross, Berlingo selon version" },
    ],
    strengths: [
      "Citroen correspond souvent a des usages famille, confort et polyvalence",
      "Bon pont entre pneus, geometrie et entretien courant",
      "Berlingo et Jumpy ouvrent aussi des cas utilitaires legers utiles au garage",
    ],
    workshopChecks: [
      "Controle d'usure et de geometrie sur les usages familiaux",
      "Parallellisme apres pneus neufs si le vehicule tirait d'un cote",
      "Verification atelier simple si Berlingo ou Jumpy roule charge",
      "Recharge clim sur vehicules familiaux qui roulent l'ete",
    ],
    tireBrands: ["Michelin", "Continental", "Goodyear", "Hankook", "Pirelli"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la climatisation auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/perols", label: "Pneus Perols" },
      { href: "/palavas-les-flots", label: "Pneus Palavas-les-Flots" },
      { href: "/saint-jean-de-vedas", label: "Pneus Saint-Jean-de-Vedas" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Citroen C3, C4 ou Berlingo ?",
        a: "Oui, ces profils reviennent regulierement au garage. Recacor verifie surtout la dimension, la saison et le niveau de gamme utile avant de proposer un devis.",
      },
      {
        q: "Pourquoi le parallellisme est-il utile sur une Citroen apres changement de pneus ?",
        a: "Parce qu'une usure irreguliere, un vehicule qui tire ou un comportement de route degrade peut faire perdre rapidement le benefice d'un train neuf.",
      },
      {
        q: "Recacor prend-il aussi des Citroen type Jumpy ou Berlingo ?",
        a: "Oui, pour les usages compatibles utilitaire leger ou usage mixte, avec verification de la monte avant passage si necessaire.",
      },
      {
        q: "Quels pneus de marques proposer sur une Citroen autour de Montpellier ?",
        a: "Cela depend surtout de l'usage, du kilometrage et du budget. Michelin, Continental, Goodyear ou Hankook reviennent souvent selon le besoin.",
      },
    ],
    published: true,
  },
  {
    slug: "volkswagen",
    brand: "Volkswagen",
    title: "Pneus Volkswagen au Cres pres de Montpellier",
    description:
      "Pneus Volkswagen au Cres pres de Montpellier : Polo, Golf, Tiguan, Touran, Crafter. Montage rapide, dimensions courantes et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/volkswagen-hero-20260723.webp",
    heroAlt: "Volkswagen prise en charge dans l'atelier Recacor pour remplacement de pneus",
    heroVariant: "cutout",
    heroTitle: "Pneus Volkswagen au Cres",
    heroSubtitle: "Golf, Polo ou Tiguan : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Golf, Polo, Tiguan, Touran, Crafter" },
      { title: "Dimensions courantes", text: "195/65 R15, 205/55 R16, 225/45 R17, 235/55 R17" },
      { title: "Point atelier utile", text: "Geometrie a controler si usure interieure ou tenue de route degradee" },
    ],
    introHeading: "Monter des pneus sur une Volkswagen",
    modelsHeading: "Golf, Polo, Tiguan, Touran : les Volkswagen qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor voit passer regulierement des Volkswagen Polo, Golf, Tiguan ou Touran, avec aussi certains profils utilitaires legers selon la monte.",
      "Le plus simple est de confirmer la dimension avant de venir, puis de faire le montage sur place avec devis clair et controle de geometrie si necessaire.",
    ],
    technicalSection: {
      heading: "Tenue de route et usure a lire sur Volkswagen",
      paragraphs: [
        "Sur Golf, Polo ou Tiguan, une usure qui marque davantage a l'interieur, un volant legerement de travers ou un train avant moins precis doivent etre regardes avant de rechausser la voiture.",
        "Recacor peut faire le point au montage pour dire si le parallellisme merite un passage, afin de proteger le train neuf et retrouver un comportement de route plus propre.",
      ],
      points: [
        "Usure decalee a verifier avant remplacement",
        "Controle de geometrie apres choc, trottoir ou tenue de cap moins bonne",
        "Controle de parallellisme a ajouter si l'usure ou la tenue de route le justifie",
      ],
    },
    models: ["Polo", "Golf", "Tiguan", "Touran", "Crafter"],
    dimensions: [
      { size: "195/65 R15", fits: "Polo, Golf selon versions" },
      { size: "205/55 R16", fits: "Golf, compactes Volkswagen" },
      { size: "225/45 R17", fits: "Golf bien equipees, berlines" },
      { size: "235/55 R17", fits: "Tiguan, SUV et polyvalence route" },
    ],
    strengths: [
      "Golf, Polo et Tiguan couvrent des besoins frequents au garage",
      "Bon cas pour parler tenue de route, confort et regularite d'usure",
      "Pertinent pour les pneus et le controle de geometrie dans le meme passage",
    ],
    workshopChecks: [
      "Controle de geometrie si usure interieure ou exterieure visible",
      "Verification de la tenue de route sur Golf ou Tiguan",
      "Possibilite d'ajouter une vidange ou un entretien courant dans le meme passage",
      "Controle clim possible si le besoin est signale pendant le passage atelier",
    ],
    tireBrands: ["Michelin", "Continental", "Bridgestone", "Goodyear", "Pirelli"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Verifier le parallellisme" },
      { href: "/services/vidange", label: "Voir l'entretien courant" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/juvignac", label: "Pneus Juvignac" },
      { href: "/vendargues", label: "Pneus Vendargues" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Volkswagen Golf ou Tiguan ?",
        a: "Oui, ce sont des modeles frequents au garage. Le point utile reste de verifier la monte exacte, surtout quand la finition, les jantes ou le niveau d'equipement changent la dimension.",
      },
      {
        q: "Quand faut-il faire une geometrie sur une Volkswagen ?",
        a: "Dès qu'une usure irreguliere apparait, que la voiture tire ou qu'un train neuf est monte apres un comportement de route degrade.",
      },
      {
        q: "Proposez-vous des pneus 4 saisons pour Volkswagen a Montpellier ?",
        a: "Oui. Sur de nombreux usages routiers locaux, le 4 saisons peut etre pertinent face au pneu ete selon le kilometrage annuel.",
      },
      {
        q: "Recacor traite-t-il aussi les Volkswagen plus utilitaires ?",
        a: "Oui, selon la dimension et l'usage, y compris certains profils plus proches de l'utilitaire leger.",
      },
    ],
    published: true,
  },
  {
    slug: "audi",
    brand: "Audi",
    title: "Pneus Audi au Cres pres de Montpellier",
    description:
      "Pneus Audi au Cres pres de Montpellier : A3, A4, A6, Q3, Q5. Profils bas, dimensions specifiques, devis clair et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/audi-hero-20260723.webp",
    heroAlt: "Audi berline en atelier pour remplacement de pneus au Cres",
    heroVariant: "cutout",
    heroOverlayTone: "strong",
    heroImagePosition: "center 30%",
    heroTitle: "Pneus Audi au Cres",
    heroSubtitle: "A3, A4, Q3 ou Q5 : profils bas, jantes plus grandes et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "A1, A3, A4, A6, Q2, Q3, Q5" },
      { title: "Dimensions courantes", text: "205/55 R16, 225/45 R17, 225/40 R18, 235/55 R18" },
      { title: "Point atelier utile", text: "Verifier la monte exacte et le parallellisme si l'usure est decalee" },
    ],
    introHeading: "Monter des pneus sur une Audi",
    modelsHeading: "A3, A4, Q3, Q5 : les Audi qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor prend en charge les Audi les plus courantes autour de Montpellier, des A1 et A3 jusqu'aux A4, A6, Q3 ou Q5 selon la monte.",
      "Sur cette marque, le plus utile est souvent de confirmer la dimension exacte, la taille de jante et le bon indice avant de venir pour repartir sur un devis propre.",
    ],
    technicalSection: {
      heading: "Profil bas, usure et geometrie sur Audi",
      paragraphs: [
        "Sur une Audi, surtout en 17, 18 ou 19 pouces, une usure interieure, un train avant moins precis ou un volant legerement decale se sentent vite et peuvent abimer un train neuf plus rapidement.",
        "Recacor peut faire le montage puis dire s'il faut ajouter un controle de geometrie, pour proteger la monte neuve et retrouver une tenue de route plus propre.",
      ],
      points: [
        "Verifier la dimension exacte selon finition et taille de jante",
        "Lire l'usure avant remplacement si le pneu a travaille sur un seul bord",
        "Ajouter un controle de parallellisme si la direction n'est plus nette ou apres choc",
      ],
    },
    models: ["A1", "A3", "A4", "A6", "Q3", "Q5"],
    dimensions: [
      { size: "205/55 R16", fits: "A3, Audi compactes selon version" },
      { size: "225/45 R17", fits: "A3, A4, monte frequente sur berlines" },
      { size: "225/40 R18", fits: "A3, A4, finitions plus equipees" },
      { size: "235/55 R18", fits: "Q3, Q5, SUV Audi selon monte" },
    ],
    strengths: [
      "Audi demande souvent plus de precision sur la dimension, l'indice et la jante",
      "Bon cas pour parler confort de route, bruit de roulement et tenue de cap",
      "Le passage pneus peut aussi ouvrir un controle de geometrie si c'est utile sur le vehicule",
    ],
    workshopChecks: [
      "Controle d'usure interieure ou exterieure avant remontage",
      "Geometrie utile si la voiture tire ou si le volant n'est plus centre",
      "Verification de la monte exacte selon finition et taille de jante",
      "Possibilite d'ajouter une vidange ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Continental", "Goodyear", "Bridgestone", "Pirelli"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le service parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/castelnau-le-lez", label: "Pneus Castelnau-le-Lez" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/jacou", label: "Pneus Jacou" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Audi A3, A4 ou Q5 ?",
        a: "Oui, ce sont des profils connus au garage. Le point important reste de confirmer la monte exacte, surtout quand la finition ou la jante changent la dimension.",
      },
      {
        q: "Faut-il faire la geometrie apres des pneus neufs sur une Audi ?",
        a: "C'est utile si l'ancien train s'est use de travers, si la voiture tire ou si la direction a perdu en precision. Sur des profils bas, cela se ressent vite.",
      },
      {
        q: "Recacor peut-il monter des pneus sur une Audi avec grandes jantes ?",
        a: "Oui, selon la dimension. Le plus simple est de donner la taille exacte avant de venir pour preparer le bon devis.",
      },
      {
        q: "Quel type de pneus choisir pour une Audi autour de Montpellier ?",
        a: "Cela depend de l'usage, du kilometrage et du niveau de confort ou de tenue de route recherche. Michelin, Continental, Goodyear ou Pirelli reviennent souvent sur cette marque.",
      },
    ],
    published: true,
  },
  {
    slug: "bmw",
    brand: "BMW",
    title: "Pneus BMW au Cres pres de Montpellier",
    description:
      "Pneus BMW au Cres pres de Montpellier : Serie 1, Serie 3, X1, X3, profils bas et certaines montes runflat. Devis clair et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/bmw-hero-20260723.webp",
    heroAlt: "BMW compacte en atelier pour montage de pneus au Cres",
    heroVariant: "cutout",
    heroTitle: "Pneus BMW au Cres",
    heroSubtitle: "Serie 1, Serie 3, X1 ou X3 : monte precise, devis clair et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Serie 1, Serie 2, Serie 3, X1, X2, X3" },
      { title: "Dimensions courantes", text: "205/55 R16, 225/45 R17, 225/40 R18, 225/50 R18" },
      { title: "Point atelier utile", text: "Bien confirmer la monte exacte, surtout si la voiture est en runflat" },
    ],
    introHeading: "Monter des pneus sur une BMW",
    modelsHeading: "Serie 1, Serie 3, X1, X3 : les BMW qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor prend en charge les BMW les plus courantes, surtout des Serie 1, Serie 3, X1 et X3 selon la monte et le type de jante.",
      "Sur cette marque, il faut souvent confirmer un peu plus precisement la dimension, l'indice et la presence ou non de runflat avant de lancer le montage.",
    ],
    technicalSection: {
      heading: "BMW, usure du train avant et tenue de route",
      paragraphs: [
        "Sur une BMW, une usure interieure, un volant qui n'est plus parfaitement centre ou une sensation de train avant moins propre merite d'etre regardee avant de changer les pneus.",
        "Le bon reflexe est de monter le train neuf puis de controler si la geometrie doit etre reprise, surtout quand la voiture roule en monte basse ou plus large.",
      ],
      points: [
        "Verifier la monte exacte avant passage, y compris en runflat si le vehicule en est equipe",
        "Lire l'usure du train avant avant de remonter des pneus neufs",
        "Ajouter un controle de parallellisme si la voiture tire ou si le volant n'est plus droit",
      ],
    },
    models: ["Serie 1", "Serie 2", "Serie 3", "X1", "X2", "X3"],
    dimensions: [
      { size: "205/55 R16", fits: "Serie 1, Serie 2 selon versions" },
      { size: "225/45 R17", fits: "Serie 3, berlines BMW frequentes" },
      { size: "225/40 R18", fits: "Serie 1, Serie 3, finitions plus equipees" },
      { size: "225/50 R18", fits: "X1, X2, SUV compacts BMW" },
    ],
    strengths: [
      "BMW demande souvent de bien cadrer la monte avant devis",
      "Le lien entre pneus, direction et tenue de route est tres sensible sur cette marque",
      "Le passage atelier peut aussi servir a faire une geometrie si l'usure l'impose",
    ],
    workshopChecks: [
      "Verification de l'usure avant si le pneu a travaille d'un cote",
      "Controle de parallellisme si le volant est decale ou si la voiture tire",
      "Confirmation de la monte exacte, y compris en runflat si besoin",
      "Possibilite d'ajouter un entretien courant ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Continental", "Goodyear", "Bridgestone", "Pirelli"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Verifier la geometrie" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/lattes", label: "Pneus Lattes" },
      { href: "/castelnau-le-lez", label: "Pneus Castelnau-le-Lez" },
      { href: "/vendargues", label: "Pneus Vendargues" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour BMW Serie 1, Serie 3 ou X1 ?",
        a: "Oui, ce sont des modeles connus au garage. Le plus utile reste de confirmer la dimension exacte et la jante avant de venir.",
      },
      {
        q: "Recacor peut-il prendre une BMW en runflat ?",
        a: "Selon la monte du vehicule, oui. Le plus simple est de donner la dimension complete et de preciser si la voiture est deja equipee en runflat.",
      },
      {
        q: "Pourquoi controler la geometrie apres des pneus neufs sur une BMW ?",
        a: "Parce qu'une usure irreguliere ou une direction moins precise peut faire perdre rapidement le benefice du train neuf, surtout sur des montes plus basses.",
      },
      {
        q: "Quel type de pneus proposer sur une BMW a Montpellier ?",
        a: "Le choix depend de l'usage, du kilometrage et du niveau de confort ou de precision recherche. Michelin, Continental, Goodyear ou Bridgestone reviennent souvent selon les cas.",
      },
    ],
    published: true,
  },
  {
    slug: "mercedes",
    brand: "Mercedes",
    title: "Pneus Mercedes au Cres pres de Montpellier",
    description:
      "Pneus Mercedes au Cres pres de Montpellier : Classe A, Classe C, GLA, GLC, Vito. Devis clair, dimensions courantes et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/mercedes-hero-20260723.webp",
    heroAlt: "Mercedes berline prise en charge chez Recacor pour un changement de pneus",
    heroVariant: "cutout",
    heroTitle: "Pneus Mercedes au Cres",
    heroSubtitle: "Classe A, Classe C, GLA ou GLC : devis clair, atelier sur place et controle atelier si necessaire.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Classe A, Classe B, Classe C, GLA, GLC, Vito" },
      { title: "Dimensions courantes", text: "205/55 R16, 225/45 R17, 225/40 R18, 235/55 R19" },
      { title: "Point atelier utile", text: "Geometrie a controler si l'usure interieure apparait ou si la voiture tire" },
    ],
    introHeading: "Monter des pneus sur une Mercedes",
    modelsHeading: "Classe A, Classe C, GLA, GLC : les Mercedes qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor prend en charge les Mercedes les plus courantes, surtout Classe A, Classe C, GLA, GLC et certains profils plus utilitaires comme Vito selon la monte.",
      "Comme sur les autres marques premium, le plus simple est de confirmer la dimension exacte et la taille de jante avant de venir pour gagner du temps au devis.",
    ],
    technicalSection: {
      heading: "Usure, confort et parallellisme sur Mercedes",
      paragraphs: [
        "Sur une Mercedes, une usure interieure, un volant legerement de travers ou une tenue de route moins stable se remarquent vite, surtout quand la voiture roule avec une jante plus grande ou un profil plus bas.",
        "Recacor peut faire le montage puis dire si la geometrie merite un passage, afin de proteger le train neuf et retrouver un comportement plus propre sur route.",
      ],
      points: [
        "Verifier la dimension exacte selon finition et taille de jante",
        "Signaler une usure interieure ou un vehicule qui tire avant le montage",
        "Ajouter un controle de parallellisme si la tenue de route a change",
      ],
    },
    models: ["Classe A", "Classe B", "Classe C", "GLA", "GLC", "Vito"],
    dimensions: [
      { size: "205/55 R16", fits: "Classe A, Classe B selon versions" },
      { size: "225/45 R17", fits: "Classe C, berlines Mercedes courantes" },
      { size: "225/40 R18", fits: "Classe A, Classe C, finitions plus equipees" },
      { size: "235/55 R19", fits: "GLA, GLC, SUV Mercedes selon monte" },
    ],
    strengths: [
      "Mercedes demande souvent une verification fine de la monte avant devis",
      "Bon cas pour parler confort de roulage, usure reguliere et geometrie",
      "Le meme passage atelier peut aussi couvrir un controle de parallellisme si necessaire",
    ],
    workshopChecks: [
      "Controle d'usure avant remplacement si le pneu a marque d'un cote",
      "Geometrie utile si le volant n'est plus centre ou si la voiture tire",
      "Verification de la dimension exacte selon finition et jante",
      "Possibilite d'ajouter une vidange, un controle clim ou un entretien courant dans le meme passage",
    ],
    tireBrands: ["Michelin", "Continental", "Goodyear", "Pirelli", "Bridgestone"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/castelnau-le-lez", label: "Pneus Castelnau-le-Lez" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/saint-jean-de-vedas", label: "Pneus Saint-Jean-de-Vedas" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Mercedes Classe A, Classe C ou GLC ?",
        a: "Oui, ce sont des profils connus au garage. Il reste utile de confirmer la monte exacte avant de venir, surtout quand la finition change la dimension.",
      },
      {
        q: "Quand faut-il faire le parallellisme sur une Mercedes ?",
        a: "Dès qu'une usure irreguliere apparait, que le volant n'est plus bien centre ou que la voiture tire legerement d'un cote.",
      },
      {
        q: "Recacor peut-il traiter aussi un Mercedes Vito ?",
        a: "Oui, selon la dimension et l'usage du vehicule. Le plus simple est de verifier la monte avant passage atelier.",
      },
      {
        q: "Quel type de pneus choisir pour une Mercedes autour de Montpellier ?",
        a: "Le choix depend de l'usage, du kilometrage et du niveau de confort recherche. Michelin, Continental, Goodyear ou Pirelli reviennent souvent selon les cas.",
      },
    ],
    published: true,
  },
  {
    slug: "opel",
    brand: "Opel",
    title: "Pneus Opel au Cres pres de Montpellier",
    description:
      "Pneus Opel au Cres pres de Montpellier : Corsa, Astra, Mokka, Crossland, Zafira. Montage rapide, devis clair et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/opel-hero-20260724.png",
    heroAlt: "Opel berline compacte en atelier Recacor pour changement de pneus au Cres",
    heroVariant: "cover",
    heroTitle: "Pneus Opel au Cres",
    heroSubtitle: "Corsa, Astra ou Mokka : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Corsa, Astra, Mokka, Crossland, Zafira" },
      { title: "Dimensions courantes", text: "185/65 R15, 195/55 R16, 205/55 R16, 215/60 R17" },
      { title: "Point atelier utile", text: "Controle de geometrie si le train avant s'use plus d'un cote" },
    ],
    introHeading: "Monter des pneus sur une Opel",
    modelsHeading: "Corsa, Astra, Mokka, Crossland : les Opel qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor peut prendre en charge des Opel Corsa, Astra, Mokka ou Crossland, avec aussi certains profils familiaux comme Zafira selon la monte.",
      "Le plus simple est de confirmer la dimension avant de venir, puis de faire le montage sur place avec devis clair et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Usure reguliere et parallellisme sur Opel",
      paragraphs: [
        "Sur une Opel Corsa, Astra ou Mokka, une usure irreguliere, un volant pas tout a fait droit ou un comportement moins net sur route doivent etre regardes avant de remonter un train neuf.",
        "Recacor peut faire le montage puis dire si un controle de geometrie est utile, pour proteger le train neuf et retrouver une tenue de route plus propre.",
      ],
      points: [
        "Usure interieure ou exterieure a verifier avant remplacement",
        "Controle de parallellisme utile si le vehicule tire ou si le volant est decale",
        "Bon pont entre pneus neufs et entretien courant si la voiture est deja a l'atelier",
      ],
    },
    models: ["Corsa", "Astra", "Mokka", "Crossland", "Zafira"],
    dimensions: [
      { size: "185/65 R15", fits: "Corsa, petites Opel du quotidien" },
      { size: "195/55 R16", fits: "Corsa, Astra selon versions" },
      { size: "205/55 R16", fits: "Astra, compactes Opel courantes" },
      { size: "215/60 R17", fits: "Mokka, Crossland et SUV compacts" },
    ],
    strengths: [
      "Opel couvre des besoins simples du quotidien, de la citadine au SUV compact",
      "Bon cas pour relier pneus, geometrie et entretien courant dans le meme passage",
      "Corsa, Astra et Mokka font partie des modeles Opel les plus simples a traiter rapidement au garage",
    ],
    workshopChecks: [
      "Controle d'usure avant remplacement si le train a travaille d'un cote",
      "Controle du parallellisme si la voiture tire ou si le volant n'est plus droit",
      "Verification de la dimension exacte selon finition et jante",
      "Possibilite d'ajouter une vidange ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Continental", "Goodyear", "Hankook", "Bridgestone"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/castelnau-le-lez", label: "Pneus Castelnau-le-Lez" },
      { href: "/jacou", label: "Pneus Jacou" },
      { href: "/vendargues", label: "Pneus Vendargues" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Opel Corsa, Astra ou Mokka ?",
        a: "Oui, ce sont des profils compatibles avec l'atelier. Le plus utile reste de confirmer la monte exacte avant de venir.",
      },
      {
        q: "Quand controler le parallellisme sur une Opel ?",
        a: "Dès qu'une usure irreguliere apparait, que le vehicule tire ou que le volant n'est plus bien centre apres usage route ou choc leger.",
      },
      {
        q: "Recacor peut-il traiter aussi une Opel familiale type Zafira ?",
        a: "Oui. Le plus simple est d'appeler avec la dimension ou la taille de jante pour confirmer tout de suite la monte et preparer le devis atelier.",
      },
      {
        q: "Quel type de pneus choisir pour une Opel autour de Montpellier ?",
        a: "Le choix depend de l'usage, du kilometrage et du budget. Michelin, Continental, Goodyear ou Hankook reviennent souvent sur ces profils.",
      },
    ],
    published: true,
  },
  {
    slug: "toyota",
    brand: "Toyota",
    title: "Pneus Toyota au Cres pres de Montpellier",
    description:
      "Pneus Toyota au Cres pres de Montpellier : Yaris, Corolla, C-HR, RAV4, Auris. Montage rapide, devis clair et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/toyota-hero-20260724.png",
    heroAlt: "Toyota SUV en atelier Recacor pour changement de pneus au Cres",
    heroVariant: "cover",
    heroTitle: "Pneus Toyota au Cres",
    heroSubtitle: "Yaris, Corolla, C-HR ou RAV4 : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Yaris, Corolla, C-HR, RAV4, Auris" },
      { title: "Dimensions courantes", text: "175/65 R15, 195/65 R15, 215/60 R17, 225/60 R18" },
      { title: "Point atelier utile", text: "Controle de geometrie utile si l'usure apparait apres usage urbain ou periurbain" },
    ],
    introHeading: "Monter des pneus sur une Toyota",
    modelsHeading: "Yaris, Corolla, C-HR, RAV4 : les Toyota qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor peut prendre en charge des Toyota Yaris, Corolla, C-HR ou RAV4, avec aussi des profils proches comme Auris selon la monte.",
      "Le plus simple est de verifier la dimension et l'usage avant de venir, puis de faire le montage sur place avec devis clair et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Confort, usure et tenue de route sur Toyota",
      paragraphs: [
        "Sur une Toyota du quotidien, une usure en facettes, un volant legerement decale ou une tenue de route moins nette se ressentent vite, surtout sur les usages urbains et periurbains autour de Montpellier.",
        "Recacor peut monter les pneus puis dire si un controle de geometrie merite d'etre ajoute, afin d'eviter d'user trop vite le train neuf.",
      ],
      points: [
        "Lecture de l'usure avant remplacement, surtout sur train avant charge",
        "Controle de parallellisme utile si la voiture tire ou si le volant n'est plus centre",
        "Bon lien entre pneus, geometrie et entretien courant dans le meme passage atelier",
      ],
    },
    models: ["Yaris", "Corolla", "C-HR", "RAV4", "Auris"],
    dimensions: [
      { size: "175/65 R15", fits: "Yaris, petites Toyota urbaines" },
      { size: "195/65 R15", fits: "Corolla, Auris selon versions" },
      { size: "215/60 R17", fits: "C-HR, crossovers Toyota courants" },
      { size: "225/60 R18", fits: "RAV4, SUV Toyota selon monte" },
    ],
    strengths: [
      "Toyota couvre des besoins tres quotidiens, de la citadine au SUV familial",
      "Bon cas pour relier pneus 4 saisons, geometrie et entretien simple",
      "Yaris, Corolla et C-HR sont lisibles pour un devis rapide au garage",
    ],
    workshopChecks: [
      "Controle d'usure reguliere avant de remonter un train neuf",
      "Parallellisme utile si l'ancien train s'est use de biais",
      "Verification de la dimension exacte selon finition et jante",
      "Possibilite d'ajouter une vidange ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Continental", "Goodyear", "Bridgestone", "Hankook"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/perols", label: "Pneus Perols" },
      { href: "/saint-jean-de-vedas", label: "Pneus Saint-Jean-de-Vedas" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Toyota Yaris, Corolla ou C-HR ?",
        a: "Oui, ce sont des profils frequents. Un appel permet de confirmer rapidement la monte et la disponibilite avant de venir.",
      },
      {
        q: "Recacor peut-il traiter aussi un Toyota RAV4 ?",
        a: "Oui, selon la dimension et la monte. Le plus simple est de verifier la taille exacte avant passage atelier.",
      },
      {
        q: "Quand faire un parallellisme sur une Toyota ?",
        a: "Dès qu'une usure irreguliere apparait, que le vehicule tire ou que la tenue de route est moins propre apres un changement de pneus.",
      },
      {
        q: "Quel type de pneus choisir pour une Toyota autour de Montpellier ?",
        a: "Cela depend du kilometrage, de l'usage et du budget. Michelin, Continental, Goodyear ou Bridgestone reviennent souvent selon le profil.",
      },
    ],
    published: true,
  },
  {
    slug: "dacia",
    brand: "Dacia",
    title: "Pneus Dacia au Cres pres de Montpellier",
    description:
      "Pneus Dacia au Cres pres de Montpellier : Sandero, Stepway, Duster, Logan, Jogger. Devis simple, montage rapide et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/dacia-hero-20260724.png",
    heroAlt: "Dacia crossover en atelier Recacor pour changement de pneus au Cres",
    heroVariant: "cover",
    heroTitle: "Pneus Dacia au Cres",
    heroSubtitle: "Sandero, Duster ou Jogger : devis simple, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Sandero, Stepway, Duster, Logan, Jogger" },
      { title: "Dimensions courantes", text: "185/65 R15, 195/55 R16, 205/60 R16, 215/60 R17" },
      { title: "Point atelier utile", text: "Bon cas pour arbitrer entre budget, 4 saisons et controle de geometrie" },
    ],
    introHeading: "Monter des pneus sur une Dacia",
    modelsHeading: "Sandero, Duster, Jogger : les Dacia qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor peut prendre en charge des Dacia Sandero, Stepway, Duster ou Jogger, avec aussi des profils plus simples comme Logan selon la monte.",
      "Sur cette marque, le plus utile est souvent de confirmer la dimension et le niveau de gamme adapte au budget avant de venir pour repartir sur un devis clair.",
    ],
    technicalSection: {
      heading: "Budget, usure et geometrie sur Dacia",
      paragraphs: [
        "Sur une Dacia du quotidien, le bon choix ne porte pas seulement sur le prix du pneu. L'usure, la charge, les trajets urbains ou periurbains et la regularite du train avant comptent aussi.",
        "Recacor peut faire le montage puis dire si un controle de geometrie ou un autre passage atelier est utile, afin d'eviter de perdre trop vite le benefice du remplacement.",
      ],
      points: [
        "Comparer ete et 4 saisons selon kilometrage et usage reel",
        "Controle de parallellisme utile si le train avant s'est use de travers",
        "Bon lien entre pneus budget, controle de geometrie et entretien courant au meme endroit",
      ],
    },
    models: ["Sandero", "Stepway", "Duster", "Logan", "Jogger"],
    dimensions: [
      { size: "185/65 R15", fits: "Sandero, Logan et usages quotidiens" },
      { size: "195/55 R16", fits: "Sandero Stepway selon versions" },
      { size: "205/60 R16", fits: "Duster, Jogger selon monte" },
      { size: "215/60 R17", fits: "Duster, versions plus equipees" },
    ],
    strengths: [
      "Dacia correspond bien aux usages quotidiens et aux contraintes budget / durabilite",
      "Bon cas pour relier pneus 4 saisons, geometrie et entretien simple",
      "Sandero et Duster sont des modeles frequents qui permettent un devis rapide au garage",
    ],
    workshopChecks: [
      "Verification de l'usure avant remplacement pour eviter une nouvelle derive rapide",
      "Controle de parallellisme si le vehicule tire ou si le volant n'est plus centre",
      "Comparaison simple entre gamme budget, milieu et usage quotidien",
      "Possibilite d'ajouter une vidange ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Goodyear", "Continental", "Hankook", "Firestone"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/lunel", label: "Pneus Lunel" },
      { href: "/vendargues", label: "Pneus Vendargues" },
      { href: "/mauguio", label: "Pneus Mauguio" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Dacia Sandero, Duster ou Jogger ?",
        a: "Oui, ce sont des profils compatibles avec l'atelier. Le plus utile reste de confirmer la dimension exacte et le budget vise avant de venir.",
      },
      {
        q: "Les pneus 4 saisons sont-ils adaptes a une Dacia autour de Montpellier ?",
        a: "Souvent oui, surtout pour un usage local ou periurbain. Le bon choix depend ensuite du kilometrage et de la dimension.",
      },
      {
        q: "Quand faire un parallellisme sur une Dacia ?",
        a: "Dès qu'une usure irreguliere apparait, que le vehicule tire ou qu'un train neuf est monte apres une derive du comportement routier.",
      },
      {
        q: "Peut-on ajouter une vidange en meme temps ?",
        a: "Oui, si le vehicule est deja sur place, c'est un bon moment pour traiter aussi un entretien courant simple.",
      },
    ],
    published: true,
  },
  {
    slug: "nissan",
    brand: "Nissan",
    title: "Pneus Nissan au Cres pres de Montpellier",
    description:
      "Pneus Nissan au Cres pres de Montpellier : Micra, Juke, Qashqai, X-Trail, Note. Montage rapide, devis clair et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/nissan-hero-20260724.png",
    heroAlt: "Nissan crossover en atelier Recacor pour changement de pneus au Cres",
    heroVariant: "cover",
    heroTitle: "Pneus Nissan au Cres",
    heroSubtitle: "Micra, Juke ou Qashqai : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Micra, Juke, Qashqai, X-Trail, Note" },
      { title: "Dimensions courantes", text: "185/65 R15, 205/55 R16, 215/60 R17, 225/55 R19" },
      { title: "Point atelier utile", text: "Qashqai et SUV compacts ouvrent souvent un besoin de geometrie utile" },
    ],
    introHeading: "Monter des pneus sur une Nissan",
    modelsHeading: "Micra, Juke, Qashqai, X-Trail : les Nissan qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor peut prendre en charge des Nissan Micra, Juke, Qashqai ou X-Trail, avec aussi certains profils comme Note selon la monte.",
      "Le plus simple est de verifier la dimension exacte avant de venir, puis de faire le montage sur place avec devis clair et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Qashqai, usure du train avant et tenue de route",
      paragraphs: [
        "Sur une Nissan Juke ou Qashqai, un train avant qui s'use de biais, un volant decale ou une tenue de route moins nette se ressentent vite, surtout sur les usages mixtes ville / route.",
        "Recacor peut monter les pneus puis dire si un controle de geometrie est utile, afin d'eviter d'user trop rapidement le train neuf.",
      ],
      points: [
        "Usure en facettes ou sur un seul bord a signaler avant montage",
        "Controle de parallellisme utile sur Juke, Qashqai ou X-Trail si la voiture tire",
        "Bon lien entre pneus neufs, geometrie et entretien courant dans le meme passage",
      ],
    },
    models: ["Micra", "Juke", "Qashqai", "X-Trail", "Note"],
    dimensions: [
      { size: "185/65 R15", fits: "Micra et petites Nissan urbaines" },
      { size: "205/55 R16", fits: "Juke, compactes Nissan selon versions" },
      { size: "215/60 R17", fits: "Qashqai, SUV compacts courants" },
      { size: "225/55 R19", fits: "X-Trail ou montes SUV plus grandes" },
    ],
    strengths: [
      "Qashqai ressort comme un profil tres lisible dans les demandes pneus",
      "Bon cas pour parler geometrie, usure reguliere et tenue de route",
      "Micra et Juke gardent aussi une logique simple pour un devis rapide",
    ],
    workshopChecks: [
      "Controle de l'usure avant remplacement si le pneu a travaille d'un cote",
      "Parallellisme utile si la direction n'est plus nette ou si le volant est decale",
      "Verification de la dimension exacte selon finition et jante",
      "Possibilite d'ajouter une vidange ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Goodyear", "Continental", "Bridgestone", "Hankook"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/castelnau-le-lez", label: "Pneus Castelnau-le-Lez" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/perols", label: "Pneus Perols" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Nissan Juke, Qashqai ou X-Trail ?",
        a: "Oui, ce sont des profils compatibles avec l'atelier. Le point utile reste de confirmer la monte exacte avant de venir.",
      },
      {
        q: "Quand faire un parallellisme sur une Nissan ?",
        a: "Dès qu'une usure irreguliere apparait, que la voiture tire ou qu'un train neuf est monte apres une tenue de route degradee.",
      },
      {
        q: "Recacor peut-il traiter aussi une Nissan Micra ?",
        a: "Oui. Le plus simple est d'appeler avec la dimension ou la taille de jante pour confirmer la monte et annoncer le bon devis avant passage atelier.",
      },
      {
        q: "Quel type de pneus choisir pour une Nissan autour de Montpellier ?",
        a: "Cela depend du kilometrage, de l'usage et du budget. Michelin, Goodyear, Continental ou Bridgestone reviennent souvent selon les cas.",
      },
    ],
    published: true,
  },
  {
    slug: "ford",
    brand: "Ford",
    title: "Pneus Ford au Cres pres de Montpellier",
    description:
      "Pneus Ford au Cres pres de Montpellier : Fiesta, Focus, Puma, Kuga, Transit Connect. Montage rapide, devis clair et atelier Recacor sur place.",
    heroImage: "/illustrations/marques-vl/ford-hero-20260724.png",
    heroAlt: "Ford compacte en atelier Recacor pour changement de pneus au Cres",
    heroVariant: "cover",
    heroTitle: "Pneus Ford au Cres",
    heroSubtitle: "Fiesta, Focus, Puma ou Kuga : devis clair, montage rapide et atelier sur place.",
    heroHighlights: [
      { title: "Modeles frequents", text: "Fiesta, Focus, Puma, Kuga, Transit Connect" },
      { title: "Dimensions courantes", text: "185/60 R15, 205/55 R16, 215/55 R17, 225/60 R18" },
      { title: "Point atelier utile", text: "Bon cas pour relier pneus, geometrie et utilitaire leger selon usage" },
    ],
    introHeading: "Monter des pneus sur une Ford",
    modelsHeading: "Fiesta, Focus, Puma, Kuga : les Ford qui reviennent le plus",
    intro: [
      "Au garage du Cres, Recacor peut prendre en charge des Ford Fiesta, Focus, Puma ou Kuga, avec aussi des profils proches utilitaires legers comme Transit Connect selon la monte.",
      "Le plus simple est de confirmer la dimension exacte avant de venir, puis de faire le montage sur place avec devis clair et controle atelier si necessaire.",
    ],
    technicalSection: {
      heading: "Usure du train avant et geometrie sur Ford",
      paragraphs: [
        "Sur une Ford Fiesta ou Focus, une usure irreguliere, une direction moins nette ou un volant pas bien centre doivent etre regardes avant de remonter un train neuf.",
        "Sur Puma, Kuga ou Transit Connect, le controle de geometrie peut aussi etre utile pour repartir sur une base propre et eviter une nouvelle usure rapide.",
      ],
      points: [
        "Usure interieure ou exterieure a lire avant remplacement",
        "Controle de parallellisme utile si la voiture tire ou si la tenue de route a change",
        "Bon pont entre pneus voiture, SUV compact et utilitaire leger selon le vehicule",
      ],
    },
    models: ["Fiesta", "Focus", "Puma", "Kuga", "Transit Connect"],
    dimensions: [
      { size: "185/60 R15", fits: "Fiesta et petites Ford du quotidien" },
      { size: "205/55 R16", fits: "Focus, compactes Ford courantes" },
      { size: "215/55 R17", fits: "Puma, Kuga selon versions" },
      { size: "225/60 R18", fits: "Kuga, SUV Ford plus equipes" },
    ],
    strengths: [
      "Ford couvre bien la citadine, la compacte, le SUV et certains usages utilitaires legers",
      "Bon cas pour relier pneus, geometrie et entretien courant dans le meme passage",
      "Fiesta et Focus restent des profils simples pour un devis rapide au garage",
    ],
    workshopChecks: [
      "Verification de l'usure avant si le train a marque d'un cote",
      "Controle du parallellisme si la voiture tirait, flottait ou usait le train de facon irreguliere",
      "Controle de la dimension exacte selon finition, jante ou usage utilitaire leger",
      "Possibilite d'ajouter une vidange ou un controle clim si la voiture est deja au garage",
    ],
    tireBrands: ["Michelin", "Goodyear", "Continental", "Bridgestone", "Hankook"],
    serviceLinks: [
      { href: "/services/parallelisme-geometrie", label: "Voir le parallellisme" },
      { href: "/services/vidange", label: "Voir la vidange voiture" },
      { href: "/services/climatisation-auto-montpellier", label: "Voir la clim auto" },
    ],
    cityLinks: [
      { href: "/montpellier", label: "Pneus Montpellier" },
      { href: "/lattes", label: "Pneus Lattes" },
      { href: "/mauguio", label: "Pneus Mauguio" },
      { href: "/lunel", label: "Pneus Lunel" },
    ],
    faqs: [
      {
        q: "Avez-vous des pneus pour Ford Fiesta, Focus ou Kuga ?",
        a: "Oui, ce sont des profils compatibles avec l'atelier. Le plus utile reste de confirmer la monte exacte avant de venir.",
      },
      {
        q: "Recacor peut-il traiter aussi un Ford Transit Connect ?",
        a: "Oui. Le plus simple est d'appeler avec la dimension ou la taille de jante pour confirmer la monte et cadrer le devis avant passage atelier.",
      },
      {
        q: "Quand faire un parallellisme sur une Ford ?",
        a: "Dès qu'une usure irreguliere apparait, que la voiture tire ou qu'un train neuf est monte apres une tenue de route degradee.",
      },
      {
        q: "Quel type de pneus choisir pour une Ford autour de Montpellier ?",
        a: "Cela depend du kilometrage, de l'usage et du budget. Michelin, Goodyear, Continental ou Bridgestone reviennent souvent selon le profil.",
      },
    ],
    published: true,
  },
];

export function listPublishedVehicleBrandPages(): VehicleBrandPageData[] {
  return BRAND_PAGES.filter((page) => page.published);
}

export function findVehicleBrandPage(slug: string): VehicleBrandPageData | null {
  return BRAND_PAGES.find((page) => page.slug === slug) ?? null;
}
