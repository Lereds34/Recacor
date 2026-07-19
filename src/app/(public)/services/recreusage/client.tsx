"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Euro, TrendingUp, CheckCircle, RefreshCw } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

const signauxParc = [
  "Pneu marqué REGROOVABLE",
  "Carcasse encore saine",
  "Usure lue assez tôt",
  "Pression et charge suivies",
];

const risquesCarcasse = [
  {
    title: "Sous-gonflage et échauffement",
    desc: "Un pneu qui roule longtemps avec une pression instable chauffe davantage, s'use moins bien et peut perdre une partie du potentiel qui rend le recreusage pertinent.",
  },
  {
    title: "Surcharge et usage sévère",
    desc: "Quand la charge réelle, le poste ou l'usage chantier sont mal pris en compte, la carcasse travaille plus dur et se dégrade plus vite.",
  },
  {
    title: "Choc, crevaison ou roulage trop long",
    desc: "Après incident, certains dégâts restent internes. Attendre trop longtemps avant contrôle peut faire perdre la valeur de l'enveloppe.",
  },
];

const avantages = [
  { icon: Euro, title: "Jusqu'à 40% d'économie", desc: "Un coût kilométrique optimisé pour les flottes" },
  { icon: TrendingUp, title: "+25% de durée de vie", desc: "Prolongation significative de l'usage" },
  { icon: Leaf, title: "Écologique", desc: "Réduction de l'empreinte carbone de votre flotte" },
];

const faqs = [
  { q: "Qu'est-ce que le recreusage sur un pneu poids lourd ?", a: "Le recreusage consiste à redonner de la profondeur aux sculptures prévues par le manufacturier sur un pneu éligible. L'objectif est de prolonger l'usage du pneu avant remplacement ou rechapage et d'améliorer le coût kilométrique de la flotte." },
  { q: "Tous les pneus peuvent-ils être recreusés ?", a: "Non. Seuls les pneus conçus pour cette opération, avec marquage REGROOVABLE et un état compatible, peuvent être recreusés. Nous vérifions la carcasse, l'usure, les réparations éventuelles et la profondeur restante avant de valider l'intervention." },
  { q: "À quel moment faut-il envisager le recreusage ?", a: "Le bon moment dépend du kilométrage, de la position sur le véhicule, de l'usage et de la sculpture restante. L'idée est d'intervenir avant qu'il ne soit trop tard pour préserver le potentiel de la carcasse et éviter de perdre de la valeur sur le pneu." },
  { q: "Le recreusage est-il sûr ?", a: "Oui, s'il est réalisé sur un pneu adapté et selon les recommandations du manufacturier. Le recreusage ne se décide pas automatiquement : un pneu non conforme ou trop abîmé est refusé." },
  { q: "Une mauvaise pression ou une surcharge peuvent-elles faire perdre le potentiel de recreusage ?", a: "Oui. Sous-gonflage, surcharge, usure irrégulière, échauffement ou roulage trop long sur une enveloppe dégradée peuvent abîmer la carcasse et faire perdre une partie de sa valeur. Le recreusage fonctionne mieux dans une logique de suivi de parc." },
  { q: "Combien coûte un recreusage ?", a: "Le tarif dépend de la dimension, du type de pneu, du volume à traiter et de l'usage du parc. Le bon raisonnement reste celui du coût d'usage global, pas seulement du prix immédiat. Demandez un devis personnalisé pour votre flotte." },
];

