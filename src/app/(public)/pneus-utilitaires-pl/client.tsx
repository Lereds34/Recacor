"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle, ArrowRight, AlertTriangle, Leaf, MapPin, Clock, TrendingUp, Gauge, Shield, Calculator } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const activitesCles = [
  "Transporteurs",
  "Remorques",
  "TP / BTP",
  "Parcs industriels",
  "Dépannage",
  "Recreusage",
];

const accompagnements = [
  {
    title: "Conseil selon votre activité",
    desc: "Transport, remorque, chantier, parc mixte : la recommandation dépend d'abord de l'usage réel et du niveau de contrainte.",
  },
  {
    title: "Réponse adaptée au budget",
    desc: "Premium, intermédiaire ou solution plus économique : l'objectif est de trouver le bon équilibre entre prix, tenue et disponibilité.",
  },
  {
    title: "Maîtrise du coût d'usage",
    desc: "Au-delà de l'achat, Recacor aide à raisonner durée de vie, immobilisation, rendement kilométrique et potentiel de recreusage.",
  },
];

const pneuTypes = [
  {
    Icon: Truck,
    title: "Transport, remorque et logistique",
    items: [
      "Pneus neufs toutes marques, toutes dimensions",
      "Solutions pensées pour rouler, livrer et limiter l'immobilisation",
      "Choix de gamme selon budget, kilomètres et contraintes d'exploitation",
      "Accompagnement sur le remplacement, l'entretien et le coût d'usage",
    ],
  },
  {
    Icon: Leaf,
    title: "TP, chantier et agricole",
    items: [
      "Pneus radiaux et diagonaux selon l'application",
      "Solutions adaptées aux charges, aux sols difficiles et aux usages sévères",
      "Recherche de résistance, de motricité et de continuité d'activité",
      "Orientation selon le bon compromis entre robustesse et budget",
    ],
  },
  {
    Icon: Shield,
    title: "Industriel et manutention",
    items: [
      "Pneus pour parcs mixtes, manutention et environnements exigeants",
      "Recherche de fiabilité, de disponibilité et de régularité",
      "Intervention sur site selon les besoins du parc",
      "Conseil selon le rythme d'exploitation et les contraintes terrain",
    ],
  },
];

const criteres = [
  {
    Icon: TrendingUp,
    title: "Rendement kilométrique",
    desc: "Choisissez des pneumatiques conçus pour parcourir plus de kilomètres avant remplacement. Un bon rendement km = moins d'immobilisations.",
  },
  {
    Icon: Gauge,
    title: "Résistance à l'usure",
    desc: "Composition du mélange, dessin de la bande de roulement : chaque détail compte pour résister aux charges et aux kilomètres intensifs.",
  },
  {
    Icon: Calculator,
    title: "Coût au kilomètre",
    desc: "Le vrai indicateur pour un professionnel : €/km. Un pneu premium bien choisi coûte moins cher à l'usage qu'un low-cost changé 2 fois plus souvent.",
  },
  {
    Icon: Leaf,
    title: "Durée de vie pneu",
    desc: "Elle dépend d'abord de la pression, de la charge, du rythme d'exploitation et du stockage — pas d'une date fixe. Le recreusage sur enveloppes conformes peut ajouter jusqu'à 25% de vie supplémentaire.",
  },
];

