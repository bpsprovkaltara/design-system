import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CardsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Cards"
        description="Wadah modular untuk menampilkan sekumpulan data terkait."
      />

      <ShowcaseSection title="Surface skin">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Default
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                `rounded-xl` · `border-border-default` · `shadow-sm`
              </p>
            </CardContent>
          </Card>
          <Card variant="surface">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Surface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                `rounded-2xl` · `border-border-subtle` · `shadow-elevation-1`
              </p>
            </CardContent>
          </Card>
        </div>
        <CodeBlock>
          {`<Card variant="surface">
  <CardHeader>
    <CardTitle>Judul bagian</CardTitle>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="BPS Stat Card">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Total Populasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="numeric text-3xl font-bold">728.498</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-success text-sm font-medium flex items-center">↗ +2,4%</span>
                <span className="text-xs text-muted-foreground">dari 2022</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                PDRB Per Kapita
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]"
              >
                Sementara
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="numeric text-3xl font-bold">48,2 Jt</div>
              <div className="text-xs text-muted-foreground mt-2">Rupiah · 2023</div>
            </CardContent>
          </Card>
        </div>
        <CodeBlock>
          {`<Card className="border-l-4 border-l-amber-500">
  <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
      PDRB Per Kapita
    </CardTitle>
    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
      Sementara
    </Badge>
  </CardHeader>
  <CardContent>
    <div className="numeric text-3xl font-bold">48,2 Jt</div>
    <div className="text-xs text-muted-foreground mt-2">Rupiah · 2023</div>
  </CardContent>
</Card>`}
        </CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
