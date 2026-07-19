import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationSummary } from './validation-summary'

describe('ValidationSummary', () => {
  it('announces success state politely', () => {
    render(<ValidationSummary items={[]} />)
    expect(screen.getByRole('status')).toHaveTextContent('Semua validasi terpenuhi.')
  })

  it('announces failures as alert and navigates on click', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <ValidationSummary
        items={[{ id: 'judul', section: 'Identitas', message: 'Judul wajib diisi' }]}
        onNavigate={onNavigate}
      />
    )
    expect(screen.getByRole('alert')).toHaveTextContent('1 validasi')
    await user.click(screen.getByRole('button', { name: /Judul wajib diisi/ }))
    expect(onNavigate).toHaveBeenCalledWith('judul')
  })
})
