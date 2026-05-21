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

let _schemaReady: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (_schemaReady) return _schemaReady;
  _schemaReady = (async () => {
    await runSchemaMigrations();
  })().catch((err) => {
    // En cas d'échec, on autorise une nouvelle tentative au prochain appel.
    _schemaReady = null;
    throw err;
  });
  return _schemaReady;
}

async function runSchemaMigrations(): Promise<void> {
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
  // Scheduling: 'published' (visible) | 'scheduled' (cron flips when publish_at <= NOW) | 'draft'
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';`;
  await sql`ALTER TABLE articles ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;`;
  await sql`CREATE INDEX IF NOT EXISTS idx_articles_status_publishat ON articles (status, publish_at);`;

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

  // Site assets : key/url pour remplacer les placeholders + data binaire stockée dans Neon
  await sql`
    CREATE TABLE IF NOT EXISTS site_assets (
      key        TEXT PRIMARY KEY,
      url        TEXT NOT NULL DEFAULT '',
      type       TEXT NOT NULL DEFAULT 'image',
      alt        TEXT NOT NULL DEFAULT '',
      mime       TEXT NOT NULL DEFAULT '',
      filename   TEXT NOT NULL DEFAULT '',
      data       BYTEA,
      size_bytes INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  // Migration: ajouter colonnes si la table existait sans
  await sql`ALTER TABLE site_assets ADD COLUMN IF NOT EXISTS mime TEXT NOT NULL DEFAULT '';`;
  await sql`ALTER TABLE site_assets ADD COLUMN IF NOT EXISTS filename TEXT NOT NULL DEFAULT '';`;
  await sql`ALTER TABLE site_assets ADD COLUMN IF NOT EXISTS data BYTEA;`;
  await sql`ALTER TABLE site_assets ADD COLUMN IF NOT EXISTS size_bytes INTEGER NOT NULL DEFAULT 0;`;

  // Media library — binaire stocké dans Neon (bytea)
  await sql`
    CREATE TABLE IF NOT EXISTS media (
      id          SERIAL PRIMARY KEY,
      url         TEXT NOT NULL,
      pathname    TEXT NOT NULL,
      filename    TEXT NOT NULL,
      alt         TEXT NOT NULL DEFAULT '',
      mime        TEXT NOT NULL DEFAULT '',
      size_bytes  INTEGER NOT NULL DEFAULT 0,
      width       INTEGER,
      height      INTEGER,
      tag         TEXT,
      data        BYTEA,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`ALTER TABLE media ADD COLUMN IF NOT EXISTS data BYTEA;`;
  await sql`CREATE INDEX IF NOT EXISTS idx_media_uploaded ON media (uploaded_at DESC);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_media_tag ON media (tag);`;
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

let _settingsCache: { data: Record<string, string>; ts: number } | null = null;
const SETTINGS_TTL = 5 * 60_000; // 5 min

export function invalidateSettingsCache(): void {
  _settingsCache = null;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  if (_settingsCache && Date.now() - _settingsCache.ts < SETTINGS_TTL) {
    return _settingsCache.data;
  }
  try {
    await ensureSchema();
    const rows = (await sql`SELECT key, value FROM settings`) as SettingsRow[];
    const data = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    _settingsCache = { data, ts: Date.now() };
    return data;
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
  invalidateSettingsCache();
}

export async function setSettings(values: Record<string, string>): Promise<void> {
  for (const [k, v] of Object.entries(values)) {
    await setSetting(k, v);
  }
  invalidateSettingsCache();
}
