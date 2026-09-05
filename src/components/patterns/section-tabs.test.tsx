import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { resolveActiveTab, SectionTabs, type SectionTab } from './section-tabs'

const PEGAWAI_TABS: SectionTab[] = [
  { href: '/pegawai', label: 'Daftar' },
  { href: '/pegawai/status-data', label: 'Status data' },
  {
    href: '/pegawai/peta',
    label: 'Peta jabatan',
    matchPrefixes: ['/pegawai/formasi'],
  },
]

describe('resolveActiveTab', () => {
  it('picks the longest matching prefix so sibling routes do not double-activate', () => {
    expect(resolveActiveTab('/pegawai/status-data', PEGAWAI_TABS)).toBe('/pegawai/status-data')
    expect(resolveActiveTab('/pegawai', PEGAWAI_TABS)).toBe('/pegawai')
    expect(resolveActiveTab('/pegawai/42', PEGAWAI_TABS)).toBe('/pegawai')
  })

  it('honours matchPrefixes for routes outside the tab href nest', () => {
    expect(resolveActiveTab('/pegawai/formasi/9', PEGAWAI_TABS)).toBe('/pegawai/peta')
  })

  it('returns undefined when nothing matches', () => {
    expect(resolveActiveTab('/lain', PEGAWAI_TABS)).toBeUndefined()
  })
})

describe('SectionTabs', () => {
  it('marks the active tab with aria-current and exposes the group label', () => {
    render(
      <SectionTabs
        label="Navigasi kepegawaian"
        pathname="/pegawai/status-data"
        tabs={PEGAWAI_TABS}
      />
    )

    expect(screen.getByRole('navigation', { name: 'Navigasi kepegawaian' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Status data' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: 'Daftar' })).not.toHaveAttribute('aria-current')
  })

  it('uses renderLink when provided and still applies active styling', () => {
    render(
      <SectionTabs
        label="Modul"
        pathname="/pegawai"
        tabs={PEGAWAI_TABS}
        renderLink={(tab, children) => <a href={`/app${tab.href}`}>{children}</a>}
      />
    )

    const daftar = screen.getByRole('link', { name: 'Daftar' })
    expect(daftar).toHaveAttribute('href', '/app/pegawai')
    expect(daftar).toHaveAttribute('aria-current', 'page')
    expect(daftar.className).toMatch(/bg-background/)
  })
})
