"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink, Star, Truck, ShoppingCart, Clock } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";

const commercesProches = [
  {
    nom: "IKEA Montpellier Saint-Aunès",
    categorie: "Ameublement & décoration",
    adresse: "240 Rue du Mas de Prunet, 34130 Saint-Aunès",
    distance: "5 min",
    description:
      "Le magasin IKEA de Montpellier est situé à Saint-Aunès, à 5 minutes du garage Recacor. Avec 15 000 m² de surface de vente, c'est l'une des plus grandes enseignes de la zone est de Montpellier. Profitez de votre passage à IKEA pour faire contrôler vos pneus chez Recacor — sans rendez-vous, en 15 minutes.",
    site: "https://www.ikea.com/fr/fr/stores/montpellier/",
  },
  {
    nom: "Carrefour Saint-Aunès",
    categorie: "Grande surface alimentaire",
    adresse: "Route de Vendargues, 34130 Saint-Aunès",
    distance: "5 min",
    description:
      "L'hypermarché Carrefour de Saint-Aunès dessert toute la zone est de Montpellier, Le Crès, Vendargues et Mauguio. À quelques minutes de Recacor sur la RN113, c'est une occasion idéale de combiner courses et entretien de votre véhicule — vidange, pneus ou parallélisme sans attente.",
    site: "https://www.carrefour.fr/",
  },
  {
    nom: "Carrefour Contact Le Crès",
    categorie: "Supermarché de proximité",
    adresse: "Le Crès, 34920",
    distance: "2 min",
    description:
      "Le Carrefour Contact du Crès est le supermarché de proximité de la commune, à deux minutes du garage Recacor. Idéal pour les habitants du Crès qui peuvent confier leur voiture le matin et récupérer leurs courses dans la foulée.",
    site: "https://www.carrefour.fr/",
  },
  {
    nom: "Odysseum Montpellier",
    categorie: "Shopping & loisirs",
    adresse: "Place de l'Europe, 34000 Montpellier",
    distance: "10 min",
    description:
      "L'Odysseum est le grand complexe commercial et de loisirs de Montpellier Est, accessible en tram (ligne 1). Cinéma, restaurants, boutiques et enseignes nationales — à 10 minutes de Recacor. Un passage à l'Odysseum est l'occasion de déposer votre véhicule chez nous le temps de vos achats.",
    site: "https://www.odysseum.com/",
  },
];

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
  {
    slug: "boucherie-vedasienne",
    nom: "Boucherie Védasienne",
    categorie: "Boucherie artisanale",
    description:
      "La Boucherie Védasienne est une boucherie artisanale implantée à Saint-Jean-de-Védas, aux portes de Montpellier. Sélection rigoureuse des viandes, découpe traditionnelle et service de proximité : une adresse incontournable pour les amateurs de produits de qualité en Hérault. C'est notre partenaire local dont nous assurons l'entretien des véhicules de livraison.",
    lienPartenariat:
      "Recacor prend en charge les pneus et la mécanique des véhicules utilitaires de la Boucherie Védasienne pour garantir des livraisons fiables au quotidien.",
    site: "https://boucheriesaintjeandevedas.fr/",
    logo: "https://www.recacor.fr/api/media/27",
    localisation: "Saint-Jean-de-Védas, Hérault (34)",
    note: 5,
    badge: "Partenaire flotte",
  },
];

export function GuideLocalClient() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="relative py-20 bg-[var(--recacor-night)] overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-sm font-bold tracking-widest uppercase text-white/65 mb-4">
            Recacor Le Crès
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Guide local <span className="text-gradient-purple">Montpellier</span>
          </h1>
          <p className="text-lg text-white/72 max-w-2xl mx-auto leading-relaxed">
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
                className="rounded-[4px] border border-border bg-white overflow-hidden shadow-sm"
              >
                <div className="p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-20 relative bg-gray-50 rounded-[4px] border border-border flex items-center justify-center p-4">
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
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-700/10 text-blue-700 px-3 py-1 rounded-[4px]">
                          {p.categorie}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-[4px]">
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
                      <div className="rounded-[4px] bg-blue-700/5 border border-blue-700/15 px-5 py-4 mb-5">
                        <p className="text-sm font-bold text-blue-800 mb-1">Notre partenariat</p>
                        <p className="text-sm text-blue-700 leading-relaxed">{p.lienPartenariat}</p>
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
                          className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 underline underline-offset-4"
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

          {/* Commerces proches */}
          <div className="mt-16 mb-4">
            <h2 className="text-3xl font-black tracking-tight">Commerces et enseignes proches</h2>
            <p className="mt-3 text-muted-foreground">
              Ces grandes enseignes sont à moins de 10 minutes de Recacor Le Crès. Profitez de vos courses ou
              loisirs pour faire entretenir votre véhicule — sans rendez-vous.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
            {commercesProches.map((c) => (
              <div key={c.nom} className="rounded-[4px] border border-border bg-white p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-[4px]">
                    <ShoppingCart className="w-3 h-3" />
                    {c.categorie}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-[4px]">
                    <Clock className="w-3 h-3" />
                    {c.distance}
                  </span>
                </div>
                <h3 className="text-lg font-black mb-1">{c.nom}</h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {c.adresse}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
                <Link
                  href={c.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 underline underline-offset-4"
                >
                  Site officiel <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Recacor */}
          <div className="mt-14 rounded-[4px] bg-[var(--recacor-night)] text-white p-10 text-center">
            <h2 className="text-2xl font-black mb-3">Vous gérez une flotte de véhicules ?</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Recacor prend en charge les pneus et la mécanique de vos utilitaires et poids lourds
              en Hérault — avec ou sans rendez-vous, facture professionnelle garantie.
            </p>
            <Link
              href="/pneus-utilitaires-pl"
              className="recacor-btn-secondary whitespace-nowrap"
            >
              Découvrir nos services PL
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
