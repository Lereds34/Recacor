"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CATEGORY_LABELS: Record<string, string> = {
  "pneus-voiture": "Pneus voiture",
  "mecanique": "Mécanique",
  "pneus-pl": "Pneus PL",
  "blog": "Blog",
};

interface ArticleItem {
  slug: string;
  titre: string;
  categorie: string;
  date?: string;
  image?: string;
  read_time?: string;
  excerpt: string;
}

function ArticleThumb({ src, alt }: { src?: string; alt: string }) {
  const [err, setErr] = useState(!src);
  if (err) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-mid/30 to-purple-bright/20 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-purple-bright/30" strokeWidth={1} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      onError={() => setErr(true)}
    />
  );
}

export function HomeBlogPreviewClient() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    fetch("/api/public/articles/recent")
      .then((r) => r.json())
      .then((data: ArticleItem[]) => setArticles(data))
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-bright mb-2">Blog</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Conseils &amp; <span className="text-gradient-purple">actualités pneus</span>
            </h2>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-purple-bright hover:gap-3 transition-all">
            Tous les articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {articles.map((article) => {
            const date = article.date
              ? new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
              : null;
            return (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <article className="rounded-2xl border border-border bg-white overflow-hidden hover:border-purple-bright/30 hover:shadow-xl hover:shadow-purple-bright/[0.06] transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <ArticleThumb src={article.image} alt={article.titre} />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/40 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-purple-bright border-0 text-xs font-bold">
                        {CATEGORY_LABELS[article.categorie] || article.categorie}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black tracking-tight text-sm leading-snug mb-2 group-hover:text-purple-deep transition-colors line-clamp-2">
                      {article.titre}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2 mb-4">
                      {article.excerpt}
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
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-semibold hover:border-purple-bright/40 transition-colors">
            Tous les articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
