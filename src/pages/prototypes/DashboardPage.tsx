import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BpsDataTable } from '@/components/ui/bps-data-table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Users, TrendingUp, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardPage() {
  type DataStatus = 'approved' | 'pending' | 'revised'
  const tableData = [
    { id: 1, region: 'Tarakan', population: '266.397', growth: '+1.2%', status: 'approved' },
    { id: 2, region: 'Nunukan', population: '196.845', growth: '+0.8%', status: 'approved' },
    { id: 3, region: 'Bulungan', population: '131.048', growth: '+2.1%', status: 'pending' },
    { id: 4, region: 'Malinau', population: '80.109', growth: '+0.5%', status: 'revised' },
  ]

  const columns = [
    { key: 'region', label: 'Wilayah' },
    {
      key: 'population',
      label: 'Populasi (Jiwa)',
      render: (v: unknown) => <span className="numeric">{String(v)}</span>,
    },
    {
      key: 'growth',
      label: 'Pertumbuhan',
      render: (v: unknown) => <span className="text-success numeric">{String(v)}</span>,
    },
    {
      key: 'status',
      label: 'Status Validasi',
      render: (v: unknown) => {
        const status = v as DataStatus
        return <StatusBadge variant={status}>{status.toUpperCase()}</StatusBadge>
      },
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="h2 text-foreground">Dashboard Eksekutif</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Ringkasan indikator demografi Provinsi Kalimantan Utara.
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Ekspor PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Total Populasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="numeric text-3xl font-bold">728.498</div>
            <p className="text-xs text-muted-foreground mt-1">Sensus 2023</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" /> Pertumbuhan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="numeric text-3xl font-bold">+2,4%</div>
            <p className="text-xs text-muted-foreground mt-1">Dibandingkan tahun 2022</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              PDRB / Kapita
            </CardTitle>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Sementara
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="numeric text-3xl font-bold">48,2 Jt</div>
            <p className="text-xs text-muted-foreground mt-1">Rupiah (2023)</p>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <h3 className="h3 mb-4">Sebaran Data per Kabupaten/Kota</h3>
        <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
          <BpsDataTable data={tableData} columns={columns} />
        </div>
      </div>
    </div>
  )
}
