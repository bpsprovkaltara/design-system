import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Link } from 'react-router-dom'
import { RowDetailLink } from './row-detail-link'

describe('RowDetailLink', () => {
  it('renders an accessible icon link with required label', () => {
    render(<RowDetailLink href="/pegawai/1" label="Detail pegawai Andi Pratama" />)
    const link = screen.getByRole('link', { name: 'Detail pegawai Andi Pratama' })
    expect(link).toHaveAttribute('href', '/pegawai/1')
    expect(link).toHaveAttribute('title', 'Detail pegawai Andi Pratama')
  })

  it('defaults to ghost icon-sm button chrome', () => {
    render(<RowDetailLink href="/x" label="Detail baris X" />)
    const link = screen.getByRole('link', { name: 'Detail baris X' })
    expect(link).toHaveAttribute('data-variant', 'ghost')
    expect(link).toHaveAttribute('data-size', 'icon-sm')
  })

  it('supports asChild for framework Link (e.g. React Router)', () => {
    render(
      <MemoryRouter>
        <RowDetailLink label="Detail via router" asChild>
          <Link to="/pegawai/2" />
        </RowDetailLink>
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: 'Detail via router' })
    expect(link).toHaveAttribute('href', '/pegawai/2')
    expect(link).toHaveAttribute('title', 'Detail via router')
  })
})
