import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { Combobox } from '@/components/ui/combobox'
import { DatePicker } from '@/components/ui/date-picker'

export function InputsPage() {
  const regions = [
    { value: 'bulungan', label: 'Kab. Bulungan' },
    { value: 'tarakan', label: 'Kota Tarakan' },
    { value: 'malinau', label: 'Kab. Malinau' },
    { value: 'nunukan', label: 'Kab. Nunukan' },
    { value: 'tana-tidung', label: 'Kab. Tana Tidung' },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Form Inputs & Filters"
        description="Komponen input teks, dropdown, pencarian, dan pemilih tanggal tingkat lanjut."
      />

      <ShowcaseSection title="Advanced Filters (Phase 6)">
        <div className="grid md:grid-cols-2 gap-6 border rounded-lg p-8 bg-card mb-6">
          <div className="space-y-2">
            <label className="label">Filter Wilayah (Combobox)</label>
            <Combobox
              options={regions}
              placeholder="Pilih Kabupaten/Kota..."
              searchPlaceholder="Cari wilayah..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Gunakan untuk list yang panjang dengan kemampuan pencarian.
            </p>
          </div>
          <div className="space-y-2">
            <label className="label">Periode Rilis (Date Picker)</label>
            <DatePicker placeholder="Pilih tanggal rilis" />
            <p className="text-xs text-muted-foreground mt-1">
              Terintegrasi dengan date-fns locale Indonesia.
            </p>
          </div>
        </div>
        <CodeBlock>
          {`<Combobox options={[{value: "tarakan", label: "Kota Tarakan"}]} />
<DatePicker onChange={(date) => console.log(date)} />`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Text Inputs & Standard Select">
        <div className="grid md:grid-cols-2 gap-6 border rounded-lg p-8 bg-card">
          <div className="space-y-2">
            <label className="label">
              Nama Subjek <span className="text-destructive">*</span>
            </label>
            <Input placeholder="Contoh: Kependudukan" />
          </div>
          <div className="space-y-2">
            <label className="label">Tahun Referensi</label>
            <Input
              type="number"
              defaultValue="2024"
              className="numeric border-destructive focus-visible:ring-destructive"
            />
            <p className="text-xs text-destructive">Tahun harus berada antara 2000-2024</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="label">Pencarian Data (Input Kustom)</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Ketik kata kunci dokumen..." className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="label">Kategori Statistik (Standard Select)</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kependudukan">Kependudukan</SelectItem>
                <SelectItem value="ekonomi">Ekonomi</SelectItem>
                <SelectItem value="pertanian">Pertanian</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Tanpa kemampuan pencarian, cocok untuk list pendek ({'<'} 10 item).
            </p>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}
