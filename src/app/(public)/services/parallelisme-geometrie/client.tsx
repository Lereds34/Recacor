"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Gauge, Wrench } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

const faqs = [
  { q: "Ma voiture tire d'un côté ou le volant n'est plus droit : faut-il faire un parallélisme ?", a: "Oui, c'est l'un des signaux les plus fréquents. Un contrôle du train roulant permet de vérifier si le problème vient du parallélisme, de la pression des pneus ou d'un autre élément de suspension." },
  { q: "Combien coûte un parallélisme ?", a: "Nos tarifs démarrent à 65€ pour un parallélisme simple. La géométrie 4 roues complète est à 89€ selon le véhicule et les réglages réellement nécessaires." },
  { q: "Le contrôle est-il offert après un changement de pneus ?", a: "Oui. Chez Recacor, le contrôle du parallélisme est offert lors d'un changement de pneus. Le réglage n'est proposé que s'il est utile." },
  { q: "Combien de temps dure l'opération ?", a: "Le réglage prend en général 30 à 45 minutes avec notre équipement laser 3D, selon l'état du train roulant et le type de véhicule." },
  { q: "Quelle différence entre parallélisme et géométrie ?", a: "Le parallélisme règle principalement l'alignement des roues. La géométrie complète contrôle aussi d'autres angles comme le carrossage et la chasse quand le véhicule permet ces réglages." },
];

