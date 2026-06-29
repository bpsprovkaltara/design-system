import React from 'react'
import { Link } from 'react-router-dom'
import { Layers, Component, Palette, ArrowRight } from 'lucide-react'

export function OverviewPage() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Masthead strip */}
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-content-tertiary">
        <span className="shrink-0">Vol&nbsp;IV</span>
        <span className="h-px flex-1 bg-border-default" />
        <span className="text-amber-700 shrink-0">No.&nbsp;001</span>
        <span className="h-px w-8 bg-border-default shrink-0" />
        <span className="shrink-0">Pengantar</span>
      </div>

      {/* Hero — asymmetric editorial layout */}
      <section className="grid grid-cols-12 gap-8 lg:items-end">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="display-2xl text-content-primary tracking-tight leading-[0.95]">
            Sistem
            <br />
            Desain
            <br />
            <span className="text-amber-600 italic font-normal">Kaltara</span>
          </h1>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-content-tertiary mb-3">
            Sub&nbsp;Judul
          </p>
          <p className="h4 text-content-secondary font-normal leading-snug">
            Civic editorial. Data-first Swiss. Untuk seluruh aplikasi BPS Provinsi Kalimantan Utara.
          </p>
        </div>
      </section>

      {/* Rule break */}
      <div className="flex items-center gap-2">
        <span className="h-[4px] w-16 bg-content-primary" />
        <span className="h-px flex-1 bg-border-default" />
        <span className="h-[4px] w-2 bg-amber-500" />
      </div>

      {/* Lead paragraph with drop cap */}
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700 mb-2">
            §&nbsp;01&nbsp;·&nbsp;Maksud
          </p>
          <h2 className="h3 text-content-primary leading-tight">Tujuan & Filosofi</h2>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <p className="body-lg text-content-primary leading-relaxed first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.85] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-700 first-letter:font-semibold">
            Sistem desain ini dibangun untuk efisiensi, aksesibilitas, dan kepadatan data tinggi
            pada aplikasi internal Badan Pusat Statistik. Setiap komponen dirancang agar konsisten
            di seluruh layanan—dengan estetika editorial yang serius, palet yang ramah mata, dan
            ritme tipografi yang dapat dibaca berjam-jam tanpa lelah.
          </p>
        </div>
      </section>

      {/* Pilar — three columns with editorial numbering, Swiss grid */}
      <section className="grid grid-cols-12 gap-px bg-border-subtle border border-border-subtle">
        {[
          {
            n: '01',
            icon: Palette,
            title: 'Fondasi Modern',
            body: 'Palet Navy + Amber dioptimalkan untuk mengurangi kelelahan mata pada data padat.',
          },
          {
            n: '02',
            icon: Component,
            title: 'Komponen Enterprise',
            body: 'Library siap pakai berbasis shadcn/ui dan Radix Primitives, kompatibel Tailwind v4.',
          },
          {
            n: '03',
            icon: Layers,
            title: 'Layout Data-Dense',
            body: 'Tipografi tabular (IBM Plex Mono) dan kerapatan informasi khusus aplikasi statistik.',
          },
        ].map((pilar) => {
          const Icon = pilar.icon
          return (
            <article
              key={pilar.n}
              className="col-span-12 md:col-span-4 bg-background p-7 flex flex-col gap-3 hover:bg-muted transition-colors duration-base"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700">
                  Pilar&nbsp;{pilar.n}
                </span>
                <Icon className="w-4 h-4 text-content-tertiary" />
              </div>
              <h3 className="h4 text-content-primary leading-tight">{pilar.title}</h3>
              <p className="body-sm text-content-secondary leading-relaxed">{pilar.body}</p>
            </article>
          )
        })}
      </section>

      {/* Call-to-action — editorial style */}
      <section className="grid grid-cols-12 gap-8 lg:items-end">
        <div className="col-span-12 lg:col-span-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-content-tertiary mb-2">
            Selanjutnya
          </p>
          <h2 className="h2 text-content-primary leading-tight">
            Mulai dari fondasi—warna, tipografi, dan tata letak.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Link
            to="/foundations/colors"
            className="group inline-flex items-center gap-3 border-b-2 border-amber-500 pb-1 text-content-primary hover:text-amber-700 transition-colors"
          >
            <span className="body-base font-medium">Telusuri Foundations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Colophon — bottom rule */}
      <footer className="pt-8 border-t border-border-default">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-content-tertiary">
          <span>v4.3.0</span>
          <span className="text-center hidden sm:inline">
            Dikembangkan untuk BPS&nbsp;Provinsi&nbsp;Kalimantan&nbsp;Utara
          </span>
          <span className="text-amber-700">⊕&nbsp;Internal</span>
        </div>
      </footer>
    </div>
  )
}
