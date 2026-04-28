"use client";

import { useState } from "react";
import { Mail, Bell, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "notification", label: "Notification admin", Icon: Bell, desc: "Email reçu par l'équipe Recacor à chaque nouveau lead" },
  { id: "confirmation", label: "Confirmation client", Icon: Mail, desc: "Email envoyé au client après sa soumission" },
];

export default function EmailsPage() {
  const [active, setActive] = useState("notification");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Templates email</h1>
        <p className="text-muted-foreground mt-1">
          Aperçu des emails envoyés automatiquement par le site avec la DA Recacor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar tabs */}
        <aside className="lg:col-span-1 space-y-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "w-full text-left rounded-2xl p-4 border transition-colors",
                active === t.id
                  ? "border-purple-bright bg-purple-bright/5"
                  : "border-border bg-white hover:border-purple-bright/30"
              )}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center",
                  active === t.id ? "bg-purple-bright text-white" : "bg-purple-bright/10 text-purple-bright"
                )}>
                  <t.Icon className="w-4 h-4" />
                </div>
                <p className="font-bold text-sm">{t.label}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </button>
          ))}

          <a
            href={`/api/admin/email-preview?type=${active}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 mt-4 px-4 py-3 rounded-2xl bg-white border border-border text-sm font-semibold hover:border-purple-bright/30 hover:bg-purple-bright/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ouvrir en plein écran
          </a>
        </aside>

        {/* Preview iframe */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2 truncate">
                {active === "notification"
                  ? "🔔 Nouveau lead Recacor #42 · Pneus voiture (VL)"
                  : "Votre demande Recacor a bien été reçue"}
              </span>
            </div>
            <iframe
              key={active}
              src={`/api/admin/email-preview?type=${active}`}
              className="w-full bg-white"
              style={{ height: "900px" }}
              title="Email preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
