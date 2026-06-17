import { NextResponse } from "next/server";
import { getAssetBinary } from "@/lib/site-assets";

export const runtime = "nodejs";
export const revalidate = 86400;

type Params = { params: Promise<{ key: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { key } = await params;
  const blob = await getAssetBinary(key);
  if (!blob) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(blob.data as unknown as BodyInit, {
    headers: {
      "Content-Type": blob.mime,
      "Content-Length": String(blob.data.length),
      "Content-Disposition": `inline; filename="${blob.filename}"`,
      // Cache long, busted via le timestamp ?v= dans l'URL
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
