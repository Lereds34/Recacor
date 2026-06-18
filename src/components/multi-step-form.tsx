"use client";

import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { pushFormStart, pushFormSubmit, getUtmData } from "@/lib/tracking";

type ServiceType = "vl" | "pl" | "mecanique";

interface Step {
  title: string;
  subtitle?: string;
  content: ReactNode;
}

interface MultiStepFormProps {
  id: string;
  serviceType: ServiceType;
  steps: Step[];
  data: Record<string, unknown>;
  onFieldFocusOnce?: () => void;
  isValid: (stepIndex: number) => boolean;
  summary: ReactNode;
  submitLabel?: string;
  extraMention?: string;
  rgpdText?: ReactNode;
}

export function MultiStepForm({
  id,
  serviceType,
  steps,
  data,
  isValid,
  summary,
  submitLabel = "Envoyer ma demande",
  extraMention,
  rgpdText,
}: MultiStepFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [startPushed, setStartPushed] = useState(false);
  const [rgpd, setRgpd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalSteps = steps.length;

  const triggerStart = () => {
    if (!startPushed) {
      pushFormStart(serviceType);
      setStartPushed(true);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const next = () => {
    triggerStart();
    if (!isValid(step)) return;
    if (step < totalSteps - 1) { setStep(step + 1); scrollToForm(); }
  };

  const prev = () => {
    if (step > 0) { setStep(step - 1); scrollToForm(); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rgpd) return;
    setSubmitting(true);
    setSubmitError("");

    const submissionId = crypto.randomUUID();
    const payload = {
      ...data,
      ...getUtmData(),
      form_id: id,
      service_type: serviceType,
      submission_id: submissionId,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Le serveur n'a pas confirmé la demande.");
      }
      const result = await res.json();
      if (!result.accepted || !result.tracking_id) {
        throw new Error("Le serveur n'a pas confirmé l'enregistrement du lead.");
      }

      pushFormSubmit(serviceType, id, result.tracking_id, result.accepted_by || []);
      router.push("/merci");
    } catch (err) {
      console.error("[lead submit]", err);
      setSubmitting(false);
      setSubmitError(
        "Votre demande n'a pas pu être confirmée. Réessayez ou appelez-nous directement.",
      );
    }
  };

  return (
    <form
      ref={formRef}
      id={id}
      onSubmit={handleSubmit}
      onFocusCapture={triggerStart}
      className="relative"
    >
      {/* Hidden UTM inputs — populated at submit */}
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="gclid" />
      <input type="hidden" name="fbclid" />
      <input type="hidden" name="page_source" />
      <input type="hidden" name="referrer" />
      <input type="hidden" name="service_type" value={serviceType} />

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-purple-bright uppercase tracking-wider">
            Étape {step + 1} / {totalSteps}
          </span>
          <span className="text-xs text-muted-foreground">
            {steps[step].title}
          </span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-colors duration-300",
                i <= step ? "bg-purple-bright" : "bg-border"
              )}
            />
          ))}
        </div>
      </div>

      {/* Step title */}
      <div className="mb-6">
        <h3 className="text-xl font-black tracking-tight">{steps[step].title}</h3>
        {steps[step].subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{steps[step].subtitle}</p>
        )}
      </div>

      {/* Step content */}
      <AnimatePresence>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === totalSteps - 1 ? (
            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-muted p-5">
                <p className="text-xs font-bold text-purple-bright uppercase mb-3">
                  Récapitulatif
                </p>
                {summary}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rgpd}
                  onChange={(e) => setRgpd(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border accent-purple-bright cursor-pointer"
                  required
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {rgpdText || (
                    <>
                      En soumettant ce formulaire, j&apos;accepte que mes données
                      soient traitées par Recacor dans le cadre de ma demande.{" "}
                      <Link
                        href="/confidentialite"
                        className="text-purple-bright hover:underline"
                      >
                        Politique de confidentialité
                      </Link>
                    </>
                  )}
                </span>
              </label>

              {extraMention && (
                <p className="text-xs text-center text-purple-bright font-semibold">
                  {extraMention}
                </p>
              )}
            </div>
          ) : (
            steps[step].content
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={prev}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-medium hover:border-purple-bright/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
        )}

        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!isValid(step)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!rgpd || submitting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-bright to-purple-mid text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-bright/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? "Envoi..." : submitLabel}
            <CheckCircle className="h-4 w-4" />
          </button>
        )}
      </div>
      {submitError && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {submitError}
        </p>
      )}
    </form>
  );
}

export function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">
        {label}
        {required && <span className="text-purple-bright ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

/* Validators */
export const isValidPhone = (v: string) => {
  const cleaned = v.replace(/[\s.\-()]/g, "");
  return /^(?:\+33|0033|0)[67]\d{8}$/.test(cleaned);
};
export const isValidEmail = (v: string) => {
  const cleaned = v.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
};
