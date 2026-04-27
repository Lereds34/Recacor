import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getArticlesByCategory, type Categorie, categoryLabel } from "@/lib/blog";

export async function RelatedArticles({ categorie }: { categorie: Categorie }) {
  const articles = await getArticlesByCategory(categorie);
  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-purple-bright font-semibold text-sm tracking-wider uppercase">
            Articles liés
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            En savoir plus sur le{" "}
            <span className="text-gradient-purple">{categoryLabel(categorie).toLowerCase()}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.frontmatter.slug}
              href={`/blog/${article.frontmatter.slug}`}
              className="group block h-full"
            >
              <article className="rounded-2xl border border-border bg-white p-6 h-full hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all flex flex-col">
                <Badge variant="secondary" className="text-xs bg-purple-bright/[0.06] text-purple-bright w-fit mb-3">
                  {categoryLabel(article.frontmatter.categorie)}
                </Badge>
                <h3 className="font-bold tracking-tight mb-2 group-hover:text-purple-deep transition-colors">
                  {article.frontmatter.titre}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  {article.frontmatter.read_time && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.frontmatter.read_time}
                    </span>
                  )}
                  <span className="text-purple-bright font-semibold inline-flex items-center gap-1 group-hover:gap-1.5 transition-all text-sm">
                    Lire l&apos;article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
