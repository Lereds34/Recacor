"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Upload, RotateCcw, Check, Loader2, Video, ImageIcon, AlertCircle, Play } from "lucide-react";
import type { PageAssets, AssetDef } from "@/lib/site-assets";

interface AssetRow {
  key: string;
  url: string;
  type: string;
  alt: string;
}

interface Props {
  pages: PageAssets[];
  stored: Record<string, AssetRow>;
}

export function SiteContentClient({ pages, stored }: Props) {
  const [data, setData] = useState<Record<string, AssetRow>>(stored);
  const [openId, setOpenId] = useState<string>(pages[0]?.id || "");

  const getCurrent = (asset: AssetDef): string => {
    return data[asset.key]?.url || asset.fallback;
  };

  const isCustom = (asset: AssetDef): boolean => {
    return !!data[asset.key]?.url && data[asset.key]?.url !== asset.fallback;
  };

  const handleUpload = async (asset: AssetDef, file: File, typeOverride?: "image" | "video") => {
    const actualType: "image" | "video" =
      typeOverride ||
      (asset.type === "media"
        ? file.type.startsWith("video/")
          ? "video"
          : "image"
        : (asset.type as "image" | "video"));

    const fd = new FormData();
    fd.append("file", file);
    fd.append("key", asset.key);
    fd.append("type", actualType);
    fd.append("alt", asset.alt || "");

    const res = await fetch("/api/admin/site-assets", { method: "PUT", body: fd });
    const j = await res.json();
    if (res.ok) {
      setData((d) => ({
        ...d,
        [asset.key]: { key: asset.key, url: j.url, type: actualType, alt: asset.alt || "" },
      }));
    } else {
      alert(j.error || "Erreur");
    }
  };

  const handleReset = async (asset: AssetDef) => {
    if (!confirm(`Remettre l'image par défaut pour "${asset.label}" ?`)) return;
    const res = await fetch(`/api/admin/site-assets?key=${asset.key}`, { method: "DELETE" });
    if (res.ok) {
      setData((d) => {
        const next = { ...d };
        delete next[asset.key];
        return next;
      });
    }
  };

  return (
    <div className="space-y-3">
      {pages.map((page) => {
        const isOpen = openId === page.id;
        const customCount = page.assets.filter(isCustom).length;
        return (
          <div
            key={page.id}
            className="rounded-2xl border border-border bg-white overflow-hidden transition-all"
          >
            {/* Header accordion */}
            <button
              onClick={() => setOpenId(isOpen ? "" : page.id)}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-muted/40 transition-colors"
            >
              <div className="text-left">
                <h2 className="font-black text-lg tracking-tight flex items-center gap-3">
                  {page.page}
                  <span className="text-xs font-medium text-muted-foreground">
                    ({page.assets.length} élément{page.assets.length > 1 ? "s" : ""})
                  </span>
                  {customCount > 0 && (
                    <span className="text-xs font-bold text-purple-bright bg-purple-bright/10 px-2 py-0.5 rounded-full">
                      {customCount} modifié{customCount > 1 ? "s" : ""}
                    </span>
                  )}
                </h2>
                {page.description && (
                  <p className="text-xs text-muted-foreground mt-1">{page.description}</p>
                )}
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Body */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-muted/30">
                    {page.assets.map((asset) => (
                      <AssetCard
                        key={asset.key}
                        asset={asset}
                        currentUrl={getCurrent(asset)}
                        currentType={data[asset.key]?.type}
                        custom={isCustom(asset)}
                        onUpload={(file, typeOverride) => handleUpload(asset, file, typeOverride)}
                        onReset={() => handleReset(asset)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function AssetCard({
  asset,
  currentUrl,
  currentType,
  custom,
  onUpload,
  onReset,
}: {
  asset: AssetDef;
  currentUrl: string;
  currentType?: string;
  custom: boolean;
  onUpload: (file: File, typeOverride?: "image" | "video") => Promise<void>;
  onReset: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File, typeOverride?: "image" | "video") => {
    setUploading(true);
    setError("");
    try {
      await onUpload(file, typeOverride);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (e) {
      setError(String(e));
    } finally {
      setUploading(false);
    }
  };

  const isMedia = asset.type === "media";
  // Pour la preview : on regarde le type effectivement stocké en base si disponible,
  // sinon on fallback sur le type déclaré (et pour "media" sans upload : vidéo).
  const previewType: "image" | "video" =
    (currentType as "image" | "video" | undefined) ||
    (asset.type === "media" ? "video" : (asset.type as "image" | "video"));
  const accept = asset.type === "video" ? "video/*" : "image/*";

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden flex flex-col">
      {/* Preview */}
      <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {previewType === "video" ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              key={currentUrl}
              src={currentUrl}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
              <Play className="w-3 h-3" /> Vidéo
            </div>
          </>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUrl}
              alt={asset.alt || asset.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> WebP
            </div>
          </>
        )}
        {custom && (
          <div className="absolute top-2 right-2 bg-purple-bright text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Modifié
          </div>
        )}
      </div>

      {/* Info + actions */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start gap-2 mb-3">
          {previewType === "video" ? (
            <Video className="w-4 h-4 text-purple-bright shrink-0 mt-0.5" />
          ) : (
            <ImageIcon className="w-4 h-4 text-purple-bright shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">{asset.label}</p>
            {asset.description && (
              <p className="text-[11px] text-muted-foreground mt-0.5">{asset.description}</p>
            )}
          </div>
        </div>

        {isMedia ? (
          <>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f, "image");
                e.target.value = "";
              }}
              className="hidden"
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f, "video");
                e.target.value = "";
              }}
              className="hidden"
            />
          </>
        ) : (
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
            className="hidden"
          />
        )}

        {error && (
          <div className="mb-2 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {error}
          </div>
        )}

        <div className="mt-auto flex gap-2">
          {isMedia ? (
            <>
              <button
                onClick={() => imageInputRef.current?.click()}
                disabled={uploading}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-bright text-white text-xs font-bold hover:bg-purple-mid disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </>
                ) : success ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> OK
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3.5 h-3.5" /> Image
                  </>
                )}
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                disabled={uploading}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-deep text-white text-xs font-bold hover:bg-purple-mid disabled:opacity-50"
              >
                <Video className="w-3.5 h-3.5" /> Vidéo
              </button>
            </>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-bright text-white text-xs font-bold hover:bg-purple-mid disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Upload...
                </>
              ) : success ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Remplacé !
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" /> Remplacer
                </>
              )}
            </button>
          )}
          {custom && (
            <button
              onClick={onReset}
              title="Remettre l'image par défaut"
              className="px-3 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-purple-bright/30"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="mt-2 text-[10px] text-muted-foreground">
          {isMedia
            ? "Image (WebP, 10 Mo max) ou vidéo (MP4, 50 Mo max)"
            : asset.type === "video"
              ? "MP4 · 50 Mo max"
              : "Auto-converti en WebP · 1920px max · 10 Mo max"}
        </p>
      </div>
    </div>
  );
}
