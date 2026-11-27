import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageSkeleton } from '@/components/patterns/page-skeleton'
import { PerformanceCard } from '@/components/ui/performance-card'
import { Skeleton } from '@/components/ui/skeleton'

describe('Loading semantics (#30)', () => {
  it('hides decorative skeletons without a prohibited generic label', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
    expect(container.firstChild).not.toHaveAttribute('aria-label')
  })

  it.each(['table', 'cards', 'detail'] as const)(
    'announces one status for the %s page',
    (variant) => {
      const { container } = render(<PageSkeleton variant={variant} />)
      expect(screen.getByRole('status', { name: 'Memuat halaman...' })).toBeInTheDocument()
      expect(screen.getAllByRole('status')).toHaveLength(1)
      for (const skeleton of container.querySelectorAll('[data-slot="skeleton"]')) {
        expect(skeleton).toHaveAttribute('aria-hidden', 'true')
        expect(skeleton).not.toHaveAttribute('aria-label')
      }
    }
  )

  it('replaces the card loading status with the actual content', () => {
    const { rerender } = render(<PerformanceCard title="Penduduk" value={123} loading />)
    expect(screen.getByRole('status', { name: 'Memuat Penduduk...' })).toBeInTheDocument()
    rerender(<PerformanceCard title="Penduduk" value={123} />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByText('Penduduk')).toBeVisible()
    expect(screen.getByText('123')).toBeVisible()
  })
})
