import { NextResponse } from "next/server";
import { readArticle, writeArticle, deleteArticle, renameArticle } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const article = await readArticle(slug);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const { raw, newSlug } = (await req.json()) as { raw: string; newSlug?: string };
    if (!raw) {
      return NextResponse.json({ error: "raw requis" }, { status: 400 });
    }
    if (newSlug && newSlug !== slug) {
      await renameArticle(slug, newSlug);
      await writeArticle(newSlug, raw);
    } else {
      await writeArticle(slug, raw);
    }
    return NextResponse.json({ ok: true, slug: newSlug || slug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    await deleteArticle(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
