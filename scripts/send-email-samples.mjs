import { neon } from "@neondatabase/serverless";

const TO = process.argv[2] || "maxence@webomax.fr";
const BREVO_KEY = process.env.BREVO_API_KEY;
const SENDER_NAME = process.env.BREVO_SENDER_NAME || "Recacor";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "recacor.fr@gmail.com";

if (!BREVO_KEY) {
  console.error("❌ BREVO_API_KEY manquant");
  process.exit(1);
}

const PURPLE_DEEP = "#2D1460";
const PURPLE_MID = "#4A1D96";
const PURPLE_BRIGHT = "#6D28D9";
const PURPLE_GLOW = "#A78BFA";
const SITE_URL = "https://recacor.fr";

const SAMPLE = {
  form_id: "devis-vl-form",
  service_type: "vl",
  nom: "Dupont",
  prenom: "Jean",
  entreprise: "",
  telephone: "06 12 34 56 78",
  email: TO,
  cp: "34000",
  message: "Bonjour,\nJ'aurais besoin de 4 pneus 205/55 R16 pour ma Peugeot 308.\nEst-ce que vous pouvez me faire un devis svp ?\nMerci !",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "vl_montpellier",
  page_source: "/montpellier",
  gclid: "abc123def456",
};

function escapeHtml(s) {
  if (!s) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function row(label, value, link) {
  if (!value) return "";
  const v = link
    ? `<a href="${escapeHtml(link)}" style="color:${PURPLE_BRIGHT};text-decoration:none;font-weight:600">${escapeHtml(value)}</a>`
    : escapeHtml(value);
  return `<tr><td style="padding:12px 0;border-bottom:1px solid #eef2f7"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin-bottom:4px">${escapeHtml(label)}</div><div style="font-size:15px;color:#0f172a;font-weight:600">${v}</div></td></tr>`;
}

function buildNotification(d, leadId) {
  const fullName = [d.prenom, d.nom].filter(Boolean).join(" ");
  const dateStr = new Date().toLocaleString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:'Helvetica Neue',Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:24px 0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(45,20,96,0.08)">

<tr><td style="background:linear-gradient(135deg,${PURPLE_DEEP} 0%,${PURPLE_MID} 50%,${PURPLE_BRIGHT} 100%);padding:32px 32px 28px;color:#fff">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td><div style="font-size:24px;font-weight:900;letter-spacing:-0.02em">RECA<span style="color:${PURPLE_GLOW}">COR</span></div></td>
<td align="right"><span style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px;letter-spacing:0.08em;text-transform:uppercase">Nouveau lead</span></td>
</tr></table>
<div style="margin-top:28px;font-size:13px;color:rgba(255,255,255,0.6);font-weight:600;text-transform:uppercase;letter-spacing:0.12em">🚗 Pneus voiture (VL) · #${leadId}</div>
<div style="margin-top:8px;font-size:28px;font-weight:900;line-height:1.2">${escapeHtml(fullName)}</div>
<div style="margin-top:6px;font-size:13px;color:rgba(255,255,255,0.5)">Reçu le ${dateStr}</div>
</td></tr>

<tr><td style="padding:20px 32px 4px;background:#fafafb">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td align="center" style="padding-right:6px"><a href="tel:${escapeHtml(d.telephone)}" style="display:block;background:${PURPLE_BRIGHT};color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 16px;border-radius:12px;text-align:center">📞 Appeler</a></td>
<td align="center" style="padding-left:6px"><a href="mailto:${escapeHtml(d.email)}" style="display:block;background:#fff;color:${PURPLE_BRIGHT};text-decoration:none;font-weight:700;font-size:14px;padding:13px 16px;border-radius:12px;border:1px solid #e5e7eb;text-align:center">✉ Répondre</a></td>
</tr></table></td></tr>

<tr><td style="padding:24px 32px 8px">
<div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">Coordonnées</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Téléphone", d.telephone, `tel:${d.telephone}`)}
${row("Email", d.email, `mailto:${d.email}`)}
${row("Code postal", d.cp)}
</table></td></tr>

<tr><td style="padding:16px 32px 0">
<div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Message</div>
<div style="background:#faf8ff;border-left:4px solid ${PURPLE_BRIGHT};padding:16px;border-radius:0 12px 12px 0;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap">${escapeHtml(d.message)}</div>
</td></tr>

<tr><td style="padding:24px 32px">
<div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">Provenance</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:4px 16px">
${row("Source", d.utm_source || "direct")}
${row("Medium", d.utm_medium)}
${row("Campagne", d.utm_campaign)}
${row("Page d'arrivée", d.page_source)}
${d.gclid ? row("Google Ads", "✓ tracé") : ""}
</table></td></tr>

