'use client'

import * as React from 'react'
import { FileText, UploadCloud, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type FileUploadProps = Omit<
  React.ComponentPropsWithRef<'input'>,
  'type' | 'value' | 'onChange'
> & {
  label?: string
  description?: string
  error?: string
  onFilesChange?: (files: File[]) => void
}

function FileUpload({
  className,
  label = 'Unggah berkas',
  description = 'Pilih atau tarik berkas ke area ini.',
  error,
  multiple,
  disabled,
  onFilesChange,
  ref,
  id,
  ...props
}: FileUploadProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = React.useState<File[]>([])
  const [dragActive, setDragActive] = React.useState(false)

  function updateFiles(fileList: FileList | null) {
    const nextFiles = Array.from(fileList ?? [])
    setFiles(nextFiles)
    onFilesChange?.(nextFiles)
  }

  function assignRef(node: HTMLInputElement | null) {
    inputRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  return (
    <div className={cn('space-y-3', className)}>
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault()
          if (!disabled) setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragActive(false)
          if (!disabled) updateFiles(event.dataTransfer.files)
        }}
        className={cn(
          'flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface-raised px-4 py-6 text-center transition-colors duration-fast',
          'hover:bg-surface-sunken focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          dragActive && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-60',
          error && 'border-feedback-danger bg-feedback-danger-bg'
        )}
      >
        <input
          ref={assignRef}
          id={inputId}
          type="file"
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => updateFiles(event.target.files)}
          {...props}
        />
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="space-y-1">
          <span className="block text-body-sm font-semibold text-content-primary">{label}</span>
          <span className="block text-caption text-content-secondary">{description}</span>
        </span>
      </label>

      {files.length > 0 && (
        <ul className="space-y-2" aria-label="Berkas terpilih">
          {files.map((file) => (
            <li
              key={`${file.name}-${file.lastModified}`}
              className="flex items-center justify-between gap-3 rounded-md border border-border-default bg-surface-raised px-3 py-2 text-body-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-content-secondary" aria-hidden="true" />
                <span className="truncate font-medium text-content-primary">{file.name}</span>
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Hapus ${file.name}`}
                onClick={() => {
                  const nextFiles = files.filter((item) => item !== file)
                  setFiles(nextFiles)
                  onFilesChange?.(nextFiles)
                  if (inputRef.current) inputRef.current.value = ''
                }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-caption font-medium text-feedback-danger">{error}</p>}
    </div>
  )
}

export { FileUpload }
