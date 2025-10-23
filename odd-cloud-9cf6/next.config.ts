import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
  unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
// import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
// initOpenNextCloudflareForDev();
