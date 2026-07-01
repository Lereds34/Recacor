"use client";

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
    q: "À qui s'adresse cette offre clim ?",
    a: "Cette offre est dédiée aux camions, poids lourds, engins TP et véhicules agricoles. Elle ne concerne pas la clim voiture à 59€.",
  },
  {
    q: "Le service est-il disponible au garage ou sur site ?",
    a: "Oui. Recacor peut prendre en charge la clim au garage du Crès ou organiser une intervention sur site sur Montpellier et son agglomération selon le véhicule et le besoin.",
  },
  {
    q: "Combien coûte une recharge clim poids lourd ?",
    a: "La recharge clim démarre à 149€. Le prix exact dépend du véhicule, de l'accès, du gaz utilisé et du type d'intervention attendu.",
  },
  {
    q: "Quels véhicules peuvent être pris en charge ?",
    a: "Poids lourds, tracteurs routiers, porteurs, engins TP, véhicules agricoles et certains utilitaires professionnels selon configuration.",
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
  "Froid faible en tournée ou sur chantier",
  "Recharge avant forte saison ou longue route",
  "Besoin d'intervention rapide pour véhicule pro",
];

const steps = [
  { icon: Truck, title: "Qualification du véhicule", desc: "Type de véhicule, accès, besoin atelier ou sur site." },
  { icon: Wrench, title: "Contrôle de la prestation", desc: "Préparation de l'intervention selon le circuit et le gaz concerné." },
  { icon: Snowflake, title: "Recharge clim", desc: "Recharge à partir de 149€ selon le véhicule et le besoin." },
  { icon: Shield, title: "Contrôle final", desc: "Vérification du froid en cabine et du bon fonctionnement." },
];

export function ClimCamionClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://recacor.fr" },
          { name: "Pneus PL", url: "https://recacor.fr/pneus-utilitaires-pl" },
          { name: "Clim camion", url: "https://recacor.fr/services/clim-camion-poids-lourd-montpellier" },
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
                Clim camion et poids lourd <br />
                <span className="text-purple-glow">Montpellier - Le Crès</span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/78">
                Recharge clim pour poids lourds, camions, TP et agricoles dès 149€, au garage du Crès ou sur site
                sur Montpellier et son agglomération.
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
                Offre réservée aux poids lourds, engins TP et véhicules agricoles.
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
              Une offre clim dédiée aux <span className="text-gradient-purple">camions et véhicules pros</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Cette page ne concerne pas la clim voiture. Ici, l&apos;offre est pensée pour les besoins des camions,
              poids lourds, engins TP et véhicules agricoles, avec une prise en charge au garage du Crès ou sur site
              selon le véhicule et la zone d&apos;intervention.
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
                  Quels véhicules sont <span className="text-gradient-purple">concernés ?</span>
                </h2>
              </div>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Le coeur de l&apos;offre concerne la clim camion et poids lourd. Recacor peut aussi intervenir sur
                  certains engins TP et véhicules agricoles selon la configuration du véhicule, l&apos;accès et le type
                  de circuit.
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

      <section className="bg-muted py-20" id="devis">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="mb-4 border-purple-bright/20 bg-purple-bright/10 text-purple-bright">
              Demande rapide
            </Badge>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Demande clim <span className="text-gradient-purple">camion / poids lourd</span>
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Laisse les informations du véhicule et du lieu d&apos;intervention. Recacor te rappelle pour organiser la
              prise en charge au garage du Crès ou sur site.
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
