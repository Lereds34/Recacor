"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidPhone, isValidEmail } from "../multi-step-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Truck, Leaf, Shield, RefreshCw, Zap } from "lucide-react";

const SERVICES = [
  { value: "pneus_pl", label: "Pneus PL", Icon: Truck },
  { value: "pneus_agricoles", label: "Pneus agricoles", Icon: Leaf },
  { value: "pneus_industriels", label: "Pneus industriels", Icon: Shield },
  { value: "recreusage", label: "Recreusage", Icon: RefreshCw },
  { value: "assistance_site", label: "Assistance sur site", Icon: Zap },
];

const QUANTITES = ["1-5", "6-20", "20+"];
const URGENCES = ["Dès que possible", "Sous 48h", "Pas urgent"];

type PlData = {
  service: string;
  vehicule: string;
  quantite: string;
  urgence: string;
  nom: string;
  prenom: string;
  entreprise: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: PlData = {
  service: "",
  vehicule: "",
  quantite: "",
  urgence: "",
  nom: "",
  prenom: "",
  entreprise: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

export function DevisPlForm() {
  const [data, setData] = useState<PlData>(initial);
  const update = <K extends keyof PlData>(key: K, value: PlData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const select =
    "w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright";

  const isValid = (step: number) => {
    if (step === 0) return true;
    if (step === 1) return isValidPhone(data.telephone) && isValidEmail(data.email);
    return true;
  };

  return (
    <MultiStepForm
      id="devis-pl-form"
      serviceType="pl"
      data={data}
      isValid={isValid}
      submitLabel="Envoyer ma demande professionnelle"
      extraMention="Un expert Recacor vous rappelle sous 2h en jours ouvrés."
      steps={[
        {
          title: "Votre besoin professionnel",
          content: (
            <div className="space-y-4">
              <FormField label="Type de service">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => update("service", s.value)}
                      className={cn(
                        "rounded-xl border p-3 text-xs font-medium transition-all flex flex-col items-center gap-2",
                        data.service === s.value
                          ? "border-purple-bright bg-purple-bright/10 text-purple-bright"
                          : "border-border hover:border-purple-bright/30"
                      )}
                    >
                      <s.Icon className="h-5 w-5" strokeWidth={1.75} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </FormField>
              <FormField label="Type de véhicule / engin">
                <Input placeholder="ex. Semi-remorque, tracteur John Deere, chariot élévateur" value={data.vehicule} onChange={(e) => update("vehicule", e.target.value)} className="h-11" />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Quantité estimée">
                  <select value={data.quantite} onChange={(e) => update("quantite", e.target.value)} className={select}>
                    <option value="">—</option>
                    {QUANTITES.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </FormField>
                <FormField label="Urgence">
                  <select value={data.urgence} onChange={(e) => update("urgence", e.target.value)} className={select}>
                    <option value="">—</option>
                    {URGENCES.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </FormField>
              </div>
            </div>
          ),
        },
        {
          title: "Vos coordonnées professionnelles",
          subtitle: "Téléphone et email sont requis pour vous recontacter",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Nom">
                  <Input value={data.nom} onChange={(e) => update("nom", e.target.value)} className="h-11" />
                </FormField>
                <FormField label="Prénom">
                  <Input value={data.prenom} onChange={(e) => update("prenom", e.target.value)} className="h-11" />
                </FormField>
              </div>
              <FormField label="Entreprise / Raison sociale">
                <Input value={data.entreprise} onChange={(e) => update("entreprise", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Téléphone" required>
                <Input type="tel" placeholder="06 00 00 00 00" value={data.telephone} onChange={(e) => update("telephone", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Email" required>
                <Input type="email" placeholder="vous@entreprise.fr" value={data.email} onChange={(e) => update("email", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Code postal">
                <Input placeholder="34920" maxLength={5} value={data.cp} onChange={(e) => update("cp", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Détail du besoin (optionnel)">
                <textarea rows={4} maxLength={1000} value={data.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none" />
              </FormField>
            </div>
          ),
        },
        { title: "Confirmation", content: null },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          {data.service && <div className="flex justify-between"><dt className="text-muted-foreground">Service</dt><dd className="font-semibold">{SERVICES.find(s => s.value === data.service)?.label}</dd></div>}
          {data.quantite && <div className="flex justify-between"><dt className="text-muted-foreground">Quantité</dt><dd className="font-semibold">{data.quantite}</dd></div>}
          {data.urgence && <div className="flex justify-between"><dt className="text-muted-foreground">Urgence</dt><dd className="font-semibold">{data.urgence}</dd></div>}
          {data.entreprise && <div className="flex justify-between"><dt className="text-muted-foreground">Entreprise</dt><dd className="font-semibold">{data.entreprise}</dd></div>}
          <div className="flex justify-between"><dt className="text-muted-foreground">Contact</dt><dd className="font-semibold">{data.telephone}</dd></div>
        </dl>
      }
    />
  );
}
