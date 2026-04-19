import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Paksa Next.js buat nge-transpile Clerk supaya jalurnya nggak korup
  transpilePackages: ["@clerk/nextjs"],
  
  // Matikan fitur-fitur eksperimental yang mungkin bikin bentrok
  experimental: {
    // Kosongkan dulu kalau ada isinya
  }
};

export default nextConfig;