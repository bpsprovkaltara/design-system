import * as React from 'react'
import { Button } from '@/components/ui/button'

interface BulkActionBarProps {
  selectedCount: number
  onSetPending: () => void
  onSetApproved: () => void
}

export function BulkActionBar({ selectedCount, onSetPending, onSetApproved }: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
      <p className="text-sm text-foreground">{selectedCount} dokumen dipilih</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onSetPending}>
          Set menunggu verifikasi
        </Button>
        <Button size="sm" onClick={onSetApproved}>
          Set disetujui
        </Button>
      </div>
    </div>
  )
}
