"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Ville } from "@/lib/villes";

interface Props {
  initial?: Ville;
  isEdit?: boolean;
}

const EMPTY: Ville = {
  slug: "",
  nom: "",
  cp: "",
  distance: "",
  description: "",
  meta_title: "",
  meta_description: "",
  published: true,
};

export function VilleForm({ initial, isEdit }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Ville>(initial || EMPTY);
  const [originalSlug] = useState(initial?.slug || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof Ville>(key: K, value: Ville[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleSlugFromName = () => {
    if (!data.slug && data.nom) {
      const slug = data.nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      update("slug", slug);
    }
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const url = isEdit ? `/api/admin/villes/${originalSlug}` : "/api/admin/villes";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json();
      if (res.ok) {
        router.push("/admin/villes");
        router.refresh();
      } else {
        setError(j.error || "Erreur");
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!isEdit || !confirm(`Supprimer la page ${data.nom} ?`)) return;
    await fetch(`/api/admin/villes/${originalSlug}`, { method: "DELETE" });
    router.push("/admin/villes");
    router.refresh();
  };

  const input = "w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/villes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
        <div className="flex items-center gap-2">
          {isEdit && (
            <button onClick={remove} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" /> Supprimer
            </button>
          )}
          <button
            onClick={save}
            disabled={saving || !data.nom || !data.slug}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "..." : "Enregistrer"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-4">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Nom de la ville *</label>
            <input
              type="text"
              value={data.nom}
              onChange={(e) => update("nom", e.target.value)}
              onBlur={handleSlugFromName}
              placeholder="Ex: Montpellier"
              className={input}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Code postal</label>
            <input
              type="text"
              value={data.cp}
              onChange={(e) => update("cp", e.target.value)}
              placeholder="34000"
              className={input}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Slug URL *</label>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="montpellier"
              className={input}
            />
            <p className="text-xs text-muted-foreground mt-1">URL : /{data.slug || "..."}</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Distance / temps</label>
            <input
              type="text"
              value={data.distance}
              onChange={(e) => update("distance", e.target.value)}
              placeholder="10 min"
              className={input}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Description (texte SEO unique)</label>
          <textarea
            rows={5}
            value={data.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Texte unique pour le SEO local — décrivez la proximité avec la ville et les services proposés."
            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
          />
        </div>

        <div className="pt-5 border-t border-border space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">SEO (optionnel)</p>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Meta title</label>
            <input
              type="text"
              value={data.meta_title || ""}
              onChange={(e) => update("meta_title", e.target.value)}
              placeholder="Pneus [Ville] — Garage Recacor Montpellier Le Crès"
              className={input}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Meta description</label>
            <textarea
              rows={2}
              value={data.meta_description || ""}
              onChange={(e) => update("meta_description", e.target.value)}
              placeholder="150 caractères max"
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.published}
              onChange={(e) => update("published", e.target.checked)}
              className="w-4 h-4 rounded border-border accent-purple-bright"
            />
            <span className="text-sm">Page publiée (visible sur le site)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
