import type { NextConfig } from "next";

// basePath is only needed while the site lives under
// https://ainxtgendev.github.io/interior-design/. Once a custom domain is
// pointed at GitHub Pages, set BASE_PATH="" in the deploy workflow.
const basePath = process.env.BASE_PATH ?? "/interior-design";

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
