import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataTable } from './data-table'
import { Button } from './button'

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

  it('does not render Aksi column when renderRowActions is omitted', () => {
    render(<DataTable data={data} columns={columns} />)
    expect(screen.queryByText('Aksi')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument()
  })

  it('renders row actions when renderRowActions is provided', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    render(
      <DataTable
        data={data}
        columns={columns}
        getRowKey={(row) => row.id}
        renderRowActions={(row) => (
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.id)}>
            Edit
          </Button>
        )}
      />
    )
    expect(screen.getByText('Aksi')).toBeInTheDocument()
    const editButtons = screen.getAllByRole('button', { name: 'Edit' })
    expect(editButtons).toHaveLength(data.length)
    await user.click(editButtons[0])
    expect(onEdit).toHaveBeenCalledWith(1)
  })

  it('renders empty state when data is empty', () => {
    render(<DataTable data={[]} columns={columns} emptyTitle="Kosong" />)
    expect(screen.getByText('Kosong')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('shows loading overlay', () => {
    render(<DataTable data={data} columns={columns} loading loadingLabel="Sedang memuat" />)
    expect(screen.getByText('Sedang memuat')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('supports server pagination', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <DataTable
        data={data.slice(0, 2)}
        columns={columns}
        pagination={{ page: 0, pageSize: 2, total: 5, onPageChange }}
      />
    )
    expect(screen.getByText(/Menampilkan 1–2 dari 5/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Berikutnya' }))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('falls back to dash when value is null/undefined', () => {
    const sparseData = [{ id: 1, nama: null as unknown as string, nilai: 0 }]
    render(<DataTable data={sparseData} columns={[{ key: 'nama', label: 'Nama' }]} />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('sorts sortable columns', async () => {
    const user = userEvent.setup()
    render(
      <DataTable
        data={data}
        columns={[
          { key: 'nama', label: 'Nama', sortable: true },
          { key: 'nilai', label: 'Nilai', sortable: true },
        ]}
      />
    )
    await user.click(screen.getByRole('button', { name: /Nilai/i }))
    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Tarakan')
    await user.click(screen.getByRole('button', { name: /Nilai/i }))
    const rowsDesc = screen.getAllByRole('row')
    expect(rowsDesc[1]).toHaveTextContent('Bulungan')
  })

  it('paginates when pageSize is set', async () => {
    const user = userEvent.setup()
    render(<DataTable data={data} columns={columns} pageSize={2} />)
    expect(screen.getByText('Tarakan')).toBeInTheDocument()
    expect(screen.getByText('Nunukan')).toBeInTheDocument()
    expect(screen.queryByText('Bulungan')).not.toBeInTheDocument()
    expect(screen.getByText(/Menampilkan 1–2 dari 3/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Berikutnya' }))
    expect(screen.getByText('Bulungan')).toBeInTheDocument()
    expect(screen.queryByText('Tarakan')).not.toBeInTheDocument()
  })
})
