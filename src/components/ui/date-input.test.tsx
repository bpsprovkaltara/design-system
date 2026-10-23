import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { DateInput } from './date-input'

describe('DateInput', () => {
  it('renders a hidden native input with yyyy-MM-dd value', () => {
    const { container } = render(<DateInput name="tanggal" defaultValue="2024-08-17" />)
    const native = container.querySelector('input[name="tanggal"]') as HTMLInputElement
    expect(native).toBeTruthy()
    expect(native.type).toBe('hidden')
    expect(native.value).toBe('2024-08-17')
  })

  it('forwards ref to the native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<DateInput ref={ref} name="tanggal" defaultValue="2024-01-01" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.value).toBe('2024-01-01')
  })

  it('updates native value when a calendar day is chosen', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <DateInput name="tanggal" defaultValue="2024-08-17" onChange={onChange} />
    )
    await userEvent.click(screen.getByRole('button', { name: /17 Agustus 2024/i }))
    const dayButtons = screen
      .getAllByRole('button')
      .filter(
        (btn) =>
          btn.getAttribute('aria-disabled') !== 'true' &&
          /^\d+$/.test(btn.textContent?.trim() ?? '')
      )
    expect(dayButtons.length).toBeGreaterThan(0)
    await userEvent.click(dayButtons[0])
    const native = container.querySelector('input[name="tanggal"]') as HTMLInputElement
    expect(native.value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(onChange).toHaveBeenCalled()
  })

  it('shows placeholder after controlled value changes to empty string', () => {
    const { rerender } = render(<DateInput value="2026-01-15" onChange={vi.fn()} />)
    expect(screen.getByText('15 Januari 2026')).toBeInTheDocument()
    rerender(<DateInput value="" onChange={vi.fn()} />)
    expect(screen.getByText('Pilih tanggal')).toBeInTheDocument()
    expect(screen.queryByText('15 Januari 2026')).not.toBeInTheDocument()
  })

  it('clearing calls onChange with empty string', async () => {
    let cleared: string | undefined
    const onChange = vi.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      cleared = e.target.value
    })
    render(<DateInput name="tanggal" defaultValue="2026-01-15" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Hapus tanggal' }))
    expect(onChange).toHaveBeenCalled()
    expect(cleared).toBe('')
  })
})
