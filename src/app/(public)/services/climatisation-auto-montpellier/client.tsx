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
    q: "Ma clim souffle chaud ou refroidit mal : vous contrôlez avant de recharger ?",
    a: "Oui. Recacor contrôle d'abord le fonctionnement, les pressions et l'état général du circuit. Si une recharge est adaptée, elle est faite avec le bon gaz. Si le problème vient d'une fuite ou d'un autre élément, c'est expliqué avant intervention.",
  },
  {
    q: "Je peux venir sans rendez-vous pour faire contrôler la clim ?",
    a: "Oui, vous pouvez passer avec ou sans rendez-vous à l'atelier du Crès. Un appel avant de venir permet simplement de vérifier le meilleur créneau.",
  },
  {
    q: "Vous travaillez sur le gaz R134a et le 1234yf ?",
    a: "Oui, selon le véhicule. Le tarif dépend justement du gaz prévu et du type de voiture, ce qui explique qu'une recharge clim ne se traite pas exactement de la même manière d'un modèle à l'autre.",
  },
  {
    q: "Quand faut-il faire contrôler sa clim voiture ?",
    a: "Dès que l'air devient moins froid, que le désembuage est plus lent, qu'une odeur apparaît à la ventilation ou avant un départ d'été. Mieux vaut contrôler tôt que découvrir le problème pendant les fortes chaleurs.",
  },
  {
    q: "Si la ventilation sent mauvais, une recharge suffit ?",
    a: "Pas forcément. Une mauvaise odeur peut aussi venir d'un filtre d'habitacle encrassé ou d'un circuit à nettoyer. C'est justement l'intérêt de contrôler avant de recharger.",
  },
];

const signs = [
  "Air tiède ou froid insuffisant",
  "Mauvaise odeur à la ventilation",
  "Désembuage plus lent",
  "Bruit inhabituel quand la clim tourne",
  "Clim qui met longtemps à refroidir l'habitacle",
  "Contrôle utile avant départ ou forte chaleur",
];

const steps = [
  { icon: Gauge, title: "Contrôle de fonctionnement", desc: "Vérification du froid, des pressions et de l'état du circuit." },
  { icon: Wrench, title: "Mise sous vide", desc: "Préparation du circuit avant recharge si l'intervention est validée." },
  { icon: Snowflake, title: "Recharge clim", desc: "Injection du fluide adapté au véhicule, à partir de 59€." },
  { icon: ThermometerSun, title: "Contrôle final", desc: "Mesure du froid en sortie d'aérateur et validation du résultat." },
];

const controlPoints = [
  {
    title: "Froid et ventilation",
    desc: "Recacor vérifie si la clim souffle réellement assez froid et si la ventilation reste cohérente à l'usage.",
  },
  {
    title: "Pressions du circuit",
    desc: "Le contrôle permet de voir si une recharge est pertinente ou si le circuit appelle plutôt une autre vérification.",
  },
  {
    title: "Type de gaz prévu",
    desc: "Le véhicule détermine la prise en charge, notamment selon le R134a ou le 1234yf.",
  },
  {
    title: "Filtre d'habitacle et odeurs",
    desc: "Une clim qui sent mauvais ne se règle pas toujours avec une recharge. Le filtre et l'état du circuit comptent aussi.",
  },
];

