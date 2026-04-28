import { NextResponse } from "next/server";
import { listAudiences, pingMailchimp } from "@/lib/mailchimp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const ping = await pingMailchimp();
  if (!ping.ok) {
    return NextResponse.json({ ok: false, error: ping.error, audiences: [] });
  }
  const audiences = await listAudiences();
  return NextResponse.json({ ok: true, audiences, account: ping.account });
}
