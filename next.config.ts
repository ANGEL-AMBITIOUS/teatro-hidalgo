import type { NextConfig } from "next";

const projectRoot = __dirname;

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'teatrohidalgo.mx',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
