import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible'

function Example(props: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger>Detail</CollapsibleTrigger>
      <CollapsibleContent>Isi detail</CollapsibleContent>
    </Collapsible>
  )
}

describe('Collapsible', () => {
  it('exposes data-slot on root, trigger, and content', () => {
    const { container } = render(<Example defaultOpen />)
    expect(container.querySelector('[data-slot="collapsible"]')).not.toBeNull()
    expect(screen.getByRole('button', { name: 'Detail' })).toHaveAttribute(
      'data-slot',
      'collapsible-trigger'
    )
    expect(screen.getByText('Isi detail')).toHaveAttribute('data-slot', 'collapsible-content')
  })

  it('is closed by default and toggles via trigger click', async () => {
    const user = userEvent.setup()
    render(<Example />)
    const trigger = screen.getByRole('button', { name: 'Detail' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Isi detail')).toBeNull()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Isi detail')).toBeInTheDocument()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Isi detail')).toBeNull()
  })

  it('toggles with keyboard (Enter and Space)', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.tab()
    expect(screen.getByRole('button', { name: 'Detail' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Isi detail')).toBeInTheDocument()
    await user.keyboard(' ')
    expect(screen.queryByText('Isi detail')).toBeNull()
  })

  it('supports controlled open and reports changes', async () => {
    const user = userEvent.setup()
    const changes: boolean[] = []
    render(<Example open={false} onOpenChange={(o) => changes.push(o)} />)
    await user.click(screen.getByRole('button', { name: 'Detail' }))
    expect(changes).toEqual([true])
    expect(screen.queryByText('Isi detail')).toBeNull()
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    render(<Example disabled />)
    const trigger = screen.getByRole('button', { name: 'Detail' })
    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(screen.queryByText('Isi detail')).toBeNull()
  })

  it('supports asChild on the trigger', async () => {
    const user = userEvent.setup()
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <a href="#x" role="button">
            Buka
          </a>
        </CollapsibleTrigger>
        <CollapsibleContent>Isi</CollapsibleContent>
      </Collapsible>
    )
    await user.click(screen.getByRole('button', { name: 'Buka' }))
    expect(screen.getByText('Isi')).toBeInTheDocument()
  })
})