<tr><td style="background:#0f172a;padding:24px 32px;text-align:center">
<a href="${SITE_URL}/admin/leads" style="display:inline-block;color:${PURPLE_GLOW};font-size:13px;font-weight:700;text-decoration:none;border:1px solid rgba(167,139,250,0.3);padding:10px 20px;border-radius:999px">Gérer le lead dans l'admin →</a>
<div style="margin-top:16px;font-size:11px;color:#64748b">Recacor · recacor.fr</div>
<div style="margin-top:6px;font-size:10px;color:#475569">Site web fait par <a href="https://webomax.fr" style="color:${PURPLE_GLOW};text-decoration:none;font-weight:600">Webomax</a></div>
</td></tr>

</table></td></tr></table></body></html>`;
}

function buildConfirmation(d) {
  const firstName = d.prenom || "";
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:'Helvetica Neue',Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:24px 0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(45,20,96,0.08)">

<tr><td style="background:linear-gradient(135deg,${PURPLE_DEEP} 0%,${PURPLE_MID} 50%,${PURPLE_BRIGHT} 100%);padding:48px 32px;text-align:center;color:#fff">
<div style="font-size:24px;font-weight:900;letter-spacing:-0.02em;margin-bottom:24px">RECA<span style="color:${PURPLE_GLOW}">COR</span></div>
<div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);line-height:64px;font-size:32px;margin-bottom:16px">✓</div>
<div style="font-size:28px;font-weight:900;line-height:1.2;margin-top:8px">Merci ${escapeHtml(firstName)} !</div>
<div style="margin-top:8px;font-size:14px;color:rgba(255,255,255,0.7);max-width:380px;margin-left:auto;margin-right:auto">Votre demande a bien été reçue. Notre équipe vous recontacte sous peu.</div>
</td></tr>

<tr><td style="padding:32px">
<div style="font-size:14px;line-height:1.7;color:#334155">
<p style="margin:0 0 16px 0">Nous avons bien reçu votre demande concernant <strong style="color:${PURPLE_BRIGHT}">Pneus voiture (VL)</strong>.</p>
<p style="margin:0 0 16px 0">Un de nos experts va prendre contact avec vous <strong>sous 24h en jours ouvrés</strong> pour répondre à vos besoins.</p>
<p style="margin:0">En attendant, vous pouvez nous appeler directement :</p>
</div>
<div style="margin-top:24px;text-align:center">
<a href="tel:+33607621043" style="display:inline-block;background:${PURPLE_BRIGHT};color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:16px 28px;border-radius:999px;box-shadow:0 8px 24px rgba(109,40,217,0.25)">📞 06 07 62 10 43</a>
<div style="margin-top:12px;font-size:12px;color:#64748b">Lun–Ven : 8h–17h · Sam : 8h–12h</div>
</div>
</td></tr>

<tr><td style="padding:0 32px 32px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8ff;border-radius:16px;padding:20px"><tr><td>
<div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">📍 Notre garage</div>
<div style="font-size:14px;color:#334155;line-height:1.6"><strong>Recacor — Le Crès</strong><br/>1240 Route de Nîmes, 34920 Le Crès<br/><a href="https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès" style="color:${PURPLE_BRIGHT};text-decoration:none;font-weight:600">Voir l'itinéraire →</a></div>
</td></tr></table></td></tr>

<tr><td style="background:#0f172a;padding:24px 32px;text-align:center">
<div style="font-size:11px;color:#64748b;line-height:1.7">Recacor — Spécialiste pneus VL et PL<br/>Montpellier — Le Crès (Hérault 34)</div>
<div style="margin-top:8px;font-size:10px;color:#475569">Site web fait par <a href="https://webomax.fr" style="color:${PURPLE_GLOW};text-decoration:none;font-weight:600">Webomax</a></div>
</td></tr>

</table></td></tr></table></body></html>`;
}

async function send(subject, html) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: TO }],
      subject,
      htmlContent: html,
    }),
  });
  const j = await res.json();
  if (res.ok) {
    console.log(`   ✅ ${subject}`);
    console.log(`      Message ID: ${j.messageId || "—"}`);
  } else {
    console.error(`   ❌ ${subject}`);
    console.error(`      Erreur:`, j);
  }
}

async function main() {
  console.log(`\n📧 Envoi des 2 visuels email vers ${TO}\n`);
  console.log(`📨 Expéditeur : ${SENDER_NAME} <${SENDER_EMAIL}>\n`);

  console.log(`1/2 — Notification admin (ce que tu reçois pour chaque lead)`);
  await send(
    "🔔 [APERÇU] Notification admin · Nouveau lead Recacor #42",
    buildNotification(SAMPLE, 42)
  );

  console.log(`\n2/2 — Confirmation client (ce que reçoit le client)`);
  await send(
    "[APERÇU] Votre demande Recacor a bien été reçue",
    buildConfirmation(SAMPLE)
  );

  console.log(`\n✨ Les 2 emails sont en route vers ${TO}\n`);
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
