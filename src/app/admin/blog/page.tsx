import Link from "next/link";
import { listArticles } from "@/lib/blog-admin";
import { Plus, ExternalLink, Pencil } from "lucide-react";
import { categoryLabel } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function AdminBlogList() {
  const articles = await listArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Articles ({articles.length})</h1>
          <p className="text-muted-foreground mt-1">Gérez vos articles de blog en markdown.</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid">
          <Plus className="h-4 w-4" /> Nouvel article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <p className="text-muted-foreground">Aucun article pour le moment.</p>
          <Link href="/admin/blog/new" className="mt-4 inline-flex items-center gap-2 text-purple-bright font-semibold hover:underline">
            Créer le premier article →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-5 py-3 font-bold">Titre</th>
                <th className="px-5 py-3 font-bold hidden sm:table-cell">Catégorie</th>
                <th className="px-5 py-3 font-bold hidden md:table-cell">Date</th>
                <th className="px-5 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.slug} className="border-t border-border hover:bg-muted/40 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{a.titre}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">/blog/{a.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-xs font-medium text-purple-bright bg-purple-bright/[0.06] px-2 py-1 rounded-full">
                      {categoryLabel(a.categorie)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{a.date || "—"}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/blog/${a.slug}`}
                        target="_blank"
                        className="text-muted-foreground hover:text-purple-bright p-1.5 rounded-lg hover:bg-purple-bright/10"
                        title="Voir"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/blog/${a.slug}/edit`}
                        className="inline-flex items-center gap-1.5 text-purple-bright text-xs font-bold px-3 py-1.5 rounded-full bg-purple-bright/10 hover:bg-purple-bright/20"
                      >
                        <Pencil className="h-3 w-3" /> Modifier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
