import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
  unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: '/recommender',
        destination: '/guide',
        permanent: true, // 308 redirect
      },
      {
        source: '/recommender/:path*',
        destination: '/guide/:path*',
        permanent: true,
      },
    ]
  },
  /* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
// import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
// initOpenNextCloudflareForDev();
