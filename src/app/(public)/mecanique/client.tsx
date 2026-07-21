"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wrench, Droplet, Disc, Gauge, Target, Snowflake } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const FALLBACK_IMAGE = "/hero-generated/mecanique-master.png";

const services = [
  { icon: Droplet, title: "Vidange", desc: "Vidange complète huile + filtre", price: "79€", href: "/services/vidange", image: "/illustrations/services/vidange-intro-20260716.webp" },
  { icon: Target, title: "Parallélisme & Géométrie", desc: "Réglage laser 3D", price: "65€", href: "/services/parallelisme-geometrie", image: "/illustrations/services/parallelisme-intro-20260716.webp" },
  { icon: Snowflake, title: "Climatisation auto", desc: "Recharge clim + contrôle avant intervention", price: "59€", href: "/services/climatisation-auto-montpellier", image: FALLBACK_IMAGE, imagePending: true },
  { icon: Disc, title: "Freinage", desc: "Plaquettes, disques, liquide", price: "89€", href: "/mecanique#freinage", image: FALLBACK_IMAGE, imagePending: true },
  { icon: Gauge, title: "Amortisseurs", desc: "Train roulant, suspension", price: "Sur devis", href: "/mecanique#amortisseurs", image: FALLBACK_IMAGE, imagePending: true },
  { icon: Wrench, title: "Révision", desc: "Entretien complet constructeur", price: "Sur devis", href: "/mecanique#revision", image: FALLBACK_IMAGE, imagePending: true },
];

const faqs = [
  {
    q: "Faut-il prendre rendez-vous pour une vidange ou un freinage ?",
    a: "Nous acceptons les clients avec ou sans rendez-vous pour l'entretien auto. La vidange prend environ 30 minutes, le freinage entre 30 et 60 minutes selon l'intervention.",
  },
  {
    q: "Combien coûte une vidange chez Recacor ?",
    a: "Nos vidanges démarrent à 79€, huile + filtre + main d'œuvre inclus. Le prix exact dépend de votre véhicule et du type d'huile préconisé par le constructeur.",
  },
  {
    q: "Combien coûte un contrôle de parallélisme ?",
    a: "Le parallélisme simple est à partir de 65€. La géométrie 4 roues complète est à 89€. Le contrôle est offert lors de tout changement de pneus.",
  },
  {
    q: "Faites-vous le freinage toutes marques ?",
    a: "Oui, nous intervenons sur toutes marques et tous modèles. Plaquettes, disques, liquide de frein : nous utilisons des pièces de qualité adaptées à votre véhicule.",
  },
  {
    q: "Faites-vous la recharge clim voiture ?",
    a: "Oui, Recacor propose la recharge clim à partir de 59€, avec contrôle du fonctionnement avant intervention et passage possible avec ou sans rendez-vous.",
  },
  {
    q: "Peut-on combiner mécanique et pneus le même jour ?",
    a: "Oui, c'est même conseillé. Vidange + changement de pneus + parallélisme en une seule venue, c'est possible avec ou sans rendez-vous.",
  },
];

