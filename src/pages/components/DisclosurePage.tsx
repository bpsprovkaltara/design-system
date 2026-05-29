import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function DisclosurePage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Disclosure & Layout"
        description="Komponen pengungkap konten bertahap: accordion, tabs, scroll area, dan pemisah."
      />

      <ShowcaseSection title="Accordion">
        <div className="rounded-lg border bg-card p-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="apa">
              <AccordionTrigger>Apa itu BPS Kaltara Design System?</AccordionTrigger>
              <AccordionContent>
                Library komponen UI internal untuk membangun aplikasi BPS Provinsi Kalimantan Utara
                secara konsisten.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="siapa">
              <AccordionTrigger>Siapa yang dapat menggunakannya?</AccordionTrigger>
              <AccordionContent>
                Seluruh tim pengembangan aplikasi di lingkungan BPS Provinsi Kalimantan Utara.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bagaimana">
              <AccordionTrigger>Bagaimana cara melaporkan masalah?</AccordionTrigger>
              <AccordionContent>
                Buka issue di repositori internal atau hubungi tim pengelola design system.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeBlock>{`<Accordion type="single" collapsible>
  <AccordionItem value="apa">
    <AccordionTrigger>Apa itu ...?</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs">
        <div className="rounded-lg border bg-card p-8">
          <Tabs defaultValue="ringkasan" className="w-full">
            <TabsList>
              <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
              <TabsTrigger value="rincian">Rincian</TabsTrigger>
              <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
            </TabsList>
            <TabsContent value="ringkasan" className="text-sm text-muted-foreground pt-4">
              Konten ringkasan ditampilkan di tab ini.
            </TabsContent>
            <TabsContent value="rincian" className="text-sm text-muted-foreground pt-4">
              Konten rincian ditampilkan di tab ini.
            </TabsContent>
            <TabsContent value="riwayat" className="text-sm text-muted-foreground pt-4">
              Konten riwayat perubahan ditampilkan di tab ini.
            </TabsContent>
          </Tabs>
        </div>
        <CodeBlock>{`<Tabs defaultValue="ringkasan">
  <TabsList>
    <TabsTrigger value="ringkasan">Ringkasan</TabsTrigger>
    <TabsTrigger value="rincian">Rincian</TabsTrigger>
  </TabsList>
  <TabsContent value="ringkasan">...</TabsContent>
</Tabs>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Scroll Area">
        <div className="rounded-lg border bg-card p-8">
          <ScrollArea className="h-48 w-full rounded-md border p-4">
            <h4 className="mb-3 text-sm font-medium">Daftar Provinsi (sampel)</h4>
            <div className="space-y-2 text-sm">
              {[
                'Kalimantan Utara',
                'Kalimantan Timur',
                'Kalimantan Selatan',
                'Kalimantan Tengah',
                'Kalimantan Barat',
                'DKI Jakarta',
                'Jawa Barat',
                'Jawa Tengah',
                'Jawa Timur',
                'DI Yogyakarta',
                'Banten',
                'Bali',
              ].map((nama) => (
                <div key={nama} className="text-muted-foreground">
                  {nama}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <CodeBlock>{`<ScrollArea className="h-48 w-full rounded-md border p-4">
  {/* konten panjang */}
</ScrollArea>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Separator">
        <div className="rounded-lg border bg-card p-8 space-y-4">
          <div>
            <div className="text-sm font-medium">Pemisah Horizontal</div>
            <p className="text-sm text-muted-foreground">Memisahkan bagian dalam vertikal stack.</p>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">Bagian berikutnya.</p>
          </div>
          <div className="flex h-12 items-center gap-3 text-sm">
            <div>Salin</div>
            <Separator orientation="vertical" />
            <div>Ubah</div>
            <Separator orientation="vertical" />
            <div>Hapus</div>
          </div>
        </div>
        <CodeBlock>{`<Separator className="my-3" />

<Separator orientation="vertical" />`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
