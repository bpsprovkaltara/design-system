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

interface BpsConfirmActionDialogProps {
  triggerLabel: string
  title: string
  description: string
  confirmLabel: string
  reasonRequired?: boolean
  onConfirm: (reason: string) => void
}

export function BpsConfirmActionDialog({
  triggerLabel,
  title,
  description,
  confirmLabel,
  reasonRequired = false,
  onConfirm,
}: BpsConfirmActionDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [reason, setReason] = React.useState('')
  const [hasError, setHasError] = React.useState(false)

  const handleConfirm = () => {
    if (reasonRequired && reason.trim().length === 0) {
      setHasError(true)
      return
    }

    onConfirm(reason.trim())
    setReason('')
    setHasError(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="confirm-reason">
            Alasan tindakan {reasonRequired ? <span className="text-destructive">*</span> : null}
          </Label>
          <Textarea
            id="confirm-reason"
            value={reason}
            onChange={(event) => {
              setReason(event.target.value)
              if (hasError) setHasError(false)
            }}
            placeholder="Tuliskan alasan atau catatan tindak lanjut..."
          />
          {hasError ? (
            <p className="text-xs text-destructive">Alasan wajib diisi sebelum melanjutkan.</p>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleConfirm}>{confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
