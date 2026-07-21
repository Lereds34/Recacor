"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Phone, Calendar, ArrowRight } from "lucide-react";
import { PHONE_DISPLAY, PHONE_MOBILE } from "@/lib/tracking";
import { PhoneLink } from "@/components/phone-link";
import { BgParticles } from "@/components/bg-particles";

const CALENDAR_URL = "https://calendar.app.google/hHtajz9kMDfbozaUA";

export default function MerciPage() {
  return (
    <>
      {/* Hero success */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-overlay-solid" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "conic-gradient(from 0deg, transparent 0%, white 1%, transparent 3%)" }} />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <CheckCircle className="w-12 h-12 text-purple-glow" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
          >
            Merci, votre demande a{" "}
            <span className="text-purple-glow">bien été reçue !</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-white/70 text-lg max-w-xl mx-auto"
          >
            On vous recontacte très rapidement. En attendant, voici quelques options
            pour avancer tout de suite.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Next actions */}
      <section className="relative py-20 bg-background overflow-hidden">
        <BgParticles />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Appeler maintenant */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-8 text-white overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }} />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 mb-5">
                  <Phone className="w-7 h-7 text-purple-glow" />
                </div>
                <h2 className="text-2xl font-black mb-2">
                  Vous préférez nous appeler maintenant ?
                </h2>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Notre équipe au Crès est disponible dès maintenant pour répondre à
                  vos questions.
                </p>
                <PhoneLink
                  location="cta"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow"
                  showIcon
                >
                  {PHONE_DISPLAY}
                </PhoneLink>
                <a
                  href={`https://wa.me/${PHONE_MOBILE.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:opacity-90 transition-opacity mt-3"
                >
                  💬 WhatsApp
                </a>
                <p className="text-xs text-white/40 mt-3">Lun–Ven 8h–17h · Sam 8h–12h</p>
              </div>
            </motion.div>

            {/* Planifier un rappel Google Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl border border-border bg-white p-8 flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-bright/[0.08] mb-5">
                <Calendar className="w-7 h-7 text-purple-bright" />
              </div>
              <h2 className="text-2xl font-black mb-2">
                Être rappelé dans l&apos;heure
              </h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Réservez un créneau directement dans notre agenda. Vous recevrez une
                confirmation par email et nous vous appelons à l&apos;heure choisie.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Créneau confirmé instantanément",
                  "Rappel email automatique",
                  "Disponible Lun–Ven 8h–17h · Sam 8h–12h",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-bright shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Choisir mon créneau
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Retour accueil */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-bright transition-colors"
            >
              ← Retour à l&apos;accueil
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
