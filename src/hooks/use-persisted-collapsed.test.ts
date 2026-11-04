import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { usePersistedCollapsed } from './use-persisted-collapsed'

describe('usePersistedCollapsed', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
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

  it('keeps defaultCollapsed when nothing is stored', async () => {
    const { result } = renderHook(() => usePersistedCollapsed('k', true))
    await act(async () => {})
    expect(result.current[0]).toBe(true)
  })

  it('ignores unknown stored values', async () => {
    localStorage.setItem('k', 'yes')
    const { result } = renderHook(() => usePersistedCollapsed('k', true))
    await act(async () => {})
    expect(result.current[0]).toBe(true)
  })

  it('restores false from storage', async () => {
    localStorage.setItem('k', 'false')
    const { result } = renderHook(() => usePersistedCollapsed('k', true))
    await waitFor(() => {
      expect(result.current[0]).toBe(false)
    })
  })

  it('survives blocked storage', async () => {
    const blocked = () => {
      throw new Error('blocked')
    }
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(blocked)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(blocked)
    const { result } = renderHook(() => usePersistedCollapsed('k'))
    await act(async () => {
      result.current[1](true)
    })
    expect(result.current[0]).toBe(true)
  })
})
