import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      {
        hostname: "i.pravatar.cc",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
