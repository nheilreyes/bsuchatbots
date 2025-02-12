import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: "/chatgp",  // Ang pangalan ng folder kung saan naka-deploy
  assetPrefix: "/chatgp", // Para sa mga assets (CSS, JS, Images)
};

export default nextConfig;
