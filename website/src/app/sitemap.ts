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

/*
 * lastModified = the date the page's visible content last changed, kept by
 * hand. Not the build time: every deploy would then claim a change, and
 * Google stops trusting lastmod that is always "now". Update the date when
 * a page's text, images or video change. changeFrequency and priority are
 * left out — Google ignores both.
 */
const HOME_UPDATED = "2026-10-12";
const LEGAL_UPDATED = "2026-10-09";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(), lastModified: HOME_UPDATED, alternates: HOME_ALTERNATES },
    { url: absoluteUrl("en/"), lastModified: HOME_UPDATED, alternates: HOME_ALTERNATES },
    { url: absoluteUrl("impressum/"), lastModified: LEGAL_UPDATED },
    { url: absoluteUrl("datenschutz/"), lastModified: LEGAL_UPDATED },
    { url: absoluteUrl("agb/"), lastModified: LEGAL_UPDATED },
    { url: absoluteUrl("en/legal/"), lastModified: LEGAL_UPDATED },
  ];
}
