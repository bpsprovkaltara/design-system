// Menyalin CSS sumber tambahan ke dist/ setelah `vite build` (build:lib).
// File ini RAW (mengandung directive Tailwind / @import CDN) dan ditujukan untuk
// di-@import oleh konsumen — bukan hasil kompilasi. Dipisah dari vite.lib.config.ts
// agar konfigurasi build inti (fix bug ESM/RSC) tidak tersentuh.
import { copyFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const assets = [
  ['tokens.css', 'dist/tokens.css'], // token + @theme + utilitas DS, TANPA preflight (konsumen Tailwind)
  ['fonts.css', 'dist/fonts.css'], // jalur CDN opsional (opt-in), bukan default
]

for (const [src, dest] of assets) {
  copyFileSync(resolve(root, src), resolve(root, dest))
  console.log(`[copy-css-assets] ${src} -> ${dest}`)
}
