import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { SelectInput } from './select-input'

describe('SelectInput', () => {
  it('renders a hidden native select for form POST / register()', () => {
    const { container } = render(
      <SelectInput name="wilayah" defaultValue="tarakan">
        <option value="tarakan">Tarakan</option>
        <option value="nunukan">Nunukan</option>
      </SelectInput>
    )
    const native = container.querySelector('select[name="wilayah"]') as HTMLSelectElement
    expect(native).toBeTruthy()
    expect(native.hidden || native.getAttribute('aria-hidden') === 'true').toBe(true)
    expect(native.value).toBe('tarakan')
  })

  it('forwards ref to the native select element', () => {
    const ref = createRef<HTMLSelectElement>()
    render(
      <SelectInput ref={ref} name="wilayah" defaultValue="nunukan">
        <option value="tarakan">Tarakan</option>
        <option value="nunukan">Nunukan</option>
      </SelectInput>
    )
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
    expect(ref.current?.value).toBe('nunukan')
  })

  it('syncs Radix selection to the native select and calls onChange', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <SelectInput name="wilayah" defaultValue="tarakan" onChange={onChange}>
        <option value="tarakan">Tarakan</option>
        <option value="nunukan">Nunukan</option>
      </SelectInput>
    )
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('option', { name: 'Nunukan' }))
    const native = container.querySelector('select[name="wilayah"]') as HTMLSelectElement
    expect(native.value).toBe('nunukan')
    expect(onChange).toHaveBeenCalled()
  })
})
