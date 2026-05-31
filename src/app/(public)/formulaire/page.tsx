import type { Metadata } from "next";
import { DevisVlForm } from "@/components/forms/devis-vl";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY } from "@/lib/tracking";
import { CheckCircle, Clock, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Devis pneus gratuit — Recacor Le Crès",
  description:
    "Obtenez votre devis pneus en 2 minutes. Recacor Le Crès vous rappelle sous 2h. Montage sans rendez-vous, à partir de 45€.",
  robots: { index: false, follow: false },
};

const BADGES = [
  { Icon: CheckCircle, label: "Devis gratuit", sub: "Sans engagement" },
  { Icon: Clock, label: "Rappel sous 2h", sub: "En jours ouvrés" },
  { Icon: Star, label: "4,8 / 5", sub: "34 avis Google" },
];

export default function FormulairePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-deep/5 to-background pt-28 pb-20">
      <div className="mx-auto max-w-lg px-4 sm:px-6">

        {/* Header conversion */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-bright/10 text-purple-bright text-xs font-semibold tracking-wider uppercase mb-3">
            Pneus · Vidange · Parallélisme
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Votre devis en{" "}
            <span className="text-purple-bright">2 minutes</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base">
            On vous rappelle avec un tarif exact. Montage sans rendez-vous au Crès.
          </p>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {BADGES.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-white p-3 text-center shadow-sm"
            >
              <Icon className="h-5 w-5 text-purple-bright" strokeWidth={1.75} />
              <p className="text-xs font-bold leading-tight">{label}</p>
              <p className="text-[10px] text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl shadow-purple-bright/[0.06]">
          <DevisVlForm />
        </div>

        {/* Appel alternatif */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Vous préférez nous parler directement ?
          </p>
          <PhoneLink
            location="formulaire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-purple-bright/30 text-purple-bright font-semibold text-sm hover:bg-purple-bright/5 transition-colors"
            showIcon
          >
            {PHONE_DISPLAY}
          </PhoneLink>
          <p className="mt-2 text-xs text-muted-foreground">
            Lun–Ven 8h–17h · Sam 8h–12h
          </p>
        </div>

      </div>
    </div>
  );
}
