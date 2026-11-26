import { describe, it, expect, vi } from 'vitest'
import { act, render, screen, within } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
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

  it('swaps in the compact brand mark when collapsed', () => {
    render(
      <AppSidebar
        groups={groups}
        collapsed
        logo={<span>Wide</span>}
        collapsedLogo={<span>Mark</span>}
      />
    )
    expect(screen.getByText('Mark')).toBeInTheDocument()
    expect(screen.queryByText('Wide')).not.toBeInTheDocument()
  })

  it('activates button items', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <AppSidebar
        groups={[{ items: [{ id: 'action', label: 'Action' }] }]}
        onNavigate={onNavigate}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Action' }))
    expect(onNavigate).toHaveBeenCalledWith(expect.objectContaining({ id: 'action' }))
  })

  it('styles the rendered link itself so the hit area covers the whole row', () => {
    render(
      <AppSidebar
        groups={groups}
        activeId="docs"
        renderLink={(item, children) => <a href={item.href}>{children}</a>}
      />
    )
    const link = screen.getByRole('link', { name: 'Dokumen' })
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).toHaveAttribute('data-active', 'true')
    expect(link.className).toContain('w-full')
  })

  it('labels collapsed rail items with a tooltip trigger', () => {
    render(<AppSidebar groups={groups} collapsed />)
    expect(screen.getByRole('link', { name: 'Dokumen' })).toHaveAttribute(
      'data-slot',
      'tooltip-trigger'
    )
  })
})

describe('AppShell', () => {
  it('hydrates a collapsed server rail without replacing its landmarks', async () => {
    const view = (
      <AppShell groups={groups} defaultCollapsed>
        Isi server
      </AppShell>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(view)
    document.body.appendChild(container)
    const main = within(container).getByRole('main', { name: 'Konten utama' })
    const rail = within(container).getByRole('complementary', { name: 'Navigasi utama' })
    expect(within(container).getByRole('button', { name: 'Buka sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    const errors: unknown[] = []
    let root: ReturnType<typeof hydrateRoot> | undefined
    try {
      await act(async () => {
        root = hydrateRoot(container, view, { onRecoverableError: (error) => errors.push(error) })
      })
      expect(errors).toEqual([])
      expect(within(container).getByRole('main', { name: 'Konten utama' })).toBe(main)
      expect(within(container).getByRole('complementary', { name: 'Navigasi utama' })).toBe(rail)
      const user = userEvent.setup()
      await user.click(within(container).getByRole('button', { name: 'Buka sidebar' }))
      expect(within(container).getByRole('button', { name: 'Tutup sidebar' })).toHaveAttribute(
        'aria-expanded',
        'true'
      )
    } finally {
      await act(async () => root?.unmount())
      container.remove()
    }
  })

  it('leaves controlled collapse to its parent across keyboard activation and rerenders', async () => {
    const user = userEvent.setup()
    const onCollapsedChange = vi.fn()
    const { rerender } = render(
      <AppShell groups={groups} collapsed onCollapsedChange={onCollapsedChange}>
        Isi
      </AppShell>
    )
    screen.getByRole('button', { name: 'Buka sidebar' }).focus()
    await user.keyboard('{Enter}')
    expect(onCollapsedChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole('button', { name: 'Buka sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    rerender(
      <AppShell groups={groups} collapsed={false} onCollapsedChange={onCollapsedChange}>
        Isi
      </AppShell>
    )
    expect(screen.getByRole('button', { name: 'Tutup sidebar' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })
  it('puts the named main scroll region in the keyboard tab order (#33)', async () => {
    const user = userEvent.setup()
    render(
      <>
        <AppShell groups={[]}>
          <p>Grafik tanpa kontrol</p>
        </AppShell>
        <button>Setelah shell</button>
      </>
    )
    await user.click(screen.getByRole('button', { name: 'Setelah shell' }))
    await user.tab({ shift: true })
    const main = screen.getByRole('main', { name: 'Konten utama' })
    expect(main).toHaveFocus()
    expect(screen.getByRole('link', { name: 'Lewati ke konten utama' })).toHaveAttribute(
      'href',
      `#${main.id}`
    )
  })

  it('renders main content and desktop sidebar', () => {
    render(
      <AppShell groups={groups} activeId="home" appTitle="App" topbarEnd={<span>End</span>}>
        <p>Konten utama</p>
      </AppShell>
    )
    expect(screen.getByText('Konten utama')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    // One topbar, not one per breakpoint — a duplicated banner also duplicates
    // every data-fetching widget dropped into `topbarEnd`.
    expect(screen.getAllByText('End')).toHaveLength(1)
    expect(screen.getAllByRole('banner')).toHaveLength(1)
  })

  it('points the collapse toggle at the sidebar it controls', async () => {
    const user = userEvent.setup()
    render(<AppShell groups={groups}>Content</AppShell>)
    const toggle = screen.getByRole('button', { name: 'Tutup sidebar' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById(toggle.getAttribute('aria-controls')!)).toHaveAttribute(
      'data-slot',
      'app-sidebar'
    )
    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Buka sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
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
