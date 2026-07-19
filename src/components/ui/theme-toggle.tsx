'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'bps-theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem(STORAGE_KEY, theme)
}

export function useTheme(defaultTheme?: ThemeMode) {
  const [theme, setThemeState] = React.useState<ThemeMode>(defaultTheme ?? getInitialTheme)

  React.useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = React.useCallback((next: ThemeMode) => {
    setThemeState(next)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme }
}

export interface ThemeToggleProps {
  className?: string
  /** Controlled theme. When omitted, the toggle manages its own state. */
  theme?: ThemeMode
  onThemeChange?: (theme: ThemeMode) => void
}

export function ThemeToggle({ className, theme: themeProp, onThemeChange }: ThemeToggleProps) {
  const internal = useTheme()
  const theme = themeProp ?? internal.theme

  const toggle = () => {
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    if (onThemeChange) {
      onThemeChange(next)
    } else {
      internal.setTheme(next)
    }
    if (themeProp !== undefined) {
      applyTheme(next)
    }
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
