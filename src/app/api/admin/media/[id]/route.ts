import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { unlink } from "fs/promises";
import path from "path";
import { deleteMediaRecord, updateMediaAlt } from "@/lib/media";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { alt } = (await req.json()) as { alt: string };
    await updateMediaAlt(Number(id), alt || "");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const removed = await deleteMediaRecord(Number(id));
    if (removed) {
      try {
        if (removed.url.startsWith("/uploads/")) {
          await unlink(path.join(process.cwd(), "public", removed.pathname));
        } else if (process.env.BLOB_READ_WRITE_TOKEN) {
          await del(removed.url);
        }
      } catch (err) {
        console.warn("[media file delete]", err);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
