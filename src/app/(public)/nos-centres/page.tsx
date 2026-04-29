import type { Metadata } from "next";
import { NosCentresClient } from "./client";
import { getSetting } from "@/lib/db";

export const metadata: Metadata = {
  title: "Notre Garage Recacor — Le Crès, Hérault",
  description:
    "Garage Recacor au Crès (34) : pneus VL, PL, agricoles et industriels. Sans rendez-vous, expertise depuis 1950.",
  alternates: { canonical: "/nos-centres" },
};

export default async function NosCentresPage() {
  const heroImage = await getSetting("hero_image_nos_centres");
  return <NosCentresClient heroImage={heroImage} />;
}
