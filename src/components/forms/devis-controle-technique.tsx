"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidEmail, isValidPhone } from "../multi-step-form";
import { Input } from "@/components/ui/input";

const REQUEST_OPTIONS = [
  "Contrôle technique VL",
  "Contrôle technique utilitaire",
  "Besoin d'un rappel",
] as const;

const KNOWN_ISSUES = [
  "Pneus",
  "Freinage",
  "Vidange / entretien",
  "Parallélisme / tenue de route",
  "Voyant / autre",
] as const;

const DELIVERY_OPTIONS = [
  "Déposer au garage",
  "Être rappelé d'abord",
] as const;

type ControleTechniqueData = {
  typeDemande: string;
  plaque: string;
  modele: string;
  dateLimiteCt: string;
  pointsConnus: string[];
  roulable: string;
  preferencePriseEnCharge: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: ControleTechniqueData = {
  typeDemande: "Contrôle technique VL",
  plaque: "",
  modele: "",
  dateLimiteCt: "",
  pointsConnus: [],
  roulable: "Oui",
  preferencePriseEnCharge: "Déposer au garage",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

export function DevisControleTechniqueForm() {
  const [data, setData] = useState<ControleTechniqueData>(initial);

  const update = <K extends keyof ControleTechniqueData>(
    key: K,
    value: ControleTechniqueData[K],
  ) => setData((prev) => ({ ...prev, [key]: value }));

  const toggleKnownIssue = (value: string) => {
    setData((prev) => ({
      ...prev,
      pointsConnus: prev.pointsConnus.includes(value)
        ? prev.pointsConnus.filter((item) => item !== value)
        : [...prev.pointsConnus, value],
    }));
  };

  const selectClass =
    "w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright";

  const isValid = (step: number) => {
    if (step === 0) return true;
    if (step === 1) return isValidPhone(data.telephone) && isValidEmail(data.email);
    return true;
  };

  return (
    <MultiStepForm
      id="devis-ct-form"
      serviceType="mecanique"
      data={{
        ...data,
        service: "Contrôle technique",
        source_detail: "controle_technique_prise_en_charge",
      }}
      isValid={isValid}
      extraMention="Le pré-contrôle est offert. Si un point empêche le passage au contrôle technique, un devis est communiqué avant toute réparation."
      steps={[
        {
          title: "Votre véhicule & besoin",
          subtitle: "Quelques informations suffisent pour préparer la prise en charge",
          content: (
            <div className="space-y-4">
              <FormField label="Type de demande">
                <select
                  value={data.typeDemande}
                  onChange={(e) => update("typeDemande", e.target.value)}
                  className={selectClass}
                >
                  {REQUEST_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Plaque d'immatriculation">
                  <Input
                    placeholder="AA-000-AA"
                    value={data.plaque}
                    onChange={(e) => update("plaque", e.target.value.toUpperCase())}
                    className="h-11"
                  />
                </FormField>
                <FormField label="Marque / modèle">
                  <Input
                    placeholder="ex. Renault Clio"
                    value={data.modele}
                    onChange={(e) => update("modele", e.target.value)}
                    className="h-11"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Date limite du contrôle technique">
                  <Input
                    type="date"
                    value={data.dateLimiteCt}
                    onChange={(e) => update("dateLimiteCt", e.target.value)}
                    className="h-11"
                  />
                </FormField>
                <FormField label="Le véhicule roule-t-il normalement ?">
                  <select
                    value={data.roulable}
                    onChange={(e) => update("roulable", e.target.value)}
                    className={selectClass}
                  >
                    <option>Oui</option>
                    <option>Non</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Points déjà connus">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {KNOWN_ISSUES.map((issue) => (
                    <label
                      key={issue}
                      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground"
                    >
                      <input
                        type="checkbox"
                        checked={data.pointsConnus.includes(issue)}
                        onChange={() => toggleKnownIssue(issue)}
                        className="h-4 w-4 accent-purple-bright"
                      />
                      <span>{issue}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              <FormField label="Préférence de prise en charge">
                <select
                  value={data.preferencePriseEnCharge}
                  onChange={(e) => update("preferencePriseEnCharge", e.target.value)}
                  className={selectClass}
                >
                  {DELIVERY_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
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
                  <Input
                    value={data.nom}
                    onChange={(e) => update("nom", e.target.value)}
                    className="h-11"
                  />
                </FormField>
                <FormField label="Prénom">
                  <Input
                    value={data.prenom}
                    onChange={(e) => update("prenom", e.target.value)}
                    className="h-11"
                  />
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
              <FormField label="Email" required>
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
              <FormField label="Message (optionnel)">
                <textarea
                  rows={4}
                  maxLength={700}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Préciser si la date du CT est proche, si c'est un VL ou un utilitaire, ou si un point vous inquiète."
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none"
                />
              </FormField>
            </div>
          ),
        },
        { title: "Confirmation", content: null },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Demande</dt>
            <dd className="max-w-[60%] text-right font-semibold">{data.typeDemande}</dd>
          </div>
          {data.modele && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Véhicule</dt>
              <dd className="max-w-[60%] text-right font-semibold">{data.modele}</dd>
            </div>
          )}
          {data.plaque && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Immatriculation</dt>
              <dd className="font-semibold">{data.plaque}</dd>
            </div>
          )}
          {data.dateLimiteCt && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Date limite CT</dt>
              <dd className="font-semibold">{data.dateLimiteCt}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Contact</dt>
            <dd className="font-semibold">{data.telephone}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Email</dt>
            <dd className="max-w-[60%] truncate text-right font-semibold">{data.email}</dd>
          </div>
        </dl>
      }
    />
  );
}
