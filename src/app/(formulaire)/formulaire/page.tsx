import type { Metadata } from "next";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY } from "@/lib/tracking";

export const metadata: Metadata = {
  title: "Devis pneus gratuit — Recacor Le Crès",
  description:
    "Obtenez votre devis pneus en 2 minutes. Recacor Le Crès vous rappelle sous 2h. Montage sans rendez-vous, à partir de 45€.",
  robots: { index: false, follow: false },
};

export default function FormulairePage() {
  return (
    <div className="bg-gradient-to-b from-purple-deep/5 to-background pt-14 pb-12">
      <div className="mx-auto max-w-lg px-4 py-5">

        {/* Card formulaire — visible dès le chargement */}
        <div className="rounded-3xl border border-border bg-white shadow-xl shadow-purple-bright/[0.06] overflow-hidden">

          {/* Bandeau titre compact */}
          <div className="bg-gradient-to-r from-purple-deep to-purple-mid px-6 pt-5 pb-4">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">
              Recacor Le Crès · Pneus VL
            </p>
            <h1 className="text-white text-xl font-black mt-0.5 leading-tight">
              Votre devis en 2 minutes
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-white/80 text-xs">✓ Gratuit · Sans engagement</span>
              <span className="text-white/80 text-xs">★ 4,8 · 34 avis</span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="p-5 sm:p-6">
            <DevisVlForm />
          </div>
        </div>

        {/* Appel alternatif */}
        <div className="mt-5 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Vous préférez nous appeler ?
          </p>
          <PhoneLink
            location="formulaire"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-bright/30 text-purple-bright font-semibold text-sm hover:bg-purple-bright/5 transition-colors"
            showIcon
          >
            {PHONE_DISPLAY}
          </PhoneLink>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Lun–Ven 8h–17h · Sam 8h–12h
          </p>
        </div>

      </div>
    </div>
  );
}
