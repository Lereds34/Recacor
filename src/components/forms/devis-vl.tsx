"use client";

import { useState } from "react";
import { MultiStepForm, FormField, isValidPhone, isValidEmail } from "../multi-step-form";
import { Input } from "@/components/ui/input";

const LARGEURS = ["145", "155", "165", "175", "185", "195", "205", "215", "225", "235", "245", "255", "265", "275"];
const HAUTEURS = ["30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80"];
const DIAMETRES = ["13", "14", "15", "16", "17", "18", "19", "20"];
const CHARGES = Array.from({ length: 61 }, (_, i) => String(60 + i));
const VITESSES = ["H", "T", "V", "W", "Y"];
const TYPES = ["Été", "Hiver", "4 saisons"];
const PRESTATIONS = [
  "Vidange",
  "Parallélisme & Géométrie",
  "Freinage (plaquettes/disques)",
  "Révision",
];

type VlData = {
  largeur: string;
  hauteur: string;
  diametre: string;
  charge: string;
  vitesse: string;
  type: string;
  quantite: string;
  marque_souhaitee: string;
  modele: string;
  plaque: string;
  prestation_complementaire: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  cp: string;
  message: string;
};

const initial: VlData = {
  largeur: "",
  hauteur: "",
  diametre: "",
  charge: "",
  vitesse: "",
  type: "",
  quantite: "",
  marque_souhaitee: "",
  modele: "",
  plaque: "",
  prestation_complementaire: "",
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  cp: "",
  message: "",
};

export function DevisVlForm() {
  const [data, setData] = useState<VlData>(initial);
  const update = <K extends keyof VlData>(key: K, value: VlData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const select =
    "w-full h-11 rounded-[4px] border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700";

  const isValid = (step: number) => {
    if (step === 0) return true; // Optional fields
    if (step === 1)
      return isValidPhone(data.telephone) && isValidEmail(data.email);
    return true;
  };

  return (
    <MultiStepForm
      id="devis-vl-form"
      serviceType="vl"
      data={data}
      isValid={isValid}
      steps={[
        {
          title: "Votre pneu",
          subtitle: "Tous les champs sont facultatifs — indiquez ce que vous savez",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Largeur">
                  <select value={data.largeur} onChange={(e) => update("largeur", e.target.value)} className={select}>
                    <option value="">—</option>
                    {LARGEURS.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
                <FormField label="Hauteur">
                  <select value={data.hauteur} onChange={(e) => update("hauteur", e.target.value)} className={select}>
                    <option value="">—</option>
                    {HAUTEURS.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
                <FormField label="Diamètre">
                  <select value={data.diametre} onChange={(e) => update("diametre", e.target.value)} className={select}>
                    <option value="">—</option>
                    {DIAMETRES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Indice de charge">
                  <select value={data.charge} onChange={(e) => update("charge", e.target.value)} className={select}>
                    <option value="">—</option>
                    {CHARGES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
                <FormField label="Indice de vitesse">
                  <select value={data.vitesse} onChange={(e) => update("vitesse", e.target.value)} className={select}>
                    <option value="">—</option>
                    {VITESSES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Type de pneu">
                  <select value={data.type} onChange={(e) => update("type", e.target.value)} className={select}>
                    <option value="">—</option>
                    {TYPES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </FormField>
                <FormField label="Nombre de pneus">
                  <Input type="number" min={1} max={8} placeholder="ex. 2" value={data.quantite} onChange={(e) => update("quantite", e.target.value)} className="h-11" />
                </FormField>
              </div>
              <FormField label="Marque souhaitée (optionnel)">
                <Input placeholder="ex. Michelin, Goodyear, Hankook..." value={data.marque_souhaitee} onChange={(e) => update("marque_souhaitee", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Modèle de véhicule">
                <Input placeholder="ex. Peugeot 208, Clio 5" value={data.modele} onChange={(e) => update("modele", e.target.value)} className="h-11" />
              </FormField>
              <FormField label="Plaque d'immatriculation">
                <Input placeholder="AA-000-AA" value={data.plaque} onChange={(e) => update("plaque", e.target.value.toUpperCase())} className="h-11" />
              </FormField>
              <FormField label="Prestation complémentaire souhaitée (optionnel)">
                <select value={data.prestation_complementaire} onChange={(e) => update("prestation_complementaire", e.target.value)} className={select}>
                  <option value="">Aucune</option>
                  {PRESTATIONS.map((p) => <option key={p}>{p}</option>)}
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
                  className="w-full rounded-[4px] border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 resize-none"
                  placeholder="Précisions utiles..."
                />
              </FormField>
            </div>
          ),
        },
        {
          title: "Confirmation",
          subtitle: "Vérifiez vos informations avant envoi",
          content: null,
        },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          {(data.largeur || data.hauteur || data.diametre) && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Dimension</dt>
              <dd className="font-semibold">{data.largeur}/{data.hauteur} R{data.diametre}</dd>
            </div>
          )}
          {data.type && <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-semibold">{data.type}</dd></div>}
          {data.quantite && <div className="flex justify-between"><dt className="text-muted-foreground">Quantité</dt><dd className="font-semibold">{data.quantite}</dd></div>}
          {data.marque_souhaitee && <div className="flex justify-between"><dt className="text-muted-foreground">Marque</dt><dd className="font-semibold">{data.marque_souhaitee}</dd></div>}
          {data.modele && <div className="flex justify-between"><dt className="text-muted-foreground">Véhicule</dt><dd className="font-semibold">{data.modele}</dd></div>}
          {data.prestation_complementaire && <div className="flex justify-between"><dt className="text-muted-foreground">Prestation</dt><dd className="font-semibold">{data.prestation_complementaire}</dd></div>}
          <div className="flex justify-between"><dt className="text-muted-foreground">Contact</dt><dd className="font-semibold">{data.telephone}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd className="font-semibold truncate max-w-[60%]">{data.email}</dd></div>
        </dl>
      }
    />
  );
}
