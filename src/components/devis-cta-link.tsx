import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DevisCtaLinkProps {
  className?: string;
  children: ReactNode;
  desktopHref?: string;
  mobileHref?: string;
}

export function DevisCtaLink({
  className,
  children,
  desktopHref = "#devis",
  mobileHref = "/formulaire",
}: DevisCtaLinkProps) {
  return (
    <>
      <a href={desktopHref} className={cn("hidden lg:inline-flex", className)}>
        {children}
      </a>
      <Link href={mobileHref} className={cn("lg:hidden inline-flex", className)}>
        {children}
      </Link>
    </>
  );
}
