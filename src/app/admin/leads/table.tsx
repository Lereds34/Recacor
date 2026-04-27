"use client";

import { useState } from "react";
import { Phone, Mail, Trash2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export interface LeadRow {
  id: number;
  created_at: string;
  form_id: string;
  service_type: string;
  status: string;
  nom: string | null;
  prenom: string | null;
  entreprise: string | null;
  telephone: string | null;
  email: string | null;
  cp: string | null;
  message: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  page_source: string | null;
}

const STATUS_OPTIONS = [
  { value: "new", label: "Nouveau", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "Contacté", color: "bg-amber-100 text-amber-700" },
  { value: "converted", label: "Converti", color: "bg-green-100 text-green-700" },
  { value: "lost", label: "Perdu", color: "bg-gray-100 text-gray-700" },
];

const SERVICE_LABELS: Record<string, string> = {
  vl: "VL",
  pl: "PL",
  mecanique: "Mécanique",
  contact: "Contact",
};

export function LeadsTable({ initial }: { initial: LeadRow[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initial);
  const [filterService, setFilterService] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = leads.filter(
    (l) =>
      (!filterService || l.service_type === filterService) &&
      (!filterStatus || l.status === filterStatus)
  );

  const updateStatus = async (id: number, status: string) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
  };

  const remove = async (id: number) => {
    if (!confirm("Supprimer ce lead ?")) return;
    await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    setLeads((ls) => ls.filter((l) => l.id !== id));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="h-10 rounded-xl border border-input bg-white px-3 text-sm"
        >
          <option value="">Tous services</option>
          {Object.entries(SERVICE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-10 rounded-xl border border-input bg-white px-3 text-sm"
        >
          <option value="">Tous statuts</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground ml-auto">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
          Aucun lead pour le moment.
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-4 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Type</th>
                <th className="px-4 py-3 font-bold">Contact</th>
                <th className="px-4 py-3 font-bold hidden md:table-cell">Source</th>
                <th className="px-4 py-3 font-bold">Statut</th>
                <th className="px-4 py-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <>
                  <tr
                    key={l.id}
                    className="border-t border-border hover:bg-muted/40 cursor-pointer"
                    onClick={() => setOpenId(openId === l.id ? null : l.id)}
                  >
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(l.created_at).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-purple-bright bg-purple-bright/10 px-2 py-1 rounded-full">
                        {SERVICE_LABELS[l.service_type] || l.service_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{l.prenom || ""} {l.nom || ""}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        {l.telephone && (
                          <a
                            href={`tel:${l.telephone}`}
                            className="hover:text-purple-bright inline-flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="h-3 w-3" /> {l.telephone}
                          </a>
                        )}
                        {l.email && (
                          <a
                            href={`mailto:${l.email}`}
                            className="hover:text-purple-bright inline-flex items-center gap-1 truncate max-w-[180px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="h-3 w-3" /> {l.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                      {l.utm_source || "direct"}
                      {l.utm_campaign && <span className="block text-[10px]">{l.utm_campaign}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateStatus(l.id, e.target.value)}
                        className="h-8 rounded-lg border border-input bg-white px-2 text-xs font-semibold"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            openId === l.id ? "rotate-180" : ""
                          }`}
                        />
                        <button
                          onClick={() => remove(l.id)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {openId === l.id && (
                    <tr className="bg-muted/40">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <p className="font-bold mb-1">Coordonnées</p>
                            <dl className="space-y-1 text-muted-foreground">
                              {l.entreprise && <div><dt className="inline font-bold">Entreprise: </dt><dd className="inline">{l.entreprise}</dd></div>}
                              {l.cp && <div><dt className="inline font-bold">CP: </dt><dd className="inline">{l.cp}</dd></div>}
                              <div><dt className="inline font-bold">Form ID: </dt><dd className="inline">{l.form_id}</dd></div>
                            </dl>
                          </div>
                          <div>
                            <p className="font-bold mb-1">Tracking</p>
                            <dl className="space-y-1 text-muted-foreground">
                              <div><dt className="inline font-bold">Source: </dt><dd className="inline">{l.utm_source || "direct"}</dd></div>
                              {l.utm_medium && <div><dt className="inline font-bold">Medium: </dt><dd className="inline">{l.utm_medium}</dd></div>}
                              {l.utm_campaign && <div><dt className="inline font-bold">Campaign: </dt><dd className="inline">{l.utm_campaign}</dd></div>}
                              {l.gclid && <div><dt className="inline font-bold">gclid: </dt><dd className="inline truncate">{l.gclid}</dd></div>}
                              {l.fbclid && <div><dt className="inline font-bold">fbclid: </dt><dd className="inline truncate">{l.fbclid}</dd></div>}
                              {l.page_source && <div><dt className="inline font-bold">Page: </dt><dd className="inline">{l.page_source}</dd></div>}
                            </dl>
                          </div>
                          {l.message && (
                            <div className="md:col-span-2">
                              <p className="font-bold mb-1">Message</p>
                              <p className="text-muted-foreground whitespace-pre-wrap">{l.message}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
