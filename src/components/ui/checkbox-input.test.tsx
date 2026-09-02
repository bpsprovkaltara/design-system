import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { CheckboxInput } from './checkbox-input'

describe('CheckboxInput', () => {
  it('renders a visually hidden native checkbox for form POST / register()', () => {
    const { container } = render(<CheckboxInput name="setuju" defaultChecked />)
    const native = container.querySelector('input[name="setuju"]') as HTMLInputElement
    expect(native).toBeTruthy()
    expect(native.type).toBe('checkbox')
    expect(native.checked).toBe(true)
    expect(native.className).toMatch(/sr-only/)
  })

  it('forwards ref to the native checkbox', () => {
    const ref = createRef<HTMLInputElement>()
    render(<CheckboxInput ref={ref} name="setuju" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.type).toBe('checkbox')
  })

  it('toggles native checked state via the visual checkbox', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <CheckboxInput name="setuju" defaultChecked={false} onChange={onChange} />
    )
    await userEvent.click(screen.getByRole('checkbox'))
    const native = container.querySelector('input[name="setuju"]') as HTMLInputElement
    expect(native.checked).toBe(true)
    expect(onChange).toHaveBeenCalled()
  })
})
