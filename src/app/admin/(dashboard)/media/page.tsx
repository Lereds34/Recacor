import { listMedia } from "@/lib/media";
import { MediaGallery } from "./gallery";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function MediaPage() {
  let items: Awaited<ReturnType<typeof listMedia>> = [];
  try {
    items = await listMedia();
  } catch {}

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Médiathèque</h1>
        <p className="text-muted-foreground mt-1">
          Toutes les images du site. Conversion WebP automatique, redimensionnement à 1920px max,
          stockage Vercel Blob.
        </p>
      </div>
      <MediaGallery initial={items} />
    </div>
  );
}
