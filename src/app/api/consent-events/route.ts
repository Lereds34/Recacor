import { NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ConsentEventBody = {
  event_name?: string;
  consent_status?: string;
  page_path?: string;
  metadata?: Record<string, unknown>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ConsentEventBody;
    const eventName = typeof body.event_name === "string" ? body.event_name.trim() : "";

    if (!eventName) {
      return NextResponse.json({ error: "event_name requis" }, { status: 400 });
    }

    await ensureSchema();

    await sql`
      INSERT INTO consent_events (
        event_name,
        consent_status,
        page_path,
        referrer,
        user_agent,
        metadata
      ) VALUES (
        ${body.event_name || null},
        ${body.consent_status || null},
        ${body.page_path || null},
        ${req.headers.get("referer") || null},
        ${req.headers.get("user-agent") || null},
        ${JSON.stringify(body.metadata || {})}::jsonb
      );
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[consent-events]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
