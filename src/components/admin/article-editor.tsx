"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Save, Trash2, FileText } from "lucide-react";
import Link from "next/link";

const TEMPLATE = `---
titre: Titre de l'article
slug: titre-de-l-article
meta_description: Résumé en 150 caractères qui sera affiché dans Google.
categorie: pneus-voiture
date: ${new Date().toISOString().split("T")[0]}
auteur: Équipe Recacor
read_time: 4 min
---

# Titre de l'article

Introduction de l'article (150 mots environ).

## Première section

Contenu de la section. Vous pouvez ajouter des [liens internes](/pneus-voiture).

## Deuxième section

Contenu...

## FAQ

**Première question ?**
Réponse à la première question.

**Deuxième question ?**
Réponse à la deuxième question.
`;

interface Props {
  initialRaw?: string;
  initialSlug?: string;
  isEdit?: boolean;
}

export function ArticleEditor({ initialRaw, initialSlug, isEdit = false }: Props) {
  const router = useRouter();
  const [raw, setRaw] = useState(initialRaw || TEMPLATE);
  const [preview, setPreview] = useState<{ html: string; frontmatter: Record<string, unknown> } | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  const parsePreview = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPreview(data);
        setError("");
      } else {
        setError(data.error || "Erreur de parsing");
      }
    } catch {
      setError("Erreur réseau");
    }
  }, [raw]);

  useEffect(() => {
    if (tab === "preview") parsePreview();
  }, [tab, parsePreview]);

  const extractSlug = (markdown: string): string | null => {
    const match = markdown.match(/^slug:\s*(.+)$/m);
    return match ? match[1].trim() : null;
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const slug = extractSlug(raw);
      if (!slug) {
        setError("Le frontmatter doit contenir un 'slug'");
        setSaving(false);
        return;
      }
      const url = isEdit && initialSlug
        ? `/api/admin/articles/${initialSlug}`
        : `/api/admin/articles`;
      const method = isEdit ? "PUT" : "POST";
      const body = isEdit
        ? JSON.stringify({ raw, newSlug: slug !== initialSlug ? slug : undefined })
        : JSON.stringify({ slug, raw });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(data.error || "Erreur de sauvegarde");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit || !initialSlug) return;
    if (!confirm("Supprimer définitivement cet article ?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles/${initialSlug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError("Erreur de suppression");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
        <div className="flex items-center gap-2">
          {isEdit && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" /> {deleting ? "..." : "Supprimer"}
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "Sauvegarde..." : "Publier"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4">
        <button
          onClick={() => setTab("edit")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "edit" ? "bg-white border border-border text-foreground" : "text-muted-foreground hover:bg-white/50"
          }`}
        >
          <FileText className="h-4 w-4" /> Éditeur
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "preview" ? "bg-white border border-border text-foreground" : "text-muted-foreground hover:bg-white/50"
          }`}
        >
          <Eye className="h-4 w-4" /> Aperçu
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-4">
          {error}
        </div>
      )}

      {tab === "edit" ? (
        <div>
          <p className="text-xs text-muted-foreground mb-2">
            Collez votre markdown complet ci-dessous (frontmatter + contenu). Le slug et la
            catégorie sont lus automatiquement.
          </p>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            spellCheck={false}
            className="w-full h-[600px] rounded-2xl border border-border bg-white p-5 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
          />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{raw.split("\n").length} lignes · {raw.length} caractères</span>
            <span>Format : Markdown + frontmatter YAML</span>
          </div>
        </div>
      ) : (
        <div>
          {preview ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-purple-bright/5 p-5">
                <p className="text-xs font-bold text-purple-bright uppercase tracking-wider mb-2">Frontmatter parsé</p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(preview.frontmatter).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="font-bold text-muted-foreground">{k}:</dt>
                      <dd className="truncate">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <article
                className="rounded-2xl border border-border bg-white p-8 prose prose-lg max-w-none
                  prose-headings:font-[family-name:var(--font-heading)] prose-headings:font-black
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-a:text-purple-bright"
                dangerouslySetInnerHTML={{ __html: preview.html }}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-8 text-center text-muted-foreground">
              Chargement de l&apos;aperçu...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
