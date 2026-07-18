"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Snowflake, Truck, Wrench, Shield, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PhoneLink } from "@/components/phone-link";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { DevisClimPlForm } from "@/components/forms/devis-clim-pl";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";

const faqs = [
  {
    q: "La clim cabine souffle chaud ou refroidit mal : vous contrôlez avant de recharger ?",
    a: "Oui. Recacor vérifie d'abord le besoin, le véhicule, le circuit et les conditions d'intervention avant de lancer une recharge. Si le problème vient d'autre chose, ce n'est pas traité comme une recharge simple.",
  },
  {
    q: "Vous intervenez au garage ou directement sur site ?",
    a: "Les deux sont possibles selon le véhicule, l'accès et le besoin. La prise en charge peut se faire au garage du Crès ou sur site, mais uniquement sur Montpellier et son agglomération.",
  },
  {
    q: "Le tarif à 149€ correspond à quoi ?",
    a: "149€ est le prix d'appel. Le tarif exact dépend du véhicule, de l'accès, du type de circuit et du mode d'intervention, au garage ou sur site.",
  },
  {
    q: "Quels véhicules prenez-vous en charge ?",
    a: "L'offre concerne surtout les camions, poids lourds, tracteurs routiers, porteurs, engins TP et certains véhicules agricoles selon configuration.",
  },
  {
    q: "Cette page concerne aussi les voitures et utilitaires légers ?",
    a: "Non. Ici, il s'agit bien de clim camion et poids lourd. Pour une voiture ou un utilitaire léger, il faut passer par la page clim auto à partir de 59€.",
  },
];

const points = [
  "Recharge clim dès 149€",
  "Garage du Crès ou intervention sur site",
  "Poids lourd, TP, agricole",
  "Montpellier et agglomération",
];

const vehicleTypes = [
  "Camions et tracteurs routiers",
  "Porteurs et véhicules de chantier",
  "Engins TP et manutention",
  "Véhicules agricoles",
];

const useCases = [
  "Clim cabine camion qui ne refroidit plus",
  "Froid faible en tournée, sur chantier ou en livraison",
  "Cabine difficile à tenir en été",
  "Besoin de vérifier vite si une recharge est vraiment adaptée",
];

const steps = [
  { icon: Truck, title: "Qualification du véhicule", desc: "Type de véhicule, accès, lieu d'intervention et symptôme remonté." },
  { icon: Wrench, title: "Contrôle avant intervention", desc: "Vérification du besoin réel avant de traiter la demande comme une recharge." },
  { icon: Snowflake, title: "Recharge clim", desc: "Recharge à partir de 149€ selon le véhicule et le mode de prise en charge." },
  { icon: Shield, title: "Contrôle final", desc: "Vérification du froid en cabine et du bon fonctionnement après intervention." },
];

const controlPoints = [
  {
    title: "Froid en cabine",
    desc: "Le point de départ, c'est le ressenti réel en cabine : froid insuffisant, clim qui souffle chaud ou confort qui chute en tournée.",
  },
  {
    title: "Type de véhicule et accès",
    desc: "Camion, tracteur, porteur ou engin TP ne se prennent pas en charge de la même manière. L'accès et le contexte comptent.",
  },
  {
    title: "Garage ou sur site",
    desc: "Recacor qualifie d'abord si le besoin se traite au garage du Crès ou sur site, uniquement sur Montpellier agglomération.",
  },
  {
    title: "Cohérence de la recharge",
    desc: "Le but n'est pas de faire une recharge automatique, mais de vérifier si c'est bien la bonne intervention pour le véhicule.",
  },
];

