import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LinkButton } from './link-button'

describe('LinkButton', () => {
  it('renders an anchor with href', () => {
    render(
      <LinkButton href="/dokumen/1" variant="outline">
        Buka dokumen
      </LinkButton>
    )
    const link = screen.getByRole('link', { name: 'Buka dokumen' })
    expect(link).toHaveAttribute('href', '/dokumen/1')
  })

  it('supports asChild composition', () => {
    render(
      <LinkButton asChild variant="default">
        <a href="/custom">Custom link</a>
      </LinkButton>
    )
    expect(screen.getByRole('link', { name: 'Custom link' })).toHaveAttribute('href', '/custom')
  })
})
