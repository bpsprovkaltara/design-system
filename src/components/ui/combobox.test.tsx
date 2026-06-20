import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox } from './combobox'

const options = [
  { value: 'tarakan', label: 'Tarakan' },
  { value: 'nunukan', label: 'Nunukan' },
  { value: 'bulungan', label: 'Bulungan' },
]

describe('Combobox', () => {
  it('renders placeholder when no value is selected', () => {
    render(<Combobox options={options} placeholder="Pilih kota" />)
    expect(screen.getByText('Pilih kota')).toBeInTheDocument()
  })

  it('renders the trigger button with combobox role', () => {
    render(<Combobox options={options} />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('shows selected label when controlled value is provided', () => {
    render(<Combobox options={options} value="nunukan" onChange={vi.fn()} />)
    expect(screen.getByText('Nunukan')).toBeInTheDocument()
  })

  it('opens popover and shows options on trigger click', async () => {
    render(<Combobox options={options} />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Tarakan')).toBeInTheDocument()
    expect(screen.getByText('Nunukan')).toBeInTheDocument()
    expect(screen.getByText('Bulungan')).toBeInTheDocument()
  })

  it('shows search input after opening', async () => {
    render(<Combobox options={options} searchPlaceholder="Cari kota..." />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByPlaceholderText('Cari kota...')).toBeInTheDocument()
  })

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn()
    render(<Combobox options={options} onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Bulungan'))
    expect(onChange).toHaveBeenCalledWith('bulungan')
  })

  it('calls onChange with empty string when same value is re-selected (toggle off)', async () => {
    const onChange = vi.fn()
    render(<Combobox options={options} value="tarakan" onChange={onChange} />)
    await userEvent.click(screen.getByRole('combobox'))
    // Both the trigger span and the list item contain "Tarakan" — click the list item
    const allTarakan = screen.getAllByText('Tarakan')
    const listItem = allTarakan.find((el) => el.closest('[cmdk-item]'))
    await userEvent.click(listItem ?? allTarakan[allTarakan.length - 1])
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('renders empty text when no options match', async () => {
    render(<Combobox options={[]} emptyText="Tidak ada pilihan." />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Tidak ada pilihan.')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Combobox options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})
