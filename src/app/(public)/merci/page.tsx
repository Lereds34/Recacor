"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Phone, Clock, Calendar } from "lucide-react";
import { pushDevisConfirmed, PHONE_DISPLAY, getUtmData } from "@/lib/tracking";
import { PhoneLink } from "@/components/phone-link";
import { BgParticles } from "@/components/bg-particles";
import { isValidPhone } from "@/components/multi-step-form";

const SLOTS = ["Dans l'heure", "Cet après-midi", "Demain matin", "Demain après-midi"];

export default function MerciPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pushDevisConfirmed();
  }, []);

  const submitRecall = async () => {
    if (!selected || !isValidPhone(phone)) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: "rappel-merci",
          service_type: "contact",
          telephone: phone,
          message: `Demande de rappel : ${selected}`,
          ...getUtmData(),
          page_source: "/merci",
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error || "Une erreur est survenue, réessayez.");
        setSubmitting(false);
        return;
      }
      setConfirmed(true);
    } catch {
      setError("Erreur réseau, réessayez.");
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero success */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
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
                <p className="text-xs text-white/40 mt-3">Lun–Ven 8h–17h · Sam 8h–12h</p>
              </div>
            </motion.div>

            {/* Planifier un rappel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl border border-border bg-white p-8"
            >
              {confirmed ? (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-5">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-black mb-2 text-green-700">
                    Rappel enregistré !
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Nous vous appellerons <strong className="text-foreground">{selected}</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-bright/[0.08] mb-5">
                    <Calendar className="w-7 h-7 text-purple-bright" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">
                    Planifier un rappel
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Choisissez l&apos;heure qui vous convient, nous vous appellerons à ce
                    moment précis.
                  </p>
                  <div className="space-y-2">
                    {SLOTS.map((slot) => {
                      const isSelected = selected === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelected(slot)}
                          className={
                            "w-full flex items-center gap-2 px-5 py-3 rounded-xl border transition-all text-sm font-medium " +
                            (isSelected
                              ? "border-purple-bright bg-purple-bright text-white shadow-md shadow-purple-bright/25"
                              : "border-border hover:border-purple-bright/30 hover:bg-purple-bright/[0.04]")
                          }
                        >
                          <Clock className={"h-4 w-4 " + (isSelected ? "text-white" : "text-purple-bright")} />
                          <span>{slot}</span>
                          {isSelected && <CheckCircle className="h-4 w-4 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3">
                          <label className="block">
                            <span className="text-xs font-semibold text-foreground/70 mb-1.5 block">
                              Votre numéro de téléphone <span className="text-purple-bright">*</span>
                            </span>
                            <input
                              type="tel"
                              autoFocus
                              placeholder="06 00 00 00 00"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright"
                            />
                          </label>
                          {error && <p className="text-xs text-red-600">{error}</p>}
                          <button
                            type="button"
                            onClick={submitRecall}
                            disabled={!isValidPhone(phone) || submitting}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            {submitting ? "Envoi..." : "Confirmer le rappel"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
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
