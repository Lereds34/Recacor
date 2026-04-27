"use client";

import { useState } from "react";
import type { SettingsGroup } from "@/lib/settings-schema";
import { Save, Check } from "lucide-react";

export function SettingsForm({
  initial,
  groups,
}: {
  initial: Record<string, string>;
  groups: SettingsGroup[];
}) {
  const [data, setData] = useState<Record<string, string>>(initial);
  const [activeGroup, setActiveGroup] = useState(groups[0].id);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const update = (key: string, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: data }),
      });
      if (res.ok) {
        setSavedAt(Date.now());
        setTimeout(() => setSavedAt(null), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const current = groups.find((g) => g.id === activeGroup) || groups[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar tabs */}
      <aside className="lg:col-span-1">
        <nav className="flex lg:flex-col gap-1 lg:sticky lg:top-24 overflow-x-auto">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGroup(g.id)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeGroup === g.id
                  ? "bg-purple-bright text-white"
                  : "text-muted-foreground hover:bg-white"
              }`}
            >
              {g.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Active group */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h2 className="text-xl font-black tracking-tight">{current.title}</h2>
          {current.description && (
            <p className="text-sm text-muted-foreground mt-1">{current.description}</p>
          )}

          <div className="mt-6 space-y-5">
            {current.fields.map((f) => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={data[f.key] || ""}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
                  />
                ) : (
                  <input
                    type={f.type}
                    value={data[f.key] || ""}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
                  />
                )}
                {f.help && (
                  <p className="text-xs text-muted-foreground mt-1.5">{f.help}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {savedAt && (
            <span className="text-sm text-green-600 font-semibold inline-flex items-center gap-1.5">
              <Check className="h-4 w-4" /> Enregistré
            </span>
          )}
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
