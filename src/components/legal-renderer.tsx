import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function LegalContent({ markdown }: { markdown: string }) {
  const html = (
    await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown)
  ).toString();

  return (
    <div
      className="prose prose-sm max-w-none
        prose-headings:font-[family-name:var(--font-heading)] prose-headings:font-black
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-purple-bright
        prose-strong:text-foreground prose-strong:font-bold"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
