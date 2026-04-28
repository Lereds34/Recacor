/* Provider abstraction : Brevo en priorité, fallback Resend */

interface SendOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(opts: SendOptions): Promise<{ ok: boolean; provider?: string; id?: string; error?: string }> {
  if (process.env.BREVO_API_KEY) {
    return sendViaBrevo(opts);
  }
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(opts);
  }
  return { ok: false, error: "Aucun provider email configuré (BREVO_API_KEY ou RESEND_API_KEY)" };
}

async function sendViaBrevo(opts: SendOptions): Promise<{ ok: boolean; provider: string; id?: string; error?: string }> {
  const senderName = process.env.BREVO_SENDER_NAME || "Recacor";
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "recacor.fr@gmail.com";

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: opts.to }],
        subject: opts.subject,
        htmlContent: opts.html,
        textContent: opts.text,
        ...(opts.replyTo ? { replyTo: { email: opts.replyTo } } : {}),
      }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, provider: "brevo", error: data.message || `HTTP ${res.status}` };
    return { ok: true, provider: "brevo", id: data.messageId };
  } catch (e) {
    return { ok: false, provider: "brevo", error: String(e) };
  }
}

async function sendViaResend(opts: SendOptions): Promise<{ ok: boolean; provider: string; id?: string; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Recacor <onboarding@resend.dev>",
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, provider: "resend", error: data.message || `HTTP ${res.status}` };
    return { ok: true, provider: "resend", id: data.id };
  } catch (e) {
    return { ok: false, provider: "resend", error: String(e) };
  }
}
