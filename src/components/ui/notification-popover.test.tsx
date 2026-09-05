import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NotificationPopover } from './notification-popover'

describe('NotificationPopover', () => {
  it('shows unread badge and opens a panel with title', async () => {
    const user = userEvent.setup()
    render(
      <NotificationPopover unreadCount={3}>
        <p>Item notifikasi</p>
      </NotificationPopover>
    )

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.queryByText('Item notifikasi')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Notifikasi' }))
    expect(screen.getByText('Notifikasi')).toBeInTheDocument()
    expect(screen.getByText('Item notifikasi')).toBeInTheDocument()
  })

  it('renders empty state when there are no children and not loading', async () => {
    const user = userEvent.setup()
    render(<NotificationPopover unreadCount={0} empty={<p>Belum ada notifikasi</p>} />)

    await user.click(screen.getByRole('button', { name: 'Notifikasi' }))
    expect(screen.getByText('Belum ada notifikasi')).toBeInTheDocument()
    expect(screen.queryByText('99+')).not.toBeInTheDocument()
  })

  it('caps the badge at 99+ and invokes onMarkAllRead', async () => {
    const user = userEvent.setup()
    const onMarkAllRead = vi.fn()
    render(
      <NotificationPopover unreadCount={120} onMarkAllRead={onMarkAllRead}>
        <p>Ada isi</p>
      </NotificationPopover>
    )

    expect(screen.getByText('99+')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Notifikasi' }))
    await user.click(screen.getByRole('button', { name: 'Tandai semua dibaca' }))
    expect(onMarkAllRead).toHaveBeenCalledTimes(1)
  })
})
