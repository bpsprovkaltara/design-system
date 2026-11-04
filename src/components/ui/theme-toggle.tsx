'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'bps-theme'

function readStoredTheme(): ThemeMode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // storage diblokir
  }
  return null
}

function systemTheme(): ThemeMode {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // storage diblokir: class tetap diterapkan
  }
}

function useThemeState(defaultTheme: ThemeMode | undefined, persist: boolean) {
  const [theme, setThemeState] = React.useState<ThemeMode>(defaultTheme ?? 'light')
  const [ready, setReady] = React.useState(false)

  // Storage dan matchMedia dibaca setelah mount agar render pertama sama dengan SSR.
  React.useEffect(() => {
    if (!persist) return
    React.startTransition(() => {
      if (!defaultTheme) setThemeState(readStoredTheme() ?? systemTheme())
      setReady(true)
    })
  }, [persist, defaultTheme])

  React.useEffect(() => {
    if (persist && ready) applyTheme(theme)
  }, [persist, ready, theme])

  const setTheme = React.useCallback((next: ThemeMode) => {
    setThemeState(next)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme }
}

export function useTheme(defaultTheme?: ThemeMode) {
  return useThemeState(defaultTheme, true)
}

export interface ThemeToggleProps {
  className?: string
  /** Controlled theme. When omitted, the toggle manages its own state. */
  theme?: ThemeMode
  onThemeChange?: (theme: ThemeMode) => void
}

export function ThemeToggle({ className, theme: themeProp, onThemeChange }: ThemeToggleProps) {
  const isControlled = themeProp !== undefined
  const internal = useThemeState(undefined, !isControlled)
  const theme = isControlled ? themeProp : internal.theme

  const toggle = () => {
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    if (isControlled) {
      onThemeChange?.(next)
      applyTheme(next)
      return
    }
    internal.setTheme(next)
    onThemeChange?.(next)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      onClick={toggle}
      className={cn('h-8 w-8', className)}
    >
      {theme === 'dark' ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </Button>
  )
}
