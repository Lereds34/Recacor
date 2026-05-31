import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { GtmConsent, GtmHead, GtmNoscript } from "@/components/gtm";

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.recacor.fr"),
  title: {
    default: "Pneus Voiture Montpellier — Garage Recacor Le Crès",
    template: "%s | Recacor Le Crès",
  },
  description:
    "Spécialiste pneus VL et PL à Montpellier — Le Crès. Montage sans RDV, stock immédiat, prix discount. Appelez le 06 07 62 10 43.",
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
      className={`${dmSans.variable} ${jakarta.variable} h-full antialiased`}
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
