import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KpiCard } from './kpi-card'

describe('KpiCard', () => {
  it('renders title, value, and helper', () => {
    render(<KpiCard title="Responden" value="1.240" helper="+8% bulan ini" />)
    expect(screen.getByText('Responden')).toBeInTheDocument()
    expect(screen.getByText('1.240')).toBeInTheDocument()
    expect(screen.getByText('+8% bulan ini')).toBeInTheDocument()
  })
})