export function ClimatisationClient({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Mécanique", url: "https://www.recacor.fr/mecanique" },
        { name: "Climatisation auto", url: "https://www.recacor.fr/services/climatisation-auto-montpellier" },
      ]} />
      <ServiceJsonLd
        name="Recharge clim voiture Montpellier"
        description="Recharge clim voiture dès 59€, contrôle du fonctionnement avant recharge, avec ou sans rendez-vous au Crès près de Montpellier."
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
                Recharge clim dès 59€. Si la clim souffle moins froid, Recacor contrôle d&apos;abord le circuit avant
                d&apos;intervenir. Avec ou sans rendez-vous au Crès, proche Montpellier Est.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl">
                {["Dès 59€", "Contrôle avant recharge", "Avec ou sans RDV"].map((item) => (
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
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Contrôle du fonctionnement avant recharge</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Intervention atelier au Crès</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-glow" /> Avec ou sans rendez-vous</div>
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
              Clim voiture moins froide <span className="text-gradient-purple">? Faire contrôler avant recharge</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Si votre clim refroidit moins bien, mieux vaut vérifier le circuit avant de lancer une recharge.
              Cela permet de voir si le problème vient simplement du gaz, d&apos;un filtre d&apos;habitacle encrassé
              ou d&apos;un autre élément du système.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Chez Recacor, le but est simple : remettre du froid quand une recharge suffit, et vous le dire
              clairement quand ce n&apos;est pas le bon levier.
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
                  Voiture · SUV · Utilitaire léger
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Pour les <span className="text-gradient-purple">voitures, SUV et utilitaires légers</span>
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Cette offre concerne surtout les voitures, SUV et utilitaires légers qui roulent autour de
                  Montpellier Est. Vous pouvez passer facilement depuis Castelnau-le-Lez, Jacou, Vendargues,
                  Baillargues, Saint-Aunès ou Mauguio.
                </p>
                <p>
                  Si le besoin concerne un poids lourd, un camion, un engin TP ou un véhicule agricole, il faut
                  passer par la page dédiée clim pro : le tarif, la prise en charge et la zone d&apos;intervention ne
                  sont pas les mêmes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {["Voitures et SUV", "Utilitaires légers", "Gaz selon véhicule", "Atelier au Crès"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-bold text-foreground">
                      <CheckCircle className="h-4 w-4 text-purple-bright shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link href="/services/clim-camion-poids-lourd-montpellier" className="font-bold text-purple-bright hover:underline">
                    Voir la page clim camion / poids lourd
                  </Link>
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
                Recharge clim <span className="text-gradient-purple">à partir de 59€, selon véhicule et gaz</span>
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                La recharge dépend du type de gaz et du véhicule. Avant d&apos;intervenir, Recacor vérifie que la
                prestation est cohérente. Selon le cas, cela peut déboucher sur une recharge, un contrôle
                complémentaire ou un remplacement du filtre d&apos;habitacle.
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
            Comment se passe une <span className="text-gradient-purple">prise en charge clim ?</span>
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 mb-4">
              Avant recharge
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ce que Recacor <span className="text-gradient-purple">contrôle concrètement</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Une recharge clim utile commence par un contrôle simple et clair. Le but n&apos;est pas de vous vendre
              un geste automatique, mais de vérifier si la voiture a vraiment besoin d&apos;une recharge ou d&apos;autre chose.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {controlPoints.map((point) => (
              <div key={point.title} className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-purple-bright/[0.04]">
                <h3 className="text-lg font-black tracking-tight">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Un atelier facile d&apos;accès depuis Montpellier Est</h2>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;atelier Recacor se trouve au 1240 Route de Nîmes au Crès, à proximité immédiate de Montpellier Est,
                Castelnau-le-Lez, Vendargues, Baillargues, Saint-Aunès, Jacou et Mauguio. Vous pouvez passer avec
                ou sans rendez-vous pour un contrôle du fonctionnement de la climatisation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Mieux vaut contrôler avant les fortes chaleurs</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le vrai problème n&apos;est pas seulement le confort. Une clim faible devient vite pénible dans les
                bouchons, sur les trajets école-travail, au moment des fortes chaleurs ou quand le désembuage
                devient moins efficace. Faire contrôler le système avant l&apos;été évite de découvrir le problème
                trop tard.
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
              Demander un <span className="text-gradient-purple">contrôle ou une recharge clim</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Laisser les informations du véhicule pour être rappelé rapidement. Contrôle avant recharge, à partir de 59€.
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
