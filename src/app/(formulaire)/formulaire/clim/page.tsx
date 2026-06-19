import type { Metadata } from "next";
import { DevisClimForm } from "@/components/forms/devis-clim";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY, PHONE_MOBILE, PHONE_MOBILE_DISPLAY } from "@/lib/tracking";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Devis clim auto gratuit — Recacor Le Crès",
  description:
    "Recharge clim dès 59€, diagnostic clim gratuit, avec ou sans rendez-vous au Crès près de Montpellier.",
  robots: { index: false, follow: false },
};

export default function FormulaireClimPage() {
  return (
    <div className="bg-gradient-to-b from-purple-deep/5 to-background pt-14 pb-12">
      <div className="mx-auto max-w-lg px-4 py-5">
        <div className="rounded-3xl border border-border bg-white shadow-xl shadow-purple-bright/[0.06] overflow-hidden">
          <div className="bg-gradient-to-r from-purple-deep to-purple-mid px-6 pt-5 pb-4">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              Recacor Le Crès · Climatisation auto
            </p>
            <h1 className="text-white text-xl font-black mt-0.5 leading-tight">
              Demande clim en 2 minutes
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
              <span className="text-white/80 text-xs">✓ Diagnostic gratuit</span>
              <span className="text-white/80 text-xs">✓ Dès 59€</span>
              <span className="text-white/80 text-xs">✓ Avec ou sans RDV</span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <DevisClimForm />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Ou contactez-nous directement</p>

          <div className="flex gap-3 w-full">
            <PhoneLink
              location="formulaire"
              serviceType="mecanique"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-purple-bright/30 text-purple-bright font-semibold text-sm hover:bg-purple-bright/5 transition-colors"
              showIcon
            >
              {PHONE_DISPLAY}
            </PhoneLink>

            <a
              href={`https://wa.me/${PHONE_MOBILE.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Tél. Lun-Ven 8h-17h · Sam 8h-12h · WhatsApp {PHONE_MOBILE_DISPLAY}
          </p>
        </div>
      </div>
    </div>
  );
}
