import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    qualities: [25, 50, 75],
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
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
