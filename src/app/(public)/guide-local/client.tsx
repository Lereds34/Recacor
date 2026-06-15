"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink, Star, Truck } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";

const partenaires = [
  {
    slug: "traiteur-montpellier",
    nom: "Traiteur Montpellier",
    categorie: "Traiteur événementiel",
    description:
      "Spécialiste de la restauration événementielle à Montpellier et en Hérault, Traiteur Montpellier accompagne mariages, séminaires d'entreprise et cocktails professionnels avec des produits locaux. C'est notre partenaire de confiance pour la gestion de leur flotte de véhicules : Recacor assure l'entretien des pneus et la mécanique de leurs camions frigorifiques et véhicules de livraison.",
    lienPartenariat:
      "Nous gérons la flotte de véhicules utilitaires de Traiteur Montpellier : pneus, vidange et contrôles réguliers pour que chaque prestation arrive à l'heure et en toutes conditions.",
    site: "https://www.traiteurmontpellier.com/",
    logo: "https://www.traiteurmontpellier.com/logotype_horizontal2.svg",
    localisation: "Montpellier, Hérault (34)",
    note: 5,
    badge: "Partenaire flotte",
  },
];

export function GuideLocalClient() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="relative py-20 bg-indigo-950 overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm font-bold tracking-widest uppercase text-indigo-300 mb-4">
            Recacor Le Crès
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Guide local <span className="text-gradient-purple">Montpellier</span>
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed">
            Les adresses et partenaires que nous recommandons en Hérault — des professionnels
            de confiance avec lesquels nous travaillons au quotidien.
          </p>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tight">Nos partenaires locaux</h2>
            <p className="mt-3 text-muted-foreground">
              Ces professionnels font confiance à Recacor pour l&apos;entretien de leurs véhicules.
              Nous les recommandons sans réserve.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {partenaires.map((p) => (
              <article
                key={p.slug}
                className="rounded-3xl border border-border bg-white overflow-hidden shadow-sm"
              >
                <div className="p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-20 relative bg-gray-50 rounded-2xl border border-border flex items-center justify-center p-4">
                        <Image
                          src={p.logo}
                          alt={`Logo ${p.nom}`}
                          fill
                          className="object-contain p-3"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                          {p.categorie}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full">
                          <Truck className="w-3 h-3" />
                          {p.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight mb-2">{p.nom}</h3>

                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        {p.localisation}
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {p.description}
                      </p>

                      {/* Bloc partenariat */}
                      <div className="rounded-2xl bg-indigo-50 border border-indigo-100 px-5 py-4 mb-5">
                        <p className="text-sm font-bold text-indigo-800 mb-1">Notre partenariat</p>
                        <p className="text-sm text-indigo-700 leading-relaxed">{p.lienPartenariat}</p>
                      </div>

                      {/* Note + CTA */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: p.note }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">{p.note}/5</span>
                        </div>
                        <Link
                          href={p.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-4"
                        >
                          Visiter le site
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Recacor */}
          <div className="mt-14 rounded-3xl bg-indigo-950 text-white p-10 text-center">
            <h2 className="text-2xl font-black mb-3">Vous gérez une flotte de véhicules ?</h2>
            <p className="text-indigo-200 mb-6 max-w-xl mx-auto">
              Recacor prend en charge les pneus et la mécanique de vos utilitaires et poids lourds
              en Hérault — avec ou sans rendez-vous, facture professionnelle garantie.
            </p>
            <Link
              href="/pneus-utilitaires-pl"
              className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Découvrir nos services PL
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