const faqs = [
  { q: "Quelle zone couvrez-vous pour l'assistance pneus PL ?", a: "Tout l'Hérault (34) et les départements limitrophes. Intervention 24h/24 et 7j/7 sur crevaison et remplacement pneu. L'assistance pneus ne couvre pas la mécanique générale — pour une panne moteur, un dépanneur classique est nécessaire." },
  { q: "Proposez-vous des contrats de gestion de flotte ?", a: "Oui, avec un suivi adapté selon la taille du parc : interlocuteur dédié, tarifs négociés, priorité atelier. Contactez-nous pour cadrer le périmètre selon vos besoins et votre volume." },
  { q: "Quel est le délai pour un recreusage poids lourd ?", a: "Sous 24 à 48h en moyenne selon la charge atelier. Seules les enveloppes conformes au cadre réglementaire sont acceptées — un pneu recreusé hors norme constitue une non-conformité au contrôle technique. Les flottes sous contrat bénéficient d'une priorité de traitement." },
  { q: "Pourquoi surveiller la pression d'un pneu PL régulièrement ?", a: "Un sous-gonflage, même léger, augmente la chaleur interne, accélère l'usure et allonge la distance de freinage. Sur un parc qui roule beaucoup, un contrôle mensuel à froid est l'un des leviers les plus simples pour allonger la durée de vie des enveloppes et réduire le coût d'exploitation." },
  { q: "Recacor accompagne-t-il aussi le TP, l'agricole et les parcs industriels ?", a: "Oui. Au-delà du transport routier, Recacor accompagne les bennes, engins de chantier, parcs agricoles et environnements industriels — avec une recommandation adaptée à l'usage, la charge et le rythme d'exploitation." },
  { q: "Que faire après un choc important ou une crevaison sévère ?", a: "Faire contrôler le pneu par un professionnel avant toute remise en service. Certains dommages restent internes et ne sont pas visibles à l'œil nu — une enveloppe fragilisée peut provoquer un éclatement ultérieur dans des conditions normales d'usage." },
];

