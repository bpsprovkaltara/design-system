# Form Overlays + Consumer Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lengkapi design system dengan pola overlay form (`FormDialog`, `FormSheet`), `SectionTabs` (gelombang 2), dan panduan migrasi konsumen dari temuan Suaraku/Menara — tanpa mengedit repo konsumen.

### Task 5: SectionTabs (Gelombang 2) — DONE

**Files:** `src/components/patterns/section-tabs.tsx` + `.test.tsx`, `src/index.ts`, `NavigationPage.tsx`, docs.

- [x] TDD `resolveActiveTab` (prefix terpanjang, `matchPrefixes`, no match)
- [x] TDD `SectionTabs` (`aria-current`, `renderLink` clone classes)
- [x] Export + showcase Navigation + CHANGELOG / UPGRADE_NOTES / consumer-chrome

### Task 6: Chrome slots (Gelombang 3) — DONE

**Files:** `notification-popover`, `command-search`, `sidebar-account`, `use-persisted-collapsed` (+ tests), OverlaysPage, PatternsPage, docs.

- [x] NotificationPopover (badge, mark-all, empty/loading/list)
- [x] CommandSearch (inline + panel + ⌘K)
- [x] SidebarAccount (expanded/collapsed slots)
- [x] usePersistedCollapsed
- [x] lint + 231 tests + browser smoke (notif + sidebar account)

**Architecture:** Dua komposit tipis di atas `Dialog`/`Sheet` (API selaras Menara/Suaraku: controlled/uncontrolled, `trigger`, render-prop `close()`), tanpa `motion`. Dokumentasi di `GUIDE.md` + `CHANGELOG` Unreleased menjelaskan apa yang sudah ada di 4.7 vs apa yang baru, dan apa yang tetap lokal di app.

**Tech Stack:** React 19, TypeScript, Vitest + Testing Library, Vite library build, Tailwind token existing.

**Spec:** Session plan `plan.md` (audit Suaraku/Menara 2026-09-05) + ADR `docs/decisions/0002-no-motion-js-dependency.md`.

## Global Constraints

- Jangan edit Suaraku/Menara.
- Jangan menambah dependency `motion`.
- Named export + tipe props publik; file kebab-case; `'use client'` karena Dialog/Sheet client.
- Checklist: implementasi → `src/index.ts` (+ subpath via `components/ui/*` exports existing) → test berdampingan → demo di `OverlaysPage` → verifikasi `typecheck`/`lint`/`test`.
- Copy UI Bahasa Indonesia formal, tanpa emoji.
- Coverage kode baru/berubah >=80%.

---

### Task 1: FormDialog (TDD)

**Files:**
- Create: `src/components/ui/form-dialog.test.tsx`
- Create: `src/components/ui/form-dialog.tsx`
- Modify: `src/index.ts` (export)
- Modify: `src/pages/components/OverlaysPage.tsx` (demo)

**Interfaces:**
- Produces:
  ```ts
  export interface FormDialogProps {
    title: string
    description?: string
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode | ((close: () => void) => React.ReactNode)
    className?: string
  }
  export function FormDialog(props: FormDialogProps): JSX.Element
  ```

- [x] **Step 1: Write failing tests** for: open via trigger; render title/description; children as function receives `close` that dismisses; controlled `open`/`onOpenChange`.
- [x] **Step 2: Run tests — expect FAIL** (`FormDialog` missing).
- [x] **Step 3: Implement minimal `FormDialog`** wrapping Dialog primitives (no motion).
- [x] **Step 4: Run tests — expect PASS**.
- [x] **Step 5: Export from `src/index.ts`; add showcase section on OverlaysPage.

### Task 2: FormSheet (TDD)

**Files:**
- Create: `src/components/ui/form-sheet.test.tsx`
- Create: `src/components/ui/form-sheet.tsx`
- Modify: `src/index.ts`
- Modify: `src/pages/components/OverlaysPage.tsx`

**Interfaces:**
- Produces:
  ```ts
  export interface FormSheetProps {
    title: string
    description?: string
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode | ((close: () => void) => React.ReactNode)
    className?: string
    side?: 'right' | 'left'
    footer?: React.ReactNode | ((close: () => void) => React.ReactNode)
  }
  export function FormSheet(props: FormSheetProps): JSX.Element
  ```

- [x] Same TDD cycle as Task 1; default `side="right"`; header bordered; body scroll; optional footer slot.

### Task 3: Consumer guide (Gelombang 0)

**Files:**
- Modify: `GUIDE.md` — section singkat “Chrome & pola konsumen”
- Modify: `CHANGELOG.md` — Unreleased Added for FormDialog/FormSheet + note migrasi pola 4.7
- Modify: `UPGRADE_NOTES.md` — catatan opsional FormDialog/FormSheet vs Dialog/Sheet mentah; peta pola 4.7 yang menggantikan fork lokal Menara

- [x] Tulis panduan: AppShell sudah punya toggle; pola 4.7 yang bisa mengganti fork lokal; FormDialog/FormSheet untuk form overlay; apa yang tetap di app (auth footer, fetch notif/search, motion, domain hero).
- [x] `git diff --check` pada file docs.

### Task 4: Verification

- [x] `pnpm typecheck` — gagal pre-existing (`tsconfig` `baseUrl` dihapus di TS 6); bukan dari perubahan ini
- [x] `pnpm lint` — lulus
- [x] `pnpm test` — 214/214 lulus (termasuk 6 tes FormDialog/FormSheet)
- [x] Tinjau diff; pastikan tidak menyentuh `dist/` sebagai source, tidak ada secret.
- [x] Browser: `/components/overlays` — FormDialog & FormSheet membuka dengan judul benar (desktop + coba mobile viewport)
