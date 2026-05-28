"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";
import type { GoogleReview } from "@/app/api/google-reviews/route";

const FALLBACK_AVIS = [
  {
    author_name: "Clara R.",
    rating: 5,
    text: "Garage sérieux et équipe très accueillante. Prise en charge rapide, explications claires et travail soigné. On sent qu'ils sont honnêtes et à l'écoute, ce qui est vraiment rassurant. Je recommande sans hésiter !",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Bertrand",
    rating: 5,
    text: "J'ai éclaté un pneu sur la route et on m'a amené dans ce garage. J'ai été pris rapidement en charge pour le changement de 2 pneus avant à un prix très correct. Les pneus étaient disponibles de suite. Merci à toute l'équipe pour la réactivité.",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Charlotte M.",
    rating: 5,
    text: "Super accompagnement de la part de l'équipe et notamment de Ruben. Professionnalisme, sérieux, communication et réactivité. On ne peut que recommander ce garage !",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Olivier P.",
    rating: 5,
    text: "Garage avec une équipe sympathique. Échanges des pneus faits dans les règles de l'art. Tarifs compétitifs. Continuez comme ça, je recommande !",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Géraldine V.",
    rating: 5,
    text: "J'ai fait appel à ce garage par hasard car j'avais crevé dans le coin et quelle bonne surprise. Un service efficace et de bons conseils ! Merci beaucoup.",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "SOS Tyres",
    rating: 5,
    text: "Garage au top !! Très bien équipé avec un service très réactif, un stock important à prix très compétitif.",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Charline C.",
    rating: 5,
    text: "Très bon garage, service au top. Ruben est à l'écoute. Je recommande.",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Maxime C.",
    rating: 5,
    text: "Garage au top, de l'accueil à la prestation. Merci encore, je reviendrai.",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Jeremy D.",
    rating: 5,
    text: "Pose rapide et prix correct. Efficace !",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
  {
    author_name: "Kevin M.",
    rating: 5,
    text: "Rapide, souriant et efficace ! Je recommande vivement.",
    relative_time_description: "il y a quelques mois",
    profile_photo_url: "",
  },
];

function AvisCard({ a }: { a: GoogleReview }) {
  const initiale = a.author_name.charAt(0).toUpperCase();
  return (
    <div className="w-[360px] shrink-0 rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: a.rating }).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-purple-bright text-purple-bright" />
        ))}
        {Array.from({ length: 5 - a.rating }).map((_, j) => (
          <Star key={`e${j}`} className="w-4 h-4 text-border" />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed mb-4 line-clamp-4">
        &ldquo;{a.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {a.profile_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={a.profile_photo_url}
            alt={a.author_name}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initiale}
          </div>
        )}
        <div>
          <p className="text-sm font-bold">{a.author_name}</p>
          <p className="text-xs text-muted-foreground">{a.relative_time_description}</p>
        </div>
      </div>
    </div>
  );
}

function AvisMarquee({ items, direction }: { items: GoogleReview[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((a, i) => (
          <AvisCard key={`${a.author_name}-${i}`} a={a} />
        ))}
      </motion.div>
    </div>
  );
}

export function AvisSection() {
  const [avis, setAvis] = useState<GoogleReview[]>(FALLBACK_AVIS);
  const [rating, setRating] = useState<number>(5.0);
  const [total, setTotal] = useState<number | null>(null);
  const [source, setSource] = useState<"google" | "fallback">("fallback");

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews?.length >= 3) {
          setAvis(data.reviews);
          setRating(data.rating);
          setTotal(data.user_ratings_total);
          setSource("google");
        }
      })
      .catch(() => {});
  }, []);

  const topRow = avis.slice(0, Math.ceil(avis.length / 2));
  const bottomRow = avis.slice(Math.ceil(avis.length / 2));

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
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-purple-bright text-purple-bright" />
              ))}
            </div>
            <p className="text-muted-foreground text-lg">
              <strong className="text-foreground">{rating.toFixed(1)}</strong>
              {total ? ` · ${total} avis Google` : " · Avis Google"}
              {source === "google" && (
                <span className="ml-2 text-xs text-purple-bright font-semibold">● En direct</span>
              )}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative space-y-5">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
        <AvisMarquee items={topRow} direction="right" />
        {bottomRow.length > 0 && <AvisMarquee items={bottomRow} direction="left" />}
      </div>
    </section>
  );
}
