#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
if [ -e registry.json ] || [ -e public/r ]; then
  echo 'registry.json or public/r already exists; preserve it and use a fresh worktree' >&2
  exit 1
fi
build_dir=$(mktemp -d "${TMPDIR:-/tmp}/verify-design-system.XXXXXXXX")
cleanup() {
  rm -rf -- "$build_dir" public/r registry.json
}
trap cleanup EXIT HUP INT TERM
bun run registry:build
bun --bun vite build --outDir "$build_dir" --emptyOutDir
VERIFY_BUILD_DIR="$build_dir" scripts/browser-slot.sh node scripts/verify-showcase.mjs
