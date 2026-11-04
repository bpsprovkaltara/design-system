// Membangkitkan registry.json (shadcn registry) dari source DS (ADR 0003).
// Satu item per file sumber; impor antar-file menjadi registryDependencies URL
// absolut, impor paket menjadi dependencies dengan range dari package.json.
// Hasilnya tidak di-commit; `shadcn build` mengubahnya menjadi public/r/*.json.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = (process.env.REGISTRY_BASE_URL ?? 'https://design.kaltarastats.id').replace(/\/$/, '')

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
// dependencies menang bila nama paket muncul di lebih dari satu blok
const versions = { ...pkg.devDependencies, ...pkg.peerDependencies, ...pkg.dependencies }
const IGNORED = new Set(['react', 'react-dom', 'react/jsx-runtime'])

const sources = [
  { dir: 'src/components/ui', match: /\.tsx?$/, type: 'registry:ui', target: (f) => `@ui/${f}` },
  {
    dir: 'src/components/patterns',
    match: /\.tsx?$/,
    type: 'registry:component',
    target: (f) => `@components/patterns/${f}`,
  },
  { dir: 'src/hooks', match: /\.ts$/, type: 'registry:hook', target: (f) => `@hooks/${f}` },
]

const files = sources.flatMap(({ dir, match, type, target }) =>
  readdirSync(resolve(root, dir))
    .filter((f) => match.test(f) && !/\.test\.tsx?$/.test(f) && !f.endsWith('.d.ts'))
    .map((f) => ({ name: f.replace(/\.tsx?$/, ''), path: `${dir}/${f}`, type, target: target(f) }))
)
files.push({ name: 'utils', path: 'src/lib/utils.ts', type: 'registry:lib', target: '@lib/utils.ts' })

const url = (name) => `${BASE}/r/${name}.json`

function packageName(specifier) {
  const parts = specifier.split('/')
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
}

function analyze(file) {
  const code = readFileSync(resolve(root, file.path), 'utf8')
  const specifiers = [
    ...code.matchAll(/from\s+['"]([^'"]+)['"]/g),
    ...code.matchAll(/import\s+['"]([^'"]+)['"]/g),
  ].map((m) => m[1])
  const registryDependencies = new Set()
  const dependencies = new Set()
  for (const spec of specifiers) {
    const local = spec.match(/^@\/(?:components\/(?:ui|patterns)|hooks)\/([^/]+)$/)
    if (local) registryDependencies.add(url(local[1]))
    else if (spec === '@/lib/utils') registryDependencies.add(url('utils'))
    else if (spec.startsWith('@/')) throw new Error(`${file.path}: impor alias di luar registry: ${spec}`)
    else if (spec.startsWith('.')) throw new Error(`${file.path}: impor relatif tidak didukung: ${spec}`)
    else if (!IGNORED.has(spec)) {
      const name = packageName(spec)
      if (IGNORED.has(name)) continue
      if (!versions[name]) throw new Error(`${file.path}: versi ${name} tidak ada di package.json`)
      dependencies.add(`${name}@${versions[name]}`)
    }
  }
  return { registryDependencies: [...registryDependencies].sort(), dependencies: [...dependencies].sort() }
}

const items = files.map((file) => {
  const { registryDependencies, dependencies } = analyze(file)
  return {
    name: file.name,
    type: file.type,
    ...(dependencies.length && { dependencies }),
    ...(registryDependencies.length && { registryDependencies }),
    files: [{ path: file.path, type: file.type, target: file.target }],
  }
})
// tokens.css tidak mengimpor tw-animate-css; paritas dengan konsumen paket saat ini
items.push({
  name: 'bps-tokens',
  type: 'registry:file',
  files: [{ path: 'tokens.css', type: 'registry:file', target: '~/src/styles/bps-tokens.css' }],
})
items.sort((a, b) => a.name.localeCompare(b.name))

// Self-check: dijalankan di setiap CI dan Docker build
const names = new Set(items.map((i) => i.name))
if (names.size !== items.length) {
  const seen = new Set()
  const dup = items.find((i) => seen.has(i.name) || !seen.add(i.name))
  throw new Error(`nama item bentrok: ${dup.name}`)
}
for (const item of items) {
  if (!item.files.length) throw new Error(`${item.name}: tanpa file`)
  for (const dep of item.registryDependencies ?? []) {
    if (!names.has(dep.slice(`${BASE}/r/`.length, -'.json'.length)))
      throw new Error(`${item.name}: registryDependency tidak dikenal ${dep}`)
  }
  if ((item.dependencies ?? []).some((d) => /^react(-dom)?@/.test(d)))
    throw new Error(`${item.name}: react tidak boleh jadi dependency`)
}
if (items.length !== files.length + 1)
  throw new Error(`jumlah item ${items.length} != file sumber ${files.length} + 1`)

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'bps',
  homepage: 'https://design.kaltarastats.id',
  items,
}
writeFileSync(resolve(root, 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`[build-registry] ${items.length} item -> registry.json (base ${BASE})`)
