import { NextResponse } from "next/server";
import { listArticles, writeArticle } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = await listArticles();
    return NextResponse.json({ articles });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { slug, raw } = (await req.json()) as { slug: string; raw: string };
    if (!slug || !raw) {
      return NextResponse.json({ error: "slug et raw requis" }, { status: 400 });
    }
    await writeArticle(slug, raw);
    return NextResponse.json({ ok: true, slug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
