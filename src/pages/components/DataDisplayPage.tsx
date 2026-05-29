import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'
import { KpiCard } from '@/components/ui/kpi-card'
import { Progress } from '@/components/ui/progress'
import { Calendar } from '@/components/ui/calendar'
import { Users, FileBarChart, Database, ShieldCheck } from 'lucide-react'

export function DataDisplayPage() {
  const [tanggal, setTanggal] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Data Display"
        description="Komponen visualisasi ringkas: avatar, KPI, progress, dan kalender."
      />

      <ShowcaseSection title="Avatar">
        <div className="rounded-lg border bg-card p-8 space-y-6">
          <div className="flex items-end gap-3">
            <Avatar size="xs">
              <AvatarFallback>FZ</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>FZ</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>FZ</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>FZ</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="https://github.com/shadcn.png" alt="contoh" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="mb-2 text-sm text-muted-foreground">Avatar Group</div>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>BU</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>SI</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </div>
        </div>
        <CodeBlock>{`<Avatar size="lg">
  <AvatarImage src="..." alt="Nama Pengguna" />
  <AvatarFallback>NP</AvatarFallback>
</Avatar>

<AvatarGroup>
  <Avatar><AvatarFallback>FA</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>BU</AvatarFallback></Avatar>
</AvatarGroup>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="KPI Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Pegawai Aktif"
            value="1.284"
            helper="+12 dari bulan lalu"
            icon={<Users className="h-4 w-4" />}
          />
          <KpiCard
            title="Laporan Disetujui"
            value="312"
            helper="89% dari target"
            icon={<FileBarChart className="h-4 w-4" />}
          />
          <KpiCard
            title="Dataset"
            value="48"
            helper="6 terbarui hari ini"
            icon={<Database className="h-4 w-4" />}
          />
          <KpiCard
            title="Kepatuhan SOP"
            value="96%"
            helper="Periode triwulan I"
            icon={<ShieldCheck className="h-4 w-4" />}
          />
        </div>
        <CodeBlock>{`<KpiCard
  title="Pegawai Aktif"
  value="1.284"
  helper="+12 dari bulan lalu"
  icon={<Users className="h-4 w-4" />}
/>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Progress">
        <div className="rounded-lg border bg-card p-8 space-y-5">
          <div className="space-y-2">
            <div className="text-sm">Default (sedang berjalan)</div>
            <Progress value={62} />
          </div>
          <div className="space-y-2">
            <div className="text-sm">Success</div>
            <Progress value={100} intent="success" />
          </div>
          <div className="space-y-2">
            <div className="text-sm">Warning</div>
            <Progress value={45} intent="warning" />
          </div>
          <div className="space-y-2">
            <div className="text-sm">Danger</div>
            <Progress value={18} intent="danger" />
          </div>
          <div className="grid grid-cols-3 gap-3 items-center">
            <Progress value={40} size="sm" />
            <Progress value={60} />
            <Progress value={80} size="lg" />
          </div>
        </div>
        <CodeBlock>{`<Progress value={62} />
<Progress value={45} intent="warning" />
<Progress value={80} size="lg" />`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Calendar">
        <div className="rounded-lg border bg-card p-8 flex justify-center">
          <Calendar
            mode="single"
            selected={tanggal}
            onSelect={setTanggal}
            className="rounded-md border"
          />
        </div>
        <CodeBlock>{`<Calendar
  mode="single"
  selected={tanggal}
  onSelect={setTanggal}
/>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
