"use client";

import { createContext, useContext } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Truck,
  Car,
  MapPin,
  Phone,
  Clock,
  Star,
  ChevronDown,
  Globe,
  Shield,
  Award,
  Mail,
  Zap,
  Tag,
  Package,
  Wrench,
  Leaf,
  ClipboardList,
} from "lucide-react";
import {
  MotionDiv,
  MotionSection,
  fadeUp,
  fadeIn,
  staggerContainer,
} from "@/components/motion";
import { Counter } from "@/components/counter";
import { ParallaxImage } from "@/components/parallax-image";
import { BgParticles } from "@/components/bg-particles";
import { PhoneLink } from "@/components/phone-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { OpenStatus } from "@/components/open-status";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { AvisSection } from "@/components/avis-section";
import { DynamicImage, DynamicMedia, useAsset } from "@/components/dynamic-media";
import { HomeBlogPreviewClient } from "@/components/home-blog-preview-client";
import React, { useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────── HERO ─────────────────── */

const HERO_POSTER = "/Design sans titre (29)/1.webp";
const FAQ_POSTER = "/Design sans titre (29)/3.webp";

function HeroMedia() {
  const asset = useAsset("home_hero_video");
  const url = asset?.url || "/VIDEO/animation transition.mp4";
  const type = asset?.type || "video";
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (type === "image") return;
    const video = videoRef.current;
    if (!video) return;
    // Defer load until after first paint / idle to keep LCP fast.
    const start = () => {
      video.load();
      video.play().catch(() => {});
    };
    if ("requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(start);
    } else {
      setTimeout(start, 600);
    }
  }, [url, type]);

  if (type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt={asset?.alt || ""}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <video
      key={url}
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={HERO_POSTER}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={url} type="video/mp4" />
    </video>
  );
}

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/30"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.15, 0.4, 0.15],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function HeroSection() {
  const reassurances = [
    { Icon: Zap, text: "Sans rendez-vous" },
    { Icon: Tag, text: "À partir de 45€ montés" },
    { Icon: Package, text: "Stock disponible maintenant" },
    { Icon: Award, text: "60 ans d'expertise" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <HeroMedia />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/90 via-purple-mid/80 to-purple-bright/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/60 via-transparent to-purple-deep/30" />

      <FloatingParticle delay={0} x="10%" y="20%" size={4} />
      <FloatingParticle delay={1} x="25%" y="70%" size={6} />
      <FloatingParticle delay={0.5} x="70%" y="15%" size={3} />
      <FloatingParticle delay={2} x="85%" y="60%" size={5} />
      <FloatingParticle delay={1.5} x="50%" y="85%" size={4} />
      <FloatingParticle delay={0.8} x="15%" y="50%" size={3} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-16 sm:pb-20 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <OpenStatus />
          </motion.div>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Pneus dès{" "}
            <span className="text-purple-glow">45€ montés</span>
            <br />
            à{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Montpellier</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-2 left-0 right-0 h-3 sm:h-4 bg-purple-light/40 -rotate-1 origin-left"
              />
            </span>
          </h1>

          {/* CTA doubles — remontés avant les badges pour mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl"
          >
            <PhoneLink
              location="hero"
              className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold text-base hover:bg-purple-mid shadow-[0_8px_30px_rgba(109,40,217,0.5)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.7)] transition-all"
              showIcon
            >
              Appeler maintenant
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-purple-deep font-bold text-base hover:bg-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all">
              Devis gratuit
              <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </motion.div>

          {/* Preuve sociale */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 flex items-center gap-3 text-white/60 text-sm"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-purple-glow text-purple-glow" />
              ))}
            </div>
            <span><strong className="text-white">5,0</strong> · Avis Google</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            Stock immédiat · Sans rendez-vous · Devis gratuit
          </motion.p>

          {/* 4 icônes réassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl"
          >
            {reassurances.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <r.Icon className="h-5 w-5 text-purple-glow shrink-0" strokeWidth={1.75} />
                <span className="text-xs sm:text-sm font-semibold text-white">{r.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── DEVIS VL ─────────────────── */
function DevisVlSection() {
  return (
    <section id="devis" className="relative py-24 bg-background overflow-hidden scroll-mt-24">
      <BgParticles />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Devis en 2 minutes
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Vos pneus montés{" "}
              <span className="text-gradient-purple">rapidement au Crès</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Remplissez ce formulaire en 2 minutes, nous vous rappelons avec un devis
              personnalisé. Seuls le téléphone et l&apos;email sont obligatoires.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { Icon: Zap, label: "Réponse sous 2h", desc: "En jours ouvrés" },
                { Icon: Tag, label: "Devis gratuit", desc: "Sans engagement" },
                { Icon: Phone, label: "Ou appelez directement", desc: "Lun–Ven 8h–17h · Sam 8h–12h" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
                    <item.Icon className="w-5 h-5 text-purple-bright" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}

              <PhoneLink
                location="cta"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-deep to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 transition-shadow"
                showIcon
              >
                Appeler directement
              </PhoneLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl shadow-purple-bright/[0.04]">
              <DevisVlForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── TRAJECTOIRE ─────────────────── */
function TrajectoireSection() {
  const milestones = [
    {
      year: "1950",
      title: "La fondation",
      text: "Création de Recacor à Córdoba (Espagne). Atelier artisanal de recreusage de pneumatiques, un savoir-faire rare transmis de génération en génération.",
      Icon: Wrench,
    },
    {
      year: "Développement",
      title: "60+ ateliers en Espagne",
      text: "Croissance progressive avec plus de 60 ateliers en Espagne et 400+ professionnels. Expansion vers l'Europe et l'Afrique du Nord, expertise reconnue sur le pneu lourd.",
      Icon: Globe,
    },
    {
      year: "2017",
      title: "Recacor France",
      text: "Création de Recacor France pour porter le savoir-faire espagnol sur le territoire français : pneumatiques VL, PL, agricoles et industriels.",
      Icon: Truck,
    },
    {
      year: "Aujourd'hui",
      title: "Implantation Le Crès",
      text: "Garage Recacor à Montpellier — Le Crès. VL, PL, agricole et industriel : tout l'écosystème Recacor au service du Sud de la France.",
      Icon: MapPin,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-bright/[0.03] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Notre histoire
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Depuis 1950,<br />
              <span className="text-gradient-purple">une trajectoire unique</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              De l&apos;atelier familial au réseau national, chaque étape a
              forgé notre expertise et renforcé notre engagement envers nos clients.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-border" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-purple-bright via-purple-light to-purple-bright origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: "easeOut" as const }}
                className="group relative"
              >
                {/* Dot on timeline */}
                <div className="relative flex items-center gap-4 lg:flex-col lg:items-start mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.15, type: "spring", stiffness: 300 }}
                    className="relative z-10 flex items-center justify-center w-[104px] h-[104px] shrink-0"
                  >
                    {/* Outer ring animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-bright/20 group-hover:border-purple-bright/40 transition-colors duration-500" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, transparent 80%, rgba(109,40,217,0.3) 100%)",
                      }}
                    />
                    {/* Inner circle */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-bright to-purple-mid flex flex-col items-center justify-center shadow-lg shadow-purple-bright/20 group-hover:shadow-purple-bright/40 transition-shadow duration-500">
                      <m.Icon className="w-5 h-5 text-white mb-0.5" strokeWidth={1.75} />
                      <span className="text-xs font-bold text-white/90">{m.year}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content card */}
                <div className="relative rounded-2xl border border-border bg-white p-6 h-full group-hover:border-purple-bright/30 group-hover:shadow-xl group-hover:shadow-purple-bright/[0.06] transition-all duration-500">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-bright/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-purple-bright bg-purple-bright/10 px-2.5 py-1 rounded-full tracking-wide">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold mb-2 group-hover:text-purple-deep transition-colors font-[family-name:var(--font-heading)] tracking-tight">
                      {m.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed tracking-wide">
                      {m.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 flex justify-center relative z-10"
        >
          <Link
            href="/nos-centres"
            className="group inline-flex items-center gap-3 text-purple-bright hover:text-purple-mid text-sm font-semibold transition-colors"
          >
            Découvrir tous nos centres
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── SERVICES ─────────────────── */
function ServicesSection() {
  const services = [
    {
      title: "Particuliers & auto",
      description:
        "Pneus voiture toutes marques à Montpellier — Le Crès. Montage en 15 minutes, sans rendez-vous, à partir de 45€.",
      icon: Car,
      href: "/pneus-voiture",
      features: ["Sans rendez-vous", "À partir de 45€", "Devis gratuit"],
    },
    {
      title: "Professionnels & artisans",
      description:
        "Solutions adaptées aux véhicules utilitaires légers et flottes de professionnels. Contrats sur-mesure et tarifs préférentiels.",
      icon: Shield,
      href: "/pneus-utilitaires-pl",
      features: ["Contrats sur-mesure", "Tarifs pro", "Multi-marques"],
    },
    {
      title: "Flottes industrielles & transport",
      description:
        "Maintenance préventive et curative des pneumatiques pour vos flottes poids lourds et utilitaires. Intervention sur site, gestion de parc et suivi personnalisé.",
      icon: Truck,
      href: "/pneus-utilitaires-pl",
      features: ["Intervention 24h/24", "Gestion de parc", "Suivi digital"],
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-muted">
      <BgParticles />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Title + cards */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
                Nos expertises
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                Des solutions pour{" "}
                <span className="text-gradient-purple">chaque besoin</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg max-w-md">
                Que vous soyez transporteur, artisan ou particulier, RECACOR a
                la solution pneumatique qu&apos;il vous faut.
              </p>
            </motion.div>

            {/* Service cards stacked */}
            <div className="space-y-4">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" as const }}
                >
                  <Link href={s.href} className="group block">
                    <div className="relative rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-400 overflow-hidden">
                      {/* Hover gradient bar left */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-bright/0 group-hover:bg-gradient-to-b group-hover:from-purple-bright group-hover:to-purple-light transition-all duration-300" />

                      <div className="flex gap-5">
                        {/* Icon */}
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <s.icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-base font-bold tracking-tight group-hover:text-purple-deep transition-colors">
                              {s.title}
                            </h3>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-bright group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                            {s.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {s.features.map((f) => (
                              <span
                                key={f}
                                className="text-xs font-medium text-purple-bright/80 bg-purple-bright/[0.06] px-2.5 py-1 rounded-full"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block sticky top-32"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <ParallaxImage
                assetKey="home_services_image"
                src="/Design sans titre (29)/1.webp"
                alt="RECACOR - Pneumatiques"
                className="absolute inset-0 w-full h-full"
                speed={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/50 via-transparent to-transparent" />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-black text-lg text-purple-deep">Depuis 1950</p>
                  <p className="text-xs text-muted-foreground">d&apos;expertise pneumatique</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


/* ─────────────────── PROFESSIONNALISME + STATS ─────────────────── */
function ProfessionnalismeSection() {
  const stats = [
    { value: 4, suffix: "", label: "Sites en France" },
    { value: 8, suffix: "+", label: "Marques partenaires" },
    { value: 60, suffix: "+", label: "Années d'expérience" },
    { value: 15, suffix: "min", label: "Montage garanti" },
  ];

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <MotionDiv variants={fadeUp}>
            <Badge className="bg-purple-bright/10 text-purple-light border-purple-bright/20 mb-6">
              Notre engagement
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Professionnalisme{" "}
              <span className="text-gradient-purple">et qualité</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Chez RECACOR, nous mettons un point d&apos;honneur à offrir un
              service de qualité supérieure. Nos techniciens certifiés utilisent
              les dernières technologies pour garantir votre sécurité.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chaque intervention est réalisée selon des protocoles stricts,
              avec des équipements de pointe et des pièces de qualité.
            </p>
          </MotionDiv>

          <MotionDiv variants={fadeUp} custom={2}>
            <div className="relative rounded-2xl overflow-hidden min-h-[320px]">
              <ParallaxImage
                assetKey="home_pro_image"
                src="/Design sans titre (29)/2.webp"
                alt="RECACOR - Pneumatiques Hankook iON"
                className="absolute inset-0 w-full h-full rounded-2xl"
                speed={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/60 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-bright" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Certifié & Agréé</p>
                  <p className="text-white/60 text-xs">Normes européennes</p>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Stats bar */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <MotionDiv key={stat.label} variants={fadeUp} custom={i}>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

/* ─────────────────── NOS CENTRES ─────────────────── */
function CentresSection() {
  const centres = [
    {
      name: "Bordeaux",
      city: "33 — Gironde",
      address: "Zone industrielle, 33000 Bordeaux",
      phone: "05 XX XX XX XX",
      hours: "Lun-Ven : 8h-18h",
      speciality: "Flottes & PL",
      emoji: "🍷",
    },
    {
      name: "Béziers",
      city: "34 — Hérault",
      address: "Zone d'activité, 34500 Béziers",
      phone: "04 XX XX XX XX",
      hours: "Lun-Ven : 8h-18h",
      speciality: "Tous véhicules",
      emoji: "☀️",
    },
    {
      name: "Montpellier",
      city: "34 — Hérault",
      address: "Parc d'activité, 34000 Montpellier",
      phone: "04 XX XX XX XX",
      hours: "Lun-Ven : 8h-18h",
      speciality: "Particuliers & Pro",
      emoji: "🏛️",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-muted">
      <BgParticles />
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-bright/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - intro (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Nos implantations
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Un réseau de{" "}
              <span className="text-gradient-purple">proximité</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Stratégiquement implantés dans le Sud de la France, nos centres
              vous garantissent réactivité et disponibilité.
            </p>

            {/* Image + overlay stat */}
            <div className="mt-8 relative rounded-2xl overflow-hidden h-48">
              <ParallaxImage
                assetKey="home_centres_image"
                src="/Design sans titre (29)/3.webp"
                alt="RECACOR - Pile de pneumatiques"
                className="absolute inset-0 w-full h-full"
                speed={0.08}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/80 to-purple-mid/60" />
              <div className="absolute inset-0 flex items-center p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl">3 centres</p>
                    <p className="text-white/60 text-sm">dans le Sud de la France</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/nos-centres"
              className="mt-6 inline-flex items-center gap-2 text-purple-bright hover:text-purple-mid text-sm font-semibold transition-colors group"
            >
              Voir tous les centres
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right - cards (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {centres.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" as const }}
                className="group"
              >
                <div className="relative rounded-2xl border border-border bg-white p-5 sm:p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-400 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-gradient-to-b group-hover:from-purple-bright group-hover:to-purple-light transition-all duration-300" />

                  <div className="flex items-start gap-5">
                    {/* Emoji badge */}
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright/10 to-purple-light/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {c.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-black tracking-tight group-hover:text-purple-deep transition-colors">
                          {c.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {c.city}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-purple-bright" />
                          {c.address}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-purple-bright" />
                          {c.phone}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-purple-bright" />
                          {c.hours}
                        </span>
                      </div>

                      <div className="mt-3">
                        <span className="text-xs font-medium text-purple-bright bg-purple-bright/[0.06] px-2.5 py-1 rounded-full">
                          {c.speciality}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-purple-bright group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── MARQUES DE CONFIANCE ─────────────────── */
const brandLogos = [
  { name: "Michelin", url: "/LOGO_MARQUE/Michelin_G_S_Fr_WhiteBG_RGB_0618-01.webp" },
  { name: "Bridgestone", url: "/LOGO_MARQUE/Bridgestone-logo-730x300-2018_0_1.webp" },
  { name: "Continental", url: "/LOGO_MARQUE/continental.webp" },
  { name: "Goodyear", url: "/LOGO_MARQUE/Logo-goodyear.webp" },
  { name: "Pirelli", url: "/LOGO_MARQUE/Logo-Pirelli.webp" },
  { name: "Hankook", url: "/LOGO_MARQUE/Hankook_logo.webp" },
  { name: "Dunlop", url: "/LOGO_MARQUE/dunlop1HEADER.webp" },
  { name: "Firestone", url: "/LOGO_MARQUE/firestone1517239246_0.webp" },
  { name: "Yokohama", url: "/LOGO_MARQUE/yokohama-logo.webp" },
  { name: "BFGoodrich", url: "/LOGO_MARQUE/bfgoodrich-logo.webp" },
];

function InfiniteMarquee({ items, direction = "left", speed = 30 }: { items: typeof brandLogos; direction?: "left" | "right"; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex items-center justify-center h-20 w-44 shrink-0 rounded-xl border border-border bg-white px-6 hover:border-purple-bright/30 hover:shadow-lg hover:shadow-purple-bright/[0.04] transition-all duration-300 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.url}
              alt={brand.name}
              width={120}
              height={32}
              className="h-8 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MarquesSection() {
  return (
    <section className="py-28 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
            Partenaires
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
            Marques de{" "}
            <span className="text-gradient-purple">confiance</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Nous travaillons avec les plus grandes marques mondiales pour vous
            garantir qualité et performance.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="space-y-6">
        <InfiniteMarquee items={brandLogos} direction="left" speed={35} />
        <InfiniteMarquee items={[...brandLogos].reverse()} direction="right" speed={40} />
      </div>
    </section>
  );
}

/* AvisSection extrait dans @/components/avis-section */

/* ─────────────────── PRESENCE INTERNATIONALE ─────────────────── */
/* ─────────────────── PRESENCE - France Map ─────────────────── */
const mapCities = [
  { name: "Bordeaux", x: "30%", y: "65%", size: "lg" as const },
  { name: "Béziers", x: "37%", y: "72%", size: "lg" as const },
  { name: "Montpellier", x: "39%", y: "69%", size: "lg" as const },
];

function PulsingDot({ delay, size }: { delay: number; size: "lg" | "sm" }) {
  const isLg = size === "lg";
  return (
    <div className="relative">
      {isLg && (
        <motion.div
          animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-purple-bright"
        />
      )}
      <div
        className={cn(
          "relative rounded-full",
          isLg
            ? "w-4 h-4 bg-purple-bright shadow-lg shadow-purple-bright/40"
            : "w-2 h-2 bg-purple-light/40"
        )}
      />
    </div>
  );
}

function PresenceSection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-bright/[0.03] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <DynamicImage
                assetKey="home_europe_map"
                fallback="/carte/europe-map-CBh8PVWh.webp"
                alt="Carte de présence RECACOR en Europe"
                className="w-full h-auto"
              />

            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Notre couverture
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Une présence{" "}
              <span className="text-gradient-purple">européenne</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Implantés stratégiquement dans le Sud de la France, nous étendons
              notre réseau à travers l&apos;Europe pour être toujours plus proches de nos clients.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, label: "3 centres actifs", desc: "Bordeaux, Béziers, Montpellier" },
                { icon: Globe, label: "Expansion européenne", desc: "Objectif 10 centres d'ici 2027" },
                { icon: Truck, label: "Intervention mobile", desc: "Dépannage sur tout le grand Sud" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:border-purple-bright/20 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-purple-bright/[0.08] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-purple-bright" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CONTACT CTA ─────────────────── */
function ContactSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        {/* Animated mesh */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.04]"
          style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="text-purple-glow font-semibold text-sm tracking-wider uppercase">
              Contact
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Parlons de{" "}
              <span className="text-purple-glow">vos besoins</span>
            </h2>
            <p className="mt-4 text-white/50 text-lg leading-relaxed">
              Devis gratuit sous 24h. Notre équipe est à votre écoute pour
              trouver la solution adaptée.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: Phone, label: "Téléphone", value: "05 XX XX XX XX", desc: "Lun-Ven, 8h-18h" },
                { icon: Mail, label: "Email", value: "contact@recacor.fr", desc: "Réponse sous 24h" },
                { icon: MapPin, label: "Siège", value: "Sud de la France", desc: "3 centres à votre service" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                    <item.icon className="w-5 h-5 text-purple-glow" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{item.value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6">
              {["Devis gratuit", "Réponse 24h", "Sans engagement"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-white/50 text-xs font-medium">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-purple-deep/30">
              <h3 className="text-xl font-black text-purple-deep mb-1">
                Demandez votre devis
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                Remplissez le formulaire, nous vous recontactons rapidement.
              </p>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Nom</label>
                    <Input placeholder="Votre nom" className="h-11" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Prénom</label>
                    <Input placeholder="Votre prénom" className="h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Email</label>
                    <Input type="email" placeholder="votre@email.fr" className="h-11" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Téléphone</label>
                    <Input type="tel" placeholder="06 XX XX XX XX" className="h-11" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Type de demande</label>
                  <div className="flex flex-wrap gap-2">
                    {["Devis flotte", "Devis particulier", "Dépannage", "Autre"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        className="px-4 py-2 rounded-full text-xs font-medium border border-border bg-muted text-foreground/70 hover:border-purple-bright/30 hover:text-purple-bright transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre besoin..."
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>
                <Button className="w-full h-12 bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold rounded-xl text-base hover:shadow-lg hover:shadow-purple-bright/25 transition-shadow">
                  Envoyer ma demande
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */
const faqCategories = [
  {
    label: "Pneus voiture",
    Icon: Car,
    items: [
      {
        q: "Quel est le prix d'un pneu monté à Montpellier ?",
        a: "À partir de 45€ le pneu monté et équilibré, toutes marques confondues. Le prix varie selon la dimension et la marque choisie. Nous proposons des marques premium (Michelin, Goodyear, Continental) et des alternatives qualité/prix (Nexen, Tracmax, Firestone). Devis gratuit en 2 minutes.",
      },
      {
        q: "Avez-vous les pneus en stock immédiat ?",
        a: "Oui. Notre stock couvre les dimensions les plus courantes du parc automobile montpelliérain : 195/65 R15, 205/55 R16, 185/65 R15, 225/45 R17 et bien d'autres. Montage en 15 minutes sans rendez-vous. Si votre dimension n'est pas disponible, nous pouvons la commander rapidement.",
      },
      {
        q: "Faut-il prendre rendez-vous pour changer ses pneus ?",
        a: "Non, vous pouvez vous présenter directement au garage sans rendez-vous du lundi au vendredi de 8h à 17h et le samedi de 8h à 12h. Pour les passages en groupe ou les changements de 4 pneus, un appel en amont est conseillé pour confirmer la disponibilité.",
      },
    ],
  },
  {
    label: "Parallélisme & vidange",
    Icon: Wrench,
    items: [
      {
        q: "Combien coûte un parallélisme à Montpellier ?",
        a: "Le réglage du parallélisme est à partir de 65€. Le contrôle du parallélisme est offert — nous vérifions votre géométrie gratuitement et vous conseillons avant d'intervenir. Un parallélisme mal réglé peut user vos pneus 3 fois plus vite et augmenter votre consommation de carburant.",
      },
      {
        q: "Combien coûte une vidange au Crès ?",
        a: "La vidange est à partir de 79€ main-d'œuvre + huile selon le véhicule. Nous effectuons également le contrôle des niveaux, des filtres et l'inspection visuelle des pneus inclus. Sans rendez-vous en semaine.",
      },
      {
        q: "Quelles marques de pneus proposez-vous ?",
        a: "Michelin, Goodyear, Continental, Dunlop, Falken, Bridgestone, Pirelli, Nexen, Tracmax, Firestone, Superia, Yokohama et bien d'autres. Toutes dimensions VL disponibles. Notre équipe vous conseille la marque adaptée à votre usage et votre budget.",
      },
    ],
  },
  {
    label: "Pratique",
    Icon: ClipboardList,
    items: [
      {
        q: "Où se trouve le garage Recacor ?",
        a: "1240 Route de Nîmes (RN 113), 34920 Le Crès — à 5 minutes de Montpellier centre, sortie Montpellier Est depuis l'A9. Grand parking sur place. Nous desservons Montpellier, Mauguio, Castelnau-le-Lez, Jacou, Lattes et toute l'agglomération.",
      },
      {
        q: "Quels sont vos horaires d'ouverture ?",
        a: "Lundi au vendredi : 8h–17h. Samedi : 8h–12h. Fermé le dimanche. Pour les urgences professionnelles (PL, flottes), contactez-nous directement par téléphone.",
      },
      {
        q: "Proposez-vous des facilités de paiement ?",
        a: "Oui, nous proposons le paiement en plusieurs fois pour les particuliers. Les professionnels et gestionnaires de flottes bénéficient de conditions de paiement sur-mesure avec facturation mensuelle. Contactez-nous pour en discuter.",
      },
    ],
  },
];

function FAQSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState(0);

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative py-32 bg-muted overflow-hidden">
      <BgParticles />
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-bright/[0.03] rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - intro (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Questions fréquentes
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              On répond à{" "}
              <span className="text-gradient-purple">vos questions</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Tout ce que vous devez savoir sur nos services, nos interventions
              et la gestion de vos pneumatiques.
            </p>

            {/* Category tabs */}
            <div className="mt-8 flex flex-col gap-2">
              {faqCategories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3.5 rounded-xl text-left transition-all duration-300 group",
                    activeTab === i
                      ? "bg-gradient-to-r from-purple-bright to-purple-mid text-white shadow-lg shadow-purple-bright/20"
                      : "bg-white border border-border hover:border-purple-bright/30 text-foreground"
                  )}
                >
                  <cat.Icon className="h-5 w-5" strokeWidth={1.75} />
                  <div>
                    <span className="font-bold text-sm">{cat.label}</span>
                    <span
                      className={cn(
                        "block text-xs mt-0.5",
                        activeTab === i ? "text-white/60" : "text-muted-foreground"
                      )}
                    >
                      {cat.items.length} questions
                    </span>
                  </div>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 ml-auto transition-transform",
                      activeTab === i
                        ? "text-white/60 translate-x-0"
                        : "text-muted-foreground/30 -translate-x-1 group-hover:translate-x-0"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-8 p-5 rounded-2xl border border-border bg-white">
              <p className="text-sm font-bold mb-1">Vous ne trouvez pas votre réponse ?</p>
              <p className="text-xs text-muted-foreground mb-3">
                Notre équipe est disponible pour vous aider.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-bright text-white text-xs font-semibold hover:bg-purple-mid transition-colors"
              >
                Nous contacter
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>

          {/* Right - accordion (3 cols) */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {faqCategories[activeTab].items.map((faq, i) => {
                const key = `${activeTab}-${i}`;
                const isOpen = !!openItems[key];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <button
                      onClick={() => toggle(key)}
                      className={cn(
                        "w-full text-left rounded-2xl border bg-white p-6 transition-all duration-300",
                        isOpen
                          ? "border-purple-bright/30 shadow-lg shadow-purple-bright/[0.06]"
                          : "border-border hover:border-purple-bright/20"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors duration-300",
                              isOpen
                                ? "bg-purple-bright text-white"
                                : "bg-purple-bright/[0.06] text-purple-bright"
                            )}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <span className="font-bold text-[15px] leading-snug pt-1">
                            {faq.q}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-colors",
                              isOpen ? "text-purple-bright" : "text-muted-foreground/40"
                            )}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 ml-12 text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl overflow-hidden border border-border shadow-xl shadow-purple-bright/[0.04]"
        >
          <DynamicMedia
            assetKey="home_faq_video"
            fallback="/Vidéo_d_une_roue_sur_camion.mp4"
            poster={FAQ_POSTER}
            alt="Atelier Recacor"
            autoPlay
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── ZONE D'INTERVENTION ─────────────────── */
function ZoneInterventionSection() {
  return (
    <section className="relative py-24 bg-muted overflow-hidden">
      <BgParticles />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">Où nous trouver</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
            Zone{" "}
            <span className="text-gradient-purple">d&apos;intervention</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloc 1 : Garage Le Crès */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-border bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] bg-muted relative">
              <iframe
                src="https://maps.google.com/maps?q=Recacor+1240+Route+de+Nimes+34920+Le+Cres&output=embed&z=17"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Garage Recacor Le Crès"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-bright/10 text-purple-bright text-xs font-bold uppercase tracking-wider w-fit mb-3">
                <MapPin className="h-3.5 w-3.5" /> Notre garage
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-3">Garage Le Crès</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-purple-bright shrink-0 mt-0.5" />
                  <span>1240 Route de Nîmes, 34920 Le Crès</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-purple-bright shrink-0" />
                  <span>Lun–Ven : 8h–17h · Sam : 8h–12h</span>
                </div>
              </div>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-purple-bright text-white font-bold text-sm hover:bg-purple-mid transition-colors"
                >
                  <MapPin className="h-4 w-4" /> Itinéraire
                </a>
                <PhoneLink location="cta" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-semibold hover:border-purple-bright/30 transition-colors" showIcon>
                  Appeler
                </PhoneLink>
              </div>
            </div>
          </motion.div>

          {/* Bloc 2 : Assistance PL */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="rounded-3xl bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright text-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] relative flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 50%)" }} />
              <div className="relative text-center">
                <Truck className="w-20 h-20 text-purple-glow mx-auto mb-4" strokeWidth={1.25} />
                <p className="text-5xl font-black">Hérault</p>
                <p className="text-white/50 uppercase tracking-widest text-sm mt-2">Zone couverte (34)</p>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider w-fit mb-3">
                <Truck className="h-3.5 w-3.5 text-purple-glow" /> Professionnels
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-3">Assistance PL Hérault</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Nos ateliers mobiles interviennent directement sur votre site, dépôt ou sur autoroute
                pour les crevaisons et remplacements de pneumatiques poids lourd. Uniquement pneus.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pneus-utilitaires-pl#assistance"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-lg transition-shadow"
                >
                  Devis pro <ArrowRight className="h-4 w-4" />
                </Link>
                <PhoneLink location="cta" serviceType="pl" className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors" showIcon>
                  Appeler
                </PhoneLink>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PARTICULIERS VS PROS ─────────────────── */
function ParticuliersProsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">Pour qui</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
            Particuliers ou{" "}
            <span className="text-gradient-purple">professionnels</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Un service sur-mesure selon votre profil.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Particuliers */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group rounded-3xl border border-border bg-white p-8 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Car className="w-7 h-7 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">Particuliers</h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Pneus toutes marques et mécanique légère à Montpellier — Le Crès. Sans rendez-vous.
            </p>
            <ul className="space-y-2 mb-6">
              {["Pneus été, hiver, 4 saisons", "Vidange, parallélisme, freinage", "Montage en 15 minutes"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-purple-bright shrink-0" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between gap-4 pt-5 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">À partir de</p>
                <p className="text-2xl font-black text-purple-bright">45€<span className="text-xs font-medium text-muted-foreground ml-1">monté</span></p>
              </div>
              <DevisCtaLink className="items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-bold hover:bg-purple-mid transition-colors">
                Devis VL <ArrowRight className="h-4 w-4" />
              </DevisCtaLink>
            </div>
          </motion.div>

          {/* Pros */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="group rounded-3xl bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright text-white p-8 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7 text-purple-glow" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-2">Professionnels</h3>
              <p className="text-sm text-white/60 mb-5 leading-relaxed">
                PL, agricole, industriel, recreusage : des solutions pour optimiser le coût au kilomètre.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Pneus PL, agricoles, industriels",
                  "Recreusage haute qualité",
                  "Assistance sur site en Hérault",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <Shield className="h-4 w-4 text-purple-glow shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/10">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Rappel sous</p>
                  <p className="text-2xl font-black text-purple-glow">2h<span className="text-xs font-medium text-white/40 ml-1">jours ouvrés</span></p>
                </div>
                <Link href="/pneus-utilitaires-pl#devis" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-purple-deep text-sm font-bold hover:shadow-lg transition-shadow">
                  Devis PL <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SEO MAILLAGE INTERNE ─────────────────── */
function VillesSeoSection() {
  const villes = [
    { name: "Montpellier", href: "/montpellier" },
    { name: "Le Crès", href: "/le-cres" },
    { name: "Saint-Jean-de-Védas", href: "/saint-jean-de-vedas" },
    { name: "Juvignac", href: "/juvignac" },
    { name: "Mauguio", href: "/mauguio" },
    { name: "Lattes", href: "/lattes" },
    { name: "Castelnau-le-Lez", href: "/castelnau-le-lez" },
    { name: "Jacou", href: "/jacou" },
    { name: "Villeneuve-lès-Maguelone", href: "/villeneuve-les-maguelone" },
    { name: "Frontignan", href: "/frontignan" },
    { name: "Gigean", href: "/gigean" },
    { name: "Lunel", href: "/lunel" },
    { name: "Pézenas", href: "/pezenas" },
    { name: "Sète", href: "/sete" },
    { name: "Nîmes", href: "/nimes" },
    { name: "Béziers", href: "/beziers" },
  ];

  const dimensions = [
    "195/65 R15", "205/55 R16", "185/65 R15", "195/55 R16",
    "225/45 R17", "215/55 R17", "205/60 R16", "185/60 R15",
    "225/55 R18", "215/50 R17", "215/55 R18", "185/55 R15",
  ];

  const marques = [
    "Michelin", "Goodyear", "Dunlop", "Continental", "Falken",
    "Nexen", "Tracmax", "Firestone", "Superia", "Yokohama", "Bridgestone", "Pirelli",
  ];

  const servicesMeca = [
    { label: "Parallélisme voiture", href: "/services/parallelisme-geometrie" },
    { label: "Géométrie voiture", href: "/services/parallelisme-geometrie" },
    { label: "Parallélisme Montpellier", href: "/services/parallelisme-geometrie" },
    { label: "Montage & équilibrage", href: "/pneus-voiture" },
    { label: "Vidange voiture", href: "/mecanique" },
    { label: "Pneus été", href: "/pneus-voiture" },
    { label: "Pneus hiver", href: "/pneus-voiture" },
    { label: "Pneus 4 saisons", href: "/pneus-voiture" },
    { label: "Pneus SUV", href: "/pneus-voiture" },
    { label: "Pneus 4x4", href: "/pneus-voiture" },
    { label: "Pneus citadine", href: "/pneus-voiture" },
  ];

  return (
    <section className="py-14 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
              Pneus voiture autour de Montpellier
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {villes.map((v) => (
                <li key={v.name}>
                  <Link href={v.href} className="text-sm text-foreground/55 hover:text-purple-bright transition-colors">
                    Pneus {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
              Dimensions les plus courantes
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {dimensions.map((d) => (
                <li key={d}>
                  <Link href="/pneus-voiture" className="text-sm text-foreground/55 hover:text-purple-bright transition-colors">
                    Pneu {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
              Marques pneus voiture
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {marques.map((m) => (
                <li key={m}>
                  <Link href="/pneus-voiture" className="text-sm text-foreground/55 hover:text-purple-bright transition-colors">
                    Pneus {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
              Services garage Le Crès
            </h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {servicesMeca.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-foreground/55 hover:text-purple-bright transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */
const ALL_FAQ_ITEMS = faqCategories.flatMap((cat) => cat.items);

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd items={ALL_FAQ_ITEMS} id="home" />
      <HeroSection />
      <DevisVlSection />
      <ServicesSection />
      <ParticuliersProsSection />
      <ProfessionnalismeSection />
      <MarquesSection />
      <AvisSection />
      <TrajectoireSection />
      <ZoneInterventionSection />
      <FAQSection />
      <HomeBlogPreviewClient />
      <VillesSeoSection />
    </>
  );
}
