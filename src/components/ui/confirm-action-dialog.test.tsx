import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfirmActionDialog } from './confirm-action-dialog'

describe('ConfirmActionDialog', () => {
  it('requires reason when configured as mandatory', async () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmActionDialog
        triggerLabel="Ajukan"
        title="Konfirmasi"
        description="Uji"
        confirmLabel="Konfirmasi"
        reasonRequired
        onConfirm={onConfirm}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'Ajukan' }))
    await userEvent.click(screen.getByRole('button', { name: 'Konfirmasi' }))

    expect(screen.getByText('Alasan wajib diisi sebelum melanjutkan.')).toBeInTheDocument()
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('submits reason when valid', async () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmActionDialog
        triggerLabel="Ajukan"
        title="Konfirmasi"
        description="Uji"
        confirmLabel="Konfirmasi"
        reasonRequired
        onConfirm={onConfirm}
      />
    )

    await userEvent.click(screen.getByRole('button', { name: 'Ajukan' }))
    await userEvent.type(
      screen.getByLabelText(/Alasan tindakan/i),
      'Perbaikan metadata telah selesai'
    )
    await userEvent.click(screen.getByRole('button', { name: 'Konfirmasi' }))

    expect(onConfirm).toHaveBeenCalledWith('Perbaikan metadata telah selesai')
  })
})
