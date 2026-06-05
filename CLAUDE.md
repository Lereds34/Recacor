# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## RITUEL DE DÉBUT DE SESSION — OBLIGATOIRE

À chaque nouvelle conversation, exécuter ces 3 étapes dans l'ordre :

**Étape 1 — Suivi des actions**
Lire `/Users/redouanelmansouri/Desktop/PROJET_RECACOR/SUIVI_ACTIONS.md` et présenter à Redouane un formulaire (AskUserQuestion) listant toutes les actions ⏳ et 🔍 en attente. Mettre à jour le fichier selon les réponses.

**Étape 2 — Snapshot analytics AdsFlow (7 derniers jours)**
```bash
START=$(date -v-7d +%Y-%m-%d 2>/dev/null || date -d '7 days ago' +%Y-%m-%d) && END=$(date +%Y-%m-%d) && curl -s "https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics?start=$START&end=$END" -H "X-Api-Key: recacor-analytics-2026" | jq '{leads_crm:.crm_aggregate.total_leads, leads_meta:.meta_ads.leads, cpl_meta:.meta_ads.cpl, depense_meta:.meta_ads.spend, depense_gads:.google_ads.spend, conversions_gads:.google_ads.conversions, clics_seo:.search_console.clicks, sessions_ga4:.ga4.sessions}'
```
Afficher le résultat sous forme de tableau et signaler toute anomalie.

**Étape 3 — Continuer avec la demande de Redouane**

---

## Contexte projet

Site Next.js de **Recacor** — spécialiste pneus VL et poids lourd, Le Crès (34920).
Repo GitHub : github.com/WeboPoulpe/RECACOR — déployé sur Vercel.

## Stack

- **Framework :** Next.js App Router, SSR/SSG, Vercel
- **DB :** Neon (PostgreSQL) via `@neondatabase/serverless`
- **Tracking :** GTM + GA4 + Consent Mode v2 + pixels Meta/TikTok/Snapchat
- **Emails :** Brevo (SMTP port 587)
- **Couleur principale :** Purple deep `#2E2D8A` / Accent `#1B4FD8`

## Commandes

```bash
# Dev local
npm run dev

# Build (vérifie les erreurs TS/Next)
npm run build

# IndexNow — soumettre les URLs aux moteurs
node scripts/indexnow.mjs
```

## IDs formulaires (ne jamais modifier)

- `devis-vl-form` — pneus voiture
- `devis-mecanique-form` — vidange/parallélisme
- `devis-pl-form` — poids lourd B2B
- `contact-form` — contact général

## Classes CSS critiques tracking

- `.phone-link` — tous les numéros cliquables
- `#sticky-call-btn` — bouton appel mobile fixe

## Architecture pages

- `src/app/(public)/` — pages publiques
- `src/app/admin/` — back-office
- `src/components/layout/` — header, footer (Schema.org AutoRepair dans footer.tsx)
- `src/lib/` — db.ts (Neon), villes.ts, tracking.ts, site-config.ts
- `src/components/schema-jsonld.tsx` — composants JSON-LD réutilisables

## Villes publiées (9 confirmées)

montpellier, castelnau-le-lez, vendargues, mauguio, lattes, perols, jacou, saint-jean-de-vedas, lunel

## Tarifs officiels

- Pneu VL monté : à partir de **45€**
- Vidange : à partir de **79€**
- Parallélisme : à partir de **65€** (contrôle offert)

## API Analytics AdsFlow

- **URL :** `https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/marketing-analytics`
- **Auth :** `X-Api-Key: recacor-analytics-2026`
- **Params :** `start`, `end` (YYYY-MM-DD)
