import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BpsPerformanceCard } from './bps-performance-card'

describe('BpsPerformanceCard', () => {
  it('renders title and id-ID formatted numeric value', () => {
    render(<BpsPerformanceCard title="Total Penduduk" value={728498} />)

    expect(screen.getByText('Total Penduduk')).toBeInTheDocument()
    expect(screen.getByText('728.498')).toBeInTheDocument()
  })

  it('renders unit when provided', () => {
    render(<BpsPerformanceCard title="PDRB Per Kapita" value={48.2} unit="Juta Rupiah" />)

    expect(screen.getByText('Juta Rupiah')).toBeInTheDocument()
  })

  it('renders upward delta with success feedback classes', () => {
    const { container } = render(
      <BpsPerformanceCard
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
      <BpsPerformanceCard
        title="Kemiskinan"
        value={6.1}
        delta={{ value: 0.8, direction: 'down', period: 'dari 2024' }}
      />
    )

    expect(container.querySelector('.text-feedback-danger')).not.toBeNull()
  })

  it('renders target percentage when target is provided', () => {
    render(<BpsPerformanceCard title="Cakupan Sensus" value={80} target={100} />)

    expect(screen.getByText(/80%/)).toBeInTheDocument()
    expect(screen.getByText(/dari target 100/)).toBeInTheDocument()
  })

  it('renders loading skeletons when loading is true', () => {
    const { container } = render(<BpsPerformanceCard title="Memuat" value={0} loading />)

    const skeletons = container.querySelectorAll('[aria-busy="true"]')
    expect(skeletons.length).toBeGreaterThan(0)
    expect(screen.queryByText('Memuat')).not.toBeInTheDocument()
  })

  it('renders sparkline svg when trend has at least 2 points', () => {
    const { container } = render(
      <BpsPerformanceCard title="Tren" value={100} trend={[10, 20, 15, 25, 30]} />
    )

    const polyline = container.querySelector('svg polyline')
    expect(polyline).not.toBeNull()
  })

  it('does not render sparkline when trend has fewer than 2 points', () => {
    const { container } = render(<BpsPerformanceCard title="Tren" value={100} trend={[10]} />)

    expect(container.querySelector('svg polyline')).toBeNull()
  })

  it('applies glass variant classes', () => {
    const { container } = render(
      <BpsPerformanceCard title="Glass" value={1} variant="glass" data-testid="card" />
    )

    const card = container.querySelector('[data-testid="card"]')
    expect(card?.className).toContain('backdrop-blur-md')
  })

  it('applies gradient variant accent bar', () => {
    const { container } = render(
      <BpsPerformanceCard title="Gradient" value={1} variant="gradient" data-testid="card" />
    )

    const card = container.querySelector('[data-testid="card"]')
    expect(card?.className).toContain('border-l-4')
  })
})
