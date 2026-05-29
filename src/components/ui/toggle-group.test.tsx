import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ToggleGroup, ToggleGroupItem } from './toggle-group'

describe('ToggleGroup', () => {
  it('selects a single item', async () => {
    const onValueChange = vi.fn()
    render(
      <ToggleGroup type="single" onValueChange={onValueChange} aria-label="Perataan">
        <ToggleGroupItem value="left">Kiri</ToggleGroupItem>
        <ToggleGroupItem value="right">Kanan</ToggleGroupItem>
      </ToggleGroup>
    )

    await userEvent.click(screen.getByRole('radio', { name: 'Kiri' }))
    expect(onValueChange).toHaveBeenCalledWith('left')
  })

  it('supports multiple item selection', async () => {
    const onValueChange = vi.fn()
    render(
      <ToggleGroup type="multiple" onValueChange={onValueChange} aria-label="Format">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>
    )

    await userEvent.click(screen.getByRole('button', { name: 'Bold' }))
    expect(onValueChange).toHaveBeenCalledWith(['bold'])
  })
})
