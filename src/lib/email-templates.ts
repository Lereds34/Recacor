/* ─────── Templates email avec DA Recacor (violet) ───────
 * Table-based + inline styles → compat Gmail / Outlook / Apple Mail
 */

interface LeadEmailData {
  form_id?: string;
  service_type?: string;
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
  gclid?: string;
  fbclid?: string;
  page_source?: string;
  referrer?: string;
  // Détails pneus / véhicule / mécanique
  largeur?: string;
  hauteur?: string;
  diametre?: string;
  type?: string;
  quantite?: string;
  marque_souhaitee?: string;
  modele?: string;
  plaque?: string;
  prestation_complementaire?: string;
  service?: string;
}

const WHATSAPP_NUMBER_NON_PL = "33687601575";
const WHATSAPP_NUMBER_PL = "33607621043";

const SITE_URL = "https://recacor.fr";
const PURPLE_DEEP = "#2D1460";
const PURPLE_MID = "#4A1D96";
const PURPLE_BRIGHT = "#6D28D9";
const PURPLE_GLOW = "#A78BFA";

const SERVICE_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  vl: { label: "Pneus voiture (VL)", emoji: "🚗", color: PURPLE_BRIGHT },
  pl: { label: "Professionnel (PL/Agri/Indus)", emoji: "🚚", color: PURPLE_DEEP },
  mecanique: { label: "Mécanique légère", emoji: "🔧", color: PURPLE_MID },
  contact: { label: "Contact général", emoji: "💬", color: PURPLE_GLOW },
};

