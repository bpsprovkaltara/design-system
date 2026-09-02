import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PageSkeleton } from './page-skeleton'

describe('PageSkeleton', () => {
  it('renders table variant landmarks', () => {
    const { container } = render(<PageSkeleton variant="table" rows={2} cols={3} />)
    expect(container.querySelector('[data-variant="table"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="page-skeleton-header"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="page-skeleton-toolbar"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="page-skeleton-table"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="page-skeleton-pagination"]')).toBeTruthy()
  })

  it('renders cards variant landmarks', () => {
    const { container } = render(<PageSkeleton variant="cards" />)
    expect(container.querySelector('[data-slot="page-skeleton-hero"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="page-skeleton-grid"]')).toBeTruthy()
  })

  it('renders detail variant landmarks', () => {
    const { container } = render(<PageSkeleton variant="detail" />)
    expect(container.querySelector('[data-slot="page-skeleton-summary"]')).toBeTruthy()
    expect(container.querySelector('[data-slot="page-skeleton-list"]')).toBeTruthy()
  })
})
