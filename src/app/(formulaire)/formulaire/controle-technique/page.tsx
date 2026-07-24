import type { Metadata } from "next";
import { MessageCircle, CarFront, ClipboardList, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DevisControleTechniqueForm } from "@/components/forms/devis-controle-technique";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY, PHONE_MOBILE, PHONE_MOBILE_DISPLAY } from "@/lib/tracking";

export const metadata: Metadata = {
  title: "Demande contrôle technique — Recacor Le Crès",
  description:
    "Demandez votre prise en charge contrôle technique en 2 minutes. Pré-contrôle offert et rappel rapide par Recacor Le Crès.",
  robots: { index: false, follow: false },
};

export default function FormulaireControleTechniquePage() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#061A31_0%,#2E2D8A_48%,#F6F7FB_100%)] pt-20 pb-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,40,0.16),transparent_28%),radial-gradient(circle_at_80%_16%,rgba(255,255,255,0.12),transparent_18%)]" />
      <div className="relative mx-auto max-w-xl px-4 py-5">
        <div className="mb-6 text-white">
          <Badge className="mb-4 border-white/15 bg-white/10 text-white">
            <CarFront className="mr-1 h-3 w-3" /> Contrôle technique
          </Badge>
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Demande de prise en charge
            <br />
            <span className="text-purple-glow">contrôle technique</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80">
            Recacor vous rappelle, prépare le véhicule avant passage et vous transmet un
            devis clair si une réparation est nécessaire.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-[4px] border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              <ClipboardList className="mr-1 inline h-3.5 w-3.5" />
              Pré-contrôle gratuit
            </div>
            <div className="rounded-[4px] border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />
              VL dès 87,22€
            </div>
            <div className="rounded-[4px] border border-white/12 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              Utilitaire dès 97,02€
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[4px] border border-white/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
          <div className="bg-[linear-gradient(135deg,#061A31_0%,#2E2D8A_60%,#1B4FD8_100%)] px-6 pt-5 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Recacor Le Crès · Contrôle technique
            </p>
            <h2 className="mt-0.5 text-xl font-black leading-tight text-white">
              Votre demande en 2 minutes
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs text-white/80">✓ Pré-contrôle gratuit</span>
              <span className="text-xs text-white/80">✓ VL ou utilitaire</span>
              <span className="text-xs text-white/80">✓ Rappel rapide</span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <DevisControleTechniqueForm />
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col items-center gap-3">
          <p className="text-sm text-white/80">Ou contactez-nous directement</p>

          <div className="flex w-full gap-3">
            <PhoneLink
              location="formulaire"
              serviceType="mecanique"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              showIcon
            >
              {PHONE_DISPLAY}
            </PhoneLink>

            <a
              href={`https://wa.me/${PHONE_MOBILE.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-white/65">
            Tél. Lun–Ven 8h–17h · Sam 8h–12h · WhatsApp {PHONE_MOBILE_DISPLAY}
          </p>
        </div>
      </div>
    </div>
  );
}
