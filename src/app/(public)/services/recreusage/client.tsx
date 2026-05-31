"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Euro, TrendingUp, CheckCircle, RefreshCw } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { PHONE_DISPLAY } from "@/lib/tracking";

const avantages = [
  { icon: Euro, title: "-40% vs pneus neufs", desc: "Économies substantielles sur votre budget pneus" },
  { icon: TrendingUp, title: "+25% de durée de vie", desc: "Prolongation significative de l'usage" },
  { icon: Leaf, title: "Écologique", desc: "Réduction de l'empreinte carbone de votre flotte" },
];

const faqs = [
  { q: "Qu'est-ce que le recreusage ?", a: "Le recreusage consiste à redonner de la profondeur aux sculptures d'un pneu usé, prolongeant sa durée de vie de 20 à 30%." },
  { q: "Tous les pneus peuvent-ils être recreusés ?", a: "Non, seuls les pneus conçus pour cette opération (marqués 'REGROOVABLE') peuvent être recreusés. Nous vérifions chaque pneu avant intervention." },
  { q: "Le recreusage est-il sûr ?", a: "Oui, réalisé par un professionnel sur un pneu adapté, le recreusage respecte toutes les normes de sécurité." },
  { q: "Combien coûte un recreusage ?", a: "Le tarif varie selon la dimension du pneu et le type d'engin. Demandez un devis personnalisé." },
];

export function RecreusageClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Recreusage", url: "https://recacor.fr/services/recreusage" },
      ]} />
      <ServiceJsonLd name="Recreusage pneus poids lourd" description="Recreusage haute qualité pour pneus PL en Hérault" />
      <FaqJsonLd items={faqs} id="recreusage" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6"><RefreshCw className="h-3 w-3 mr-1" /> Recreusage</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Recreusage{" "}
            <span className="text-purple-glow">Haute Qualité</span><br />
            Pneus poids lourd en Hérault
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Des pneus haute qualité conçus pour durer plus longtemps, à moindre coût et avec moins d&apos;impact environnemental.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis B2B <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Les 3 avantages du <span className="text-gradient-purple">recreusage Recacor</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avantages.map((a) => (
              <div key={a.title} className="rounded-3xl border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <a.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 text-white">
            <h3 className="text-2xl font-black mb-4">Pourquoi recreuser ses pneus ?</h3>
            <ul className="space-y-2.5">
              {[
                "Solution économique pour les flottes poids lourd",
                "Démarche écologique (moins de pneus mis au rebut)",
                "Qualité équivalente à un pneu neuf après traitement",
                "Kilométrage supplémentaire significatif",
                "Adapté aux pneus longue distance",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-glow shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Devis recreusage <span className="text-gradient-purple">B2B</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Un expert vous rappelle sous 2h en jours ouvrés</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisPlForm />
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
