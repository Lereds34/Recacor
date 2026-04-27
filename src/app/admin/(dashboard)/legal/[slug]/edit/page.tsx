import { getLegalPage } from "@/lib/legal";
import { LegalEditor } from "./editor";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function EditLegal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-1">{page.titre}</h1>
      <p className="text-muted-foreground mb-6">/{slug}</p>
      <LegalEditor slug={slug} initial={{ titre: page.titre, content: page.content }} />
    </div>
  );
}
