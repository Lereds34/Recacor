import "server-only";

export interface SearchTerm {
  term: string;
  campaign: string;
  adGroup: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

export interface Campaign {
  id: string;
  name: string;
  status: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

export interface Keyword {
  text: string;
  matchType: string;
  campaign: string;
  adGroup: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  status: string;
}

export interface AdsReport {
  status: "connected" | "missing_config" | "error";
  message?: string;
  period?: { start: string; end: string };
  campaigns?: Campaign[];
  searchTerms?: SearchTerm[];
  keywords?: Keyword[];
  totals?: {
    impressions: number;
    clicks: number;
    cost: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

type GoogleError = {
  error?: {
    message?: string;
  };
};

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Identifiants OAuth Google manquants");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GoogleError & { access_token?: string };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error?.message ?? "Connexion OAuth impossible");
  }

  return payload.access_token;
}

async function adsSearch<T>(
  accessToken: string,
  customerId: string,
  developerToken: string,
  loginCustomerId: string | undefined,
  query: string,
): Promise<T> {
  const version = process.env.GOOGLE_ADS_API_VERSION || "v22";
  const url = `https://googleads.googleapis.com/${version}/customers/${customerId}/googleAds:searchStream`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "Content-Type": "application/json",
      ...(loginCustomerId ? { "login-customer-id": loginCustomerId } : {}),
    },
    body: JSON.stringify({ query: query.replace(/\s+/g, " ").trim() }),
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error((payload as GoogleError | null)?.error?.message ?? `Google Ads API ${response.status}`);
  }

  return payload as T;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

type AdsRow = {
  searchTermView?: { searchTerm?: string; status?: string };
  campaign?: { name?: string; id?: string; status?: string };
  adGroup?: { name?: string };
  metrics?: {
    impressions?: string;
    clicks?: string;
    costMicros?: string;
    conversions?: number;
    ctr?: number;
    averageCpc?: string;
  };
  adGroupCriterion?: {
    keyword?: { text?: string; matchType?: string };
    status?: string;
  };
};

export async function getGoogleAdsReport(): Promise<AdsReport> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID?.replaceAll("-", "");
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID?.replaceAll("-", "");

  if (!customerId || !developerToken) {
    return {
      status: "missing_config",
      message: "GOOGLE_ADS_CUSTOMER_ID ou GOOGLE_ADS_DEVELOPER_TOKEN manquant",
    };
  }

  try {
    const accessToken = await getAccessToken();
    const start = daysAgo(30);
    const end = daysAgo(0);

    const [campaignRows, searchTermRows, keywordRows] = await Promise.all([
      adsSearch<AdsRow[][]>(accessToken, customerId, developerToken, loginCustomerId, `
        SELECT
          campaign.id,
          campaign.name,
          campaign.status,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc
        FROM campaign
        WHERE segments.date BETWEEN '${start}' AND '${end}'
          AND campaign.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
      `),
      adsSearch<AdsRow[][]>(accessToken, customerId, developerToken, loginCustomerId, `
        SELECT
          search_term_view.search_term,
          search_term_view.status,
          campaign.name,
          ad_group.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions,
          metrics.ctr,
          metrics.average_cpc
        FROM search_term_view
        WHERE segments.date BETWEEN '${start}' AND '${end}'
          AND metrics.impressions > 0
        ORDER BY metrics.cost_micros DESC
        LIMIT 100
      `),
      adsSearch<AdsRow[][]>(accessToken, customerId, developerToken, loginCustomerId, `
        SELECT
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          ad_group_criterion.status,
          campaign.name,
          ad_group.name,
          metrics.impressions,
          metrics.clicks,
          metrics.cost_micros,
          metrics.conversions
        FROM keyword_view
        WHERE segments.date BETWEEN '${start}' AND '${end}'
          AND ad_group_criterion.type = 'KEYWORD'
          AND campaign.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 50
      `),
    ]);

    const campaigns: Campaign[] = campaignRows.flatMap((chunk) => chunk).map((row) => ({
      id: row.campaign?.id ?? "",
      name: row.campaign?.name ?? "",
      status: row.campaign?.status ?? "",
      impressions: Number(row.metrics?.impressions ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      cost: Number(row.metrics?.costMicros ?? 0) / 1_000_000,
      conversions: Number(row.metrics?.conversions ?? 0),
      ctr: Number(row.metrics?.ctr ?? 0),
      cpc: Number(row.metrics?.averageCpc ?? 0) / 1_000_000,
    }));

    const searchTerms: SearchTerm[] = searchTermRows.flatMap((chunk) => chunk).map((row) => ({
      term: row.searchTermView?.searchTerm ?? "",
      campaign: row.campaign?.name ?? "",
      adGroup: row.adGroup?.name ?? "",
      impressions: Number(row.metrics?.impressions ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      cost: Number(row.metrics?.costMicros ?? 0) / 1_000_000,
      conversions: Number(row.metrics?.conversions ?? 0),
      ctr: Number(row.metrics?.ctr ?? 0),
      cpc: Number(row.metrics?.averageCpc ?? 0) / 1_000_000,
    }));

    const keywords: Keyword[] = keywordRows.flatMap((chunk) => chunk).map((row) => ({
      text: row.adGroupCriterion?.keyword?.text ?? "",
      matchType: row.adGroupCriterion?.keyword?.matchType ?? "",
      campaign: row.campaign?.name ?? "",
      adGroup: row.adGroup?.name ?? "",
      impressions: Number(row.metrics?.impressions ?? 0),
      clicks: Number(row.metrics?.clicks ?? 0),
      cost: Number(row.metrics?.costMicros ?? 0) / 1_000_000,
      conversions: Number(row.metrics?.conversions ?? 0),
      status: row.adGroupCriterion?.status ?? "",
    }));

    const totals = campaigns.reduce(
      (acc, campaign) => ({
        impressions: acc.impressions + campaign.impressions,
        clicks: acc.clicks + campaign.clicks,
        cost: acc.cost + campaign.cost,
        conversions: acc.conversions + campaign.conversions,
        ctr: 0,
        cpc: 0,
      }),
      { impressions: 0, clicks: 0, cost: 0, conversions: 0, ctr: 0, cpc: 0 },
    );
    totals.ctr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0;
    totals.cpc = totals.clicks > 0 ? totals.cost / totals.clicks : 0;

    return {
      status: "connected",
      period: { start, end },
      campaigns,
      searchTerms,
      keywords,
      totals,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Erreur Google Ads inconnue",
    };
  }
}
