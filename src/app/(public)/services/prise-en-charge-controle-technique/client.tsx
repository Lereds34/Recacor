"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { DevisControleTechniqueForm } from "@/components/forms/devis-controle-technique";
import { PhoneLink } from "@/components/phone-link";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  CircleAlert,
  ClipboardList,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const pricingCards = [
  {
    title: "Pré-contrôle Recacor",
    price: "29€",
    desc: "Vérification atelier avant passage au contrôle technique.",
  },
  {
    title: "Prise en charge CT",
    price: "49€",
    desc: "Organisation et convoyage vers le centre de contrôle technique.",
  },
  {
    title: "Pack complet",
    price: "69€",
    desc: "Pré-contrôle + prise en charge CT, hors frais du centre partenaire.",
  },
];

const correctiveItems = [
  "Pneus usés ou non conformes",
  "Plaquettes et points de freinage",
  "Parallélisme et tenue de route",
  "Vidange et entretien courant",
  "Petite mécanique selon diagnostic atelier",
];

const faqs = [
  {
    q: "Que comprend le pré-contrôle Recacor ?",
    a: "Le pré-contrôle Recacor consiste à vérifier les points les plus souvent bloquants avant le passage au contrôle technique : pneus, freinage, éclairage, tenue de route et entretien courant. Il ne remplace pas le contrôle technique réglementaire en centre agréé.",
  },
  {
    q: "Recacor peut-il réparer avant le contrôle technique ?",
    a: "Oui. Si un point bloque, l'atelier peut proposer un devis sur les prestations réellement faites au Crès : pneus, freinage, vidange, parallélisme et petite mécanique. Aucune réparation n'est faite sans validation du client.",
  },
  {
    q: "Le prix du contrôle technique est-il inclus ?",
    a: "Non. Les frais du centre de contrôle technique restent séparés. Dans le secteur du Crès et de Montpellier, le tarif d'un véhicule léger est souvent affiché autour de 77€ à 78€ selon le centre et le créneau.",
  },
  {
    q: "Que se passe-t-il si le véhicule n'est pas prêt ?",
    a: "Un appel est passé avant toute intervention. Vous recevez un devis, puis vous décidez de faire réparer ou non le véhicule avant le passage au contrôle technique.",
  },
  {
    q: "Faut-il prendre rendez-vous ?",
    a: "Il est préférable de prendre contact pour organiser la prise en charge, surtout si la date du contrôle technique est proche. Le garage peut ensuite confirmer le bon créneau selon la charge atelier.",
  },
];

const processSteps = [
  {
    title: "Pré-contrôle du véhicule",
    desc: "Recacor vérifie les points les plus souvent bloquants avant le passage au CT.",
    icon: ClipboardList,
  },
  {
    title: "Appel si un point bloque",
    desc: "Si un point empêche le passage, vous êtes rappelé avant toute réparation.",
    icon: CircleAlert,
  },
  {
    title: "Devis + réparation validée",
    desc: "Pneus, freinage, vidange ou parallélisme peuvent être corrigés au Crès après accord.",
    icon: Wrench,
  },
  {
    title: "Passage au CT et restitution",
    desc: "Le véhicule peut ensuite être présenté au centre partenaire puis restitué avec son compte-rendu.",
    icon: ShieldCheck,
  },
];

