import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticleBySlug,
  getAllArticles,
  CTA_PER_CATEGORY,
  categoryLabel,
} from "@/lib/blog";

export const revalidate = 3600;
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User, MapPin, Phone, Calendar } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { BgParticles } from "@/components/bg-particles";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { ScrollProgress } from "@/components/scroll-progress";
import { ArticleToc } from "@/components/article-toc";
import { PHONE_DISPLAY, ADDRESS } from "@/lib/tracking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: `${article.frontmatter.titre} — Recacor Le Crès`,
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
          <div className="text-6xl mb-6">🔧</div>
          <h1 className="text-3xl font-black mb-4">Article temporairement indisponible</h1>
          <p className="text-muted-foreground mb-8">
            Notre base de données est en maintenance. Cet article sera de nouveau accessible très prochainement.
          </p>
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
    .slice(0, 3);

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
      <section className="relative pt-32 pb-16 overflow-hidden">
        {article.frontmatter.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.frontmatter.image}
              alt={article.frontmatter.titre}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/85 via-purple-mid/70 to-purple-bright/65" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-mid to-purple-bright" />
        )}
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            ← Retour au blog
          </Link>
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            {categoryLabel(article.frontmatter.categorie)}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] max-w-3xl">
            {article.frontmatter.titre}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            {article.frontmatter.auteur && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />{article.frontmatter.auteur}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />{date}
              </span>
            )}
            {article.frontmatter.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />{article.frontmatter.read_time}
              </span>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Body + sidebar */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* TOC mobile (collapsible) */}
          <ArticleToc headings={article.headings} />

          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 lg:items-start">

            {/* Contenu principal */}
            <div>
              <article
                className="prose prose-lg prose-purple max-w-none
                  prose-headings:font-[family-name:var(--font-heading)] prose-headings:font-black prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-foreground
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-purple-bright prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-ul:text-foreground/80 prose-li:my-1.5
                  prose-blockquote:border-purple-bright prose-blockquote:bg-purple-bright/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                  prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />

              {/* Card contact Recacor */}
              <div className="mt-10 rounded-2xl border border-purple-bright/20 bg-purple-bright/5 p-6">
                <p className="text-xs font-bold text-purple-bright uppercase tracking-wider mb-4">Recacor — Le Crès</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <PhoneLink location="article-footer" className="flex items-center gap-2.5 font-semibold text-foreground hover:text-purple-bright transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-purple-bright" />
                    </span>
                    {PHONE_DISPLAY}
                  </PhoneLink>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <span className="w-8 h-8 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-purple-bright" />
                    </span>
                    {ADDRESS}
                  </div>
                  <div className="flex items-center gap-2.5 text-muted-foreground">
                    <span className="w-8 h-8 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-purple-bright" />
                    </span>
                    <span>Lun–Ven 8h–17h · Sam 8h–12h</span>
                  </div>
                  <Link
                    href={cta.anchor}
                    className="flex items-center gap-2.5 font-semibold text-purple-bright hover:text-purple-deep transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-purple-bright/10 flex items-center justify-center shrink-0">
                      <ArrowRight className="h-4 w-4 text-purple-bright" />
                    </span>
                    {cta.label}
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar desktop (TOC uniquement, CTA déjà en bas) */}
            <ArticleToc headings={article.headings} />
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

      {/* Articles liés */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black tracking-tight mb-8">
              Articles <span className="text-gradient-purple">similaires</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <Link key={a.frontmatter.slug} href={`/blog/${a.frontmatter.slug}`}
                  className="group rounded-2xl border border-border bg-white p-6 hover:border-purple-bright/30 hover:shadow-lg transition-all">
                  <Badge className="bg-purple-bright/10 text-purple-bright border-purple-bright/20 text-xs mb-3">
                    {categoryLabel(a.frontmatter.categorie)}
                  </Badge>
                  <h3 className="font-black text-sm leading-snug mb-2 group-hover:text-purple-deep transition-colors line-clamp-2">
                    {a.frontmatter.titre}
                  </h3>
                  <span className="text-xs text-purple-bright font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lire <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-deep to-purple-mid p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Besoin d&apos;aide ?</h2>
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
