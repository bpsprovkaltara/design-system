import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterBar } from './filter-bar'

describe('FilterBar', () => {
  const value = { keyword: '', status: 'all', unitKerja: 'all' }

  it('associates labels with controls', () => {
    render(<FilterBar value={value} onChange={() => undefined} onReset={() => undefined} />)
    expect(screen.getByLabelText('Pencarian')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
    expect(screen.getByLabelText('Unit Kerja')).toBeInTheDocument()
    expect(screen.getByRole('search', { name: 'Filter data' })).toBeInTheDocument()
  })

  it('accepts custom status option props without crashing', () => {
    render(
      <FilterBar
        value={{ ...value, status: 'pending' }}
        onChange={() => undefined}
        onReset={() => undefined}
        statusOptions={[
          { value: 'all', label: 'Semua' },
          { value: 'pending', label: 'Antrian khusus' },
        ]}
        statusLabel="Status khusus"
      />
    )
    expect(screen.getByLabelText('Status khusus')).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Status khusus' })).toBeInTheDocument()
  })

  it('calls onReset', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    render(<FilterBar value={value} onChange={() => undefined} onReset={onReset} />)
    await user.click(screen.getByRole('button', { name: 'Reset filter' }))
    expect(onReset).toHaveBeenCalledOnce()
  })

  it('updates keyword via onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FilterBar value={value} onChange={onChange} onReset={() => undefined} />)
    await user.type(screen.getByLabelText('Pencarian'), 'n')
    expect(onChange).toHaveBeenCalledWith({ keyword: 'n', status: 'all', unitKerja: 'all' })
  })

  it('renders composable filters', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <FilterBar
        filters={[
          {
            type: 'search',
            id: 'q',
            label: 'Cari',
            value: '',
            onChange,
            placeholder: 'Kata kunci',
          },
        ]}
        onReset={() => undefined}
      />
    )
    expect(screen.getByLabelText('Cari')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Cari'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })
})
