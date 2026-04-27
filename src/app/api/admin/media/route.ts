import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { listMedia, insertMedia, slugifyFilename } from "@/lib/media";

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag") || undefined;
  const items = await listMedia(tag);
  return NextResponse.json({ media: items });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const alt = (form.get("alt") as string) || "";
    const tag = (form.get("tag") as string) || null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop lourd (10 Mo max)" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Seules les images sont acceptées" }, { status: 400 });
    }

    // Slug + nom unique
    const altSlug = alt ? slugifyFilename(alt) : slugifyFilename(file.name.replace(/\.[^.]+$/, ""));
    const filename = `${altSlug || "image"}-${Date.now()}.webp`;

    // Conversion forcée en WebP + resize si > MAX_WIDTH
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    let pipeline = sharp(inputBuffer);
    const meta = await pipeline.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }
    const webpBuffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    const finalMeta = await sharp(webpBuffer).metadata();

    let url: string;
    let pathname: string;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Vercel Blob (prod)
      const blob = await put(`recacor/${filename}`, webpBuffer, {
        access: "public",
        addRandomSuffix: false,
        contentType: "image/webp",
      });
      url = blob.url;
      pathname = blob.pathname;
    } else {
      // Fallback local (dev sans Blob configuré)
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const localPath = path.join(uploadsDir, filename);
      await writeFile(localPath, webpBuffer);
      url = `/uploads/${filename}`;
      pathname = `uploads/${filename}`;
    }

    const inserted = await insertMedia({
      url,
      pathname,
      filename,
      alt: alt || filename,
      mime: "image/webp",
      size_bytes: webpBuffer.length,
      width: finalMeta.width || null,
      height: finalMeta.height || null,
      tag,
    });

    return NextResponse.json({ media: inserted });
  } catch (e) {
    console.error("[media upload]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
