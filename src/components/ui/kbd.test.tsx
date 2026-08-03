import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Kbd } from './kbd'

describe('Kbd', () => {
  it('renders a <kbd> element with its children', () => {
    render(<Kbd>⌘K</Kbd>)
    const el = screen.getByText('⌘K')
    expect(el.tagName).toBe('KBD')
  })

  it('exposes data-slot and merges className', () => {
    render(<Kbd className="ml-2">⏎</Kbd>)
    const el = screen.getByText('⏎')
    expect(el).toHaveAttribute('data-slot', 'kbd')
    expect(el.className).toContain('ml-2')
    expect(el.className).toContain('font-mono')
  })

  it('passes through native kbd attributes', () => {
    render(
      <Kbd aria-label="Tombol Enter" title="Enter">
        ⏎
      </Kbd>
    )
    const el = screen.getByText('⏎')
    expect(el).toHaveAttribute('aria-label', 'Tombol Enter')
    expect(el).toHaveAttribute('title', 'Enter')
  })
})
