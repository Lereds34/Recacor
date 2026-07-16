import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Meta Ads — URL avec tirets longs (em dash) au lieu de tirets normaux
      {
        source: "/pneus–utilitaire–PL",
        destination: "/pneus-utilitaires-pl",
        permanent: true,
      },
      {
        source: "/pneus—utilitaire—PL",
        destination: "/pneus-utilitaires-pl",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

const sentryEnabled = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

export default sentryEnabled
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      disableLogger: true,
    })
  : nextConfig;
