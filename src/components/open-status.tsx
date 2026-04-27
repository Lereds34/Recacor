"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus, type OpeningStatus } from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

export function OpenStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<OpeningStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium tracking-wider uppercase backdrop-blur-sm",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status.isOpen ? "bg-green-400 animate-pulse" : "bg-amber-400"
        )}
      />
      {status.label}
    </span>
  );
}
