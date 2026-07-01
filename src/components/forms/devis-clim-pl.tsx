"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidPhone, isValidEmail } from "../multi-step-form";
import { Input } from "@/components/ui/input";

type ClimPlData = {
  typeVehicule: string;
  besoinClim: string;
  lieuIntervention: string;
  entreprise: string;
  modele: string;
  plaque: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: ClimPlData = {
  typeVehicule: "",
  besoinClim: "",
  lieuIntervention: "",
  entreprise: "",
  modele: "",
  plaque: "",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

const TYPES_VEHICULES = [
  "Camion porteur",
  "Tracteur routier / semi-remorque",
  "Engin TP",
  "Véhicule agricole",
  "Utilitaire grand volume / autre véhicule pro",
];

const BESOINS_CLIM = [
  "La clim ne refroidit plus",
  "La clim refroidit moins qu'avant",
  "Je veux une recharge clim",
  "Je veux un contrôle de performance",
  "Autre besoin",
];

const LIEUX = [
  "Au garage du Crès",
  "Sur site à Montpellier",
  "Sur site agglomération Montpellier",
  "À confirmer par téléphone",
];

export function DevisClimPlForm() {
  const [data, setData] = useState<ClimPlData>(initial);
  const update = <K extends keyof ClimPlData>(key: K, value: ClimPlData[K]) =>
    setData((current) => ({ ...current, [key]: value }));

  const optionButton = (active: boolean) =>
    `w-full min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
      active
        ? "border-purple-bright bg-purple-bright/10 text-purple-bright"
        : "border-border bg-background text-foreground hover:border-purple-bright/40"
    }`;

  const renderOptionGroup = <K extends keyof ClimPlData>({
    field,
    options,
  }: {
    field: K;
    options: string[];
  }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => update(field, option as ClimPlData[K])}
          className={optionButton(data[field] === option)}
          aria-pressed={data[field] === option}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const isValid = (step: number) => {
    if (step === 0) return Boolean(data.typeVehicule && data.besoinClim && data.lieuIntervention);
    if (step === 1) return true;
    if (step === 2) return isValidPhone(data.telephone) && (!data.email || isValidEmail(data.email));
    return true;
  };

  return (
    <MultiStepForm
      id="devis-clim-pl-form"
      serviceType="pl"
      data={{ ...data, service: "Clim camion / poids lourd" }}
      isValid={isValid}
      submitLabel="Envoyer ma demande clim pro"
      extraMention="Offre réservée aux poids lourds, TP et agricoles · Dès 149€"
      steps={[
        {
          title: "Votre besoin clim pro",
          subtitle: "Dites-nous quel véhicule et quel type d'intervention vous cherchez",
          content: (
            <div className="space-y-6">
              <FormField label="Quel type de véhicule ?" required>
                {renderOptionGroup({ field: "typeVehicule", options: TYPES_VEHICULES })}
              </FormField>
              <FormField label="Quel est votre besoin ?" required>
                {renderOptionGroup({ field: "besoinClim", options: BESOINS_CLIM })}
              </FormField>
              <FormField label="Où souhaitez-vous l'intervention ?" required>
                {renderOptionGroup({ field: "lieuIntervention", options: LIEUX })}
              </FormField>
            </div>
          ),
        },
        {
          title: "Véhicule et contexte",
          subtitle: "Ces infos nous aident à préparer la prise en charge",
          content: (
            <div className="space-y-4">
              <FormField label="Entreprise">
                <Input
                  placeholder="Nom de société"
                  value={data.entreprise}
                  onChange={(e) => update("entreprise", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Modèle / véhicule">
                <Input
                  placeholder="ex. Renault Trucks T, tracteur John Deere..."
                  value={data.modele}
                  onChange={(e) => update("modele", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Plaque d'immatriculation">
                <Input
                  placeholder="AA-000-AA"
                  value={data.plaque}
                  onChange={(e) => update("plaque", e.target.value.toUpperCase())}
                  className="h-11"
                />
              </FormField>
              <FormField label="Message (optionnel)">
                <textarea
                  rows={4}
                  maxLength={500}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none"
                  placeholder="Lieu exact d'intervention, horaires, précision sur la panne..."
                />
              </FormField>
            </div>
          ),
        },
        {
          title: "Vos coordonnées",
          subtitle: "Le téléphone est requis pour vous rappeler rapidement",
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
                <Input
                  type="tel"
                  placeholder="06 00 00 00 00"
                  value={data.telephone}
                  onChange={(e) => update("telephone", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Email">
                <Input
                  type="email"
                  placeholder="vous@email.fr"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Code postal">
                <Input
                  placeholder="34920"
                  maxLength={5}
                  value={data.cp}
                  onChange={(e) => update("cp", e.target.value)}
                  className="h-11"
                />
              </FormField>
            </div>
          ),
        },
        { title: "Confirmation", content: null },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          {data.typeVehicule && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Véhicule</dt>
              <dd className="font-semibold text-right">{data.typeVehicule}</dd>
            </div>
          )}
          {data.besoinClim && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Besoin</dt>
              <dd className="font-semibold text-right">{data.besoinClim}</dd>
            </div>
          )}
          {data.lieuIntervention && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Lieu</dt>
              <dd className="font-semibold text-right">{data.lieuIntervention}</dd>
            </div>
          )}
          {data.modele && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Modèle</dt>
              <dd className="font-semibold text-right">{data.modele}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Contact</dt>
            <dd className="font-semibold text-right">{data.telephone}</dd>
          </div>
          {data.email && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-semibold text-right truncate max-w-[60%]">{data.email}</dd>
            </div>
          )}
        </dl>
      }
    />
  );
}
