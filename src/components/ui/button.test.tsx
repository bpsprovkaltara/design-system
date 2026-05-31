import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Simpan</Button>)
    expect(screen.getByRole('button', { name: 'Simpan' })).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    render(<Button>Test</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('bg-primary')
  })

  it('applies destructive variant', () => {
    render(<Button variant="destructive">Hapus</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })

  it('applies size xs', () => {
    render(<Button size="xs">Mini</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-6')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Tidak Aktif</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled and shows spinner when loading', () => {
    render(<Button loading>Menyimpan</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onClick handler', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Klik</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handler = vi.fn()
    render(
      <Button disabled onClick={handler}>
        Klik
      </Button>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('renders asChild with iconLeft without throwing React.Children.only', () => {
    render(
      <Button asChild iconLeft={<svg data-testid="icon" />}>
        <a href="/foo">Tautan</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Tautan' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/foo')
    expect(link).toHaveAttribute('data-slot', 'button')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
