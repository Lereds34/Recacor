import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { GtmConsent, GtmHead, GtmNoscript } from "@/components/gtm";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.recacor.fr"),
  title: {
    default: "Pneus Voiture Montpellier — Garage Recacor Le Crès",
    template: "%s | Recacor Le Crès",
  },
  description:
    "Spécialiste pneus VL et PL à Montpellier — Le Crès. Montage sans RDV, stock immédiat, prix discount. Appelez le 04 99 53 33 90.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pneus Voiture Montpellier — Garage Recacor Le Crès",
    description:
      "Spécialiste pneus VL et PL à Montpellier — Le Crès. Montage sans RDV, stock immédiat, prix discount.",
    url: "https://www.recacor.fr",
    siteName: "Recacor",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "_naRLlj4qLlcKs8Md4eIvVOkQTWNi0snmmyuuI2C5EU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <GtmConsent />
        <GtmHead />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <GtmNoscript />
        {children}
      </body>
    </html>
  );
}
