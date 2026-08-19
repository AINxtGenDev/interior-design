import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

/*
 * Crawlers only ever read robots.txt from the origin root. While the site lives
 * under https://ainxtgendev.github.io/interior-design/ this file is published at
 * /interior-design/robots.txt, where nothing looks for it — it goes live the day
 * BASE_PATH is emptied and the custom domain is pointed at Pages. It is written
 * now so that switch is one less thing to remember.
 *
 * Everything is allowed, AI crawlers included. The site exists to be found, and
 * being citable in an assistant's answer is worth more to a one-person business
 * in Wien and Niederösterreich than keeping marketing copy out of a training
 * set. Should that change, the split is to allow the retrieval agents
 * (OAI-SearchBot, ChatGPT-User, Claude-User, PerplexityBot), which cite and send
 * readers, and disallow the training ones (GPTBot, ClaudeBot, CCBot,
 * Google-Extended, Applebot-Extended).
 */

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("sitemap.xml"),
  };
}
