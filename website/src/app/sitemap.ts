import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

/*
 * Six pages: the German one-pager with its three separate legal documents, and
 * the English one-pager with all three folded into /en/legal/.
 *
 * Only the two home pages declare hreflang alternates, which mirrors what the
 * layouts already emit into the HTML. The three German legal pages have no
 * one-to-one English counterpart — they would all have to name /en/legal/, and
 * that page can only name one of them back, so the cluster would contradict
 * itself. Better to say nothing than to say something inconsistent.
 */

export const dynamic = "force-static";

const HOME_ALTERNATES = {
  languages: {
    de: absoluteUrl(),
    en: absoluteUrl("en/"),
    "x-default": absoluteUrl(),
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: HOME_ALTERNATES,
    },
    {
      url: absoluteUrl("en/"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: HOME_ALTERNATES,
    },
    { url: absoluteUrl("impressum/"), changeFrequency: "yearly", priority: 0.3 },
    {
      url: absoluteUrl("datenschutz/"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: absoluteUrl("agb/"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("en/legal/"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
