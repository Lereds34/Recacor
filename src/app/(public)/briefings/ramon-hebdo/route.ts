import { getRamonWeeklyReport, renderRamonWeeklyReportHtml } from "@/lib/reports/ramon-weekly";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const start = url.searchParams.get("start") || undefined;
  const end = url.searchParams.get("end") || undefined;
  const origin = `${url.protocol}//${url.host}`;

  const report = await getRamonWeeklyReport({ start, end, origin });
  const html = renderRamonWeeklyReportHtml(report);

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
    },
  });
}
