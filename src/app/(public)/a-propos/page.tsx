import type { Metadata } from "next";
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from "@/components/schema-jsonld";

export const metadata: Metadata = {
  title: "À propos — Garage Recacor Le Crès depuis 1950",
  description:
    "Recacor : groupe pneumatique fondé en 1950 à Córdoba (Espagne), 60+ ateliers en Europe, implanté au Crès depuis 2017. Spécialiste pneus VL, PL, agricoles et industriels.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos — Garage Recacor Le Crès depuis 1950",
    description:
      "Groupe pneumatique fondé en 1950, 60+ ateliers en Europe, implanté à Montpellier — Le Crès depuis 2017.",
    url: "https://recacor.fr/a-propos",
  },
};

export default function AProposPage() {
  const milestones = [
    {
      year: "1950",
      title: "Fondation à Córdoba",
      text: "Création de Recacor en Espagne. Atelier artisanal spécialisé dans le recreusage de pneumatiques, un savoir-faire rare transmis de génération en génération.",
    },
    {
      year: "1980–2010",
      title: "Expansion européenne",
      text: "Croissance progressive à plus de 60 ateliers en Espagne. Rayonnement vers l'Afrique du Nord et l'Europe, expertise reconnue sur le pneu lourd.",
    },
    {
      year: "2017",
      title: "Recacor France",
      text: "Création de Recacor France pour porter le savoir-faire espagnol sur le marché français : pneus VL, PL, agricoles et industriels.",
    },
    {
      year: "2021",
      title: "Garage Le Crès",
      text: "Ouverture du garage Recacor à Le Crès (34920), aux portes de Montpellier. Tous types de véhicules, avec ou sans rendez-vous.",
    },
  ];

  const valeurs = [
    {
      title: "Transparence",
      desc: "Prix affichés, explications claires, pas de mauvaises surprises. Vous savez ce que vous payez avant toute intervention.",
    },
    {
      title: "Réactivité",
      desc: "Avec ou sans rendez-vous pour les particuliers. Assistance PL 24h/24 et 7j/7 sur tout l'Hérault.",
    },
    {
      title: "Expertise",
      desc: "70+ ans de savoir-faire pneumatique. Nos techniciens sont formés et certifiés par les plus grandes marques constructeurs.",
    },
    {
      title: "Proximité",
      desc: "Une équipe locale qui connaît les routes, les professionnels et le territoire du 34. Un interlocuteur dédié pour les flottes.",
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://recacor.fr" },
          { name: "À propos", url: "https://recacor.fr/a-propos" },
        ]}
      />
      <LocalBusinessJsonLd />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Garage Recacor —<br />
            <span className="text-purple-glow">Depuis 1950</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Groupe espagnol fondé à Córdoba, implanté à Le Crès depuis 2017.
            60+ ateliers en Europe, un seul objectif : votre sécurité sur la route.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-purple-deep via-purple-mid to-purple-bright p-8 sm:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: "1950", label: "Année de fondation" },
                { value: "60+", label: "Ateliers en Europe" },
                { value: "70+", label: "Ans d'expertise" },
                { value: "10+", label: "Marques partenaires" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl sm:text-4xl font-black">{s.value}</p>
                  <p className="text-white/60 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12">
            Notre <span className="text-gradient-purple">histoire</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="rounded-2xl border border-border bg-white p-6">
                <span className="text-xs font-bold text-purple-bright bg-purple-bright/10 px-2.5 py-1 rounded-full">
                  {m.year}
                </span>
                <h3 className="text-lg font-black mt-3 mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12 text-center">
            Nos <span className="text-gradient-purple">engagements</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valeurs.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-white p-7">
                <h3 className="text-lg font-black mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
            L&apos;équipe <span className="text-gradient-purple">Le Crès</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Notre atelier réunit des techniciens spécialisés, formés et certifiés
            par les plus grandes marques constructeurs (Michelin, Bridgestone,
            Continental, Goodyear). Leur expertise couvre l&apos;ensemble des interventions
            pneus VL, PL, agricoles et industriels, ainsi que la mécanique légère :
            vidange, freinage, parallélisme et amortisseurs.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Avec ou sans rendez-vous, du lundi au vendredi de 8h à 17h et le samedi
            de 8h à 12h. Tél. : 04 99 53 33 90 — WhatsApp : 06 07 62 10 43
          </p>
        </div>
      </section>
    </>
  );
}
