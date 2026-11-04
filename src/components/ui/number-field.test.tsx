import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberField, type NumberFieldProps } from './number-field'

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

  async function typeAndBlur(props: Partial<NumberFieldProps>, typed: string) {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberField label="Nilai" onChange={onChange} {...props} />)
    const input = screen.getByLabelText('Nilai')
    await user.click(input)
    await user.clear(input)
    if (typed) await user.type(input, typed)
    await user.tab()
    return { onChange, input }
  }

  it.each([
    ['parses plain digits', { value: null }, '1250000', 1250000],
    ['parses decimal comma', { value: null, allowDecimal: true }, '1,5', 1.5],
    ['parses grouped with decimal', { value: null, allowDecimal: true }, '1.250,75', 1250.75],
    ['empty input clears', { value: 10 }, '', null],
    ['negative grouped', { value: null }, '-1.000', -1000],
  ] as const)('%s', async (_name, props, typed, expected) => {
    const { onChange } = await typeAndBlur(props, typed)
    expect(onChange).toHaveBeenCalledWith(expected)
  })

  it.each([
    ['rejects ambiguous dot', { value: 10, allowDecimal: true }, '1.5'],
    ['rejects bad grouping', { value: 10 }, '12.50'],
    ['rejects decimal when not allowed', { value: 10 }, '1,5'],
  ] as const)('%s', async (_name, props, typed) => {
    const { onChange, input } = await typeAndBlur(props, typed)
    expect(onChange).not.toHaveBeenCalled()
    expect(input).toHaveValue('10')
  })

  it('does not inflate fractional value when decimals are off', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberField label="Nilai" value={1.5} onChange={onChange} />)
    await user.click(screen.getByLabelText('Nilai'))
    await user.tab()
    expect(onChange).not.toHaveBeenCalledWith(15)
  })

  it('shows full precision without grouping on focus', async () => {
    const user = userEvent.setup()
    render(<NumberField label="Nilai" value={1234.5} allowDecimal />)
    const input = screen.getByLabelText('Nilai')
    await user.click(input)
    expect(input).toHaveValue('1234,5')
  })

  it('commits on Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberField label="Nilai" value={null} onChange={onChange} />)
    await user.type(screen.getByLabelText('Nilai'), '42')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith(42)
  })

  it('keeps full precision when Enter is followed by blur', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<NumberField label="Nilai" value={null} onChange={onChange} allowDecimal />)
    await user.type(screen.getByLabelText('Nilai'), '1234,5678')
    await user.keyboard('{Enter}')
    await user.tab()
    expect(onChange).toHaveBeenLastCalledWith(1234.5678)
  })
})
