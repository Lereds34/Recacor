"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Sun, Snowflake, Cloud, Car } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

const saisons = [
  {
    icon: Sun,
    title: "Pneus été",
    desc: "Performance et adhérence optimale dès 7°C. Freinage court sur sol sec et mouillé.",
    price: "À partir de 45€",
  },
  {
    icon: Snowflake,
    title: "Pneus hiver",
    desc: "Obligatoires dans les zones montagneuses. Adhérence garantie sous 7°C et sur neige.",
    price: "À partir de 59€",
  },
  {
    icon: Cloud,
    title: "Pneus 4 saisons",
    desc: "Le compromis idéal pour le climat du Sud. Un seul jeu toute l'année, pas de changement.",
    price: "À partir de 65€",
  },
];

const marques = [
  "Michelin", "Bridgestone", "Continental", "Goodyear", "Pirelli",
  "Hankook", "Dunlop", "Yokohama", "BFGoodrich", "Firestone",
];

const dimensions = [
  { dim: "195/65 R15", usage: "Peugeot 308, Citroën C4, Renault Mégane" },
  { dim: "205/55 R16", usage: "VW Golf, Ford Focus, Peugeot 308" },
  { dim: "185/65 R15", usage: "Renault Clio, Peugeot 208, Citroën C3" },
  { dim: "215/65 R16", usage: "SUV compacts, Peugeot 3008, Citroën C5" },
  { dim: "225/45 R17", usage: "Berlines premium, Renault Mégane RS" },
  { dim: "205/60 R16", usage: "Crossovers, Nissan Qashqai, Renault Kadjar" },
  { dim: "235/35 R19", usage: "Sportives, berlines GT" },
  { dim: "175/65 R14", usage: "Citadines, Renault Twingo, Fiat Panda" },
];

const faqs = [
  {
    q: "Faut-il prendre rendez-vous pour changer ses pneus ?",
    a: "Non, Recacor accepte les clients sans rendez-vous. Le montage prend environ 15 minutes par pneu.",
  },
  {
    q: "Quelles marques de pneus proposez-vous ?",
    a: "Nous proposons Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook, Dunlop, Yokohama, BFGoodrich et bien d'autres, pour tous les budgets.",
  },
  {
    q: "Combien coûte un pneu voiture chez Recacor ?",
    a: "Nos pneus VL démarrent à 45€ monté. Le prix varie selon la dimension, la marque et la saison. Demandez un devis gratuit.",
  },
  {
    q: "Pouvez-vous faire la géométrie après le changement de pneus ?",
    a: "Oui, nous disposons d'un atelier de parallélisme et géométrie sur place, avec équipement 3D.",
  },
  {
    q: "Quel est votre délai pour commander un pneu qui n'est pas en stock ?",
    a: "La plupart de nos pneus sont en stock. Si besoin d'une commande, nous les recevons en général sous 24-48h.",
  },
];

