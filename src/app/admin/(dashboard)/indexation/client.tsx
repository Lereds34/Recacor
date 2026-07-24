"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, ExternalLink, Loader2, Plus, RefreshCw, Search, Send, Trash2 } from "lucide-react";
import type { IndexationQueueItem } from "@/lib/indexation-admin";

type Summary = {
  total: number;
  indexed: number;
  crawledNotIndexed: number;
  unknown: number;
  other: number;
  submitted: number;
  waitingRecheck: number;
};

type ApiPayload = {
  items: IndexationQueueItem[];
  recommendedLot: IndexationQueueItem[];
  summary: Summary;
  error?: string;
};

const STATUS_BADGES: Record<IndexationQueueItem["state"], string> = {
  indexed: "bg-green-100 text-green-800",
  crawled_not_indexed: "bg-amber-100 text-amber-800",
  unknown: "bg-slate-200 text-slate-800",
  other: "bg-purple-100 text-purple-800",
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("fr-FR");
}

function splitUrls(input: string) {
  return input
    .split(/\r?\n|,|;/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export function IndexationAdminClient({
  initialItems,
  initialSummary,
  initialRecommendedLot,
}: {
  initialItems: IndexationQueueItem[];
  initialSummary: Summary;
  initialRecommendedLot: IndexationQueueItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const [summary, setSummary] = useState(initialSummary);
  const [recommendedLot, setRecommendedLot] = useState(initialRecommendedLot);
  const [urlsInput, setUrlsInput] = useState("");
  const [source, setSource] = useState("cluster marques");
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const submittedUrls = useMemo(() => recommendedLot.map((item) => item.url), [recommendedLot]);

  const syncState = (payload: ApiPayload, successMessage?: string) => {
    setItems(payload.items);
    setSummary(payload.summary);
    setRecommendedLot(payload.recommendedLot);
    setMessage(payload.error ? `Erreur : ${payload.error}` : successMessage || "");
  };

  const postAction = async (
    action: "add" | "inspect" | "indexnow" | "mark_submitted" | "remove",
    body: Record<string, unknown>,
    successMessage: string,
  ) => {
    setBusy(action);
    setMessage("");
    try {
      const res = await fetch("/api/admin/indexation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...body }),
      });
      const payload = (await res.json()) as ApiPayload;
      if (!res.ok) {
        throw new Error(payload.error || "Action impossible");
      }
      syncState(payload, successMessage);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setBusy(null);
    }
  };

  const addUrls = async () => {
    const urls = splitUrls(urlsInput);
    if (!urls.length) return;
    await postAction("add", { urls, source }, `${urls.length} URL(s) ajoutée(s) à la file.`);
    setUrlsInput("");
  };

  const inspectAll = async () => {
    await postAction("inspect", {}, "Inspection API terminée.");
  };

  const inspectRecommended = async () => {
    if (!submittedUrls.length) return;
    await postAction(
      "inspect",
      { urls: submittedUrls },
      "Lot recommandé inspecté.",
    );
  };

  const sendRecommendedToIndexNow = async () => {
    if (!submittedUrls.length) return;
    await postAction(
      "indexnow",
      { urls: submittedUrls },
      "Lot recommandé notifié à IndexNow.",
    );
  };

  const markRecommendedSubmitted = async () => {
    if (!submittedUrls.length) return;
    await postAction(
      "mark_submitted",
      { urls: submittedUrls },
      "Lot recommandé marqué comme soumis manuellement dans GSC.",
    );
  };

  const copyRecommendedUrls = async () => {
    if (!submittedUrls.length) return;
    await navigator.clipboard.writeText(submittedUrls.join("\n"));
    setMessage("Lot recommandé copié dans le presse-papiers.");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {[
          { label: "Total", value: summary.total },
          { label: "Indexées", value: summary.indexed },
          { label: "Explorées non indexées", value: summary.crawledNotIndexed },
          { label: "Google ne reconnaît pas", value: summary.unknown },
          { label: "Autres états", value: summary.other },
          { label: "Déjà soumises", value: summary.submitted },
          { label: "Recheck à faire", value: summary.waitingRecheck },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{card.label}</p>
            <p className="mt-2 text-3xl font-black">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-3xl border border-border bg-white p-6 space-y-4">
          <div>
            <h2 className="text-xl font-black">Ajouter des URLs à suivre</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Utiliser uniquement des URLs complètes Recacor, une par ligne.
            </p>
          </div>
          <textarea
            rows={8}
            value={urlsInput}
            onChange={(e) => setUrlsInput(e.target.value)}
            placeholder="https://www.recacor.fr/pneus-voiture/peugeot"
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright resize-none"
          />
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source du lot"
            className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-bright"
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={addUrls}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 rounded-full bg-purple-bright px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Ajouter à la file
            </button>
            <button
              onClick={inspectAll}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold disabled:opacity-50"
            >
              {busy === "inspect" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Inspecter toute la file
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 space-y-4">
          <div>
            <h2 className="text-xl font-black">Prochain lot manuel GSC</h2>
            <p className="text-sm text-muted-foreground mt-1">
              10 URLs max, déjà pré-vérifiées via l&apos;API avant soumission manuelle.
            </p>
          </div>

          <div className="rounded-2xl bg-muted/50 p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">URLs recommandées</p>
            <div className="space-y-2 max-h-64 overflow-auto">
              {recommendedLot.length ? (
                recommendedLot.map((item) => (
                  <div key={item.url} className="rounded-xl border border-border bg-white px-3 py-2 text-xs">
                    <div className="font-semibold break-all">{item.url}</div>
                    <div className="mt-1 text-muted-foreground">{item.stateLabel}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Aucune URL en attente dans le lot recommandé.</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={inspectRecommended}
              disabled={busy !== null || !recommendedLot.length}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${busy === "inspect" ? "animate-spin" : ""}`} />
              Réinspecter le lot
            </button>
            <button
              onClick={sendRecommendedToIndexNow}
              disabled={busy !== null || !recommendedLot.length}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              IndexNow ciblé
            </button>
            <button
              onClick={copyRecommendedUrls}
              disabled={!recommendedLot.length}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              <ExternalLink className="h-4 w-4" />
              Copier le lot
            </button>
            <button
              onClick={markRecommendedSubmitted}
              disabled={busy !== null || !recommendedLot.length}
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              Marquer soumis dans GSC
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="rounded-2xl border border-border bg-white px-4 py-3 text-sm">
          {message}
        </div>
      )}

      <div className="rounded-3xl border border-border bg-white overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-xl font-black">File d&apos;attente indexation</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">URL</th>
                <th className="px-4 py-3 font-semibold">État API</th>
                <th className="px-4 py-3 font-semibold">Dernière inspection</th>
                <th className="px-4 py-3 font-semibold">Crawl Google</th>
                <th className="px-4 py-3 font-semibold">Soumise GSC</th>
                <th className="px-4 py-3 font-semibold">Recheck</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.url} className="border-t border-border align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold break-all">{item.url}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.coverageState || "Pas encore inspectée"}
                    </div>
                    {item.lastError ? (
                      <div className="mt-1 text-xs text-red-600">{item.lastError}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGES[item.state]}`}>
                      {item.stateLabel}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{formatDate(item.lastInspectionAt)}</td>
                  <td className="px-4 py-4 text-muted-foreground">{formatDate(item.lastCrawlTime)}</td>
                  <td className="px-4 py-4 text-muted-foreground">{formatDate(item.manualSubmittedAt)}</td>
                  <td className="px-4 py-4">
                    {item.recheckAfter ? (
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                        <Clock3 className="h-3.5 w-3.5" />
                        {formatDate(item.recheckAfter)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => postAction("inspect", { urls: [item.url] }, "URL réinspectée.")}
                        disabled={busy !== null}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Inspecter
                      </button>
                      <button
                        onClick={() => postAction("mark_submitted", { urls: [item.url] }, "URL marquée comme soumise dans GSC.")}
                        disabled={busy !== null}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Soumise
                      </button>
                      <button
                        onClick={() => postAction("remove", { urls: [item.url] }, "URL retirée de la file.")}
                        disabled={busy !== null}
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Retirer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                    Aucune URL en file d&apos;attente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
