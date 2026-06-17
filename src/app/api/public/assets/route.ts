import { NextResponse } from "next/server";
import { getAllAssets } from "@/lib/site-assets";

export const revalidate = 3600;
export const runtime = "nodejs";

export async function GET() {
  const all = await getAllAssets();
  // Renvoie un dict {key: {url, type, alt}}
  const out: Record<string, { url: string; type: string; alt: string }> = {};
  for (const [k, v] of Object.entries(all)) {
    out[k] = { url: v.url, type: v.type, alt: v.alt };
  }
  return NextResponse.json({ assets: out }, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
