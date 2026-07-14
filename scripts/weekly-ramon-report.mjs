#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const REPORT_DIR = resolve(ROOT, "public/briefings/ramon-hebdo");
const LATEST_HTML_PATH = resolve(REPORT_DIR, "latest.html");
const LATEST_JSON_PATH = resolve(REPORT_DIR, "latest.json");

const ANALYTICS_URL = "https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics";
const ANALYTICS_API_KEY = process.env.MARKETING_ANALYTICS_API_KEY || "recacor-analytics-2026";
const REPORT_BASE_URL = process.env.RAMON_REPORT_BASE_URL || "https://www.recacor.fr/briefings/ramon-hebdo";
const REPORT_LATEST_URL = `${REPORT_BASE_URL}/latest.html`;
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Recacor";
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "recacor.fr@gmail.com";

const args = new Set(process.argv.slice(2));
const argValue = (flag) => {
  const list = process.argv.slice(2);
  const index = list.indexOf(flag);
  return index >= 0 ? list[index + 1] : undefined;
};

const SHOULD_WRITE = args.has("--write") || (!args.has("--send") && !args.has("--from-file"));
const SHOULD_SEND = args.has("--send");
const FROM_FILE = argValue("--from-file");
const OVERRIDE_TO = argValue("--to");

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatIso(date) {
  const d = startOfDay(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function computePreviousFullWeekRange(anchor = new Date()) {
  const base = startOfDay(anchor);
  const dayIndex = (base.getDay() + 6) % 7; // Monday = 0
  const currentMonday = new Date(base);
  currentMonday.setDate(base.getDate() - dayIndex);

  const start = new Date(currentMonday);
  start.setDate(currentMonday.getDate() - 7);

  const end = new Date(currentMonday);
  end.setDate(currentMonday.getDate() - 1);

  return { start: formatIso(start), end: formatIso(end) };
}

function escapeHtml(input) {
  return String(input ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(Number(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat("fr-FR").format(Number(value || 0));
}

function formatPercent(value, digits = 1) {
  return `${Number(value || 0).toFixed(digits)}%`;
}

function formatDateLong(isoDate) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00Z`));
}

function formatDateShort(isoDate) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${isoDate}T12:00:00Z`));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function arrayToMap(items, keyField = "status", valueField = "count") {
  const map = new Map();
  for (const item of items || []) {
    map.set(item[keyField], Number(item[valueField] || 0));
  }
  return map;
}

function sumByStatus(statusMap, names) {
  return names.reduce((sum, name) => sum + Number(statusMap.get(name) || 0), 0);
}

function classifyMetaCampaign(campaign) {
  const name = String(campaign?.name || "").toUpperCase();
  if (name.includes("_PL_") || name.includes("PL_")) return "PL";
  if (name.includes("_VL_") || name.includes("VL_")) return "VL";
  return "Autre";
}

function buildInsights(data) {
  const insights = [];
  const totalSpend = data.spend.total;

  if (data.pipeline.newLeads > 0) {
    insights.push(`${formatNumber(data.pipeline.newLeads)} leads sont encore au statut NOUVEAU : point de vigilance sur la prise en main commerciale.`);
  }

  if (data.pipeline.treatedLeads > 0 && data.kpis.leads > 0) {
    const treatedRate = (data.pipeline.treatedLeads / data.kpis.leads) * 100;
    insights.push(`${formatNumber(data.pipeline.treatedLeads)} leads ont deja quitte le statut NOUVEAU, soit ${formatPercent(treatedRate)} du volume CRM de la semaine.`);
  }

  if (data.meta.bestCampaign) {
    insights.push(
      `Meilleure campagne Meta en CPL : ${data.meta.bestCampaign.name} a ${formatCurrency(data.meta.bestCampaign.cpl)} pour ${formatNumber(data.meta.bestCampaign.leads)} leads.`
    );
  }

  if (data.meta.watchCampaign) {
    insights.push(
      `Campagne Meta a surveiller : ${data.meta.watchCampaign.name} a ${formatCurrency(data.meta.watchCampaign.cpl)} de CPL pour ${formatNumber(data.meta.watchCampaign.leads)} leads.`
    );
  }

  if (data.google.cpa > 0) {
    insights.push(
      `Google Ads reste lisible sur la semaine avec ${formatCurrency(data.google.spend)} de depense et un CPA moyen de ${formatCurrency(data.google.cpa)}.`
    );
  }

  if (data.kpis.sessions > 0 || data.kpis.seoClicks > 0) {
    insights.push(
      `Le site a enregistre ${formatNumber(data.kpis.sessions)} sessions GA4 et ${formatNumber(data.kpis.seoClicks)} clics SEO sur la periode.`
    );
  }

  if (totalSpend > 0 && data.kpis.leads > 0) {
    insights.push(
      `Lecture simple du cout global d acquisition : ${formatCurrency(totalSpend / data.kpis.leads)} par lead CRM sur cette semaine, toutes plateformes confondues.`
    );
  }

  return insights.slice(0, 6);
}

async function fetchAnalytics(start, end) {
  const url = `${ANALYTICS_URL}?start=${start}&end=${end}`;
  const response = await fetch(url, {
    headers: {
      "X-Api-Key": ANALYTICS_API_KEY,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`marketing-analytics HTTP ${response.status}: ${JSON.stringify(data)}`);
  }

  return data;
}

function buildReportData(raw, start, end) {
  const statuses = arrayToMap(raw.crm_aggregate?.leads_by_status || []);
  const sources = (raw.crm_aggregate?.leads_by_source || []).map((item) => ({
    label: item.source,
    value: Number(item.count || 0),
  }));
  const segments = (raw.crm_aggregate?.leads_by_segment || []).map((item) => ({
    label: item.segment.toUpperCase(),
    value: Number(item.count || 0),
  }));

  const totalLeads = Number(raw.crm_aggregate?.total_leads || 0);
  const newLeads = Number(statuses.get("NOUVEAU") || 0);
  const treatedLeads = Math.max(0, totalLeads - newLeads);

  const metaCampaigns = (raw.meta_ads?.campaigns || []).map((campaign) => ({
    name: campaign.name,
    segment: classifyMetaCampaign(campaign),
    spend: Number(campaign.spend || 0),
    leads: Number(campaign.leads || 0),
    cpl: Number(campaign.cpl || 0),
  }));

  const metaCampaignsWithLeads = metaCampaigns.filter((item) => item.leads > 0);
  const bestMetaCampaign = [...metaCampaignsWithLeads].sort((a, b) => a.cpl - b.cpl)[0] || null;
  const worstMetaCampaign = [...metaCampaignsWithLeads].sort((a, b) => b.cpl - a.cpl)[0] || null;

  const googleCampaigns = (raw.google_ads?.campaigns || []).map((campaign) => ({
    name: campaign.name,
    type: campaign.type || "",
    spend: Number(campaign.spend || 0),
    conversions: Number(campaign.conversions || 0),
    cpa: Number(campaign.cpa || 0),
  }));

  const metaSpend = Number(raw.meta_ads?.spend || 0);
  const googleSpend = Number(raw.google_ads?.spend || 0);
  const totalSpend = metaSpend + googleSpend;

  const label = `Semaine du ${formatDateLong(start)} au ${formatDateLong(end)}`;
  const archiveSlug = `${start}_au_${end}`;

  const report = {
    generatedAt: new Date().toISOString(),
    period: {
      start,
      end,
      label,
      archiveSlug,
    },
    reportUrl: REPORT_LATEST_URL,
    archiveUrl: `${REPORT_BASE_URL}/${archiveSlug}.html`,
    kpis: {
      spendTotal: totalSpend,
      spendMeta: metaSpend,
      spendGoogle: googleSpend,
      leads: totalLeads,
      leadsMeta: Number(raw.meta_ads?.leads || 0),
      sessions: Number(raw.ga4?.sessions || 0),
      seoClicks: Number(raw.search_console?.clicks || 0),
      googleConversions: Number(raw.google_ads?.conversions || 0),
      googleCpa: Number(raw.google_ads?.cpa || 0),
      metaCpl: Number(raw.meta_ads?.cpl || 0),
      ga4Source: raw.ga4?.source || "unknown",
    },
    spend: {
      total: totalSpend,
      meta: metaSpend,
      google: googleSpend,
    },
    pipeline: {
      treatedLeads,
      newLeads,
      qualifie: Number(statuses.get("QUALIFIE") || 0),
      appelDecroche: Number(statuses.get("APPEL_DECROCHE") || 0),
      devisEnvoye: Number(statuses.get("DEVIS_ENVOYE") || 0),
      accordVerbal: Number(statuses.get("ACCORD_VERBAL") || 0),
      pasInteresse: Number(statuses.get("PAS_INTERESSE") || 0),
      mauvaisNumero: Number(statuses.get("MAUVAIS_NUMERO") || 0),
      aRelancer: sumByStatus(statuses, ["A_RELANCER", "A_RAPPELER"]),
    },
    statusBreakdown: (raw.crm_aggregate?.leads_by_status || []).map((item) => ({
      label: item.status,
      value: Number(item.count || 0),
    })),
    sourceBreakdown: sources,
    segmentBreakdown: segments,
    meta: {
      impressions: Number(raw.meta_ads?.impressions || 0),
      clicks: Number(raw.meta_ads?.clicks || 0),
      campaigns: metaCampaigns,
      bestCampaign: bestMetaCampaign,
      watchCampaign:
        worstMetaCampaign && worstMetaCampaign.cpl >= Math.max(10, Number(raw.meta_ads?.cpl || 0) * 1.8)
          ? worstMetaCampaign
          : null,
    },
    google: {
      impressions: Number(raw.google_ads?.impressions || 0),
      clicks: Number(raw.google_ads?.clicks || 0),
      ctr: Number(raw.google_ads?.ctr || 0),
      cpc: Number(raw.google_ads?.cpc || 0),
      spend: googleSpend,
      conversions: Number(raw.google_ads?.conversions || 0),
      cpa: Number(raw.google_ads?.cpa || 0),
      campaigns: googleCampaigns,
    },
    traffic: {
      sessions: Number(raw.ga4?.sessions || 0),
      pageviews: Number(raw.ga4?.pageviews || 0),
      users: Number(raw.ga4?.users || 0),
      bounceRate: Number(raw.ga4?.bounce_rate || raw.ga4?.bounceRate || 0),
      avgSessionDuration: Number(raw.ga4?.avg_session_duration || 0),
      topSources: raw.ga4?.traffic_by_source || [],
    },
    seo: {
      clicks: Number(raw.search_console?.clicks || 0),
      impressions: Number(raw.search_console?.impressions || 0),
      ctr: Number(raw.search_console?.ctr || 0),
      avgPosition: Number(raw.search_console?.avg_position || 0),
      topQueries: raw.search_console?.top_queries || [],
      topPages: raw.search_console?.top_pages || [],
    },
    anomalies: [
      reportGa4Anomaly(raw),
      reportUnprocessedAnomaly(totalLeads, newLeads),
      reportMetaWatch(worstMetaCampaign),
    ].filter(Boolean),
  };

  report.insights = buildInsights(report);
  return report;
}

function reportGa4Anomaly(raw) {
  if (raw.ga4?.source !== "live") {
    return "GA4 ne repond pas en source live sur cette periode : la lecture trafic doit etre prise avec prudence.";
  }
  return null;
}

function reportUnprocessedAnomaly(totalLeads, newLeads) {
  if (!totalLeads || !newLeads) return null;
  const ratio = (newLeads / totalLeads) * 100;
  if (ratio >= 10) {
    return `${formatNumber(newLeads)} leads restent au statut NOUVEAU, soit ${formatPercent(ratio)} du volume de la semaine.`;
  }
  return null;
}

function reportMetaWatch(campaign) {
  if (!campaign) return null;
  return `Meta a au moins une campagne a CPL tres eleve cette semaine : ${campaign.name} a ${formatCurrency(campaign.cpl)}.`;
}

function renderMetricCard(label, value, sub, tone = "default") {
  return `
    <article class="metric ${tone}">
      <div class="metric-label">${escapeHtml(label)}</div>
      <div class="metric-value">${escapeHtml(value)}</div>
      <div class="metric-sub">${escapeHtml(sub)}</div>
    </article>
  `;
}

function renderMiniStat(label, value) {
  return `
    <div class="mini-stat">
      <div class="mini-stat-label">${escapeHtml(label)}</div>
      <div class="mini-stat-value">${escapeHtml(value)}</div>
    </div>
  `;
}

function renderSimpleRows(rows, formatter = (item) => item.value) {
  return rows
    .map(
      (item) => `
        <div class="simple-row">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(formatter(item))}</strong>
        </div>
      `
    )
    .join("");
}

function renderMetaCampaignRows(rows) {
  return rows
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.segment)}</td>
          <td class="num">${escapeHtml(formatCurrency(item.spend))}</td>
          <td class="num">${escapeHtml(formatNumber(item.leads))}</td>
          <td class="num">${escapeHtml(formatCurrency(item.cpl))}</td>
        </tr>
      `
    )
    .join("");
}

function renderGoogleCampaignRows(rows) {
  return rows
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.type)}</td>
          <td class="num">${escapeHtml(formatCurrency(item.spend))}</td>
          <td class="num">${escapeHtml(formatNumber(item.conversions))}</td>
          <td class="num">${escapeHtml(formatCurrency(item.cpa))}</td>
        </tr>
      `
    )
    .join("");
}

function renderReportHtml(report) {
  const statusRows = renderSimpleRows(report.statusBreakdown.slice(0, 8), (item) => formatNumber(item.value));
  const sourceRows = renderSimpleRows(report.sourceBreakdown, (item) => formatNumber(item.value));
  const segmentRows = renderSimpleRows(report.segmentBreakdown, (item) => formatNumber(item.value));
  const metaRows = renderMetaCampaignRows(report.meta.campaigns);
  const googleRows = renderGoogleCampaignRows(report.google.campaigns);
  const insights = report.insights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const anomalies = report.anomalies.length
    ? report.anomalies.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : `<li>Aucune alerte bloquante detectee dans les donnees agregees de la semaine.</li>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex,max-snippet:0,max-image-preview:none,max-video-preview:0" />
  <title>Recacor - Rapport hebdo Ramon - ${escapeHtml(report.period.label)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #f6f1e8;
      --paper: rgba(255,255,255,0.9);
      --line: rgba(25,35,63,0.1);
      --ink: #19233f;
      --muted: #68748d;
      --indigo: #2e2d8a;
      --blue: #1b4fd8;
      --mint: #d9f8de;
      --gold: #fff2c8;
      --rose: #ffd9ce;
      --lavender: #e2e6ff;
      --shadow: 0 24px 64px rgba(20, 28, 61, 0.12);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Manrope", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(circle at top left, rgba(27,79,216,0.12), transparent 20%),
        radial-gradient(circle at top right, rgba(245,201,106,0.18), transparent 24%),
        linear-gradient(180deg, #f7f2ea 0%, #efe5d7 100%);
    }
    .page {
      width: min(1320px, calc(100vw - 28px));
      margin: 20px auto 40px;
      display: grid;
      gap: 20px;
    }
    .panel {
      background: var(--paper);
      border: 1px solid rgba(255,255,255,0.8);
      border-radius: 28px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }
    .hero {
      padding: 34px;
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) 340px;
      gap: 24px;
      align-items: stretch;
      overflow: hidden;
      position: relative;
    }
    .hero::after {
      content: "";
      position: absolute;
      right: -80px;
      top: -100px;
      width: 320px;
      height: 320px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(27,79,216,0.12), transparent 70%);
      pointer-events: none;
    }
    .eyebrow, .section-tag, .metric-label, .mini-stat-label, th {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 800;
      color: var(--muted);
    }
    .hero-title, .metric-value, .big-number {
      margin: 0;
      font-family: "Barlow Condensed", Impact, sans-serif;
      text-transform: uppercase;
      line-height: 0.95;
      letter-spacing: -0.02em;
    }
    .hero-title {
      font-size: clamp(44px, 6vw, 84px);
      max-width: 9ch;
    }
    .hero-copy {
      margin: 18px 0 0;
      max-width: 54ch;
      color: var(--muted);
      line-height: 1.65;
      font-size: 17px;
    }
    .hero-side {
      border-radius: 24px;
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,247,241,0.92));
      padding: 24px;
      position: relative;
      overflow: hidden;
    }
    .hero-side::before {
      content: "";
      position: absolute;
      inset: 0 auto 0 0;
      width: 6px;
      background: linear-gradient(180deg, #2e2d8a 0%, #1b4fd8 100%);
    }
    .hero-side p {
      margin: 10px 0 0;
      color: var(--muted);
      line-height: 1.6;
      font-size: 14px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }
    .metric {
      min-width: 0;
      padding: 20px;
      border-radius: 22px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.82);
    }
    .metric.blue { background: rgba(226,230,255,0.85); }
    .metric.mint { background: rgba(217,248,222,0.82); }
    .metric.gold { background: rgba(255,247,225,0.92); }
    .metric.rose { background: rgba(255,217,206,0.8); }
    .metric-value {
      margin-top: 10px;
      font-size: clamp(34px, 4vw, 56px);
    }
    .metric-sub {
      margin-top: 10px;
      color: var(--muted);
      line-height: 1.5;
      font-size: 14px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 20px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }
    .block, .table-card {
      min-width: 0;
      padding: 22px;
      border-radius: 24px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.82);
    }
    .block h2 {
      margin: 8px 0 0;
      font-size: 24px;
      line-height: 1.2;
    }
    .mini-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 16px;
    }
    .mini-stat {
      padding: 14px;
      border-radius: 18px;
      background: rgba(255,255,255,0.76);
      border: 1px solid var(--line);
    }
    .mini-stat-value {
      margin-top: 6px;
      font-size: 26px;
      font-weight: 800;
      color: var(--ink);
    }
    .list-card ul {
      margin: 14px 0 0;
      padding-left: 18px;
      color: var(--muted);
      line-height: 1.65;
    }
    .simple-list {
      margin-top: 16px;
      display: grid;
      gap: 10px;
    }
    .simple-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(25,35,63,0.08);
      color: var(--muted);
      font-size: 14px;
    }
    .simple-row strong {
      color: var(--ink);
      font-variant-numeric: tabular-nums;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    th, td {
      padding: 12px 10px;
      border-bottom: 1px solid rgba(25,35,63,0.08);
      text-align: left;
      vertical-align: top;
      font-size: 14px;
    }
    td.num {
      text-align: right;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .footer-note {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.6;
      padding: 0 4px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--indigo);
      background: rgba(226,230,255,0.8);
      border: 1px solid var(--line);
    }
    @media (max-width: 1100px) {
      .hero,
      .grid-2,
      .metrics {
        grid-template-columns: 1fr;
      }
      .mini-stats,
      .grid-3 {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="panel hero">
      <div>
        <div class="eyebrow">Recacor · Rapport hebdo Ramon</div>
        <h1 class="hero-title">Depenses, leads et traitement commercial</h1>
        <p class="hero-copy">
          ${escapeHtml(report.period.label)}. Lecture hebdomadaire simple pour suivre les depenses media,
          le volume de leads, l'avancement commercial dans AdsFlow et les signaux a surveiller.
        </p>
      </div>
      <aside class="hero-side">
        <div class="section-tag">Message cle</div>
        <h2>Un point hebdo lisible pour relier acquisition et traitement commercial.</h2>
        <p>
          Cette version met volontairement l'accent sur la semaine ecoulee : depenses Meta et Google,
          leads entres dans AdsFlow, appels decroches, leads pris en main, et campagnes a surveiller.
        </p>
        <div class="mini-stats">
          ${renderMiniStat("Depense totale", formatCurrency(report.kpis.spendTotal))}
          ${renderMiniStat("Leads CRM", formatNumber(report.kpis.leads))}
          ${renderMiniStat("Leads traites", formatNumber(report.pipeline.treatedLeads))}
        </div>
      </aside>
    </section>

    <section class="metrics">
      ${renderMetricCard("Depense totale", formatCurrency(report.kpis.spendTotal), `${formatCurrency(report.kpis.spendMeta)} Meta + ${formatCurrency(report.kpis.spendGoogle)} Google`, "blue")}
      ${renderMetricCard("Leads CRM", formatNumber(report.kpis.leads), `${formatNumber(report.kpis.leadsMeta)} leads Meta inclus dans le total`, "mint")}
      ${renderMetricCard("Leads traites", formatNumber(report.pipeline.treatedLeads), `${formatNumber(report.pipeline.newLeads)} leads encore au statut NOUVEAU`, "gold")}
      ${renderMetricCard("Appels decroches", formatNumber(report.pipeline.appelDecroche), `${formatNumber(report.pipeline.accordVerbal)} accords verbaux · ${formatNumber(report.pipeline.devisEnvoye)} devis envoyes`, "rose")}
    </section>

    <section class="grid-2">
      <article class="block list-card">
        <div class="section-tag">A retenir</div>
        <h2>Synthese automatique de la semaine</h2>
        <ul>${insights}</ul>
      </article>
      <article class="block list-card">
        <div class="section-tag">Alertes</div>
        <h2>Points a surveiller</h2>
        <ul>${anomalies}</ul>
      </article>
    </section>

    <section class="grid-3">
      <article class="block">
        <div class="section-tag">Depenses media</div>
        <h2>Meta vs Google Ads</h2>
        <div class="simple-list">
          ${renderSimpleRows(
            [
              { label: "Meta Ads", value: report.kpis.spendMeta },
              { label: "Google Ads", value: report.kpis.spendGoogle },
              { label: "CPL Meta", value: report.kpis.metaCpl },
              { label: "CPA Google Ads", value: report.kpis.googleCpa },
            ],
            (item) => item.label.includes("CPL") || item.label.includes("CPA")
              ? formatCurrency(item.value)
              : formatCurrency(item.value)
          )}
        </div>
      </article>
      <article class="block">
        <div class="section-tag">Traitement commercial</div>
        <h2>Lecture des statuts AdsFlow</h2>
        <div class="simple-list">
          ${renderSimpleRows(
            [
              { label: "Qualifie", value: report.pipeline.qualifie },
              { label: "Appel decroche", value: report.pipeline.appelDecroche },
              { label: "Devis envoye", value: report.pipeline.devisEnvoye },
              { label: "Accord verbal", value: report.pipeline.accordVerbal },
              { label: "Pas interesse", value: report.pipeline.pasInteresse },
              { label: "Mauvais numero", value: report.pipeline.mauvaisNumero },
            ],
            (item) => formatNumber(item.value)
          )}
        </div>
      </article>
      <article class="block">
        <div class="section-tag">Traffic & SEO</div>
        <h2>Visibilite de la semaine</h2>
        <div class="simple-list">
          ${renderSimpleRows(
            [
              { label: "Sessions GA4", value: report.kpis.sessions },
              { label: "Utilisateurs", value: report.traffic.users },
              { label: "Clics SEO", value: report.kpis.seoClicks },
              { label: "Impressions SEO", value: report.seo.impressions },
              { label: "CTR Google Ads", value: report.google.ctr },
              { label: "CTR SEO", value: report.seo.ctr },
            ],
            (item) => item.label.includes("CTR") ? formatPercent(item.value, 2) : formatNumber(item.value)
          )}
        </div>
      </article>
    </section>

    <section class="grid-2">
      <article class="table-card">
        <div class="section-tag">Campagnes Meta</div>
        <h2>Depense, leads et CPL</h2>
        <table>
          <thead>
            <tr>
              <th>Campagne</th>
              <th>Segment</th>
              <th class="num">Depense</th>
              <th class="num">Leads</th>
              <th class="num">CPL</th>
            </tr>
          </thead>
          <tbody>${metaRows}</tbody>
        </table>
      </article>
      <article class="table-card">
        <div class="section-tag">Campagnes Google Ads</div>
        <h2>Depense, conversions et CPA</h2>
        <table>
          <thead>
            <tr>
              <th>Campagne</th>
              <th>Type</th>
              <th class="num">Depense</th>
              <th class="num">Conversions</th>
              <th class="num">CPA</th>
            </tr>
          </thead>
          <tbody>${googleRows}</tbody>
        </table>
      </article>
    </section>

    <section class="grid-3">
      <article class="block">
        <div class="section-tag">Sources de leads</div>
        <h2>Origine CRM</h2>
        <div class="simple-list">${sourceRows}</div>
      </article>
      <article class="block">
        <div class="section-tag">Mix segment</div>
        <h2>VL vs PL</h2>
        <div class="simple-list">${segmentRows}</div>
      </article>
      <article class="block">
        <div class="section-tag">Statuts principaux</div>
        <h2>Top du pipe</h2>
        <div class="simple-list">${statusRows}</div>
      </article>
    </section>

    <div class="footer-note">
      Rapport genere le ${escapeHtml(formatDateLong(report.period.end))} pour la periode du
      ${escapeHtml(formatDateShort(report.period.start))} au ${escapeHtml(formatDateShort(report.period.end))}.
      Source : endpoint marketing-analytics AdsFlow, lecture agregee uniquement.
      Le bloc "leads traites" correspond aux leads sortis du statut NOUVEAU, pas a une attribution individuelle par commercial.
    </div>
  </div>
</body>
</html>`;
}

function buildEmailHtml(report) {
  const insights = report.insights.map((item) => `<li style="margin:0 0 8px 0">${escapeHtml(item)}</li>`).join("");
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Arial,sans-serif;color:#0f172a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:24px 0">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(45,20,96,0.08)">
          <tr>
            <td style="background:linear-gradient(135deg,#2D1460,#6D28D9);padding:32px;color:#ffffff">
              <div style="font-size:24px;font-weight:900">RECA<span style="color:#A78BFA">COR</span></div>
              <div style="margin-top:22px;font-size:12px;font-weight:700;opacity:0.72;text-transform:uppercase;letter-spacing:0.12em">Rapport hebdo Ramon</div>
              <div style="margin-top:8px;font-size:30px;font-weight:900;line-height:1.15">${escapeHtml(report.period.label)}</div>
              <div style="margin-top:12px;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.78)">
                Point hebdomadaire sur les depenses media, les leads entres dans AdsFlow et l'avancement commercial.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 6px 12px 0" valign="top">
                    <div style="background:#eef2ff;border:1px solid #dbe3ff;border-radius:18px;padding:16px">
                      <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Depense totale</div>
                      <div style="margin-top:8px;font-size:34px;font-weight:900;color:#19233f">${escapeHtml(formatCurrency(report.kpis.spendTotal))}</div>
                    </div>
                  </td>
                  <td style="padding:0 0 12px 6px" valign="top">
                    <div style="background:#e8f9eb;border:1px solid #d5efd8;border-radius:18px;padding:16px">
                      <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Leads CRM</div>
                      <div style="margin-top:8px;font-size:34px;font-weight:900;color:#19233f">${escapeHtml(formatNumber(report.kpis.leads))}</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 6px 0 0" valign="top">
                    <div style="background:#fff5da;border:1px solid #f4e1ad;border-radius:18px;padding:16px">
                      <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Leads traites</div>
                      <div style="margin-top:8px;font-size:34px;font-weight:900;color:#19233f">${escapeHtml(formatNumber(report.pipeline.treatedLeads))}</div>
                    </div>
                  </td>
                  <td style="padding:0 0 0 6px" valign="top">
                    <div style="background:#ffe6de;border:1px solid #f4d0c4;border-radius:18px;padding:16px">
                      <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em">Appels decroches</div>
                      <div style="margin-top:8px;font-size:34px;font-weight:900;color:#19233f">${escapeHtml(formatNumber(report.pipeline.appelDecroche))}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px">
              <div style="font-size:12px;font-weight:800;color:#6D28D9;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px">Lecture rapide</div>
              <div style="font-size:15px;line-height:1.7;color:#334155">
                Meta : <strong>${escapeHtml(formatCurrency(report.kpis.spendMeta))}</strong> depenses, <strong>${escapeHtml(formatNumber(report.kpis.leadsMeta))}</strong> leads, CPL moyen <strong>${escapeHtml(formatCurrency(report.kpis.metaCpl))}</strong>.<br/>
                Google Ads : <strong>${escapeHtml(formatCurrency(report.kpis.spendGoogle))}</strong> depenses, <strong>${escapeHtml(formatNumber(report.kpis.googleConversions))}</strong> conversions, CPA moyen <strong>${escapeHtml(formatCurrency(report.kpis.googleCpa))}</strong>.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 0">
              <div style="font-size:12px;font-weight:800;color:#6D28D9;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px">Points utiles</div>
              <ul style="margin:0;padding-left:18px;color:#334155;font-size:15px;line-height:1.7">
                ${insights}
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;text-align:center">
              <a href="${escapeHtml(report.reportUrl)}" style="display:inline-block;background:#6D28D9;color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;padding:14px 22px;border-radius:999px">Ouvrir le rapport complet</a>
              <div style="margin-top:12px;font-size:12px;color:#64748b">
                Lien prive, non indexe, mis a jour chaque semaine.
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#0f172a;padding:22px;text-align:center;color:#64748b;font-size:11px">
              Recacor · Rapport hebdo automatise · ${escapeHtml(report.period.label)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendEmail(report) {
  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY manquant pour l'envoi email.");
  }

  const toList = (OVERRIDE_TO || process.env.RAMON_REPORT_TO || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  const ccList = (process.env.RAMON_REPORT_CC || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  if (!toList.length) {
    throw new Error("RAMON_REPORT_TO manquant pour l'envoi email.");
  }

  const subject = `[Recacor] Rapport hebdo Ramon - ${report.period.label}`;
  const html = buildEmailHtml(report);

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
      to: toList,
      cc: ccList.length ? ccList : undefined,
      subject,
      htmlContent: html,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Brevo HTTP ${response.status}: ${JSON.stringify(payload)}`);
  }

  console.log(`✅ Email hebdo envoye (${payload.messageId || "messageId indisponible"})`);
}

function ensureReportDir() {
  mkdirSync(REPORT_DIR, { recursive: true });
}

function writeReportFiles(report) {
  ensureReportDir();
  const html = renderReportHtml(report);
  const archiveHtmlPath = resolve(REPORT_DIR, `${report.period.archiveSlug}.html`);
  const archiveJsonPath = resolve(REPORT_DIR, `${report.period.archiveSlug}.json`);

  writeFileSync(LATEST_HTML_PATH, html, "utf8");
  writeFileSync(archiveHtmlPath, html, "utf8");
  writeFileSync(LATEST_JSON_PATH, JSON.stringify(report, null, 2), "utf8");
  writeFileSync(archiveJsonPath, JSON.stringify(report, null, 2), "utf8");

  console.log(`✅ Rapport ecrit: ${LATEST_HTML_PATH}`);
}

function loadReportFromFile(filePath) {
  return JSON.parse(readFileSync(resolve(filePath), "utf8"));
}

async function main() {
  let report;

  if (FROM_FILE) {
    report = loadReportFromFile(FROM_FILE);
  } else {
    const period = computePreviousFullWeekRange(new Date());
    const raw = await fetchAnalytics(period.start, period.end);
    report = buildReportData(raw, period.start, period.end);
  }

  if (SHOULD_WRITE) {
    writeReportFiles(report);
  }

  if (SHOULD_SEND) {
    await sendEmail(report);
  }

  if (!SHOULD_WRITE && !SHOULD_SEND) {
    console.log(JSON.stringify(report, null, 2));
  }
}

main().catch((error) => {
  console.error(`❌ ${error.message}`);
  process.exit(1);
});
