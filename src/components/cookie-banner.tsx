"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { grantConsent, denyConsent, hasConsent } from "@/lib/tracking";

function TireIllustration() {
  const treads = Array.from({ length: 12 }, (_, i) => {
    const a1 = ((i * 30 - 14) * Math.PI) / 180;
    const a2 = ((i * 30 + 14) * Math.PI) / 180;
    const r1 = 71, r2 = 90;
    const pts = [
      [100 + r1 * Math.cos(a1), 100 + r1 * Math.sin(a1)],
      [100 + r2 * Math.cos(a1), 100 + r2 * Math.sin(a1)],
      [100 + r2 * Math.cos(a2), 100 + r2 * Math.sin(a2)],
      [100 + r1 * Math.cos(a2), 100 + r1 * Math.sin(a2)],
    ];
    return pts.map((p) => p.join(",")).join(" ");
  });
  const spokes = Array.from({ length: 5 }, (_, i) => {
    const a = ((i * 72 + 18) * Math.PI) / 180;
    return {
      x1: 100 + 22 * Math.cos(a), y1: 100 + 22 * Math.sin(a),
      x2: 100 + 62 * Math.cos(a), y2: 100 + 62 * Math.sin(a),
    };
  });

  return (
    <svg viewBox="0 0 200 200" className="w-28 h-28 drop-shadow-xl" aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="#111827" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#374151" strokeWidth="1.5" />
      {treads.map((pts, i) => (
        <polygon key={i} points={pts} fill={i % 2 === 0 ? "#7C3AED" : "#2D1460"} stroke="#1a1040" strokeWidth="0.8" />
      ))}
      <circle cx="100" cy="100" r="68" fill="#1F2937" stroke="#374151" strokeWidth="2" />
      <circle cx="100" cy="100" r="64" fill="#111827" />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="#A78BFA" strokeWidth="5" strokeLinecap="round" />
      ))}
      <circle cx="100" cy="100" r="22" fill="#1F2937" stroke="#6D28D9" strokeWidth="3" />
      <circle cx="100" cy="100" r="10" fill="#A78BFA" />
      <circle cx="100" cy="100" r="4" fill="#EDE9FE" />
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
            className="fixed inset-0 z-[110] bg-black/60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[111] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-purple-deep/40">
              <div className="bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright px-8 pt-8 pb-6 flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 rounded-full bg-purple-glow/20 blur-2xl scale-150" />
                  <TireIllustration />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  On prend soin de vous
                </h2>
                <p className="mt-2 text-sm text-white/70 max-w-xs leading-relaxed">
                  Comme pour vos pneus, on s&apos;assure que tout roule.
                  Acceptez les cookies pour une expérience optimale.
                </p>
              </div>
              <div className="bg-white px-8 py-6">
                {details && (
                  <div className="mb-5 space-y-2.5 rounded-2xl bg-purple-bright/5 border border-purple-bright/10 p-4">
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      <strong className="text-foreground">Essentiels</strong> — nécessaires au fonctionnement du site.
                    </p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      <strong className="text-foreground">Analyse</strong> — Google Analytics pour mesurer l&apos;audience.
                    </p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      <strong className="text-foreground">Marketing</strong> — Meta Pixel, TikTok, Snapchat pour des publicités pertinentes.
                    </p>
                    <Link href="/confidentialite" className="text-xs text-purple-bright hover:underline inline-block">
                      Politique de confidentialité →
                    </Link>
                  </div>
                )}
                <button
                  onClick={accept}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-mid to-purple-bright text-white font-black text-base shadow-[0_8px_24px_rgba(109,40,217,0.35)] hover:shadow-[0_12px_32px_rgba(109,40,217,0.5)] hover:scale-[1.02] transition-all"
                >
                  ✓ Accepter et continuer
                </button>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setDetails(!details)}
                    className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                  >
                    {details ? "Masquer les détails" : "Personnaliser"}
                  </button>
                  <button
                    onClick={deny}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continuer sans accepter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
