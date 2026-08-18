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
 * Daneben steht seit dem Siegel-Logo ein eigenes "maskable"-Icon — Android
 * schneidet Maskable-Icons auf eine Form zu und beschneidet alles ausserhalb
 * eines Kreises von 80 % Kantenlaenge. Das Siegel sitzt dort nachweislich
 * innerhalb von 204,6 px der erlaubten 204,8 px und traegt einen deckenden
 * Grund, weil Maskable-Icons randlos gefuellt sein muessen.
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
      {
        src: `${basePath}/icons/android-chrome-maskable-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
