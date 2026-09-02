import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KpiCard } from './kpi-card'

describe('KpiCard', () => {
  it('keeps left border accent when accent prop is omitted', () => {
    const { container } = render(<KpiCard title="Total" value="100" />)
    expect(container.querySelector('[data-slot="card"]')).toHaveClass('border-l-4')
    expect(container.querySelector('.absolute.inset-x-0.top-0.h-1')).toBeNull()
  })

  it('renders top bar and icon chip when accent is set', () => {
    const { container } = render(
      <KpiCard title="Sukses" value="42" accent="success" icon={<span data-testid="ico">★</span>} />
    )
    expect(container.querySelector('.absolute.inset-x-0.top-0.h-1')).toHaveClass(
      'bg-feedback-success'
    )
    expect(screen.getByTestId('ico').parentElement).toHaveClass('bg-feedback-success-bg')
    expect(container.querySelector('[data-slot="card"]')).not.toHaveClass('border-l-4')
  })
})
