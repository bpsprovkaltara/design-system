import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Card } from './card'

describe('Card', () => {
  it('keeps default skin classes when variant is omitted', () => {
    const { container } = render(<Card>Konten</Card>)
    const el = container.querySelector('[data-slot="card"]')
    expect(el).toHaveClass('rounded-xl')
    expect(el).toHaveClass('border-border-default')
    expect(el).toHaveClass('shadow-sm')
    expect(el).not.toHaveClass('rounded-2xl')
    expect(el).not.toHaveClass('shadow-elevation-1')
  })

  it('applies surface skin when variant="surface"', () => {
    const { container } = render(<Card variant="surface">Konten</Card>)
    const el = container.querySelector('[data-slot="card"]')
    expect(el).toHaveClass('rounded-2xl')
    expect(el).toHaveClass('border-border-subtle')
    expect(el).toHaveClass('shadow-elevation-1')
    expect(el).toHaveAttribute('data-variant', 'surface')
  })

  it('merges consumer className with surface variant', () => {
    const { container } = render(
      <Card variant="surface" className="data-testid-card-extra">
        Konten
      </Card>
    )
    const el = container.querySelector('[data-slot="card"]')
    expect(el).toHaveClass('rounded-2xl')
    expect(el).toHaveClass('data-testid-card-extra')
  })
})