export function PneusVoitureClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pneus voiture", url: "https://www.recacor.fr/pneus-voiture" },
        ]}
      />
      <ServiceJsonLd
        name="Garage pneu Montpellier"
        description="Changement de pneus voiture à Montpellier — Le Crès. Toutes marques, montage et équilibrage en 15 minutes, sans rendez-vous."
        price="45"
      />
      <FaqJsonLd items={faqs} id="pneus-vl" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImage ? "from-purple-deep/85 via-purple-mid/80 to-purple-bright/75" : "from-purple-deep via-purple-mid to-purple-bright"}`} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6"><Car className="h-3 w-3 mr-1" /> Pneus voiture</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Pneus voiture à Montpellier<br />
            <span className="text-purple-glow">montés rapidement au Crès</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/70 max-w-xl text-lg"
          >
            Un garage pneu proche Montpellier pour changer un train usé, monter des pneus neufs
            ou trouver rapidement la bonne dimension, avec stock disponible et sans rendez-vous.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <PhoneLink
              location="hero"
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]"
              showIcon
            >
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Intro locale */}
      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Un garage pneu utile pour{" "}
              <span className="text-gradient-purple">Montpellier et l&apos;est montpelliérain</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Recacor accompagne surtout les automobilistes qui veulent une solution simple :
                remplacer des pneus usés, trouver une dimension disponible sans faire plusieurs
                garages, ou faire monter rapidement un train neuf avant de reprendre la route.
                Le site est au Crès, avec un accès pratique depuis Montpellier, Castelnau-le-Lez,
                Jacou, Vendargues et les communes voisines.
              </p>
              <p>
                L&apos;approche Recacor reste directe : vérifier la dimension, proposer la bonne
                gamme selon le budget et l&apos;usage, puis faire le montage et l&apos;équilibrage
                sur place. Si la voiture a aussi besoin d&apos;un contrôle de parallélisme ou
                d&apos;une prestation atelier, tout peut se faire dans le même passage, au même
                endroit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Changement de pneus rapide */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Changement de pneus{" "}
              <span className="text-gradient-purple">rapide à Montpellier</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Pneus été, hiver et 4 saisons, avec montage, équilibrage et conseils clairs selon
              le véhicule, le kilométrage et le budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {saisons.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl border border-border bg-white p-8 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-bright/10 text-purple-bright font-bold text-sm">
                  {s.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Recacor */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Changer ses pneus{" "}
              <span className="text-gradient-purple">sans perdre de temps</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-3xl mx-auto">
              Chez Recacor, l&apos;objectif est simple : vérifier rapidement la bonne dimension,
              annoncer clairement ce qui est disponible, puis faire le montage et l&apos;équilibrage
              sur place dans de bonnes conditions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Du stock sur les dimensions courantes",
                desc: "Le plus important est souvent de savoir rapidement si le pneu peut être monté aujourd'hui ou commandé sous 24 à 48h.",
              },
              {
                title: "Montage et équilibrage sur place",
                desc: "Une fois la bonne gamme choisie, tout se fait au même endroit avec une prise en charge simple et sans parcours compliqué.",
              },
              {
                title: "Accès pratique depuis l'est de Montpellier",
                desc: "Le garage du Crès est facile d'accès depuis Montpellier, Castelnau-le-Lez, Jacou, Vendargues et les communes voisines.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-white p-8">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Pneus{" "}
              <span className="text-gradient-purple">toutes marques et tous budgets</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {marques.map((m) => (
              <div key={m} className="flex items-center justify-center rounded-xl border border-border bg-white py-4 text-sm font-semibold text-muted-foreground">
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dimensions */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Dimensions{" "}
              <span className="text-gradient-purple">disponibles en stock</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Les dimensions les plus courantes sont en stock immédiat au Crès, proche Montpellier.
              Votre dimension absente ? Livraison sous 24-48h.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dimensions.map((d, i) => (
              <motion.div
                key={d.dim}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-white p-5 hover:border-purple-bright/30 hover:shadow-lg hover:shadow-purple-bright/[0.06] transition-all"
              >
                <p className="text-lg font-black text-purple-bright mb-1">{d.dim}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.usage}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Dimension non listée ?{" "}
              <DevisCtaLink desktopHref="#devis" className="text-purple-bright font-semibold hover:underline">
                Demandez un devis gratuit →
              </DevisCtaLink>
            </p>
          </div>
        </div>
      </section>

      {/* Montage et équilibrage */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-black mb-4">Montage pneus Montpellier sur place</h2>
              <ul className="space-y-2.5">
                {[
                  "Démontage et montage inclus",
                  "Équilibrage dynamique 4 roues",
                  "Valves neuves offertes",
                  "Recyclage des pneus usagés",
                  "15 minutes par pneu",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-purple-bright shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-border bg-white p-8">
              <h2 className="text-2xl font-black mb-4">Parallélisme et géométrie après changement</h2>
              <ul className="space-y-2.5">
                {[
                  "Équipement laser 3D dernière génération",
                  "Contrôle gratuit avec nouveaux pneus",
                  "Correction précise des angles",
                  "Meilleure tenue de route",
                  "Usure pneus uniforme",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-purple-bright shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/services/parallelisme-geometrie" className="text-purple-bright hover:underline">Contrôler le parallélisme</Link>
            <Link href="/services/vidange" className="text-purple-bright hover:underline">Vidange voiture</Link>
            <Link href="/services/climatisation-auto-montpellier" className="text-purple-bright hover:underline">Recharge clim</Link>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-muted/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Guides pneus proches</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
              <Link href="/blog/pneus-carnon" className="text-purple-bright hover:underline">Pneus Carnon</Link>
              <Link href="/blog/pneus-mireval" className="text-purple-bright hover:underline">Pneus Mireval</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Demandez votre{" "}
              <span className="text-gradient-purple">devis pneu Montpellier</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Réponse rapide en jours ouvrés pour vérifier une dimension, demander un prix ou
              préparer un passage atelier sans perdre de temps.
            </p>
          </motion.div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisVlForm />
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tight">
              Nous trouver –{" "}
              <span className="text-gradient-purple">Garage Recacor Le Crès</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              <a
                href="https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-bright transition-colors"
              >
                1240 Route de Nîmes, 34920 Le Crès
              </a>
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border aspect-[16/9] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6000!2d3.9!3d43.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLe+Cr%C3%A8s!5e0!3m2!1sfr!2sfr!4v1"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Recacor Le Crès"
            />
          </div>
        </div>
      </section>

      <AvisSection />

      {/* FAQ */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center text-4xl sm:text-5xl font-black tracking-tight mb-12">
            Questions fréquentes{" "}
            <span className="text-gradient-purple">sur les pneus VL</span>
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-2xl border border-border bg-white p-5 cursor-pointer"
              >
                <summary className="font-bold text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Un pneu à changer ?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Appelez-nous ou venez directement : on s&apos;occupe de tout en 15 minutes.
            </p>
            <PhoneLink location="cta" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-deep font-bold text-base hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow" showIcon>
              Appeler maintenant : {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}
