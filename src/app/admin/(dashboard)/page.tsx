import Link from "next/link";
import { listArticles } from "@/lib/blog-admin";
import { listVilles } from "@/lib/villes";
import { sql, ensureSchema } from "@/lib/db";
import { FileText, Plus, ExternalLink, ArrowRight, Inbox, MapPin, Settings, Scale } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminHome() {
  let articles: Awaited<ReturnType<typeof listArticles>> = [];
  let villes: Awaited<ReturnType<typeof listVilles>> = [];
  let leadStats = { total: 0, new: 0 };
  try {
    await ensureSchema();
    articles = await listArticles();
    villes = await listVilles(true);
    const ls = (await sql`
      SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status = 'new') AS new FROM leads
    `) as { total: string; new: string }[];
    if (ls[0]) leadStats = { total: Number(ls[0].total), new: Number(ls[0].new) };
  } catch {}

  const stats = [
    { label: "Leads totaux", value: leadStats.total, hint: `${leadStats.new} nouveaux`, href: "/admin/leads", Icon: Inbox },
    { label: "Articles publiés", value: articles.length, hint: "Blog", href: "/admin/blog", Icon: FileText },
    { label: "Pages villes", value: villes.length, hint: "SEO local", href: "/admin/villes", Icon: MapPin },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue dans l&apos;admin Recacor. Tout se passe ici.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group rounded-2xl bg-white border border-border p-6 hover:border-purple-bright/30 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <s.Icon className="w-5 h-5 text-purple-bright" />
              <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-purple-bright group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-3xl font-black">{s.value}</p>
            <p className="text-sm font-bold mt-1">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.hint}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-black tracking-tight mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/blog/new" className="group rounded-2xl bg-gradient-to-br from-purple-bright to-purple-mid text-white p-5 hover:shadow-lg">
            <Plus className="w-5 h-5 mb-2" />
            <p className="font-black">Nouvel article</p>
            <p className="text-xs text-white/70 mt-0.5">Coller markdown</p>
          </Link>
          <Link href="/admin/villes/new" className="group rounded-2xl bg-white border border-border p-5 hover:border-purple-bright/30">
            <MapPin className="w-5 h-5 text-purple-bright mb-2" />
            <p className="font-black">Nouvelle ville</p>
            <p className="text-xs text-muted-foreground mt-0.5">Page SEO locale</p>
          </Link>
          <Link href="/admin/settings" className="group rounded-2xl bg-white border border-border p-5 hover:border-purple-bright/30">
            <Settings className="w-5 h-5 text-purple-bright mb-2" />
            <p className="font-black">Réglages</p>
            <p className="text-xs text-muted-foreground mt-0.5">Tel, email, GTM, pixels</p>
          </Link>
          <Link href="/admin/legal" className="group rounded-2xl bg-white border border-border p-5 hover:border-purple-bright/30">
            <Scale className="w-5 h-5 text-purple-bright mb-2" />
            <p className="font-black">Pages légales</p>
            <p className="text-xs text-muted-foreground mt-0.5">Mentions, CGV, RGPD</p>
          </Link>
        </div>
      </div>

      <div>
        <Link href="/" target="_blank" className="inline-flex items-center gap-2 text-sm text-purple-bright hover:underline">
          <ExternalLink className="w-4 h-4" /> Voir le site public
        </Link>
      </div>
    </div>
  );
}
