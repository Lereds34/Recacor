import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  const isVercel = !!process.env.VERCEL;
  return NextResponse.json({
    hasBlob,
    isVercel,
    canUpload: hasBlob || !isVercel,
  });
}
