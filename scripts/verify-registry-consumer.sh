#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
repo_dir=$PWD
if [ -e registry.json ] || [ -e public/r ]; then
  echo 'registry.json or public/r already exists; preserve it and use a fresh worktree' >&2
  exit 1
fi
scratch=$(mktemp -d "${TMPDIR:-/tmp}/design-consumer.XXXXXXXX")
server_pid=
cleanup() {
  if [ -n "$server_pid" ]; then kill "$server_pid" 2>/dev/null || :; wait "$server_pid" 2>/dev/null || :; fi
  rm -rf -- "$scratch" public/r registry.json
}
trap cleanup EXIT
trap 'exit 130' HUP INT TERM
mkdir -p test-results/verify/konsumen
evidence=$repo_dir/test-results/verify/konsumen
cp -R .claude/skills/verify-design-system/consumer/. "$scratch/"
mkfifo "$scratch/port"
python3 -u -c 'import http.server; s=http.server.ThreadingHTTPServer(("127.0.0.1",0),lambda *a,**k:http.server.SimpleHTTPRequestHandler(*a,directory="public",**k)); print(s.server_address[1],flush=True); s.serve_forever()' > "$scratch/port" 2> "$scratch/server.log" &
server_pid=$!
read -r port < "$scratch/port"
rm -- "$scratch/port"
REGISTRY_BASE_URL="http://127.0.0.1:$port" bun run registry:build > "$evidence/registry-build.log" 2>&1
node -e 'const fs=require("fs"); const p=process.argv[1]; fs.writeFileSync(p,fs.readFileSync(p,"utf8").replace("REGISTRY_PORT",process.argv[2]))' "$scratch/components.json" "$port"
(
  cd "$scratch"
  bun install > "$evidence/install.log" 2>&1
  "$repo_dir/node_modules/.bin/shadcn" add @bps/button --yes > "$evidence/shadcn.log" 2>&1
  bun run build > "$evidence/build.log" 2>&1
)
VERIFY_CONSUMER_DIR="$scratch" scripts/browser-slot.sh node scripts/verify-consumer.mjs
