import { getSetting, setSetting } from "@/lib/db";

const INDEXATION_QUEUE_KEY = "seo.indexation.queue.v1";
const SEARCH_CONSOLE_SITE_URL = "https://www.recacor.fr/";
const INDEXNOW_HOST = "www.recacor.fr";
const INDEXNOW_KEY = "89933ede4c6b643f6667c45b8eea2d9c889231d7c81760d9a3b4d8832b3475d7";

export type IndexationState =
  | "unknown"
  | "crawled_not_indexed"
  | "indexed"
  | "other";

export type IndexationQueueItem = {
  url: string;
  createdAt: string;
  updatedAt: string;
  source?: string;
  note?: string;
  lastInspectionAt?: string;
  coverageState?: string;
  pageFetchState?: string;
  robotsTxtState?: string;
  lastCrawlTime?: string;
  googleCanonical?: string;
  userCanonical?: string;
  referringUrls?: number;
  verdict?: string;
  state: IndexationState;
  stateLabel: string;
  manualSubmittedAt?: string;
  recheckAfter?: string;
  lastIndexNowAt?: string;
  lastError?: string;
};

type InspectionResult = {
  url: string;
  verdict?: string;
  coverageState?: string;
  indexingState?: string;
  pageFetchState?: string;
  robotsTxtState?: string;
  lastCrawlTime?: string;
  googleCanonical?: string;
  userCanonical?: string;
  referringUrls?: string;
  error?: string;
};

function nowIso() {
  return new Date().toISOString();
}

function addDaysIso(iso: string, days: number) {
  const date = new Date(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
}

export function normalizeRecacorUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "https:") return null;
    if (url.hostname !== "www.recacor.fr" && url.hostname !== "recacor.fr") return null;
    url.hostname = "www.recacor.fr";
    url.hash = "";
    return url.toString().replace(/\/$/, (match, offset, value) => {
      return value === "https://www.recacor.fr/" ? "/" : "";
    });
  } catch {
    return null;
  }
}

function parseQueue(raw: string): IndexationQueueItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.url === "string");
  } catch {
    return [];
  }
}

async function saveQueue(items: IndexationQueueItem[]) {
  await setSetting(INDEXATION_QUEUE_KEY, JSON.stringify(items, null, 2));
}

export async function getIndexationQueue(): Promise<IndexationQueueItem[]> {
  const raw = await getSetting(INDEXATION_QUEUE_KEY, "");
  return parseQueue(raw).sort((a, b) => a.url.localeCompare(b.url));
}

export function deriveState(coverageState = ""): {
  state: IndexationState;
  stateLabel: string;
} {
  const value = coverageState.toLowerCase();

  if (
    value.includes("envoyée et indexée") ||
    value.includes("submitted and indexed") ||
    value.includes("url is on google")
  ) {
    return { state: "indexed", stateLabel: "Envoyée et indexée" };
  }

  if (
    value.includes("explorée, actuellement non indexée") ||
    value.includes("crawled - currently not indexed")
  ) {
    return {
      state: "crawled_not_indexed",
      stateLabel: "Explorée, actuellement non indexée",
    };
  }

  if (
    value.includes("google ne reconnaît pas cette url") ||
    value.includes("unknown to google")
  ) {
    return {
      state: "unknown",
      stateLabel: "Google ne reconnaît pas cette URL",
    };
  }

  return { state: "other", stateLabel: coverageState || "État API à relire" };
}

function mergeItem(
  existing: IndexationQueueItem | undefined,
  url: string,
  extra?: Partial<IndexationQueueItem>,
): IndexationQueueItem {
  const baseNow = nowIso();
  return {
    createdAt: existing?.createdAt ?? baseNow,
    state: existing?.state ?? "unknown",
    stateLabel: existing?.stateLabel ?? "Google ne reconnaît pas cette URL",
    source: existing?.source,
    note: existing?.note,
    ...existing,
    ...extra,
    url,
    updatedAt: baseNow,
  };
}

export async function addUrlsToQueue(
  rawUrls: string[],
  options?: { source?: string; note?: string },
): Promise<IndexationQueueItem[]> {
  const items = await getIndexationQueue();
  const map = new Map(items.map((item) => [item.url, item]));

  for (const rawUrl of rawUrls) {
    const url = normalizeRecacorUrl(rawUrl);
    if (!url) continue;
    map.set(
      url,
      mergeItem(map.get(url), url, {
        source: options?.source ?? map.get(url)?.source,
        note: options?.note ?? map.get(url)?.note,
      }),
    );
  }

  const next = [...map.values()].sort((a, b) => a.url.localeCompare(b.url));
  await saveQueue(next);
  return next;
}

async function getAccessToken() {
  const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!id || !secret || !refresh) {
    throw new Error(
      "Variables OAuth manquantes : GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN",
    );
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      refresh_token: refresh,
      grant_type: "refresh_token",
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error_description ?? json.error ?? "OAuth failed");
  }

  return json.access_token as string;
}

