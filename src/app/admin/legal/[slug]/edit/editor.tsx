"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export function LegalEditor({
  slug,
  initial,
}: {
  slug: string;
  initial: { titre: string; content: string };
}) {
  const router = useRouter();
  const [titre, setTitre] = useState(initial.titre);
  const [content, setContent] = useState(initial.content);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/legal/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre, content }),
      });
      if (res.ok) {
        setSavedAt(Date.now());
        setTimeout(() => setSavedAt(null), 3000);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/legal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
        <div className="flex items-center gap-3">
          {savedAt && <span className="text-sm text-green-600 font-semibold">Enregistré ✓</span>}
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "..." : "Enregistrer"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-5">
        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Contenu (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={25}
            spellCheck={false}
            className="w-full rounded-xl border border-input bg-background p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Format Markdown : **gras**, *italique*, ## Titres, [lien](url), etc.
          </p>
        </div>
      </div>
    </div>
  );
}
