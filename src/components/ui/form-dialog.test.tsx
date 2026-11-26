import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormDialog } from './form-dialog'
import { Button } from './button'

describe('FormDialog', () => {
  it('opens from trigger and shows title plus description', async () => {
    const user = userEvent.setup()
    render(
      <FormDialog
        title="Tambah pengguna"
        description="Lengkapi data akun baru."
        trigger={<Button>Buka formulir</Button>}
      >
        <p>Isi formulir di sini</p>
      </FormDialog>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Buka formulir' }))

    const dialog = screen.getByRole('dialog', { name: 'Tambah pengguna' })
    expect(dialog).toHaveAccessibleDescription('Lengkapi data akun baru.')
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)).toBe(
      screen.getByRole('heading', { name: 'Tambah pengguna' })
    )
    expect(document.getElementById(dialog.getAttribute('aria-describedby')!)).toHaveTextContent(
      'Lengkapi data akun baru.'
    )
    expect(screen.getByText('Lengkapi data akun baru.')).toBeInTheDocument()
    expect(screen.getByText('Isi formulir di sini')).toBeInTheDocument()
  })

  it('passes close callback to function children', async () => {
    const user = userEvent.setup()
    render(
      <FormDialog title="Ubah data" trigger={<Button>Edit</Button>}>
        {(close) => (
          <Button type="button" onClick={close}>
            Selesai
          </Button>
        )}
      </FormDialog>
    )

    await user.click(screen.getByRole('button', { name: 'Edit' }))
    expect(screen.getByRole('dialog', { name: 'Ubah data' })).toHaveAccessibleDescription(
      'Ubah data'
    )

    await user.click(screen.getByRole('button', { name: 'Selesai' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toHaveFocus()
  })

  it('supports controlled open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <FormDialog title="Terkontrol" open={false} onOpenChange={onOpenChange}>
        <p>Konten</p>
      </FormDialog>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    rerender(
      <FormDialog title="Terkontrol" open onOpenChange={onOpenChange}>
        <p>Konten</p>
      </FormDialog>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
