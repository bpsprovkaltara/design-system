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
          <li>Node.js 20 atau lebih baru (disarankan)</li>
          <li>React 19 dan React DOM 19</li>
          <li>
            Tailwind CSS 4 dan tooling untuk stack Anda (misalnya @tailwindcss/vite untuk Vite)
          </li>
          <li>
            Impor{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">styles.css</code>{' '}
            paket. Token Tailwind v4 sudah CSS-first; ekspor{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              tailwind-preset
            </code>{' '}
            hanya shim deprecated untuk kompatibilitas v3
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
          {`npm install git+ssh://git@github.com/ORG/REPO.git#v4.0.0
# atau
pnpm add git+ssh://git@github.com/ORG/REPO.git#v4.0.0`}
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

      <ShowcaseSection title="Tailwind CSS 4 di aplikasi konsumen">
        <p className="text-muted-foreground mb-4">
          Token dan utilitas komponen design system sudah dikonfigurasi langsung di{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">styles.css</code>.
          Untuk kelas Tailwind pada kode aplikasi Anda, konfigurasikan Tailwind v4 mengikuti
          dokumentasi resmi (plugin Vite, PostCSS, atau framework lain); tidak perlu
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            tailwind.config.ts
          </code>{' '}
          dari paket ini.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Ekspor{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
            @bpsprovkaltara/design-system/tailwind-preset
          </code>{' '}
          deprecated di v4.0.0 dan akan dihapus di v5; gunakan impor stylesheet di atas. Rincian
          migrasi:{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">UPGRADE_NOTES.md</code>{' '}
          di repository.
        </p>
        <CodeBlock language="ts">
          {`// vite.config.ts (contoh)
import tailwindcss from '@tailwindcss/vite'
// plugins: [react(), tailwindcss()]`}
        </CodeBlock>
        <CodeBlock language="css">
          {`/* app.css konsumen — contoh */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@source "../src";

/* Opsional bila stylesheet paket diimpor dari CSS aplikasi */
@source "../node_modules/@bpsprovkaltara/design-system/dist";`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground mt-4">
          Jika <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">styles.css</code>{' '}
          diimpor langsung dari entry TypeScript, CSS library sudah prebuilt. Tambahkan{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">@source</code> paket
          hanya bila Anda memproses stylesheet paket dari CSS aplikasi.
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
        <CodeBlock language="bash">{`pnpm run build:lib`}</CodeBlock>
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
