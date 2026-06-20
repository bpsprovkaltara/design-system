import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileUpload } from './file-upload'

describe('FileUpload', () => {
  it('renders default label and description', () => {
    render(<FileUpload />)
    expect(screen.getByText('Unggah berkas')).toBeInTheDocument()
    expect(screen.getByText('Pilih atau tarik berkas ke area ini.')).toBeInTheDocument()
  })

  it('renders custom label and description', () => {
    render(<FileUpload label="Unggah foto" description="Format JPG atau PNG." />)
    expect(screen.getByText('Unggah foto')).toBeInTheDocument()
    expect(screen.getByText('Format JPG atau PNG.')).toBeInTheDocument()
  })

  it('renders error message when error prop is set', () => {
    render(<FileUpload error="Format berkas tidak didukung." />)
    expect(screen.getByText('Format berkas tidak didukung.')).toBeInTheDocument()
  })

  it('calls onFilesChange with selected files', async () => {
    const onFilesChange = vi.fn()
    render(<FileUpload onFilesChange={onFilesChange} />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['konten'], 'dokumen.pdf', { type: 'application/pdf' })
    await userEvent.upload(input, file)
    expect(onFilesChange).toHaveBeenCalledWith([file])
  })

  it('displays file name after upload', async () => {
    render(<FileUpload />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['data'], 'laporan.xlsx', { type: 'application/vnd.ms-excel' })
    await userEvent.upload(input, file)
    expect(screen.getByText('laporan.xlsx')).toBeInTheDocument()
  })

  it('supports multiple file upload', async () => {
    const onFilesChange = vi.fn()
    render(<FileUpload multiple onFilesChange={onFilesChange} />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toHaveAttribute('multiple')
    const fileA = new File(['a'], 'a.pdf', { type: 'application/pdf' })
    const fileB = new File(['b'], 'b.pdf', { type: 'application/pdf' })
    await userEvent.upload(input, [fileA, fileB])
    const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1][0] as File[]
    expect(lastCall).toHaveLength(2)
  })

  it('removes a file when its delete button is clicked', async () => {
    const onFilesChange = vi.fn()
    render(<FileUpload onFilesChange={onFilesChange} />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['x'], 'dokumen.pdf', { type: 'application/pdf' })
    await userEvent.upload(input, file)
    expect(screen.getByText('dokumen.pdf')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Hapus dokumen\.pdf/i }))
    expect(screen.queryByText('dokumen.pdf')).not.toBeInTheDocument()
    const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1][0] as File[]
    expect(lastCall).toHaveLength(0)
  })

  it('is disabled when disabled prop is true', () => {
    render(<FileUpload disabled />)
    const input = document.querySelector('input[type="file"]') as HTMLInputElement
    expect(input).toBeDisabled()
  })
})
