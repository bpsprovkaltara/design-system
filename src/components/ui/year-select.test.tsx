import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { YearSelect } from './year-select'

describe('YearSelect', () => {
  it('renders labeled combobox with controlled value', () => {
    render(<YearSelect value={2024} fromYear={2023} toYear={2025} />)
    expect(screen.getByRole('combobox', { name: 'Tahun' })).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('uses custom label', () => {
    const onChange = vi.fn()
    render(
      <YearSelect
        label="Tahun publikasi"
        value={2025}
        onChange={onChange}
        fromYear={2020}
        toYear={2026}
      />
    )
    expect(screen.getByRole('combobox', { name: 'Tahun publikasi' })).toBeInTheDocument()
  })
})
