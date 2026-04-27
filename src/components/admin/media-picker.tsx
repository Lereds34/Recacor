"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Upload, X, Check, Search } from "lucide-react";
import type { MediaItem } from "@/lib/media";

interface Props {
  value?: string;
  onChange: (url: string, alt?: string) => void;
  label?: string;
}

export function MediaPicker({ value, onChange, label = "Image" }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/admin/media")
      .then((r) => r.json())
      .then((j) => setItems(j.media || []))
      .finally(() => setLoading(false));
  }, [open]);

  const filtered = items.filter((m) =>
    [m.alt, m.filename].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const select = (m: MediaItem) => {
    onChange(m.url, m.alt);
    setOpen(false);
  };

  const upload = async (file: File) => {
    const alt = window.prompt("Texte alternatif (alt) — obligatoire pour le SEO", file.name.replace(/\.[^.]+$/, ""));
    if (!alt) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("alt", alt);
    try {
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const j = await res.json();
      if (res.ok) {
        setItems((it) => [j.media, ...it]);
        select(j.media);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">{label}</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex-1 inline-flex items-center gap-3 rounded-xl border border-input bg-background p-3 hover:border-purple-bright/30 transition-colors text-left"
        >
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Image sélectionnée</p>
                <p className="text-xs text-muted-foreground truncate">{value}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Choisir une image…</span>
            </>
          )}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("", "")}
            className="p-3 rounded-xl border border-border text-muted-foreground hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-5 border-b border-border flex items-center justify-between gap-4">
                <h3 className="font-black text-lg">Médiathèque</h3>
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="relative max-w-xs flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Rechercher…"
                      className="w-full h-10 rounded-lg border border-input bg-white pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
                    />
                  </div>
                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInput.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 px-4 h-10 rounded-lg bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" /> {uploading ? "..." : "Uploader"}
                  </button>
                  <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {loading ? (
                  <div className="text-center text-muted-foreground py-12">Chargement…</div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Aucune image. Uploadez la première.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {filtered.map((m) => {
                      const isCurrent = value === m.url;
                      return (
                        <button
                          key={m.id}
                          onClick={() => select(m)}
                          className={`group relative rounded-xl overflow-hidden bg-muted aspect-square transition-all hover:ring-2 hover:ring-purple-bright ${
                            isCurrent ? "ring-2 ring-purple-bright" : ""
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={m.url}
                            alt={m.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {isCurrent && (
                            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-purple-bright flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-[10px] truncate">{m.alt}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
