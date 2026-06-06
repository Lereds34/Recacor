import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import { BgParticles } from "@/components/bg-particles";
import { getAllArticles, categoryLabel, type Article } from "@/lib/blog";
import { getAsset } from "@/lib/site-assets";
import { BlogCardImage } from "@/components/blog-card-image";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Blog Recacor — Conseils pneus, mécanique & flottes",
  description:
    "Conseils pneus voiture et poids lourd, actualités garage, gestion de flotte. Le blog expert Recacor à Montpellier — Le Crès.",
  alternates: { canonical: "/blog" },
};

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const { frontmatter, excerpt } = article;
  const date = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  if (featured) {
    return (
      <Link href={`/blog/${frontmatter.slug}`} className="group block">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl border border-border bg-white overflow-hidden hover:border-purple-bright/30 hover:shadow-2xl hover:shadow-purple-bright/[0.08] transition-all duration-300">
          {/* Image ou fallback */}
          <div className="relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
            <BlogCardImage src={frontmatter.image || ""} alt={frontmatter.titre} featured />
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/90 text-purple-bright border-0 font-bold text-xs">
                À la une
              </Badge>
            </div>
          </div>

          {/* Contenu */}
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 text-xs font-bold">
                {categoryLabel(frontmatter.categorie)}
              </Badge>
              {date && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {date}
                </span>
              )}
              {frontmatter.read_time && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {frontmatter.read_time}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-4 group-hover:text-purple-deep transition-colors">
              {frontmatter.titre}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
              {excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-purple-bright group-hover:gap-3 transition-all">
              Lire l&apos;article <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${frontmatter.slug}`} className="group block h-full">
      <article className="rounded-2xl border border-border bg-white overflow-hidden h-full hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300 flex flex-col">
        {/* Image ou fallback */}
        <div className="relative h-52 overflow-hidden shrink-0">
          <BlogCardImage src={frontmatter.image || ""} alt={frontmatter.titre} />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-purple-bright border-0 text-xs font-bold">
              {categoryLabel(frontmatter.categorie)}
            </Badge>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-black tracking-tight text-base leading-snug mb-3 group-hover:text-purple-deep transition-colors line-clamp-2">
            {frontmatter.titre}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {date}
                </span>
              )}
              {frontmatter.read_time && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {frontmatter.read_time}
                </span>
              )}
            </div>
            <span className="text-purple-bright font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Lire <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage() {
  const [articles, heroImage] = await Promise.all([
    getAllArticles(),
    getAsset("hero_image_blog", ""),
  ]);
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImage ? "from-purple-deep/85 via-purple-mid/80 to-purple-bright/75" : "from-purple-deep via-purple-mid to-purple-bright"}`} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-6">
            <BookOpen className="h-3 w-3 mr-1" /> Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Actualités &amp;{" "}
            <span className="text-purple-glow">conseils</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl text-lg">
            Expertise pneumatique, conseils mécanique et actualités du garage
            Recacor au Crès.
          </p>
          {articles.length > 0 && (
            <p className="mt-3 text-white/40 text-sm">
              {articles.length} article{articles.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Vide */}
      {articles.length === 0 && (
        <section className="py-32 bg-background">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" strokeWidth={1} />
            <p className="text-muted-foreground text-lg">
              Les premiers articles arrivent bientôt — revenez vite !
            </p>
          </div>
        </section>
      )}


      {/* Article à la une */}
      {featured && (
        <section className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ArticleCard article={featured} featured />
          </div>
        </section>
      )}

      {/* Grille articles */}
      {rest.length > 0 && (
        <section className="relative py-16 pb-28 bg-muted overflow-hidden">
          <BgParticles />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black tracking-tight mb-8">
              Tous les <span className="text-gradient-purple">articles</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <ArticleCard key={article.frontmatter.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
