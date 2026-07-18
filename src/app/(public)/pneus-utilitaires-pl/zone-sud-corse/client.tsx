"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MapPin, Phone, Shield, Truck, Wrench } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { PhoneLink } from "@/components/phone-link";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const zonesActivites = [
  "Transport régional",
  "Remorques",
  "Bennes",
  "Chantier",
  "Dépannage",
  "Recreusage",
];

const segments = [
  {
    Icon: Truck,
    title: "Transport, logistique et remorque",
    items: [
      "Tracteur, porteur, remorque et flotte régionale",
      "Demandes multi-essieux et profils remorque",
      "Lecture coût au kilomètre, immobilisation et disponibilité",
    ],
  },
  {
    Icon: Wrench,
    title: "TP, BTP et chantier",
    items: [
      "Bennes, terrassement et usage plus sévère",
      "Lecture charge réelle, sol et rythme d'exploitation",
      "Arbitrage entre tenue, résistance et budget",
    ],
  },
  {
    Icon: Shield,
    title: "Agricole en renfort de zone",
    items: [
      "Besoin traité dans la zone sans devenir la promesse principale",
      "Approche prudente selon disponibilité et point d'appui",
      "Lecture usage exploitation et contraintes terrain",
    ],
  },
];

const pointsAppui = [
  "Le Crès — ancrage atelier Recacor",
  "31 — Garage Guilhot / Pneus Occitanie et Service 31 (24/24)",
  "82 — Pneus Occitanie et Service 82",
  "13 — BN Pneus (24/24)",
  "26 / 84 — partenaires relais selon secteur et disponibilité",
];

const faqs = [
  {
    q: "Je travaille dans le transport ou la remorque : pouvez-vous traiter ma demande ?",
    a: "Oui. Cette zone couvre d'abord les besoins transport, remorque, porteur et flotte roulante. La réponse dépend ensuite de la monte, de l'urgence, du secteur et de la disponibilité réelle.",
  },
  {
    q: "Pouvez-vous accompagner des besoins variés selon le véhicule et l'activité ?",
    a: "Oui. La solution proposée dépend du type de véhicule, du poste concerné, du niveau de contrainte et de l'usage réel. C'est cette lecture qui permet d'orienter correctement la demande.",
  },
  {
    q: "Comment se passe la prise en charge sur cette zone ?",
    a: "Claire suit la demande, vérifie les informations utiles puis oriente vers le bon point d'appui selon le secteur, le besoin et la disponibilité réelle.",
  },
  {
    q: "Intervenez-vous partout de la même façon dans le Sud ?",
    a: "Non. La prise en charge dépend du secteur, du point d'appui disponible, du partenaire mobilisable et du type de besoin. L'objectif est d'apporter une réponse sérieuse, pas de promettre la même intervention partout.",
  },
  {
    q: "Pouvez-vous aussi parler recreusage si le parc s'y prête ?",
    a: "Oui. Si la carcasse est éligible et le parc bien suivi, le recreusage peut prolonger la durée de vie du pneu et mieux protéger le coût d'usage.",
  },
];

