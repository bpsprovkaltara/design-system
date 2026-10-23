import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './date-picker'

describe('DatePicker', () => {
  it('renders placeholder when no date is set', () => {
    render(<DatePicker placeholder="Pilih tanggal" />)
    expect(screen.getByText('Pilih tanggal')).toBeInTheDocument()
  })

  it('renders the trigger button', () => {
    render(<DatePicker />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('displays selected date in id-ID format (dd MMMM yyyy)', () => {
    const date = new Date(2026, 0, 15)
    render(<DatePicker date={date} onChange={vi.fn()} />)
    expect(screen.getByText('15 Januari 2026')).toBeInTheDocument()
  })

  it('opens calendar popover on trigger click', async () => {
    render(<DatePicker />)
    await userEvent.click(screen.getByRole('button'))
    const grid = screen.queryByRole('grid')
    expect(grid).toBeInTheDocument()
  })

  it('calls onChange when a day button is clicked', async () => {
    const onChange = vi.fn()
    render(<DatePicker onChange={onChange} />)
    await userEvent.click(screen.getByRole('button'))
    // react-day-picker renders day buttons; pick the first non-disabled one
    const dayButtons = screen
      .getAllByRole('button')
      .filter(
        (btn) =>
          btn.getAttribute('aria-disabled') !== 'true' &&
          /^\d+$/.test(btn.textContent?.trim() ?? '')
      )
    expect(dayButtons.length).toBeGreaterThan(0)
    await userEvent.click(dayButtons[0])
    expect(onChange).toHaveBeenCalled()
  })

  it('does not open when disabled', async () => {
    render(<DatePicker disabled />)
    const trigger = screen.getByRole('button')
    expect(trigger).toBeDisabled()
    await userEvent.click(trigger)
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
  })

  it('shows clear button when clearable and date is set', () => {
    const date = new Date(2026, 0, 15)
    render(<DatePicker date={date} onChange={vi.fn()} clearable />)
    expect(screen.getByRole('button', { name: 'Hapus tanggal' })).toBeInTheDocument()
  })

  it('calls onChange with undefined when clear button is clicked', async () => {
    const onChange = vi.fn()
    render(<DatePicker date={new Date(2026, 5, 1)} onChange={onChange} clearable />)
    await userEvent.click(screen.getByRole('button', { name: 'Hapus tanggal' }))
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  it('shows placeholder after controlled date changes from a Date to null', () => {
    const { rerender } = render(<DatePicker date={new Date(2026, 0, 15)} onChange={vi.fn()} />)
    expect(screen.getByText('15 Januari 2026')).toBeInTheDocument()
    rerender(<DatePicker date={null} onChange={vi.fn()} />)
    expect(screen.getByText('Pilih tanggal')).toBeInTheDocument()
    expect(screen.queryByText('15 Januari 2026')).not.toBeInTheDocument()
  })

  it('clear button is reachable by keyboard', async () => {
    const onChange = vi.fn()
    render(<DatePicker date={new Date(2026, 0, 15)} onChange={onChange} clearable />)
    await userEvent.tab()
    await userEvent.tab()
    expect(screen.getByRole('button', { name: 'Hapus tanggal' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  it('does not render clear button when disabled', () => {
    render(<DatePicker date={new Date(2026, 0, 15)} onChange={vi.fn()} clearable disabled />)
    expect(screen.queryByRole('button', { name: 'Hapus tanggal' })).not.toBeInTheDocument()
  })
})
