import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { getAllAssets, setAsset, resetAsset } from "@/lib/site-assets";
import { slugifyFilename } from "@/lib/media";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 Mo

export async function GET() {
  const assets = await getAllAssets();
  return NextResponse.json({ assets });
}

export async function PUT(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";

    if (ct.includes("application/json")) {
      // Update direct par URL (réutilisation média existant)
      const { key, url, type, alt } = (await req.json()) as {
        key: string;
        url: string;
        type: "image" | "video";
        alt?: string;
      };
      if (!key || !url) return NextResponse.json({ error: "key et url requis" }, { status: 400 });
      await setAsset(key, url, type, alt || "");
      return NextResponse.json({ ok: true, url });
    }

    // Upload de fichier (multipart/form-data)
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const key = form.get("key") as string | null;
    const type = (form.get("type") as "image" | "video" | null) || "image";
    const alt = (form.get("alt") as string) || "";

    if (!file || !key) {
      return NextResponse.json({ error: "file et key requis" }, { status: 400 });
    }

    let url: string;
    let buffer: Buffer;
    let filename: string;
    let contentType: string;

    if (type === "video") {
      if (file.size > MAX_VIDEO_BYTES) {
        return NextResponse.json({ error: "Vidéo trop lourde (50 Mo max)" }, { status: 400 });
      }
      const ext = (file.name.split(".").pop() || "mp4").toLowerCase();
      filename = `site/${key}-${Date.now()}.${ext}`;
      buffer = Buffer.from(await file.arrayBuffer());
      contentType = file.type || "video/mp4";
    } else {
      // Image : conversion WebP forcée
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Image trop lourde (10 Mo max)" }, { status: 400 });
      }
      const inputBuffer = Buffer.from(await file.arrayBuffer());
      let pipeline = sharp(inputBuffer);
      const meta = await pipeline.metadata();
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }
      buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
      filename = `site/${key}-${Date.now()}.webp`;
      contentType = "image/webp";
    }

    // Sécurité du nom
    filename = filename.replace(/[^a-zA-Z0-9./_-]+/g, "-");

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`recacor/${filename}`, buffer, {
        access: "public",
        addRandomSuffix: false,
        contentType,
      });
      url = blob.url;
    } else {
      const safeName = slugifyFilename(filename.replace(/^site\//, ""));
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "site");
      await mkdir(uploadsDir, { recursive: true });
      await writeFile(path.join(uploadsDir, safeName), buffer);
      url = `/uploads/site/${safeName}`;
    }

    await setAsset(key, url, type, alt);
    return NextResponse.json({ ok: true, url });
  } catch (e) {
    console.error("[site-asset upload]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key");
    if (!key) return NextResponse.json({ error: "key requis" }, { status: 400 });
    await resetAsset(key);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
