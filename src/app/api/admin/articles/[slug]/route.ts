import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readArticle, writeArticle, deleteArticle, renameArticle } from "@/lib/blog-admin";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

function revalidateArticlePaths(slugs: string[]) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/api/public/articles/recent");
  for (const slug of slugs) {
    revalidatePath(`/blog/${slug}`);
  }
}

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
      revalidateArticlePaths([slug, newSlug]);
    } else {
      await writeArticle(slug, raw);
      revalidateArticlePaths([slug]);
    }
    return NextResponse.json({ ok: true, slug: newSlug || slug });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    const { status, publish_at } = (await req.json()) as { status?: string; publish_at?: string | null };
    const { sql } = await import("@/lib/db");
    await sql`UPDATE articles SET status = COALESCE(${status ?? null}, status), publish_at = ${publish_at ?? null}, updated_at = NOW() WHERE slug = ${slug}`;
    revalidateArticlePaths([slug]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { slug } = await params;
    await deleteArticle(slug);
    revalidateArticlePaths([slug]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
