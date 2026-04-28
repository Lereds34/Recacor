import Link from "next/link";
import { FileText, Inbox, Settings, MapPin, Scale, Globe, ImageIcon, LifeBuoy, Home, Layers, Mail } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata = {
  title: "Admin Recacor",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: Home },
  { href: "/admin/leads", label: "Leads", Icon: Inbox },
  { href: "/admin/blog", label: "Blog", Icon: FileText },
  { href: "/admin/site-content", label: "Photos site", Icon: Layers },
  { href: "/admin/media", label: "Bibliothèque", Icon: ImageIcon },
  { href: "/admin/villes", label: "Villes", Icon: MapPin },
  { href: "/admin/legal", label: "Légal", Icon: Scale },
  { href: "/admin/emails", label: "Emails", Icon: Mail },
  { href: "/admin/settings", label: "Réglages", Icon: Settings },
  { href: "/admin/maintenance", label: "Maintenance", Icon: LifeBuoy },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
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
                <span className="hidden xl:inline">{n.label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="text-white/40 hover:text-white text-xs flex items-center gap-1.5"
            >
              <Globe className="h-3.5 w-3.5" /> <span className="hidden xl:inline">Site</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">{children}</main>
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border">
        Développé par{" "}
        <a
          href="https://webomax.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-bright hover:underline font-semibold"
        >
          Webomax
        </a>
      </footer>
    </div>
  );
}
