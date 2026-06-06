import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getAllArticles, categoryLabel } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { BlogCardImage } from "@/components/blog-card-image";

export async function HomeBlogPreview() {
  const articles = await getAllArticles();
  const recent = articles.slice(0, 3);
  if (recent.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-bright mb-2">Blog</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Conseils & <span className="text-gradient-purple">actualités pneus</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-purple-bright hover:gap-3 transition-all"
          >
            Tous les articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recent.map((article) => {
            const { frontmatter, excerpt } = article;
            const date = frontmatter.date
              ? new Date(frontmatter.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
              : null;
            return (
              <Link key={frontmatter.slug} href={`/blog/${frontmatter.slug}`} className="group block">
                <article className="rounded-2xl border border-border bg-white overflow-hidden hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <BlogCardImage src={frontmatter.image || ""} alt={frontmatter.titre} />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-purple-bright border-0 text-xs font-bold">
                        {categoryLabel(frontmatter.categorie)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black tracking-tight text-sm leading-snug mb-2 group-hover:text-purple-deep transition-colors line-clamp-2">
                      {frontmatter.titre}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2 mb-4">
                      {excerpt}
                    </p>
                    {date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {date}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold hover:border-purple-bright/40 transition-colors"
          >
            Tous les articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
