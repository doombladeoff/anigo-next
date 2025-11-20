import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shikimori.one',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kodik.info',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