export function RecreusageClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://www.recacor.fr" },
        { name: "Recreusage", url: "https://www.recacor.fr/services/recreusage" },
      ]} />
      <ServiceJsonLd name="Recreusage pneus poids lourd" description="Recreusage haute qualité pour pneus PL en Hérault" />
      <FaqJsonLd items={faqs} id="recreusage" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6"><RefreshCw className="h-3 w-3 mr-1" /> Recreusage</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Recreusage pneus poids lourd{" "}
            <span className="text-purple-glow">pour mieux exploiter</span><br />
            la valeur de vos carcasses
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Le sujet n&apos;est pas seulement d&apos;économiser. Il s&apos;agit surtout de prolonger
            l&apos;usage d&apos;une enveloppe éligible, de protéger le coût au kilomètre et d&apos;éviter
            de perdre trop tôt une carcasse encore exploitable.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {["REGROOVABLE", "Carcasse", "Coût au kilomètre", "Transport / remorque", "Pression et charge"].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <PhoneLink location="hero" className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-purple-bright text-white font-bold shadow-[0_8px_30px_rgba(109,40,217,0.5)]" showIcon>
              Appeler : {PHONE_DISPLAY}
            </PhoneLink>
            <DevisCtaLink className="flex-1 items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10">
              Devis B2B <ArrowRight className="h-4 w-4" />
            </DevisCtaLink>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-14 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-white p-8 sm:p-10 shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Un service utile quand la{" "}
              <span className="text-gradient-purple">carcasse a encore du potentiel</span>
            </h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Le recreusage ne se résume pas à un prix plus bas. Pour un transporteur ou
                un gestionnaire de parc, l&apos;enjeu est surtout de prolonger l&apos;usage
                d&apos;une enveloppe éligible, de mieux tenir le coût kilométrique et
                d&apos;éviter de remplacer trop tôt une carcasse encore exploitable.
              </p>
              <p>
                Cette solution prend du sens dans une vraie logique flotte : suivi de
                l&apos;usure, lecture par essieu, bon moment d&apos;intervention et arbitrage
                entre pneu neuf, recreusage puis éventuellement rechapage.
              </p>
              <p>
                En pratique, une carcasse garde de la valeur quand le parc est suivi sérieusement :
                pression correcte, charge cohérente, contrôle après crevaison ou choc, et
                intervention avant que l&apos;usure ne détruise le potentiel du pneu. C&apos;est
                cette rigueur qui conditionne le rendement kilométrique final.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Repères avant intervention</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {signauxParc.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
              <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Découvrir les solutions pneus PL</Link>
              <Link href="/pneus-utilitaires-pl/zone-sud-corse" className="text-purple-bright hover:underline">Voir la zone Sud &amp; Corse</Link>
              <Link href="/contact" className="text-purple-bright hover:underline">Contacter Recacor</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-12">
            Les 3 gains attendus quand le <span className="text-gradient-purple">parc est bien suivi</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avantages.map((a) => (
              <div key={a.title} className="rounded-3xl border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <a.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 text-white">
            <h3 className="text-2xl font-black mb-4">Pourquoi recreuser ses pneus ?</h3>
            <ul className="space-y-2.5">
              {[
                "Solution économique pour les flottes poids lourd",
                "Démarche écologique (moins de pneus mis au rebut)",
                "Performance du pneu prolongée lorsqu'il est éligible",
                "Kilométrage supplémentaire significatif",
                "Adapté aux pneus longue distance",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-purple-glow shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {risquesCarcasse.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-white p-8">
                <h3 className="text-lg font-black tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Le recreusage, un levier pour le <span className="text-gradient-purple">coût kilométrique</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Le recreusage consiste à retirer une fine couche de gomme dans le fond des sculptures prévues
              par le fabricant. L&apos;opération redonne de la profondeur au dessin sans intervenir sur la
              carcasse. Elle permet d&apos;utiliser davantage le potentiel d&apos;un pneu poids lourd avant
              son remplacement ou son rechapage, ce qui réduit le coût par kilomètre et le volume de pneus
              mis au rebut.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-border bg-white p-7">
              <h3 className="text-lg font-black mb-3">Contrôle avant intervention</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tous les pneus ne sont pas recreusables. Le technicien vérifie le marquage REGROOVABLE,
                l&apos;état de la carcasse, l&apos;usure, les éventuelles réparations et la profondeur restante.
                Un pneu endommagé ou non prévu par le fabricant est refusé.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-7">
              <h3 className="text-lg font-black mb-3">Traçage adapté au pneu</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La largeur et la profondeur de coupe sont choisies selon les recommandations du manufacturier.
                L&apos;objectif n&apos;est pas de creuser au maximum, mais de préserver une épaisseur de gomme
                suffisante au-dessus des nappes de la carcasse.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-7">
              <h3 className="text-lg font-black mb-3">Suivi de flotte</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pour une flotte, le bon moment dépend de l&apos;essieu, du kilométrage, de l&apos;usage et du
                profil de route. Un suivi régulier permet de planifier le recreusage avant que la sculpture
                résiduelle ne soit trop faible.
              </p>
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-black tracking-tight">
              Ce qui protège vraiment le{" "}
              <span className="text-gradient-purple">potentiel de la carcasse</span>
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-base font-black mb-2">Pression suivie</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Une pression instable augmente l&apos;échauffement, accélère l&apos;usure et peut
                  faire perdre plus vite l&apos;éligibilité au recreusage. Le contrôle à froid et
                  le suivi régulier restent une base simple mais décisive.
                </p>
              </div>
              <div>
                <h3 className="text-base font-black mb-2">Charge et usage cohérents</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Surcharge, usage chantier sévère, poste mal affecté ou permutation trop tardive
                  dégradent la valeur de l&apos;enveloppe. Un pneu rentable est d&apos;abord un pneu
                  bien exploité.
                </p>
              </div>
              <div>
                <h3 className="text-base font-black mb-2">Contrôle après incident</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Après crevaison, choc, bordure ou hernie, certains dégâts peuvent rester internes.
                  Vérifier tôt permet d&apos;éviter de rouler trop longtemps sur une carcasse déjà
                  fragilisée.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Quels véhicules sont concernés ?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le service concerne principalement les pneus poids lourd destinés au transport régional,
                à la longue distance, aux remorques et à certains usages chantier. La décision se prend
                pneu par pneu : dimension, marque, position sur le véhicule et état réel déterminent
                l&apos;éligibilité. Pour plusieurs véhicules, transmettez les dimensions et les quantités
                afin d&apos;obtenir une proposition adaptée à votre parc.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Expertise PL en Hérault et livraison France</h2>
              <p className="text-muted-foreground leading-relaxed">
                Recacor accompagne les transporteurs, exploitants et gestionnaires de flotte depuis son site
                du Crès. Nous proposons le recreusage, la fourniture de pneus PL et l&apos;assistance pneumatique.
                Les pneus grandes dimensions peuvent être livrés partout en France selon les références et
                les volumes disponibles. Un expert étudie la demande et rappelle sous deux heures ouvrées.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Solutions pneus PL</Link>
                <Link href="/services/clim-camion-poids-lourd-montpellier" className="text-purple-bright hover:underline">Clim camion Montpellier agglo</Link>
                <Link href="/contact" className="text-purple-bright hover:underline">Contacter Recacor</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-black tracking-tight mb-5">Recreusage et rechapage : deux opérations différentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>
                Le recreusage prolonge l&apos;usage de la bande de roulement d&apos;origine en approfondissant
                les rainures prévues par le manufacturier. Le pneu reste sur sa carcasse et conserve sa bande
                de roulement. Cette opération intervient avant que le pneu n&apos;atteigne une usure trop
                importante et nécessite un contrôle précis de la gomme restante.
              </p>
              <p>
                Le rechapage intervient plus tard : la bande de roulement usée est remplacée sur une carcasse
                contrôlée et réutilisable. Une stratégie de flotte peut combiner pneu neuf, recreusage puis
                rechapage afin d&apos;exploiter la valeur de la carcasse sur plusieurs cycles. Recacor vous
                aide à choisir l&apos;option adaptée à l&apos;état du pneu et à son usage.
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
              Devis recreusage <span className="text-gradient-purple">B2B</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Un expert vous rappelle sous 2h en jours ouvrés</p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisPlForm />
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
