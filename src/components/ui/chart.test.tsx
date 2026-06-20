import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sparkline, BarChart } from './chart'

describe('Sparkline', () => {
  it('renders a polyline with one point per datum when given 2+ points', () => {
    const { container } = render(<Sparkline data={[1, 5, 2, 8, 4]} />)
    const polyline = container.querySelector('polyline')
    expect(polyline).toBeInTheDocument()
    expect(polyline?.getAttribute('points')?.trim().split(' ')).toHaveLength(5)
  })

  it('renders nothing when given fewer than 2 points', () => {
    const { container } = render(<Sparkline data={[1]} />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })
})

describe('BarChart', () => {
  const data = [
    { label: 'Tarakan', value: 24500 },
    { label: 'Nunukan', value: 15200 },
  ]

  it('renders a label for each item', () => {
    render(<BarChart data={data} />)
    expect(screen.getByText('Tarakan')).toBeInTheDocument()
    expect(screen.getByText('Nunukan')).toBeInTheDocument()
  })

  it('formats values with id-ID separators by default', () => {
    render(<BarChart data={data} />)
    expect(screen.getByText('24.500')).toBeInTheDocument()
    expect(screen.getByText('15.200')).toBeInTheDocument()
  })

  it('hides values when showValues is false', () => {
    render(<BarChart data={data} showValues={false} />)
    expect(screen.queryByText('24.500')).not.toBeInTheDocument()
  })

  it('renders nothing when data is empty', () => {
    const { container } = render(<BarChart data={[]} />)
    expect(container.querySelector('[role="img"]')).not.toBeInTheDocument()
  })
})
