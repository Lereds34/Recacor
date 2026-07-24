import { NextResponse } from "next/server";
import {
  addUrlsToQueue,
  buildIndexationSummary,
  buildRecommendedLot,
  getIndexationQueue,
  inspectQueueUrls,
  markUrlsSubmitted,
  removeUrls,
  submitIndexNow,
} from "@/lib/indexation-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ActionBody = {
  action:
    | "add"
    | "inspect"
    | "indexnow"
    | "mark_submitted"
    | "remove";
  urls?: string[];
  source?: string;
  note?: string;
};

async function responseFromItems() {
  const items = await getIndexationQueue();
  return NextResponse.json({
    items,
    recommendedLot: buildRecommendedLot(items),
    summary: buildIndexationSummary(items),
  });
}

export async function GET() {
  try {
    return await responseFromItems();
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ActionBody;
    const urls = Array.isArray(body.urls) ? body.urls : [];

    switch (body.action) {
      case "add":
        await addUrlsToQueue(urls, { source: body.source, note: body.note });
        return await responseFromItems();
      case "inspect":
        await inspectQueueUrls(urls.length ? urls : undefined);
        return await responseFromItems();
      case "indexnow":
        await submitIndexNow(urls.length ? urls : undefined);
        return await responseFromItems();
      case "mark_submitted":
        await markUrlsSubmitted(urls);
        return await responseFromItems();
      case "remove":
        await removeUrls(urls);
        return await responseFromItems();
      default:
        return NextResponse.json({ error: "action inconnue" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
