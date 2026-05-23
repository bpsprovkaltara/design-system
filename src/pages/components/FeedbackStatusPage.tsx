import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ReviewTimeline } from '@/components/ui/review-timeline'
import { ConfirmActionDialog } from '@/components/ui/confirm-action-dialog'
import { ProgressAudit } from '@/components/ui/progress-audit'

const timelineData = [
  {
    id: '1',
    actor: 'Rina Putri',
    role: 'Penyusun',
    note: 'Dokumen diajukan untuk verifikasi awal.',
    date: '26 April 2026, 09:10',
    status: 'pending' as const,
  },
  {
    id: '2',
    actor: 'Ardi Pratama',
    role: 'Verifikator',
    note: 'Memerlukan revisi pada metadata sumber data.',
    date: '26 April 2026, 13:22',
    status: 'revised' as const,
  },
  {
    id: '3',
    actor: 'Rina Putri',
    role: 'Penyusun',
    note: 'Revisi metadata selesai dan diajukan ulang.',
    date: '27 April 2026, 08:45',
    status: 'pending' as const,
  },
  {
    id: '4',
    actor: 'Nadia Salsabila',
    role: 'Kepala Tim',
    note: 'Dokumen disetujui untuk publikasi internal.',
    date: '27 April 2026, 15:05',
    status: 'approved' as const,
  },
]

export function FeedbackStatusPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="BPS Feedback & Status"
        description="Pola feedback, approval, dan progress audit untuk alur pemerintahan."
      />

      <ShowcaseSection title="Alert + Dialog Konfirmasi + Progress">
        <div className="space-y-4">
          <Alert variant="warning">
            <AlertTitle>Perlu Tindak Lanjut</AlertTitle>
            <AlertDescription>
              Terdapat 2 catatan verifikasi yang wajib ditutup sebelum dokumen dapat disetujui.
            </AlertDescription>
          </Alert>
          <div className="flex justify-end">
            <ConfirmActionDialog
              triggerLabel="Ajukan Persetujuan"
              title="Konfirmasi Pengajuan"
              description="Pastikan semua lampiran dan catatan revisi sudah lengkap sebelum pengajuan."
              confirmLabel="Ya, ajukan sekarang"
              reasonRequired
              onConfirm={() => undefined}
            />
          </div>
          <ProgressAudit totalChecklist={12} completedChecklist={10} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Timeline Review">
        <ReviewTimeline items={timelineData} />
      </ShowcaseSection>
    </div>
  )
}
