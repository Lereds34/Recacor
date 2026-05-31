import type { ReactNode } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { CookieBanner } from "@/components/cookie-banner";
import { UtmCapture } from "@/components/gtm";
import { PHONE_DISPLAY, PHONE_NUMBER } from "@/lib/tracking";

export default function FormulaireLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <UtmCapture />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/50 h-14 flex items-center">
        <div className="mx-auto max-w-lg w-full px-4 flex items-center justify-between">
          <Link href="/" aria-label="Recacor — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-recacor.webp" alt="Recacor" width={120} height={25} className="h-7 w-auto" />
          </Link>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-bright hover:text-purple-mid transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>
      <main className="min-h-screen">{children}</main>
      <CookieBanner />
    </>
  );
}
