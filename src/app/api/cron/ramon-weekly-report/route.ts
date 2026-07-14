import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import {
  buildRamonWeeklyEmailHtml,
  buildRamonWeeklyEmailText,
  computePreviousFullWeekRange,
  getRamonWeeklyReport,
} from "@/lib/reports/ramon-weekly";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret") || "";
  const expected = process.env.CRON_SECRET || "";

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET manquant" },
      { status: 500 }
    );
  }

  const tokenOk =
    auth === `Bearer ${expected}` ||
    querySecret === expected;

  if (!tokenOk) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const start = url.searchParams.get("start") || computePreviousFullWeekRange(new Date()).start;
  const end = url.searchParams.get("end") || computePreviousFullWeekRange(new Date()).end;
  const origin = process.env.RAMON_REPORT_ORIGIN || "https://www.recacor.fr";
  const recipients = parseList(process.env.RAMON_REPORT_TO || "");
  const ccRecipients = parseList(process.env.RAMON_REPORT_CC || "");

  if (!recipients.length) {
    return NextResponse.json(
      { ok: false, error: "RAMON_REPORT_TO manquant" },
      { status: 500 }
    );
  }

  const report = await getRamonWeeklyReport({ start, end, origin });
  const subject = `[Recacor] Rapport hebdo Ramon - ${report.period.label}`;
  const html = buildRamonWeeklyEmailHtml(report);
  const text = buildRamonWeeklyEmailText(report);
  const deliveryResults = [];

  for (const email of [...recipients, ...ccRecipients]) {
    const result = await sendEmail({
      to: email,
      subject,
      html,
      text,
      replyTo: process.env.RAMON_REPORT_REPLY_TO || "marketing@recacor.fr",
    });
    deliveryResults.push({ email, ...result });
  }

  const failed = deliveryResults.filter((item) => !item.ok);

  return NextResponse.json({
    ok: failed.length === 0,
    sent: deliveryResults.length - failed.length,
    failed: failed.length,
    reportUrl: report.reportUrl,
    period: report.period,
    deliveries: deliveryResults,
  });
}
