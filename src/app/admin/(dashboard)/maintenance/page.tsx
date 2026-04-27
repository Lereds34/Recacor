import { MaintenanceForm } from "./form";

export const metadata = {
  title: "Maintenance — Recacor Admin",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight">Demande de maintenance</h1>
        <p className="text-muted-foreground mt-1">
          Un bug, une amélioration, une nouvelle fonctionnalité ? Contactez Webomax.
        </p>
      </div>
      <MaintenanceForm />
    </div>
  );
}
