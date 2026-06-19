import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTable } from './data-table'

type Row = { id: number; nama: string; nilai: number }

const columns = [
  { key: 'nama', label: 'Nama' },
  { key: 'nilai', label: 'Nilai' },
]

const data: Row[] = [
  { id: 1, nama: 'Tarakan', nilai: 100 },
  { id: 2, nama: 'Nunukan', nilai: 200 },
  { id: 3, nama: 'Bulungan', nilai: 300 },
]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Nama')).toBeInTheDocument()
    expect(screen.getByText('Nilai')).toBeInTheDocument()
  })

  it('renders a row for each data item', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Tarakan')).toBeInTheDocument()
    expect(screen.getByText('Nunukan')).toBeInTheDocument()
    expect(screen.getByText('Bulungan')).toBeInTheDocument()
  })

  it('renders cell values using getValue when provided', () => {
    const cols = [
      {
        key: 'nilai',
        label: 'Nilai (Miliar)',
        getValue: (row: Row) => row.nilai * 2,
      },
    ]
    render(<DataTable data={[data[0]]} columns={cols} />)
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  it('renders cell via render function when provided', () => {
    const cols = [
      {
        key: 'nama',
        label: 'Nama',
        render: (val: unknown) => <span data-testid="custom">{String(val)} (custom)</span>,
      },
    ]
    render(<DataTable data={[data[0]]} columns={cols} />)
    expect(screen.getByTestId('custom')).toHaveTextContent('Tarakan (custom)')
  })

  it('renders the Aksi column header', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.getByText('Aksi')).toBeInTheDocument()
  })

  it('renders an Edit button for each row', () => {
    render(<DataTable data={data} columns={columns} />)
    const editButtons = screen.getAllByRole('button', { name: 'Edit' })
    expect(editButtons).toHaveLength(data.length)
  })

  it('renders empty tbody when data is empty', () => {
    const { container } = render(<DataTable data={[]} columns={columns} />)
    const tbody = container.querySelector('tbody')
    expect(tbody).toBeInTheDocument()
    expect(tbody?.querySelectorAll('tr')).toHaveLength(0)
  })

  it('falls back to dash when value is null/undefined', () => {
    const sparseData = [{ id: 1, nama: null as unknown as string, nilai: 0 }]
    render(<DataTable data={sparseData} columns={[{ key: 'nama', label: 'Nama' }]} />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })
})
