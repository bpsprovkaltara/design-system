import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppShell } from './app-shell'
import { AppTopbar } from './app-topbar'
import { AppSidebar } from './app-sidebar'

const groups = [
  {
    title: 'Menu',
    items: [
      { id: 'home', label: 'Beranda', href: '/' },
      { id: 'docs', label: 'Dokumen', href: '/docs' },
    ],
  },
]

describe('AppTopbar', () => {
  it('renders start and end slots', () => {
    render(<AppTopbar start={<span>Crumb</span>} end={<button type="button">User</button>} />)
    expect(screen.getByText('Crumb')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'User' })).toBeInTheDocument()
  })

  it('falls back to appTitle when no slots', () => {
    render(<AppTopbar appTitle="Menara" />)
    expect(screen.getByText('Menara')).toBeInTheDocument()
  })
})

describe('AppSidebar', () => {
  it('renders nav items and marks active', () => {
    render(<AppSidebar groups={groups} activeId="docs" />)
    expect(screen.getByText('Dokumen')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dokumen' })).toHaveAttribute('aria-current', 'page')
  })

  it('calls onNavigate', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<AppSidebar groups={groups} onNavigate={onNavigate} />)
    await user.click(screen.getByRole('link', { name: 'Beranda' }))
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'home' }))
  })
})

describe('AppShell', () => {
  it('renders main content and desktop sidebar', () => {
    render(
      <AppShell groups={groups} activeId="home" appTitle="App" topbarEnd={<span>End</span>}>
        <p>Konten utama</p>
      </AppShell>
    )
    expect(screen.getByText('Konten utama')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getAllByText('End').length).toBeGreaterThan(0)
  })
})
