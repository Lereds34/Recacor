import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getGoogleAdsReport } from "@/lib/google/ads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  return NextResponse.json(await getGoogleAdsReport());
}
