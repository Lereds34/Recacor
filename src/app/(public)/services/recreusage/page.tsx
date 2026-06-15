import type { Metadata } from "next";
import { RecreusageClient } from "./client";

export const metadata: Metadata = {
  title: "Recreusage pneus poids lourd Hérault",
  description:
    "Recreusage haute qualité pour pneus PL. Prolongez la durée de vie de vos pneus de 25%. Solution économique et écologique en Hérault.",
  alternates: { canonical: "/services/recreusage" },
};

export default function RecreusagePage() {
  return <RecreusageClient />;
}
