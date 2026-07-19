import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberField } from './number-field'

describe('NumberField', () => {
  it('formats value with id-ID grouping when blurred', () => {
    render(<NumberField label="PDRB" value={1250000} unit="Rp" />)
    expect(screen.getByLabelText('PDRB')).toHaveValue('1.250.000')
    expect(screen.getByText('Rp')).toBeInTheDocument()
  })

  it('parses typed id-ID input on blur', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberField label="Nilai" value={null} onChange={onChange} />)
    const input = screen.getByLabelText('Nilai')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '1.250.000')
    await user.tab()
    expect(onChange).toHaveBeenCalledWith(1250000)
  })
})
