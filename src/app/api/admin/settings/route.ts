import { NextResponse } from "next/server";
import { getAllSettings, setSettings } from "@/lib/db";
import { invalidateConfigCache } from "@/lib/site-config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const settings = await getAllSettings();
    return NextResponse.json({ settings });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { settings } = (await req.json()) as { settings: Record<string, string> };
    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ error: "settings requis" }, { status: 400 });
    }
    await setSettings(settings);
    invalidateConfigCache();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
