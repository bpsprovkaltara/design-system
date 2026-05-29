import React from 'react'
import { AlignCenter, AlignLeft, AlignRight, Bell, Bold, Italic } from 'lucide-react'

import { CodeBlock } from '@/components/showcase/CodeBlock'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
} from '@/components/ui/description-list'
import { FileUpload } from '@/components/ui/file-upload'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export function EssentialsPage() {
  const [alerts, setAlerts] = React.useState(true)
  const [format, setFormat] = React.useState<string[]>(['bold'])
  const [alignment, setAlignment] = React.useState('left')

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Essential UI"
        description="Kontrol dan pola dasar tambahan untuk toolbar, metadata detail, dan unggah berkas."
      />

      <ShowcaseSection title="Toggle">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-6">
          <Toggle pressed={alerts} onPressedChange={setAlerts} variant="outline">
            <Bell />
            Notifikasi
          </Toggle>
          <span className="text-body-sm text-content-secondary">
            Status: {alerts ? 'aktif' : 'nonaktif'}
          </span>
        </div>
        <CodeBlock>{`const [alerts, setAlerts] = React.useState(true)

<Toggle pressed={alerts} onPressedChange={setAlerts} variant="outline">
  <Bell />
  Notifikasi
</Toggle>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle Group">
        <div className="flex flex-wrap items-center gap-6 rounded-lg border bg-card p-6">
          <ToggleGroup type="multiple" value={format} onValueChange={setFormat} aria-label="Format">
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup
            type="single"
            value={alignment}
            onValueChange={(value) => value && setAlignment(value)}
            aria-label="Perataan teks"
          >
            <ToggleGroupItem value="left" aria-label="Rata kiri">
              <AlignLeft />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Rata tengah">
              <AlignCenter />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Rata kanan">
              <AlignRight />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <CodeBlock>{`<ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
  <ToggleGroupItem value="left" aria-label="Rata kiri">
    <AlignLeft />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Rata tengah">
    <AlignCenter />
  </ToggleGroupItem>
</ToggleGroup>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Description List">
        <DescriptionList>
          <DescriptionListItem>
            <DescriptionTerm>Kode Wilayah</DescriptionTerm>
            <DescriptionDetails>65.71</DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>Nama Wilayah</DescriptionTerm>
            <DescriptionDetails>Kota Tarakan</DescriptionDetails>
          </DescriptionListItem>
          <DescriptionListItem>
            <DescriptionTerm>Status Validasi</DescriptionTerm>
            <DescriptionDetails>Disetujui pada 12 Mei 2026</DescriptionDetails>
          </DescriptionListItem>
        </DescriptionList>
        <CodeBlock>{`<DescriptionList>
  <DescriptionListItem>
    <DescriptionTerm>Kode Wilayah</DescriptionTerm>
    <DescriptionDetails>65.71</DescriptionDetails>
  </DescriptionListItem>
</DescriptionList>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="File Upload">
        <div className="max-w-xl rounded-lg border bg-card p-6">
          <FileUpload
            label="Unggah dokumen pendukung"
            description="PDF, XLSX, atau CSV. Maksimum mengikuti validasi aplikasi."
            multiple
          />
        </div>
        <CodeBlock>{`<FileUpload
  label="Unggah dokumen pendukung"
  description="PDF, XLSX, atau CSV."
  multiple
  onFilesChange={(files) => console.log(files)}
/>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
