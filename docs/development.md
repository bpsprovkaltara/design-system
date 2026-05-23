# Development guide

---

## Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | >= 20 | https://nodejs.org or `nvm install 20` |
| pnpm | 10.30.0 | `npm install -g pnpm@10.30.0` |

The project declares `"packageManager": "pnpm@10.30.0"` in `package.json`. Using a different package manager may produce an incorrect lockfile.

---

## Local setup

```bash
git clone https://github.com/bpsprovkaltara/design-system.git
cd design-system
pnpm install
pnpm dev
```

The showcase app starts at http://localhost:5173. Hot reload is enabled for all source files.

---

## All scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Showcase app dev server at port 5173 |
| `build` | `tsc && vite build` | Build the showcase app to `dist/` |
| `build:lib` | `vite build --config vite.lib.config.ts` | Build the library to `dist/` |
| `test` | `vitest run` | Run all tests once |
| `test:watch` | `vitest` | Run tests in watch mode |
| `test:ui` | `vitest --ui` | Open Vitest browser UI |
| `test:coverage` | `vitest run --coverage` | Generate coverage report (v8, lcov + text) |
| `lint` | `eslint src` | Lint all source files |
| `lint:fix` | `eslint src --fix` | Auto-fix lint errors |
| `format` | `prettier --write "src/**/*.{ts,tsx,css}"` | Format all source files |
| `format:check` | `prettier --check "src/**/*.{ts,tsx,css}"` | Check formatting without writing |
| `typecheck` | `tsc --noEmit` | TypeScript type check without emitting output |
| `prepare:hooks` | `husky` | Install Husky git hooks |

---

## Showcase app routes

| Path | Page component |
|---|---|
| `/` | `OverviewPage` |
| `/installation` | `InstallationPage` |
| `/foundations/colors` | `ColorsPage` |
| `/foundations/typography` | `TypographyPage` |
| `/foundations/spacing` | `SpacingPage` |
| `/components/buttons` | `ButtonsPage` |
| `/components/badges` | `BadgesPage` |
| `/components/cards` | `CardsPage` |
| `/components/inputs` | `InputsPage` |
| `/components/table` | `TablePage` |
| `/components/toast` | `ToastPage` |
| `/components/loading` | `LoadingPage` |
| `/components/essentials` | `EssentialsPage` |
| `/components/navigation-menu` | `NavigationMenuPage` |
| `/components/carousel` | `CarouselPage` |
| `/components/drawer` | `DrawerPage` |
| `/components/form-workflow` | `FormWorkflowPage` |
| `/components/data-management` | `DataManagementPage` |
| `/components/feedback-status` | `FeedbackStatusPage` |
| `/components/performance-card` | `PerformanceCardPage` |
| `/prototypes/dashboard` | `DashboardPage` |
| `/prototypes/auth` | `AuthPage` |
| `/prototypes/list` | `ListPage` |
| `/prototypes/detail` | `DetailPage` |
| `/prototypes/settings` | `SettingsPage` |

---

## Adding a new component

Every new component requires all five steps. The component is not part of the public API until all steps are complete.

**1. Create the component file**

```
src/components/ui/<component-name>.tsx
```

**2. Export from `src/index.ts`**

```ts
export { MyComponent } from '@/components/ui/my-component'
export type { MyComponentProps } from '@/components/ui/my-component'
```

**3. Create a showcase page**

```
src/pages/components/MyComponentPage.tsx
```

```tsx
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'

export function MyComponentPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader title="Nama Komponen" description="Deskripsi singkat." />
      <ShowcaseSection title="Varian dasar">
        {/* demo */}
        <CodeBlock>{`<MyComponent />`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
```

**4. Add a route in `src/App.tsx`**

```tsx
import { MyComponentPage } from '@/pages/components/MyComponentPage'

// inside <Route path="components">:
<Route path="my-component" element={<MyComponentPage />} />
```

**5. Add a sidebar nav item in `src/components/layout/Sidebar.tsx`**

Find the components section and add an entry following the existing pattern.

---

## Token system

Design tokens live in `colors_and_type.css` in three layers:

- **Layer A — primitives**: `--navy-*`, `--amber-*`, `--emerald-*`, `--crimson-*`, `--slate-*`, `--warm-*`
- **Layer B — semantic**: `--surface-*`, `--content-*`, `--brand-*`, `--feedback-*`, `--data-*`, `--chart-1..10`
- **Layer C — component**: `--primary`, `--background`, `--border`, etc. (shadcn/ui names)

Reference Layer B tokens in component code. Never reference Layer A primitives directly in components.

All tokens are bare HSL components. Use as `hsl(var(--token))` in CSS, or as Tailwind classes (e.g. `bg-primary`, `text-content-primary`).

---

## Coding conventions

| Rule | Detail |
|---|---|
| Component filenames | PascalCase, one component per file |
| CSS variable names | kebab-case, bare HSL format — `--primary: 196 100% 40%` |
| Color in code | Always `hsl(var(--token))` or Tailwind class — never hardcode hex |
| Path alias | `@/` resolves to `src/` |
| Comments | Only for non-obvious WHY reasoning |
| UI copy language | Bahasa Indonesia, formal tone |
| Emoji in UI | Not allowed (formal BPS brand) |
| Number formatting | `new Intl.NumberFormat('id-ID').format(value)` |

---

## Common issues

### cmdk CommandInput shows browser focus ring (black border)

The `CommandInput` from cmdk renders a native `<input>` that gets the browser's default focus outline. Add these classes:

```tsx
<CommandInput className="focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0" />
```

This is already applied in `combobox.tsx`. Apply it to any other custom `CommandInput` usage.

### warm-* token produces invalid CSS

Do not write `hsl(var(--warm-50))`. The `--warm-50` variable is already `hsl(33 20% 97%)` — wrapping it again produces `hsl(hsl(...))` which is invalid.

Use the pre-wrapped form directly:

```css
background: var(--warm-50);        /* correct */
background: hsl(var(--warm-50));   /* WRONG — double-wrapped */
background: hsl(var(--warm-50-hsl));  /* correct when you need opacity modifier support */
```

### Skeleton shimmer animation not working

The `Skeleton` component uses `animate-shimmer`, a custom keyframe animation defined in `colors_and_type.css`. If the animation is not running, verify the consumer app imports the design system stylesheet:

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

### Fonts not loading

Google Fonts are loaded via CDN in `colors_and_type.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:...')
```

In environments where Google Fonts CDN is blocked (e.g. internal networks with restricted outbound traffic), the fonts fall back to the system stack defined in `colors_and_type.css`. A self-hosted font setup is not yet configured. See `docs/runbook.md` for the mitigation steps.
