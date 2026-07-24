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
    title: "Contrôle technique VL",
    price: "87,22€",
    desc: "Pré-contrôle offert, passage au contrôle technique et retour du véhicule.",
  },
  {
    title: "Contrôle technique utilitaire",
    price: "97,02€",
    desc: "La même prise en charge avec pré-contrôle offert pour les utilitaires légers.",
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
    a: "Le garage regarde les points qui bloquent le plus souvent avant un contrôle technique : pneus, freinage, éclairage, tenue de route et entretien courant. Ce pré-contrôle ne remplace pas le contrôle technique réglementaire en centre agréé.",
  },
  {
    q: "Recacor peut-il réparer avant le contrôle technique ?",
    a: "Oui. Si un point bloque, l'atelier peut proposer un devis sur les prestations réellement faites au Crès : pneus, freinage, vidange, parallélisme et petite mécanique. Aucune réparation n'est faite sans validation du client.",
  },
  {
    q: "Le prix du contrôle technique est-il inclus ?",
    a: "Oui. Le pack comprend le pré-contrôle offert, l'organisation du passage au centre partenaire et la restitution du véhicule. Les réparations éventuelles restent toujours séparées et soumises à validation.",
  },
  {
    q: "Que se passe-t-il si le véhicule n'est pas prêt ?",
    a: "Le garage vous appelle avant toute intervention. Vous recevez un devis, puis vous décidez de faire réparer ou non le véhicule avant le passage au contrôle technique.",
  },
  {
    q: "Faut-il prendre rendez-vous ?",
    a: "Il est préférable de prendre contact pour organiser la prise en charge, surtout si la date du contrôle technique est proche. Le garage peut ensuite confirmer le bon créneau selon la charge atelier.",
  },
];

const processSteps = [
  {
    title: "Pré-contrôle du véhicule",
    desc: "Recacor vérifie gratuitement les points les plus souvent bloquants avant le passage au CT.",
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
        name="Pack contrôle technique Montpellier"
        description="Contrôle technique au Crès près de Montpellier : pré-contrôle offert, devis clair et prise en charge au garage Recacor."
        price="87.22"
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
        <div className="pointer-events-none absolute right-4 top-[248px] z-10 hidden lg:block xl:right-8 xl:top-[244px]">
          <div className="relative w-[280px] overflow-hidden rounded-[4px] border-[5px] border-[#4f96ff] bg-[#bcd6ff] px-4 py-3 text-slate-950 shadow-[0_24px_60px_rgba(0,0,0,0.30)] xl:w-[300px]">
            <div className="absolute inset-[10px] border border-white/45" />
            <div className="absolute inset-0 opacity-[0.14]">
              <div className="absolute left-4 top-3 text-[6.2rem] font-black leading-none text-[#2f7ff3] xl:text-[6.8rem]">CT</div>
            </div>
            <div className="relative">
              <div className="text-center text-[1.3rem] font-black tracking-tight xl:text-[1.45rem]">AB-482-CT</div>
              <div className="mt-2.5 flex items-end justify-center gap-2">
                <span className="mb-1 text-[0.82rem] font-black xl:text-[0.92rem]">01/08/2028</span>
                <ShieldCheck className="mb-1 h-5 w-5 text-emerald-700 xl:h-6 xl:w-6" />
                <div className="text-[1.95rem] font-black leading-none xl:text-[2.2rem]">CT</div>
                <span className="mb-1 rounded-[4px] bg-emerald-200 px-2 py-1 text-[0.62rem] font-black uppercase text-emerald-900 xl:text-[0.68rem]">
                  VALIDE
                </span>
              </div>
              <div className="mt-1 text-center text-[0.72rem] font-black uppercase tracking-[0.08em] xl:text-[0.8rem]">
                Éviter la contre-visite
              </div>

              <div className="mt-3.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[0.67rem] font-bold leading-tight xl:text-[0.74rem]">
                <span>N° agrément :</span>
                <span>Le Crès 34920</span>
                <span>N° de série :</span>
                <span>VF1RECACORCT</span>
                <span>Pré-contrôle :</span>
                <span>Gratuit</span>
                <span>Service :</span>
                <span>Pack VL ou utilitaire</span>
                <span>Passage CT :</span>
                <span>Coordonné par Recacor</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl xl:max-w-4xl">
              <Badge className="mb-6 border-white/20 bg-white/10 text-white">
                <CarFront className="mr-1 h-3 w-3" /> Contrôle technique
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Contrôle technique
                <br />
                <span className="text-purple-glow">au Crès près de Montpellier</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/75">
                Contrôle, devis et prise en charge au garage du Crès avant le passage au contrôle technique.
              </p>
              <div className="mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3">
                {["Pré-contrôle gratuit", "VL dès 87,22€", "Utilitaire dès 97,02€"].map(
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
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
                <PhoneLink
                  location="hero"
                  serviceType="mecanique"
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[4px] bg-yellow-400 px-5 text-center text-sm font-black uppercase text-slate-950 shadow-[0_10px_30px_rgba(255,201,40,0.24)] transition hover:bg-yellow-300 whitespace-nowrap"
                  showIcon
                >
                  Appeler : {PHONE_DISPLAY}
                </PhoneLink>
                <DevisCtaLink
                  desktopHref="#devis"
                  mobileHref="/formulaire/controle-technique"
                  className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[4px] border border-slate-200 bg-white px-5 text-center text-sm font-black uppercase text-slate-950 shadow-[0_10px_30px_rgba(7,27,51,0.22)] transition hover:bg-slate-100 whitespace-nowrap"
                >
                  <span className="text-slate-950">Obtenir mon pack CT</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-950" />
                </DevisCtaLink>
              </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Contrôle technique{" "}
                  <span className="text-gradient-purple">avec atelier sur place</span>
                </h2>
                <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Au Crès, Recacor peut regarder le véhicule avant le contrôle technique et
                    repérer les points qui bloquent le plus souvent le passage.
                  </p>
                  <p>
                    Si un problème est repéré, le garage peut faire un devis et traiter sur place
                    les interventions courantes sur VL et utilitaires : pneus, freinage, vidange,
                    parallélisme et petite mécanique selon diagnostic atelier.
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
                  Le véhicule est contrôlé au garage, puis le passage au CT est organisé si tout est prêt.
                </p>
              </div>
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">
                  Ce qui reste clair
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Le pré-contrôle est offert, mais rien n&apos;est réparé sans votre accord.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">
            Tarifs <span className="text-gradient-purple">contrôle technique</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
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
            Le pré-contrôle est inclus dans le pack. Si une réparation est nécessaire avant le
            passage au contrôle technique, un devis est transmis pour validation avant toute
            intervention.
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
                Ce que le garage peut <span className="text-gradient-purple">faire avant le CT</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Si le véhicule n&apos;est pas prêt, le garage peut vous orienter tout de suite sur
                les points à corriger. Les interventions proposées ici correspondent à ce que
                l&apos;atelier du Crès traite déjà au quotidien.
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
                  Si un point empêche le passage au contrôle technique, le garage vous appelle et
                  transmet un devis avant toute intervention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="bg-muted py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight">
              Demander une <span className="text-gradient-purple">prise en charge</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Préciser le véhicule, la date limite du contrôle technique et les éventuels points
              déjà connus avant rappel du garage.
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
