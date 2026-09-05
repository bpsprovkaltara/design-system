import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { usePersistedCollapsed } from './use-persisted-collapsed'

describe('usePersistedCollapsed', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('restores collapsed state from storage after mount', async () => {
    localStorage.setItem('sidebar-collapsed', 'true')
    const { result } = renderHook(() => usePersistedCollapsed('sidebar-collapsed'))

    await waitFor(() => {
      expect(result.current[0]).toBe(true)
    })
  })

  it('persists updates to localStorage', async () => {
    const { result } = renderHook(() => usePersistedCollapsed('app.sidebar'))

    await act(async () => {
      result.current[1](true)
    })

    expect(result.current[0]).toBe(true)
    expect(localStorage.getItem('app.sidebar')).toBe('true')
  })
})