export function ParallelismeClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Parallélisme & Géométrie", url: "https://www.recacor.fr/services/parallelisme-geometrie" },
      ]} />
      <ServiceJsonLd name="Parallélisme Géométrie Montpellier" description="Parallélisme et géométrie voiture sans RDV" price="65" />
      <FaqJsonLd items={faqs} id="parallelisme" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6"><Target className="h-3 w-3 mr-1" /> Parallélisme</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Parallélisme Géométrie<br />
            <span className="text-purple-glow">Montpellier — Sans RDV</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Réglage précis avec équipement laser 3D. Résultat en 30 minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink mobileHref="/formulaire/mecanique" className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis gratuit <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Quand le volant tire ou que les pneus{" "}
                  <span className="text-gradient-purple">s&apos;usent mal</span>
                </h2>
                <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    La voiture tire à droite, le volant n&apos;est plus droit après un trottoir,
                    les pneus s&apos;usent d&apos;un seul côté — ou vous venez de monter des pneus
                    neufs et vous voulez éviter de les abîmer en quelques milliers de kilomètres.
                    Ce sont les vraies raisons de contrôler un parallélisme.
                  </p>
                  <p>
                    Chez Recacor au Crès, le contrôle est <strong>offert lors d&apos;un changement
                    de pneus</strong> et le réglage démarre à <strong>65€</strong>. Un train
                    bien réglé, c&apos;est des pneus qui durent, une voiture qui freine droit et
                    une consommation qui ne dérive pas.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl border border-border bg-muted/30">
                <Image
                  src="/illustrations/services/parallelisme-intro-20260716.webp"
                  alt="Réglage de géométrie sur une voiture avec banc laser de parallélisme"
                  width={1200}
                  height={658}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Cas les plus fréquents</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Voiture qui tire, volant de travers, usure irrégulière, choc trottoir, pneus neufs à préserver
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Infos clés à retenir</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Contrôle offert avec pneus, réglage dès 65€, géométrie complète possible selon véhicule
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Un réglage <span className="text-gradient-purple">professionnel</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Équipement laser 3D", desc: "Précision millimétrique sur tous les angles" },
              { icon: Gauge, title: "Test dynamique", desc: "Vérification en conditions réelles" },
              { icon: Wrench, title: "Réglage complet", desc: "Parallélisme, carrossage, chasse" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Pourquoi contrôler le <span className="text-gradient-purple">parallélisme ?</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Le parallélisme correspond à l&apos;orientation des roues les unes par rapport aux autres.
              Un mauvais réglage augmente la résistance au roulement, use les pneus de manière irrégulière
              et peut rendre la voiture moins stable. Un simple choc contre un trottoir, un nid-de-poule,
              le remplacement d&apos;éléments de suspension ou le montage de pneus neufs peuvent modifier
              les angles du train roulant.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-border bg-white p-7">
              <h3 className="text-lg font-black mb-3">Usure anormale des pneus</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Une usure plus marquée à l&apos;intérieur ou à l&apos;extérieur de la bande de roulement
                indique souvent un défaut d&apos;alignement. Corriger rapidement le réglage évite de remplacer
                prématurément des pneus encore récents.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-7">
              <h3 className="text-lg font-black mb-3">Volant de travers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si le volant n&apos;est plus droit lorsque la voiture roule en ligne droite, ou si le véhicule
                tire d&apos;un côté, un contrôle du train avant est conseillé. Le diagnostic permet aussi
                d&apos;écarter un problème de pression ou de suspension.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-7">
              <h3 className="text-lg font-black mb-3">Après un changement de pneus</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Des pneus neufs montés sur un véhicule mal réglé peuvent s&apos;user rapidement. Chez Recacor,
                le contrôle du parallélisme est offert lors d&apos;un changement de pneus ; le réglage est
                proposé uniquement s&apos;il est nécessaire.
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Parallélisme ou géométrie complète ?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le parallélisme corrige principalement l&apos;alignement des roues. Une géométrie complète
                mesure également le carrossage et la chasse lorsque le véhicule permet ces réglages.
                Notre banc laser 3D compare les valeurs mesurées aux données constructeur. Le technicien
                explique le résultat avant toute intervention et remet un réglage cohérent avec le véhicule.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Contrôle au Crès, près de Montpellier</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le garage est situé au 1240 Route de Nîmes au Crès. Nous recevons les automobilistes de
                Montpellier, Castelnau-le-Lez, Jacou, Vendargues et des communes voisines avec ou sans
                rendez-vous. L&apos;opération dure généralement entre 30 et 45 minutes selon les réglages
                nécessaires et l&apos;état du train roulant.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                <Link href="/pneus-voiture" className="text-purple-bright hover:underline">Pneus voiture</Link>
                <Link href="/mecanique" className="text-purple-bright hover:underline">Mécanique légère</Link>
                <Link href="/services/vidange" className="text-purple-bright hover:underline">Vidange voiture</Link>
                <Link href="/services/climatisation-auto-montpellier" className="text-purple-bright hover:underline">Recharge clim</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-black tracking-tight mb-5">Les étapes du contrôle de géométrie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>
                Avant le réglage, nous contrôlons visuellement les pneus, leur pression et les principaux
                éléments du train roulant. Un jeu dans une rotule, une biellette ou un roulement doit être
                traité avant la géométrie : régler un véhicule présentant une pièce défectueuse ne donnerait
                pas un résultat durable.
              </p>
              <p>
                Les capteurs du banc 3D mesurent ensuite les angles des roues et les comparent aux valeurs
                constructeur. Le parallélisme démarre à 65€ ; une géométrie quatre roues plus complète peut
                nécessiter davantage de réglages. Le devis dépend donc du véhicule et des corrections
                réellement possibles, jamais d&apos;un réglage ajouté sans diagnostic. Après l&apos;intervention,
                le volant est recentré et le comportement du véhicule est contrôlé. Un bon réglage améliore
                la stabilité, préserve la durée de vie des pneus et limite les efforts inutiles au roulement.
                Il ne remplace toutefois pas une pression correcte ni le contrôle régulier de l&apos;usure.
                En cas de choc important ou de vibration persistante, un contrôle mécanique complémentaire
                peut être recommandé avant de reprendre la route.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight">
              Devis <span className="text-gradient-purple">parallélisme</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Pour un volant de travers, une usure anormale ou après un changement de pneus, faites contrôler le réglage.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisMecaniqueForm defaultService="Contrôle parallélisme" />
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
