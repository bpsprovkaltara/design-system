'use client'

import * as React from 'react'

/**
 * State collapse sidebar yang disimpan di `localStorage`.
 * Render pertama selalu `defaultCollapsed` (hindari mismatch SSR); nilai
 * tersimpan dihidupkan setelah mount.
 */
export function usePersistedCollapsed(
  storageKey: string,
  defaultCollapsed = false
): readonly [boolean, (next: boolean) => void] {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  React.useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(storageKey)
    } catch {
      return
    }
    if (stored !== 'true' && stored !== 'false') return
    React.startTransition(() => {
      setCollapsed(stored === 'true')
    })
  }, [storageKey])

  const updateCollapsed = React.useCallback(
    (next: boolean) => {
      setCollapsed(next)
      try {
        localStorage.setItem(storageKey, String(next))
      } catch {
        // storage diblokir: state tetap berlaku di memori
      }
    },
    [storageKey]
  )

  return [collapsed, updateCollapsed] as const
}
