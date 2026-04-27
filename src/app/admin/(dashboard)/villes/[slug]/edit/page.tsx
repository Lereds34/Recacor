import { notFound } from "next/navigation";
import { findVille } from "@/lib/villes";
import { VilleForm } from "../../form";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function EditVille({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = await findVille(slug);
  if (!v) notFound();
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-1">Modifier {v.nom}</h1>
      <p className="text-muted-foreground mb-6">/{slug}</p>
      <VilleForm initial={v} isEdit />
    </div>
  );
}
