"use client";

import { useState, useEffect } from "react";
import { ChevronDown, List } from "lucide-react";

interface Heading { id: string; text: string; level: 2 | 3 }

export function ArticleToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <>
      {/* Mobile — collapsible */}
      <div className="lg:hidden mb-6 rounded-2xl border border-border bg-white overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold"
        >
          <span className="flex items-center gap-2 text-foreground">
            <List className="h-4 w-4 text-purple-bright" /> Sommaire
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <nav className="px-5 pb-4 border-t border-border">
            <ul className="space-y-2 pt-3">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setOpen(false)}
                    className={`block text-sm py-0.5 transition-colors ${
                      active === h.id ? "text-purple-bright font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop — sidebar sticky */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            <List className="h-3.5 w-3.5" /> Sommaire
          </p>
          <nav>
            <ul className="space-y-1.5">
              {headings.map((h) => (
                <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                  <a
                    href={`#${h.id}`}
                    className={`block text-sm py-0.5 transition-colors leading-snug ${
                      active === h.id
                        ? "text-purple-bright font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {h.level === 2 && (
                      <span className="inline-block w-1 h-1 rounded-full bg-current mr-2 mb-0.5 opacity-50" />
                    )}
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
