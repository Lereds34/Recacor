import type { Metadata } from "next";
import { getLegalPage } from "@/lib/legal";
import { LegalContent } from "@/components/legal-renderer";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité Recacor, conforme RGPD. Données collectées via formulaires web et Meta Lead Ads.",
  alternates: { canonical: "/confidentialite" },
  openGraph: {
    title: "Politique de confidentialité — Recacor",
    description: "Politique de confidentialité Recacor, conforme RGPD.",
    url: "/confidentialite",
  },
};

export default async function ConfidentialitePage() {
  const page = await getLegalPage("confidentialite");
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">{page.titre}</h1>
        <LegalContent markdown={page.content} />
      </div>
    </section>
  );
}
