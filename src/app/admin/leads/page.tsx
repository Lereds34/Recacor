import { sql, ensureSchema } from "@/lib/db";
import { LeadsTable, type LeadRow } from "./table";
import { Download } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function LeadsPage() {
  let leads: LeadRow[] = [];
  let stats = { total: 0, new: 0, contacted: 0, converted: 0 };
  try {
    await ensureSchema();
    leads = (await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 500`) as LeadRow[];
    const totals = (await sql`
      SELECT
        COUNT(*) FILTER (WHERE TRUE)              AS total,
        COUNT(*) FILTER (WHERE status = 'new')    AS new,
        COUNT(*) FILTER (WHERE status = 'contacted') AS contacted,
        COUNT(*) FILTER (WHERE status = 'converted') AS converted
      FROM leads
    `) as { total: string; new: string; contacted: string; converted: string }[];
    if (totals[0]) {
      stats = {
        total: Number(totals[0].total),
        new: Number(totals[0].new),
        contacted: Number(totals[0].contacted),
        converted: Number(totals[0].converted),
      };
    }
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Leads ({stats.total})</h1>
          <p className="text-muted-foreground mt-1">
            Tous les leads reçus via les formulaires du site.
          </p>
        </div>
        <a
          href="/api/admin/leads?format=csv"
          download
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:border-purple-bright/30 hover:bg-purple-bright/5 transition-colors"
        >
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, color: "bg-purple-bright/10 text-purple-bright" },
          { label: "Nouveaux", value: stats.new, color: "bg-blue-100 text-blue-700" },
          { label: "Contactés", value: stats.contacted, color: "bg-amber-100 text-amber-700" },
          { label: "Convertis", value: stats.converted, color: "bg-green-100 text-green-700" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-border p-5">
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold mb-2 ${s.color}`}>
              {s.label}
            </div>
            <p className="text-3xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

      <LeadsTable initial={leads} />
    </div>
  );
}
