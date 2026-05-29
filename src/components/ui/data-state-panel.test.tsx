import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataStatePanel } from './data-state-panel'

describe('DataStatePanel', () => {
  it('renders child content when state is ready', () => {
    render(
      <DataStatePanel state="ready">
        <div>Isi data</div>
      </DataStatePanel>
    )

    expect(screen.getByText('Isi data')).toBeInTheDocument()
  })

  it('calls retry handler in error state', async () => {
    const onRetry = vi.fn()
    render(<DataStatePanel state="error" onRetry={onRetry} />)

    await userEvent.click(screen.getByRole('button', { name: 'Coba lagi' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