export function ControleTechniqueClient() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Services", url: "https://www.recacor.fr/mecanique" },
          {
            name: "Prise en charge contrôle technique",
            url: "https://www.recacor.fr/services/prise-en-charge-controle-technique",
          },
        ]}
      />
      <ServiceJsonLd
        name="Contrôle technique pris en charge Montpellier"
        description="Pré-contrôle, devis et prise en charge du contrôle technique au Crès près de Montpellier."
        price="29"
      />
      <FaqJsonLd items={faqs} id="controle-technique" />

      <section className="relative overflow-hidden pt-32 pb-20 text-white">
        <Image
          src="/illustrations/services/controle-technique-passage-hero-20260723.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,11,18,0.88)_0%,rgba(18,25,35,0.74)_52%,rgba(26,37,49,0.54)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,40,0.10),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(27,79,216,0.12),transparent_20%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
              <Badge className="mb-6 border-white/20 bg-white/10 text-white">
                <CarFront className="mr-1 h-3 w-3" /> Contrôle technique
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Contrôle technique pris en charge
                <br />
                <span className="text-purple-glow">au Crès près de Montpellier</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/75">
                Pré-contrôle, devis si un point bloque, réparations validées puis passage au
                contrôle technique avec un seul interlocuteur.
              </p>
              <div className="mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3">
                {["Pré-contrôle dès 29€", "Devis avant réparation", "Garage au Crès"].map(
                  (item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white"
                    >
                      <BadgeCheck className="h-4 w-4 shrink-0 text-purple-glow" />
                      {item}
                    </div>
                  ),
                )}
              </div>
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <PhoneLink
                  location="hero"
                  serviceType="mecanique"
                  className="flex-1 recacor-btn-primary whitespace-nowrap"
                  showIcon
                >
                  Appeler : {PHONE_DISPLAY}
                </PhoneLink>
                <DevisCtaLink
                  desktopHref="#devis"
                  mobileHref="/formulaire/controle-technique"
                  className="flex-1 recacor-btn-secondary"
                >
                  Demander une prise en charge <ArrowRight className="h-4 w-4" />
                </DevisCtaLink>
              </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Préparer le véhicule avant{" "}
                  <span className="text-gradient-purple">d&apos;aller au contrôle technique</span>
                </h2>
                <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Cette offre ne vend pas simplement un transport au centre de contrôle
                    technique. L&apos;intérêt est d&apos;identifier avant le passage les points
                    qui bloquent souvent, puis de proposer une solution claire au même endroit.
                  </p>
                  <p>
                    Au Crès, Recacor peut déjà traiter localement plusieurs causes de
                    blocage courantes avant CT : pneus, freinage, vidange, parallélisme
                    et petite mécanique selon diagnostic atelier.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[4px] border border-border bg-muted/30">
                <Image
                  src="/illustrations/services/controle-technique-hero-20260723.png"
                  alt="Client et technicien Recacor devant une voiture avant prise en charge du contrôle technique"
                  width={1400}
                  height={875}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">
                  Ce que le client comprend vite
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Un seul garage pour contrôler, corriger si besoin et faire avancer le dossier.
                </p>
              </div>
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">
                  Ce qui reste clair
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Pas de réparation sans accord, et frais du centre CT séparés du service Recacor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">
            Comment ça <span className="text-gradient-purple">fonctionne</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-[4px] border border-border bg-white p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid">
                  <step.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-4xl font-black tracking-tight">
                Ce que Recacor peut <span className="text-gradient-purple">corriger avant le CT</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                L&apos;intérêt de l&apos;offre est de pouvoir transformer un simple contrôle en
                prise en charge utile lorsque la voiture n&apos;est pas prête. Les prestations
                proposées ici restent limitées à ce que l&apos;atelier du Crès sait déjà traiter
                rapidement et proprement.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                <Link href="/services/vidange" className="text-purple-bright hover:underline">
                  Voir la page vidange
                </Link>
                <Link
                  href="/services/parallelisme-geometrie"
                  className="text-purple-bright hover:underline"
                >
                  Voir la page parallélisme
                </Link>
                <Link href="/pneus-voiture" className="text-purple-bright hover:underline">
                  Voir la page pneus voiture
                </Link>
              </div>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <ul className="space-y-4">
                {correctiveItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <Wrench className="mt-0.5 h-4 w-4 text-purple-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-[4px] border border-border bg-muted/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">
                  Important
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Si un point empêche le passage au contrôle technique, un appel est fait
                  avant toute réparation. Le devis est validé par le client avant intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">
            Tarifs et <span className="text-gradient-purple">transparence</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricingCards.map((card) => (
              <div key={card.title} className="rounded-[4px] border border-border bg-white p-8 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-purple-bright">
                  {card.title}
                </p>
                <p className="mt-4 text-4xl font-black tracking-tight">{card.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded-[4px] border border-border bg-white p-6 text-center text-sm text-muted-foreground">
            Les éventuelles réparations et les frais du centre de contrôle technique sont
            confirmés avant intervention. Dans le secteur du Crès / Montpellier, le prix
            d&apos;un contrôle technique VL est souvent affiché autour de 77€ à 78€ selon
            le centre et le créneau.
          </div>
        </div>
      </section>

      <section id="devis" className="bg-muted py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight">
              Demander une <span className="text-gradient-purple">prise en charge CT</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Formulaire dédié au contrôle technique pour qualifier la demande dès le
              premier contact : date limite, véhicule, besoin et éventuels points déjà connus.
            </p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 shadow-xl sm:p-8">
            <DevisControleTechniqueForm />
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">
            Questions <span className="text-gradient-purple">fréquentes</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group cursor-pointer rounded-[4px] border border-border bg-white p-5">
                <summary className="flex list-none items-center justify-between text-sm font-bold">
                  {faq.q}
                  <span className="ml-3 text-xl leading-none text-purple-bright transition-transform group-open:rotate-45">
                    +
                  </span>
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
