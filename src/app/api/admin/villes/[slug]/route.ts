import { NextResponse } from "next/server";
import { findVille, upsertVille, deleteVille } from "@/lib/villes";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const v = await findVille(slug);
  if (!v) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ville: v });
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const ville = await req.json();
    await upsertVille({
      slug: ville.slug || slug,
      nom: ville.nom,
      cp: ville.cp || "",
      distance: ville.distance || "",
      description: ville.description || "",
      meta_title: ville.meta_title || null,
      meta_description: ville.meta_description || null,
      published: ville.published !== false,
    });
    if (ville.slug && ville.slug !== slug) {
      await deleteVille(slug);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    await deleteVille(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
