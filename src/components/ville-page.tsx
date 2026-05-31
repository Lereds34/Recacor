"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, MapPin, Clock, CheckCircle, Star, Car, Wrench, Timer } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import type { Ville } from "@/lib/villes";
import { findVilleSeo } from "@/data/villes-seo";

/* ── Bloc adresse réutilisable ── */
function AdresseBlock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm">
        <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
          <MapPin className="h-4 w-4 text-purple-bright" />
        </div>
        <span>1240 Route de Nîmes, 34920 Le Crès</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
          <Clock className="h-4 w-4 text-purple-bright" />
        </div>
        <span>Lun–Ven : 8h–17h · Sam : 8h–12h</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
          <Phone className="h-4 w-4 text-purple-bright" />
        </div>
        <PhoneLink location="page" className="font-semibold hover:text-purple-bright transition-colors">
          {PHONE_DISPLAY}
        </PhoneLink>
      </div>
    </div>
  );
}

/* ── Bloc devis ── */
function DevisBlock({ nom }: { nom: string }) {
  return (
    <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
      <BgParticles />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tight">
            Devis pneus <span className="text-gradient-purple">{nom}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Réponse sous 2h en jours ouvrés · Gratuit · Sans engagement</p>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
          <DevisVlForm />
        </div>
      </div>
    </section>
  );
}

/* ── Bloc FAQ ── */
function FaqBlock({ faqs, ville }: { faqs: { q: string; a: string }[]; ville: string }) {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-black tracking-tight mb-12">
          Questions fréquentes — <span className="text-gradient-purple">pneus {ville}</span>
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
  );
}

/* ─────────────────────────────────────────────────────────────────
   VARIANT 1 — SPLIT HERO
   Hero 2 colonnes (texte gauche + form visible droite sur desktop)
   Sections : avantages → marques → avis → FAQ → CTA final
   ───────────────────────────────────────────────────────────────── */
