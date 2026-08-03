import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from './command'

describe('CommandDialog — BUG 1 (Radix Dialog accessibility)', () => {
  it('links aria-labelledby on the dialog to the DialogTitle', () => {
    render(
      <CommandDialog open title="Palet Perintah" description="Cari aksi">
        <CommandList>
          <CommandEmpty>Tidak ada</CommandEmpty>
        </CommandList>
      </CommandDialog>
    )

    const dialog = screen.getByRole('dialog')
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()

    const titleEl = document.getElementById(labelledBy!)
    expect(titleEl).not.toBeNull()
    expect(titleEl!).toHaveTextContent('Palet Perintah')
  })

  it('renders DialogTitle and DialogDescription inside the dialog subtree', () => {
    render(
      <CommandDialog open title="Palet" description="Keterangan palet">
        <CommandList>
          <CommandEmpty>kosong</CommandEmpty>
        </CommandList>
      </CommandDialog>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('Palet')
    expect(dialog).toHaveTextContent('Keterangan palet')
  })
})

describe('CommandDialog — BUG 3 (cmdk props passthrough)', () => {
  it('disables client filtering when shouldFilter is false', async () => {
    const user = userEvent.setup()
    render(
      <CommandDialog open commandProps={{ shouldFilter: false }}>
        <CommandInput placeholder="cari-nip" />
        <CommandList>
          <CommandEmpty>tidak ada</CommandEmpty>
          <CommandItem value="001">Budi Santoso</CommandItem>
          <CommandItem value="002">Sari Wijaya</CommandItem>
        </CommandList>
      </CommandDialog>
    )

    await user.type(screen.getByPlaceholderText('cari-nip'), 'zzz')

    // shouldFilter=false → cmdk tidak membuang item, semua tetap tampil
    expect(screen.getByText('Budi Santoso')).toBeInTheDocument()
    expect(screen.getByText('Sari Wijaya')).toBeInTheDocument()
    expect(screen.queryByText('tidak ada')).not.toBeInTheDocument()
  })

  it('filters client-side by default (control regression)', async () => {
    const user = userEvent.setup()
    render(
      <CommandDialog open>
        <CommandInput placeholder="cari-nip" />
        <CommandList>
          <CommandEmpty>tidak ada</CommandEmpty>
          <CommandItem>Budi</CommandItem>
          <CommandItem>Sari</CommandItem>
        </CommandList>
      </CommandDialog>
    )

    await user.type(screen.getByPlaceholderText('cari-nip'), 'zzz')

    expect(screen.getByText('tidak ada')).toBeInTheDocument()
    expect(screen.queryByText('Budi')).not.toBeInTheDocument()
    expect(screen.queryByText('Sari')).not.toBeInTheDocument()
  })
})

describe('Command — BUG 4 (dialog/inline variant)', () => {
  it('defaults to dialog variant with h-full and overflow-hidden', () => {
    const { container } = render(<Command />)
    const root = container.querySelector('[data-slot=command]')!
    expect(root.className).toContain('h-full')
    expect(root.className).toContain('overflow-hidden')
    expect(root).toHaveAttribute('data-variant', 'dialog')
  })

  it('inline variant drops h-full and overflow-hidden', () => {
    const { container } = render(<Command variant="inline" />)
    const root = container.querySelector('[data-slot=command]')!
    expect(root.className).not.toContain('h-full')
    expect(root.className).not.toContain('overflow-hidden')
    expect(root).toHaveAttribute('data-variant', 'inline')
  })
})

describe('CommandInput — BUG 2 (height) & BUG 5 (focus indicator)', () => {
  // CommandPrimitive.Input butuh konteks <Command>; bungkus di semua kasus.
  function renderInput(props?: React.ComponentProps<typeof CommandInput>) {
    return render(
      <Command>
        <CommandInput placeholder="cari" {...props} />
      </Command>
    )
  }

  it('keeps wrapper at h-9 and input height-bound to wrapper', () => {
    const { container } = renderInput()
    const wrapper = container.querySelector('[data-slot=command-input-wrapper]')!
    const input = container.querySelector('[data-slot=command-input]')!

    expect(wrapper.className).toContain('h-9')
    // input tidak boleh punya tinggi mandiri yang lebih tinggi dari wrapper
    expect(input.className).not.toContain('h-10')
    expect(input.className).toContain('h-full')
  })

  it('does not lock focus indicator with !important', () => {
    const { container } = renderInput()
    const input = container.querySelector('[data-slot=command-input]')!
    expect(input.className).not.toMatch(/!outline-none/)
    expect(input.className).not.toMatch(/!important/)
    expect(input.className).not.toMatch(/focus-visible:shadow-/)
  })

  it('exposes wrapperClassName and moves the focus ring onto the wrapper', () => {
    const { container } = renderInput({ wrapperClassName: 'consumer-wrap' })
    const wrapper = container.querySelector('[data-slot=command-input-wrapper]')!
    expect(wrapper.className).toContain('consumer-wrap')
    expect(wrapper.className).toMatch(/has-\[:focus-visible\]:ring/)
  })

  it('keeps className applying to the input (backward compat)', () => {
    const { container } = renderInput({ className: 'consumer-input' })
    const input = container.querySelector('[data-slot=command-input]')!
    expect(input.className).toContain('consumer-input')
  })
})

describe('CommandDialog — smoke', () => {
  it('renders children inside the dialog', () => {
    render(
      <CommandDialog open>
        <CommandList>
          <CommandGroupStub />
        </CommandList>
      </CommandDialog>
    )
    expect(screen.getByText('Item Demo')).toBeInTheDocument()
  })
})

function CommandGroupStub() {
  return <CommandItem>Item Demo</CommandItem>
}
