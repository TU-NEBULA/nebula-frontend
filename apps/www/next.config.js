/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  transpilePackages: ["@repo/ui", "@repo/types"],
};

module.exports = nextConfig;
