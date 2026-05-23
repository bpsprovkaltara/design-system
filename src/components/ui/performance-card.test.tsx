import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PerformanceCard } from './performance-card'

describe('PerformanceCard', () => {
  it('renders title and id-ID formatted numeric value', () => {
    render(<PerformanceCard title="Total Penduduk" value={728498} />)

    expect(screen.getByText('Total Penduduk')).toBeInTheDocument()
    expect(screen.getByText('728.498')).toBeInTheDocument()
  })

  it('renders unit when provided', () => {
    render(<PerformanceCard title="PDRB Per Kapita" value={48.2} unit="Juta Rupiah" />)

    expect(screen.getByText('Juta Rupiah')).toBeInTheDocument()
  })

  it('renders upward delta with success feedback classes', () => {
    const { container } = render(
      <PerformanceCard
        title="Inflasi"
        value={2.4}
        delta={{ value: 2.4, direction: 'up', period: 'dari tahun lalu' }}
      />
    )

    expect(screen.getByText('2,4%')).toBeInTheDocument()
    expect(screen.getByText('dari tahun lalu')).toBeInTheDocument()
    expect(container.querySelector('.text-feedback-success')).not.toBeNull()
  })

  it('renders downward delta with danger feedback classes', () => {
    const { container } = render(
      <PerformanceCard
        title="Kemiskinan"
        value={6.1}
        delta={{ value: 0.8, direction: 'down', period: 'dari 2024' }}
      />
    )

    expect(container.querySelector('.text-feedback-danger')).not.toBeNull()
  })

  it('renders target percentage when target is provided', () => {
    render(<PerformanceCard title="Cakupan Sensus" value={80} target={100} />)

    expect(screen.getByText(/80%/)).toBeInTheDocument()
    expect(screen.getByText(/dari target 100/)).toBeInTheDocument()
  })

  it('renders loading skeletons when loading is true', () => {
    const { container } = render(<PerformanceCard title="Memuat" value={0} loading />)

    const skeletons = container.querySelectorAll('[aria-busy="true"]')
    expect(skeletons.length).toBeGreaterThan(0)
    expect(screen.queryByText('Memuat')).not.toBeInTheDocument()
  })

  it('renders sparkline svg when trend has at least 2 points', () => {
    const { container } = render(
      <PerformanceCard title="Tren" value={100} trend={[10, 20, 15, 25, 30]} />
    )

    const polyline = container.querySelector('svg polyline')
    expect(polyline).not.toBeNull()
  })

  it('does not render sparkline when trend has fewer than 2 points', () => {
    const { container } = render(<PerformanceCard title="Tren" value={100} trend={[10]} />)

    expect(container.querySelector('svg polyline')).toBeNull()
  })

  it('applies glass variant classes', () => {
    const { container } = render(
      <PerformanceCard title="Glass" value={1} variant="glass" data-testid="card" />
    )

    const card = container.querySelector('[data-testid="card"]')
    expect(card?.className).toContain('backdrop-blur-md')
  })

  it('applies gradient variant accent bar', () => {
    const { container } = render(
      <PerformanceCard title="Gradient" value={1} variant="gradient" data-testid="card" />
    )

    const card = container.querySelector('[data-testid="card"]')
    expect(card?.className).toContain('border-l-4')
  })
})
