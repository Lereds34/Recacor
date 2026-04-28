import { NextResponse } from "next/server";
import { leadNotificationEmail, leadConfirmationEmail } from "@/lib/email-templates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SAMPLE_LEAD = {
  form_id: "devis-vl-form",
  service_type: "vl",
  nom: "Dupont",
  prenom: "Jean",
  entreprise: "",
  telephone: "06 12 34 56 78",
  email: "jean.dupont@example.fr",
  cp: "34000",
  message: "Bonjour,\nJ'aurais besoin de 4 pneus 205/55 R16 pour ma Peugeot 308.\nMerci !",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "vl_montpellier",
  page_source: "/montpellier",
  gclid: "abc123",
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "notification";

  if (type === "confirmation") {
    const { html } = leadConfirmationEmail(SAMPLE_LEAD);
    return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  const { html } = leadNotificationEmail(SAMPLE_LEAD, 42);
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
