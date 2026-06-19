import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormSection } from '@/components/ui/form-section'
import { ValidationSummary, type ValidationItem } from '@/components/ui/validation-summary'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export function FormWorkflowPage() {
  const [formState, setFormState] = useState({
    judul: '',
    nomor: '',
    unitKerja: '',
    catatan: '',
  })

  const validationItems: ValidationItem[] = []

  if (!formState.judul)
    validationItems.push({
      id: 'judul',
      section: 'Informasi Dokumen',
      message: 'Judul dokumen wajib diisi',
    })
  if (!formState.nomor)
    validationItems.push({
      id: 'nomor',
      section: 'Informasi Dokumen',
      message: 'Nomor dokumen wajib diisi',
    })
  if (!formState.unitKerja)
    validationItems.push({
      id: 'unit',
      section: 'Penanggung Jawab',
      message: 'Unit kerja wajib dipilih',
    })

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Form Workflow"
        description="Pola form bertahap untuk pengajuan dokumen statistik internal."
      />

      <ShowcaseSection title="Workflow Pengisian dan Validasi">
        <div className="space-y-4">
          <ValidationSummary
            items={validationItems}
            onNavigate={(id) =>
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          />

          <FormSection
            title="Informasi Dokumen"
            description="Lengkapi metadata utama dokumen sebelum diajukan ke verifikator."
            requiredCount={2}
            completedCount={[formState.judul, formState.nomor].filter(Boolean).length}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="label" htmlFor="judul">
                  Judul Dokumen <span className="text-destructive">*</span>
                </label>
                <Input
                  id="judul"
                  value={formState.judul}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, judul: event.target.value }))
                  }
                  placeholder="Contoh: Statistik Kesejahteraan 2026"
                />
              </div>
              <div className="space-y-2">
                <label className="label" htmlFor="nomor">
                  Nomor Dokumen <span className="text-destructive">*</span>
                </label>
                <Input
                  id="nomor"
                  value={formState.nomor}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, nomor: event.target.value }))
                  }
                  placeholder="BPS-KALTARA/2026/001"
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Penanggung Jawab"
            description="Unit kerja pengampu dokumen untuk proses approval."
            requiredCount={1}
            completedCount={formState.unitKerja ? 1 : 0}
            action={
              <Button size="sm" variant="outline">
                Simpan Draft
              </Button>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="label" htmlFor="unit">
                  Unit Kerja <span className="text-destructive">*</span>
                </label>
                <Input
                  id="unit"
                  value={formState.unitKerja}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, unitKerja: event.target.value }))
                  }
                  placeholder="Contoh: Statistik Sosial"
                />
              </div>
              <div className="space-y-2">
                <label className="label" htmlFor="catatan">
                  Catatan Internal
                </label>
                <Textarea
                  id="catatan"
                  value={formState.catatan}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, catatan: event.target.value }))
                  }
                  placeholder="Catatan untuk reviewer..."
                />
              </div>
            </div>
          </FormSection>
        </div>

        <CodeBlock>{`<ValidationSummary items={items} onNavigate={(id) => scrollToField(id)} />
<FormSection title="Informasi Dokumen" requiredCount={2} completedCount={1}>
  {/* form fields */}
</FormSection>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Form RHF + Zod">
        <div className="border rounded-lg p-8 bg-card">
          <RhfFormDemo />
        </div>
        <CodeBlock>{`const schema = z.object({
  judul: z.string().min(1, 'Judul dokumen wajib diisi'),
})
const form = useForm({ resolver: zodResolver(schema), defaultValues: { judul: '' } })

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="judul"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Judul Dokumen</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}

const rhfSchema = z.object({
  judul: z.string().min(1, 'Judul dokumen wajib diisi'),
  nomor: z.string().min(1, 'Nomor dokumen wajib diisi'),
})

function RhfFormDemo() {
  const form = useForm<z.infer<typeof rhfSchema>>({
    resolver: zodResolver(rhfSchema),
    defaultValues: { judul: '', nomor: '' },
  })
  const [submitted, setSubmitted] = useState<z.infer<typeof rhfSchema> | null>(null)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => setSubmitted(values))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="judul"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Dokumen</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Statistik Kesejahteraan 2026" {...field} />
              </FormControl>
              <FormDescription>Judul resmi dokumen yang diajukan.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nomor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Dokumen</FormLabel>
              <FormControl>
                <Input placeholder="BPS-KALTARA/2026/001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Validasi dan Kirim</Button>
        {submitted ? (
          <p className="text-sm text-muted-foreground">
            Terkirim: {submitted.judul} ({submitted.nomor})
          </p>
        ) : null}
      </form>
    </Form>
  )
}
