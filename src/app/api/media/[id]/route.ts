import { NextResponse } from "next/server";
import { getMediaBinary } from "@/lib/media";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const blob = await getMediaBinary(Number(id));
  if (!blob) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(blob.data as unknown as BodyInit, {
    headers: {
      "Content-Type": blob.mime,
      "Content-Length": String(blob.data.length),
      "Content-Disposition": `inline; filename="${blob.filename}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
