"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { grantConsent, denyConsent, hasConsent } from "@/lib/tracking";

function TireIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="var(--recacor-ink)" />
      <circle cx="20" cy="20" r="18" fill="none" stroke="#334155" strokeWidth="1" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="#FFC928" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="4" fill="#FFC928" />
    </svg>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    if (!hasConsent()) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
    const handler = () => setVisible(true);
    window.addEventListener("recacor:cookie", handler);
    return () => window.removeEventListener("recacor:cookie", handler);
  }, []);

  const accept = () => { grantConsent(); setVisible(false); };
  const deny = () => { denyConsent(); setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[109] bg-black/60"
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[110] border-t-4 border-yellow-400 bg-[var(--recacor-night)] shadow-[0_-12px_40px_rgba(0,0,0,0.35)]"
          >
          <div className="recacor-shell flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <TireIcon />
              <div>
                <p className="font-heading text-xl font-black uppercase text-white">
                  On prend soin de vous
                </p>
                <p className="mt-1 max-w-xl text-sm leading-6 text-white/65">
                  Comme pour vos pneus, on s&apos;assure que tout roule. Ce site utilise des
                  cookies essentiels, de mesure d&apos;audience et publicitaires.
                </p>
                {details && (
                  <div className="mt-4 grid gap-2 border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
                    <p className="text-xs leading-relaxed text-white/70">
                      <strong className="text-white">Essentiels</strong> — nécessaires au fonctionnement du site.
                    </p>
                    <p className="text-xs leading-relaxed text-white/70">
                      <strong className="text-white">Analyse</strong> — Google Analytics pour mesurer l&apos;audience.
                    </p>
                    <p className="text-xs leading-relaxed text-white/70">
                      <strong className="text-white">Marketing</strong> — Meta Pixel, TikTok, Snapchat pour des publicités pertinentes.
                    </p>
                    <Link href="/confidentialite" className="text-xs font-bold text-yellow-400 hover:underline sm:col-span-3">
                      Politique de confidentialité →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setDetails((d) => !d)}
                className="text-xs font-bold uppercase text-white/50 underline-offset-2 hover:text-white hover:underline"
              >
                {details ? "Masquer les détails" : "Personnaliser"}
              </button>
              <button
                type="button"
                onClick={deny}
                className="text-xs font-bold uppercase text-white/50 underline-offset-2 hover:text-white hover:underline"
              >
                Continuer sans accepter
              </button>
              <button type="button" onClick={accept} className="recacor-btn-primary whitespace-nowrap">
                Accepter et continuer
              </button>
            </div>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
