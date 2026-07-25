"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Car, CheckCircle, Gauge, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PhoneLink } from "@/components/phone-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { AvisSection } from "@/components/avis-section";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import { listPublishedVehicleBrandPages, type VehicleBrandPageData } from "@/data/vehicle-brand-pages";

export function VehicleBrandPageClient({ page }: { page: VehicleBrandPageData }) {
  const siblingPages = listPublishedVehicleBrandPages().filter((candidate) => candidate.slug !== page.slug);
  const heroOverlayClass = page.heroOverlayTone === "strong" ? "hero-overlay-image-strong" : "hero-overlay-image";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pneus voiture", url: "https://www.recacor.fr/pneus-voiture" },
          { name: `Pneus ${page.brand}`, url: `https://www.recacor.fr/pneus-voiture/${page.slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`Pneus ${page.brand} Montpellier`}
        description={page.description}
        price="45"
      />
      <FaqJsonLd items={page.faqs} id={`pneus-${page.slug}`} />

      <section className="relative overflow-hidden pt-32 pb-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={page.heroImage}
          alt={page.heroAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={page.heroImagePosition ? { objectPosition: page.heroImagePosition } : undefined}
        />
        <div className={`absolute inset-0 ${heroOverlayClass}`} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 border-white/20 bg-white/10 text-white">
              <Car className="mr-1 h-3 w-3" /> Marque vehicule
            </Badge>
          </motion.div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {page.heroTitle}
          </motion.h1>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-lg text-white/72"
          >
            {page.heroSubtitle}
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <PhoneLink location="hero" className="flex-1 recacor-btn-primary whitespace-nowrap" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 recacor-btn-secondary">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </motion.div>
          {page.heroHighlights.length > 0 && (
            <div className="mt-8 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3">
              {page.heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[4px] border border-white/12 bg-white/8 p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-[2px]"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/58">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/88">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              <span className="text-gradient-purple">{page.introHeading}</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              <span className="text-gradient-purple">{page.modelsHeading}</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Les modeles affiches ici correspondent aux versions les plus courantes prises en charge au garage.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {page.models.map((model, index) => (
              <motion.div
                key={model}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[4px] border border-border bg-white p-4 text-center"
              >
                <p className="text-sm font-black uppercase tracking-wide text-purple-bright">{model}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Dimensions {page.brand}{" "}
              <span className="text-gradient-purple">courantes</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.dimensions.map((dimension, index) => (
              <motion.div
                key={dimension.size}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[4px] border border-border bg-white p-5"
              >
                <p className="text-lg font-black text-purple-bright">{dimension.size}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{dimension.fits}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {page.technicalSection && (
        <section className="bg-background py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[4px] border border-border bg-white p-8 shadow-sm sm:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">
                Controle atelier utile
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {page.technicalSection.heading}
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                {page.technicalSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {page.technicalSection.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-bright" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
                <Link href="/services/parallelisme-geometrie" className="text-purple-bright hover:underline">
                  Voir le service parallellisme
                </Link>
                <Link href="#devis" className="text-purple-bright hover:underline">
                  Demander un devis pneus
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-background py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              icon: Gauge,
              title: `${page.brand} au garage`,
              items: page.strengths,
            },
            {
              icon: Wrench,
              title: "Controles utiles a l'atelier",
              items: page.workshopChecks,
            },
            {
              icon: CheckCircle,
              title: "Marques de pneus disponibles",
              items: page.tireBrands,
            },
          ].map((block) => (
            <div key={block.title} className="rounded-[4px] border border-border bg-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid text-white">
                <block.icon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black">{block.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[4px] border border-border bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Services lies</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Services utiles dans le meme passage</h2>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                {page.serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-purple-bright hover:underline">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Autour du garage</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Villes proches du garage du Cres</h2>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                {page.cityLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-purple-bright hover:underline">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Autres marques traitees</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Autres pages pneus voiture utiles</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Recacor prend aussi en charge d&apos;autres marques courantes au garage. Cette selection permet de voir
                rapidement les modeles suivis, les dimensions frequentes et les controles atelier utiles selon le vehicule.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                {siblingPages.map((brandPage) => (
                  <Link key={brandPage.slug} href={`/pneus-voiture/${brandPage.slug}`} className="text-purple-bright hover:underline">
                    Pneus {brandPage.brand}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative overflow-hidden bg-muted py-24 scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Demander un{" "}
              <span className="text-gradient-purple">devis pneus {page.brand}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Reponse rapide en jours ouvres pour confirmer une dimension, demander un prix ou preparer un passage atelier au Cres.
            </p>
          </motion.div>
          <div className="rounded-[4px] border border-border bg-white p-6 shadow-xl sm:p-8">
            <DevisVlForm />
          </div>
        </div>
      </section>

      <AvisSection />

      <section className="relative overflow-hidden bg-muted py-24">
        <BgParticles />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center text-4xl font-black tracking-tight sm:text-5xl">
            Questions frequentes{" "}
            <span className="text-gradient-purple">{page.brand}</span>
          </motion.h2>
          <div className="space-y-3">
            {page.faqs.map((faq, index) => (
              <motion.details
                key={faq.q}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer rounded-[4px] border border-border bg-white p-5"
              >
                <summary className="flex list-none items-center justify-between font-bold text-sm">
                  {faq.q}
                  <span className="ml-3 text-xl leading-none text-purple-bright transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
