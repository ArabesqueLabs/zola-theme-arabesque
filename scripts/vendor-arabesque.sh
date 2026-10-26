#!/bin/sh
# Copy a released version of the Arabesque design system into static/arabesque/:
# its CSS, icon sprite, fonts and helpers, unchanged. The theme's own files
# (static/arabesque/theme/) are left alone.
#
#   scripts/vendor-arabesque.sh 0.9.0
#
# Read the design system's CHANGELOG between the two versions before you
# commit: before 1.0, a minor version may rename or remove classes.
set -eu

version="${1:?usage: scripts/vendor-arabesque.sh <version>}"
root="$(cd "$(dirname "$0")/.." && pwd)"
dest="$root/static/arabesque"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git clone --quiet --depth 1 --branch "v$version" https://github.com/ArabesqueLabs/design-system.git "$tmp/ds"
release="$tmp/ds/v/$version"
[ -d "$release" ] || { echo "No release $version in the design system." >&2; exit 1; }

rm -rf "$dest/js" "$dest/fonts"
mkdir -p "$dest/js" "$dest/fonts"
cp "$release/dist/arabesque.css" "$release/dist/icons.svg" "$dest/"
cp "$release/js/"*.js "$dest/js/"
# The repository's fonts/ links its faces beside it (./), where a release's
# points into the shared v/_fonts/.
cp "$tmp/ds/fonts/"* "$dest/fonts/"
cp "$tmp/ds/LICENSE" "$dest/LICENSE"
echo "$version" > "$dest/VERSION"
echo "Arabesque $version is in static/arabesque/."