export function ClimCamionClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Pneus PL", url: "https://www.recacor.fr/pneus-utilitaires-pl" },
          { name: "Clim camion", url: "https://www.recacor.fr/services/clim-camion-poids-lourd-montpellier" },
        ]}
      />
      <ServiceJsonLd
        name="Clim camion Montpellier"
        description="Recharge clim poids lourd, camion, TP et agricole dès 149€ au garage du Crès ou sur site sur Montpellier et son agglomération."
        price="149"
      />
      <FaqJsonLd items={faqs} id="clim-camion" />

      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImage ? "from-purple-deep/88 via-purple-mid/82 to-purple-bright/74" : "from-purple-deep via-purple-mid to-purple-bright"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
            <div>
              <Badge className="mb-5 border-white/20 bg-white/10 text-white">
                <Truck className="mr-1 h-3 w-3" /> Clim camion et poids lourd
              </Badge>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Clim cabine camion <br />
                <span className="text-purple-glow">Montpellier - Le Crès</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/78">
                Recharge clim dès 149€ pour camions, poids lourds, TP et certains véhicules agricoles. Recacor
                contrôle d&apos;abord le besoin avant intervention, au garage du Crès ou sur site sur Montpellier agglomération.
              </p>
              <div className="mt-6 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
                {points.map((point) => (
                  <div key={point} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white">
                    <CheckCircle className="h-4 w-4 shrink-0 text-purple-glow" />
                    {point}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-white/70">
                Offre réservée aux camions, poids lourds, engins TP et véhicules agricoles.
              </p>
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <PhoneLink
                  location="hero"
                  serviceType="pl"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-purple-bright px-8 py-4 font-bold text-white shadow-[0_8px_30px_rgba(109,40,217,0.5)]"
                  showIcon
                >
                  Appeler : {PHONE_DISPLAY}
                </PhoneLink>
                <DevisCtaLink
                  desktopHref="#devis"
                  mobileHref="/formulaire/clim-camion"
                  className="flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10"
                >
                  Demande clim pro <ArrowRight className="h-4 w-4" />
                </DevisCtaLink>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-white/60">Offre clim pro</p>
                <p className="mt-2 text-4xl font-black">149€</p>
                <p className="text-sm text-white/70">Recharge clim à partir de</p>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Camions, PL, TP, agricoles</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-purple-glow" /> Garage du Crès ou sur site</div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-purple-glow" /> Montpellier et agglomération</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Clim cabine moins froide <span className="text-gradient-purple">? Faire contrôler avant recharge</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Quand la clim cabine refroidit moins bien, mieux vaut vérifier le besoin réel avant de traiter la
              demande comme une recharge simple. En poids lourd, le véhicule, l&apos;accès et le contexte d&apos;intervention
              changent la manière de prendre en charge la demande.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Ici, le sujet n&apos;est pas la clim voiture. Cette page concerne les camions, poids lourds, engins TP et
              certains véhicules agricoles, avec une prise en charge au garage du Crès ou sur site uniquement sur
              Montpellier agglomération.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {useCases.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5">
                <Snowflake className="mt-0.5 h-5 w-5 shrink-0 text-purple-bright" />
                <p className="text-sm font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <Badge className="mb-4 border-purple-bright/20 bg-purple-bright/10 text-purple-bright">
                  Poids lourd · Camion · TP · Agricole
                </Badge>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Pour les <span className="text-gradient-purple">camions, PL, TP et agricoles</span>
                </h2>
              </div>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Le coeur de l&apos;offre concerne la clim camion et poids lourd autour de Montpellier. Recacor peut
                  aussi intervenir sur certains engins TP et véhicules agricoles selon la configuration du véhicule
                  et les conditions d&apos;accès.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {vehicleTypes.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-bold text-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0 text-purple-bright" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">
            Comment se passe la <span className="text-gradient-purple">prise en charge clim ?</span>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-border bg-white p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-bright to-purple-mid">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-black tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <Badge className="mb-4 border-purple-bright/20 bg-purple-bright/10 text-purple-bright">
                Avant intervention
              </Badge>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Ce que Recacor <span className="text-gradient-purple">contrôle concrètement</span>
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                En clim poids lourd, le plus important est d&apos;éviter la mauvaise intervention. Le contrôle sert à
                qualifier le besoin réel avant de parler recharge, déplacement ou prise en charge atelier.
              </p>

              <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-purple-bright/[0.04]">
                <Image
                  src="/illustrations/services/clim-pl-intro-20260717.webp"
                  alt="Technicien effectuant un contrôle de climatisation sur un camion à l'atelier"
                  width={1400}
                  height={933}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {controlPoints.map((point) => (
                <div key={point.title} className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-purple-bright/[0.04]">
                  <h3 className="text-lg font-black tracking-tight">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20" id="devis">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="mb-4 border-purple-bright/20 bg-purple-bright/10 text-purple-bright">
              Demande rapide
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Demander un <span className="text-gradient-purple">contrôle ou une recharge clim cabine</span>
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Laisser les informations du véhicule et du lieu d&apos;intervention. Recacor rappelle pour qualifier le
              besoin et organiser la prise en charge au garage du Crès ou sur site sur Montpellier agglomération.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-white p-5 text-sm text-muted-foreground">
              <p className="font-bold text-foreground">À préparer si possible :</p>
              <ul className="mt-3 space-y-2">
                <li>• type de véhicule</li>
                <li>• lieu exact si intervention sur site</li>
                <li>• modèle ou plaque</li>
                <li>• symptôme clim observé</li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/pneus-utilitaires-pl" className="inline-flex items-center gap-2 text-sm font-bold text-purple-bright hover:underline">
                Voir aussi la page pneus poids lourd <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-5 shadow-xl shadow-purple-bright/[0.06] sm:p-6">
            <DevisClimPlForm />
          </div>
        </div>
      </section>
    </>
  );
}
