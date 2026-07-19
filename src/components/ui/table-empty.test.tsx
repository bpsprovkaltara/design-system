import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table, TableBody } from './table'
import { TableEmpty } from './table-empty'

describe('TableEmpty', () => {
  it('renders title, description, and spans all columns', () => {
    render(
      <Table>
        <TableBody>
          <TableEmpty colSpan={3} title="Belum ada data" description="Tambahkan data baru." />
        </TableBody>
      </Table>
    )
    expect(screen.getByText('Belum ada data')).toBeInTheDocument()
    expect(screen.getByText('Tambahkan data baru.')).toBeInTheDocument()
    const cell = screen.getByRole('cell')
    expect(cell).toHaveAttribute('colspan', '3')
  })

  it('renders action slot', () => {
    render(
      <Table>
        <TableBody>
          <TableEmpty
            colSpan={2}
            title="Kosong"
            action={<button type="button">Muat ulang</button>}
          />
        </TableBody>
      </Table>
    )
    expect(screen.getByRole('button', { name: 'Muat ulang' })).toBeInTheDocument()
  })
})
