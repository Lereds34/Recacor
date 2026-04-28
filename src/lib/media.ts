import { sql, ensureSchema } from "./db";

export interface MediaItem {
  id: number;
  url: string;
  pathname: string;
  filename: string;
  alt: string;
  mime: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  tag: string | null;
  uploaded_at: string;
}

export async function listMedia(tag?: string): Promise<MediaItem[]> {
  try {
    await ensureSchema();
    if (tag) {
      return (await sql`SELECT * FROM media WHERE tag = ${tag} ORDER BY uploaded_at DESC LIMIT 200`) as MediaItem[];
    }
    return (await sql`SELECT * FROM media ORDER BY uploaded_at DESC LIMIT 500`) as MediaItem[];
  } catch {
    return [];
  }
}

export async function insertMedia(m: Omit<MediaItem, "id" | "uploaded_at">): Promise<MediaItem> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO media (url, pathname, filename, alt, mime, size_bytes, width, height, tag)
    VALUES (${m.url}, ${m.pathname}, ${m.filename}, ${m.alt}, ${m.mime}, ${m.size_bytes}, ${m.width || null}, ${m.height || null}, ${m.tag || null})
    RETURNING *;
  `) as MediaItem[];
  return rows[0];
}

/** Variante avec data binaire stockée dans Neon */
export async function insertMediaWithData(
  m: Omit<MediaItem, "id" | "uploaded_at" | "url" | "pathname">,
  buffer: Buffer
): Promise<MediaItem> {
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO media (url, pathname, filename, alt, mime, size_bytes, width, height, tag, data)
    VALUES ('', '', ${m.filename}, ${m.alt}, ${m.mime}, ${m.size_bytes}, ${m.width || null}, ${m.height || null}, ${m.tag || null}, ${buffer})
    RETURNING *;
  `) as MediaItem[];
  const inserted = rows[0];
  // L'URL pointe vers /api/media/[id]
  const url = `/api/media/${inserted.id}`;
  await sql`UPDATE media SET url = ${url}, pathname = ${`media/${inserted.id}`} WHERE id = ${inserted.id}`;
  inserted.url = url;
  inserted.pathname = `media/${inserted.id}`;
  return inserted;
}

export async function getMediaBinary(id: number): Promise<{ data: Buffer; mime: string; filename: string } | null> {
  try {
    await ensureSchema();
    const rows = (await sql`SELECT data, mime, filename FROM media WHERE id = ${id} LIMIT 1`) as { data: Buffer | null; mime: string; filename: string }[];
    if (rows.length === 0 || !rows[0].data) return null;
    return {
      data: Buffer.isBuffer(rows[0].data) ? rows[0].data : Buffer.from(rows[0].data),
      mime: rows[0].mime || "application/octet-stream",
      filename: rows[0].filename,
    };
  } catch {
    return null;
  }
}

export async function updateMediaAlt(id: number, alt: string): Promise<void> {
  await ensureSchema();
  await sql`UPDATE media SET alt = ${alt} WHERE id = ${id}`;
}

export async function deleteMediaRecord(id: number): Promise<MediaItem | null> {
  await ensureSchema();
  const rows = (await sql`DELETE FROM media WHERE id = ${id} RETURNING *`) as MediaItem[];
  return rows[0] || null;
}

export function slugifyFilename(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
