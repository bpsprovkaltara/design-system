'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export interface FormDialogProps {
  title: string
  description?: string
  /** Uncontrolled trigger. Ignored when opening is fully controlled without a trigger. */
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Body; function form receives `close()` to dismiss after submit. */
  children: React.ReactNode | ((close: () => void) => React.ReactNode)
  className?: string
}

/**
 * Dialog terpusat untuk formulir create/edit.
 * Controlled (`open`/`onOpenChange`) atau uncontrolled lewat `trigger`.
 */
export function FormDialog({
  title,
  description,
  trigger,
  open: openProp,
  onOpenChange,
  children,
  className,
}: FormDialogProps) {
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
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className={cn('max-h-[85vh] overflow-y-auto sm:max-w-lg', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className={description ? undefined : 'sr-only'}>
            {description ?? title}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {typeof children === 'function' ? children(close) : children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
