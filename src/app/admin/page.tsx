import Link from "next/link";
import { listArticles } from "@/lib/blog-admin";
import { FileText, Plus, ExternalLink, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminHome() {
  let articles: Awaited<ReturnType<typeof listArticles>> = [];
  try {
    articles = await listArticles();
  } catch {
    /* DB indisponible — affiche 0 */
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue dans l&apos;admin Recacor. Gérez vos articles de blog ci-dessous.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-white border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <FileText className="w-5 h-5 text-purple-bright" />
            <span className="text-3xl font-black">{articles.length}</span>
          </div>
          <p className="text-sm font-bold">Articles publiés</p>
          <Link href="/admin/blog" className="text-xs text-purple-bright hover:underline mt-2 inline-flex items-center gap-1">
            Voir tous les articles <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <Link href="/admin/blog/new" className="rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid text-white p-6 hover:shadow-lg transition-shadow">
          <Plus className="w-5 h-5 mb-3" />
          <p className="text-lg font-black">Nouvel article</p>
          <p className="text-xs text-white/70 mt-1">Coller votre markdown</p>
        </Link>

        <Link href="/blog" target="_blank" className="rounded-2xl bg-white border border-border p-6 hover:border-purple-bright/30 transition-colors">
          <ExternalLink className="w-5 h-5 text-purple-bright mb-3" />
          <p className="text-lg font-black">Voir le blog</p>
          <p className="text-xs text-muted-foreground mt-1">Page publique /blog</p>
        </Link>
      </div>
    </div>
  );
}
