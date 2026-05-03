# Contributing to BPS Kaltara design system

This project is an internal tool for BPS Provinsi Kalimantan Utara. External contributions are not accepted. This guide is for internal team members.

---

## Branching strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, production-deployed state |
| `feat/<short-name>` | New component or feature |
| `fix/<short-name>` | Bug fix |
| `chore/<short-name>` | Dependency updates, tooling, config |
| `docs/<short-name>` | Documentation only |

Branch from `main`. Open a PR back to `main`. Do not commit directly to `main`.

---

## Commit convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<optional scope>): <short description>

[optional body]
```

Allowed types:

| Type | When to use |
|---|---|
| `feat` | New component or capability |
| `fix` | Bug fix |
| `chore` | Build, tooling, dependency changes |
| `docs` | Documentation changes only |
| `refactor` | Code change that is neither a fix nor a feature |
| `test` | Adding or updating tests |
| `style` | Formatting, whitespace — no logic change |

Examples:

```
feat(bps-combobox): add clearable prop
fix(status-badge): correct approved variant border color
chore: upgrade vitest to 4.2.0
docs: add deployment runbook
```

---

## Pull request checklist

Before marking a PR ready for review:

- [ ] `pnpm typecheck` passes with no errors
- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm test` passes
- [ ] New component follows the five-step checklist below
- [ ] No hardcoded hex colors — all colors use `hsl(var(--token))` or Tailwind classes
- [ ] UI copy is in Bahasa Indonesia
- [ ] No emoji in UI text
- [ ] Component is accessible: keyboard-navigable, uses Radix UI primitives where applicable, has `aria-*` labels where needed
- [ ] `CHANGELOG.md` updated under `[Unreleased]`

---

## Review process

1. Open a PR against `main` with a clear title following the commit convention.
2. At least one team member must review and approve before merging.
3. Reviewer checks: visual output in the showcase app, TypeScript correctness, token usage, accessibility.
4. Squash-merge to keep `main` history linear.

> [!todo] Need input from team: nominate a primary design system maintainer responsible for final merge approvals.

---

## Adding a new component

Every new component must complete all five steps. Skipping any step means the component is not part of the public API.

**Step 1 — Create the component file**

```
src/components/ui/<component-name>.tsx
```

Follow the existing pattern: named export, TypeScript props interface, use `cn()` for class merging, use `hsl(var(--token))` or Tailwind classes for all colors.

**Step 2 — Export from the public API**

Add the export to `src/index.ts`:

```ts
export { MyComponent } from '@/components/ui/my-component'
export type { MyComponentProps } from '@/components/ui/my-component'
```

**Step 3 — Create a showcase page**

```
src/pages/components/MyComponentPage.tsx
```

Use the standard showcase pattern:

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

**Step 4 — Add a route in `src/App.tsx`**

```tsx
import { MyComponentPage } from '@/pages/components/MyComponentPage'

// inside the components Route group:
<Route path="my-component" element={<MyComponentPage />} />
```

**Step 5 — Add a sidebar navigation item in `src/components/layout/Sidebar.tsx`**

Find the components nav section and add an entry following the existing pattern.

---

## Coding conventions

- Component files: PascalCase, one component per file
- CSS variable names: kebab-case, bare HSL format — `--primary: 196 100% 40%`
- Color usage: always via `hsl(var(--token))` or Tailwind utility — never hardcode hex
- Tailwind path alias: `@/` resolves to `src/`
- Comments: only for non-obvious WHY reasoning — not what the code does
- UI copy: Bahasa Indonesia, formal tone, no emoji
- Number formatting: `new Intl.NumberFormat('id-ID').format(value)`
