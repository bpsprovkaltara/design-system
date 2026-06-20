import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stepper } from './stepper'

const steps = [
  { label: 'Draft', description: 'Pengisian awal' },
  { label: 'Verifikasi' },
  { label: 'Revisi' },
  { label: 'Disetujui' },
]

describe('Stepper', () => {
  it('renders every step label', () => {
    render(<Stepper steps={steps} current={1} />)
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.getByText('Verifikasi')).toBeInTheDocument()
    expect(screen.getByText('Revisi')).toBeInTheDocument()
    expect(screen.getByText('Disetujui')).toBeInTheDocument()
  })

  it('exposes an accessible nav landmark', () => {
    render(<Stepper steps={steps} current={1} />)
    expect(screen.getByRole('navigation', { name: 'Langkah pengisian' })).toBeInTheDocument()
  })

  it('marks exactly one step with aria-current="step"', () => {
    const { container } = render(<Stepper steps={steps} current={1} />)
    expect(container.querySelectorAll('[aria-current="step"]')).toHaveLength(1)
  })

  it('shows a number for current/upcoming and a check (no number) for complete', () => {
    render(<Stepper steps={steps} current={1} />)
    // index 0 is complete -> renders a check, not "01"
    expect(screen.queryByText('01')).not.toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
  })

  it('honors explicit per-step statuses (error renders no number)', () => {
    render(
      <Stepper steps={steps} current={2} statuses={['complete', 'error', 'current', 'upcoming']} />
    )
    // index 1 is error -> renders an alert icon, not "02"
    expect(screen.queryByText('02')).not.toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
  })

  it('renders an optional step description', () => {
    render(<Stepper steps={steps} current={1} />)
    expect(screen.getByText('Pengisian awal')).toBeInTheDocument()
  })
})
