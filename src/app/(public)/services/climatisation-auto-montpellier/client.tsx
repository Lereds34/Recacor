"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CalendarClock, CheckCircle, Gauge, Snowflake, ThermometerSun, Wrench } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisClimForm } from "@/components/forms/devis-clim";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { AvisSection } from "@/components/avis-section";
import { PHONE_DISPLAY } from "@/lib/tracking";

const faqs = [
  {
    q: "Combien coûte une recharge clim voiture chez Recacor ?",
    a: "La recharge clim démarre à 59€. Le prix exact dépend du véhicule, du gaz utilisé et de l'état du circuit. Le diagnostic clim est gratuit.",
  },
  {
    q: "Faut-il prendre rendez-vous pour une recharge clim ?",
    a: "Vous pouvez venir avec ou sans rendez-vous à l'atelier Recacor Le Crès. Un appel avant votre passage permet simplement de confirmer le meilleur créneau.",
  },
  {
    q: "Quand faut-il faire contrôler sa clim voiture ?",
    a: "Une clim qui refroidit moins, une mauvaise odeur, un désembuage lent ou un bruit anormal sont de bons signaux pour demander un diagnostic.",
  },
  {
    q: "Quelle différence entre diagnostic clim et recharge clim ?",
    a: "Le diagnostic sert à vérifier les symptômes et l'état général du système. La recharge consiste à remettre le gaz adapté lorsque le circuit le permet.",
  },
  {
    q: "Combien de temps dure l'intervention ?",
    a: "Une recharge clim prend généralement moins d'une heure selon le véhicule et les contrôles à effectuer.",
  },
];

const signs = [
  "Air tiède ou froid insuffisant",
  "Mauvaise odeur à la ventilation",
  "Désembuage plus lent",
  "Bruit inhabituel quand la clim tourne",
  "Clim qui met longtemps à refroidir",
  "Départ en vacances ou fortes chaleurs",
];

const steps = [
  { icon: Gauge, title: "Diagnostic gratuit", desc: "Contrôle du besoin réel avant intervention." },
  { icon: Wrench, title: "Mise sous vide", desc: "Préparation du circuit avant recharge." },
  { icon: Snowflake, title: "Recharge clim", desc: "Gaz adapté au véhicule, à partir de 59€." },
  { icon: ThermometerSun, title: "Test de froid", desc: "Contrôle de la température en sortie d'aérateur." },
];

