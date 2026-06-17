import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/blog";

export const revalidate = 3600;

export async function GET() {
  try {
    const articles = await getAllArticles();
    const recent = articles.slice(0, 3).map(({ frontmatter, excerpt }) => ({
      slug: frontmatter.slug,
      titre: frontmatter.titre,
      categorie: frontmatter.categorie,
      date: frontmatter.date,
      image: frontmatter.image,
      read_time: frontmatter.read_time,
      excerpt,
    }));
    return NextResponse.json(recent, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
