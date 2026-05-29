import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export interface FilterBarValue {
  keyword: string
  status: string
  unitKerja: string
}

interface FilterBarProps {
  value: FilterBarValue
  onChange: (value: FilterBarValue) => void
  onReset: () => void
}

export function FilterBar({ value, onChange, onReset }: FilterBarProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="filter-keyword">Pencarian</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="filter-keyword"
              value={value.keyword}
              onChange={(event) => onChange({ ...value, keyword: event.target.value })}
              className="pl-9"
              placeholder="Cari judul atau nomor dokumen"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={value.status} onValueChange={(status) => onChange({ ...value, status })}>
            <SelectTrigger>
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Menunggu verifikasi</SelectItem>
              <SelectItem value="revised">Perlu revisi</SelectItem>
              <SelectItem value="approved">Disetujui</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Unit Kerja</Label>
          <Select
            value={value.unitKerja}
            onValueChange={(unitKerja) => onChange({ ...value, unitKerja })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua unit kerja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua unit kerja</SelectItem>
              <SelectItem value="ipds">IPDS</SelectItem>
              <SelectItem value="sosial">Statistik Sosial</SelectItem>
              <SelectItem value="distribusi">Statistik Distribusi</SelectItem>
              <SelectItem value="produksi">Statistik Produksi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={onReset}>
          Reset filter
        </Button>
      </div>
    </div>
  )
}
