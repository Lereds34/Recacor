import { NextResponse } from "next/server";
import { sql, ensureSchema, getSetting } from "@/lib/db";
import { getSiteConfig } from "@/lib/site-config";
import { subscribeContact } from "@/lib/mailchimp";
import { leadNotificationEmail, leadConfirmationEmail } from "@/lib/email-templates";
import { sendEmail } from "@/lib/mailer";

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
    const data = (await req.json()) as LeadPayload;

    if (!data.form_id || !data.service_type) {
      return NextResponse.json({ error: "form_id et service_type requis" }, { status: 400 });
    }
    if (!data.telephone) {
      return NextResponse.json({ error: "telephone requis" }, { status: 400 });
    }

    // AdsFlow CRM — fire-and-forget en PREMIER, indépendant de la DB
    fetch(
      "https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/incoming-webhook?entreprise_id=3a2e6c94-b7f6-4c0e-bf07-155802908064&source=site_recacor",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: [data.prenom, data.nom].filter(Boolean).join(" ") || null,
          tel: data.telephone || null,
          email: data.email || null,
          cp: data.cp || null,
          source: data.utm_source || data.referrer || null,
          page: data.page_source || null,
          gclid: data.gclid || null,
          fbclid: data.fbclid || null,
          form_id: data.form_id,
          service_type: data.service_type,
          message: data.message || null,
          payload: data,
        }),
      }
    ).catch((err) => console.error("[adsflow webhook]", err));

    // Insertion DB Neon — si quota dépassé, on continue quand même
    let leadId: number | undefined;
    try {
      await ensureSchema();
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
      leadId = inserted[0]?.id;
    } catch (dbErr) {
      console.error("[lead DB indisponible]", dbErr);
      // La DB est KO (quota Neon dépassé) — le lead est déjà dans AdsFlow
    }

    const config = await getSiteConfig().catch(() => ({ leadsWebhookUrl: null, leadsEmailTo: null }));

    if (config.leadsWebhookUrl) {
      fetch(config.leadsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, ...data }),
      }).catch((err) => console.error("[lead webhook]", err));
    }

    const hasMailer = !!(process.env.BREVO_API_KEY || process.env.RESEND_API_KEY);

    if (config.leadsEmailTo && hasMailer) {
      sendLeadEmail(config.leadsEmailTo, data, leadId ?? 0).catch((err) =>
        console.error("[lead email]", err)
      );
    }

    const sendConfirm = await getSetting("leads_send_confirmation", "").catch(() => "");
    if (sendConfirm === "1" && data.email && hasMailer) {
      sendConfirmationEmail(data).catch((err) =>
        console.error("[lead confirmation]", err)
      );
    }

    if (process.env.MAILCHIMP_API_KEY && data.email) {
      const audienceId = await getSetting("mailchimp_audience_id").catch(() => null);
      if (audienceId) {
        subscribeContact(audienceId, {
          email: data.email,
          firstName: data.prenom,
          lastName: data.nom,
          phone: data.telephone,
          tags: [data.service_type, data.form_id, data.utm_source || "direct"].filter(Boolean) as string[],
        }).catch((err) => console.error("[mailchimp]", err));
      }
    }

    return NextResponse.json({ ok: true, id: leadId ?? null });
  } catch (e) {
    console.error("[lead]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

async function sendLeadEmail(to: string, data: LeadPayload, leadId: number) {
  const { subject, html, text } = leadNotificationEmail(data, leadId);
  const result = await sendEmail({
    to,
    subject,
    html,
    text,
    replyTo: data.email,
  });
  if (!result.ok) console.error("[lead email]", result.error);
}

async function sendConfirmationEmail(data: LeadPayload) {
  if (!data.email) return;
  const { subject, html, text } = leadConfirmationEmail(data);
  const result = await sendEmail({
    to: data.email,
    subject,
    html,
    text,
  });
  if (!result.ok) console.error("[lead confirmation]", result.error);
}
