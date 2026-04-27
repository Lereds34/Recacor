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
}
