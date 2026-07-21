"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ClipboardList } from "lucide-react";
import Link from "next/link";
import { PHONE_NUMBER, pushPhoneClick } from "@/lib/tracking";

export function StickyCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="lg:hidden fixed bottom-4 left-4 right-4 z-[100] flex gap-3"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <a
            id="sticky-call-btn"
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => pushPhoneClick("sticky")}
            className="phone-link flex-1 flex items-center justify-center gap-2 rounded-[4px] bg-[var(--recacor-night)] text-white font-black uppercase py-4 shadow-[0_8px_30px_rgba(7,27,51,0.24)]"
          >
            <Phone className="h-5 w-5" />
            Appeler
          </a>
          <Link
            href="/formulaire"
            className="flex-1 flex items-center justify-center gap-2 rounded-[4px] bg-yellow-400 text-slate-950 font-black uppercase py-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-yellow-500/30"
          >
            <ClipboardList className="h-5 w-5" />
            Devis gratuit
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