function Variant1({ ville, seo }: { ville: Ville; seo: ReturnType<typeof findVilleSeo> }) {
  const faqs = seo?.faqs ?? [];
  return (
    <>
      {/* Hero split */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <Badge className="bg-white/10 text-white border-white/20 mb-5">
                <MapPin className="h-3 w-3 mr-1" /> {ville.nom} · {ville.cp}
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Pneus {ville.nom}<br />
                <span className="text-purple-glow">À {ville.distance} — Le Crès</span>
              </h1>
              <p className="mt-4 text-white/70 text-lg max-w-lg">
                {seo?.hero_subtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <PhoneLink location="hero" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
                  {PHONE_DISPLAY}
                </PhoneLink>
                <DevisCtaLink className="items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
                  Devis gratuit <ArrowRight className="h-4 w-4" />
                </DevisCtaLink>
              </div>
            </motion.div>
            {/* Right — mini form visible dès le hero sur desktop */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="hidden lg:block">
              <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30">
                <p className="text-sm font-black text-purple-deep mb-4">Votre devis pneus en 2 min</p>
                <DevisVlForm />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Avantages */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-center mb-10">
            {seo?.angle_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Car, title: "Toutes marques", desc: "Michelin, Bridgestone, Continental, Goodyear, Pirelli, Hankook… et les grandes marques budget." },
              { icon: Timer, title: "15 min, sans RDV", desc: "Montage et équilibrage en 15 minutes. Venez directement sans rendez-vous, du lundi au samedi." },
              { icon: CheckCircle, title: "À partir de 45€", desc: "Le prix affiché inclut le pneu, le montage, l'équilibrage et les valves neuves. Aucun frais caché." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-white p-7">
                <div className="w-12 h-12 rounded-xl bg-purple-bright/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-bright" />
                </div>
                <h3 className="font-black text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-muted p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">{seo?.description}</p>
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="relative py-16 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black tracking-tight mb-8">Pneus <span className="text-gradient-purple">toutes marques</span> en stock à Le Crès</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Michelin", "Bridgestone", "Continental", "Goodyear", "Pirelli", "Hankook", "Dunlop", "Yokohama", "BFGoodrich", "Firestone"].map(m => (
              <span key={m} className="px-4 py-2 rounded-full border border-border bg-white text-sm font-semibold text-muted-foreground">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Devis mobile uniquement (desktop form is in hero) */}
      <div id="devis" className="scroll-mt-24 lg:hidden">
        <DevisBlock nom={ville.nom} />
      </div>
      <div className="hidden lg:block">
        <DevisBlock nom={ville.nom} />
      </div>

      <AvisSection />
      <FaqBlock faqs={faqs} ville={ville.nom} />

      {/* CTA final */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 text-center text-white">
            <h2 className="text-3xl font-black mb-3">Un pneu à changer sur {ville.nom} ?</h2>
            <p className="text-white/60 mb-6">Venez directement à Le Crès — {ville.distance} depuis {ville.nom}.</p>
            <PhoneLink location="cta" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-deep font-bold" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VARIANT 2 — PROCESS / ÉTAPES
   Hero compact → 4 étapes → tarifs → devis → avis → FAQ → map
   ───────────────────────────────────────────────────────────────── */
function Variant2({ ville, seo }: { ville: Ville; seo: ReturnType<typeof findVilleSeo> }) {
  const faqs = seo?.faqs ?? [];
  const etapes = [
    { num: "01", title: "Demandez votre devis", desc: "En ligne en 2 minutes ou par téléphone. Gratuit, sans engagement." },
    { num: "02", title: "On vérifie le stock", desc: "Votre dimension est en stock ou commandée sous 24–48h." },
    { num: "03", title: "Venez sans RDV", desc: "Arrivez directement à Le Crès, à {dist} de {ville}.".replace("{dist}", ville.distance).replace("{ville}", ville.nom) },
    { num: "04", title: "15 min et c'est prêt", desc: "Montage, équilibrage, valves neuves. Vous repartez sur des pneus neufs." },
  ];
  return (
    <>
      {/* Hero compact */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep to-purple-mid" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-5">
            <MapPin className="h-3 w-3 mr-1" /> {ville.nom} — {ville.distance} du garage
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Pneus {ville.nom}<br />
            <span className="text-purple-glow">Simple · Rapide · Sans RDV</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">{seo?.hero_subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* 4 étapes */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Changer ses pneus en <span className="text-gradient-purple">4 étapes simples</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {etapes.map((e, i) => (
              <motion.div key={e.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border border-border bg-white p-6">
                <span className="text-5xl font-black text-purple-bright/20 absolute top-4 right-5 leading-none">{e.num}</span>
                <h3 className="font-black text-lg mb-2 relative z-10">{e.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-10">
            Nos <span className="text-gradient-purple">tarifs pneus VL</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { type: "Été", price: "45€", desc: "Performance sec & mouillé. Dès 7°C." },
              { type: "Hiver", price: "59€", desc: "Grip sous 7°C et sur neige. Obligatoire montagne." },
              { type: "4 saisons", price: "65€", desc: "Idéal Sud de France. Un jeu toute l'année." },
            ].map((t) => (
              <div key={t.type} className="rounded-2xl border border-border bg-white p-6 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Pneu {t.type}</p>
                <p className="text-4xl font-black text-purple-bright mb-1">à partir de<br />{t.price}</p>
                <p className="text-xs text-muted-foreground mt-2">{t.desc}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Monté · Équilibré · Valves incluses</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">{seo?.angle_text}</p>
        </div>
      </section>

      <DevisBlock nom={ville.nom} />
      <AvisSection />

      {/* Info garage */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-6">
                Venir depuis <span className="text-gradient-purple">{ville.nom}</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{seo?.description}</p>
              <AdresseBlock />
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-8 text-white text-center">
              <p className="text-7xl font-black text-purple-glow">{ville.distance}</p>
              <p className="text-white/60 text-sm uppercase tracking-widest mt-2">depuis {ville.nom}</p>
              <div className="mt-6 flex justify-center gap-4 text-sm text-white/80">
                <span>★ 5,0</span>
                <span>·</span>
                <span>34 avis Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqBlock faqs={faqs} ville={ville.nom} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VARIANT 3 — STATS LED
   Hero avec grands chiffres → services horizontaux → devis → dimensions → avis → FAQ
   ───────────────────────────────────────────────────────────────── */
function Variant3({ ville, seo }: { ville: Ville; seo: ReturnType<typeof findVilleSeo> }) {
  const faqs = seo?.faqs ?? [];
  return (
    <>
      {/* Hero stats */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-deep to-purple-mid" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { val: "45€", label: "Pneu monté min." },
              { val: "15min", label: "Temps de montage" },
              { val: "★ 5,0", label: "Note Google" },
              { val: ville.distance, label: `de ${ville.nom}` },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-black text-white">{s.val}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            <MapPin className="h-3 w-3 mr-1" /> Pneus {ville.nom}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Pneus {ville.nom} — Recacor Le Crès<br />
            <span className="text-purple-glow">Prix, stock et rapidité</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{seo?.hero_subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-12 text-center">
            {seo?.angle_title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Car, title: "Pneus VL", desc: "Été, hiver, 4 saisons. Toutes marques en stock." },
              { icon: Wrench, title: "Montage inclus", desc: "Démontage, montage, équilibrage, valves neuves." },
              { icon: CheckCircle, title: "Parallélisme offert", desc: "Contrôle géométrie laser 3D offert avec chaque changement." },
              { icon: Timer, title: "Sans rendez-vous", desc: "Lun–Ven 8h–17h · Sam 8h–12h. Venez directement." },
            ].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl border-l-4 border-purple-bright bg-white p-5 shadow-sm">
                <s.icon className="w-5 h-5 text-purple-bright mb-3" />
                <h3 className="font-black text-base mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-deep/5 to-purple-bright/5 border border-purple-bright/10">
            <p className="text-sm text-muted-foreground leading-relaxed">{seo?.description}</p>
          </div>
        </div>
      </section>

      <DevisBlock nom={ville.nom} />

      {/* Dimensions */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-center mb-10">
            Dimensions <span className="text-gradient-purple">disponibles en stock</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["195/65 R15", "308, C4, Mégane"],
              ["205/55 R16", "Golf, Focus, 308"],
              ["185/65 R15", "Clio, 208, C3"],
              ["215/65 R16", "3008, C5 Aircross"],
              ["225/45 R17", "Berlines premium"],
              ["205/60 R16", "Qashqai, Kadjar"],
              ["235/35 R19", "Sportives, GT"],
              ["175/65 R14", "Twingo, Panda"],
            ].map(([dim, usage]) => (
              <div key={dim} className="rounded-xl border border-border bg-white p-4">
                <p className="text-sm font-black text-purple-bright">{dim}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{usage}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Dimension absente ?{" "}
            <a href="/formulaire" className="text-purple-bright font-semibold hover:underline">Demandez un devis →</a>
          </p>
        </div>
      </section>

      <AvisSection />
      <FaqBlock faqs={faqs} ville={ville.nom} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VARIANT 4 — SOCIAL PROOF FIRST
   Hero minimal → avis early → avantages liste → marques → devis → FAQ + CTA
   ───────────────────────────────────────────────────────────────── */
function Variant4({ ville, seo }: { ville: Ville; seo: ReturnType<typeof findVilleSeo> }) {
  const faqs = seo?.faqs ?? [];
  return (
    <>
      {/* Hero minimal */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-5">
            <Star className="h-3 w-3 mr-1 fill-white" /> 5,0 · 34 avis Google — Recacor Le Crès
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Pneus {ville.nom}<br />
            <span className="text-purple-glow">Le garage de confiance à {ville.distance}</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">{seo?.hero_subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Avis EARLY */}
      <AvisSection />

      {/* Avantages liste */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-6">
                {seo?.angle_title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{seo?.description}</p>
              <ul className="space-y-4">
                {[
                  "Pneus été, hiver et 4 saisons en stock",
                  "Toutes marques : premium à budget",
                  "Montage en 15 min, sans rendez-vous",
                  "Équilibrage et valves neuves inclus",
                  "Contrôle parallélisme laser offert",
                  "Prix discount : à partir de 45€ monté",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-purple-bright shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-black text-lg mb-4">Venir depuis {ville.nom}</h3>
                <AdresseBlock />
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-2xl font-black text-purple-bright">{ville.distance}</p>
                  <p className="text-xs text-muted-foreground">depuis {ville.nom}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-purple-deep to-purple-mid p-6 text-white">
                <p className="text-sm font-semibold text-white/70 mb-1">{seo?.angle_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marques */}
      <section className="relative py-16 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-center mb-8">
            Toutes marques disponibles
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {["Michelin", "Bridgestone", "Continental", "Goodyear", "Pirelli", "Hankook", "Dunlop", "Yokohama", "BFGoodrich", "Firestone"].map(m => (
              <div key={m} className="flex items-center justify-center rounded-xl border border-border bg-white py-3 text-sm font-semibold text-muted-foreground">{m}</div>
            ))}
          </div>
        </div>
      </section>

      <DevisBlock nom={ville.nom} />

      {/* FAQ + CTA intégré */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">
            Questions fréquentes — <span className="text-gradient-purple">pneus {ville.nom}</span>
          </h2>
          <div className="space-y-3 mb-12">
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
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-8 text-center text-white">
            <h3 className="text-2xl font-black mb-2">Prêt à changer vos pneus ?</h3>
            <p className="text-white/60 text-sm mb-6">Depuis {ville.nom} — {ville.distance} — sans rendez-vous</p>
            <PhoneLink location="cta" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-purple-deep font-bold" showIcon>
              {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROUTER — choisit le variant selon la ville
   ───────────────────────────────────────────────────────────────── */
export function VillePageClient({ ville }: { ville: Ville }) {
  const seo = findVilleSeo(ville.slug);
  const variant = seo?.variant ?? 1;
  const faqs = seo?.faqs ?? [];

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: `Pneus ${ville.nom}`, url: `https://recacor.fr/${ville.slug}` },
      ]} />
      <ServiceJsonLd
        name={`Pneus voiture ${ville.nom}`}
        description={`Changement de pneus à ${ville.nom} — Recacor Le Crès à ${ville.distance}. Sans RDV, à partir de 45€.`}
        price="45"
      />
      <FaqJsonLd items={faqs.length > 0 ? faqs : [{ q: `Où trouver un garage pneus près de ${ville.nom} ?`, a: `Recacor au Crès est à ${ville.distance} de ${ville.nom}, 1240 Route de Nîmes, 34920 Le Crès.` }]} id={`pneus-${ville.slug}`} />

      {variant === 1 && <Variant1 ville={ville} seo={seo} />}
      {variant === 2 && <Variant2 ville={ville} seo={seo} />}
      {variant === 3 && <Variant3 ville={ville} seo={seo} />}
      {variant === 4 && <Variant4 ville={ville} seo={seo} />}
    </>
  );
}
