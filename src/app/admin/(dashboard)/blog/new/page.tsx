import { ArticleEditor } from "@/components/admin/article-editor";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-1">Nouvel article</h1>
      <p className="text-muted-foreground mb-6">Créez un nouvel article en collant votre markdown.</p>
      <ArticleEditor />
    </div>
  );
}
