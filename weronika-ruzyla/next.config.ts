import type { NextConfig } from "next";

// Static export: every page is prerendered to plain HTML in out/, so any static host
// (Netlify here) can serve it. Photos are already web-optimised, so no image server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
