import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionCard } from './section-card'

describe('SectionCard', () => {
  it('renders title, description, and children', () => {
    render(
      <SectionCard title="Pegawai" description="Daftar aktif">
        <p>Isi kartu</p>
      </SectionCard>
    )
    expect(screen.getByText('Pegawai')).toBeInTheDocument()
    expect(screen.getByText('Daftar aktif')).toBeInTheDocument()
    expect(screen.getByText('Isi kartu')).toBeInTheDocument()
  })

  it('uses surface card variant by default', () => {
    const { container } = render(<SectionCard title="Judul">Konten</SectionCard>)
    expect(container.querySelector('[data-slot="card"]')).toHaveAttribute('data-variant', 'surface')
  })

  it('renders icon chip and action slot', () => {
    render(
      <SectionCard
        title="Judul"
        icon={<span data-testid="icon">I</span>}
        action={<button type="button">Tambah</button>}
      >
        Konten
      </SectionCard>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Tambah' })).toBeInTheDocument()
  })

  it('renders headerExtra without requiring title', () => {
    render(<SectionCard headerExtra={<dl data-testid="extra">Ringkasan</dl>}>Konten</SectionCard>)
    expect(screen.getByTestId('extra')).toBeInTheDocument()
  })

  it('skips CardContent padding when noPadding is true', () => {
    const { container } = render(
      <SectionCard title="Judul" noPadding>
        <table data-testid="table">
          <tbody>
            <tr>
              <td>A</td>
            </tr>
          </tbody>
        </table>
      </SectionCard>
    )
    expect(container.querySelector('[data-slot="card-content"]')).toBeNull()
    expect(screen.getByTestId('table')).toBeInTheDocument()
  })
})
