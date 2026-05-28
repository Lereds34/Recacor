import type { Metadata } from "next";
import { getLegalPage } from "@/lib/legal";
import { LegalContent } from "@/components/legal-renderer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV Recacor.",
  alternates: { canonical: "/cgv" },
};

export default async function CgvPage() {
  const page = await getLegalPage("cgv");
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">{page.titre}</h1>
        <LegalContent markdown={page.content} />
      </div>
    </section>
  );
}
