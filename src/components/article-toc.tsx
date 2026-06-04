"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

interface Heading { id: string; text: string; level: 2 | 3 }

export function ArticleTocBox({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");

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
    <div className="rounded-2xl border border-purple-bright/20 bg-purple-bright/5 p-5 mb-8">
      <p className="flex items-center gap-2 text-xs font-bold text-purple-bright uppercase tracking-wider mb-4">
        <List className="h-3.5 w-3.5" /> Sommaire
      </p>
      <ol className="space-y-1.5 list-none">
        {headings.filter(h => h.level === 2).map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`flex items-start gap-2.5 text-sm py-0.5 transition-colors leading-snug group ${
                active === h.id ? "text-purple-bright font-semibold" : "text-foreground/70 hover:text-purple-bright"
              }`}
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-purple-bright/10 text-purple-bright text-[10px] font-black flex items-center justify-center mt-0.5 group-hover:bg-purple-bright group-hover:text-white transition-colors">
                {i + 1}
              </span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ArticleTocSidebar({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState("");

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
    <div className="rounded-2xl border border-border bg-white p-5 mb-4">
      <p className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
        <List className="h-3.5 w-3.5" /> Sommaire
      </p>
      <nav>
        <ul className="space-y-1">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${h.id}`}
                className={`block text-xs py-1 transition-colors leading-snug border-l-2 pl-2.5 ${
                  active === h.id
                    ? "border-purple-bright text-purple-bright font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
