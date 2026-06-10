import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'

export function TypographyPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Typography"
        description="Tipografi standar menggunakan IBM Plex Sans dan IBM Plex Mono."
      />

      <ShowcaseSection title="Headings & Display">
        <div className="space-y-8 border rounded-lg p-8 bg-card">
          <div>
            <h1 className="display-lg">Display Large</h1>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              .display-lg | 48px/56px | font-bold
            </p>
          </div>
          <div>
            <h1 className="display-sm">Display Small</h1>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              .display-sm | 30px/38px | font-bold
            </p>
          </div>
          <div className="pt-4 border-t">
            <h1 className="h1">Heading 1</h1>
            <p className="text-muted-foreground mt-1 font-mono text-xs">
              .h1 | 24px/32px | font-bold
            </p>
          </div>
          <div>
            <h2 className="h2">Heading 2</h2>
            <p className="text-muted-foreground mt-1 font-mono text-xs">
              .h2 | 20px/28px | font-semibold
            </p>
          </div>
          <div>
            <h3 className="h3">Heading 3</h3>
            <p className="text-muted-foreground mt-1 font-mono text-xs">
              .h3 | 16px/24px | font-semibold
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Body Text & Utilities">
        <div className="space-y-6 border rounded-lg p-8 bg-card">
          <div>
            <p className="body-base">
              Body Base — Ini adalah paragraf standar. Tipografi BPS Kaltara mengedepankan
              keterbacaan data. Gunakan ini untuk teks panjang.
            </p>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              .body-base | 16px/24px | font-normal
            </p>
          </div>
          <div>
            <p className="body-sm">
              Body Small — Digunakan untuk elemen UI sekunder, caption, atau teks bantuan.
            </p>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              .body-sm | 14px/20px | font-normal
            </p>
          </div>
          <div className="pt-4 border-t">
            <div className="numeric text-2xl">1.234.567,89</div>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              .numeric | tabular-nums | IBM Plex Mono
            </p>
          </div>
          <div>
            <span className="label">LABEL TEXT</span>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              .label | 12px | font-bold | uppercase | tracking-wider
            </p>
          </div>
        </div>
        <CodeBlock>
          {`<p className="body-base">Teks utama</p>
<div className="numeric text-right">Rp 4.500.000</div>`}
        </CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
