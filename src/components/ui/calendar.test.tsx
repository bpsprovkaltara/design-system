import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { enUS } from 'date-fns/locale'
import { Calendar } from './calendar'

const month = new Date(2026, 0, 15)

describe('Calendar', () => {
  it('defaults to Indonesian locale with Monday as the first weekday', () => {
    const { container } = render(<Calendar defaultMonth={month} />)
    expect(screen.getByText(/Januari 2026/)).toBeInTheDocument()
    expect(container.querySelector('.rdp-weekday')).toHaveTextContent(/sen/i)
  })

  it('allows overriding locale and week start', () => {
    const { container } = render(<Calendar defaultMonth={month} locale={enUS} weekStartsOn={0} />)
    expect(screen.getByText(/January 2026/)).toBeInTheDocument()
    expect(container.querySelector('.rdp-weekday')).toHaveTextContent(/su/i)
  })
})
