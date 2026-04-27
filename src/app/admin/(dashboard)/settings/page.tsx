import { getAllSettings } from "@/lib/db";
import { withDefaults, SETTINGS_GROUPS } from "@/lib/settings-schema";
import { SettingsForm } from "./form";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function SettingsPage() {
  let settings: Record<string, string> = {};
  try {
    settings = await getAllSettings();
  } catch {}
  const merged = withDefaults(settings);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Réglages du site</h1>
        <p className="text-muted-foreground mt-1">
          Modifiez la configuration globale. Les changements sont actifs en moins de 60 secondes.
        </p>
      </div>
      <SettingsForm initial={merged} groups={SETTINGS_GROUPS} />
    </div>
  );
}
