import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'
import { LinkButton } from './link-button'

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

  it('renders asChild link with inline icon and text without throwing', () => {
    render(
      <Button asChild>
        <a href="/pegawai/1/edit">
          <svg data-testid="inline-icon" />
          Edit
        </a>
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Edit' })
    expect(link).toHaveAttribute('href', '/pegawai/1/edit')
    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link).toContainElement(screen.getByTestId('inline-icon'))
  })

  it('renders asChild with iconLeft inside the slotted link', () => {
    render(
      <Button asChild iconLeft={<svg data-testid="icon" />}>
        <a href="/foo">Tautan</a>
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Tautan' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/foo')
    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link).toContainElement(screen.getByTestId('icon'))
  })

  it('renders asChild with iconRight inside the slotted link', () => {
    render(
      <Button asChild iconRight={<svg data-testid="icon-right" />}>
        <a href="/foo">Lanjut</a>
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Lanjut' })
    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link).toContainElement(screen.getByTestId('icon-right'))
  })

  it('renders loading asChild link with spinner and disabled semantics', async () => {
    const handler = vi.fn()

    render(
      <Button asChild loading>
        <a href="/foo" onClick={handler}>
          Memuat
        </a>
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Memuat' })
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('data-disabled', 'true')
    expect(link.querySelector('svg')).toBeInTheDocument()

    await userEvent.click(link)
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('LinkButton', () => {
  it('applies button variant and size classes', () => {
    render(
      <LinkButton href="/pegawai/1/edit" variant="outline" size="sm">
        Edit
      </LinkButton>
    )

    const link = screen.getByRole('link', { name: 'Edit' })
    expect(link).toHaveClass('border-border-default')
    expect(link).toHaveClass('bg-transparent')
    expect(link).toHaveClass('h-8')
    expect(link).toHaveClass('px-3')
    expect(link).toHaveClass('text-body-sm')
  })

  it('renders iconLeft and keeps the label accessible', () => {
    render(
      <LinkButton href="/pegawai/1/edit" iconLeft={<svg data-testid="link-icon" />}>
        Edit
      </LinkButton>
    )

    const link = screen.getByRole('link', { name: 'Edit' })
    expect(link).toContainElement(screen.getByTestId('link-icon'))
  })

  it('renders asChild with iconRight inside the slotted link', () => {
    render(
      <LinkButton asChild iconRight={<svg data-testid="link-icon-right" />}>
        <a href="/pegawai/1/edit">Edit</a>
      </LinkButton>
    )

    const link = screen.getByRole('link', { name: 'Edit' })
    expect(link).toHaveAttribute('data-slot', 'link-button')
    expect(link).toContainElement(screen.getByTestId('link-icon-right'))
  })
})
