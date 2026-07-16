import { inngest } from "./client";

const ANALYTICS_URL =
  "https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics";

type SourceBlock = { error?: string | null } | null;

type MarketingHealthResponse = {
  ga4?: SourceBlock;
  google_ads?: SourceBlock;
  meta_ads?: SourceBlock;
  search_console?: SourceBlock;
  crm_aggregate?: { total_leads?: number } | null;
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export const checkMarketingSources = inngest.createFunction(
  {
    id: "check-marketing-sources",
    name: "Controle quotidien des sources marketing",
    retries: 3,
    triggers: [
      { cron: "TZ=Europe/Paris 15 7 * * *" },
      { event: "recacor/marketing.health.requested" },
    ],
  },
  async ({ step }) => {
    const apiKey = process.env.ADSFLOW_ANALYTICS_API_KEY;
    if (!apiKey) {
      throw new Error("ADSFLOW_ANALYTICS_API_KEY est manquant");
    }

    const result = await step.run("interroger-adsflow", async () => {
      const end = new Date();
      const start = new Date(end);
      start.setUTCDate(start.getUTCDate() - 7);
      const url = new URL(ANALYTICS_URL);
      url.searchParams.set("start", isoDate(start));
      url.searchParams.set("end", isoDate(end));

      const response = await fetch(url, {
        headers: { "X-Api-Key": apiKey },
        signal: AbortSignal.timeout(20_000),
      });

      if (!response.ok) {
        throw new Error(`AdsFlow analytics a repondu ${response.status}`);
      }

      return (await response.json()) as MarketingHealthResponse;
    });

    const failures = [
      ["GA4", result.ga4],
      ["Google Ads", result.google_ads],
      ["Meta Ads", result.meta_ads],
      ["Search Console", result.search_console],
    ]
      .filter(([, source]) => !source || (source as SourceBlock)?.error)
      .map(([name, source]) => ({
        source: name,
        error: (source as SourceBlock)?.error ?? "source absente",
      }));

    if (failures.length > 0) {
      throw new Error(`Sources marketing indisponibles: ${JSON.stringify(failures)}`);
    }

    return {
      status: "ok",
      totalLeads: result.crm_aggregate?.total_leads ?? null,
      checkedAt: new Date().toISOString(),
    };
  },
);
