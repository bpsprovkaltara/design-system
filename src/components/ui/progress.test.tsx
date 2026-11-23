import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from './progress'

describe('Progress', () => {
  it('forwards value to the accessible progressbar', () => {
    render(<Progress value={70} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '70')
  })

  it('clamps the indicator transform between 0 and 100', () => {
    const { rerender, container } = render(<Progress value={150} />)
    const indicator = () =>
      container.querySelector('[data-slot="progress-indicator"]') as HTMLElement
    expect(indicator().style.transform).toBe('translateX(-0%)')
    rerender(<Progress value={-20} />)
    expect(indicator().style.transform).toBe('translateX(-100%)')
  })
})
