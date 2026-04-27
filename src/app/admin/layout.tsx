import Link from "next/link";
import { FileText, Plus, Globe } from "lucide-react";

export const metadata = {
  title: "Admin Recacor",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-purple-deep border-b border-purple-mid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-recacor.webp" alt="Recacor" className="h-7 w-auto brightness-0 invert" />
            <span className="text-white/40 text-sm">Admin</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/admin/blog" className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> Articles
            </Link>
            <Link href="/admin/blog/new" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-bright text-white text-sm font-semibold hover:bg-purple-mid transition-colors">
              <Plus className="h-4 w-4" /> Nouveau
            </Link>
            <Link href="/" className="text-white/40 hover:text-white text-xs flex items-center gap-1.5" target="_blank">
              <Globe className="h-3.5 w-3.5" /> Voir le site
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
