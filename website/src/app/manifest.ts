import type { MetadataRoute } from "next";

/*
 * Exists so the two android-chrome icons from the optimized logo set are
 * actually reachable — Android reads its home-screen icon from here, not from
 * <link rel="icon">.
 *
 * Next prefixes basePath onto next/image and next/link, but not onto strings
 * inside a manifest, so start_url and every icon src prefix it themselves.
 * They then follow a custom-domain switch (BASE_PATH="") like everything else.
 *
 * The icons keep their own safe-area margin and are therefore declared "any",
 * not "maskable" — a maskable crop would cut into the floor-plan frame.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mag. Claudia Plessl — Interior Design & Ordnungscoaching",
    short_name: "Claudia Plessl",
    description:
      "Interior Design und Professional Organizing in Wien und Niederösterreich.",
    lang: "de-AT",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#faf9f7",
    icons: [
      {
        src: `${basePath}/icons/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