export function PlZoneSudCorseClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Pneus PL", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
        { name: "Zone Sud & Corse", url: "https://www.recacor.fr/pneus-utilitaires-pl/zone-sud-corse" },
      ]} />
      <ServiceJsonLd
        name="Pneus poids lourd zone Sud & Corse"
        description="Page zone commerciale Recacor pour les demandes pneus poids lourd orientées transport, remorque, TP et flotte régionale."
      />
      <FaqJsonLd items={faqs} id="pl-zone-sud-corse" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImage ? "from-purple-deep/90 via-purple-mid/85 to-purple-bright/75" : "from-purple-deep via-purple-mid to-purple-bright"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-6 border-white/20 bg-white/10 text-white">
            <MapPin className="mr-1 h-3 w-3" /> Zone suivie par Claire
          </Badge>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pneus poids lourd pour la{" "}
            <span className="text-purple-glow">zone Sud &amp; Corse</span><br />
            en transport, remorque et chantier
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Claire suit cette zone pour les demandes liées au transport, à la remorque,
            aux bennes et aux besoins chantier, avec une réponse adaptée au secteur
            et à la disponibilité réelle.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {["Claire", "Transport / remorque", "TP / BTP", "Dépannage", "Recreusage"].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <PhoneLink location="hero" serviceType="pl" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-purple-bright px-8 py-4 font-bold text-white shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10">
              Devis de zone <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Un interlocuteur clair pour la{" "}
              <span className="text-gradient-purple">zone Sud &amp; Corse</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sur cette zone, les demandes concernent surtout le transport, la remorque,
                les porteurs, les bennes et les besoins chantier. Claire qualifie la demande,
                vérifie les informations utiles et oriente vers le bon point d&apos;appui selon
                le secteur, l&apos;urgence et le type de monte.
              </p>
              <p>
                L&apos;objectif n&apos;est pas d&apos;annoncer la même intervention partout. L&apos;important
                est d&apos;apporter une réponse réaliste, avec la bonne lecture d&apos;usage, la bonne
                disponibilité et, si besoin, une orientation vers le recreusage.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Besoins suivis sur la zone</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {zonesActivites.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center text-4xl font-black tracking-tight sm:text-5xl">
            Ce que la zone traite{" "}
            <span className="text-gradient-purple">concrètement</span>
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-border bg-white p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid">
                  <segment.Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="mb-4 text-lg font-black tracking-tight">{segment.title}</h3>
                <ul className="space-y-2">
                  {segment.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-bright" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Une couverture organisée{" "}
                <span className="text-gradient-purple">selon vos besoins</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                La prise en charge s&apos;organise selon le secteur, le besoin et la
                disponibilité réelle, avec l&apos;atelier du Crès et des partenaires relais
                mobilisés selon la zone.
              </p>
              <div className="mt-8 space-y-3">
                {pointsAppui.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-purple-bright" />
                    <p className="text-sm font-semibold text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Ce qu&apos;il faut donner pour aller vite</p>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-base font-black">Votre activité</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Transport régional, remorque, chantier, benne ou parc mixte :
                    la solution dépend d&apos;abord de votre usage réel.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black">Votre priorité</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Disponibilité rapide, budget maîtrisé, tenue dans le temps ou coût
                    d&apos;usage : Claire vous aide à orienter la demande au bon endroit.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black">Le bon point d&apos;appui</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Atelier du Crès, partenaires relais, dépannage ou orientation vers le
                    recreusage : la réponse s&apos;organise selon la zone et le besoin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background py-24">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 text-white sm:p-14">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
                  <Phone className="h-3.5 w-3.5 text-purple-glow" /> Services liés
                </div>
                <h2 className="text-3xl font-black sm:text-4xl">
                  D&apos;autres sujets utiles selon votre besoin
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Selon votre activité, vous pouvez aussi consulter les autres contenus utiles
                  du site : pneus PL, besoins autour de Nîmes et Sète, recreusage ou clim
                  camion sur Montpellier agglomération.
                </p>
              </div>
              <div className="space-y-3">
                <Link href="/pneus-utilitaires-pl" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Pneus poids lourd</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/blog/pneus-nimes" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Pneus poids lourd à Nîmes</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/blog/pneus-sete" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Pneus poids lourd à Sète</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services/recreusage" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Recreusage poids lourd</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services/clim-camion-poids-lourd-montpellier" className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-bold hover:bg-white/15">
                  <span>Clim camion Montpellier agglo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative overflow-hidden bg-muted py-24 scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Devis pneus PL{" "}
              <span className="text-gradient-purple">Zone Sud &amp; Corse</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un expert Recacor revient avec une première lecture utile selon la zone, le poste et le type de besoin.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-xl sm:p-8">
            <DevisPlForm />
          </div>
        </div>
      </section>

      <AvisSection />

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight sm:text-5xl">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={index} className="group cursor-pointer rounded-2xl border border-border bg-white p-5">
                <summary className="flex list-none items-center justify-between font-bold text-sm">
                  {faq.q}
                  <span className="ml-3 text-xl leading-none text-purple-bright transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
