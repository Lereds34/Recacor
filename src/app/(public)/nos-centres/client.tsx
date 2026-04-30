"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Clock, Phone, ArrowRight, Truck, Car, Wrench,
  CheckCircle, Shield, Star, Users, Gauge, Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import { BgParticles } from "@/components/bg-particles";
import { ParallaxImage } from "@/components/parallax-image";
import { Counter } from "@/components/counter";
import { AvisSection } from "@/components/avis-section";

const centres = [
  {
    name: "Le Crès",
    city: "34 — Hérault",
    address: "1240 Route de Nîmes, 34920 Le Crès",
    phone: "04 99 53 33 90",
    hours: "Lun-Ven : 8h–17h | Sam : 8h–12h",
    specialities: ["Pneus VL", "Poids Lourd", "Agricole & Industriel"],
    emoji: "",
    image: "/Design sans titre (29)/2.webp",
    description:
      "Pneus toutes marques, mécanique légère, recreusage PL et assistance sur site en Hérault. Sans rendez-vous pour les particuliers.",
    equipments: ["Géométrie laser 3D", "Équilibreuse HD", "Recreuseuse industrielle"],
    team: 5,
  },
];

const stats = [
  { value: 1, suffix: "", label: "Centre en France", icon: MapPin },
  { value: 60, suffix: "+", label: "Années d'expertise", icon: Star },
  { value: 10, suffix: "+", label: "Marques partenaires", icon: Shield },
  { value: 15, suffix: "min", label: "Montage pneu VL", icon: Gauge },
];

const whyUs = [
  {
    icon: Shield,
    title: "Techniciens certifiés",
    desc: "Chaque technicien est formé et certifié par les constructeurs. Formation continue garantie.",
  },
  {
    icon: Wrench,
    title: "Équipements de pointe",
    desc: "Machines dernière génération : géométrie 3D, équilibreuse HD, recreuseuse industrielle.",
  },
  {
    icon: Truck,
    title: "Atelier mobile",
    desc: "Nos camions-ateliers interviennent directement sur votre site, 24h/24 et 7j/7.",
  },
  {
    icon: Globe,
    title: "Réseau en expansion",
    desc: "De nouveaux centres en projet pour couvrir tout le territoire national et au-delà.",
  },
];

const services = [
  { icon: Truck, label: "Flottes PL", desc: "Maintenance préventive et curative" },
  { icon: Car, label: "Particuliers", desc: "Avec ou sans rendez-vous" },
  { icon: Wrench, label: "Dépannage", desc: "Intervention 24h/24, 7j/7" },
];

