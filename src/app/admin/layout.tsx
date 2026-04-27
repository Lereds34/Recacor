import Link from "next/link";
import { FileText, Inbox, Settings, MapPin, Scale, Globe } from "lucide-react";

export const metadata = {
  title: "Admin Recacor",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: Settings },
  { href: "/admin/leads", label: "Leads", Icon: Inbox },
  { href: "/admin/blog", label: "Blog", Icon: FileText },
  { href: "/admin/villes", label: "Villes", Icon: MapPin },
  { href: "/admin/legal", label: "Légal", Icon: Scale },
  { href: "/admin/settings", label: "Réglages", Icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-purple-deep border-b border-purple-mid sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <Link href="/admin" className="flex items-center gap-3 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-recacor.webp" alt="Recacor" className="h-7 w-auto brightness-0 invert" />
            <span className="text-white/40 text-sm hidden sm:inline">Admin</span>
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium whitespace-nowrap transition-colors"
              >
                <n.Icon className="h-4 w-4" />
                <span className="hidden md:inline">{n.label}</span>
              </Link>
            ))}
          </nav>
          <Link
            href="/"
            target="_blank"
            className="text-white/40 hover:text-white text-xs flex items-center gap-1.5 shrink-0"
          >
            <Globe className="h-3.5 w-3.5" /> <span className="hidden lg:inline">Voir le site</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
    </div>
  );
}
