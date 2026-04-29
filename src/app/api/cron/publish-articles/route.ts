import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  // Vercel cron sends header: Authorization: Bearer <CRON_SECRET>
  // Local/manual calls can pass ?secret=… as fallback.
  const auth = req.headers.get("authorization") || "";
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret") || "";
  const expected = process.env.CRON_SECRET || "";

  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  const tokenOk =
    (expected && auth === `Bearer ${expected}`) ||
    (expected && querySecret === expected);

  if (!isVercelCron && !tokenOk) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await ensureSchema();

  const promoted = (await sql`
    UPDATE articles
       SET status = 'published',
           date = COALESCE(date, TO_CHAR(publish_at AT TIME ZONE 'Europe/Paris', 'YYYY-MM-DD')),
           updated_at = NOW()
     WHERE status = 'scheduled'
       AND publish_at IS NOT NULL
       AND publish_at <= NOW()
    RETURNING slug, titre, publish_at;
  `) as { slug: string; titre: string; publish_at: string }[];

  const remaining = (await sql`
    SELECT COUNT(*)::int AS n
      FROM articles
     WHERE status = 'scheduled' AND publish_at > NOW()
  `) as { n: number }[];

  return NextResponse.json({
    ok: true,
    publishedNow: promoted.length,
    publishedSlugs: promoted.map((p) => p.slug),
    stillScheduled: remaining[0]?.n ?? 0,
    ranAt: new Date().toISOString(),
  });
}
