#!/usr/bin/env bash
# Carry the live site's hashed /_next/static/ assets over into the new build.
#
# Why: GitHub Pages serves HTML with `cache-control: max-age=600` and every
# deploy replaces the whole site. A visitor who loaded a page shortly before a
# deploy keeps that cached HTML for up to 10 minutes — and it points at CSS/JS
# files whose content-hashed names the new build no longer contains. Result:
# the page renders with no stylesheet at all (seen on Android, 2026-10-02).
#
# The files are content-hashed, so keeping the previous generation next to the
# new one can never shadow anything. Best effort: any network failure only
# means fewer files are kept; it never fails the deploy.
#
# Usage: keep-live-assets.sh <out-dir> <origin> <base-path>
#   e.g. keep-live-assets.sh website/out https://claudiaplessl.at ""
set -uo pipefail

out=$1 origin=$2 base=$3
pages=("/" "/en/" "/impressum/" "/datenschutz/" "/agb/" "/en/legal/")

list=$(mktemp)
for p in "${pages[@]}"; do
  curl -sfL --max-time 20 "$origin$base$p" | grep -oE "$base/_next/static/[^\"'() ]+" >>"$list" || true
done

kept=0
fetch() {
  local url=$1 rel=${1#"$base"} dest
  dest="$out$rel"
  [[ -e $dest ]] && return 1
  mkdir -p "$(dirname "$dest")"
  if curl -sfL --max-time 20 -o "$dest" "$origin$url"; then
    kept=$((kept + 1))
    return 0
  fi
  rm -f "$dest"
  return 1
}

for url in $(sort -u "$list"); do
  if fetch "$url" && [[ $url == *.css ]]; then
    # Old CSS points at old font files; keep those too.
    for media in $(grep -oE "$base/_next/static/media/[^\"'() ]+" "$out${url#"$base"}" | sort -u); do
      fetch "$media" || true
    done
  fi
done

rm -f "$list"
echo "kept $kept asset(s) from the live site"
