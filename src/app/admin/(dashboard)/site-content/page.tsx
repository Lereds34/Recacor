import { SITE_ASSETS, getAllAssets } from "@/lib/site-assets";
import { SiteContentClient } from "./client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function SiteContentPage() {
  const stored = await getAllAssets();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Photos &amp; vidéos du site</h1>
        <p className="text-muted-foreground mt-1">
          Remplacez les images et vidéos affichées sur le site public, page par page.
          Les changements sont actifs en moins de 60 secondes.
        </p>
      </div>
      <SiteContentClient pages={SITE_ASSETS} stored={stored} />
    </div>
  );
}
