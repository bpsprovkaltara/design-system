import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { SectionTabs } from '@/components/patterns/section-tabs'
import { Plus } from 'lucide-react'

const SECTION_TAB_DEMO = [
  { href: '/pegawai', label: 'Daftar' },
  { href: '/pegawai/status-data', label: 'Status data' },
  {
    href: '/pegawai/peta',
    label: 'Peta jabatan',
    matchPrefixes: ['/pegawai/formasi'],
  },
]

export function NavigationPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Navigation"
        description="Komponen orientasi pengguna dalam aplikasi: breadcrumb, pagination, page header, dan tab berbasis rute."
      />

      <ShowcaseSection title="SectionTabs">
        <div className="rounded-lg border bg-card p-8 space-y-4">
          <p className="text-sm text-content-secondary">
            Pathname contoh: <code className="text-xs">/pegawai/status-data</code> — tab
            terpanjang yang cocok yang aktif.
          </p>
          <SectionTabs
            label="Navigasi kepegawaian"
            pathname="/pegawai/status-data"
            tabs={SECTION_TAB_DEMO}
          />
        </div>
        <CodeBlock>{`import { SectionTabs } from '@bpsprovkaltara/design-system'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const pathname = usePathname()

<SectionTabs
  label="Navigasi kepegawaian"
  pathname={pathname}
  tabs={[
    { href: '/pegawai', label: 'Daftar' },
    { href: '/pegawai/status-data', label: 'Status data' },
    { href: '/pegawai/peta', label: 'Peta jabatan', matchPrefixes: ['/pegawai/formasi'] },
  ]}
  renderLink={(tab, children) => <Link href={tab.href}>{children}</Link>}
/>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Breadcrumb">
        <div className="rounded-lg border bg-card p-8 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Pegawai</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Sub Bidang</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Laporan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <CodeBlock>{`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Detail</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Pagination">
        <div className="rounded-lg border bg-card p-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <CodeBlock>{`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Pagination — renderLink (Next.js / TanStack Router)">
        <div className="rounded-lg border bg-card p-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="/halaman/1" isActive renderLink={(props) => <a {...props} />}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="/halaman/2" renderLink={(props) => <a {...props} />}>
                  2
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <CodeBlock>{`// Konsumen framework router merender Link miliknya sendiri lewat renderLink,
// props (className, href, aria-current, isActive, dll) sudah lengkap:
<PaginationLink href="/halaman/2" renderLink={(props) => <Link {...props} />}>
  2
</PaginationLink>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Page Header">
        <div className="rounded-lg border bg-card p-8 space-y-8">
          <PageHeader
            title="Daftar Pegawai"
            description="Kelola data pegawai aktif di lingkungan BPS Provinsi Kalimantan Utara."
            action={
              <Button>
                <Plus className="h-4 w-4" />
                Tambah Pegawai
              </Button>
            }
          />
          <PageHeader title="Pengaturan Sistem" description="Konfigurasi global aplikasi." />
          <PageHeader
            title="Judul dengan Font Kustom"
            description="titleClassName memungkinkan app mengganti font judul tanpa wrapper."
            titleClassName="font-serif"
          />
        </div>
        <CodeBlock>{`<PageHeader
  title="Daftar Pegawai"
  description="Kelola data pegawai aktif ..."
  action={<Button>Tambah Pegawai</Button>}
/>

// App bisa mengganti font judul langsung tanpa wrapper komponen:
<PageHeader title="..." titleClassName="font-display" />`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
