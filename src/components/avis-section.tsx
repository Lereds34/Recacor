"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";

const allAvis = [
  {
    name: "Clara R.",
    role: "Cliente vérifiée — Le Crès",
    text: "Garage sérieux et équipe très accueillante. Prise en charge rapide, explications claires et travail soigné. On sent qu'ils sont honnêtes et à l'écoute, ce qui est vraiment rassurant. Je recommande sans hésiter !",
    rating: 5,
  },
  {
    name: "Bertrand",
    role: "Client vérifié — Le Crès",
    text: "J'ai éclaté un pneu sur la route et on m'a amené dans ce garage. J'ai été pris rapidement en charge pour le changement de 2 pneus avant à un prix très correct. Les pneus étaient disponibles de suite. Merci à toute l'équipe pour la réactivité.",
    rating: 5,
  },
  {
    name: "Charlotte M.",
    role: "Cliente vérifiée — Le Crès",
    text: "Super accompagnement de la part de l'équipe et notamment de Ruben. Professionnalisme, sérieux, communication et réactivité. On ne peut que recommander ce garage !",
    rating: 5,
  },
  {
    name: "Olivier P.",
    role: "Local Guide Google — Le Crès",
    text: "Garage avec une équipe sympathique. Échanges des pneus faits dans les règles de l'art. Tarifs compétitifs. Continuez comme ça, je recommande !",
    rating: 5,
  },
  {
    name: "Géraldine V.",
    role: "Local Guide Google — Le Crès",
    text: "J'ai fait appel à ce garage par hasard car j'avais crevé dans le coin et quelle bonne surprise. Un service efficace et de bons conseils ! Merci beaucoup.",
    rating: 5,
  },
  {
    name: "SOS Tyres",
    role: "Professionnel vérifié — Le Crès",
    text: "Garage au top !! Très bien équipé avec un service très réactif, un stock important à prix très compétitif.",
    rating: 5,
  },
  {
    name: "Charline C.",
    role: "Cliente vérifiée — Le Crès",
    text: "Très bon garage, service au top. Ruben est à l'écoute. Je recommande.",
    rating: 5,
  },
  {
    name: "Maxime C.",
    role: "Client vérifié — Le Crès",
    text: "Garage au top, de l'accueil à la prestation. Merci encore, je reviendrai.",
    rating: 5,
  },
  {
    name: "Jeremy D.",
    role: "Local Guide Google — Le Crès",
    text: "Pose rapide et prix correct. Efficace !",
    rating: 5,
  },
  {
    name: "Kevin M.",
    role: "Client vérifié — Le Crès",
    text: "Rapide, souriant et efficace ! Je recommande vivement.",
    rating: 5,
  },
];

function AvisMarquee({ items, direction }: { items: typeof allAvis; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((a, i) => (
          <div
            key={`${a.name}-${i}`}
            className="w-[360px] shrink-0 rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: a.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-purple-bright text-purple-bright" />
              ))}
              {Array.from({ length: 5 - a.rating }).map((_, j) => (
                <Star key={`e${j}`} className="w-4 h-4 text-border" />
              ))}
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              &ldquo;{a.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center text-white text-xs font-bold">
                {a.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function AvisSection() {
  const topRow = allAvis.slice(0, 5);
  const bottomRow = allAvis.slice(5);

  return (
    <section className="relative py-28 bg-muted overflow-hidden">
      <BgParticles />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
            Témoignages
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
            Ce que disent{" "}
            <span className="text-gradient-purple">nos clients</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Ce que disent nos clients sur Google. Avis 100% authentiques.
          </p>
        </motion.div>
      </div>

      {/* Double marquee */}
      <div className="relative space-y-5">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

        <AvisMarquee items={topRow} direction="right" />
        <AvisMarquee items={bottomRow} direction="left" />
      </div>
    </section>
  );
}
