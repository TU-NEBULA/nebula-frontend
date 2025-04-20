import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  transpilePackages: ["@repo/ui", "@repo/types"],
};

export default nextConfig;
