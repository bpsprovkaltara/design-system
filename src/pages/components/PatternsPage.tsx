import React from 'react'
import { Users } from 'lucide-react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Button } from '@/components/ui/button'
import { SectionCard } from '@/components/patterns/section-card'
import { DataTableCard } from '@/components/patterns/data-table-card'
import { FilterChips } from '@/components/patterns/filter-chips'
import { PageSkeleton } from '@/components/patterns/page-skeleton'

export function PatternsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Patterns"
        description="Pola tingkat tinggi di atas primitif Card, Button, dan Skeleton."
      />

      <ShowcaseSection title="SectionCard">
        <SectionCard
          title="Tim kerja"
          description="Anggota aktif tahun berjalan"
          icon={<Users aria-hidden="true" />}
          action={
            <Button size="sm" variant="outline">
              Tambah
            </Button>
          }
          headerExtra={
            <dl className="flex gap-x-6">
              <div>
                <dt className="text-xs text-content-tertiary">Total</dt>
                <dd className="text-sm font-semibold tabular-nums">24</dd>
              </div>
            </dl>
          }
        >
          <p className="text-sm text-content-secondary">Konten bagian dengan padding standar.</p>
        </SectionCard>
        <CodeBlock>{`<SectionCard
  title="Tim kerja"
  icon={<Users />}
  action={<Button size="sm">Tambah</Button>}
>
  …
</SectionCard>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="DataTableCard">
        <DataTableCard
          title="Daftar pegawai"
          summary={[
            { label: 'Total', value: '128' },
            { label: 'Aktif', value: '121' },
          ]}
          action={
            <Button size="sm" variant="outline">
              Ekspor
            </Button>
          }
          footer={<p className="text-xs text-content-tertiary">Menampilkan 1–10 dari 128 baris</p>}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-content-tertiary">
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-3">Andi Pratama</td>
                <td className="px-6 py-3">IPDS</td>
              </tr>
              <tr>
                <td className="px-6 py-3">Siti Rahma</td>
                <td className="px-6 py-3">Sosial</td>
              </tr>
            </tbody>
          </table>
        </DataTableCard>
        <CodeBlock>{`<DataTableCard
  title="Daftar pegawai"
  summary={[{ label: "Total", value: "128" }]}
  footer={<Pagination … />}
>
  <table>…</table>
</DataTableCard>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="FilterChips">
        <FilterChips
          label="Status kepegawaian"
          showLabel
          items={[
            { href: '#semua', label: 'Semua', active: true },
            { href: '#aktif', label: 'Aktif', active: false },
            { href: '#nonaktif', label: 'Nonaktif', active: false },
          ]}
        />
        <CodeBlock>{`<FilterChips
  label="Status kepegawaian"
  showLabel
  items={[
    { href: "/semua", label: "Semua", active: true },
    { href: "/aktif", label: "Aktif", active: false },
  ]}
/>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="PageSkeleton">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium text-content-secondary">
              variant=&quot;table&quot;
            </p>
            <PageSkeleton variant="table" rows={3} cols={3} />
          </div>
          <div>
            <p className="mb-3 text-xs font-medium text-content-secondary">
              variant=&quot;detail&quot;
            </p>
            <PageSkeleton variant="detail" />
          </div>
        </div>
        <CodeBlock>{`<PageSkeleton variant="table" rows={5} cols={4} />
<PageSkeleton variant="cards" />
<PageSkeleton variant="detail" />`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
