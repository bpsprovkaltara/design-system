import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BpsDataStatePanel } from './bps-data-state-panel'

describe('BpsDataStatePanel', () => {
  it('renders child content when state is ready', () => {
    render(
      <BpsDataStatePanel state="ready">
        <div>Isi data</div>
      </BpsDataStatePanel>
    )

    expect(screen.getByText('Isi data')).toBeInTheDocument()
  })

  it('calls retry handler in error state', async () => {
    const onRetry = vi.fn()
    render(<BpsDataStatePanel state="error" onRetry={onRetry} />)

    await userEvent.click(screen.getByRole('button', { name: 'Coba lagi' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
