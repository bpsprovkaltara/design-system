import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmDialog } from './confirm-action-dialog'

describe('ConfirmDialog', () => {
  it('supports controlled open without reason field', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const onOpenChange = vi.fn()
    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="Hapus item"
        description="Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        variant="destructive"
        showReason={false}
        onConfirm={onConfirm}
      />
    )
    expect(screen.getByRole('heading', { name: 'Hapus item' })).toBeInTheDocument()
    expect(screen.queryByLabelText(/Alasan/)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(onConfirm).toHaveBeenCalledWith('')
  })

  it('requires reason when reasonRequired', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog
        open
        title="Tolak"
        description="Berikan alasan"
        reasonRequired
        onConfirm={onConfirm}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Konfirmasi' }))
    expect(onConfirm).not.toHaveBeenCalled()
    expect(screen.getByText(/Alasan wajib diisi/)).toBeInTheDocument()
  })
})
