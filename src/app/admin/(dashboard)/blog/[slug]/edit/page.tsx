import { notFound } from "next/navigation";
import { readArticle } from "@/lib/blog-admin";
import { ArticleEditor } from "@/components/admin/article-editor";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await readArticle(slug);
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-1">Modifier l&apos;article</h1>
      <p className="text-muted-foreground mb-6">/{slug}</p>
      <ArticleEditor initialRaw={article.raw} initialSlug={slug} isEdit />
    </div>
  );
}