export function NosCentresClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">Notre réseau</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl"
          >
            Garage Recacor{" "}
            <span className="text-purple-glow">Le Crès</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl text-lg"
          >
            Pneus VL, PL, agricoles et industriels à Montpellier — Le Crès.
            Sans rendez-vous, stock immédiat, expertise depuis 1950.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {services.map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <s.icon className="h-5 w-5 text-purple-glow" />
                <div>
                  <p className="text-white text-sm font-bold">{s.label}</p>
                  <p className="text-white/40 text-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Image hero éditable */}
      {heroImage && (
        <section className="pt-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="w-full rounded-2xl overflow-hidden mb-8 aspect-[16/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt="Garage Recacor" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Stats bar */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <s.icon className="w-6 h-6 text-purple-glow mx-auto mb-3" />
                  <div className="text-3xl sm:text-4xl font-black text-white">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-white/50 text-sm mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Centres détaillés */}
      <section className="relative py-20 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Détail des centres
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
              Découvrez nos{" "}
              <span className="text-gradient-purple">implantations</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            {centres.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
              >
                <div className="group rounded-3xl border border-border bg-white overflow-hidden hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-400">
                  <div className={`grid grid-cols-1 lg:grid-cols-5 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    {/* Image */}
                    <div className={`lg:col-span-2 relative min-h-[250px] lg:min-h-0 overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                      <ParallaxImage
                        src={c.image}
                        alt={`Centre RECACOR ${c.name}`}
                        className="absolute inset-0 w-full h-full"
                        speed={0.08}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                      {/* Badge ville */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                          <MapPin className="h-5 w-5 text-purple-bright" />
                          <span className="font-black text-sm text-purple-deep">{c.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`lg:col-span-3 p-6 sm:p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black tracking-tight group-hover:text-purple-deep transition-colors">
                          Centre de {c.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          {c.city}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {c.description}
                      </p>

                      {/* Infos grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-purple-bright/[0.08] flex items-center justify-center shrink-0">
                            <MapPin className="h-4 w-4 text-purple-bright" />
                          </div>
                          <a
                            href="https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-purple-bright transition-colors"
                          >
                            {c.address}
                          </a>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-purple-bright/[0.08] flex items-center justify-center shrink-0">
                            <Phone className="h-4 w-4 text-purple-bright" />
                          </div>
                          <span className="text-muted-foreground">{c.phone}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-purple-bright/[0.08] flex items-center justify-center shrink-0">
                            <Clock className="h-4 w-4 text-purple-bright" />
                          </div>
                          <span className="text-muted-foreground">{c.hours}</span>
                        </div>
                      </div>

                      {/* Specialities + equipments */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div>
                          <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">Spécialités</p>
                          <div className="flex flex-wrap gap-1.5">
                            {c.specialities.map((s) => (
                              <span key={s} className="text-xs font-medium text-purple-bright bg-purple-bright/[0.06] px-2.5 py-1 rounded-full">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-2">Équipements</p>
                          <div className="space-y-1">
                            {c.equipments.map((e) => (
                              <div key={e} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3 text-purple-bright shrink-0" />
                                {e}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Team + CTAs */}
                      <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-purple-bright" />
                          <span><strong className="text-foreground">{c.team} techniciens</strong> certifiés</span>
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid transition-colors"
                          >
                            Prendre RDV <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`tel:${c.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:border-purple-bright/30 transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5" /> Appeler
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nos centres */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
              Nos engagements
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
              Pourquoi choisir{" "}
              <span className="text-gradient-purple">RECACOR</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-white p-7 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight mb-2 group-hover:text-purple-deep transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ rapide centres */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Questions sur nos centres
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Peut-on venir sans rendez-vous ?",
                a: "Oui, tous nos centres acceptent les clients sans rendez-vous pour les particuliers. Pour les flottes, nous recommandons de planifier l'intervention pour garantir la disponibilité des pneumatiques.",
              },
              {
                q: "Quels véhicules pouvez-vous prendre en charge ?",
                a: "Nous intervenons sur tous types : véhicules de tourisme, utilitaires légers, poids lourds, semi-remorques, engins agricoles, engins de chantier et véhicules spéciaux.",
              },
              {
                q: "Proposez-vous le dépannage sur site ?",
                a: "Oui, nos ateliers mobiles interviennent 24h/24 et 7j/7 sur votre site (dépôt, autoroute, chantier). Contactez notre centre le plus proche pour une intervention rapide.",
              },
              {
                q: "Comment sont formés vos techniciens ?",
                a: "Tous nos techniciens suivent des formations continues auprès des constructeurs (Michelin, Bridgestone, Continental). Ils sont certifiés et habilités pour intervenir sur tous types de pneumatiques.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="font-bold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AvisSection />

      {/* CTA bottom */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-3xl font-black text-white mb-2">
                Besoin d&apos;un devis ?
              </h2>
              <p className="text-white/50 max-w-md">
                Contactez le centre le plus proche pour un devis gratuit et
                personnalisé sous 24h.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="tel:0499533390"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm hover:bg-white/10 transition-all"
              >
                <Phone className="h-4 w-4" /> 04 99 53 33 90
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
