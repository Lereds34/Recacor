import { NextResponse } from "next/server";
import { listVilles, upsertVille } from "@/lib/villes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const villes = await listVilles(true);
  return NextResponse.json({ villes });
}

export async function POST(req: Request) {
  try {
    const ville = await req.json();
    if (!ville.slug || !ville.nom) {
      return NextResponse.json({ error: "slug et nom requis" }, { status: 400 });
    }
    await upsertVille({
      slug: ville.slug,
      nom: ville.nom,
      cp: ville.cp || "",
      distance: ville.distance || "",
      description: ville.description || "",
      meta_title: ville.meta_title || null,
      meta_description: ville.meta_description || null,
      published: ville.published !== false,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
