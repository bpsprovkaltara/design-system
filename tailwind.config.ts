/**
 * BPS Kaltara Design System — Tailwind Config v3.0.0
 * "Civic Editorial × Data-First Swiss"
 *
 * Consumers: import bpsPreset from '@bpsprovkaltara/design-system/tailwind-preset'
 * and add to your tailwind.config.ts: presets: [bpsPreset]
 */

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui_kits/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      /* ===================================================
         COLORS — 3-layer token system
         Layer A: Primitive scales (navy, amber, etc.)
         Layer B: Semantic aliases (surface, content, etc.)
         Layer C: Component tokens (wired to B via CSS vars)
         =================================================== */
      colors: {
        /* shadcn/ui semantic compat */
        background:   'hsl(var(--background) / <alpha-value>)',
        foreground:   'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT:    'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border:  'hsl(var(--border) / <alpha-value>)',
        input:   'hsl(var(--input) / <alpha-value>)',
        ring:    'hsl(var(--ring) / <alpha-value>)',

        /* Layer B — Surface */
        surface: {
          canvas:   'hsl(var(--surface-canvas) / <alpha-value>)',
          raised:   'hsl(var(--surface-raised) / <alpha-value>)',
          sunken:   'hsl(var(--surface-sunken) / <alpha-value>)',
          inverse:  'hsl(var(--surface-inverse) / <alpha-value>)',
          overlay:  'hsl(var(--surface-overlay) / <alpha-value>)',
        },

        /* Layer B — Content */
        content: {
          primary:   'hsl(var(--content-primary) / <alpha-value>)',
          secondary: 'hsl(var(--content-secondary) / <alpha-value>)',
          tertiary:  'hsl(var(--content-tertiary) / <alpha-value>)',
          disabled:  'hsl(var(--content-disabled) / <alpha-value>)',
          inverse:   'hsl(var(--content-inverse) / <alpha-value>)',
          brand:     'hsl(var(--content-brand) / <alpha-value>)',
          accent:    'hsl(var(--content-accent) / <alpha-value>)',
        },

        /* Layer B — Brand */
        brand: {
          primary:    'hsl(var(--brand-primary) / <alpha-value>)',
          'primary-fg': 'hsl(var(--brand-primary-fg) / <alpha-value>)',
          accent:     'hsl(var(--brand-accent) / <alpha-value>)',
          'accent-fg':  'hsl(var(--brand-accent-fg) / <alpha-value>)',
        },

        /* Layer B — Feedback */
        feedback: {
          success:    'hsl(var(--feedback-success) / <alpha-value>)',
          'success-bg': 'hsl(var(--feedback-success-bg) / <alpha-value>)',
          warning:    'hsl(var(--feedback-warning) / <alpha-value>)',
          'warning-bg': 'hsl(var(--feedback-warning-bg) / <alpha-value>)',
          danger:     'hsl(var(--feedback-danger) / <alpha-value>)',
          'danger-bg':  'hsl(var(--feedback-danger-bg) / <alpha-value>)',
          info:       'hsl(var(--feedback-info) / <alpha-value>)',
          'info-bg':    'hsl(var(--feedback-info-bg) / <alpha-value>)',
        },

        /* Layer B — Data */
        data: {
          positive:  'hsl(var(--data-positive) / <alpha-value>)',
          negative:  'hsl(var(--data-negative) / <alpha-value>)',
          neutral:   'hsl(var(--data-neutral) / <alpha-value>)',
          warning:   'hsl(var(--data-warning) / <alpha-value>)',
          highlight: 'hsl(var(--data-highlight) / <alpha-value>)',
        },

        /* Chart series (10) */
        chart: {
          '1':  'hsl(var(--chart-1) / <alpha-value>)',
          '2':  'hsl(var(--chart-2) / <alpha-value>)',
          '3':  'hsl(var(--chart-3) / <alpha-value>)',
          '4':  'hsl(var(--chart-4) / <alpha-value>)',
          '5':  'hsl(var(--chart-5) / <alpha-value>)',
          '6':  'hsl(var(--chart-6) / <alpha-value>)',
          '7':  'hsl(var(--chart-7) / <alpha-value>)',
          '8':  'hsl(var(--chart-8) / <alpha-value>)',
          '9':  'hsl(var(--chart-9) / <alpha-value>)',
          '10': 'hsl(var(--chart-10) / <alpha-value>)',
        },

        /* Sidebar */
        sidebar: {
          DEFAULT:    'hsl(var(--sidebar-bg) / <alpha-value>)',
          foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
          muted:      'hsl(var(--sidebar-muted) / <alpha-value>)',
          active:     'hsl(var(--sidebar-active) / <alpha-value>)',
          hover:      'hsl(var(--sidebar-hover) / <alpha-value>)',
          ring:       'hsl(var(--sidebar-ring) / <alpha-value>)',
        },

        /* Legacy status (shadcn compat) */
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
          bg:      'hsl(var(--success-bg) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
          bg:      'hsl(var(--warning-bg) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'hsl(var(--error) / <alpha-value>)',
          bg:      'hsl(var(--error-bg) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          foreground: 'hsl(var(--info-foreground) / <alpha-value>)',
          bg:      'hsl(var(--info-bg) / <alpha-value>)',
        },

        /* Layer A — Primitive scales (for fine-grained control) */
        navy: {
          '50':  'hsl(var(--navy-50) / <alpha-value>)',
          '100': 'hsl(var(--navy-100) / <alpha-value>)',
          '200': 'hsl(var(--navy-200) / <alpha-value>)',
          '300': 'hsl(var(--navy-300) / <alpha-value>)',
          '400': 'hsl(var(--navy-400) / <alpha-value>)',
          '500': 'hsl(var(--navy-500) / <alpha-value>)',
          '600': 'hsl(var(--navy-600) / <alpha-value>)',
          '700': 'hsl(var(--navy-700) / <alpha-value>)',
          '800': 'hsl(var(--navy-800) / <alpha-value>)',
          '900': 'hsl(var(--navy-900) / <alpha-value>)',
          '950': 'hsl(var(--navy-950) / <alpha-value>)',
        },
        amber: {
          '50':  'hsl(var(--amber-50) / <alpha-value>)',
          '100': 'hsl(var(--amber-100) / <alpha-value>)',
          '200': 'hsl(var(--amber-200) / <alpha-value>)',
          '300': 'hsl(var(--amber-300) / <alpha-value>)',
          '400': 'hsl(var(--amber-400) / <alpha-value>)',
          '500': 'hsl(var(--amber-500) / <alpha-value>)',
          '600': 'hsl(var(--amber-600) / <alpha-value>)',
          '700': 'hsl(var(--amber-700) / <alpha-value>)',
          '800': 'hsl(var(--amber-800) / <alpha-value>)',
          '900': 'hsl(var(--amber-900) / <alpha-value>)',
          '950': 'hsl(var(--amber-950) / <alpha-value>)',
        },
        emerald: {
          '50':  'hsl(var(--emerald-50) / <alpha-value>)',
          '100': 'hsl(var(--emerald-100) / <alpha-value>)',
          '200': 'hsl(var(--emerald-200) / <alpha-value>)',
          '300': 'hsl(var(--emerald-300) / <alpha-value>)',
          '400': 'hsl(var(--emerald-400) / <alpha-value>)',
          '500': 'hsl(var(--emerald-500) / <alpha-value>)',
          '600': 'hsl(var(--emerald-600) / <alpha-value>)',
          '700': 'hsl(var(--emerald-700) / <alpha-value>)',
          '800': 'hsl(var(--emerald-800) / <alpha-value>)',
          '900': 'hsl(var(--emerald-900) / <alpha-value>)',
          '950': 'hsl(var(--emerald-950) / <alpha-value>)',
        },
        crimson: {
          '50':  'hsl(var(--crimson-50) / <alpha-value>)',
          '100': 'hsl(var(--crimson-100) / <alpha-value>)',
          '200': 'hsl(var(--crimson-200) / <alpha-value>)',
          '300': 'hsl(var(--crimson-300) / <alpha-value>)',
          '400': 'hsl(var(--crimson-400) / <alpha-value>)',
          '500': 'hsl(var(--crimson-500) / <alpha-value>)',
          '600': 'hsl(var(--crimson-600) / <alpha-value>)',
          '700': 'hsl(var(--crimson-700) / <alpha-value>)',
          '800': 'hsl(var(--crimson-800) / <alpha-value>)',
          '900': 'hsl(var(--crimson-900) / <alpha-value>)',
          '950': 'hsl(var(--crimson-950) / <alpha-value>)',
        },
        warm: {
          '50':  'var(--warm-50)',
          '100': 'var(--warm-100)',
          '200': 'var(--warm-200)',
        },
      },

      /* Font Families */
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans:    ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'JetBrains Mono', 'Cascadia Code', 'monospace'],
      },

      /* Border Radius (restrained — institutional) */
      borderRadius: {
        none: 'var(--radius-none)',
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        full: 'var(--radius-full)',
      },

      /* Elevation/Shadow System */
      boxShadow: {
        'elevation-0': 'var(--elevation-0)',
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-3': 'var(--elevation-3)',
        'elevation-4': 'var(--elevation-4)',
        'elevation-5': 'var(--elevation-5)',
        xs:     'var(--shadow-xs)',
        sm:     'var(--shadow-sm)',
        md:     'var(--shadow-md)',
        lg:     'var(--shadow-lg)',
        xl:     'var(--shadow-xl)',
        inner:  'var(--shadow-inner)',
      },

      /* Motion */
      transitionDuration: {
        instant: 'var(--motion-duration-instant)',
        fast:    'var(--motion-duration-fast)',
        base:    'var(--motion-duration-base)',
        slow:    'var(--motion-duration-slow)',
        slower:  'var(--motion-duration-slower)',
      },
      transitionTimingFunction: {
        'ease-out':    'var(--motion-ease-out)',
        'ease-in-out': 'var(--motion-ease-in-out)',
        'ease-spring': 'var(--motion-ease-spring)',
      },

      /* Container Widths */
      maxWidth: {
        'container-sm':  'var(--container-sm)',
        'container-md':  'var(--container-md)',
        'container-lg':  'var(--container-lg)',
        'container-xl':  'var(--container-xl)',
        'container-2xl': 'var(--container-2xl)',
      },

      /* Sidebar */
      width: {
        'sidebar-expanded':  'var(--sidebar-width-expanded)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed)',
      },

      /* Z-Index */
      zIndex: {
        base:     'var(--z-base)',
        raised:   'var(--z-raised)',
        dropdown: 'var(--z-dropdown)',
        sticky:   'var(--z-sticky)',
        overlay:  'var(--z-overlay)',
        modal:    'var(--z-modal)',
        toast:    'var(--z-toast)',
      },

      /* Typography — mapped scales */
      fontSize: {
        'display-2xl': [
          'var(--text-display-2xl-size)',
          { lineHeight: 'var(--text-display-2xl-lh)', letterSpacing: 'var(--text-display-2xl-ls)' },
        ],
        'display-xl': [
          'var(--text-display-xl-size)',
          { lineHeight: 'var(--text-display-xl-lh)', letterSpacing: 'var(--text-display-xl-ls)' },
        ],
        'display-lg': [
          'var(--text-display-lg-size)',
          { lineHeight: 'var(--text-display-lg-lh)', letterSpacing: 'var(--text-display-lg-ls)' },
        ],
        h1: ['var(--text-h1-size)', { lineHeight: 'var(--text-h1-lh)' }],
        h2: ['var(--text-h2-size)', { lineHeight: 'var(--text-h2-lh)' }],
        h3: ['var(--text-h3-size)', { lineHeight: 'var(--text-h3-lh)' }],
        h4: ['var(--text-h4-size)', { lineHeight: 'var(--text-h4-lh)' }],
        'body-lg': ['var(--text-body-lg-size)', { lineHeight: 'var(--text-body-lg-lh)' }],
        body:      ['var(--text-body-size)',    { lineHeight: 'var(--text-body-lh)' }],
        'body-sm': ['var(--text-body-sm-size)', { lineHeight: 'var(--text-body-sm-lh)' }],
        caption:   ['var(--text-caption-size)', { lineHeight: 'var(--text-caption-lh)' }],
        micro:     ['var(--text-micro-size)',   { lineHeight: 'var(--text-micro-lh)', letterSpacing: 'var(--text-micro-ls)' }],
        mono:      ['var(--text-mono-size)',    { lineHeight: 'var(--text-mono-lh)' }],
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        shimmer:         'shimmer 1.8s infinite linear',
        'fade-in':       'fade-in 200ms var(--motion-ease-out) forwards',
        'slide-in-right': 'slide-in-right 320ms var(--motion-ease-out) forwards',
        'scale-in':      'scale-in 200ms var(--motion-ease-spring) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
