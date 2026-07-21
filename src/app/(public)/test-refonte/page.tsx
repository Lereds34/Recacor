import type { Metadata } from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title: "Test refonte Recacor",
  description: "Page de validation interne de la refonte Recacor.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TestRefontePage() {
  return <HomePage />;
}
