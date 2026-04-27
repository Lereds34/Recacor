import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not defined");
    }
    _sql = neon(url);
  }
  return _sql;
}

// Proxy that lazy-initialises the neon client on first use.
// Allows `import { sql } from "@/lib/db"` everywhere without
// crashing at build time when DATABASE_URL is missing.
export const sql = new Proxy(function () {}, {
  apply(_t, _this, args) {
    // tagged template usage: sql`SELECT ...`
    return (getSql() as unknown as (...a: unknown[]) => unknown)(...args);
  },
  get(_t, prop) {
    const s = getSql() as unknown as Record<string | symbol, unknown>;
    return s[prop];
  },
}) as unknown as NeonQueryFunction<false, false>;

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      slug          TEXT PRIMARY KEY,
      titre         TEXT NOT NULL,
      meta_description TEXT NOT NULL DEFAULT '',
      categorie     TEXT NOT NULL DEFAULT 'blog',
      date          TEXT,
      auteur        TEXT,
      read_time     TEXT,
      body          TEXT NOT NULL,
      raw           TEXT NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_articles_categorie ON articles (categorie);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_articles_date ON articles (date DESC);`;

  // Settings (key-value)
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  // Leads
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id            SERIAL PRIMARY KEY,
      form_id       TEXT NOT NULL,
      service_type  TEXT NOT NULL,
      nom           TEXT,
      prenom        TEXT,
      entreprise    TEXT,
      telephone     TEXT,
      email         TEXT,
      cp            TEXT,
      message       TEXT,
      payload       JSONB NOT NULL,
      utm_source    TEXT,
      utm_medium    TEXT,
      utm_campaign  TEXT,
      utm_content   TEXT,
      gclid         TEXT,
      fbclid        TEXT,
      page_source   TEXT,
      referrer      TEXT,
      status        TEXT NOT NULL DEFAULT 'new',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);`;

  // Villes (pages SEO villes)
  await sql`
    CREATE TABLE IF NOT EXISTS villes (
      slug        TEXT PRIMARY KEY,
      nom         TEXT NOT NULL,
      cp          TEXT NOT NULL DEFAULT '',
      distance    TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      meta_title  TEXT,
      meta_description TEXT,
      published   BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  // Pages légales (HTML/markdown libre)
  await sql`
    CREATE TABLE IF NOT EXISTS legal_pages (
      slug       TEXT PRIMARY KEY,
      titre      TEXT NOT NULL,
      content    TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

/* ─────── Settings helpers ─────── */
type SettingsRow = { key: string; value: string };

export async function getSetting(key: string, defaultValue = ""): Promise<string> {
  try {
    await ensureSchema();
    const rows = (await sql`SELECT value FROM settings WHERE key = ${key} LIMIT 1`) as SettingsRow[];
    return rows[0]?.value || defaultValue;
  } catch {
    return defaultValue;
  }
}

export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    await ensureSchema();
    const rows = (await sql`SELECT key, value FROM settings`) as SettingsRow[];
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return {};
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await ensureSchema();
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
  `;
}

export async function setSettings(values: Record<string, string>): Promise<void> {
  for (const [k, v] of Object.entries(values)) {
    await setSetting(k, v);
  }
}
