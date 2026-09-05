import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SidebarAccount } from './sidebar-account'

describe('SidebarAccount', () => {
  it('renders name, role, and actions when expanded', () => {
    render(
      <SidebarAccount
        name="Ahmad Fauzi"
        roleLabel="Admin"
        initials="AF"
        actions={<button type="button">Keluar</button>}
      />
    )

    expect(screen.getByText('Ahmad Fauzi')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('AF')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keluar' })).toBeInTheDocument()
  })

  it('hides name and role text when collapsed and keeps avatar', () => {
    render(
      <SidebarAccount
        name="Ahmad Fauzi"
        roleLabel="Admin"
        initials="AF"
        collapsed
        collapsedActions={<button type="button" aria-label="Keluar" />}
      />
    )

    expect(screen.queryByText('Ahmad Fauzi')).not.toBeInTheDocument()
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.getByText('AF')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Keluar' })).toBeInTheDocument()
  })

  it('renders leading slot content such as a role switcher', () => {
    render(
      <SidebarAccount name="Ahmad" initials="A" leading={<div>Pilih peran</div>} />
    )

    expect(screen.getByText('Pilih peran')).toBeInTheDocument()
  })
})
