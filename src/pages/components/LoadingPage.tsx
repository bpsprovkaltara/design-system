import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Spinner } from '@/components/ui/spinner'
import { Skeleton } from '@/components/ui/skeleton'

export function LoadingPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Loading & Skeletons"
        description="Indikator visual saat data sedang dimuat."
      />

      {/* Spinner */}
      <ShowcaseSection title="Spinner — Ukuran">
        <div className="flex flex-wrap items-center gap-6 border rounded-lg p-8 bg-card">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xs" />
            <span className="text-xs text-muted-foreground">xs</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="default" />
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span className="text-xs text-muted-foreground">xl</span>
          </div>
        </div>
        <CodeBlock>
          {`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />
<Spinner size="xl" />`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Spinner — Warna">
        <div className="flex flex-wrap items-center gap-6 border rounded-lg p-8 bg-card">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" className="text-primary" />
            <span className="text-xs text-muted-foreground">Primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" className="text-destructive" />
            <span className="text-xs text-muted-foreground">Destructive</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Muted</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-primary rounded-lg px-4 py-3">
            <Spinner size="lg" className="text-white" />
            <span className="text-xs text-white">On Primary</span>
          </div>
        </div>
        <CodeBlock>
          {`<Spinner size="lg" className="text-primary" />
<Spinner size="lg" className="text-destructive" />
<Spinner size="lg" className="text-muted-foreground" />`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Spinner — Di dalam Button">
        <div className="flex flex-wrap items-center gap-4 border rounded-lg p-8 bg-card">
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium opacity-80 cursor-not-allowed"
          >
            <Spinner size="sm" className="text-primary-foreground" />
            Menyimpan...
          </button>
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium opacity-80 cursor-not-allowed"
          >
            <Spinner size="sm" className="text-foreground" />
            Memuat...
          </button>
        </div>
        <CodeBlock>
          {`<button disabled className="...">
  <Spinner size="sm" className="text-primary-foreground" />
  Menyimpan...
</button>`}
        </CodeBlock>
      </ShowcaseSection>

      {/* Skeleton */}
      <ShowcaseSection title="Skeleton — Elemen Dasar">
        <div className="flex flex-col gap-3 border rounded-lg p-8 bg-card max-w-sm">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <CodeBlock>
          {`<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-5/6" />`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Skeleton — Card Profil">
        <div className="border rounded-lg p-6 bg-card max-w-sm">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
          <Skeleton className="h-8 w-full mt-6 rounded-md" />
        </div>
        <CodeBlock>
          {`<div className="flex items-center gap-4">
  <Skeleton className="w-12 h-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Skeleton — Baris Tabel">
        <div className="border rounded-lg bg-card overflow-hidden max-w-2xl">
          <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b bg-muted/30">
            {['Nama', 'Jabatan', 'Satuan', 'Status'].map((h) => (
              <span key={h} className="text-xs font-semibold text-muted-foreground">
                {h}
              </span>
            ))}
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3 border-b last:border-0">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
        <CodeBlock>
          {`{Array.from({ length: 4 }).map((_, i) => (
  <div key={i} className="grid grid-cols-4 gap-4 px-4 py-3">
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-5 w-16 rounded-full" />
  </div>
))}`}
        </CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