export function MecaniqueClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Entretien auto", url: "https://www.recacor.fr/mecanique" },
      ]} />
      <ServiceJsonLd
        name="Entretien auto Montpellier"
        description="Vidange, freinage, parallélisme, amortisseurs. Avec ou sans rendez-vous au Crès."
      />
      <FaqJsonLd items={faqs} id="mecanique" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${heroImage ? "hero-overlay-image" : "hero-overlay-solid"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <Wrench className="h-3 w-3 mr-1" /> Entretien auto
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Entretien Auto<br />
            <span className="text-purple-glow">Garage Recacor Le Crès</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Vidange, freinage, parallélisme, amortisseurs, révision. Avec ou sans
            rendez-vous au Crès, près de Montpellier.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink
              location="hero"
              className="flex-1 recacor-btn-primary whitespace-nowrap"
              showIcon
            >
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="flex-1 recacor-btn-secondary">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Entretenir sa voiture{" "}
              <span className="text-gradient-purple">sans perdre sa journée</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pour une vidange, un freinage, un parallélisme ou une révision, l&apos;attente
                est souvent la même : être bien reçu, savoir ce qui va être fait et pouvoir
                repartir rapidement. Recacor accompagne les automobilistes du Crès, de
                Montpellier, Castelnau-le-Lez, Jacou, Vendargues et des communes voisines
                pour ces interventions du quotidien.
              </p>
              <p>
                Les tarifs sont affichés, la vidange se fait en 30 minutes environ, et
                l&apos;atelier accueille avec ou sans rendez-vous selon la charge. Si la
                voiture a aussi besoin de pneus, d&apos;un parallélisme ou d&apos;un contrôle
                de freinage, tout se règle au même endroit, en un seul passage.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Vidange voiture dès 79€",
                "Parallélisme dès 65€",
                "Contrôle de parallélisme offert lors d'un changement de pneus",
                "Avec ou sans rendez-vous selon la charge atelier",
              ].map((item) => (
                <div key={item} className="rounded-[4px] border border-border bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Nos prestations <span className="text-gradient-purple">pour particuliers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-[4px] border border-border bg-white hover:border-blue-700/30 hover:shadow-xl hover:shadow-blue-700/[0.06] transition-all"
              >
                <div className="relative h-40 overflow-hidden bg-slate-900">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--recacor-night)]/60 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center bg-yellow-400 text-slate-950">
                    <s.icon className="h-4 w-4" />
                  </div>
                  {s.imagePending && (
                    <span className="absolute right-3 top-3 bg-white/90 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-600">
                      Photo à venir
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold tracking-tight group-hover:text-blue-700 transition-colors">
                      {s.title}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-700 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-3 inline-block w-fit text-xs font-black uppercase text-blue-700 bg-blue-700/10 px-2.5 py-1 rounded-[4px]">
                    {s.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 rounded-[4px] border border-border bg-muted/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Guides locaux entretien</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Si vous venez surtout pour un entretien rapide, notre page{" "}
              <Link href="/services/vidange" className="font-bold text-purple-bright hover:underline">
                vidange voiture à Montpellier
              </Link>{" "}
              détaille le tarif, ce qui est inclus et le formulaire dédié. En cas d&apos;usure
              irrégulière des pneus ou de volant qui tire, consulter aussi le{" "}
              <Link href="/services/parallelisme-geometrie" className="font-bold text-purple-bright hover:underline">
                service parallélisme et géométrie
              </Link>
              . Pour l&apos;été, la{" "}
              <Link href="/services/climatisation-auto-montpellier" className="font-bold text-purple-bright hover:underline">
                recharge climatisation voiture
              </Link>{" "}
              est traitée comme une prestation atelier avec contrôle avant intervention.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
              <Link href="/blog/pneus-lattes" className="text-purple-bright hover:underline">Parallélisme à Lattes</Link>
              <Link href="/blog/pneus-vendargues" className="text-purple-bright hover:underline">Garage auto à Vendargues</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                Tarifs atelier
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Grille tarifaire <span className="text-gradient-purple">mécanique</span>
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Tarifs indicatifs hors pièces pour les interventions réalisées en atelier. Le devis final dépend du véhicule,
                du diagnostic et des pièces nécessaires.
              </p>
            </div>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="recacor-btn-dark whitespace-nowrap">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
          <div className="overflow-hidden rounded-[4px] border border-border bg-white shadow-xl shadow-purple-bright/[0.06]">
            <Image
              src="/tarifs/tarif-mecanique-recacor-202606.webp"
              alt="Grille tarifaire mécanique Recacor : T1 72 euros TTC, T2 84 euros TTC, T3 96 euros TTC hors pièces"
              width={1600}
              height={1131}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Devis */}
      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Demandez un <span className="text-gradient-purple">devis mécanique</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Réponse sous 2h en jours ouvrés. Avec ou sans rendez-vous.
            </p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisMecaniqueForm />
          </div>
        </div>
      </section>

      <AvisSection />

      {/* FAQ */}
      <section className="relative py-24 bg-muted overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">
            Questions fréquentes{" "}
            <span className="text-gradient-purple">mécanique</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[4px] border border-border bg-white p-5 cursor-pointer"
              >
                <summary className="font-bold text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
