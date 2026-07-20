import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // Allows the local dev server to be reached from other devices on the
  // LAN (phones/tablets for demoing) — Next.js blocks cross-origin dev
  // requests (HMR, RSC) by default, which breaks client-side hydration
  // for any device accessing via the machine's LAN IP instead of
  // localhost. Update this IP if it changes (e.g. switching networks).
  allowedDevOrigins: ["192.168.1.23"],
};

export default nextConfig;
