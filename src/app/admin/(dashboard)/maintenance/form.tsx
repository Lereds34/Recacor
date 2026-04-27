"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Sparkles, Wrench, Send, MessageCircle, Mail, Phone, Check, AlertCircle } from "lucide-react";

const WHATSAPP_NUMBER = "33644887039";
const WHATSAPP_DISPLAY = "06 44 88 70 39";

const TYPES = [
  { value: "bug", label: "Bug à corriger", Icon: Bug, color: "from-red-500 to-rose-600" },
  { value: "feature", label: "Nouvelle fonctionnalité", Icon: Sparkles, color: "from-purple-bright to-purple-light" },
  { value: "tweak", label: "Petit ajustement", Icon: Wrench, color: "from-amber-500 to-orange-600" },
];

const PRIORITIES = [
  { value: "low", label: "Faible", color: "bg-gray-100 text-gray-700" },
  { value: "normal", label: "Normale", color: "bg-blue-100 text-blue-700" },
  { value: "urgent", label: "Urgente", color: "bg-red-100 text-red-700" },
];

export function MaintenanceForm() {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [sent, setSent] = useState(false);

  const buildMessage = () => {
    const typeLabel = TYPES.find((t) => t.value === type)?.label || "Demande";
    const prioLabel = PRIORITIES.find((p) => p.value === priority)?.label || "Normale";
    return [
      `*${typeLabel}* — Recacor Admin`,
      ``,
      `*Sujet :* ${title || "(sans sujet)"}`,
      `*Priorité :* ${prioLabel}`,
      ``,
      `*Description :*`,
      description || "(aucune description)",
    ].join("\n");
  };

  const sendWhatsapp = () => {
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(`Demande maintenance Recacor — ${title || "Sans sujet"}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:contact@webomax.fr?subject=${subject}&body=${body}`;
  };

  const isValid = type && title.trim().length >= 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2">
        <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 space-y-6">
          {/* Type */}
          <div>
            <label className="text-xs font-bold text-foreground/70 mb-3 block uppercase tracking-wider">
              Type de demande *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`relative rounded-2xl p-5 text-left transition-all border-2 ${
                    type === t.value
                      ? "border-purple-bright bg-purple-bright/5"
                      : "border-border hover:border-purple-bright/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-3`}>
                    <t.Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-bold text-sm">{t.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-foreground/70 mb-1.5 block uppercase tracking-wider">
              Sujet *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Corriger le formulaire de contact, Ajouter un calendrier..."
              className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs font-bold text-foreground/70 mb-3 block uppercase tracking-wider">
              Priorité
            </label>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    priority === p.value
                      ? p.color + " ring-2 ring-purple-bright"
                      : "bg-muted text-muted-foreground hover:bg-purple-bright/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-foreground/70 mb-1.5 block uppercase tracking-wider">
              Description détaillée
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le bug, la fonctionnalité ou le changement souhaité. Plus c'est précis, plus c'est rapide à traiter."
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={sendWhatsapp}
              disabled={!isValid}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 transition-all"
            >
              {sent ? <Check className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
              {sent ? "Ouvert dans WhatsApp" : "Envoyer via WhatsApp"}
            </motion.button>
            <button
              type="button"
              onClick={sendEmail}
              disabled={!isValid}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-border text-sm font-bold hover:border-purple-bright/30 hover:bg-purple-bright/5 disabled:opacity-50 transition-all"
            >
              <Mail className="w-4 h-4" /> Envoyer par email
            </button>
          </div>

          {!isValid && (type || title || description) && (
            <p className="flex items-center gap-2 text-xs text-amber-600">
              <AlertCircle className="w-3.5 h-3.5" />
              Sélectionnez un type et donnez un sujet (3 caractères min) pour envoyer.
            </p>
          )}
        </div>
      </div>

      {/* Sidebar contact */}
      <aside className="space-y-4">
        <div className="rounded-3xl bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright p-6 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)" }}
          />
          <div className="relative">
            <p className="text-xs uppercase tracking-widest text-purple-glow font-bold mb-3">Maintenance</p>
            <h2 className="text-2xl font-black mb-2">Webomax</h2>
            <p className="text-white/60 text-sm">Votre partenaire technique pour Recacor.</p>

            <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50">WhatsApp</p>
                  <p className="font-bold text-sm">{WHATSAPP_DISPLAY}</p>
                </div>
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-bright flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50">Téléphone</p>
                  <p className="font-bold text-sm">{WHATSAPP_DISPLAY}</p>
                </div>
              </a>
              <a
                href="https://webomax.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-light flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/50">Site web</p>
                  <p className="font-bold text-sm">webomax.fr</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-bright mb-2">⏱ Délais indicatifs</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>🔥 <strong className="text-foreground">Urgent</strong> : sous 4h</li>
            <li>⚡ <strong className="text-foreground">Normal</strong> : sous 24-48h</li>
            <li>📅 <strong className="text-foreground">Faible</strong> : sous 1 semaine</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
