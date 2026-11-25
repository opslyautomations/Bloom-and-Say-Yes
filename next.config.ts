import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
