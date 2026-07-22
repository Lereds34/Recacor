"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, MapPin, Shield, Truck, Wrench } from "lucide-react";
import { AvisSection } from "@/components/avis-section";
import { BgParticles } from "@/components/bg-particles";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { PhoneLink } from "@/components/phone-link";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const zonesActivites = [
  "Transport / remorque",
  "Corridor Centre",
  "Nord-Est",
  "Loiret (45)",
  "TP / BTP",
  "Recreusage",
];

const segments = [
  {
    Icon: Truck,
    title: "Transport, logistique et remorque",
    items: [
      "Demandes orientées tracteurs, porteurs, remorques et flottes régionales",
      "Dimensions souvent demandées : 315/80 R22.5, 385/65 R22.5, 13R22.5",
      "Objectif : limiter l'immobilisation et garder un coût d'usage lisible",
    ],
  },
  {
    Icon: Wrench,
    title: "TP, BTP et usage mixte",
    items: [
      "Bennes, chantiers et usages route / chantier selon la zone",
      "Lecture selon charge réelle, rythme d'exploitation et budget",
      "Arbitrage entre résistance, disponibilité et coût kilométrique",
    ],
  },
  {
    Icon: Shield,
    title: "Parcs multi-sites et demandes urgentes",
    items: [
      "Qualification rapide par dimension, quantité, poste et secteur",
      "Orientation vers l'atelier, un relais ou une solution de dépannage selon le besoin",
      "Un seul interlocuteur commercial du devis à la prise en charge",
    ],
  },
];

const pointsZone = [
  "Loiret (45) : bassin prioritaire transport / remorque",
  "Centre : 18, 23, 36, 45, 58, 86, 87",
  "Nord-Est : 21, 25, 39, 52, 54, 55, 57, 67, 68, 70, 71, 88, 89, 90",
  "Orientation selon la disponibilité réelle et le niveau d'urgence",
];

const faqs = [
  {
    q: "Qui suit cette zone commerciale PL ?",
    a: "Christophe suit la zone Nord-Est + Centre. La demande est qualifiée par secteur, dimension, quantité et niveau d'urgence avant d'orienter vers la bonne réponse terrain.",
  },
  {
    q: "Quels besoins reviennent le plus sur cette zone ?",
    a: "Le transport et la remorque dominent, avec des demandes fréquentes en 315/80 R22.5, 385/65 R22.5 et 13R22.5. Des besoins TP / BTP et parcs mixtes existent aussi selon les départements.",
  },
  {
    q: "Pourquoi le Loiret est-il traité à part ?",
    a: "Le 45 est retenu comme bassin transporteur prioritaire. C'est une zone à lire d'abord en logique transport / remorque, pas comme un simple bloc géographique parmi d'autres.",
  },
  {
    q: "Que faut-il donner pour être rappelé vite ?",
    a: "La dimension complète, la quantité, le poste concerné, le département et le niveau d'urgence. C'est ce qui permet de répondre sans perdre un aller-retour commercial.",
  },
  {
    q: "Le recreusage fait-il partie de la discussion sur cette zone ?",
    a: "Oui, quand la carcasse s'y prête et que le parc est suivi correctement. Le bon raisonnement reste le coût kilométrique global, pas seulement le prix immédiat du pneu neuf.",
  },
];

export function PlZoneNordEstCentreClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Pneus PL", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
        { name: "Zone Nord-Est & Centre", url: "https://www.recacor.fr/pneus-utilitaires-pl/zone-nord-est-centre" },
      ]} />
      <ServiceJsonLd
        name="Pneus poids lourd zone Nord-Est et Centre"
        description="Page zone commerciale Recacor pour les besoins pneus poids lourd orientés transport, remorque, TP et parc multi-sites sur le Nord-Est et le Centre."
      />
      <FaqJsonLd items={faqs} id="pl-zone-nord-est-centre" />

      <section className="relative overflow-hidden pt-32 pb-20">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImage ? "from-purple-deep/90 via-purple-mid/85 to-purple-bright/75" : "from-purple-deep via-purple-mid to-purple-bright"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="mb-6 border-white/20 bg-white/10 text-white">
            <MapPin className="mr-1 h-3 w-3" /> Zone suivie par Christophe
          </Badge>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pneus poids lourd pour la{" "}
            <span className="text-purple-glow">zone Nord-Est &amp; Centre</span><br />
            en transport, remorque et parc multi-sites
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">
            Cette zone couvre un ensemble hétérogène, avec un point d&apos;attention particulier sur le transport
            et la remorque autour du Loiret. La bonne lecture n&apos;est pas “une zone PL large”, mais une réponse
            qualifiée selon le secteur, la dimension demandée et le niveau d&apos;urgence.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {zonesActivites.map((item) => (
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

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Une lecture zone par{" "}
              <span className="text-gradient-purple">usage réel, pas par discours large</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sur cette zone, les besoins les plus propres remontent surtout côté transport et remorque.
                C&apos;est particulièrement vrai autour du Loiret, qui doit être lu comme un vrai bassin logistique,
                pas comme un département “moyen” dans un bloc plus grand.
              </p>
              <p>
                Le travail commercial consiste donc d&apos;abord à qualifier: dimension, quantité, poste, secteur,
                urgence, et seulement ensuite à orienter la réponse. C&apos;est ce qui évite de noyer la demande
                dans une promesse PL trop large.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Repères zone</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pointsZone.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
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

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Une zone large, mais une{" "}
                <span className="text-gradient-purple">qualification serrée</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Le bon fonctionnement de cette zone repose moins sur une promesse “France entière”
                que sur une lecture propre des bassins utiles, des dimensions demandées et des urgences réelles.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Dimension complète du pneu",
                  "Quantité à chiffrer",
                  "Poste concerné (avant, moteur, remorque)",
                  "Département et niveau d'urgence",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-purple-bright" />
                    <p className="text-sm font-semibold text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Liens utiles</p>
              <div className="mt-5 space-y-4 text-sm font-semibold">
                <Link href="/pneus-utilitaires-pl" className="block text-purple-bright hover:underline">
                  Revenir au hub pneus PL
                </Link>
                <Link href="/services/recreusage" className="block text-purple-bright hover:underline">
                  Voir le service recreusage
                </Link>
                <Link href="/blog/pneus-nimes" className="block text-purple-bright hover:underline">
                  Lire l&apos;article pneus poids lourd Nîmes
                </Link>
                <Link href="/blog/pneus-sete" className="block text-purple-bright hover:underline">
                  Lire l&apos;article pneus poids lourd Sète
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative overflow-hidden bg-background py-24 scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Demande de devis{" "}
              <span className="text-gradient-purple">Nord-Est &amp; Centre</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Donnez la dimension, la quantité, le secteur et l&apos;urgence. C&apos;est la base pour obtenir
              une réponse utile et un rappel rapide.
            </p>
          </div>
          <DevisPlForm />
        </div>
      </section>

      <AvisSection />
    </>
  );
}
