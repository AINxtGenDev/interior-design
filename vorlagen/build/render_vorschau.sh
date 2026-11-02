#!/usr/bin/env bash
# Render every template to PDF (LibreOffice in Docker, brand fonts mounted) and to PNG pages.
# Usage: vorlagen/build/render_vorschau.sh [--no-fonts]   (--no-fonts: rely on the embedded fonts only)
set -euo pipefail
V="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
FONTMOUNT=(-v "$V/fonts":/usr/share/fonts/brand:ro)
OUTDIR="$V/vorschau"
if [[ "${1:-}" == "--no-fonts" ]]; then FONTMOUNT=(); OUTDIR="$WORK/nofonts"; mkdir -p "$OUTDIR"; fi

for f in "$V"/*.dotx; do
  b="$(basename "$f" .dotx)"
  # LibreOffice converts a .docx copy: identical package, main part typed as document instead of template
  mkdir -p "$WORK/$b" && (cd "$WORK/$b" && unzip -q "$f")
  sed -i 's/wordprocessingml.template.main+xml/wordprocessingml.document.main+xml/' "$WORK/$b/[Content_Types].xml"
  (cd "$WORK/$b" && zip -qX -r "$WORK/$b.docx" '[Content_Types].xml' _rels docProps word)
done

# LibreOffice in this image cannot load files straight from a bind mount, so copy in and out.
docker run --rm -e HOME=/tmp -v "$WORK":/w "${FONTMOUNT[@]}" --entrypoint sh stirlingtools/stirling-pdf -c \
  'mkdir -p /tmp/z && cp /w/*.docx /tmp/z/ && cd /tmp/z && soffice --headless --convert-to pdf --outdir /tmp/z /tmp/z/*.docx && cp /tmp/z/*.pdf /w/ && chmod 666 /w/*.pdf' \
  >"$WORK/soffice.log" 2>&1 \
  || { cat "$WORK/soffice.log"; exit 1; }

for p in "$WORK"/*.pdf; do
  b="$(basename "$p" .pdf)"
  cp "$p" "$OUTDIR/$b.pdf"
  if [[ "$OUTDIR" == "$V/vorschau" ]]; then
    rm -f "$V/vorschau/png/$b"-*.png
    pdftoppm -png -r 80 "$p" "$V/vorschau/png/$b"
  fi
  echo "== $b: $(pdfinfo "$p" | awk '/^Pages/{print $2}') page(s)"
  pdffonts "$p" | tail -n +3 | awk '{print "   font:", $1, $2, $3, $(NF-4), $(NF-3)}'
done
