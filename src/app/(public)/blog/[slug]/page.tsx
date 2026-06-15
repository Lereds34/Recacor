import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getAllArticles, CTA_PER_CATEGORY, categoryLabel } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User, MapPin, Phone, Calendar, BookOpen } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { ScrollProgress } from "@/components/scroll-progress";
import { ArticleTocBox, ArticleTocSidebar } from "@/components/article-toc";
import { PHONE_DISPLAY, ADDRESS } from "@/lib/tracking";

export const revalidate = 600;

function getArticleSeoTitle(title: string): string {
  const parts = title.split(" — ").map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return title;
  if (parts[0].toLowerCase() === "recacor") {
    return parts.slice(0, 2).join(" — ");
  }
  return parts[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: getArticleSeoTitle(article.frontmatter.titre),
    description: article.frontmatter.meta_description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: Awaited<ReturnType<typeof getArticleBySlug>> = null;
  let dbDown = false;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    dbDown = true;
  }

  if (dbDown) {
    return (
      <section className="pt-40 pb-20 text-center">
        <div className="mx-auto max-w-lg px-4">
          <h1 className="text-3xl font-black mb-4">Article temporairement indisponible</h1>
          <p className="text-muted-foreground mb-8">Notre base de données est en maintenance.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-deep text-white font-bold text-sm hover:opacity-90 transition-opacity">
            ← Retour au blog
          </Link>
        </div>
      </section>
    );
  }

  if (!article) notFound();

  const cta = CTA_PER_CATEGORY[article.frontmatter.categorie];
  const date = article.frontmatter.date
    ? new Date(article.frontmatter.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.frontmatter.slug !== slug && a.frontmatter.categorie === article.frontmatter.categorie)
    .slice(0, 4);

  return (
    <>
      <ScrollProgress />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://www.recacor.fr" },
          { name: "Blog", url: "https://www.recacor.fr/blog" },
          { name: article.frontmatter.titre, url: `https://www.recacor.fr/blog/${slug}` },
        ]}
      />
      {article.faq.length > 0 && <FaqJsonLd items={article.faq} id={slug} />}

      {/* Hero */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        {article.frontmatter.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.frontmatter.image} alt={article.frontmatter.titre}
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/90 via-purple-mid/75 to-purple-bright/60" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        )}
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors">
            ← Retour au blog
          </Link>
          <Badge className="bg-white/10 text-white border-white/20 mb-3">
            {categoryLabel(article.frontmatter.categorie)}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-3xl">
            {article.frontmatter.titre}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
            {article.frontmatter.auteur && (
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{article.frontmatter.auteur}</span>
            )}
            {date && (
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{date}</span>
            )}
            {article.frontmatter.read_time && (
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.frontmatter.read_time}</span>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contenu principal */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:items-start">

            {/* Colonne gauche : TOC box + article */}
            <div>
              {/* TOC inline (mobile + desktop) */}
              <ArticleTocBox headings={article.headings} />

              {/* Corps de l'article */}
              <article
                className="prose prose-base prose-purple max-w-none
                  prose-headings:font-[family-name:var(--font-heading)] prose-headings:font-black prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
                  prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2 prose-h3:text-purple-deep
                  prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-purple-bright prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-ul:text-foreground/80 prose-li:my-1.5
                  prose-blockquote:border-l-4 prose-blockquote:border-purple-bright prose-blockquote:bg-purple-bright/5 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:not-italic
                  prose-img:rounded-2xl prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />

              {/* Card contact Recacor */}
              <div className="mt-10 rounded-2xl border-2 border-purple-bright/20 bg-gradient-to-br from-purple-deep/5 to-purple-bright/5 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-deep flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-sm text-foreground">Recacor — Le Crès</p>
                    <p className="text-xs text-muted-foreground">Spécialiste pneus VL & PL</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PhoneLink location="article-footer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border hover:border-purple-bright/40 hover:shadow-sm transition-all">
                    <Phone className="h-4 w-4 text-purple-bright shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Téléphone</p>
                      <p className="text-sm font-bold text-foreground">{PHONE_DISPLAY}</p>
                    </div>
                  </PhoneLink>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border">
                    <Clock className="h-4 w-4 text-purple-bright shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Horaires</p>
                      <p className="text-sm font-semibold text-foreground">Lun–Ven 8h–17h · Sam 8h–12h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border sm:col-span-2">
                    <MapPin className="h-4 w-4 text-purple-bright shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Adresse</p>
                      <p className="text-sm font-semibold text-foreground">{ADDRESS}</p>
                    </div>
                  </div>
                </div>
                <Link href={cta.anchor}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-deep text-white font-bold text-sm hover:bg-purple-mid transition-colors">
                  {cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar desktop */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">

                {/* TOC sidebar */}
                <ArticleTocSidebar headings={article.headings} />

                {/* CTA card */}
                <div className="rounded-2xl bg-gradient-to-br from-purple-deep to-purple-mid p-5 text-white">
                  <p className="font-black text-base mb-1">Besoin d&apos;un devis ?</p>
                  <p className="text-white/60 text-xs mb-4">Réponse sous 2h · Sans engagement</p>
                  <Link href={cta.anchor}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-purple-deep font-bold text-sm hover:shadow-lg transition-shadow mb-2">
                    {cta.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <PhoneLink location="article-sidebar" showIcon
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                    {PHONE_DISPLAY}
                  </PhoneLink>
                </div>

                {/* Articles récents de la même catégorie */}
                {relatedArticles.length > 0 && (
                  <div className="rounded-2xl border border-border bg-white p-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                      Articles similaires
                    </p>
                    <div className="space-y-3">
                      {relatedArticles.slice(0, 4).map((a) => (
                        <Link key={a.frontmatter.slug} href={`/blog/${a.frontmatter.slug}`}
                          className="flex gap-3 group">
                          <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden bg-gradient-to-br from-purple-mid/30 to-purple-bright/20 flex items-center justify-center">
                            {a.frontmatter.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={a.frontmatter.image} alt={a.frontmatter.titre}
                                className="w-full h-full object-cover" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-purple-bright/40" strokeWidth={1.5} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold leading-snug line-clamp-2 group-hover:text-purple-bright transition-colors">
                              {a.frontmatter.titre}
                            </p>
                            {a.frontmatter.date && (
                              <p className="text-[10px] text-muted-foreground mt-1">
                                {new Date(a.frontmatter.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {article.faq.length > 0 && (
        <section className="relative py-16 bg-muted overflow-hidden">
          <BgParticles />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight mb-8 text-center">
              FAQ — <span className="text-gradient-purple">Questions fréquentes</span>
            </h2>
            <div className="space-y-3">
              {article.faq.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-border bg-white p-5 cursor-pointer">
                  <summary className="font-bold text-sm list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles liés — mobile uniquement (desktop = sidebar) */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-background lg:hidden">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-black tracking-tight mb-6">
              Articles <span className="text-gradient-purple">similaires</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.slice(0, 2).map((a) => (
                <Link key={a.frontmatter.slug} href={`/blog/${a.frontmatter.slug}`}
                  className="group flex gap-4 rounded-2xl border border-border bg-white p-4 hover:border-purple-bright/30 hover:shadow-md transition-all">
                  <div className="w-16 h-16 rounded-xl shrink-0 overflow-hidden bg-gradient-to-br from-purple-mid/30 to-purple-bright/20 flex items-center justify-center">
                    {a.frontmatter.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.frontmatter.image} alt={a.frontmatter.titre} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-purple-bright/40" strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 text-[10px] mb-1">
                      {categoryLabel(a.frontmatter.categorie)}
                    </Badge>
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-purple-deep transition-colors">
                      {a.frontmatter.titre}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">Besoin d&apos;aide ?</h2>
            <p className="text-white/60 max-w-md mx-auto mb-8">Notre équipe est disponible au Crès, sans rendez-vous.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href={cta.anchor}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-purple-deep font-bold text-sm hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-shadow">
                {cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <PhoneLink location="article-cta" showIcon
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                Appeler : {PHONE_DISPLAY}
              </PhoneLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
