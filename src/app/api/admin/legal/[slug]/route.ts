import { NextResponse } from "next/server";
import { getLegalPage, updateLegalPage } from "@/lib/legal";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  return NextResponse.json({ page });
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const { titre, content } = (await req.json()) as { titre: string; content: string };
    if (!titre) return NextResponse.json({ error: "titre requis" }, { status: 400 });
    await updateLegalPage(slug, titre, content);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