export function PlClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Pneus PL", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
      ]} />
      <ServiceJsonLd
        name="Pneus poids lourd Hérault"
        description="Pneus poids lourd, agricoles et industriels dans l'Hérault, avec recreusage et assistance sur site 24/7."
      />
      <FaqJsonLd items={faqs} id="pl" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image" : "hero-overlay-solid"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <Truck className="h-3 w-3 mr-1" /> Professionnels
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Pneus poids lourd pour{" "}
            <span className="text-purple-glow">transport, remorque, TP</span><br />
            et parcs industriels
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Transport, remorque, chantier ou parc industriel : Recacor aide à choisir
            une monte adaptée à l&apos;usage, au budget et au niveau de service attendu.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {activitesCles.map((item) => (
              <span key={item} className="rounded-[4px] border border-white/15 bg-white/10 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" serviceType="pl" className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 recacor-btn-secondary">
              Devis professionnel <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Des pneus poids lourd{" "}
              <span className="text-gradient-purple">adaptés à votre activité</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Un transporteur, une entreprise de travaux publics ou un parc industriel
                n&apos;ont pas les mêmes priorités. Certains cherchent avant tout de la
                disponibilité, d&apos;autres de la tenue dans le temps, d&apos;autres encore un
                bon compromis entre budget, fiabilité et rapidité.
              </p>
              <p>
                Recacor accompagne ces besoins avec une logique simple : proposer des pneus
                cohérents avec l&apos;activité, le type de véhicule, le niveau de contrainte
                et le service attendu. Le but n&apos;est pas de vendre le pneu le plus facile,
                mais la solution la plus utile pour continuer à rouler sereinement.
              </p>
              <p>
                Quand l&apos;enjeu principal est le coût d&apos;usage, la réflexion ne s&apos;arrête pas
                au prix d&apos;achat. La tenue dans le temps, le rendement kilométrique et le
                potentiel de recreusage peuvent faire une vraie différence sur un parc qui
                roule beaucoup ou qui travaille dans des conditions exigeantes.
              </p>
            </div>
            <div className="mt-6 rounded-[4px] border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Activités accompagnées</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activitesCles.map((item) => (
                  <span key={item} className="rounded-[4px] border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Selon votre usage</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Longue distance, remorque, chantier, parc mixte ou activité industrielle :
                  la bonne recommandation dépend d&apos;abord du terrain et du rythme d&apos;exploitation.
                </p>
              </div>
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Selon vos priorités</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Prix d&apos;achat, tenue dans le temps, disponibilité, rendement kilométrique
                  ou potentiel de recreusage : le choix se fait selon ce qui compte le plus pour vous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                Des solutions pensées{" "}
                <span className="text-gradient-purple">pour faire rouler votre activité</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                Qu&apos;il s&apos;agisse d&apos;un remplacement ponctuel, d&apos;un besoin urgent ou d&apos;une
                logique de parc, l&apos;important est d&apos;avoir une solution adaptée à votre rythme
                de travail et à votre niveau d&apos;exigence.
              </p>
            </div>
            <div className="rounded-[4px] border border-border bg-muted/35 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Accompagnement Recacor</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                L&apos;objectif est simple : vous aider à choisir une solution cohérente selon
                votre activité, votre budget, vos contraintes et la disponibilité réelle.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {accompagnements.map((item) => (
              <div key={item.title} className="rounded-[4px] border border-border bg-white p-8">
                <h3 className="text-lg font-black tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types de pneus */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl font-black tracking-tight text-center mb-12">
            Nos <span className="text-gradient-purple">spécialités</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pneuTypes.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} id={t.title.toLowerCase().includes("agricole") ? "agricoles" : undefined} className="rounded-[4px] border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <t.Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-black tracking-tight mb-4">{t.title}</h3>
                <ul className="space-y-2">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-purple-bright shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Critères B2B — métier */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Critères de choix professionnels
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
              Choisir ses pneus en{" "}
              <span className="text-gradient-purple">pro</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Pour un transporteur, un agriculteur ou un industriel, le pneumatique est un poste
              de coût stratégique. Voici les 4 critères qui font la différence sur votre TCO,
              bien plus que le seul prix visible sur une facture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {criteres.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-[4px] border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all"
              >
                <div className="w-12 h-12 rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <c.Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="font-black text-sm tracking-tight mb-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Ce qui fait vraiment varier le{" "}
              <span className="text-gradient-purple">coût au kilomètre</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Un bon pneu PL se juge sur route et sur la durée. Ce sont souvent les écarts de
              pression, la charge réelle, l&apos;usage par poste et la qualité du suivi qui font
              perdre du rendement kilométrique bien avant la fin théorique du pneu.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[4px] border border-border bg-white p-8">
              <div className="w-14 h-14 rounded-[4px] bg-purple-bright/10 flex items-center justify-center mb-5">
                <Gauge className="w-7 h-7 text-purple-bright" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-black tracking-tight mb-3">Pression et charge réelle</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Un pneu sous-gonflé ou mal adapté à la charge chauffe, s&apos;use plus vite et
                peut dégrader le coût d&apos;usage du parc. La bonne monte ne se choisit pas
                seulement par dimension : elle se raisonne aussi avec la charge et le rythme
                d&apos;exploitation du véhicule.
              </p>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <div className="w-14 h-14 rounded-[4px] bg-purple-bright/10 flex items-center justify-center mb-5">
                <TrendingUp className="w-7 h-7 text-purple-bright" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-black tracking-tight mb-3">Usure lue par essieu</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Une usure irrégulière raconte souvent quelque chose : pression instable,
                géométrie, poste mal affecté, route chantier ou remorque plus sévère que prévu.
                C&apos;est cette lecture qui permet d&apos;arbitrer entre premium, budget,
                recreusage ou remplacement.
              </p>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <div className="w-14 h-14 rounded-[4px] bg-purple-bright/10 flex items-center justify-center mb-5">
                <Shield className="w-7 h-7 text-purple-bright" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-black tracking-tight mb-3">Contrôle après choc ou crevaison</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Après un choc, un nid-de-poule, une bordure ou une crevaison, certains dommages
                restent internes et ne se voient pas toujours immédiatement. Un contrôle sérieux
                évite de remettre en service une enveloppe déjà fragilisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recreusage */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-white/10 border border-white/20 text-xs font-medium mb-4">
                  <Leaf className="h-3.5 w-3.5 text-purple-glow" /> Écologique &amp; économique
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Recreusage — solution durable
                </h2>
                <p className="text-white/70 mb-6">
                  Le recreusage Recacor : des pneus haute qualité conçus pour durer plus
                  longtemps, à moindre coût et avec moins d&apos;impact environnemental.
                </p>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  Si vous cherchez avant tout à prolonger la durée de vie de vos enveloppes, notre page{" "}
                  <Link href="/services/recreusage" className="font-bold text-purple-glow hover:underline">
                    recreusage poids lourd
                  </Link>{" "}
                  détaille le service, les gains et le fonctionnement atelier.
                </p>
                <ul className="space-y-2 mb-6">
                  {["-40% vs pneu neuf", "+25% de durée de vie", "Qualité équivalente au neuf", "Réduction empreinte carbone"].map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-purple-glow shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
                <Link href="/services/recreusage" className="recacor-btn-secondary">
                  En savoir plus sur le recreusage <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="text-center">
                <div className="text-7xl sm:text-8xl font-black text-purple-glow">-40%</div>
                <p className="text-white/60 mt-2 uppercase tracking-widest text-sm">Économies vs pneu neuf</p>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[4px] border border-border bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Zones PL déjà couvertes</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
              <Link href="/pneus-utilitaires-pl/zone-sud-corse" className="text-purple-bright hover:underline">Zone Sud &amp; Corse</Link>
              <Link href="/pneus-utilitaires-pl/zone-nord-est-centre" className="text-purple-bright hover:underline">Zone Nord-Est &amp; Centre</Link>
              <Link href="/blog/pneus-nimes" className="text-purple-bright hover:underline">Pneus poids lourd Nîmes</Link>
              <Link href="/blog/pneus-sete" className="text-purple-bright hover:underline">Pneus poids lourd Sète</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Assistance */}
      <section id="assistance" className="py-24 bg-background scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-blue-700/10 text-blue-700 text-xs font-medium mb-4">
                <AlertTriangle className="h-3.5 w-3.5" /> 24h/24 · 7j/7
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Assistance pneus PL <span className="text-gradient-purple">sur site en Hérault</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Crevaison, éclatement, remplacement pneu — nos ateliers mobiles interviennent
                directement sur votre site, sur l&apos;autoroute, en zone industrielle ou en
                exploitation agricole.
              </p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: "Zone d'intervention", value: "Hérault (34) et départements limitrophes" },
                  { icon: Clock, label: "Délai moyen", value: "Moins d'1h sur zone urbaine" },
                  { icon: AlertTriangle, label: "Service", value: "Uniquement interventions pneus (pas de mécanique)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 rounded-[4px] border border-border bg-white p-4">
                    <div className="w-10 h-10 rounded-[4px] bg-purple-bright/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-purple-bright" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">{item.label}</p>
                      <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <PhoneLink location="cta" serviceType="pl" className="recacor-btn-primary whitespace-nowrap" showIcon>
                  Assistance urgente : {PHONE_DISPLAY}
                </PhoneLink>
                <a
                  href="https://wa.me/33607621043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#25D366] px-5 py-3 text-sm font-black uppercase text-white transition hover:opacity-90 whitespace-nowrap"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
            <div className="rounded-[4px] bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright p-10 text-white text-center">
              <AlertTriangle className="w-16 h-16 text-purple-glow mx-auto mb-4" />
              <p className="text-5xl font-black mb-2">1h</p>
              <p className="text-white/60 uppercase tracking-widest text-sm mb-6">Délai moyen d&apos;intervention</p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Assistance PL 24/7</p>
                <p className="text-2xl font-black">{PHONE_DISPLAY}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Demandez un{" "}
              <span className="text-gradient-purple">devis pneus professionnel</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Un expert Recacor vous rappelle sous 2h en jours ouvrés.
            </p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisPlForm />
          </div>
        </div>
      </section>

      <AvisSection />

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl sm:text-5xl font-black tracking-tight mb-12">
            Questions fréquentes <span className="text-gradient-purple">pneus PL, agricoles et industriels</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-[4px] border border-border bg-white p-5 cursor-pointer">
                <summary className="font-bold text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
