import React from 'react'
import { Plus } from 'lucide-react'
import { AppTopbar } from '@/components/ui/app-topbar'
import { PageHeader } from '@/components/ui/page-header'
import { FilterBar } from '@/components/ui/filter-bar'
import { DataTable } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'

const listRows = [
  { nomor: '001/STAT/2026', judul: 'Neraca Pangan April', status: 'pending' },
  { nomor: '002/STAT/2026', judul: 'Indeks Harga Konsumen', status: 'approved' },
]

export function ListPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AppTopbar appTitle="Portal Statistik Internal" />
      <PageHeader
        title="Daftar Dokumen Statistik"
        description="Template halaman list untuk kebutuhan monitoring dan tindak lanjut dokumen."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Dokumen
          </Button>
        }
      />
      <FilterBar
        value={{ keyword: '', status: 'all', unitKerja: 'all' }}
        onChange={() => undefined}
        onReset={() => undefined}
      />
      <DataTable
        data={listRows}
        columns={[
          { key: 'nomor', label: 'Nomor Dokumen' },
          { key: 'judul', label: 'Judul' },
          {
            key: 'status',
            label: 'Status',
            render: (value: unknown) => {
              const status = value as 'pending' | 'approved'
              return <StatusBadge variant={status}>{status}</StatusBadge>
            },
          },
        ]}
      />
    </div>
  )
}
