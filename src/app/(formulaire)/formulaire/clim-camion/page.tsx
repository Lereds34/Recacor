import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { DevisClimPlForm } from "@/components/forms/devis-clim-pl";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY, PHONE_WHATSAPP_PL, PHONE_WHATSAPP_PL_DISPLAY } from "@/lib/tracking";

export const metadata: Metadata = {
  title: "Demande clim camion et poids lourd — Recacor Le Crès",
  description:
    "Demande clim camion et poids lourd dès 149€. Offre réservée aux PL, TP et agricoles au garage du Crès ou sur site.",
  robots: { index: false, follow: false },
};

export default function FormulaireClimCamionPage() {
  return (
    <div className="bg-gradient-to-b from-purple-deep/5 to-background pt-14 pb-12">
      <div className="mx-auto max-w-lg px-4 py-5">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl shadow-purple-bright/[0.06]">
          <div className="bg-gradient-to-r from-purple-deep to-purple-mid px-6 pt-5 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Recacor Le Crès · Clim camion et poids lourd
            </p>
            <h1 className="mt-0.5 text-xl font-black leading-tight text-white">
              Demande clim pro en 2 minutes
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-xs text-white/80">✓ Dès 149€</span>
              <span className="text-xs text-white/80">✓ Garage ou sur site</span>
              <span className="text-xs text-white/80">✓ Poids lourd · TP · agricole</span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <DevisClimPlForm />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Ou contactez-nous directement</p>

          <div className="flex w-full gap-3">
            <PhoneLink
              location="formulaire"
              serviceType="pl"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-bright/30 px-4 py-3 text-sm font-semibold text-purple-bright transition-colors hover:bg-purple-bright/5"
              showIcon
            >
              {PHONE_DISPLAY}
            </PhoneLink>

            <a
              href={`https://wa.me/${PHONE_WHATSAPP_PL.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Tél. Lun-Ven 8h-17h · Sam 8h-12h · WhatsApp {PHONE_WHATSAPP_PL_DISPLAY}
          </p>
        </div>
      </div>
    </div>
  );
}
