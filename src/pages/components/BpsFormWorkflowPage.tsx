import React, { useState } from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { BpsFormSection } from '@/components/ui/bps-form-section'
import {
  BpsValidationSummary,
  type BpsValidationItem,
} from '@/components/ui/bps-validation-summary'

export function BpsFormWorkflowPage() {
  const [formState, setFormState] = useState({
    judul: '',
    nomor: '',
    unitKerja: '',
    catatan: '',
  })

  const validationItems: BpsValidationItem[] = []

  if (!formState.judul)
    validationItems.push({
      id: 'judul',
      section: 'Informasi Dokumen',
      message: 'Judul dokumen wajib diisi',
    })
  if (!formState.nomor)
    validationItems.push({
      id: 'nomor',
      section: 'Informasi Dokumen',
      message: 'Nomor dokumen wajib diisi',
    })
  if (!formState.unitKerja)
    validationItems.push({
      id: 'unit',
      section: 'Penanggung Jawab',
      message: 'Unit kerja wajib dipilih',
    })

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="BPS Form Workflow"
        description="Pola form bertahap untuk pengajuan dokumen statistik internal."
      />

      <ShowcaseSection title="Workflow Pengisian dan Validasi">
        <div className="space-y-4">
          <BpsValidationSummary
            items={validationItems}
            onNavigate={(id) =>
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          />

          <BpsFormSection
            title="Informasi Dokumen"
            description="Lengkapi metadata utama dokumen sebelum diajukan ke verifikator."
            requiredCount={2}
            completedCount={[formState.judul, formState.nomor].filter(Boolean).length}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="label" htmlFor="judul">
                  Judul Dokumen <span className="text-destructive">*</span>
                </label>
                <Input
                  id="judul"
                  value={formState.judul}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, judul: event.target.value }))
                  }
                  placeholder="Contoh: Statistik Kesejahteraan 2026"
                />
              </div>
              <div className="space-y-2">
                <label className="label" htmlFor="nomor">
                  Nomor Dokumen <span className="text-destructive">*</span>
                </label>
                <Input
                  id="nomor"
                  value={formState.nomor}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, nomor: event.target.value }))
                  }
                  placeholder="BPS-KALTARA/2026/001"
                />
              </div>
            </div>
          </BpsFormSection>

          <BpsFormSection
            title="Penanggung Jawab"
            description="Unit kerja pengampu dokumen untuk proses approval."
            requiredCount={1}
            completedCount={formState.unitKerja ? 1 : 0}
            action={
              <Button size="sm" variant="outline">
                Simpan Draft
              </Button>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="label" htmlFor="unit">
                  Unit Kerja <span className="text-destructive">*</span>
                </label>
                <Input
                  id="unit"
                  value={formState.unitKerja}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, unitKerja: event.target.value }))
                  }
                  placeholder="Contoh: Statistik Sosial"
                />
              </div>
              <div className="space-y-2">
                <label className="label" htmlFor="catatan">
                  Catatan Internal
                </label>
                <Textarea
                  id="catatan"
                  value={formState.catatan}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, catatan: event.target.value }))
                  }
                  placeholder="Catatan untuk reviewer..."
                />
              </div>
            </div>
          </BpsFormSection>
        </div>

        <CodeBlock>{`<BpsValidationSummary items={items} onNavigate={(id) => scrollToField(id)} />
<BpsFormSection title="Informasi Dokumen" requiredCount={2} completedCount={1}>
  {/* form fields */}
</BpsFormSection>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
