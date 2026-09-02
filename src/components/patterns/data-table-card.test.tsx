import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTableCard } from './data-table-card'

describe('DataTableCard', () => {
  it('renders title, summary, children, and footer', () => {
    render(
      <DataTableCard
        title="Pegawai"
        summary={[
          { label: 'Total', value: '12' },
          { label: 'Aktif', value: '10' },
        ]}
        footer={<div>Pagination</div>}
      >
        <table>
          <tbody>
            <tr>
              <td>Baris</td>
            </tr>
          </tbody>
        </table>
      </DataTableCard>
    )
    expect(screen.getByText('Pegawai')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Baris')).toBeInTheDocument()
    expect(screen.getByText('Pagination')).toBeInTheDocument()
  })

  it('wraps children in overflow-x-auto', () => {
    const { container } = render(
      <DataTableCard title="Tabel">
        <div data-testid="body">Isi</div>
      </DataTableCard>
    )
    const scroller = container.querySelector('.overflow-x-auto')
    expect(scroller).toBeTruthy()
    expect(scroller).toContainElement(screen.getByTestId('body'))
  })
})
