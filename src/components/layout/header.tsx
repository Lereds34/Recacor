"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY } from "@/lib/tracking";
import { useAssetUrl } from "@/components/dynamic-media";

const navigation = [
  { name: "Pneus voiture", href: "/pneus-voiture" },
  { name: "Mécanique", href: "/mecanique" },
  { name: "Pneus PL", href: "/pneus-utilitaires-pl" },
  { name: "Notre garage", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  // Maquette retirée
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoUrl = useAssetUrl("site_logo", "/logo-recacor.webp");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top info bar */}
      <div className={cn(
        "hidden lg:block fixed top-0 left-0 right-0 z-[51] transition-transform duration-500",
        scrolled ? "-translate-y-full" : "translate-y-0"
      )}>
        <div className="bg-purple-deep text-white text-xs py-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-purple-glow" /> 1240 Route de Nîmes, 34920 Le Crès</span>
              <span className="text-white/50">Lun–Ven 8h–17h · Sam 8h–12h</span>
            </div>
            <PhoneLink location="header" className="flex items-center gap-1.5 font-semibold hover:text-purple-glow transition-colors">
              <Phone className="h-3 w-3" /> {PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 bg-white/90 backdrop-blur-xl shadow-[0_1px_30px_rgba(109,40,217,0.08)] border-b border-purple-bright/10"
            : "top-8 bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="Recacor — Accueil">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="Recacor"
                width={153}
                height={32}
                className={cn(
                  "h-7 sm:h-8 w-auto transition-all",
                  scrolled ? "" : "brightness-0 invert"
                )}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    scrolled
                      ? "text-foreground/70 hover:text-purple-bright"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <PhoneLink
                location="header"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid transition-colors ml-2"
                showIcon
              >
                Appeler
              </PhoneLink>
            </nav>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className={cn(
                "lg:hidden relative z-50 p-2 rounded-xl transition-colors",
                open ? "text-white" : scrolled ? "text-foreground" : "text-white"
              )}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-purple-deep overflow-y-auto"
          >
            <nav className="min-h-full flex flex-col items-center justify-center gap-2 py-32">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-3xl font-bold text-white/70 hover:text-white transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navigation.length * 0.08 }} className="mt-8">
                <PhoneLink
                  location="header"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-purple-deep font-bold text-lg"
                  showIcon
                >
                  {PHONE_DISPLAY}
                </PhoneLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
