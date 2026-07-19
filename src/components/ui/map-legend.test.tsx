import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MapLegend } from './map-legend'

describe('MapLegend', () => {
  it('renders default tiers and title', () => {
    render(<MapLegend />)
    expect(screen.getByRole('group', { name: 'Legenda peta' })).toBeInTheDocument()
    expect(screen.getByText('Sangat tinggi')).toBeInTheDocument()
    expect(screen.getByText('Wilayah aktif')).toBeInTheDocument()
  })

  it('renders custom items', () => {
    render(
      <MapLegend
        title="Kepadatan"
        items={[
          { tier: 1, label: 'Jarang' },
          { tier: 5, label: 'Padat' },
        ]}
      />
    )
    expect(screen.getByRole('group', { name: 'Kepadatan' })).toBeInTheDocument()
    expect(screen.getByText('Jarang')).toBeInTheDocument()
    expect(screen.getByText('Padat')).toBeInTheDocument()
  })
})
