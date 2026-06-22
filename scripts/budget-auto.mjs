#!/usr/bin/env node
/**
 * Budget auto-ajusté — Google Ads Search VL Recacor
 * Règles basées sur benchmark PMC Pneus (mars 2026)
 *
 * Usage :
 *   node budget-auto.mjs          → simulation (aucune modification)
 *   node budget-auto.mjs --apply  → applique les changements
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DRY_RUN = !process.argv.includes("--apply");
const LOG_FILE = process.env.GITHUB_WORKSPACE
  ? `${process.env.GITHUB_WORKSPACE}/budget-auto-log.json`
  : "/Users/redouanelmansouri/Desktop/PROJET_RECACOR/scripts/budget-auto-log.json";
const SEARCH_CAMPAIGN_ID = "23871281180"; // Search 22/05 — VL uniquement

// ─── Seuils (benchmark PMC) ─────────────────────────────────────────────────
const RULES = {
  CPA_BOOST_THRESHOLD:    10,   // CPA < 10€ sur 3 jours → +15%
  CPA_REDUCE_THRESHOLD:   15,   // CPA > 15€ sur 2 jours → -20%
  CPA_FREEZE_THRESHOLD:   25,   // CPA > 25€ → geler immédiatement
  CPL_BOOST_THRESHOLD:     5,   // CPL Meta < 5€ sur 3 jours → +15%
  CPL_REDUCE_THRESHOLD:    8,   // CPL Meta > 8€ sur 2 jours → -20%
  IS_LOST_SIGNAL:       0.25,   // IS perdues budget > 25% → signal manuel, pas de hausse auto
  MONTHLY_CAP_EUR:       750,   // Search VL : 25€/jour ≈ 750€/mois
  MONTHLY_FREEZE_PCT:   0.80,   // 80% du cap avant le 25 → geler
  BUDGET_MIN_EUR:         10,   // Plancher absolu
  BUDGET_MAX_EUR:         25,   // Plafond absolu validé Search VL
  BOOST_FACTOR:         1.15,
  REDUCE_FACTOR:        0.80,
};

// ─── Env ─────────────────────────────────────────────────────────────────────
function loadEnv(path) {
  try {
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const idx = line.indexOf("=");
      process.env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  } catch {}
}
loadEnv("/Users/redouanelmansouri/Desktop/PROJET_RECACOR/.env.google");

const {
  GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_API_VERSION,
} = process.env;

const REQUIRED_ENV = {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REFRESH_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID,
  GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_API_VERSION,
};

const missingEnv = Object.entries(REQUIRED_ENV)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnv.length) {
  throw new Error(
    `Configuration Google Ads incomplète. Secret(s) manquant(s) : ${missingEnv.join(", ")}`
  );
}

const CUSTOMER_ID = GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");

// ─── Auth ────────────────────────────────────────────────────────────────────
async function getAccessToken() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const d = await r.json();
  if (!d.access_token) {
    if (d.error === "invalid_grant") {
      throw new Error(
        "OAuth Google Ads invalide : le refresh token est expiré ou révoqué. " +
        "Régénérer GOOGLE_OAUTH_REFRESH_TOKEN puis mettre à jour le secret GitHub Actions."
      );
    }
    throw new Error("OAuth failed: " + JSON.stringify(d));
  }
  return d.access_token;
}

function apiHeaders(token) {
  const h = {
    Authorization: `Bearer ${token}`,
    "developer-token": GOOGLE_ADS_DEVELOPER_TOKEN,
    "Content-Type": "application/json",
  };
  if (GOOGLE_ADS_LOGIN_CUSTOMER_ID)
    h["login-customer-id"] = GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/-/g, "");
  return h;
}

async function searchStream(token, query) {
  const r = await fetch(
    `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/googleAds:searchStream`,
    { method: "POST", headers: apiHeaders(token), body: JSON.stringify({ query }) }
  );
  const parsed = JSON.parse(await r.text());
  if (!Array.isArray(parsed)) throw new Error(JSON.stringify(parsed.error || parsed));
  return parsed.flatMap(c => c.results || []);
}

async function mutate(token, resource, operations) {
  const r = await fetch(
    `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/${resource}:mutate`,
    { method: "POST", headers: apiHeaders(token), body: JSON.stringify({ operations }) }
  );
  const d = await r.json();
  if (d.error) throw new Error(`${resource}: ` + JSON.stringify(d.error));
  return d;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function eur(micros) { return Number(micros) / 1_000_000; }
function toMicros(eur) { return Math.round(eur * 1_000_000); }
function fmt(n) { return n.toFixed(2) + "€"; }

function firstOfMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadLog() {
  if (!existsSync(LOG_FILE)) return [];
  try { return JSON.parse(readFileSync(LOG_FILE, "utf8")); } catch { return []; }
}

function saveLog(entries) {
  writeFileSync(LOG_FILE, JSON.stringify(entries, null, 2));
}

// ─── Fetch données ────────────────────────────────────────────────────────────
async function getDailyCPA(token, days) {
  const rows = await searchStream(token, `
    SELECT segments.date, metrics.conversions, metrics.cost_micros
    FROM campaign
    WHERE campaign.id = '${SEARCH_CAMPAIGN_ID}'
      AND segments.date >= '${daysAgo(days)}'
      AND segments.date <= '${today()}'
    ORDER BY segments.date DESC
  `);
  return rows.map(r => ({
    date: r.segments.date,
    conversions: Number(r.metrics?.conversions || 0),
    cost: eur(r.metrics?.costMicros || 0),
    cpa: Number(r.metrics?.conversions || 0) > 0
      ? eur(r.metrics.costMicros) / Number(r.metrics.conversions)
      : null,
  }));
}

async function getISMetrics(token) {
  const rows = await searchStream(token, `
    SELECT
      metrics.search_budget_lost_impression_share,
      metrics.search_impression_share
    FROM campaign
    WHERE campaign.id = '${SEARCH_CAMPAIGN_ID}'
      AND segments.date DURING LAST_7_DAYS
  `);
  if (!rows.length) return { isLostBudget: 0, is: 0 };
  let totalIS = 0, totalLost = 0, count = 0;
  for (const r of rows) {
    const lost = Number(r.metrics?.searchBudgetLostImpressionShare || 0);
    const is = Number(r.metrics?.searchImpressionShare || 0);
    if (!isNaN(lost)) { totalLost += lost; count++; }
    if (!isNaN(is)) totalIS += is;
  }
  return {
    isLostBudget: count > 0 ? totalLost / count : 0,
    is: count > 0 ? totalIS / count : 0,
  };
}

async function getMonthlySpend(token) {
  const rows = await searchStream(token, `
    SELECT metrics.cost_micros
    FROM campaign
    WHERE campaign.id = '${SEARCH_CAMPAIGN_ID}'
      AND segments.date >= '${firstOfMonth()}'
      AND segments.date <= '${today()}'
  `);
  return rows.reduce((sum, r) => sum + eur(r.metrics?.costMicros || 0), 0);
}

async function getCurrentBudget(token) {
  const rows = await searchStream(token, `
    SELECT
      campaign_budget.resource_name,
      campaign_budget.amount_micros,
      campaign_budget.id
    FROM campaign
    WHERE campaign.id = '${SEARCH_CAMPAIGN_ID}'
    LIMIT 1
  `);
  if (!rows.length) throw new Error("Budget introuvable");
  return {
    resourceName: rows[0].campaignBudget.resourceName,
    amountMicros: Number(rows[0].campaignBudget.amountMicros),
    amountEur: eur(rows[0].campaignBudget.amountMicros),
  };
}

async function getMetaCPL(days) {
  const start = daysAgo(days);
  const end = today();
  try {
    const r = await fetch(
      `https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics?start=${start}&end=${end}`,
      { headers: { "X-Api-Key": "recacor-analytics-2026" } }
    );
    const d = await r.json();
    return Number(d?.meta_ads?.cpl || 0);
  } catch { return null; }
}

// ─── Moteur de décision ───────────────────────────────────────────────────────
function evaluate({ dailyCPA, isLostBudget, monthlySpend, cplMeta3d, currentBudget }) {
  const decisions = [];
  const dayOfMonth = new Date().getDate();

  // Données des 3 derniers jours avec CPA connu
  const last3 = dailyCPA.filter(d => d.cpa !== null).slice(0, 3);
  const last2 = dailyCPA.filter(d => d.cpa !== null).slice(0, 2);

  // ── RÈGLE CAP : ne jamais dépasser le plafond validé ─────────────────────
  if (currentBudget > RULES.BUDGET_MAX_EUR) {
    decisions.push({
      action: "CAP",
      factor: 0,
      reason: `🔒 Budget actuel ${fmt(currentBudget)} > plafond validé ${fmt(RULES.BUDGET_MAX_EUR)} — retour au plafond`,
      priority: -1,
    });
  }

  // ── RÈGLE 0 : Urgence — CPA > 25€ ──────────────────────────────────────────
  const latestCPA = last2[0]?.cpa || null;
  if (latestCPA && latestCPA > RULES.CPA_FREEZE_THRESHOLD) {
    decisions.push({
      action: "FREEZE",
      factor: 0,
      reason: `🚨 CPA urgence : ${fmt(latestCPA)} > ${fmt(RULES.CPA_FREEZE_THRESHOLD)} — gel immédiat`,
      priority: 0,
    });
  }

  // ── RÈGLE 1 : Budget mensuel 80% avant le 25 ─────────────────────────────
  const monthlyRatio = monthlySpend / RULES.MONTHLY_CAP_EUR;
  if (monthlyRatio >= RULES.MONTHLY_FREEZE_PCT && dayOfMonth < 25) {
    decisions.push({
      action: "FREEZE",
      factor: 0,
      reason: `🛑 Budget mensuel à ${(monthlyRatio * 100).toFixed(0)}% (${fmt(monthlySpend)}/${RULES.MONTHLY_CAP_EUR}€) avant le 25`,
      priority: 1,
    });
  }

  // ── RÈGLE 2 : Réduire — CPA > 15€ sur 2 jours ───────────────────────────
  if (last2.length >= 2 && last2.every(d => d.cpa > RULES.CPA_REDUCE_THRESHOLD)) {
    decisions.push({
      action: "REDUCE",
      factor: RULES.REDUCE_FACTOR,
      reason: `📉 CPA > ${fmt(RULES.CPA_REDUCE_THRESHOLD)} 2 jours de suite (${fmt(last2[0].cpa)}, ${fmt(last2[1].cpa)})`,
      priority: 2,
    });
  }

  // ── RÈGLE 3 : Réduire — CPL Meta > 8€ sur 3 jours ──────────────────────
  if (cplMeta3d && cplMeta3d > RULES.CPL_REDUCE_THRESHOLD) {
    decisions.push({
      action: "REDUCE",
      factor: RULES.REDUCE_FACTOR,
      reason: `📉 CPL Meta > ${fmt(RULES.CPL_REDUCE_THRESHOLD)} sur 3j (${fmt(cplMeta3d)}) — signal marché dégradé`,
      priority: 3,
    });
  }

  // ── RÈGLE 4 : Signal — IS perdues budget > 25% ──────────────────────────
  if (isLostBudget > RULES.IS_LOST_SIGNAL) {
    decisions.push({
      action: "SIGNAL",
      factor: 0,
      reason: `📊 IS perdues budget : ${(isLostBudget * 100).toFixed(1)}% > 25% — signal d'analyse, pas de hausse automatique`,
      priority: 9,
    });
  }

  // ── RÈGLE 5 : Augmenter — CPA < 10€ sur 3 jours ─────────────────────────
  if (last3.length >= 3 && last3.every(d => d.cpa < RULES.CPA_BOOST_THRESHOLD)) {
    decisions.push({
      action: "BOOST",
      factor: RULES.BOOST_FACTOR,
      reason: `📈 CPA < ${fmt(RULES.CPA_BOOST_THRESHOLD)} 3 jours de suite (${fmt(last3[0].cpa)}, ${fmt(last3[1].cpa)}, ${fmt(last3[2].cpa)})`,
      priority: 5,
    });
  }

  // ── RÈGLE 6 : Augmenter — CPL Meta < 5€ sur 3 jours ─────────────────────
  if (cplMeta3d && cplMeta3d < RULES.CPL_BOOST_THRESHOLD && last3.every(d => d.cpa < RULES.CPA_BOOST_THRESHOLD)) {
    decisions.push({
      action: "BOOST",
      factor: RULES.BOOST_FACTOR,
      reason: `📈 Tous canaux performants : CPA Google OK + CPL Meta ${fmt(cplMeta3d)} < ${fmt(RULES.CPL_BOOST_THRESHOLD)}`,
      priority: 6,
    });
  }

  // Priorité : FREEZE > REDUCE > BOOST. On prend la règle de plus haute priorité
  decisions.sort((a, b) => a.priority - b.priority);
  return decisions;
}

function computeNewBudget(currentEur, factor) {
  const raw = currentEur * factor;
  return Math.min(RULES.BUDGET_MAX_EUR, Math.max(RULES.BUDGET_MIN_EUR, Math.round(raw * 100) / 100));
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`\n🤖 Budget Auto — Recacor Search VL ${DRY_RUN ? "(SIMULATION)" : "(RÉEL)"}`);
  console.log(`   ${new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}\n`);

  const log = loadLog();

  // Vérifier si une action a déjà été prise aujourd'hui
  const todayStr = today();
  const alreadyRan = log.find(e => e.date === todayStr && e.applied);
  if (alreadyRan && !DRY_RUN) {
    console.log(`ℹ️  Action déjà appliquée aujourd'hui (${alreadyRan.action} — ${alreadyRan.reason})`);
    console.log("   Relancer demain ou en mode simulation.\n");
    process.exit(0);
  }

  const token = await getAccessToken();

  // Collecte des données en parallèle
  console.log("📡 Collecte des données...\n");
  const [dailyCPA, isMetrics, monthlySpend, budget, cplMeta3d, cplMeta7d] = await Promise.all([
    getDailyCPA(token, 5),
    getISMetrics(token),
    getMonthlySpend(token),
    getCurrentBudget(token),
    getMetaCPL(3),
    getMetaCPL(7),
  ]);

  // Affichage état actuel
  const dayOfMonth = new Date().getDate();
  console.log("─── État actuel ────────────────────────────────────────");
  console.log(`   Budget actuel Search  : ${fmt(budget.amountEur)}/jour`);
  console.log(`   Dépense mois en cours : ${fmt(monthlySpend)} / ${RULES.MONTHLY_CAP_EUR}€ (${((monthlySpend / RULES.MONTHLY_CAP_EUR) * 100).toFixed(0)}%) — jour ${dayOfMonth}`);
  console.log(`   IS perdues budget     : ${(isMetrics.isLostBudget * 100).toFixed(1)}%`);
  console.log(`   CPL Meta (3 derniers jours) : ${cplMeta3d ? fmt(cplMeta3d) : "N/A"}`);
  console.log(`   CPL Meta (7 derniers jours) : ${cplMeta7d ? fmt(cplMeta7d) : "N/A"}`);
  console.log("\n   CPA par jour (Search) :");
  dailyCPA.slice(0, 5).forEach(d =>
    console.log(`   ${d.date}  conv: ${d.conversions.toFixed(1)}  coût: ${fmt(d.cost)}  CPA: ${d.cpa ? fmt(d.cpa) : "—"}`)
  );

  // Évaluation des règles
  const decisions = evaluate({
    dailyCPA,
    isLostBudget: isMetrics.isLostBudget,
    monthlySpend,
    cplMeta3d,
    currentBudget: budget.amountEur,
  });

  console.log("\n─── Évaluation des règles ───────────────────────────────");

  const actionableDecisions = decisions.filter(d => d.action !== "SIGNAL");

  if (!actionableDecisions.length) {
    if (decisions.length) {
      console.log("   ℹ️  Signaux détectés, mais aucune action budget automatique :");
      decisions.forEach(d => console.log(`   → ${d.reason}`));
      console.log("");
    } else {
      console.log("   ✅ Toutes les métriques dans les seuils — aucune action nécessaire.\n");
    }
    log.push({ date: todayStr, action: "NONE", reason: "Métriques dans les seuils", applied: false, budget: budget.amountEur });
    saveLog(log);
    process.exit(0);
  }

  // On prend la décision de plus haute priorité
  const decision = actionableDecisions[0];
  console.log(`\n   Règle déclenchée : ${decision.reason}`);

  let newBudget = budget.amountEur;
  let actionLabel = "";

  if (decision.action === "FREEZE") {
    newBudget = budget.amountEur; // On ne change pas le budget, on alerte
    actionLabel = "⛔ ALERTE — Vérification manuelle requise";
  } else if (decision.action === "BOOST") {
    newBudget = computeNewBudget(budget.amountEur, RULES.BOOST_FACTOR);
    actionLabel = `📈 BUDGET +15% : ${fmt(budget.amountEur)} → ${fmt(newBudget)}/jour`;
  } else if (decision.action === "REDUCE") {
    newBudget = computeNewBudget(budget.amountEur, RULES.REDUCE_FACTOR);
    actionLabel = `📉 BUDGET -20% : ${fmt(budget.amountEur)} → ${fmt(newBudget)}/jour`;
  } else if (decision.action === "CAP") {
    newBudget = RULES.BUDGET_MAX_EUR;
    actionLabel = `🔒 RETOUR AU PLAFOND : ${fmt(budget.amountEur)} → ${fmt(newBudget)}/jour`;
  }

  console.log(`\n   ${actionLabel}`);
  if (decisions.length > 1) {
    console.log("\n   Autres règles déclenchées (non appliquées) :");
    decisions.filter(d => d !== decision).forEach(d => console.log(`   → ${d.reason}`));
  }

  // Application ou simulation
  const logEntry = {
    date: todayStr,
    action: decision.action,
    reason: decision.reason,
    budgetBefore: budget.amountEur,
    budgetAfter: newBudget,
    applied: false,
    dryRun: DRY_RUN,
  };

  if (!DRY_RUN && !["FREEZE", "SIGNAL"].includes(decision.action) && newBudget !== budget.amountEur) {
    console.log("\n⚙️  Application en cours...");
    await mutate(token, "campaignBudgets", [{
      update: {
        resourceName: budget.resourceName,
        amountMicros: toMicros(newBudget),
      },
      updateMask: "amountMicros",
    }]);
    logEntry.applied = true;
    console.log(`   ✅ Budget mis à jour : ${fmt(newBudget)}/jour`);
  } else if (DRY_RUN) {
    console.log("\n   [SIMULATION] Aucune modification appliquée. Relancer avec --apply pour exécuter.");
  } else if (decision.action === "FREEZE") {
    console.log("\n   ⛔ FREEZE : aucune modification automatique — intervention manuelle requise.");
  }

  log.push(logEntry);
  saveLog(log);

  console.log(`\n📋 Décision enregistrée dans budget-auto-log.json\n`);
  console.log("─── Règles actives (rappel) ─────────────────────────────");
  console.log(`   📈 +15% seulement si CPA < ${RULES.CPA_BOOST_THRESHOLD}€ sur 3j`);
  console.log(`   📉 -20% si CPA > ${RULES.CPA_REDUCE_THRESHOLD}€ sur 2j OU CPL Meta > ${RULES.CPL_REDUCE_THRESHOLD}€`);
  console.log(`   🚨 ALERTE si CPA > ${RULES.CPA_FREEZE_THRESHOLD}€ OU budget mensuel > 80% avant le 25`);
  console.log(`   🔒 Plafond Search VL : ${fmt(RULES.BUDGET_MAX_EUR)}/jour — IS perdues = signal manuel seulement`);
  console.log(`   🔒 PMax jamais touché — Search uniquement\n`);
})();
