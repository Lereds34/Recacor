"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Gauge, Wrench } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const faqs = [
  { q: "Quand faire régler son parallélisme ?", a: "Après un choc, un changement de pneus, tous les 20 000 km ou si vous constatez une usure anormale des pneus ou un volant de travers." },
  { q: "Combien coûte un parallélisme ?", a: "Nos tarifs démarrent à 65€ pour un parallélisme simple. La géométrie 4 roues complète est à 89€." },
  { q: "Combien de temps dure l'opération ?", a: "Le réglage prend environ 30 à 45 minutes avec notre équipement laser 3D." },
  { q: "Quelle différence entre parallélisme et géométrie ?", a: "Le parallélisme règle l'alignement des roues avant. La géométrie contrôle aussi les angles de carrossage et chasse sur les 4 roues." },
];

export function ParallelismeClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Parallélisme & Géométrie", url: "https://recacor.fr/services/parallelisme-geometrie" },
      ]} />
      <ServiceJsonLd name="Parallélisme Géométrie Montpellier" description="Parallélisme et géométrie voiture sans RDV" price="65" />
      <FaqJsonLd items={faqs} id="parallelisme" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6"><Target className="h-3 w-3 mr-1" /> Parallélisme</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Parallélisme Géométrie<br />
            <span className="text-purple-glow">Montpellier — Sans RDV</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Réglage précis avec équipement laser 3D. Résultat en 30 minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="/formulaire" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Un réglage <span className="text-gradient-purple">professionnel</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Équipement laser 3D", desc: "Précision millimétrique sur tous les angles" },
              { icon: Gauge, title: "Test dynamique", desc: "Vérification en conditions réelles" },
              { icon: Wrench, title: "Réglage complet", desc: "Parallélisme, carrossage, chasse" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Devis <span className="text-gradient-purple">parallélisme</span>
            </h2>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisMecaniqueForm defaultService="Contrôle parallélisme" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">FAQ</h2>
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
    </>
  );
}
