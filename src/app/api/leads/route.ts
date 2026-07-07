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
  submission_id?: string;
  [k: string]: unknown;
}

type AdsFlowForwardResult = {
  accepted: boolean;
  shouldAlert: boolean;
  detail?: string;
};

export async function POST(req: Request) {
  try {
    const data = normalizeLeadAttribution((await req.json()) as LeadPayload);

    if (!data.form_id || !data.service_type) {
      return NextResponse.json({ error: "form_id et service_type requis" }, { status: 400 });
    }
    if (!data.telephone) {
      return NextResponse.json({ error: "telephone requis" }, { status: 400 });
    }

    // AdsFlow CRM — la réponse est contrôlée pour ne compter que les leads acceptés.
    const adsFlowResult = await forwardLeadToAdsFlow(data);
    const adsFlowAccepted = adsFlowResult.accepted;

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
      await sendLeadEmail(config.leadsEmailTo, data, leadId ?? 0);
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

    const databaseAccepted = typeof leadId === "number";

    if (!adsFlowAccepted && adsFlowResult.shouldAlert) {
      sendAdsFlowFailureAlert(
        data,
        adsFlowResult.detail || "Échec AdsFlow non détaillé",
        databaseAccepted,
      ).catch((e) => console.error("[adsflow alert]", e));
    }

    const acceptedBy = [
      adsFlowAccepted ? "adsflow" : null,
      databaseAccepted ? "recacor_db" : null,
    ].filter((value): value is string => Boolean(value));

    if (acceptedBy.length === 0) {
      return NextResponse.json(
        { error: "Le lead n'a été accepté par aucun système." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      accepted: true,
      accepted_by: acceptedBy,
      id: leadId ?? null,
      tracking_id: data.submission_id || (leadId ? String(leadId) : null),
    });
  } catch (e) {
    console.error("[lead]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

async function forwardLeadToAdsFlow(data: LeadPayload): Promise<AdsFlowForwardResult> {
  const adsFlowTokenParam = process.env.ADSFLOW_WEBHOOK_TOKEN
    ? `&token=${encodeURIComponent(process.env.ADSFLOW_WEBHOOK_TOKEN)}`
    : "";
  const url =
    `https://xohhxyzyupggvkjyouui.supabase.co/functions/v1/incoming-webhook?entreprise_id=3a2e6c94-b7f6-4c0e-bf07-155802908064&source=site_recacor${adsFlowTokenParam}`;
  const payload = {
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
  };

  const attempts = [
    { timeoutMs: 6000, waitAfterMs: 1500 },
    { timeoutMs: 12000, waitAfterMs: 0 },
  ];

  let lastHttpError = "";
  let lastRuntimeError = "";

  for (const attempt of attempts) {
    try {
      const adsFlowResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(attempt.timeoutMs),
        body: JSON.stringify(payload),
      });

      if (adsFlowResponse.ok) {
        return { accepted: true, shouldAlert: false };
      }

      const body = await adsFlowResponse.text().catch(() => "");
      lastHttpError = `HTTP ${adsFlowResponse.status} — ${body}`;
      console.error("[adsflow webhook]", lastHttpError);
    } catch (err) {
      lastRuntimeError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      console.error("[adsflow webhook]", lastRuntimeError);
    }

    if (attempt.waitAfterMs > 0) {
      await wait(attempt.waitAfterMs);
    }
  }

  if (lastHttpError) {
    return {
      accepted: false,
      shouldAlert: true,
      detail: lastHttpError,
    };
  }

  return {
    accepted: false,
    shouldAlert: false,
    detail: lastRuntimeError || "Erreur AdsFlow transitoire",
  };
}

function normalizeLeadAttribution(data: LeadPayload): LeadPayload {
  const referrer = String(data.referrer || "").toLowerCase();
  const utmSource = String(data.utm_source || "").toLowerCase();
  const hasRealSource = utmSource && utmSource !== "direct";

  if (hasRealSource) return data;

  if (referrer.includes("facebook.com") || referrer.includes("instagram.com")) {
    return {
      ...data,
      utm_source: "facebook",
      utm_medium: data.utm_medium || "referral",
    };
  }

  if (referrer.includes("google.") || referrer.includes("syndicatedsearch.goog")) {
    return {
      ...data,
      utm_source: "google",
      utm_medium: data.utm_medium || "organic",
    };
  }

  return data;
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

const ADSFLOW_ALERT_EMAIL = "redouanelmansouri34@gmail.com";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendAdsFlowFailureAlert(
  data: LeadPayload,
  errorDetail: string,
  databaseAccepted: boolean,
) {
  if (!process.env.BREVO_API_KEY && !process.env.RESEND_API_KEY) return;
  const nom = [data.prenom, data.nom].filter(Boolean).join(" ") || "(nom non renseigné)";
  const text = [
    databaseAccepted
      ? `Le webhook AdsFlow a échoué de façon persistante, mais le lead est bien enregistré dans la base Recacor. Vérifier s'il apparaît avec retard dans AdsFlow avant d'agir.`
      : `Le lead n'a PAS été transmis à AdsFlow et n'a pas pu être confirmé dans la base Recacor. Vérification urgente nécessaire.`,
    ``,
    `Nom : ${nom}`,
    `Téléphone : ${data.telephone || "—"}`,
    `Email : ${data.email || "—"}`,
    `CP : ${data.cp || "—"}`,
    `Service : ${data.service_type || "—"}`,
    `Formulaire : ${data.form_id || "—"}`,
    `Page : ${data.page_source || "—"}`,
    `Message : ${data.message || "—"}`,
    ``,
    `Erreur AdsFlow : ${errorDetail}`,
  ].join("\n");

  const result = await sendEmail({
    to: ADSFLOW_ALERT_EMAIL,
    subject: databaseAccepted
      ? `⚠️ Retard probable AdsFlow — ${nom}`
      : `⚠️ Lead non transmis à AdsFlow — ${nom}`,
    html: `<pre style="font-family:monospace;white-space:pre-wrap">${text.replace(/</g, "&lt;")}</pre>`,
    text,
  });
  if (!result.ok) console.error("[adsflow alert email]", result.error);
}
