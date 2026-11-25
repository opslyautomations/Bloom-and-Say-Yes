import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Fewer srcset candidates = much smaller HTML (each image listed ~7 widths, not 16)
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [128, 256, 384],
    // Instagram feed images (see lib/instagram.ts)
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "**.behold.pictures" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // Canonical host is the apex domain (no www). Also set this in Vercel → Domains.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bloomandsayyes.com" }],
        destination: "https://bloomandsayyes.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
