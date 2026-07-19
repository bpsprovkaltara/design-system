import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      <EmptyState title="Belum ada data" description="Unggah dokumen untuk memulai." />
    )
    expect(screen.getByRole('heading', { name: 'Belum ada data' })).toBeInTheDocument()
    expect(screen.getByText('Unggah dokumen untuk memulai.')).toBeInTheDocument()
  })

  it('fires action callbacks', async () => {
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    const onSecondary = vi.fn()
    render(
      <EmptyState
        title="Kosong"
        action={{ label: 'Tambah', onClick: onPrimary }}
        secondaryAction={{ label: 'Bantuan', onClick: onSecondary }}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Tambah' }))
    await user.click(screen.getByRole('button', { name: 'Bantuan' }))
    expect(onPrimary).toHaveBeenCalledOnce()
    expect(onSecondary).toHaveBeenCalledOnce()
  })

  it('supports keyboard activation on primary action', async () => {
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    render(<EmptyState title="Kosong" action={{ label: 'Tambah', onClick: onPrimary }} />)
    const button = screen.getByRole('button', { name: 'Tambah' })
    button.focus()
    await user.keyboard('{Enter}')
    expect(onPrimary).toHaveBeenCalledOnce()
  })
})
