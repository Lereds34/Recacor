"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidPhone, isValidEmail } from "../multi-step-form";
import { Input } from "@/components/ui/input";

type ClimData = {
  serviceClim: string;
  etatClim: string;
  dernierEntretien: string;
  serviceComplementaire: string;
  modele: string;
  plaque: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: ClimData = {
  serviceClim: "",
  etatClim: "",
  dernierEntretien: "",
  serviceComplementaire: "",
  modele: "",
  plaque: "",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

const SERVICES_CLIM = [
  "Recharge de climatisation",
  "Diagnostic climatisation",
  "Entretien complet (recharge + contrôle)",
];

const ETATS_CLIM = [
  "Elle ne refroidit plus",
  "Elle refroidit moins qu'avant",
  "Bruit anormal",
  "Mauvaise odeur",
  "Elle fonctionne, je veux un entretien",
];

const DERNIERS_ENTRETIENS = [
  "Moins de 1 an",
  "1 à 2 ans",
  "Plus de 2 ans",
  "Jamais",
  "Je ne sais pas",
];

const SERVICES_COMPLEMENTAIRES = [
  "Non",
  "Vidange",
  "Disque / plaquette",
  "Parallélisme",
  "Géométrie",
  "Pneus",
];

export function DevisClimForm() {
  const [data, setData] = useState<ClimData>(initial);
  const update = <K extends keyof ClimData>(key: K, value: ClimData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const optionButton = (active: boolean) =>
    `w-full min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
      active
        ? "border-purple-bright bg-purple-bright/10 text-purple-bright"
        : "border-border bg-background text-foreground hover:border-purple-bright/40"
    }`;

  const renderOptionGroup = <K extends keyof ClimData>({
    field,
    options,
  }: {
    field: K;
    options: string[];
  }) => (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => update(field, opt as ClimData[K])}
          className={optionButton(data[field] === opt)}
          aria-pressed={data[field] === opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const isValid = (step: number) => {
    if (step === 0) return Boolean(data.serviceClim && data.etatClim);
    if (step === 1) return true;
    if (step === 2) return isValidPhone(data.telephone) && isValidEmail(data.email);
    return true;
  };

  return (
    <MultiStepForm
      id="devis-clim-form"
      serviceType="mecanique"
      data={{ ...data, service: "Climatisation auto" }}
      isValid={isValid}
      submitLabel="Envoyer ma demande clim"
      extraMention="Diagnostic clim gratuit · Recharge à partir de 59€ · Avec ou sans rendez-vous"
      steps={[
        {
          title: "Votre demande clim",
          subtitle: "Choisissez le service et l'état de votre climatisation",
          content: (
            <div className="space-y-6">
              <FormField label="Quel service de climatisation souhaitez-vous ?" required>
                {renderOptionGroup({ field: "serviceClim", options: SERVICES_CLIM })}
              </FormField>
              <FormField label="Quel est l'état de votre climatisation ?" required>
                {renderOptionGroup({ field: "etatClim", options: ETATS_CLIM })}
              </FormField>
            </div>
          ),
        },
        {
          title: "Véhicule et entretien",
          subtitle: "Ces infos nous aident à préparer le passage atelier",
          content: (
            <div className="space-y-6">
              <FormField label="Dernier entretien de votre climatisation ?">
                {renderOptionGroup({ field: "dernierEntretien", options: DERNIERS_ENTRETIENS })}
              </FormField>
              <FormField label="Modèle de véhicule">
                <Input placeholder="ex. Peugeot 208, Renault Clio" value={data.modele} onChange={(e) => update("modele", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Plaque d'immatriculation">
                <Input placeholder="AA-000-AA" value={data.plaque} onChange={(e) => update("plaque", e.target.value.toUpperCase())} className="h-11" />
              </FormField>
              <FormField label="Souhaitez-vous ajouter un service complémentaire ?">
                {renderOptionGroup({ field: "serviceComplementaire", options: SERVICES_COMPLEMENTAIRES })}
              </FormField>
            </div>
          ),
        },
        {
          title: "Vos coordonnées",
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
              <FormField label="Téléphone" required>
                <Input type="tel" placeholder="06 00 00 00 00" value={data.telephone} onChange={(e) => update("telephone", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Email" required>
                <Input type="email" placeholder="vous@email.fr" value={data.email} onChange={(e) => update("email", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Code postal">
                <Input placeholder="34920" maxLength={5} value={data.cp} onChange={(e) => update("cp", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Message (optionnel)">
                <textarea
                  rows={3}
                  maxLength={500}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none"
                  placeholder="Précisions utiles..."
                />
              </FormField>
            </div>
          ),
        },
        { title: "Confirmation", content: null },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          {data.serviceClim && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Service</dt><dd className="font-semibold text-right">{data.serviceClim}</dd></div>}
          {data.etatClim && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">État clim</dt><dd className="font-semibold text-right">{data.etatClim}</dd></div>}
          {data.dernierEntretien && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Dernier entretien</dt><dd className="font-semibold text-right">{data.dernierEntretien}</dd></div>}
          {data.serviceComplementaire && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Service complémentaire</dt><dd className="font-semibold text-right">{data.serviceComplementaire}</dd></div>}
          {data.modele && <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Véhicule</dt><dd className="font-semibold text-right">{data.modele}</dd></div>}
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Contact</dt><dd className="font-semibold text-right">{data.telephone}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Email</dt><dd className="font-semibold text-right truncate max-w-[60%]">{data.email}</dd></div>
        </dl>
      }
    />
  );
}
