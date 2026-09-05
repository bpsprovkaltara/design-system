'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export interface FormSheetProps {
  title: string
  description?: string
  /** Uncontrolled trigger. Ignored when opening is fully controlled without a trigger. */
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Body; function form receives `close()` to dismiss after submit. */
  children: React.ReactNode | ((close: () => void) => React.ReactNode)
  /** Optional sticky footer; function form receives the same `close()`. */
  footer?: React.ReactNode | ((close: () => void) => React.ReactNode)
  className?: string
  side?: 'right' | 'left'
}

/**
 * Sheet sisi untuk formulir panjang — daftar di belakang tetap terlihat.
 * Controlled (`open`/`onOpenChange`) atau uncontrolled lewat `trigger`.
 */
export function FormSheet({
  title,
  description,
  trigger,
  open: openProp,
  onOpenChange,
  children,
  footer,
  className,
  side = 'right',
}: FormSheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const close = React.useCallback(() => setOpen(false), [setOpen])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}
      <SheetContent
        side={side}
        className={cn(
          'flex w-full flex-col gap-0 p-0 sm:max-w-xl lg:max-w-2xl',
          className
        )}
      >
        <SheetHeader className="shrink-0 space-y-1 border-b border-border px-6 py-4 text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className={description ? undefined : 'sr-only'}>
            {description ?? title}
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {typeof children === 'function' ? children(close) : children}
        </div>
        {footer ? (
          <SheetFooter className="shrink-0 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
            {typeof footer === 'function' ? footer(close) : footer}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
