import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  await ensureSchema();
  const url = new URL(req.url);
  const format = url.searchParams.get("format");
  const status = url.searchParams.get("status");
  const service = url.searchParams.get("service");

  // Filters dynamiquement
  let rows;
  if (status && service) {
    rows = await sql`SELECT * FROM leads WHERE status = ${status} AND service_type = ${service} ORDER BY created_at DESC LIMIT 500`;
  } else if (status) {
    rows = await sql`SELECT * FROM leads WHERE status = ${status} ORDER BY created_at DESC LIMIT 500`;
  } else if (service) {
    rows = await sql`SELECT * FROM leads WHERE service_type = ${service} ORDER BY created_at DESC LIMIT 500`;
  } else {
    rows = await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 500`;
  }

  if (format === "csv") {
    const header = [
      "id", "created_at", "form_id", "service_type", "status",
      "nom", "prenom", "entreprise", "telephone", "email", "cp", "message",
      "utm_source", "utm_medium", "utm_campaign", "gclid", "fbclid", "page_source",
    ];
    const csvRows = (rows as Record<string, unknown>[]).map((r) =>
      header
        .map((h) => {
          const v = r[h];
          if (v == null) return "";
          const s = String(v).replace(/"/g, '""').replace(/\n/g, " ");
          return `"${s}"`;
        })
        .join(",")
    );
    const csv = [header.join(","), ...csvRows].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`,
      },
    });
  }

  return NextResponse.json({ leads: rows });
}

export async function PATCH(req: Request) {
  try {
    await ensureSchema();
    const { id, status } = (await req.json()) as { id: number; status: string };
    if (!id || !status) {
      return NextResponse.json({ error: "id et status requis" }, { status: 400 });
    }
    await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await ensureSchema();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
    await sql`DELETE FROM leads WHERE id = ${Number(id)}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
