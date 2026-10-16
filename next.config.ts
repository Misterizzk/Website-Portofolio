import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  // Lets the dev server be opened via the LAN address (e.g. from a phone).
  allowedDevOrigins: ["192.168.137.1"],
};

export default nextConfig;
