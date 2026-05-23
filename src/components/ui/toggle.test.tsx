import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Toggle } from './toggle'

describe('Toggle', () => {
  it('toggles pressed state when uncontrolled', async () => {
    render(<Toggle>Notifikasi</Toggle>)

    const toggle = screen.getByRole('button', { name: 'Notifikasi' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onPressedChange', async () => {
    const onPressedChange = vi.fn()
    render(<Toggle onPressedChange={onPressedChange}>Aktif</Toggle>)

    await userEvent.click(screen.getByRole('button', { name: 'Aktif' }))
    expect(onPressedChange).toHaveBeenCalledWith(true)
  })
})
