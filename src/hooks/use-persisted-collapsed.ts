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
    React.startTransition(() => {
      setCollapsed(localStorage.getItem(storageKey) === 'true')
    })
  }, [storageKey])

  const updateCollapsed = React.useCallback(
    (next: boolean) => {
      setCollapsed(next)
      localStorage.setItem(storageKey, String(next))
    },
    [storageKey]
  )

  return [collapsed, updateCollapsed] as const
}
