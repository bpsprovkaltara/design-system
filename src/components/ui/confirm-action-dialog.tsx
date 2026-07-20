'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export interface ConfirmDialogProps {
  title: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** When true, confirm uses destructive styling. */
  variant?: 'default' | 'destructive'
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Uncontrolled trigger. Ignored when `open` is controlled without a trigger. */
  trigger?: React.ReactNode
  /** @deprecated Use `trigger` ReactNode instead. */
  triggerLabel?: string
  reasonRequired?: boolean
  reasonLabel?: string
  reasonPlaceholder?: string
  /** Hide the reason field entirely. */
  showReason?: boolean
  busy?: boolean
  busyLabel?: string
  error?: React.ReactNode
  onConfirm: (reason: string) => boolean | void | Promise<boolean | void>
  onCancel?: () => void
}

/**
 * Flexible confirm dialog — controlled or trigger-based, optional reason, async-safe.
 * Prefer this over the legacy `ConfirmActionDialog` wrapper.
 */
export function ConfirmDialog({
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'default',
  open: openProp,
  onOpenChange,
  trigger,
  triggerLabel,
  reasonRequired = false,
  reasonLabel = 'Alasan tindakan',
  reasonPlaceholder = 'Tuliskan alasan atau catatan tindak lanjut...',
  showReason = true,
  busy = false,
  busyLabel = 'Memproses…',
  error,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen
  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  const [reason, setReason] = React.useState('')
  const [hasError, setHasError] = React.useState(false)
  const [internalBusy, setInternalBusy] = React.useState(false)
  const isBusy = busy || internalBusy

  const handleOpenChange = (next: boolean) => {
    if (isBusy && !next) return
    setOpen(next)
    if (!next) {
      setReason('')
      setHasError(false)
      onCancel?.()
    }
  }

  const handleConfirm = async () => {
    if (showReason && reasonRequired && reason.trim().length === 0) {
      setHasError(true)
      return
    }

    try {
      setInternalBusy(true)
      const result = await onConfirm(showReason ? reason.trim() : '')
      if (result === false) return
      setReason('')
      setHasError(false)
      setOpen(false)
    } finally {
      setInternalBusy(false)
    }
  }

  const triggerNode =
    trigger ??
    (triggerLabel ? (
      <Button variant="outline" type="button">
        {triggerLabel}
      </Button>
    ) : null)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {triggerNode ? <DialogTrigger asChild>{triggerNode}</DialogTrigger> : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            typeof description === 'string' ? (
              <DialogDescription>{description}</DialogDescription>
            ) : (
              <div className="text-sm text-muted-foreground">{description}</div>
            )
          ) : null}
        </DialogHeader>
        {showReason ? (
          <div className="space-y-2.5">
            <Label htmlFor="confirm-reason">
              {reasonLabel} {reasonRequired ? <span className="text-destructive">*</span> : null}
            </Label>
            <Textarea
              id="confirm-reason"
              value={reason}
              disabled={isBusy}
              onChange={(event) => {
                setReason(event.target.value)
                if (hasError) setHasError(false)
              }}
              placeholder={reasonPlaceholder}
            />
            {hasError ? (
              <p className="text-xs text-destructive">Alasan wajib diisi sebelum melanjutkan.</p>
            ) : null}
          </div>
        ) : null}
        {error ? (
          <div role="alert" className="text-sm text-destructive">
            {error}
          </div>
        ) : null}
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            disabled={isBusy}
            onClick={() => handleOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            disabled={isBusy}
            onClick={() => void handleConfirm()}
          >
            {isBusy ? busyLabel : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/** @deprecated Use `ConfirmDialog` with `triggerLabel` / `trigger`. */
export interface ConfirmActionDialogProps {
  triggerLabel: string
  title: string
  description: string
  confirmLabel: string
  reasonRequired?: boolean
  onConfirm: (reason: string) => void
}

/** @deprecated Prefer `ConfirmDialog`. */
export function ConfirmActionDialog({
  triggerLabel,
  title,
  description,
  confirmLabel,
  reasonRequired = false,
  onConfirm,
}: ConfirmActionDialogProps) {
  return (
    <ConfirmDialog
      triggerLabel={triggerLabel}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      reasonRequired={reasonRequired}
      showReason
      onConfirm={onConfirm}
    />
  )
}
