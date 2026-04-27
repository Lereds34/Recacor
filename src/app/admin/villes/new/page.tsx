import { VilleForm } from "../form";

export default function NewVille() {
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-1">Nouvelle ville</h1>
      <p className="text-muted-foreground mb-6">Créez une nouvelle page ville pour le SEO local.</p>
      <VilleForm />
    </div>
  );
}
