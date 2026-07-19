import * as React from 'react'
import { Inbox, type LucideIcon } from 'lucide-react'
import { TableCell, TableRow } from '@/components/ui/table'

export interface TableEmptyProps {
  /** Jumlah kolom tabel — dipakai sebagai colSpan agar row melebar penuh. */
  colSpan: number
  icon?: LucideIcon
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
}

/**
 * Row empty-state untuk dipakai di dalam TableBody, agar header kolom tetap terlihat
 * saat data kosong (mis. hasil filter kosong atau belum ada data).
 */
export function TableEmpty({
  colSpan,
  icon: Icon = Inbox,
  title,
  description,
  action,
}: TableEmptyProps) {
  return (
    <TableRow data-empty>
      <TableCell colSpan={colSpan} className="py-12 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-1.5">
          <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-surface-sunken text-content-tertiary">
            <Icon className="size-5" aria-hidden />
          </div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          {action ? <div className="mt-2">{action}</div> : null}
        </div>
      </TableCell>
    </TableRow>
  )
}