export function ClimatisationClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Mécanique", url: "https://recacor.fr/mecanique" },
        { name: "Climatisation auto", url: "https://recacor.fr/services/climatisation-auto-montpellier" },
      ]} />
      <ServiceJsonLd
        name="Recharge clim voiture Montpellier"
        description="Recharge clim voiture dès 59€, diagnostic clim gratuit, avec ou sans rendez-vous au Crès près de Montpellier."
        price="59"
      />
      <FaqJsonLd items={faqs} id="climatisation-auto" />

      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImage ? "from-purple-deep/88 via-purple-mid/80 to-purple-bright/70" : "from-purple-deep via-purple-mid to-purple-bright"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8 items-center">
            <div>
              <Badge className="bg-white/10 text-white border-white/20 mb-5">
                <Snowflake className="h-3 w-3 mr-1" /> Climatisation auto
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
                Recharge clim voiture <br />
                <span className="text-purple-glow">Montpellier - Le Crès</span>
              </h1>
              <p className="mt-4 text-white/75 max-w-xl text-lg">
                Recharge clim dès 59€. Diagnostic clim gratuit. Avec ou sans rendez-vous dans notre atelier au Crès.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl">
                {["Dès 59€", "Diagnostic gratuit", "Avec ou sans RDV"].map((item) => (
                  <div key={item} className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm font-bold text-white">
                    <CheckCircle className="h-4 w-4 text-purple-glow shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
                <PhoneLink location="hero" serviceType="mecanique" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
                  Appeler : {PHONE_DISPLAY}
                </PhoneLink>
                <DevisCtaLink desktopHref="#devis" mobileHref="/formulaire/clim" className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
                  Devis clim <ArrowRight className="h-4 w-4" />
                </DevisCtaLink>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wider text-white/60 font-bold">Offre clim</p>
                <p className="mt-2 text-4xl font-black">59€</p>
                <p className="text-white/70 text-sm">Recharge clim à partir de</p>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Diagnostic clim gratuit</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Intervention atelier au Crès</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Photos atelier à ajouter au hero</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Clim auto faible ? <span className="text-gradient-purple">Passez au diagnostic gratuit</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Une climatisation qui ne fait plus assez de froid n&apos;a pas toujours besoin de la même intervention.
              Recacor vérifie d&apos;abord le symptôme, le véhicule et le besoin réel avant de proposer la recharge.
              Le diagnostic clim est gratuit et la recharge démarre à 59€.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {signs.map((sign) => (
              <div key={sign} className="rounded-2xl border border-border bg-white p-5 flex items-start gap-3">
                <Snowflake className="h-5 w-5 text-purple-bright shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{sign}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                  VL · Utilitaires · PL · Agri · Camping-cars
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Climatisation pour <span className="text-gradient-purple">plusieurs types de véhicules</span>
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Recacor peut intervenir sur la climatisation des voitures, utilitaires, poids lourds,
                  véhicules agricoles et camping-cars, selon le type de gaz, l&apos;accès au véhicule et la
                  disponibilité de l&apos;atelier.
                </p>
                <p>
                  Pour les véhicules spécifiques comme les PL, engins agricoles ou camping-cars, un appel avant
                  le passage permet de vérifier la compatibilité, le besoin réel et le meilleur créneau de prise
                  en charge.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {["Voitures et SUV", "Utilitaires", "Poids lourds", "Agricole et camping-cars"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-bold text-foreground">
                      <CheckCircle className="h-4 w-4 text-purple-bright shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
                Tarifs recharge clim
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Prix recharge clim <span className="text-gradient-purple">selon véhicule et gaz</span>
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                La recharge dépend du type de gaz et du véhicule. Le diagnostic clim reste gratuit avant intervention
                pour confirmer le besoin réel.
              </p>
            </div>
            <DevisCtaLink desktopHref="#devis" mobileHref="/formulaire/clim" className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-bright px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-bright/20">
              Demander un devis clim <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl shadow-purple-bright/[0.06]">
            <Image
              src="/tarifs/tarif-clim-recacor-202606.webp"
              alt="Grille tarifaire recharge climatisation Recacor : ancien gaz R134 et nouveau gaz 1234yf selon type de véhicule"
              width={1600}
              height={1131}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Comment se passe une <span className="text-gradient-purple">recharge clim ?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-border bg-white p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Recharge clim près de Montpellier Est</h2>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;atelier Recacor se trouve au 1240 Route de Nîmes au Crès, à proximité immédiate de Montpellier Est,
                Castelnau-le-Lez, Vendargues, Baillargues, Saint-Aunès, Jacou et Mauguio. Vous pouvez passer avec
                ou sans rendez-vous pour un diagnostic clim gratuit.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Pourquoi ne pas attendre les fortes chaleurs ?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Une clim faible devient vite pénible en été, surtout en ville et sur les trajets courts.
                Faire contrôler le système avant les pics de chaleur permet de vérifier le froid, le confort
                et le désembuage avant un départ en vacances ou une période chaude.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/mecanique" className="text-purple-bright hover:underline">Voir la mécanique légère</Link>
            <Link href="/services/vidange" className="text-purple-bright hover:underline">Vidange voiture</Link>
            <Link href="/pneus-voiture" className="text-purple-bright hover:underline">Pneus voiture</Link>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-bright/10 text-purple-bright font-bold text-sm mb-4">
              <CalendarClock className="h-4 w-4" /> Avec ou sans rendez-vous
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Demandez votre <span className="text-gradient-purple">devis clim</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Diagnostic gratuit, recharge à partir de 59€. Réponse rapide en jours ouvrés.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisClimForm />
          </div>
        </div>
      </section>

      <AvisSection />

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">
            Questions fréquentes <span className="text-gradient-purple">clim auto</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-border bg-white p-5 cursor-pointer">
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
