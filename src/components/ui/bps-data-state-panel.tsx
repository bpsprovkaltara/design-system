import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

type DataState = 'loading' | 'error' | 'empty' | 'ready'

interface BpsDataStatePanelProps {
  state: DataState
  title?: string
  description?: string
  onRetry?: () => void
  children?: React.ReactNode
}

export function BpsDataStatePanel({
  state,
  title,
  description,
  onRetry,
  children,
}: BpsDataStatePanelProps) {
  if (state === 'ready') return <>{children}</>

  if (state === 'loading') {
    return (
      <div className="rounded-lg border bg-card p-8">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner className="h-4 w-4" />
          Memuat data dokumen...
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-feedback-danger" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{title ?? 'Data gagal dimuat'}</p>
            <p className="text-sm text-muted-foreground">
              {description ?? 'Terjadi gangguan saat mengambil data. Silakan coba kembali.'}
            </p>
            <Button size="sm" variant="outline" onClick={onRetry}>
              Coba lagi
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-dashed bg-muted/30 p-8">
      <p className="text-sm font-medium text-foreground">
        {title ?? 'Belum ada data yang tersedia'}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {description ?? 'Ubah filter atau tambah dokumen baru untuk mulai mengisi tabel.'}
      </p>
    </div>
  )
}
