import type { MetadataRoute } from "next";
import { CONTACT } from "@/content/site";

/*
 * Exists so the two android-chrome icons from the optimized logo set are
 * actually reachable — Android reads its home-screen icon from here, not from
 * <link rel="icon">.
 *
 * Next prefixes basePath onto next/image and next/link, but not onto strings
 * inside a manifest, so start_url and every icon src prefix it themselves.
 * They then follow a custom-domain switch (BASE_PATH="") like everything else.
 *
 * Zwei Sorten Icons: die regulaeren behalten ihren eigenen Rand und sind "any".
 * Daneben steht ein eigenes "maskable"-Icon — Android schneidet
 * Maskable-Icons auf eine Form zu und beschneidet alles ausserhalb eines
 * Kreises von 80 % Kantenlaenge. Das CP-Monogramm aus Logo2.png reicht dort
 * bis 159,1 px der erlaubten 204,8 px (brand/build_web_assets.py prueft das
 * per assert) und traegt einen deckenden Grund.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONTACT.businessName,
    short_name: "Raum & Ordnung",
    description:
      "Ordnungscoaching, Innenraumgestaltung und Workshops in Wien und Niederösterreich.",
    lang: "de-AT",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    // CI page background (CI.pptx slide 5).
    background_color: "#fafbfa",
    theme_color: "#fafbfa",
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
      {
        src: `${basePath}/icons/android-chrome-maskable-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
