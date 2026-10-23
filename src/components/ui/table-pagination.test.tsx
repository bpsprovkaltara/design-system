import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TablePagination } from './table-pagination'

describe('TablePagination', () => {
  it('shows the row range summary', () => {
    render(<TablePagination page={2} pageSize={10} total={45} onPageChange={vi.fn()} />)
    expect(screen.getByText('Menampilkan 11–20 dari 45')).toBeInTheDocument()
  })

  it('hides page controls when everything fits on one page', () => {
    render(<TablePagination page={1} pageSize={10} total={5} onPageChange={vi.fn()} />)
    expect(screen.getByText('Menampilkan 1–5 dari 5')).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('calls onPageChange in client-side mode', async () => {
    const onPageChange = vi.fn()
    render(<TablePagination page={1} pageSize={10} total={30} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('link', { name: '2' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('renders real hrefs in SSR/link mode via hrefForPage', () => {
    render(
      <TablePagination
        page={1}
        pageSize={10}
        total={30}
        hrefForPage={(page) => `/data?page=${page}`}
      />
    )
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/data?page=2')
  })

  it('delegates to renderLink when provided', () => {
    render(
      <TablePagination
        page={1}
        pageSize={10}
        total={30}
        hrefForPage={(page) => `/data?page=${page}`}
        renderLink={(props) => <a data-testid={`page-${props.children}`} {...props} />}
      />
    )
    expect(screen.getByTestId('page-2')).toHaveAttribute('href', '/data?page=2')
  })

  it('can hide the complete footer for a single page', () => {
    const { container } = render(
      <TablePagination page={1} pageSize={10} total={5} hideWhenSinglePage />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('previous is inert on the first page', async () => {
    // Bypass the pointer-events-none class to prove the control itself has no handler.
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const onPageChange = vi.fn()
    render(<TablePagination page={1} pageSize={10} total={30} onPageChange={onPageChange} />)
    const prev = screen.getByLabelText('Halaman sebelumnya')
    expect(prev).not.toHaveAttribute('href')
    expect(prev).toHaveAttribute('aria-disabled', 'true')
    await user.click(prev)
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('next is inert on the last page', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    const onPageChange = vi.fn()
    render(<TablePagination page={3} pageSize={10} total={30} onPageChange={onPageChange} />)
    const next = screen.getByLabelText('Halaman berikutnya')
    expect(next).not.toHaveAttribute('href')
    expect(next).toHaveAttribute('aria-disabled', 'true')
    await user.click(next)
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('disabled previous is skipped by Tab', async () => {
    const user = userEvent.setup()
    render(<TablePagination page={1} pageSize={10} total={30} onPageChange={vi.fn()} />)
    await user.tab()
    expect(screen.getByRole('link', { name: '1' })).toHaveFocus()
  })

  it('disabled controls never call renderLink', () => {
    const renderLink = vi.fn((props: React.ComponentProps<'a'>) => <a {...props} />)
    render(
      <TablePagination
        page={1}
        pageSize={10}
        total={30}
        onPageChange={vi.fn()}
        renderLink={renderLink}
      />
    )
    const labels = renderLink.mock.calls.map(([props]) => props['aria-label'])
    expect(labels).not.toContain('Halaman sebelumnya')
    expect(labels).toContain('Halaman berikutnya')
  })

  it('enabled previous still navigates', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<TablePagination page={2} pageSize={10} total={30} onPageChange={onPageChange} />)
    await user.click(screen.getByLabelText('Halaman sebelumnya'))
    expect(onPageChange).toHaveBeenCalledWith(1)
  })
})
