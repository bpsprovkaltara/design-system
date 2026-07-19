import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader } from './page-header'
import { Button } from './button'

describe('PageHeader', () => {
  it('renders title and description', () => {
    render(<PageHeader title="Daftar Dokumen" description="Monitoring pengumpulan data." />)
    expect(screen.getByRole('heading', { name: 'Daftar Dokumen' })).toBeInTheDocument()
    expect(screen.getByText('Monitoring pengumpulan data.')).toBeInTheDocument()
  })

  it('renders action slot', () => {
    render(<PageHeader title="Dokumen" action={<Button>Tambah</Button>} />)
    expect(screen.getByRole('button', { name: 'Tambah' })).toBeInTheDocument()
  })

  it('applies titleClassName and descriptionClassName', () => {
    render(
      <PageHeader
        title="Dokumen"
        description="Keterangan"
        titleClassName="font-display"
        descriptionClassName="italic"
      />
    )
    expect(screen.getByRole('heading', { name: 'Dokumen' })).toHaveClass('font-display')
    expect(screen.getByText('Keterangan')).toHaveClass('italic')
  })
})
