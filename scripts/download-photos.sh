#!/usr/bin/env bash
# Downloads every image found on bloomandsayyes.com (home, about, service pages).
# Run from the root of the new Next.js project:  bash scripts/download-photos.sh
# Optional: pass a different destination folder as the first argument.
set -uo pipefail

DEST="${1:-public/images}"
mkdir -p "$DEST"

G="https://storage.googleapis.com/msgsndr/IZ7YwhSr31RQJraXiKK5/media"
F="https://assets.cdn.filesafe.space/IZ7YwhSr31RQJraXiKK5/media"
SITE="https://bloomandsayyes.com/assets"

dl() {
  if curl -fsSL "$1" -o "$DEST/$2"; then echo "OK    $2"; else echo "FAIL  $2  <- $1"; fi
}

# Brand
dl "$F/6976a6a6a87beb93e9e3ae26.png"       "logo.png"

# Home page
dl "$SITE/hero-beach-proposal-IuBwAG4m.jpg"  "hero-beach-proposal.jpg"
dl "$F/69647c0f98efbd4b55059344.jpg"       "scarlett-founder.jpg"
dl "$G/69647d57c7683bdaa1bf6e16.jpeg"      "portfolio-01.jpeg"
dl "$G/695ddc2b0597df3a7d74b789.jpg"       "portfolio-02.jpg"
dl "$G/69647e0898efbd45f405c83c.jpg"       "portfolio-03.jpg"
dl "$G/69647e4fc7683b80a5bf88e5.jpeg"      "portfolio-04.jpeg"
dl "$G/69647f34c7683babf9bf9fe5.jpeg"      "portfolio-05.jpeg"
dl "$G/69647f5d02f1be718cc6d918.jpeg"      "portfolio-06.jpeg"
dl "$G/695ddc2b30b9c06d139133d9.jpg"       "portfolio-07.jpg"
dl "$G/69647eddf8a93b2f63e1bc0e.jpg"       "portfolio-08.jpg"

# About page
dl "$SITE/about-scarlett-C_mmnGjS.jpeg"      "about-scarlett.jpeg"
dl "$SITE/about-florals-DJwUpM1S.jpeg"       "about-florals.jpeg"

echo
echo "Done. Open $DEST, look at each portfolio-XX file, and rename it to describe the shot"
echo "(e.g. lanikai-sunset-picnic-proposal.jpg). Then update the image manifest in lib/images.ts."
