import type { Metadata } from "next";
import { RecreusageClient } from "./client";

export const metadata: Metadata = {
  title: "Recreusage pneus poids lourd Hérault",
  description:
    "Recreusage haute qualité pour pneus PL. Prolongez la durée de vie de vos pneus de 25%. Solution économique et écologique en Hérault.",
  alternates: { canonical: "/services/recreusage" },
  openGraph: {
    title: "Recreusage pneus poids lourd Hérault",
    description:
      "Recreusage haute qualité pour pneus poids lourd dans l'Hérault. Solution économique et écologique pour prolonger leur durée de vie.",
    url: "https://www.recacor.fr/services/recreusage",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RecreusagePage() {
  return <RecreusageClient />;
}
