import React from 'react';
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/showcase/CodeBlock';
import { Download, Search, MoreHorizontal } from 'lucide-react';

export function ButtonsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Buttons" 
        description="Komponen interaktif untuk pemicu aksi."
      />

      <ShowcaseSection title="Variants">
        <div className="flex flex-wrap gap-4 border rounded-lg p-8 bg-card items-center">
          <Button variant="default">Default (Primary)</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link Style</Button>
        </div>
        <CodeBlock>
          {`<Button variant="default">Unduh Data</Button>
<Button variant="outline">Filter</Button>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Sizes & Icons">
        <div className="flex flex-wrap gap-6 border rounded-lg p-8 bg-card items-center">
          <div className="flex items-center gap-4 border-r pr-6">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Unduh Laporan
            </Button>
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CodeBlock>
          {`// Button with left icon
<Button>
  <Download className="mr-2 h-4 w-4" />
  Unduh Laporan
</Button>

// Icon-only button
<Button variant="outline" size="icon">
  <Search className="h-4 w-4" />
</Button>`}
        </CodeBlock>
      </ShowcaseSection>
    </div>
  );
}
