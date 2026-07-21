import type { Metadata } from "next";
import { NosCentresClient } from "./client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Notre Garage Recacor — Le Crès, Hérault",
  description:
    "Garage Recacor au Crès (34) : pneus VL, PL, agricoles et industriels. Sans rendez-vous, expertise depuis 1950.",
  alternates: { canonical: "/nos-centres" },
};

export default async function NosCentresPage() {
  // Même souci que /contact : l'asset CMS pointe vers le logo, pas une photo.
  // Fond uni en attendant une vraie photo.
  return <NosCentresClient />;
}
