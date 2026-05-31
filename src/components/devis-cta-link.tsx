import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DevisCtaLinkProps {
  className?: string;
  children: ReactNode;
  desktopHref?: string;
}

/**
 * Sur desktop (lg+) : scroll vers #devis (formulaire intégré à la page).
 * Sur mobile : redirige vers /formulaire (page dédiée, form visible dès le chargement).
 */
export function DevisCtaLink({
  className,
  children,
  desktopHref = "#devis",
}: DevisCtaLinkProps) {
  return (
    <>
      <a href={desktopHref} className={cn("hidden lg:inline-flex", className)}>
        {children}
      </a>
      <Link href="/formulaire" className={cn("lg:hidden inline-flex", className)}>
        {children}
      </Link>
    </>
  );
}
