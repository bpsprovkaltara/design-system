import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path from 'path'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')) as {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

// Externalkan setiap runtime + peer dependency. Tanpa ini, dep CJS (react-day-picker,
// vaul, cmdk, embla-carousel-react, date-fns, dst.) di-inline ke bundle ESM di balik
// shim runtime rolldown `typeof require < "u" ? require : Proxy` yang melempar
// "require is not defined" di browser. Externalkan -> bundle pakai `import`, dep ikut
// terinstal di konsumen lewat field "dependencies".
const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  'react/jsx-runtime',
]
const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`))

const sharedOutput = {
  // preserveModules menjaga tiap modul tetap terpisah sehingga directive "use client"
  // di tiap file komponen ikut ter-emit (RSC-safe) sekaligus membuka subpath exports.
  preserveModules: true,
  preserveModulesRoot: 'src',
  assetFileNames: 'styles.css',
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.test.tsx',
        'src/**/*.test.ts',
        'src/main.tsx',
        'src/App.tsx',
        'src/pages/**',
        'src/components/layout/**',
        'src/components/showcase/**',
      ],
      // Emit deklarasi langsung ke dist/ (mis. dist/index.d.ts) agar cocok dengan
      // path "types"/"exports" di package.json — bukan dist/src/index.d.ts.
      entryRoot: 'src',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.ts'),
        'tailwind-preset': path.resolve(__dirname, 'src/tailwind-preset.ts'),
      },
      external: isExternal,
      // Tanpa build.lib, Vite memakai mode app dan tree-shake semua export entry
      // (index.js jadi kosong). 'strict' menjaga signature entry => export library utuh.
      preserveEntrySignatures: 'strict',
      output: [
        {
          ...sharedOutput,
          format: 'es',
          entryFileNames: '[name].js',
        },
        {
          ...sharedOutput,
          format: 'cjs',
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
