import { buildIndexationSummary, buildRecommendedLot, getIndexationQueue } from "@/lib/indexation-admin";
import { IndexationAdminClient } from "./client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Indexation SEO — Recacor Admin",
  robots: { index: false, follow: false },
};

export default async function IndexationPage() {
  const items = await getIndexationQueue();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Indexation SEO</h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          Vérifier les URLs via l&apos;API Search Console, préparer les lots manuels GSC et
          tracer les recontrôles à J+5. L&apos;inspection est automatisée ici. La demande
          d&apos;indexation Google pour des pages web classiques reste manuelle dans Search Console.
        </p>
      </div>

      <IndexationAdminClient
        initialItems={items}
        initialSummary={buildIndexationSummary(items)}
        initialRecommendedLot={buildRecommendedLot(items)}
      />
    </div>
  );
}
