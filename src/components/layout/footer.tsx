import Link from "next/link";
import Script from "next/script";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY, ADDRESS, BUSINESS_NAME } from "@/lib/tracking";
import { getSiteConfig } from "@/lib/site-config";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
);

const servicesLinks = [
  { name: "Pneus voiture (VL)", href: "/pneus-voiture" },
  { name: "Pneus poids lourd", href: "/pneus-utilitaires-pl" },
  { name: "Pneus agricoles", href: "/pneus-utilitaires-pl#agricoles" },
  { name: "Vidange", href: "/services/vidange" },
  { name: "Parallélisme & Géométrie", href: "/services/parallelisme-geometrie" },
  { name: "Recreusage", href: "/services/recreusage" },
  { name: "Assistance PL Hérault", href: "/pneus-utilitaires-pl#assistance" },
];

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV", href: "/cgv" },
  { name: "Politique de confidentialité", href: "/confidentialite" },
];

const villesLinks = [
  { name: "Montpellier", href: "/montpellier" },
  { name: "Castelnau-le-Lez", href: "/castelnau-le-lez" },
  { name: "Vendargues", href: "/vendargues" },
  { name: "Mauguio", href: "/mauguio" },
  { name: "Lattes", href: "/lattes" },
  { name: "Pérols", href: "/perols" },
  { name: "Jacou", href: "/jacou" },
  { name: "Saint-Jean-de-Védas", href: "/saint-jean-de-vedas" },
  { name: "Lunel", href: "/lunel" },
  { name: "Palavas-les-Flots", href: "/palavas-les-flots" },
  { name: "Nîmes", href: "/nimes" },
  { name: "Sète", href: "/sete" },
];

export async function Footer() {
  const config = await getSiteConfig();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: BUSINESS_NAME,
    description: "Spécialiste pneus VL et PL à Montpellier — Le Crès. Montage sans rendez-vous, stock immédiat.",
    url: "https://recacor.fr",
    telephone: "+33499533390",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1240 Route de Nîmes",
      addressLocality: "Le Crès",
      postalCode: "34920",
      addressCountry: "FR",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
    ],
    priceRange: "€€",
    areaServed: ["Montpellier", "Le Crès", "Hérault"],
  };

  const socials = [
    { href: config.socialFacebook || "https://www.facebook.com/profile.php?id=61563216265682", label: "Facebook", icon: <FacebookIcon /> },
    { href: config.socialInstagram || "https://www.instagram.com/recacor_france/", label: "Instagram", icon: <InstagramIcon /> },
    { href: config.socialTiktok || "https://www.tiktok.com/@recacor6", label: "TikTok", icon: <TikTokIcon /> },
    { href: "https://maps.google.com/?q=1240+Route+de+Nîmes+34920+Le+Crès", label: "Google Maps", icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <footer className="bg-purple-deep">
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1 — Identité */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-recacor.webp" alt="Recacor" width={172} height={36} className="h-9 w-auto mb-4 brightness-0 invert" loading="lazy" />
            <h3 className="sr-only">Recacor</h3>
            <p className="text-xs uppercase tracking-wider text-purple-glow font-semibold mb-4">Montpellier — Le Crès</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-purple-glow shrink-0 mt-0.5" />
                {ADDRESS}
              </div>
              <PhoneLink location="footer" className="flex items-center gap-2.5 text-sm text-white hover:text-purple-glow transition-colors font-semibold">
                <Phone className="h-4 w-4 text-purple-glow shrink-0" />
                {PHONE_DISPLAY}
              </PhoneLink>
              <div className="flex items-start gap-2.5 text-sm text-white/60">
                <Clock className="h-4 w-4 text-purple-glow shrink-0 mt-0.5" />
                <div>
                  <div>Lun–Ven : 8h–17h</div>
                  <div>Sam : 8h–12h</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="h-4 w-4 text-purple-glow shrink-0" />
                contact@recacor.fr
              </div>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Nos zones */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Nos zones</h4>
            <ul className="space-y-2.5">
              {villesLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Réseaux & avis */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Suivez-nous</h4>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
            <a href="https://g.page/r/CQgYeWa3dlAPEAE/review" target="_blank" rel="noopener noreferrer"
              className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-purple-glow text-purple-glow" />)}
              </div>
              <p className="text-xs font-semibold text-white">Laisser un avis Google</p>
              <p className="text-xs text-white/50 mt-0.5">Aidez-nous à grandir</p>
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-white/30 text-center leading-relaxed">
          Recacor — Spécialiste pneus VL et PL à Montpellier — Le Crès (Hérault 34).
          Pneus toutes marques (Michelin, Bridgestone, Continental, Goodyear, Pirelli, Yokohama), montage sans rendez-vous, stock immédiat, parallélisme, géométrie, vidange, recreusage et assistance poids lourd sur site en Hérault.
        </p>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>&copy; {new Date().getFullYear()} RECACOR. Tous droits réservés.</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Star className="w-3 h-3 fill-purple-glow text-purple-glow" />
              <span className="font-semibold text-white/60">5,0</span>
            </span>
          </div>
          <p className="text-xs text-white/30">
            Site web fait par{" "}
            <a href="https://webomax.fr" target="_blank" rel="noopener noreferrer" className="text-purple-glow hover:text-white transition-colors font-medium">Webomax</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
