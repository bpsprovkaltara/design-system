import React from 'react'
import { FileText } from 'lucide-react'
import { AppTopbar } from '@/components/ui/app-topbar'
import { PageHeader } from '@/components/ui/page-header'
import { FormSection } from '@/components/ui/form-section'
import { ReviewTimeline } from '@/components/ui/review-timeline'
import { ProgressAudit } from '@/components/ui/progress-audit'
import { Button } from '@/components/ui/button'

export function DetailPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AppTopbar appTitle="Portal Statistik Internal" />
      <PageHeader
        title="Detail Dokumen"
        description="Template halaman detail untuk pemeriksaan metadata, lampiran, dan riwayat review."
        action={<Button variant="outline">Unduh Lampiran</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <FormSection title="Metadata Dokumen" description="Informasi utama dokumen statistik.">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Nomor Dokumen</p>
                <p className="text-sm font-medium">001/STAT/2026</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unit Kerja</p>
                <p className="text-sm font-medium">Statistik Sosial</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-muted-foreground">Judul</p>
                <p className="text-sm font-medium">Analisis Kesejahteraan Rumah Tangga 2026</p>
              </div>
            </div>
          </FormSection>

          <ReviewTimeline
            items={[
              {
                id: '1',
                actor: 'Rina Putri',
                role: 'Penyusun',
                note: 'Dokumen diserahkan untuk verifikasi.',
                date: '28 Apr 2026, 09:30',
                status: 'pending',
              },
              {
                id: '2',
                actor: 'Ardi Pratama',
                role: 'Verifikator',
                note: 'Data lampiran telah sesuai, lanjut ke persetujuan.',
                date: '28 Apr 2026, 11:15',
                status: 'approved',
              },
            ]}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="mb-2 text-sm font-medium">Lampiran</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              lampiran-ringkasan.xlsx
            </div>
          </div>
          <ProgressAudit totalChecklist={8} completedChecklist={7} />
        </div>
      </div>
    </div>
  )
}
