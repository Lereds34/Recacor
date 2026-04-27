"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, MapPin, Clock } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import type { Ville } from "@/lib/villes";

export function VillePageClient({ ville }: { ville: Ville }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: `Pneus ${ville.nom}`, url: `https://recacor.fr/${ville.slug}` },
      ]} />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <MapPin className="h-3 w-3 mr-1" /> {ville.nom} · {ville.cp}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Pneus {ville.nom}<br />
            <span className="text-purple-glow">Garage Recacor au Crès</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Pneus voiture à {ville.nom}, montage sans RDV chez Recacor au Crès
            (à {ville.distance}). Stock immédiat, prix discount.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <a href="#devis" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-6">
                Le garage pneus le plus proche de <span className="text-gradient-purple">{ville.nom}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{ville.description}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-purple-bright" />
                  </div>
                  <span>1240 Route de Nîmes, 34920 Le Crès</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-purple-bright" />
                  </div>
                  <span>Lun–Ven : 8h–17h · Sam : 8h–12h</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-bright/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-purple-bright" />
                  </div>
                  <PhoneLink location="page" className="font-semibold hover:text-purple-bright transition-colors">
                    {PHONE_DISPLAY}
                  </PhoneLink>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 text-white text-center">
              <MapPin className="w-16 h-16 text-purple-glow mx-auto mb-4" />
              <p className="text-5xl font-black mb-2">{ville.distance}</p>
              <p className="text-white/60 uppercase tracking-widest text-sm">depuis {ville.nom}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Devis pneus <span className="text-gradient-purple">{ville.nom}</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Réponse sous 2h en jours ouvrés</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisVlForm />
          </div>
        </div>
      </section>
    </>
  );
}
