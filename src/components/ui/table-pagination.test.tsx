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
})
