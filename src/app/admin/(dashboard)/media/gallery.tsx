"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Trash2, Copy, Check, ImageIcon, Search, Loader2, AlertCircle } from "lucide-react";
import type { MediaItem } from "@/lib/media";

interface Props {
  initial: MediaItem[];
}

export function MediaGallery({ initial }: Props) {
  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const filtered = items.filter((m) =>
    [m.alt, m.filename].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const onFiles = async (files: FileList) => {
    setError("");
    setUploading(true);
    const updated = [...items];
    for (const file of Array.from(files)) {
      // Demande l'alt via prompt simple
      const alt = window.prompt(`Texte alternatif pour "${file.name}" (obligatoire pour le SEO)`, file.name.replace(/\.[^.]+$/, ""));
      if (!alt) continue;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", alt);
      try {
        const res = await fetch("/api/admin/media", { method: "POST", body: fd });
        const j = await res.json();
        if (res.ok) {
          updated.unshift(j.media);
        } else {
          setError(j.error || "Erreur upload");
        }
      } catch (e) {
        setError(String(e));
      }
    }
    setItems(updated);
    setUploading(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) onFiles(e.target.files);
    e.target.value = "";
  };

  const removeItem = async (m: MediaItem) => {
    if (!confirm(`Supprimer "${m.filename}" ?`)) return;
    await fetch(`/api/admin/media/${m.id}`, { method: "DELETE" });
    setItems((it) => it.filter((x) => x.id !== m.id));
    setSelected(null);
  };

  const updateAlt = async (m: MediaItem, newAlt: string) => {
    await fetch(`/api/admin/media/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt: newAlt }),
    });
    setItems((it) => it.map((x) => (x.id === m.id ? { ...x, alt: newAlt } : x)));
    setSelected({ ...m, alt: newAlt });
  };

  const copyUrl = (m: MediaItem) => {
    navigator.clipboard.writeText(m.url);
    setCopied(m.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatSize = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInput.current?.click()}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed transition-all p-10 text-center mb-6 ${
          dragOver
            ? "border-purple-bright bg-purple-bright/5 scale-[1.01]"
            : "border-border bg-white hover:border-purple-bright/40"
        }`}
      >
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInput}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 className="w-10 h-10 text-purple-bright animate-spin" />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <p className="font-bold">
              {dragOver ? "Lâchez pour uploader" : uploading ? "Upload en cours..." : "Glissez vos images ici ou cliquez"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Conversion WebP automatique · 1920px max · 10 Mo max · Texte alt obligatoire
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par alt ou nom..."
          className="w-full h-11 rounded-xl border border-input bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-16 text-center">
          <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {items.length === 0 ? "Aucune image. Uploadez votre première image ci-dessus." : "Aucun résultat."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative rounded-2xl overflow-hidden bg-muted aspect-square cursor-pointer hover:ring-2 hover:ring-purple-bright transition-all"
              onClick={() => setSelected(m)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.url}
                alt={m.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold truncate">{m.alt}</p>
                  <p className="text-white/60 text-[10px]">{formatSize(m.size_bytes)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal détail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
            >
              <div className="lg:w-2/3 bg-muted flex items-center justify-center p-4 max-h-[60vh] lg:max-h-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.url}
                  alt={selected.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="lg:w-1/3 p-6 overflow-y-auto">
                <div className="flex items-start justify-between mb-5">
                  <h3 className="font-black text-lg">Détails</h3>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Texte alternatif (alt)
                    </label>
                    <input
                      type="text"
                      defaultValue={selected.alt}
                      onBlur={(e) => updateAlt(selected, e.target.value)}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">Modifié au blur</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={selected.url}
                        className="flex-1 h-11 rounded-xl border border-input bg-muted px-3 text-xs"
                      />
                      <button
                        onClick={() => copyUrl(selected)}
                        className="px-3 h-11 rounded-xl bg-purple-bright text-white hover:bg-purple-mid text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        {copied === selected.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <dl className="space-y-2 text-sm pt-3 border-t border-border">
                    <div className="flex justify-between"><dt className="text-muted-foreground">Format</dt><dd className="font-semibold">{selected.mime}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted-foreground">Taille</dt><dd className="font-semibold">{formatSize(selected.size_bytes)}</dd></div>
                    {selected.width && (
                      <div className="flex justify-between"><dt className="text-muted-foreground">Dimensions</dt><dd className="font-semibold">{selected.width} × {selected.height} px</dd></div>
                    )}
                    <div className="flex justify-between"><dt className="text-muted-foreground">Uploadé</dt><dd className="font-semibold">{new Date(selected.uploaded_at).toLocaleString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}</dd></div>
                  </dl>

                  <button
                    onClick={() => removeItem(selected)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 mt-4"
                  >
                    <Trash2 className="w-4 h-4" /> Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
