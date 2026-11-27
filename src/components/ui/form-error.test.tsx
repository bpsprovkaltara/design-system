import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormError } from '@/components/ui/form-error'

describe('FormError', () => {
  it('exposes the validation message as an alert when it appears', () => {
    const { rerender } = render(<FormError id="email-error" />)

    rerender(<FormError id="email-error" message="Alamat surel wajib diisi." />)

    expect(screen.getByRole('alert')).toHaveTextContent('Alamat surel wajib diisi.')
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'email-error')
  })

  it('renders no element when the message is empty or cleared', () => {
    const { container, rerender } = render(<FormError message="" />)

    expect(container).toBeEmptyDOMElement()

    rerender(<FormError message="Alamat surel wajib diisi." />)
    rerender(<FormError />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders non-string messages as text for existing form callers', () => {
    render(<FormError message={123} />)

    expect(screen.getByRole('alert')).toHaveTextContent('123')
  })
})
