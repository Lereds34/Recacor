import type { Metadata } from "next";
import { getLegalPage } from "@/lib/legal";
import { LegalContent } from "@/components/legal-renderer";

export const revalidate = 3600;
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Recacor.",
  alternates: { canonical: "/mentions-legales" },
};

export default async function MentionsLegalesPage() {
  const page = await getLegalPage("mentions-legales");
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-8">{page.titre}</h1>
        <LegalContent markdown={page.content} />
      </div>
    </section>
  );
}
