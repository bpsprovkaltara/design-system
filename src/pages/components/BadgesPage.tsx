import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { StatusBadge } from '@/components/ui/status-badge'
import { Badge } from '@/components/ui/badge'

export function BadgesPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Badges & Tags"
        description="Komponen indikator status dan label kategorikal."
      />

      <ShowcaseSection title="BPS Workflow Status Badges">
        <div className="flex flex-wrap gap-4 border rounded-lg p-8 bg-card items-center">
          <StatusBadge variant="draft">DRAFT</StatusBadge>
          <StatusBadge variant="pending">PENDING</StatusBadge>
          <StatusBadge variant="revised">REVISED</StatusBadge>
          <StatusBadge variant="approved">APPROVED</StatusBadge>
        </div>
        <CodeBlock>{`<StatusBadge variant="approved">APPROVED</StatusBadge>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Standard Badges (shadcn/ui)">
        <div className="flex flex-wrap gap-4 border rounded-lg p-8 bg-card items-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <CodeBlock>{`<Badge variant="outline">Kategori</Badge>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
