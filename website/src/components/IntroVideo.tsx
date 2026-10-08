import { ASSET_PREFIX, type Content, type Locale } from "@/content/site";

/**
 * Self-hosted introduction film.
 *
 * Deliberately NOT a YouTube/Vimeo embed: the site currently makes zero
 * third-party requests and sets no cookies, which is what makes the
 * Datenschutzerklärung's claims true. An iframe embed would break that and
 * oblige a privacy-policy change. 3.9 MB, faststart, `preload="metadata"` so
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
    <section aria-labelledby="video-heading" className="bg-sage-light">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <h2 id="video-heading" className="h2">
          {content.video.heading}
        </h2>
        <span aria-hidden="true" className="rule mt-6" />
        <p className="lead mt-6">{content.video.lead}</p>

        <figure className="mt-12">
          {/* 9:16 source — constrained on desktop so it never dominates the page. */}
          {/* Never taller than 70 % of the viewport, so the controls stay
              in view on short phones. */}
          <div className="mx-auto w-full max-w-[min(360px,calc(70svh*9/16))]">
            <video
              className="block h-auto w-full rounded border border-sage-soft bg-anthrazit-dark"
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

          <figcaption className="mt-5 text-center">
            <span className="small block font-bold">{content.video.caption}</span>
          </figcaption>
        </figure>

        {locale === "en" && (
          <p className="small mx-auto mt-6 max-w-[360px] text-center">
            The film is narrated in German. German subtitles can be switched on
            in the player.
          </p>
        )}
      </div>
    </section>
  );
}
