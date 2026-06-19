"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplet, Filter, Wrench } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisMecaniqueForm } from "@/components/forms/devis-mecanique";
import { BgParticles } from "@/components/bg-particles";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_DISPLAY } from "@/lib/tracking";
import Link from "next/link";

const inclus = [
  { icon: Droplet, title: "Huile moteur", desc: "Huile de qualité adaptée à votre véhicule" },
  { icon: Filter, title: "Filtre à huile", desc: "Remplacement du filtre neuf inclus" },
  { icon: Wrench, title: "Main d'œuvre", desc: "Vidange réalisée en atelier en 30 min" },
];

const faqs = [
  { q: "Combien coûte une vidange chez Recacor ?", a: "Nos vidanges démarrent à 79€ (huile + filtre + main d'œuvre inclus). Le prix varie selon le véhicule et le type d'huile." },
  { q: "Faut-il prendre rendez-vous ?", a: "Non, nous acceptons les clients sans rendez-vous à Le Crès. La vidange prend environ 30 minutes." },
  { q: "Changez-vous aussi le filtre à air / habitacle ?", a: "Oui, sur demande. Nous proposons un pack complet vidange + filtres à prix avantageux." },
  { q: "Quelle huile utilisez-vous ?", a: "Nous utilisons des huiles de grandes marques (Total, Elf, Castrol, Shell) adaptées à la préconisation constructeur de votre véhicule." },
];

export function VidangeClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Accueil", url: "https://recacor.fr" },
        { name: "Services", url: "https://recacor.fr/mecanique" },
        { name: "Vidange", url: "https://recacor.fr/services/vidange" },
      ]} />
      <ServiceJsonLd name="Vidange voiture Montpellier" description="Vidange complète à partir de 79€, sans RDV" price="79" />
      <FaqJsonLd items={faqs} id="vidange" />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6"><Droplet className="h-3 w-3 mr-1" /> Vidange</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl">
            Vidange Voiture Montpellier<br />
            <span className="text-purple-glow">À partir de 79€ au Crès</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Vidange complète sans RDV. Huile + filtre inclus. Résultat en 30 minutes.
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

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-black tracking-tight text-center mb-12">
            Ce qui est <span className="text-gradient-purple">inclus</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inclus.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-3xl border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              Quand faire la <span className="text-gradient-purple">vidange de sa voiture ?</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              La vidange protège le moteur en remplaçant une huile chargée en résidus par une huile propre,
              conforme aux préconisations du constructeur. La fréquence dépend du véhicule, du kilométrage,
              du type d&apos;huile et de l&apos;usage. Les petits trajets répétés, la circulation urbaine,
              les démarrages fréquents et les fortes chaleurs sollicitent davantage l&apos;huile moteur.
              Le carnet d&apos;entretien reste la référence : sur de nombreux véhicules, l&apos;intervalle
              se situe entre 10 000 et 30 000 km ou une fois par an.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-border bg-white p-8">
              <h3 className="text-xl font-black mb-3">Les signes à surveiller</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Un voyant d&apos;entretien, une huile très sombre, un moteur plus bruyant, une consommation
                inhabituelle ou une échéance dépassée doivent inciter à faire contrôler le véhicule.
                Attendre trop longtemps dégrade la lubrification et peut accélérer l&apos;usure de pièces
                coûteuses comme le turbo ou les organes internes du moteur.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-white p-8">
              <h3 className="text-xl font-black mb-3">Une huile adaptée à chaque moteur</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Une huile 5W30, 5W40 ou 0W20 ne se choisit pas au hasard. Nos techniciens vérifient la
                viscosité et la norme demandées par le constructeur à partir du véhicule. Cette étape est
                essentielle pour les moteurs essence, diesel, turbo, hybrides et les véhicules récents
                équipés d&apos;un filtre à particules.
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Vidange simple ou vidange complète</h2>
              <p className="text-muted-foreground leading-relaxed">
                La vidange simple comprend l&apos;huile moteur, le filtre à huile et la main-d&apos;œuvre.
                Selon l&apos;âge du véhicule et son plan d&apos;entretien, une vidange complète peut aussi
                inclure le filtre à air, le filtre d&apos;habitacle ou le filtre à carburant. Nous établissons
                le devis avant l&apos;intervention : les éléments supplémentaires ne sont remplacés que
                lorsqu&apos;ils sont nécessaires et après votre accord.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-5">Vidange près de Montpellier</h2>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;atelier Recacor se trouve au 1240 Route de Nîmes au Crès, facilement accessible depuis
                Montpellier, Castelnau-le-Lez, Jacou et Vendargues. Vous pouvez venir avec ou sans rendez-vous.
                Profitez du passage à l&apos;atelier pour demander un contrôle des pneus, du freinage ou du
                parallélisme et regrouper l&apos;entretien du véhicule.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
                <Link href="/mecanique" className="text-purple-bright hover:underline">Voir nos services mécaniques</Link>
                <Link href="/services/parallelisme-geometrie" className="text-purple-bright hover:underline">Contrôler le parallélisme</Link>
                <Link href="/services/climatisation-auto-montpellier" className="text-purple-bright hover:underline">Recharge clim</Link>
                <Link href="/pneus-voiture" className="text-purple-bright hover:underline">Changer ses pneus</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-black tracking-tight mb-5">Comment se déroule une vidange chez Recacor ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>
                À votre arrivée, nous identifions le véhicule et la préconisation d&apos;huile. L&apos;ancienne
                huile est vidangée, le filtre à huile est remplacé et le moteur reçoit la quantité adaptée
                d&apos;huile neuve. Le technicien vérifie ensuite le niveau, l&apos;absence de fuite et remet
                à zéro l&apos;indicateur d&apos;entretien lorsque le véhicule le permet.
              </p>
              <p>
                Le tarif démarre à 79€ et varie principalement selon la quantité d&apos;huile, sa norme et les
                filtres demandés. La plaque d&apos;immatriculation nous permet de préparer un devis précis
                avant votre venue. Une facture détaillée vous est remise afin de conserver la date et le
                kilométrage de l&apos;intervention dans l&apos;historique d&apos;entretien. Pensez à conserver
                ce document : il facilite le suivi des prochaines échéances et constitue un justificatif utile
                lors de la revente du véhicule.
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
              Demandez votre <span className="text-gradient-purple">devis vidange</span>
            </h2>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisMecaniqueForm defaultService="Vidange simple" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">
            Questions <span className="text-gradient-purple">fréquentes</span>
          </h2>
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
