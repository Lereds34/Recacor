import Link from "next/link";
import { listVilles } from "@/lib/villes";
import { Plus, ExternalLink, Pencil, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function VillesAdmin() {
  let villes: Awaited<ReturnType<typeof listVilles>> = [];
  try {
    villes = await listVilles(true);
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Pages villes ({villes.length})</h1>
          <p className="text-muted-foreground mt-1">
            Générez des pages SEO localisées pour chaque ville cible.
          </p>
        </div>
        <Link
          href="/admin/villes/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid"
        >
          <Plus className="h-4 w-4" /> Nouvelle ville
        </Link>
      </div>

      {villes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
          <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucune page ville créée pour le moment.</p>
          <Link href="/admin/villes/new" className="mt-4 inline-flex items-center gap-2 text-purple-bright font-semibold hover:underline">
            Créer la première ville →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-5 py-3 font-bold">Ville</th>
                <th className="px-5 py-3 font-bold hidden sm:table-cell">CP</th>
                <th className="px-5 py-3 font-bold hidden md:table-cell">Distance</th>
                <th className="px-5 py-3 font-bold">Statut</th>
                <th className="px-5 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {villes.map((v) => (
                <tr key={v.slug} className="border-t border-border hover:bg-muted/40">
                  <td className="px-5 py-4">
                    <p className="font-semibold">{v.nom}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">/{v.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">{v.cp || "—"}</td>
                  <td className="px-5 py-4 text-muted-foreground hidden md:table-cell">{v.distance || "—"}</td>
                  <td className="px-5 py-4">
                    {v.published ? (
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">Publié</span>
                    ) : (
                      <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">Brouillon</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/${v.slug}`}
                        target="_blank"
                        className="text-muted-foreground hover:text-purple-bright p-1.5 rounded-lg hover:bg-purple-bright/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/villes/${v.slug}/edit`}
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
