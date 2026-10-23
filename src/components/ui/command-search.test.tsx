import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommandSearch } from './command-search'
import { CommandGroup, CommandItem } from './command'

describe('CommandSearch', () => {
  it('shows the results panel once the query is non-empty', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <CommandSearch value="" onValueChange={onValueChange} placeholder="Cari…">
        <CommandGroup heading="Halaman">
          <CommandItem value="dashboard">Dashboard</CommandItem>
        </CommandGroup>
      </CommandSearch>
    )

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()

    await user.type(screen.getByPlaceholderText('Cari…'), 'das')
    expect(onValueChange).toHaveBeenCalled()
  })

  it('renders panel content when open is forced and lists items', () => {
    render(
      <CommandSearch value="das" open placeholder="Cari…">
        <CommandGroup heading="Halaman">
          <CommandItem value="dashboard">Dashboard</CommandItem>
        </CommandGroup>
      </CommandSearch>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Halaman')).toBeInTheDocument()
  })

  it('shows loading empty copy when loading and open', () => {
    render(
      <CommandSearch value="abc" open loading placeholder="Cari…">
        {null}
      </CommandSearch>
    )

    expect(screen.getByText('Mencari…')).toBeInTheDocument()
  })

  it('focuses the input on Meta+K', async () => {
    const user = userEvent.setup()
    render(
      <CommandSearch value="" onValueChange={vi.fn()} placeholder="Cari…">
        {null}
      </CommandSearch>
    )

    const input = screen.getByPlaceholderText('Cari…')
    expect(input).not.toHaveFocus()
    await user.keyboard('{Meta>}k{/Meta}')
    expect(input).toHaveFocus()
  })

  function renderUncontrolled(onOpenChange?: (open: boolean) => void) {
    return render(
      <CommandSearch defaultValue="" placeholder="Cari…" onOpenChange={onOpenChange}>
        <CommandGroup heading="Halaman">
          <CommandItem value="dashboard">Dashboard</CommandItem>
        </CommandGroup>
      </CommandSearch>
    )
  }

  it('closes the uncontrolled panel on Escape', async () => {
    const user = userEvent.setup()
    renderUncontrolled()
    await user.type(screen.getByPlaceholderText('Cari…'), 'das')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('closes the uncontrolled panel on blur', async () => {
    const user = userEvent.setup()
    renderUncontrolled()
    await user.type(screen.getByPlaceholderText('Cari…'), 'das')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    await user.click(document.body)
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('reopens after typing again', async () => {
    const user = userEvent.setup()
    renderUncontrolled()
    const input = screen.getByPlaceholderText('Cari…')
    await user.type(input, 'das')
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    await user.click(input)
    await user.type(input, 'h')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('calls onOpenChange(false) on Escape', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    renderUncontrolled(onOpenChange)
    await user.type(screen.getByPlaceholderText('Cari…'), 'das')
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })
})
