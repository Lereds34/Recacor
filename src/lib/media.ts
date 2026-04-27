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
