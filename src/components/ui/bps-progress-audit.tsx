import * as React from 'react'
import { Progress } from '@/components/ui/progress'

interface BpsProgressAuditProps {
  totalChecklist: number
  completedChecklist: number
}

export function BpsProgressAudit({ totalChecklist, completedChecklist }: BpsProgressAuditProps) {
  const safeTotal = Math.max(totalChecklist, 1)
  const progress = Math.min(Math.round((completedChecklist / safeTotal) * 100), 100)

  return (
    <div className="rounded-lg border bg-card p-4 space-y-2">
      <p className="text-sm font-medium text-foreground">Progress Kelengkapan Dokumen</p>
      <Progress value={progress} />
      <p className="text-xs text-muted-foreground">
        {completedChecklist}/{safeTotal} indikator terpenuhi ({progress}%)
      </p>
    </div>
  )
}
