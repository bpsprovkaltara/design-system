import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormSheet } from './form-sheet'
import { Button } from './button'

describe('FormSheet', () => {
  it('opens from trigger and shows title plus description', async () => {
    const user = userEvent.setup()
    render(
      <FormSheet
        title="Edit pegawai"
        description="Perbarui data kepegawaian."
        trigger={<Button>Buka laci</Button>}
      >
        <p>Formulir panjang</p>
      </FormSheet>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Buka laci' }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Edit pegawai' })).toBeInTheDocument()
    expect(screen.getByText('Perbarui data kepegawaian.')).toBeInTheDocument()
    expect(screen.getByText('Formulir panjang')).toBeInTheDocument()
  })

  it('passes close callback to function children and footer', async () => {
    const user = userEvent.setup()
    render(
      <FormSheet
        title="Formulir"
        trigger={<Button>Buka</Button>}
        footer={(close) => (
          <Button type="button" onClick={close}>
            Tutup footer
          </Button>
        )}
      >
        {(close) => (
          <Button type="button" onClick={close}>
            Tutup body
          </Button>
        )}
      </FormSheet>
    )

    await user.click(screen.getByRole('button', { name: 'Buka' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Tutup body' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Buka' }))
    await user.click(screen.getByRole('button', { name: 'Tutup footer' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('supports controlled open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <FormSheet title="Terkontrol" open={false} onOpenChange={onOpenChange}>
        <p>Konten</p>
      </FormSheet>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    rerender(
      <FormSheet title="Terkontrol" open onOpenChange={onOpenChange}>
        <p>Konten</p>
      </FormSheet>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
