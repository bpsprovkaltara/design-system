import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { DataTable } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { TableEmpty } from '@/components/ui/table-empty'
import { TablePagination } from '@/components/ui/table-pagination'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RowDetailLink } from '@/components/ui/row-detail-link'

export function TablePage() {
  const [page, setPage] = React.useState(1)
  type DataStatus = 'approved' | 'pending' | 'revised'
  const sampleData = [
    { id: 1, name: 'Tarakan', pdrb: 24500, status: 'approved' },
    { id: 2, name: 'Nunukan', pdrb: 15200, status: 'pending' },
    { id: 3, name: 'Bulungan', pdrb: 18400, status: 'revised' },
  ]

  const columns = [
    { key: 'name', label: 'Kabupaten/Kota', sortable: true },
    {
      key: 'pdrb',
      label: 'PDRB (Miliar Rp)',
      sortable: true,
      render: (val: unknown) => (
        <span className="numeric">{Number(val).toLocaleString('id-ID')}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status Data',
      render: (val: unknown) => {
        const status = val as DataStatus
        return <StatusBadge variant={status}>{status.toUpperCase()}</StatusBadge>
      },
    },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Data Table"
        description="Komponen tabel yang padat informasi, didesain untuk aplikasi statistik."
      />

      <ShowcaseSection title="BPS Data Table">
        <div className="border rounded-lg bg-card">
          <DataTable
            data={sampleData}
            columns={columns}
            getRowKey={(row) => row.id}
            pageSize={10}
            renderRowActions={(row) => (
              <RowDetailLink href={`#/wilayah/${row.id}`} label={`Detail wilayah ${row.name}`} />
            )}
          />
        </div>
        <CodeBlock>{`<DataTable
  data={rows}
  columns={…}
  renderRowActions={(row) => (
    <RowDetailLink
      href={\`/wilayah/\${row.id}\`}
      label={\`Detail wilayah \${row.name}\`}
    />
  )}
/>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Table Primitif">
        <div className="border rounded-lg bg-card">
          <Table>
            <TableCaption>Realisasi anggaran per program, 2025.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead className="text-right">Pagu (Rp)</TableHead>
                <TableHead className="text-right">Realisasi (Rp)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Sensus Ekonomi</TableCell>
                <TableCell className="text-right">{(1250000000).toLocaleString('id-ID')}</TableCell>
                <TableCell className="text-right">{(980000000).toLocaleString('id-ID')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Survei Sosial Ekonomi</TableCell>
                <TableCell className="text-right">{(840000000).toLocaleString('id-ID')}</TableCell>
                <TableCell className="text-right">{(720000000).toLocaleString('id-ID')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <CodeBlock>{`<Table>
  <TableCaption>Realisasi anggaran per program, 2025.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Program</TableHead>
      <TableHead className="text-right">Pagu (Rp)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Sensus Ekonomi</TableCell>
      <TableCell className="text-right">1.250.000.000</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Table Empty State">
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kabupaten/Kota</TableHead>
                <TableHead className="text-right">PDRB (Miliar Rp)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableEmpty
                colSpan={2}
                title="Belum ada data"
                description="Data akan tampil setelah diinput."
              />
            </TableBody>
          </Table>
        </div>
        <CodeBlock>{`<TableBody>
  <TableEmpty colSpan={2} title="Belum ada data" description="Data akan tampil setelah diinput." />
</TableBody>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Table Pagination">
        <div className="border rounded-lg bg-card p-4">
          <TablePagination page={page} pageSize={10} total={45} onPageChange={setPage} />
        </div>
        <CodeBlock>{`<TablePagination
  page={page}
  pageSize={10}
  total={total}
  onPageChange={setPage}
/>

// Mode SSR/link (Next.js, TanStack Router, dll):
<TablePagination
  page={page}
  pageSize={10}
  total={total}
  hrefForPage={(p) => \`/data?page=\${p}\`}
  renderLink={(props) => <Link {...props} />}
/>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
