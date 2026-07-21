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
      "Tracteurs, porteurs, remorques et flottes régionales",
      "Montes multi-essieux : 2 avant / 4 arrière, 4 ou 6 pneus remorque",
      "Objectif : limiter l'immobilisation et le coût au kilomètre",
    ],
  },
  {
    Icon: Wrench,
    title: "TP, BTP et chantier",
    items: [
      "Bennes, terrassement et usage mixte route/chantier",
      "Choix selon la charge réelle, les sols et le rythme d'exploitation",
      "Arbitrage entre résistance aux agressions et budget",
    ],
  },
  {
    Icon: Shield,
    title: "Agricole en renfort de zone",
    items: [
      "Pneus tracteurs et engins d'exploitation selon le secteur",
      "Prise en charge selon le point d'appui disponible",
      "Conseil selon l'usage réel de l'exploitation",
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
    q: "Qui est Claire, l'interlocutrice de la zone ?",
    a: "Claire est la commerciale terrain qui suit la zone Sud & Corse. Quinze ans dans le pneu poids lourd, des quais de chargement aux pistes de chantier : elle sait lire une usure, chiffrer une monte et déclencher le bon point d'appui sans faire perdre de temps.",
  },
  {
    q: "Je travaille dans le transport ou la remorque : pouvez-vous traiter ma demande ?",
    a: "Oui, c'est le cœur de la zone : tracteurs, porteurs, remorques et flottes régionales. Donnez la dimension complète, la quantité et le poste concerné — Claire revient avec un prix et un délai.",
  },
  {
    q: "Comment se passe la prise en charge concrètement ?",
    a: "Un appel ou le formulaire. Claire qualifie la demande (dimension, quantité, poste, secteur, urgence), vérifie la disponibilité, puis active l'atelier du Crès, un dépannage ou le partenaire relais du secteur. Vous gardez un seul interlocuteur du devis à la pose.",
  },
  {
    q: "Intervenez-vous partout de la même façon dans le Sud ?",
    a: "Non, et Claire vous le dit d'entrée. Selon le secteur, la réponse passe par l'atelier du Crès, Garage Guilhot ou Pneus Occitanie côté 31/82, BN Pneus en 24/24 sur le 13, ou un relais 26/84 selon disponibilité. Ce qui est annoncé correspond à ce qui peut être tenu.",
  },
  {
    q: "Pouvez-vous aussi parler recreusage si le parc s'y prête ?",
    a: "Oui. Sur carcasse éligible, le recreusage ajoute environ 25% de durée de vie pour 40% de moins qu'un pneu neuf, sous 24 à 48h. Sur un parc suivi, c'est souvent la première économie à activer.",
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
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image" : "hero-overlay-solid"}`} />
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
            Claire, commerciale poids lourd avec quinze ans de terrain, suit cette zone :
            transport, remorque, bennes et chantier. Elle s&apos;appuie sur l&apos;atelier
            du Crès et des partenaires relais selon votre secteur — un seul interlocuteur,
            du devis à la pose.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {["Claire", "Transport / remorque", "TP / BTP", "Dépannage", "Recreusage"].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <PhoneLink location="hero" serviceType="pl" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-purple-bright px-8 py-4 font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)]" showIcon>
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
              Claire, votre interlocutrice{" "}
              <span className="text-gradient-purple">zone Sud &amp; Corse</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Quinze ans dans le pneu poids lourd, des quais de chargement aux pistes de
                chantier : Claire connaît les contraintes d&apos;un parc qui doit rouler.
                Elle qualifie chaque demande — dimension, quantité, poste, urgence — puis
                active l&apos;atelier du Crès, un dépannage ou le partenaire relais de
                votre secteur.
              </p>
              <p>
                Transport, remorque, porteurs, bennes ou besoins chantier : vous gardez un
                seul interlocuteur du premier appel à la pose. Et quand le parc s&apos;y
                prête, elle oriente aussi vers le recreusage pour faire baisser le coût
                au kilomètre.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Activités les plus traitées</p>
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
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Pour être rappelé rapidement</p>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-base font-black">Votre activité</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Transport régional, remorque, chantier, benne ou parc mixte :
                    la solution dépend d&apos;abord de votre usage réel.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black">Votre urgence</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Crevaison à remettre en route, monte à planifier ou budget à tenir :
                    dites-le d&apos;entrée, la réponse s&apos;organise autour.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-black">Votre secteur</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Le Crès, partenaire relais, dépannage ou solution de proximité :
                    la prise en charge dépend du secteur réellement concerné.
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
                  <Phone className="h-3.5 w-3.5 text-purple-glow" /> Liens utiles
                </div>
                <h2 className="text-3xl font-black sm:text-4xl">
                  D&apos;autres sujets utiles selon votre besoin
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  Selon le besoin, vous pouvez aussi consulter le hub pneus PL, les entrées
                  locales autour de Nîmes et Sète, le recreusage ou la page clim camion
                  sur Montpellier agglomération.
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
              Claire vous rappelle avec un prix et un délai — donnez la dimension complète,
              la quantité, le poste et votre secteur.
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
