import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('calls onStepClick for completed and current steps only', async () => {
    const onStepClick = vi.fn()
    render(<Stepper steps={steps} current={1} onStepClick={onStepClick} />)
    await userEvent.click(screen.getByRole('button', { name: /Draft/i }))
    expect(onStepClick).toHaveBeenCalledWith(0)
    await userEvent.click(screen.getByRole('button', { name: /Verifikasi/i }))
    expect(onStepClick).toHaveBeenCalledWith(1)
    expect(screen.queryByRole('button', { name: /Revisi/i })).not.toBeInTheDocument()
  })

  it('does not render clickable buttons when onStepClick is omitted', () => {
    render(<Stepper steps={steps} current={1} />)
    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })

  it('renders error status from stepErrors on the current step', () => {
    render(<Stepper steps={steps} current={1} stepErrors={[false, true, false, false]} />)
    // Tanpa stepErrors, current=1 menampilkan "02". Dengan error, angka hilang.
    expect(screen.queryByText('02')).not.toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
  })
})
