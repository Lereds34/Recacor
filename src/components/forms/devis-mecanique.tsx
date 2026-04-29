"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidPhone, isValidEmail } from "../multi-step-form";
import { Input } from "@/components/ui/input";

const SERVICE_GROUPS: { label: string; options: string[] }[] = [
  {
    label: "Freinage",
    options: [
      "Plaquettes avant",
      "Plaquettes arrière",
      "Disques + plaquettes avant",
      "Disques + plaquettes arrière",
      "Freinage complet (4 roues)",
    ],
  },
  {
    label: "Vidange",
    options: ["Vidange simple", "Vidange complète (avec filtres)"],
  },
  {
    label: "Géométrie",
    options: ["Contrôle parallélisme", "Parallélisme + réglage"],
  },
  {
    label: "Autre",
    options: ["Révision complète", "Autre (préciser dans le message)"],
  },
];

type MecData = {
  service: string;
  modele: string;
  plaque: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: MecData = {
  service: "",
  modele: "",
  plaque: "",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

export function DevisMecaniqueForm({ defaultService }: { defaultService?: string }) {
  const [data, setData] = useState<MecData>({ ...initial, service: defaultService || "" });
  const update = <K extends keyof MecData>(key: K, value: MecData[K]) =>
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
      id="devis-mecanique-form"
      serviceType="mecanique"
      data={data}
      isValid={isValid}
      steps={[
        {
          title: "Votre véhicule & besoin",
          content: (
            <div className="space-y-4">
              <FormField label="Type de service">
                <select value={data.service} onChange={(e) => update("service", e.target.value)} className={select}>
                  <option value="">Choisir un service</option>
                  {SERVICE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((opt) => <option key={opt}>{opt}</option>)}
                    </optgroup>
                  ))}
                </select>
              </FormField>
              <FormField label="Modèle de véhicule">
                <Input placeholder="ex. Renault Clio, VW Polo" value={data.modele} onChange={(e) => update("modele", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Plaque d'immatriculation">
                <Input placeholder="AA-000-AA" value={data.plaque} onChange={(e) => update("plaque", e.target.value.toUpperCase())} className="h-11" />
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
                <textarea rows={3} maxLength={500} value={data.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none" />
              </FormField>
            </div>
          ),
        },
        { title: "Confirmation", content: null },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          {data.service && <div className="flex justify-between"><dt className="text-muted-foreground">Service</dt><dd className="font-semibold">{data.service}</dd></div>}
          {data.modele && <div className="flex justify-between"><dt className="text-muted-foreground">Véhicule</dt><dd className="font-semibold">{data.modele}</dd></div>}
          <div className="flex justify-between"><dt className="text-muted-foreground">Contact</dt><dd className="font-semibold">{data.telephone}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd className="font-semibold truncate max-w-[60%]">{data.email}</dd></div>
        </dl>
      }
    />
  );
}
