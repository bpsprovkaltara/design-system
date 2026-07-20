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

  it('calls onNavigate through a custom link renderer and blocks disabled items', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <AppSidebar
        groups={[
          {
            items: [
              ...groups[0].items,
              { id: 'off', label: 'Disabled', href: '/off', disabled: true },
            ],
          },
        ]}
        onNavigate={onNavigate}
        renderLink={(item, children) => <a href={item.href}>{children}</a>}
      />
    )
    await user.click(screen.getByRole('link', { name: 'Beranda' }))
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'home' }))
    await user.click(screen.getByRole('link', { name: 'Disabled' }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })

  it('renders a dedicated collapsed logo beside the expand control', () => {
    render(
      <AppSidebar
        groups={groups}
        collapsed
        logo={<span>Wide</span>}
        collapsedLogo={<span>Mark</span>}
        onCollapsedChange={() => undefined}
      />
    )
    expect(screen.getByText('Mark')).toBeInTheDocument()
    expect(screen.queryByText('Wide')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buka sidebar' })).toBeInTheDocument()
  })

  it('toggles collapse and activates button items', async () => {
    const user = userEvent.setup()
    const onCollapsedChange = vi.fn()
    const onNavigate = vi.fn()
    render(
      <AppSidebar
        groups={[{ items: [{ id: 'action', label: 'Action' }] }]}
        onCollapsedChange={onCollapsedChange}
        onNavigate={onNavigate}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Tutup sidebar' }))
    expect(onCollapsedChange).toHaveBeenCalledWith(true)
    await user.click(screen.getByRole('button', { name: 'Action' }))
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'action' }))
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

  it('supports md desktop chrome and a separate mobile footer', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <AppShell
        groups={groups}
        desktopBreakpoint="md"
        sidebarFooter={<span>Desktop user</span>}
        mobileSidebarFooter={<span>Mobile user</span>}
      >
        Content
      </AppShell>
    )
    expect(container.querySelector('.md\\:block')).toBeInTheDocument()
    expect(container.querySelector('.md\\:hidden')).toBeInTheDocument()
    expect(screen.getAllByText('Desktop user')).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Buka menu' }))
    expect(screen.getByText('Mobile user')).toBeInTheDocument()
  })

  it('supports uncontrolled desktop collapse', async () => {
    const user = userEvent.setup()
    render(<AppShell groups={groups}>Content</AppShell>)
    await user.click(screen.getByRole('button', { name: 'Tutup sidebar' }))
    expect(screen.getByRole('button', { name: 'Buka sidebar' })).toBeInTheDocument()
  })

  it('closes the mobile sheet and forwards navigation', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <AppShell groups={groups} onNavigate={onNavigate}>
        Content
      </AppShell>
    )
    await user.click(screen.getByRole('button', { name: 'Buka menu' }))
    const homeLinks = screen.getAllByRole('link', { name: 'Beranda' })
    await user.click(homeLinks[homeLinks.length - 1])
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'home' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders mobile-only chrome when the topbar is hidden', () => {
    render(
      <AppShell groups={groups} hideTopbar appTitle="Compact">
        Content
      </AppShell>
    )
    expect(screen.getByText('Compact')).toBeInTheDocument()
  })

  it('allows the mobile footer to be explicitly suppressed', async () => {
    const user = userEvent.setup()
    render(
      <AppShell
        groups={groups}
        sidebarFooter={<span>Desktop only</span>}
        mobileSidebarFooter={null}
      >
        Content
      </AppShell>
    )
    expect(screen.getAllByText('Desktop only')).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Buka menu' }))
    expect(screen.getAllByText('Desktop only')).toHaveLength(1)
  })
})
