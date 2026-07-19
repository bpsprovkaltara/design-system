import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BulkActionBar } from './bulk-action-bar'

describe('BulkActionBar', () => {
  it('renders nothing when nothing is selected', () => {
    const { container } = render(
      <BulkActionBar selectedCount={0} actions={[{ label: 'Aksi', onClick: () => undefined }]} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('announces selection and fires actions', async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    render(
      <BulkActionBar
        selectedCount={3}
        actions={[
          { label: 'Set menunggu', onClick: () => undefined, variant: 'outline' },
          { label: 'Set disetujui', onClick: onApprove },
        ]}
      />
    )
    expect(screen.getByRole('status')).toHaveTextContent('3 dokumen dipilih')
    await user.click(screen.getByRole('button', { name: 'Set disetujui' }))
    expect(onApprove).toHaveBeenCalledOnce()
  })
})
