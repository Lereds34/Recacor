import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { getSiteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface LeadPayload {
  form_id: string;
  service_type: string;
  nom?: string;
  prenom?: string;
  entreprise?: string;
  telephone?: string;
  email?: string;
  cp?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  page_source?: string;
  referrer?: string;
  [k: string]: unknown;
}

export async function POST(req: Request) {
  try {
    await ensureSchema();
    const data = (await req.json()) as LeadPayload;

    if (!data.form_id || !data.service_type) {
      return NextResponse.json({ error: "form_id et service_type requis" }, { status: 400 });
    }
    if (!data.telephone || !data.email) {
      return NextResponse.json({ error: "telephone et email requis" }, { status: 400 });
    }

    const inserted = (await sql`
      INSERT INTO leads (
        form_id, service_type, nom, prenom, entreprise,
        telephone, email, cp, message, payload,
        utm_source, utm_medium, utm_campaign, utm_content,
        gclid, fbclid, page_source, referrer
      ) VALUES (
        ${data.form_id}, ${data.service_type},
        ${data.nom || null}, ${data.prenom || null}, ${data.entreprise || null},
        ${data.telephone}, ${data.email}, ${data.cp || null}, ${data.message || null},
        ${JSON.stringify(data)}::jsonb,
        ${data.utm_source || null}, ${data.utm_medium || null},
        ${data.utm_campaign || null}, ${data.utm_content || null},
        ${data.gclid || null}, ${data.fbclid || null},
        ${data.page_source || null}, ${data.referrer || null}
      )
      RETURNING id;
    `) as { id: number }[];

    const leadId = inserted[0]?.id;

    // Webhook + email (non-bloquant)
    const config = await getSiteConfig();

    if (config.leadsWebhookUrl) {
      fetch(config.leadsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, ...data }),
      }).catch((err) => console.error("[lead webhook]", err));
    }

    if (config.leadsEmailTo && process.env.RESEND_API_KEY) {
      sendLeadEmail(config.leadsEmailTo, data, leadId).catch((err) =>
        console.error("[lead email]", err)
      );
    }

    return NextResponse.json({ ok: true, id: leadId });
  } catch (e) {
    console.error("[lead]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

async function sendLeadEmail(to: string, data: LeadPayload, leadId: number) {
  const subject = `Nouveau lead Recacor #${leadId} — ${data.service_type.toUpperCase()}`;
  const lines = [
    `<h2>Nouveau lead</h2>`,
    `<p><strong>ID :</strong> ${leadId}</p>`,
    `<p><strong>Type :</strong> ${data.service_type}</p>`,
    `<p><strong>Formulaire :</strong> ${data.form_id}</p>`,
    `<hr/>`,
    data.nom && `<p><strong>Nom :</strong> ${data.nom} ${data.prenom || ""}</p>`,
    data.entreprise && `<p><strong>Entreprise :</strong> ${data.entreprise}</p>`,
    `<p><strong>Téléphone :</strong> <a href="tel:${data.telephone}">${data.telephone}</a></p>`,
    `<p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>`,
    data.cp && `<p><strong>CP :</strong> ${data.cp}</p>`,
    data.message && `<p><strong>Message :</strong><br/>${(data.message as string).replace(/\n/g, "<br/>")}</p>`,
    `<hr/>`,
    `<p><small><strong>Source :</strong> ${data.utm_source || "direct"} · <strong>Page :</strong> ${data.page_source || "/"}</small></p>`,
  ].filter(Boolean);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Recacor <noreply@recacor.fr>",
      to,
      subject,
      html: lines.join("\n"),
    }),
  });
}
