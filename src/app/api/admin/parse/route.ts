import { NextResponse } from "next/server";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import matter from "gray-matter";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { raw } = (await req.json()) as { raw: string };
    if (!raw) return NextResponse.json({ error: "raw requis" }, { status: 400 });

    const { data, content } = matter(raw);
    const bodyWithoutFaq = content.replace(/##\s+FAQ[\s\S]*?(?=\n##\s|$)/i, "");
    const html = (
      await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(bodyWithoutFaq)
    ).toString();

    return NextResponse.json({ frontmatter: data, html });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
