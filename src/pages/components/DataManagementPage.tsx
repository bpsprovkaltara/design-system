import React, { useMemo, useState } from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { Checkbox } from '@/components/ui/checkbox'
import { StatusBadge } from '@/components/ui/status-badge'
import { DataTable } from '@/components/ui/data-table'
import { FilterBar, type FilterBarValue } from '@/components/ui/filter-bar'
import { BulkActionBar } from '@/components/ui/bulk-action-bar'
import { DataStatePanel } from '@/components/ui/data-state-panel'

type RowData = {
  id: string
  judul: string
  unitKerja: string
  status: 'draft' | 'pending' | 'revised' | 'approved'
}

const initialFilters: FilterBarValue = {
  keyword: '',
  status: 'all',
  unitKerja: 'all',
}

const rawData: RowData[] = [
  {
    id: '1',
    judul: 'Statistik Konsumsi Rumah Tangga 2026',
    unitKerja: 'sosial',
    status: 'pending',
  },
  { id: '2', judul: 'Rekap Harga Produsen Maret 2026', unitKerja: 'distribusi', status: 'revised' },
  { id: '3', judul: 'Indikator Pertanian Triwulan I', unitKerja: 'produksi', status: 'approved' },
]

export function DataManagementPage() {
  const [filters, setFilters] = useState<FilterBarValue>(initialFilters)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [state, setState] = useState<'loading' | 'error' | 'empty' | 'ready'>('ready')

  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      const matchKeyword =
        filters.keyword.length === 0 ||
        item.judul.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        item.id.includes(filters.keyword)
      const matchStatus = filters.status === 'all' || item.status === filters.status
      const matchUnit = filters.unitKerja === 'all' || item.unitKerja === filters.unitKerja
      return matchKeyword && matchStatus && matchUnit
    })
  }, [filters])

  const columns = [
    {
      key: 'selected',
      label: '',
      render: (_: unknown, row: RowData) => (
        <Checkbox
          checked={selectedRows.includes(row.id)}
          onCheckedChange={(checked) => {
            setSelectedRows((prev) =>
              checked ? [...prev, row.id] : prev.filter((currentId) => currentId !== row.id)
            )
          }}
          aria-label={`Pilih dokumen ${row.judul}`}
        />
      ),
    },
    { key: 'judul', label: 'Judul Dokumen' },
    {
      key: 'unitKerja',
      label: 'Unit Kerja',
      render: (value: unknown) => String(value).toUpperCase(),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => {
        const status = value as RowData['status']
        return <StatusBadge variant={status}>{status}</StatusBadge>
      },
    },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Data Management"
        description="Pola manajemen data dengan filter, state panel, dan aksi massal."
      />

      <ShowcaseSection title="Filter + Tabel + Bulk Action">
        <div className="space-y-4">
          <FilterBar
            value={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
            statusOptions={[
              { value: 'all', label: 'Semua status' },
              { value: 'pending', label: 'Antrian verifikasi' },
              { value: 'revised', label: 'Revisi teknis' },
              { value: 'approved', label: 'Siap publikasi' },
            ]}
            unitKerjaOptions={[
              { value: 'all', label: 'Semua unit' },
              { value: 'sosial', label: 'Sosial' },
              { value: 'distribusi', label: 'Distribusi' },
              { value: 'produksi', label: 'Produksi' },
            ]}
          />
          <div className="flex gap-2">
            <button className="text-xs underline" onClick={() => setState('loading')}>
              Simulasi loading
            </button>
            <button className="text-xs underline" onClick={() => setState('error')}>
              Simulasi error
            </button>
            <button className="text-xs underline" onClick={() => setState('empty')}>
              Simulasi empty
            </button>
            <button className="text-xs underline" onClick={() => setState('ready')}>
              Kembali ready
            </button>
          </div>

          <BulkActionBar
            selectedCount={selectedRows.length}
            actions={[
              {
                label: 'Set menunggu verifikasi',
                variant: 'outline',
                onClick: () => setSelectedRows([]),
              },
              {
                label: 'Set disetujui',
                onClick: () => setSelectedRows([]),
              },
            ]}
          />

          <DataStatePanel
            state={state === 'ready' && filteredData.length === 0 ? 'empty' : state}
            onRetry={() => setState('ready')}
          >
            <DataTable
              data={filteredData}
              columns={columns}
              getRowKey={(row) => row.id}
              pageSize={5}
            />
          </DataStatePanel>
        </div>
      </ShowcaseSection>
    </div>
  )
}
