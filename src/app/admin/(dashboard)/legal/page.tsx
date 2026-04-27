import { listLegalPages } from "@/lib/legal";
import Link from "next/link";
import { Pencil, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function LegalAdmin() {
  const pages = await listLegalPages();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Pages légales</h1>
        <p className="text-muted-foreground mt-1">
          Mentions légales, CGV, politique de confidentialité.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {pages.map((p) => (
          <div key={p.slug} className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-lg font-black tracking-tight">{p.titre}</h2>
            <p className="text-xs text-muted-foreground mt-1">/{p.slug}</p>
            <div className="mt-5 flex items-center gap-2">
              <Link
                href={`/admin/legal/${p.slug}/edit`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-bright text-white text-xs font-bold hover:bg-purple-mid"
              >
                <Pencil className="h-3 w-3" /> Modifier
              </Link>
              <Link
                href={`/${p.slug}`}
                target="_blank"
                className="text-muted-foreground hover:text-purple-bright p-2 rounded-lg hover:bg-purple-bright/10"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
