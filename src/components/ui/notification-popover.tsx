'use client'

import * as React from 'react'
import { Bell } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface NotificationPopoverProps {
  /** Jumlah belum dibaca — 0/undefined menyembunyikan badge; ≥100 tampil `99+`. */
  unreadCount?: number
  title?: string
  triggerLabel?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Slot daftar item (app yang merender tautan/baris). */
  children?: React.ReactNode
  /** Ditampilkan bila tidak loading dan children kosong/absen. */
  empty?: React.ReactNode
  loading?: boolean
  loadingLabel?: string
  markAllLabel?: string
  onMarkAllRead?: () => void
  markAllDisabled?: boolean
  className?: string
  contentClassName?: string
}

function formatUnread(count: number): string {
  return count > 99 ? '99+' : String(count)
}

/**
 * Kulit UI lonceng notifikasi — tanpa fetch. App mengisi `children` / `empty`
 * dan menangani mark-read lewat callback.
 */
export function NotificationPopover({
  unreadCount = 0,
  title = 'Notifikasi',
  triggerLabel = 'Notifikasi',
  open,
  onOpenChange,
  children,
  empty,
  loading = false,
  loadingLabel = 'Memuat…',
  markAllLabel = 'Tandai semua dibaca',
  onMarkAllRead,
  markAllDisabled = false,
  className,
  contentClassName,
}: NotificationPopoverProps) {
  const hasChildren = React.Children.count(children) > 0
  const showMarkAll = Boolean(onMarkAllRead) && unreadCount > 0

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={triggerLabel}
          className={cn(
            'relative flex h-9 w-9 items-center justify-center rounded-full text-content-secondary',
            'transition-colors hover:bg-surface-sunken hover:text-content-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className
          )}
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unreadCount > 0 ? (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none"
              aria-hidden="true"
            >
              {formatUnread(unreadCount)}
            </Badge>
          ) : null}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn('w-80 p-0', contentClassName)}>
        <div className="flex items-center justify-between gap-2 border-b border-border-subtle px-4 py-3">
          <p className="text-sm font-semibold text-content-primary">{title}</p>
          {showMarkAll ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={markAllDisabled}
              onClick={onMarkAllRead}
              className="h-auto px-2 py-1 text-xs"
            >
              {markAllLabel}
            </Button>
          ) : null}
        </div>
        <ScrollArea className="max-h-80">
          {loading ? (
            <p className="px-4 py-8 text-center text-sm text-content-tertiary">{loadingLabel}</p>
          ) : hasChildren ? (
            children
          ) : (
            (empty ?? (
              <p className="px-4 py-8 text-center text-sm text-content-tertiary">
                Belum ada notifikasi
              </p>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
