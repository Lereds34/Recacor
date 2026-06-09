import type { NextConfig } from "next";

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

export default nextConfig;
