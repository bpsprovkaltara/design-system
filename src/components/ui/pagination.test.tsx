import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from './pagination'

describe('Pagination', () => {
  it('renders PaginationLink as a plain anchor by default', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="/halaman/2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const link = screen.getByRole('link', { name: '2' })
    expect(link).toHaveAttribute('href', '/halaman/2')
    expect(link).toHaveAttribute('aria-current', 'page')
  })

  it('calls onClick handler on the default anchor', async () => {
    const handler = vi.fn()
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" onClick={handler}>
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    await userEvent.click(screen.getByRole('link', { name: '1' }))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('delegates rendering to renderLink when provided', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="/halaman/3"
              isActive
              renderLink={(props) => <a data-testid="framework-link" {...props} />}
            >
              3
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    const link = screen.getByTestId('framework-link')
    expect(link).toHaveAttribute('href', '/halaman/3')
    expect(link).toHaveTextContent('3')
  })

  it('PaginationPrevious also supports renderLink', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="/halaman/1"
              renderLink={(props) => <a data-testid="prev-link" {...props} />}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByTestId('prev-link')).toHaveAttribute('href', '/halaman/1')
  })
})
