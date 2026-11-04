import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { ThemeToggle } from './theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('uncontrolled toggle switches theme and persists', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button', { name: 'Aktifkan mode gelap' }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('bps-theme')).toBe('dark')
  })

  it('uncontrolled with onThemeChange still toggles', async () => {
    const user = userEvent.setup()
    const onThemeChange = vi.fn()
    render(<ThemeToggle onThemeChange={onThemeChange} />)
    await user.click(screen.getByRole('button', { name: 'Aktifkan mode gelap' }))
    expect(onThemeChange).toHaveBeenCalledWith('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('controlled mode does not write on mount', async () => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('bps-theme', 'light')
    render(<ThemeToggle theme="dark" onThemeChange={vi.fn()} />)
    await act(async () => {})
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('bps-theme')).toBe('light')
  })

  it('controlled toggle calls onThemeChange', async () => {
    const user = userEvent.setup()
    const onThemeChange = vi.fn()
    render(<ThemeToggle theme="dark" onThemeChange={onThemeChange} />)
    await user.click(screen.getByRole('button', { name: 'Aktifkan mode terang' }))
    expect(onThemeChange).toHaveBeenCalledWith('light')
  })

  it('restores stored theme after mount', async () => {
    localStorage.setItem('bps-theme', 'dark')
    render(<ThemeToggle />)
    expect(await screen.findByRole('button', { name: 'Aktifkan mode terang' })).toBeInTheDocument()
  })

  it('first render does not read storage', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem')
    const html = renderToString(<ThemeToggle />)
    expect(getItem).not.toHaveBeenCalled()
    expect(html).toContain('Aktifkan mode gelap')
  })

  it('survives blocked storage', async () => {
    const user = userEvent.setup()
    const blocked = () => {
      throw new Error('blocked')
    }
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(blocked)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(blocked)
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button', { name: 'Aktifkan mode gelap' }))
    expect(document.documentElement).toHaveClass('dark')
  })
})
