import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      // Semua akar sumber yang dikirim ke konsumen (barrel src/index.ts, entri
      // utils dan tailwind-preset); file tanpa test terhitung 0%.
      include: [
        'src/components/ui/**',
        'src/components/patterns/**',
        'src/hooks/**',
        'src/lib/**',
        'src/index.ts',
        'src/utils.ts',
        'src/tailwind-preset.ts',
      ],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}', // test itu sendiri, bukan sumber
        'src/**/*.stories.*', // cerita dokumentasi, tidak dikirim
        'src/**/*.d.ts', // deklarasi tipe saja, tanpa kode runtime
      ],
      // Ratchet (TESTING.md §5a): floor dari baseline di docs/testing.md; hanya boleh naik.
      thresholds: {
        statements: 67,
        branches: 74,
        functions: 62,
        lines: 68,
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
