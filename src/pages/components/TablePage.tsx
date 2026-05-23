import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { DataTable } from '@/components/ui/data-table'
import { StatusBadge } from '@/components/ui/status-badge'

export function TablePage() {
  type DataStatus = 'approved' | 'pending' | 'revised'
  const sampleData = [
    { id: 1, name: 'Tarakan', pdrb: 24500, status: 'approved' },
    { id: 2, name: 'Nunukan', pdrb: 15200, status: 'pending' },
    { id: 3, name: 'Bulungan', pdrb: 18400, status: 'revised' },
  ]

  const columns = [
    { key: 'name', label: 'Kabupaten/Kota' },
    {
      key: 'pdrb',
      label: 'PDRB (Miliar Rp)',
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
          <DataTable data={sampleData} columns={columns} />
        </div>
      </ShowcaseSection>
    </div>
  )
}
