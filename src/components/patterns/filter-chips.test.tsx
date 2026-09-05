import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterChips } from './filter-chips'

describe('FilterChips', () => {
  const items = [
    { href: '/semua', label: 'Semua', active: true },
    { href: '/aktif', label: 'Aktif', active: false },
  ]

  it('renders chip links with accessible group label', () => {
    render(<FilterChips label="Filter status" items={items} />)
    expect(screen.getByRole('group', { name: 'Filter status' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Semua' })).toHaveAttribute('href', '/semua')
    expect(screen.getByRole('link', { name: 'Semua' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Aktif' })).not.toHaveAttribute('aria-current')
  })

  it('shows visible label when showLabel is true', () => {
    render(<FilterChips label="Status" items={items} showLabel />)
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('applies nav variant class on the active chip', () => {
    render(<FilterChips label="Filter" items={items} />)
    expect(screen.getByRole('link', { name: 'Semua' })).toHaveAttribute('data-variant', 'nav')
    expect(screen.getByRole('link', { name: 'Aktif' })).toHaveAttribute('data-variant', 'outline')
  })

  it('uses renderLink for framework routers and keeps aria-current', () => {
    render(
      <FilterChips
        label="Filter"
        items={items}
        renderLink={(item, children) => <a href={`/app${item.href}`}>{children}</a>}
      />
    )
    expect(screen.getByRole('link', { name: 'Semua' })).toHaveAttribute('href', '/app/semua')
    expect(screen.getByRole('link', { name: 'Semua' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Aktif' })).toHaveAttribute('href', '/app/aktif')
  })
})