function escapeHtml(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined | null, link?: string): string {
  if (!value) return "";
  const v = link
    ? `<a href="${escapeHtml(link)}" style="color:${PURPLE_BRIGHT};text-decoration:none;font-weight:600">${escapeHtml(value)}</a>`
    : escapeHtml(value);
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eef2f7;font-family:'Helvetica Neue',Arial,sans-serif">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin-bottom:4px">${escapeHtml(label)}</div>
        <div style="font-size:15px;color:#0f172a;font-weight:600">${v}</div>
      </td>
    </tr>`;
}

function buildDimension(d: LeadEmailData): string | undefined {
  if (!d.largeur && !d.hauteur && !d.diametre) return undefined;
  const lh = [d.largeur, d.hauteur].filter(Boolean).join("/");
  const r = d.diametre ? `R${d.diametre}` : "";
  return [lh, r].filter(Boolean).join(" ").trim() || undefined;
}

function detailsSection(d: LeadEmailData): string {
  const dimension = buildDimension(d);
  const rows = [
    row("Service", d.service),
    row("Dimension", dimension),
    row("Type", d.type),
    row("Quantité", d.quantite),
    row("Marque souhaitée", d.marque_souhaitee),
    row("Véhicule", d.modele),
    row("Plaque", d.plaque),
    row("Prestation complémentaire", d.prestation_complementaire),
  ].join("");
  if (!rows.trim()) return "";
  return `
          <tr>
            <td style="padding:8px 32px 0 32px">
              <div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px;margin-top:16px">
                Détails de la demande
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rows}
              </table>
            </td>
          </tr>`;
}

function getWhatsAppNumber(d: LeadEmailData): string {
  return d.service_type === "pl" ? WHATSAPP_NUMBER_PL : WHATSAPP_NUMBER_NON_PL;
}

/** Email envoyé à l'admin pour chaque nouveau lead */
export function leadNotificationEmail(data: LeadEmailData, leadId: number): { subject: string; html: string; text: string } {
  const svc = SERVICE_LABELS[data.service_type || ""] || { label: data.service_type || "Lead", emoji: "📩", color: PURPLE_BRIGHT };
  const fullName = [data.prenom, data.nom].filter(Boolean).join(" ") || "—";
  const subject = `🔔 Nouveau lead Recacor #${leadId} · ${svc.label}`;
  const whatsappNumber = getWhatsAppNumber(data);

  const dateStr = new Date().toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:'Helvetica Neue',Arial,sans-serif;color:#0f172a">
  <!-- Preheader (caché) -->
  <div style="display:none;max-height:0;overflow:hidden;color:transparent">
    Nouveau lead #${leadId} · ${escapeHtml(fullName)} · ${escapeHtml(data.telephone || "")}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:24px 0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(45,20,96,0.08)">

          <!-- HERO gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,${PURPLE_DEEP} 0%,${PURPLE_MID} 50%,${PURPLE_BRIGHT} 100%);padding:32px 32px 28px 32px;color:#fff">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px;font-weight:900;letter-spacing:-0.02em;color:#ffffff">
                      RECA<span style="color:${PURPLE_GLOW}">COR</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px;letter-spacing:0.08em;text-transform:uppercase">
                      Nouveau lead
                    </span>
                  </td>
                </tr>
              </table>

              <div style="margin-top:28px;font-size:13px;color:rgba(255,255,255,0.6);font-weight:600;text-transform:uppercase;letter-spacing:0.12em">
                ${svc.emoji} ${escapeHtml(svc.label)} · #${leadId}
              </div>
              <div style="margin-top:8px;font-size:28px;font-weight:900;line-height:1.2;color:#ffffff">
                ${escapeHtml(fullName)}
              </div>
              <div style="margin-top:6px;font-size:13px;color:rgba(255,255,255,0.5)">
                Reçu le ${dateStr}
              </div>
            </td>
          </tr>

          <!-- CTA buttons -->
          ${
            data.telephone || data.email
              ? `
          <tr>
            <td style="padding:20px 32px 4px 32px;background:#fafafb">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${
                    data.telephone
                      ? `
                  <td align="center" width="33%" style="padding-right:4px">
                    <a href="tel:${escapeHtml(data.telephone)}" style="display:block;background:${PURPLE_BRIGHT};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 8px;border-radius:12px;text-align:center">
                      📞 Appeler
                    </a>
                  </td>`
                      : ""
                  }
                  ${
                    data.email
                      ? `
                  <td align="center" width="33%" style="padding-left:4px;padding-right:4px">
                    <a href="mailto:${escapeHtml(data.email)}" style="display:block;background:#ffffff;color:${PURPLE_BRIGHT};text-decoration:none;font-weight:700;font-size:14px;padding:13px 8px;border-radius:12px;border:1px solid #e5e7eb;text-align:center">
                      ✉ Répondre
                    </a>
                  </td>`
                      : ""
                  }
                  <td align="center" width="33%" style="padding-left:4px">
                    <a href="https://wa.me/${whatsappNumber}" style="display:block;background:#25D366;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 8px;border-radius:12px;text-align:center">
                      💬 WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- Coordonnées -->
          <tr>
            <td style="padding:24px 32px 8px 32px">
              <div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">
                Coordonnées
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Téléphone", data.telephone, data.telephone ? `tel:${data.telephone}` : undefined)}
                ${row("Email", data.email, data.email ? `mailto:${data.email}` : undefined)}
                ${row("Entreprise", data.entreprise)}
                ${row("Code postal", data.cp)}
              </table>
            </td>
          </tr>

          <!-- Détails de la demande (pneus / véhicule / mécanique) -->
          ${detailsSection(data)}

          <!-- Message -->
          ${
            data.message
              ? `
          <tr>
            <td style="padding:16px 32px 0 32px">
              <div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">
                Message
              </div>
              <div style="background:#faf8ff;border-left:4px solid ${PURPLE_BRIGHT};padding:16px;border-radius:0 12px 12px 0;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap">
                ${escapeHtml(data.message)}
              </div>
            </td>
          </tr>`
              : ""
          }

          <!-- Tracking source -->
          <tr>
            <td style="padding:24px 32px">
              <div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:12px">
                Provenance
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:4px 16px">
                ${row("Source", data.utm_source || "direct")}
                ${row("Medium", data.utm_medium)}
                ${row("Campagne", data.utm_campaign)}
                ${row("Page d'arrivée", data.page_source)}
                ${data.gclid ? row("Google Ads (gclid)", "✓ tracé") : ""}
                ${data.fbclid ? row("Meta (fbclid)", "✓ tracé") : ""}
              </table>
            </td>
          </tr>

          <!-- Footer CTA admin -->
          <tr>
            <td style="background:#0f172a;padding:24px 32px;text-align:center">
              <a href="${SITE_URL}/admin/leads" style="display:inline-block;color:${PURPLE_GLOW};font-size:13px;font-weight:700;text-decoration:none;border:1px solid rgba(167,139,250,0.3);padding:10px 20px;border-radius:999px">
                Gérer le lead dans l'admin →
              </a>
              <div style="margin-top:16px;font-size:11px;color:#64748b">
                Recacor · ${SITE_URL.replace(/^https?:\/\//, "")}
              </div>
              <div style="margin-top:6px;font-size:10px;color:#475569">
                Site web fait par <a href="https://webomax.fr" style="color:${PURPLE_GLOW};text-decoration:none;font-weight:600">Webomax</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const dimension = buildDimension(data);
  const text = [
    `Nouveau lead Recacor #${leadId}`,
    ``,
    `Type : ${svc.label}`,
    `Nom : ${fullName}`,
    `Téléphone : ${data.telephone || "—"}`,
    `Email : ${data.email || "—"}`,
    data.entreprise ? `Entreprise : ${data.entreprise}` : "",
    data.cp ? `CP : ${data.cp}` : "",
    data.service ? `Service : ${data.service}` : "",
    dimension ? `Dimension : ${dimension}` : "",
    data.type ? `Type pneu : ${data.type}` : "",
    data.quantite ? `Quantité : ${data.quantite}` : "",
    data.marque_souhaitee ? `Marque souhaitée : ${data.marque_souhaitee}` : "",
    data.modele ? `Véhicule : ${data.modele}` : "",
    data.plaque ? `Plaque : ${data.plaque}` : "",
    data.prestation_complementaire ? `Prestation : ${data.prestation_complementaire}` : "",
    data.message ? `\nMessage :\n${data.message}` : "",
    ``,
    `WhatsApp : https://wa.me/${whatsappNumber}`,
    `Source : ${data.utm_source || "direct"}${data.utm_campaign ? ` · ${data.utm_campaign}` : ""}`,
    `Page : ${data.page_source || "/"}`,
    ``,
    `Gérer dans l'admin : ${SITE_URL}/admin/leads`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

/** Email de confirmation envoyé au client après soumission du formulaire */
export function leadConfirmationEmail(data: LeadEmailData): { subject: string; html: string; text: string } {
  const svc = SERVICE_LABELS[data.service_type || ""] || { label: "votre demande", emoji: "📩", color: PURPLE_BRIGHT };
  const firstName = data.prenom || "";
  const subject = `Votre demande Recacor a bien été reçue`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:'Helvetica Neue',Arial,sans-serif;color:#0f172a">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:24px 0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(45,20,96,0.08)">

          <tr>
            <td style="background:linear-gradient(135deg,${PURPLE_DEEP} 0%,${PURPLE_MID} 50%,${PURPLE_BRIGHT} 100%);padding:48px 32px;text-align:center;color:#fff">
              <div style="font-size:24px;font-weight:900;letter-spacing:-0.02em;margin-bottom:24px">
                RECA<span style="color:${PURPLE_GLOW}">COR</span>
              </div>
              <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);line-height:64px;font-size:32px;margin-bottom:16px">
                ✓
              </div>
              <div style="font-size:28px;font-weight:900;line-height:1.2;margin-top:8px">
                Merci ${escapeHtml(firstName)} !
              </div>
              <div style="margin-top:8px;font-size:14px;color:rgba(255,255,255,0.7);max-width:380px;margin-left:auto;margin-right:auto">
                Votre demande a bien été reçue. Notre équipe vous recontacte sous peu.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px">
              <div style="font-size:14px;line-height:1.7;color:#334155">
                <p style="margin:0 0 16px 0">
                  Nous avons bien reçu votre demande concernant <strong style="color:${PURPLE_BRIGHT}">${escapeHtml(svc.label)}</strong>.
                </p>
                <p style="margin:0 0 16px 0">
                  Un de nos experts va prendre contact avec vous <strong>sous 24h en jours ouvrés</strong> pour répondre à vos besoins.
                </p>
                <p style="margin:0">
                  En attendant, vous pouvez nous appeler directement :
                </p>
              </div>

              <div style="margin-top:24px;text-align:center">
                <a href="tel:+33499533390" style="display:inline-block;background:${PURPLE_BRIGHT};color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:16px 28px;border-radius:999px;box-shadow:0 8px 24px rgba(109,40,217,0.25)">
                  📞 04 99 53 33 90
                </a>
                <div style="margin-top:12px;font-size:12px;color:#64748b">
                  Lun–Ven : 8h–17h · Sam : 8h–12h
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8ff;border-radius:16px;padding:20px">
                <tr>
                  <td>
                    <div style="font-size:11px;font-weight:800;color:${PURPLE_BRIGHT};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">
                      📍 Notre garage
                    </div>
                    <div style="font-size:14px;color:#334155;line-height:1.6">
                      <strong>Recacor — Le Crès</strong><br/>
                      1240 Route de Nîmes, 34920 Le Crès<br/>
                      <a href="https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès" style="color:${PURPLE_BRIGHT};text-decoration:none;font-weight:600">Voir l'itinéraire →</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#0f172a;padding:24px 32px;text-align:center">
              <div style="font-size:11px;color:#64748b;line-height:1.7">
                Recacor — Spécialiste pneus VL et PL<br/>
                Montpellier — Le Crès (Hérault 34)
              </div>
              <div style="margin-top:8px;font-size:10px;color:#475569">
                Site web fait par <a href="https://webomax.fr" style="color:${PURPLE_GLOW};text-decoration:none;font-weight:600">Webomax</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Merci ${firstName} !`,
    ``,
    `Votre demande Recacor a bien été reçue.`,
    `Notre équipe vous recontacte sous 24h en jours ouvrés.`,
    ``,
    `Pour nous appeler directement : 04 99 53 33 90`,
    `Lun-Ven : 8h-17h · Sam : 8h-12h`,
    ``,
    `Recacor — 1240 Route de Nîmes, 34920 Le Crès`,
  ].join("\n");

  return { subject, html, text };
}
