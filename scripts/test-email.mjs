import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const TO = process.argv[2] || "maxence@webomax.fr";

const SAMPLE = {
  form_id: "devis-vl-form",
  service_type: "vl",
  nom: "Test",
  prenom: "Webomax",
  telephone: "06 07 62 10 43",
  email: TO,
  cp: "34920",
  message: "Ceci est un email test envoyé depuis le site Recacor.\nIl contient le visuel premium violet Recacor.\nSi vous voyez ce mail, l'intégration fonctionne !",
  utm_source: "test",
  utm_campaign: "demo_visuel",
  page_source: "/admin",
};

const PURPLE_DEEP = "#2D1460";
const PURPLE_BRIGHT = "#6D28D9";
const PURPLE_GLOW = "#A78BFA";

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function row(label, value) {
  if (!value) return "";
  return `<tr><td style="padding:12px 0;border-bottom:1px solid #eef2f7"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin-bottom:4px">${label}</div><div style="font-size:15px;color:#0f172a;font-weight:600">${escapeHtml(value)}</div></td></tr>`;
}

function buildHtml(d, leadId) {
  const fullName = [d.prenom, d.nom].filter(Boolean).join(" ");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f5f5f7;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:24px 0"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(45,20,96,0.08)">
<tr><td style="background:linear-gradient(135deg,${PURPLE_DEEP},${PURPLE_BRIGHT});padding:32px;color:#fff">
<div style="font-size:24px;font-weight:900">RECA<span style="color:${PURPLE_GLOW}">COR</span></div>
<div style="margin-top:24px;font-size:13px;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.12em">🚗 Pneus voiture · #${leadId}</div>
<div style="margin-top:8px;font-size:28px;font-weight:900">${escapeHtml(fullName)}</div>
</td></tr>
<tr><td style="padding:24px 32px"><table width="100%" cellpadding="0" cellspacing="0">
${row("Téléphone", d.telephone)}
${row("Email", d.email)}
${row("CP", d.cp)}
</table></td></tr>
<tr><td style="padding:0 32px 24px"><div style="background:#faf8ff;border-left:4px solid ${PURPLE_BRIGHT};padding:16px;border-radius:0 12px 12px 0;font-size:14px;color:#334155;white-space:pre-wrap">${escapeHtml(d.message)}</div></td></tr>
<tr><td style="background:#0f172a;padding:24px;text-align:center;color:#64748b;font-size:11px">Recacor · recacor.fr<br><span style="font-size:10px;color:#475569">Site web fait par <a href="https://webomax.fr" style="color:${PURPLE_GLOW};text-decoration:none;font-weight:600">Webomax</a></span></td></tr>
</table></td></tr></table></body></html>`;
}

async function setSetting(key, value) {
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
  `;
}

async function main() {
  console.log(`\n📧 Configuration de l'envoi de mails Recacor\n`);

  // Configure les settings dans la DB
  await sql`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL DEFAULT '', updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`;
  await setSetting("leads_email_to", TO);
  await setSetting("leads_send_confirmation", "1");
  console.log(`✅ Settings DB configurés:`);
  console.log(`   leads_email_to = ${TO}`);
  console.log(`   leads_send_confirmation = 1 (confirmation client activée)`);

  const html = buildHtml(SAMPLE, 999);

  // Brevo en priorité
  if (process.env.BREVO_API_KEY) {
    console.log(`\n📤 Envoi via Brevo vers ${TO}...`);
    const senderName = process.env.BREVO_SENDER_NAME || "Recacor";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@recacor.fr";
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: TO }],
        subject: "🔔 [TEST] Visuel email Recacor",
        htmlContent: html,
      }),
    });
    const j = await res.json();
    if (res.ok) {
      console.log(`✅ Email envoyé via Brevo ! Message ID: ${j.messageId || "—"}`);
    } else {
      console.error(`❌ Erreur Brevo:`, j);
    }
    return;
  }

  if (process.env.RESEND_API_KEY) {
    console.log(`\n📤 Envoi via Resend vers ${TO}...`);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Recacor <onboarding@resend.dev>",
        to: TO,
        subject: "🔔 [TEST] Visuel email Recacor",
        html,
      }),
    });
    const j = await res.json();
    if (res.ok) {
      console.log(`✅ Email envoyé via Resend ! ID: ${j.id || "—"}`);
    } else {
      console.error(`❌ Erreur Resend:`, j);
    }
    return;
  }

  console.log(`\n⚠️  Ni BREVO_API_KEY ni RESEND_API_KEY définies.`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
