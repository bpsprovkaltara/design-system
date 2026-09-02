import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BadgeTooltip } from './badge-tooltip'
import { Badge } from './badge'

describe('BadgeTooltip', () => {
  it('renders children without tooltip wrapper when content is empty', () => {
    const { container } = render(
      <BadgeTooltip content="">
        <Badge>Draft</Badge>
      </BadgeTooltip>
    )
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="tooltip-provider"]')).toBeNull()
  })

  it('wraps children with tooltip provider when content is set', async () => {
    render(
      <BadgeTooltip content="Menunggu verifikasi atasan">
        <Badge>Pending</Badge>
      </BadgeTooltip>
    )
    expect(screen.getByText('Pending')).toBeInTheDocument()
    await userEvent.hover(screen.getByText('Pending'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Menunggu verifikasi atasan')
  })
})
