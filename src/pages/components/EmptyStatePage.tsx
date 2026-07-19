import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { EmptyState } from '@/components/patterns/empty-state'

export function EmptyStatePage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Empty State"
        description="Pattern untuk kondisi kosong, hasil pencarian kosong, atau error ringan."
      />

      <ShowcaseSection title="Default">
        <div className="rounded-lg border border-border bg-card">
          <EmptyState
            title="Belum ada dokumen"
            description="Dokumen statistik yang Anda unggah akan muncul di sini."
            action={{ label: 'Tambah dokumen', onClick: () => undefined }}
            secondaryAction={{ label: 'Pelajari format', onClick: () => undefined }}
          />
        </div>
        <CodeBlock>{`<EmptyState
  title="Belum ada dokumen"
  description="Dokumen statistik yang Anda unggah akan muncul di sini."
  action={{ label: 'Tambah dokumen', onClick: handleAdd }}
  secondaryAction={{ label: 'Pelajari format', onClick: handleHelp }}
/>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Pencarian & Error">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card">
            <EmptyState
              illustration="search"
              compact
              title="Tidak ada hasil"
              description="Coba ubah kata kunci atau reset filter."
            />
          </div>
          <div className="rounded-lg border border-border bg-card">
            <EmptyState
              illustration="error"
              compact
              title="Gagal memuat data"
              description="Periksa koneksi lalu coba lagi."
              action={{ label: 'Coba lagi', onClick: () => undefined, variant: 'outline' }}
            />
          </div>
        </div>
      </ShowcaseSection>
    </div>
  )
}
