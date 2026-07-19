import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './status-badge'

describe('StatusBadge', () => {
  it.each(['draft', 'pending', 'revised', 'approved'] as const)('renders %s variant', (variant) => {
    render(<StatusBadge variant={variant}>{variant}</StatusBadge>)
    expect(screen.getByText(variant)).toBeInTheDocument()
  })

  it('renders children text', () => {
    render(<StatusBadge variant="approved">Disetujui</StatusBadge>)
    expect(screen.getByText('Disetujui')).toBeInTheDocument()
  })

  it('applies custom tone color for app-defined domain statuses', () => {
    render(<StatusBadge tone="217 91% 60%">Prioritas Tinggi</StatusBadge>)
    const badge = screen.getByText('Prioritas Tinggi')
    expect(badge).toHaveStyle({ color: 'hsl(217 91% 60%)' })
    expect(badge).toHaveStyle({ backgroundColor: 'hsl(217 91% 60% / 0.12)' })
  })
})
