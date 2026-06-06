import { NextResponse } from "next/server";
import { writeArticle } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const expected = process.env.CRON_SECRET || "";

  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { slug, raw } = (await req.json()) as { slug: string; raw: string };
    if (!slug || !raw) {
      return NextResponse.json({ error: "slug et raw requis" }, { status: 400 });
    }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      return NextResponse.json({ error: "Slug invalide (lettres minuscules, chiffres, tirets)" }, { status: 400 });
    }
    await writeArticle(slug, raw);
    return NextResponse.json({ ok: true, slug, url: `https://www.recacor.fr/blog/${slug}` });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
