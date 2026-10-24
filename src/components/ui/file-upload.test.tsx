import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
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

  const pdf = (name = 'a.pdf') => new File(['pdf'], name, { type: 'application/pdf' })
  const png = (name = 'b.png') => new File(['png'], name, { type: 'image/png' })
  const drop = (files: File[]) =>
    fireEvent.drop(screen.getByText('Unggah berkas').closest('label')!, {
      dataTransfer: { files },
    })

  it('drop ignores files outside accept', () => {
    const onFilesChange = vi.fn()
    const onReject = vi.fn()
    const a = pdf()
    const b = png()
    render(<FileUpload accept=".pdf" multiple onFilesChange={onFilesChange} onReject={onReject} />)
    drop([a, b])
    expect(onFilesChange).toHaveBeenCalledWith([a])
    expect(onReject).toHaveBeenCalledWith([{ file: b, reason: 'type' }])
  })

  it('drop keeps only one file when not multiple', () => {
    const onFilesChange = vi.fn()
    const onReject = vi.fn()
    const a = pdf('a.pdf')
    const b = pdf('b.pdf')
    render(<FileUpload onFilesChange={onFilesChange} onReject={onReject} />)
    drop([a, b])
    expect(onFilesChange).toHaveBeenCalledWith([a])
    expect(onReject).toHaveBeenCalledWith([{ file: b, reason: 'count' }])
  })

  it('drop rejects oversized files', () => {
    const onFilesChange = vi.fn()
    const onReject = vi.fn()
    const big = new File(['12345678901'], 'besar.pdf', { type: 'application/pdf' })
    render(<FileUpload maxSize={10} onFilesChange={onFilesChange} onReject={onReject} />)
    drop([big])
    expect(onFilesChange).toHaveBeenCalledWith([])
    expect(onReject).toHaveBeenCalledWith([{ file: big, reason: 'size' }])
  })

  it('accept matches mime wildcard', () => {
    const onFilesChange = vi.fn()
    const x = png('x.png')
    render(<FileUpload accept="image/*" onFilesChange={onFilesChange} />)
    drop([x])
    expect(onFilesChange).toHaveBeenCalledWith([x])
  })

  it('accept matches extension case-insensitively', () => {
    const onFilesChange = vi.fn()
    const a = pdf()
    render(<FileUpload accept=".PDF" onFilesChange={onFilesChange} />)
    drop([a])
    expect(onFilesChange).toHaveBeenCalledWith([a])
  })

  it('picker also enforces maxSize', async () => {
    const onFilesChange = vi.fn()
    const onReject = vi.fn()
    const big = new File(['12345678901'], 'besar.pdf', { type: 'application/pdf' })
    const { container } = render(
      <FileUpload maxSize={10} onFilesChange={onFilesChange} onReject={onReject} />
    )
    await userEvent.upload(container.querySelector('input[type=file]') as HTMLInputElement, big)
    expect(onFilesChange).toHaveBeenCalledWith([])
    expect(onReject).toHaveBeenCalledWith([{ file: big, reason: 'size' }])
  })

  it('does not call onReject when everything is valid', () => {
    const onReject = vi.fn()
    render(<FileUpload accept=".pdf" multiple onReject={onReject} />)
    drop([pdf('a.pdf'), pdf('b.pdf')])
    expect(onReject).not.toHaveBeenCalled()
  })
})
