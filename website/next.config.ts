import type { NextConfig } from "next";

// The site is served from the root of https://claudiaplessl.at/, so there is
// no basePath. BASE_PATH stays overridable for hosting under a sub-path.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    // next/image and next/link get basePath automatically; plain attribute
    // strings (a <video src>, a <track src>) do not. Expose it so those can
    // prefix it themselves and still follow a custom-domain switch.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
