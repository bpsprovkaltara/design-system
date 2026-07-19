import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkipLink } from './skip-link'

describe('SkipLink', () => {
  it('renders accessible skip link targeting main content', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: 'Lewati ke konten utama' })
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('supports custom label and href', () => {
    render(<SkipLink href="#konten" label="Langsung ke isi" />)
    expect(screen.getByRole('link', { name: 'Langsung ke isi' })).toHaveAttribute(
      'href',
      '#konten'
    )
  })
})
