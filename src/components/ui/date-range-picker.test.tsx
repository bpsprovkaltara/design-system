import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangePicker } from './date-range-picker'

describe('DateRangePicker', () => {
  it('renders placeholder when no range is set', () => {
    render(<DateRangePicker placeholder="Pilih rentang" />)
    expect(screen.getByText('Pilih rentang')).toBeInTheDocument()
  })

  it('renders the trigger button', () => {
    render(<DateRangePicker />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('formats a full range in id-ID (dd MMM – dd MMM yyyy)', () => {
    const range = { from: new Date(2026, 0, 1), to: new Date(2026, 2, 31) }
    render(<DateRangePicker range={range} onChange={vi.fn()} />)
    expect(screen.getByText(/01 Jan.*31 Mar 2026/)).toBeInTheDocument()
  })

  it('formats a single date when only "from" is set', () => {
    const range = { from: new Date(2026, 0, 1) }
    render(<DateRangePicker range={range} onChange={vi.fn()} />)
    expect(screen.getByText('01 Jan 2026')).toBeInTheDocument()
  })

  it('opens the range calendar on trigger click', async () => {
    render(<DateRangePicker />)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getAllByRole('grid').length).toBeGreaterThan(0)
  })

  it('is disabled when the disabled prop is set', () => {
    render(<DateRangePicker disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onChange with undefined when cleared', async () => {
    const onChange = vi.fn()
    const range = { from: new Date(2026, 0, 1), to: new Date(2026, 2, 31) }
    render(<DateRangePicker range={range} onChange={onChange} clearable />)
    const clearIcon = document.querySelector('svg.lucide-x')
    expect(clearIcon).toBeInTheDocument()
    await userEvent.click(clearIcon as HTMLElement)
    expect(onChange).toHaveBeenCalledWith(undefined)
  })
})
