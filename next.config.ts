import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [],
  // @ts-ignore - Next.js 15+ 移入顶层的配置
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
