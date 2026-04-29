"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle, ArrowRight, AlertTriangle, Leaf, MapPin, Clock, TrendingUp, Gauge, Shield, Calculator } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const pneuTypes = [
  {
    Icon: Truck,
    title: "Pneus PL — Transport & Logistique",
    items: [
      "Pneus neufs toutes dimensions (toutes marques)",
      "Rendement kilométrique optimisé",
      "Recreusage — solution économique et durable",
      "Contrats flottes sur-mesure",
    ],
  },
  {
    Icon: Leaf,
    title: "Pneus agricoles — Tracteurs & Engins",
    items: [
      "Pneus tracteurs toutes marques",
      "Pneus radiaux et diagonaux",
      "Résistance à l'usure en conditions agricoles",
      "Intervention en exploitation",
    ],
  },
  {
    Icon: Shield,
    title: "Pneus industriels — Ports, Mines, Carrières",
    items: [
      "Solutions pour environnements difficiles",
      "Pneus chariots élévateurs & engins manut.",
      "Durée de vie pneu maximisée",
      "Intervention sur site",
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
    desc: "Recreusage possible sur pneus adaptés = +25% de durée de vie. Économie et écologie, sans compromis sur la sécurité.",
  },
];

const faqs = [
  { q: "Quelle zone couvrez-vous pour l'assistance pneus PL ?", a: "Nous couvrons tout l'Hérault (34) et les départements limitrophes. Intervention 24h/24 et 7j/7 sur crevaison et remplacement pneu." },
  { q: "L'assistance couvre-t-elle la mécanique générale ?", a: "Non. Notre assistance PL couvre uniquement les interventions pneus (crevaison, remplacement). Pour la mécanique, contactez un dépanneur classique." },
  { q: "Proposez-vous des contrats de gestion de flotte ?", a: "Oui, nous proposons des contrats sur-mesure : maintenance préventive, gestion digitalisée, interlocuteur dédié, tarifs négociés." },
  { q: "Quel est le délai pour un recreusage ?", a: "Le recreusage est réalisé sous 24 à 48h en moyenne, selon notre charge atelier. Priorité aux flottes sous contrat." },
];

export function PlClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Pneus PL", url: "https://recacor.fr/pneus-utilitaires-pl" },
      ]} />
      <ServiceJsonLd name="Pneus poids lourd Hérault" description="Pneus PL, agricoles, industriels et recreusage en Hérault" />
      <FaqJsonLd items={faqs} id="pl" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <Truck className="h-3 w-3 mr-1" /> Professionnels
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Pneus Poids Lourd, Agricoles<br />
            &amp; Industriels —{" "}
            <span className="text-purple-glow">Hérault</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            60 ans d&apos;expertise au service de votre flotte. Recreusage, pneus neufs,
            assistance sur site en Hérault.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" serviceType="pl" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis professionnel <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Types de pneus */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl font-black tracking-tight text-center mb-12">
            Nos <span className="text-gradient-purple">spécialités</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pneuTypes.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} id={t.title.toLowerCase().includes("agricole") ? "agricoles" : undefined} className="rounded-3xl border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
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
              de coût stratégique. Voici les 4 critères qui font la différence sur votre TCO.
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
                className="group rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <c.Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="font-black text-sm tracking-tight mb-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recreusage */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-4">
                  <Leaf className="h-3.5 w-3.5 text-purple-glow" /> Écologique &amp; économique
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Recreusage — solution durable
                </h2>
                <p className="text-white/70 mb-6">
                  Le recreusage Recacor : des pneus haute qualité conçus pour durer plus
                  longtemps, à moindre coût et avec moins d&apos;impact environnemental.
                </p>
                <ul className="space-y-2 mb-6">
                  {["-40% vs pneu neuf", "+25% de durée de vie", "Qualité équivalente au neuf", "Réduction empreinte carbone"].map((i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-purple-glow shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
                <a href="/services/recreusage" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-lg transition-shadow">
                  En savoir plus sur le recreusage <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="text-center">
                <div className="text-7xl sm:text-8xl font-black text-purple-glow">-40%</div>
                <p className="text-white/60 mt-2 uppercase tracking-widest text-sm">Économies vs pneu neuf</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assistance */}
      <section id="assistance" className="py-24 bg-background scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-bright/10 text-purple-bright text-xs font-medium mb-4">
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
                  <div key={item.label} className="flex items-start gap-4 rounded-xl border border-border bg-white p-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-purple-bright" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">{item.label}</p>
                      <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <PhoneLink location="cta" serviceType="pl" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold shadow-lg shadow-purple-bright/25 hover:shadow-xl transition-shadow" showIcon>
                  Assistance urgente : {PHONE_DISPLAY}
                </PhoneLink>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright p-10 text-white text-center">
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
          {heroImage && (
            <div className="w-full rounded-2xl overflow-hidden mb-8 aspect-[16/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt="Garage Recacor" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Demandez un{" "}
              <span className="text-gradient-purple">devis pneus professionnel</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Un expert Recacor vous rappelle sous 2h en jours ouvrés.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisPlForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl sm:text-5xl font-black tracking-tight mb-12">
            Questions fréquentes <span className="text-gradient-purple">pneus PL / agricole</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-border bg-white p-5 cursor-pointer">
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