async function inspectSingleUrl(token: string, inspectionUrl: string): Promise<InspectionResult> {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: process.env.SEARCH_CONSOLE_SITE_URL || SEARCH_CONSOLE_SITE_URL,
      languageCode: "fr-FR",
    }),
  });

  const json = await res.json();
  if (!res.ok) {
    return {
      url: inspectionUrl,
      error: json.error?.message ?? json.error ?? `HTTP ${res.status}`,
    };
  }

  const result = json.inspectionResult ?? {};
  const idx = result.indexStatusResult ?? {};
  return {
    url: inspectionUrl,
    verdict: result.verdict ?? "",
    coverageState: idx.coverageState ?? "",
    indexingState: idx.indexingState ?? "",
    pageFetchState: idx.pageFetchState ?? "",
    robotsTxtState: idx.robotsTxtState ?? "",
    lastCrawlTime: idx.lastCrawlTime ?? "",
    googleCanonical: idx.googleCanonical ?? "",
    userCanonical: idx.userCanonical ?? "",
    referringUrls: String(idx.referringUrls?.length ?? 0),
  };
}

export async function inspectQueueUrls(rawUrls?: string[]) {
  const items = await getIndexationQueue();
  const targets = new Set(
    (rawUrls ?? items.map((item) => item.url))
      .map((url) => normalizeRecacorUrl(url))
      .filter(Boolean) as string[],
  );

  const token = await getAccessToken();
  const next = [...items];

  for (let index = 0; index < next.length; index += 1) {
    const item = next[index];
    if (!targets.has(item.url)) continue;

    const inspected = await inspectSingleUrl(token, item.url);
    const inspectedAt = nowIso();

    if (inspected.error) {
      next[index] = mergeItem(item, item.url, {
        lastInspectionAt: inspectedAt,
        lastError: inspected.error,
      });
      continue;
    }

    const { state, stateLabel } = deriveState(inspected.coverageState);
    next[index] = mergeItem(item, item.url, {
      lastInspectionAt: inspectedAt,
      coverageState: inspected.coverageState,
      pageFetchState: inspected.pageFetchState,
      robotsTxtState: inspected.robotsTxtState,
      lastCrawlTime: inspected.lastCrawlTime,
      googleCanonical: inspected.googleCanonical,
      userCanonical: inspected.userCanonical,
      referringUrls: Number(inspected.referringUrls ?? 0),
      verdict: inspected.verdict,
      state,
      stateLabel,
      lastError: "",
    });
  }

  await saveQueue(next);
  return next;
}

export async function markUrlsSubmitted(rawUrls: string[]) {
  const items = await getIndexationQueue();
  const submittedAt = nowIso();
  const targets = new Set(
    rawUrls.map((url) => normalizeRecacorUrl(url)).filter(Boolean) as string[],
  );

  const next = items.map((item) =>
    targets.has(item.url)
      ? mergeItem(item, item.url, {
          manualSubmittedAt: submittedAt,
          recheckAfter: addDaysIso(submittedAt, 5),
        })
      : item,
  );

  await saveQueue(next);
  return next;
}

export async function removeUrls(rawUrls: string[]) {
  const targets = new Set(
    rawUrls.map((url) => normalizeRecacorUrl(url)).filter(Boolean) as string[],
  );
  const items = await getIndexationQueue();
  const next = items.filter((item) => !targets.has(item.url));
  await saveQueue(next);
  return next;
}

export async function submitIndexNow(rawUrls?: string[]) {
  const items = await getIndexationQueue();
  const urls = (rawUrls ?? items.map((item) => item.url))
    .map((url) => normalizeRecacorUrl(url))
    .filter(Boolean) as string[];

  if (!urls.length) {
    return { ok: true, count: 0, items };
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!res.ok && res.status !== 202) {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow erreur HTTP ${res.status}${text ? `: ${text}` : ""}`);
  }

  const sentAt = nowIso();
  const targetSet = new Set(urls);
  const next = items.map((item) =>
    targetSet.has(item.url)
      ? mergeItem(item, item.url, { lastIndexNowAt: sentAt, lastError: "" })
      : item,
  );

  await saveQueue(next);
  return { ok: true, count: urls.length, items: next };
}

export function buildRecommendedLot(items: IndexationQueueItem[]) {
  return items
    .filter((item) => item.state !== "indexed" && !item.manualSubmittedAt)
    .sort((a, b) => {
      if ((a.lastInspectionAt ?? "") !== (b.lastInspectionAt ?? "")) {
        return (a.lastInspectionAt ?? "").localeCompare(b.lastInspectionAt ?? "");
      }
      return a.createdAt.localeCompare(b.createdAt);
    })
    .slice(0, 10);
}

export function buildIndexationSummary(items: IndexationQueueItem[]) {
  const summary = {
    total: items.length,
    indexed: 0,
    crawledNotIndexed: 0,
    unknown: 0,
    other: 0,
    submitted: 0,
    waitingRecheck: 0,
  };

  const now = Date.now();

  for (const item of items) {
    if (item.state === "indexed") summary.indexed += 1;
    else if (item.state === "crawled_not_indexed") summary.crawledNotIndexed += 1;
    else if (item.state === "unknown") summary.unknown += 1;
    else summary.other += 1;

    if (item.manualSubmittedAt) summary.submitted += 1;
    if (item.recheckAfter && new Date(item.recheckAfter).getTime() <= now) {
      summary.waitingRecheck += 1;
    }
  }

  return summary;
}
