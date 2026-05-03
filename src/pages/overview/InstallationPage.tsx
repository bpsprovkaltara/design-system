import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function InstallationPage() {
  return (
    <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Instalasi (Internal)"
        description="Panduan integrasi @bpsprovkaltara/design-system untuk tim internal melalui repository private GitHub Organization."
      />

      <ShowcaseSection title="Prasyarat">
        <p className="text-muted-foreground mb-4">
          Pastikan lingkungan proyek konsumen memenuhi kebutuhan minimum berikut.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
          <li>Node.js 18 atau lebih baru</li>
          <li>React 18+ dan React DOM 18+</li>
          <li>Tailwind CSS 3.4+</li>
          <li>
            Paket{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              tailwindcss-animate
            </code>{' '}
            (dipakai oleh preset Tailwind design system)
          </li>
          <li>Akun GitHub sudah tergabung di organization internal</li>
          <li>Akun memiliki akses ke repository private design system</li>
          <li>SSH key sudah terdaftar di akun GitHub (disarankan)</li>
          <li>TypeScript (disarankan, opsional untuk proyek JavaScript)</li>
        </ul>
      </ShowcaseSection>

      <ShowcaseSection title="Instal dari GitHub (Private Repository)">
        <p className="text-muted-foreground mb-4">
          Metode utama untuk tim internal adalah instalasi langsung dari repository private.
        </p>
        <CodeBlock language="bash">
          {`npm install git+ssh://git@github.com/ORG/REPO.git#v3.0.0 tailwindcss-animate
# atau
pnpm add git+ssh://git@github.com/ORG/REPO.git#v3.0.0 tailwindcss-animate`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground mt-4">
          Ganti <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ORG/REPO</code>{' '}
          sesuai repository internal Anda. Untuk mengunci versi, Anda bisa memakai tag, branch
          (misalnya <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">#main</code>
          ), atau commit hash.
        </p>
      </ShowcaseSection>

      <ShowcaseSection title="Akses dan autentikasi">
        <p className="text-muted-foreground mb-4">
          Design system ini bersifat internal. Instalasi hanya berhasil jika akun GitHub Anda
          memiliki akses ke repository private.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
          <li>
            Disarankan menggunakan SSH. Pastikan key lokal sudah tersimpan di akun GitHub yang
            digunakan.
          </li>
          <li>
            Jika menggunakan HTTPS + token, ikuti kebijakan keamanan internal dan jangan simpan
            token pada source code.
          </li>
          <li>Hanya anggota organization dengan izin repo yang dapat menginstal paket ini.</li>
        </ul>
      </ShowcaseSection>

      <ShowcaseSection title="Import stylesheet">
        <p className="text-muted-foreground mb-4">
          Impor stylesheet sekali di entry aplikasi (misalnya{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">main.tsx</code>).
        </p>
        <CodeBlock>{`import '@bpsprovkaltara/design-system/styles.css'`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Konfigurasi Tailwind">
        <p className="text-muted-foreground mb-4">
          Gunakan preset resmi agar token warna, radius, tipografi, dan utilitas lainnya tetap
          konsisten.
        </p>
        <CodeBlock language="ts">
          {`// tailwind.config.ts
import type { Config } from 'tailwindcss'
import bpsPreset from '@bpsprovkaltara/design-system/tailwind-preset'

export default {
  presets: [bpsPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@bpsprovkaltara/design-system/dist/**/*.{js,cjs}',
  ],
} satisfies Config`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground mt-4">
          Sertakan path{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            node_modules/.../dist
          </code>{' '}
          di <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">content</code> agar
          kelas yang dipakai dari paket ikut di-scan Tailwind.
        </p>
      </ShowcaseSection>

      <ShowcaseSection title="Opsi registry internal (jika tersedia)">
        <p className="text-muted-foreground mb-4">
          Jika organization Anda memiliki registry internal (misalnya GitHub Packages), instalasi
          dengan nama paket dapat digunakan setelah konfigurasi{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.npmrc</code> dan
          autentikasi internal selesai.
        </p>
        <CodeBlock language="bash">
          {`# hanya berlaku bila registry internal organization sudah dikonfigurasi
npm install @bpsprovkaltara/design-system`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Komponen pertama">
        <p className="text-muted-foreground mb-4">
          Impor komponen dari entry utama paket. Contoh berikut memakai Button, Badge, dan Card.
        </p>
        <div className="border rounded-lg p-8 bg-card space-y-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Simpan</Button>
            <Button variant="outline">Batal</Button>
            <Badge>Internal</Badge>
          </div>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Judul kartu</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gunakan komponen ini sebagai titik awal formulir atau ringkasan data.
              </p>
            </CardContent>
          </Card>
        </div>
        <CodeBlock>
          {`import { Badge, Button } from '@bpsprovkaltara/design-system'
import { Card, CardContent, CardHeader, CardTitle } from '@bpsprovkaltara/design-system'

export function ContohHalaman() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-wrap gap-3">
        <Button>Simpan</Button>
        <Button variant="outline">Batal</Button>
        <Badge>Internal</Badge>
      </div>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Judul kartu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Gunakan komponen ini sebagai titik awal formulir atau ringkasan data.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Utilitas dan pola">
        <p className="text-muted-foreground mb-4">
          Paket juga mengekspor helper dan pola siap pakai untuk aplikasi internal.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
          <li>
            <strong>Primitives</strong> — Accordion, Alert, Avatar, Badge, Breadcrumb, Button,
            Calendar, Card, Checkbox, Command, Dialog, Dropdown Menu, Form, Input, Label,
            Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet,
            Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, Toast, Tooltip, dan lainnya.
          </li>
          <li>
            <strong>Komponen BPS</strong> — BpsCombobox, BpsDataTable, BpsDatePicker, BpsPageHeader,
            BpsFilterBar, StatusBadge, serta komponen alur kerja data lainnya.
          </li>
          <li>
            <strong>Pola</strong> — EmptyState untuk keadaan kosong yang konsisten.
          </li>
          <li>
            <strong>Hooks</strong> — useToast untuk notifikasi toast.
          </li>
          <li>
            <strong>Utilitas</strong> — fungsi{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">cn</code> untuk
            menggabungkan className.
          </li>
        </ul>
        <CodeBlock>
          {`import { cn, EmptyState, useToast } from '@bpsprovkaltara/design-system'`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Build library lokal">
        <p className="text-muted-foreground mb-4">
          Instalasi dari Git membutuhkan keluaran{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">dist/</code>. Jika
          paket belum terbentuk otomatis saat install, jalankan build berikut dari repository design
          system.
        </p>
        <CodeBlock language="bash">{`npm run build:lib`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Troubleshooting">
        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
          <li>
            <strong>Repository not found</strong> — pastikan akun Anda tergabung organization dan
            memiliki akses ke repository private.
          </li>
          <li>
            <strong>Permission denied (publickey)</strong> — pastikan SSH key sudah ditambahkan ke
            akun GitHub dan agent SSH aktif.
          </li>
          <li>
            <strong>Cannot find module .../styles.css</strong> — pastikan build library sudah
            menghasilkan folder{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">dist/</code>.
          </li>
        </ul>
      </ShowcaseSection>
    </div>
  )
}
