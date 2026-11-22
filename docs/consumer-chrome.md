# Consumer application chrome — what the DS provides vs what stays local

The library contract for consumer applications; the history of when each item was introduced is recorded in the
CHANGELOG and the release tags. The goal: use the design system to the fullest without
forcing the application's domain into the package.

## Already provided by the design system

| Need | Component / pattern | Since |
|---|---|---|
| App layout + **sidebar collapse toggle** + mobile menu | `AppShell` (+ `AppSidebar`, `AppTopbar`) | 4.5 / the toggle in `AppShell` since **4.6.0** |
| Card with a header (icon, actions, summary) | `SectionCard` | 4.7.0 |
| Table list card + pagination footer | `DataTableCard` | 4.7.0 |
| Link-based filter chips | `FilterChips` (+ `LinkButton` variant `nav`) | 4.7.0 |
| Page skeleton `table` / `cards` / `detail` | `PageSkeleton` | 4.7.0 |
| KPI with an accent | `KpiCard` + `accent` | 4.7.0 |
| Tooltip on a badge | `BadgeTooltip` | 4.7.0 |
| A "view detail" action on a table row | `RowDetailLink` | 4.7.0 |
| A soft card skin | `Card variant="surface"` | 4.7.0 |
| Confirmation overlay | `ConfirmDialog` | 4.5+ |
| Form overlay (dialog / sheet) | `FormDialog`, `FormSheet` | 4.8.0 |
| Sibling route tabs (not Radix Tabs) | `SectionTabs`, `resolveActiveTab` | 4.8.0 |
| Notification bell (UI only) | `NotificationPopover` | 4.8.0 |
| Topbar search (panel + ⌘K) | `CommandSearch` (+ `CommandGroup`/`CommandItem`) | 4.8.0 |
| Sidebar account footer | `SidebarAccount` | 4.8.0 |
| Persist the sidebar collapse | `usePersistedCollapsed` | 4.8.0 |
| Command palette / search building blocks | `Command` (`inline` \| `dialog`), `CommandDialog`, `Kbd` | 4.7.0 |

**Important:** the sidebar collapse button is **no longer** in `AppSidebar` (breaking
in 4.6.0). Use `AppShell`; do not reimplement the toggle in the application
unless you assemble your own rail without `AppShell`.

## Stays in the application (reasonable customization)

- The logo, `nav` groups, RBAC, `renderLink` to the framework router (Next.js `Link`).
- Persisting `collapsed` in `localStorage` (a simple pattern; may be copied).
- The account footer / switch role / sign out — the auth data and actions belong to the app.
- The notification bell & global search — the **fetch, DTOs, and authorization** belong to the app;
  the DS provides the shell (`NotificationPopover`, `CommandSearch`) + primitives
  (`CommandGroup`, `Badge`, …).
- The domain hero (a position-themed `DetailHero`), module insights with a count-up,
  ECharts charts, `motion` animation — deliberately not lifted (see ADR 0002).

## Quick migration from the local Menara fork (4.7+)

If the app still imports a local copy whose name is the same as a DS pattern:

| Local (Menara example) | Replace with |
|---|---|
| `presentation/components/ui/section-card` | `SectionCard` |
| `…/data-table-card` | `DataTableCard` |
| `…/filter-chips` | `FilterChips` |
| `…/page-skeleton` | `PageSkeleton` |
| `…/badge-tooltip` | `BadgeTooltip` |
| `…/row-detail-link` | `RowDetailLink` (`asChild` + Next `Link`) |
| `…/stat-card` | `KpiCard` + `accent` |
| `…/form-dialog` / `form-drawer` | `FormDialog` / `FormSheet` |
| `…/section-tabs` | `SectionTabs` (+ `pathname` + `renderLink`) |

Upgrade the dependency to `^4.8.1` (or a version that contains `FilterChips.renderLink`)
first; only then change the imports. An app wrapper on top of `AppShell` (logo + footer + search)
is still legitimate — that is composition, not duplicating the chrome.

## Framework link contract (Next.js / TanStack Router)

The DS does **not** depend on Next.js. The default link is `<a href>`. Router
consumers must fill in the following holes so in-app navigation does not do a full reload:

| Component | Hole |
|---|---|
| `AppShell` / `AppSidebar` | `renderLink` |
| `SectionTabs` | `pathname` + `renderLink` |
| `FilterChips` | `renderLink` |
| `RowDetailLink` | `asChild` + a framework `Link` element |
| `LinkButton` | `asChild` + a framework `Link` element |
| `TablePagination` | `hrefForPage` **and** `renderLink` |

One adapter module per app (do not repeat it on every page):

```tsx
// presentation/lib/ds-link.tsx — owned by the application
import Link from 'next/link'
import type { PaginationLinkRenderProps } from '@bpsprovkaltara/design-system'

export function renderNavLink(
  item: { href: string },
  children: React.ReactNode
) {
  return <Link href={item.href}>{children}</Link>
}

export function renderPaginationLink(props: PaginationLinkRenderProps) {
  return <Link {...props} />
}
```

The width of `FormSheet` is set through `className` (`sm:max-w-[480px]`), not `style`
on `html` or a `width` prop.

## New application checklist

- [ ] Tailwind4: `tokens.css` + `@source` to `dist`; non-Tailwind: `styles.css` once
- [ ] Production fonts self-hosted; the `fonts.css` CDN only opt-in
- [ ] `AppShell` + `usePersistedCollapsed`; do not assemble your own sidebar toggle
- [ ] A link adapter file (`presentation/lib/ds-link.tsx` or equivalent) exists before the first list page
- [ ] Do not fork `SectionCard` / overlays / pagination / filter chips
- [ ] Do not override `--navy-*` / `--amber-*` without a written decision
- [ ] Do not add parallel overlay CSS (`t-modal`, `t-drawer`, `t-notif`, `t-tabs`)
- [ ] Destructive confirmation uses `ConfirmDialog`, not a dialog + inline colors
- [ ] Topbar search uses `CommandSearch` (the fetch stays in the app)
- [ ] Tabs **inside** a page use `Tabs`; **sibling route** tabs use `SectionTabs`
- [ ] A local lint fence: forbid raw `RowDetailLink`/`LinkButton`/`TablePagination` (see Menara) and the legacy overlay chrome classes (see Suaraku)
