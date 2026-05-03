import React from 'react'
import { Activity, Gauge, TrendingDown, Users } from 'lucide-react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { BpsPerformanceCard } from '@/components/ui/bps-performance-card'

const trendUp = [82, 88, 85, 91, 94, 98, 102]
const trendDown = [12.4, 11.8, 10.2, 9.6, 8.9, 8.1, 7.4]

export function BpsPerformanceCardPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="BPS Performance Card"
        description="Kartu metrik premium untuk dashboard data-heavy. Tiga varian (default, glass, gradient) dengan sparkline, target, delta, dan loading state. Format angka Indonesia (id-ID) bawaan."
      />

      <ShowcaseSection title="Varian Default">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <BpsPerformanceCard
            title="Total Penduduk"
            value={728498}
            unit="jiwa"
            icon={Users}
            delta={{ value: 2.4, direction: 'up', period: 'dari 2024' }}
          />
          <BpsPerformanceCard
            title="Tingkat Pengangguran"
            value={4.9}
            unit="%"
            icon={TrendingDown}
            delta={{ value: 0.6, direction: 'down', period: 'dari Q1 2025' }}
          />
          <BpsPerformanceCard title="Indeks Pembangunan" value={72.5} target={75} icon={Gauge} />
        </div>
        <CodeBlock>
          {`<BpsPerformanceCard
  title="Total Penduduk"
  value={728498}
  unit="jiwa"
  icon={Users}
  delta={{ value: 2.4, direction: 'up', period: 'dari 2024' }}
/>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Varian Gradient (hero metric)">
        <div className="grid gap-4 md:grid-cols-2">
          <BpsPerformanceCard
            variant="gradient"
            title="PDRB Per Kapita"
            value={48200000}
            unit="Rupiah"
            icon={Activity}
            delta={{ value: 5.2, direction: 'up', period: 'YoY 2024' }}
            trend={trendUp}
          />
          <BpsPerformanceCard
            variant="gradient"
            title="Tingkat Kemiskinan"
            value={6.1}
            unit="%"
            target={5}
            icon={TrendingDown}
            delta={{ value: 0.3, direction: 'down', period: 'dari 2024' }}
            trend={trendDown}
          />
        </div>
        <CodeBlock>
          {`<BpsPerformanceCard
  variant="gradient"
  title="PDRB Per Kapita"
  value={48200000}
  unit="Rupiah"
  icon={Activity}
  delta={{ value: 5.2, direction: 'up', period: 'YoY 2024' }}
  trend={[82, 88, 85, 91, 94, 98, 102]}
/>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Varian Glass (overlay di backdrop berwarna)">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary/80 to-amber-500 p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <BpsPerformanceCard variant="glass" title="Survei Aktif" value={42} icon={Activity} />
            <BpsPerformanceCard
              variant="glass"
              title="Responden Tercapai"
              value={18456}
              target={20000}
              delta={{ value: 12.8, direction: 'up', period: 'minggu ini' }}
            />
            <BpsPerformanceCard
              variant="glass"
              title="Dokumen Diverifikasi"
              value={312}
              icon={Gauge}
              trend={trendUp}
            />
          </div>
        </div>
        <CodeBlock>
          {`<div className="bg-gradient-to-br from-primary to-amber-500 p-8">
  <BpsPerformanceCard
    variant="glass"
    title="Responden Tercapai"
    value={18456}
    target={20000}
    delta={{ value: 12.8, direction: 'up', period: 'minggu ini' }}
  />
</div>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Bento Grid Layout (data-density)">
        <div className="grid grid-cols-12 gap-4">
          <BpsPerformanceCard
            variant="gradient"
            className="col-span-12 lg:col-span-6"
            title="Inflasi Kalimantan Utara"
            value={2.87}
            unit="%"
            icon={Activity}
            delta={{ value: 0.12, direction: 'down', period: 'bulan lalu' }}
            trend={[3.4, 3.2, 3.1, 2.95, 2.9, 2.88, 2.87]}
          />
          <BpsPerformanceCard
            className="col-span-6 lg:col-span-3"
            title="Pertumbuhan Ekonomi"
            value={5.4}
            unit="%"
            icon={TrendingDown}
            delta={{ value: 0.2, direction: 'up', period: 'YoY' }}
          />
          <BpsPerformanceCard
            className="col-span-6 lg:col-span-3"
            title="Angka Harapan Hidup"
            value={72.9}
            unit="tahun"
            icon={Users}
          />
          <BpsPerformanceCard className="col-span-4" title="IPM" value={72.5} target={75} />
          <BpsPerformanceCard
            className="col-span-4"
            title="Gini Ratio"
            value={0.32}
            delta={{ value: 0.01, direction: 'down', period: 'dari 2024' }}
          />
          <BpsPerformanceCard
            className="col-span-4"
            title="TPT"
            value={4.9}
            unit="%"
            delta={{ value: 0.6, direction: 'down', period: 'Q1 ke Q2' }}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Loading State">
        <div className="grid gap-4 md:grid-cols-3">
          <BpsPerformanceCard title="Memuat" value={0} loading />
          <BpsPerformanceCard title="Memuat" value={0} variant="gradient" loading />
          <BpsPerformanceCard title="Memuat" value={0} loading />
        </div>
        <CodeBlock>{`<BpsPerformanceCard title="Memuat" value={0} loading />`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
