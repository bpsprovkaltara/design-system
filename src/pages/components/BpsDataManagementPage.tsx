import React, { useMemo, useState } from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { Checkbox } from '@/components/ui/checkbox'
import { StatusBadge } from '@/components/ui/status-badge'
import { BpsDataTable } from '@/components/ui/bps-data-table'
import { BpsFilterBar, type BpsFilterBarValue } from '@/components/ui/bps-filter-bar'
import { BpsBulkActionBar } from '@/components/ui/bps-bulk-action-bar'
import { BpsDataStatePanel } from '@/components/ui/bps-data-state-panel'

type RowData = {
  id: string
  judul: string
  unitKerja: string
  status: 'draft' | 'pending' | 'revised' | 'approved'
}

const initialFilters: BpsFilterBarValue = {
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

export function BpsDataManagementPage() {
  const [filters, setFilters] = useState<BpsFilterBarValue>(initialFilters)
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
        title="BPS Data Management"
        description="Pola manajemen data dengan filter, state panel, dan aksi massal."
      />

      <ShowcaseSection title="Filter + Tabel + Bulk Action">
        <div className="space-y-4">
          <BpsFilterBar
            value={filters}
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
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

          <BpsBulkActionBar
            selectedCount={selectedRows.length}
            onSetPending={() => setSelectedRows([])}
            onSetApproved={() => setSelectedRows([])}
          />

          <BpsDataStatePanel
            state={state === 'ready' && filteredData.length === 0 ? 'empty' : state}
            onRetry={() => setState('ready')}
          >
            <BpsDataTable data={filteredData} columns={columns} />
          </BpsDataStatePanel>
        </div>
      </ShowcaseSection>
    </div>
  )
}
