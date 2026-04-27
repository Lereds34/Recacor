"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { pushFormSubmit, getUtmData } from "@/lib/tracking";
import { isValidPhone, isValidEmail, FormField } from "@/components/multi-step-form";

export function ContactSimpleForm() {
  const router = useRouter();
  const [data, setData] = useState({ nom: "", telephone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [rgpd, setRgpd] = useState(false);

  const isValid = isValidPhone(data.telephone) && isValidEmail(data.email) && rgpd;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);

    pushFormSubmit("vl", "contact-form");
    const payload = { ...data, ...getUtmData(), form_id: "contact-form", service_type: "contact" };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[contact submit]", err);
    }

    router.push("/merci");
  };

  const update = (key: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }));

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="gclid" />
      <input type="hidden" name="fbclid" />
      <input type="hidden" name="page_source" />
      <input type="hidden" name="referrer" />

      <FormField label="Nom">
        <Input value={data.nom} onChange={update("nom")} className="h-11" placeholder="Votre nom" />
      </FormField>
      <FormField label="Téléphone" required>
        <Input type="tel" value={data.telephone} onChange={update("telephone")} className="h-11" placeholder="06 00 00 00 00" />
      </FormField>
      <FormField label="Email" required>
        <Input type="email" value={data.email} onChange={update("email")} className="h-11" placeholder="vous@email.fr" />
      </FormField>
      <FormField label="Message">
        <textarea
          rows={5}
          maxLength={1000}
          value={data.message}
          onChange={update("message")}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright resize-none"
          placeholder="Comment pouvons-nous vous aider ?"
        />
      </FormField>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-border accent-purple-bright cursor-pointer"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          En soumettant ce formulaire, j&apos;accepte que mes données soient traitées par
          Recacor dans le cadre de ma demande.{" "}
          <a href="/confidentialite" className="text-purple-bright hover:underline">
            Politique de confidentialité
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!isValid || submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {submitting ? "Envoi..." : "Envoyer mon message"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
