import { ASSET_PREFIX, type Content, type Locale } from "@/content/site";

/**
 * Self-hosted introduction film.
 *
 * Deliberately NOT a YouTube/Vimeo embed: the site currently makes zero
 * third-party requests and sets no cookies, which is what makes the
 * Datenschutzerklärung's claims true. An iframe embed would break that and
 * oblige a privacy-policy change. 4.2 MB, faststart, `preload="metadata"` so
 * nothing but the header is fetched until the visitor presses play.
 */
export default function IntroVideo({
  content,
  locale,
}: {
  content: Content;
  locale: Locale;
}) {
  const src = `${ASSET_PREFIX}/video/vorstellung.mp4`;
  const poster = `${ASSET_PREFIX}/video/vorstellung-poster.jpg`;
  const captions = `${ASSET_PREFIX}/video/vorstellung-de.vtt`;

  return (
    <div className="bg-warm-cream/60">
      <section className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
        <h2 className="display-lg text-anthracite-800">{content.video.heading}</h2>
        <div className="rule-gold mt-6 w-24" aria-hidden="true" />
        <p className="mt-6 max-w-2xl text-lg text-anthracite-600">
          {content.video.lead}
        </p>

        <figure className="mt-12">
          {/* 9:16 source — constrained on desktop so it never dominates the page. */}
          <div className="mx-auto w-full max-w-[360px]">
            <video
              className="block h-auto w-full rounded-sm border border-sage-200 bg-anthracite-900"
              controls
              preload="metadata"
              playsInline
              poster={poster}
              width={1080}
              height={1920}
              aria-label={content.video.heading}
            >
              <source src={src} type="video/mp4" />
              {/* No `default`: subtitles stay off unless the viewer turns them
                  on from the player's own controls. The track is still shipped
                  so the film remains usable without sound. */}
              <track
                kind="captions"
                src={captions}
                srcLang="de"
                label={content.video.captionsLabel}
              />
              {content.video.unsupported}
            </video>
          </div>

          <figcaption className="eyebrow mt-5 text-center text-anthracite-400">
            {content.video.caption}
          </figcaption>
        </figure>

        {locale === "en" && (
          <p className="mt-6 text-center text-sm text-anthracite-500">
            The film is narrated in German. German subtitles can be switched on
            in the player.
          </p>
        )}
      </section>
    </div>
  );
}
