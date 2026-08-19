/**
 * Renders one schema.org graph into the page as `application/ld+json`.
 *
 * JSON-LD has no place in Next's Metadata API, so the script tag is rendered
 * as ordinary markup. It lands in the static export like everything else, which
 * is what matters here: the machine-readable copy ships in the HTML and needs
 * no JavaScript to appear.
 *
 * `<` is escaped because a literal `</script>` anywhere in the data would end
 * the block early. The content is all ours today, but the guard costs nothing.
 */
export default function JsonLd({ graph }: { graph: Record<string, unknown>[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
