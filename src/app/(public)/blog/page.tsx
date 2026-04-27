import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";
import { getAllArticles, categoryLabel } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog Recacor — Conseils pneus, mécanique & flottes",
  description:
    "Conseils pneus voiture et poids lourd, actualités garage, gestion de flotte. Le blog expert Recacor à Montpellier — Le Crès.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const articles = await getAllArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">Blog</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Actualités &amp;{" "}
            <span className="text-purple-glow">conseils</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Expertise pneumatique, conseils mécanique et actualités du garage Recacor
            au Crès.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {articles.length === 0 && (
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">
              Les premiers articles arrivent bientôt — revenez vite !
            </p>
          </div>
        </section>
      )}

      {featured && (
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${featured.frontmatter.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-border bg-white overflow-hidden hover:border-purple-bright/30 hover:shadow-xl transition-all">
                <div className="bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright min-h-[280px] lg:min-h-[380px] flex items-center justify-center p-10">
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {featured.frontmatter.titre}
                  </h2>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 text-xs">
                      {categoryLabel(featured.frontmatter.categorie)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Article à la une</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {featured.frontmatter.auteur && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {featured.frontmatter.auteur}
                        </span>
                      )}
                      {featured.frontmatter.read_time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.frontmatter.read_time}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-purple-bright group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                      Lire <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="relative py-16 pb-28 bg-muted overflow-hidden">
          <BgParticles />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link
                  key={article.frontmatter.slug}
                  href={`/blog/${article.frontmatter.slug}`}
                  className="group block h-full"
                >
                  <article className="rounded-2xl border border-border bg-white overflow-hidden h-full hover:border-purple-bright/30 hover:shadow-xl transition-all flex flex-col">
                    <div className="bg-gradient-to-br from-purple-mid/20 to-purple-bright/10 h-44 flex items-center justify-center p-6">
                      <h3 className="font-bold tracking-tight text-center text-purple-deep">
                        {article.frontmatter.titre}
                      </h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs bg-purple-bright/[0.06] text-purple-bright">
                          {categoryLabel(article.frontmatter.categorie)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        {article.frontmatter.read_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {article.frontmatter.read_time}
                          </span>
                        )}
                        <span className="text-purple-bright font-semibold group-hover:gap-1.5 inline-flex items-center gap-1 transition-all text-sm">
                          Lire <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
