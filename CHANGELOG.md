# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- GitHub Actions CI (`.github/workflows/ci.yml`): typecheck, lint, test, `build:lib`, `build` pada push/PR ke `main`
- `docs/releases/v4.0.0-github.md` — teks siap tempel untuk halaman rilis GitHub

### Changed

- `Dockerfile`: builder/runtime **Node 20** + **pnpm** + `pnpm-lock.yaml` (menggantikan image Bun)
- `docker-compose.yml`: menghapus kunci `version` yang sudah usang
- Dokumentasi: `docs/deployment.md`, `docs/development.md`, `docs/runbook.md` diselaraskan dengan v4 / Node 20
- `UPGRADE_NOTES.md`: panduan konsumen diperluas (Vite, `@source`, checklist)

## [4.0.0] - 2026-05-10

### Added

- `UPGRADE_NOTES.md` untuk panduan migrasi v3 → v4

### Changed

- **Breaking:** Peer dependencies — `react` dan `react-dom` **≥ 19**, `tailwindcss` **≥ 4**
- **Breaking:** `engines.node` **≥ 20**
- Stack showcase dan library: React 19, Tailwind CSS 4, Vite 8, TypeScript 6
- Komponen UI: migrasi dari `forwardRef` ke pola `ref` sebagai prop (React 19)
- Ekspor `tailwind-preset`: shim deprecation dengan peringatan runtime; migrasi konsumen ke impor `styles.css` + konfigurasi Tailwind 4 mandiri

## [3.0.0] - 2025-04-15

### Added

- BPS app shell components: `AppTopbar`, `PageHeader`, `FilterBar`, `BulkActionBar`
- Data-management components: `DataTable` (with sorting, pagination, column visibility), `DataStatePanel`, `ConfirmActionDialog`
- Form workflow components: `FormSection`, `DatePicker`, `Combobox`
- Feedback and status components: `ProgressAudit`, `ReviewTimeline`, `ValidationSummary`
- `PerformanceCard` with sparkline, delta badge, and target percentage display
- `KpiCard` for KPI metric display
- `EmptyState` pattern component with three built-in inline SVG illustrations (`empty`, `search`, `error`)
- `StatusBadge` with four workflow variants: `draft`, `pending`, `revised`, `approved`
- `Spinner` component
- `AvatarGroup` for stacked avatar display
- Three-layer design token system in `colors_and_type.css`: primitive scales, semantic aliases, shadcn/ui compat
- 10-color chart series (`--chart-1` through `--chart-10`), colorblind-safe, BPS brand trio first
- Map choropleth tier tokens (`--map-tier-0` through `--map-tier-5`)
- Tailwind preset export at `@bpsprovkaltara/design-system/tailwind-preset`
- Dual ESM/CJS library build via `vite.lib.config.ts`
- Vitest 4 test suite with jsdom and `@testing-library/react`
- Husky pre-commit hook running lint-staged (ESLint + Prettier)
- Docker multi-stage build (Bun) serving on port 8081 via `bun x serve`
- Docker Compose configuration with Traefik reverse proxy on `design.kaltarastats.id`

### Fixed

- Dockerfile `CMD` updated to include explicit listen port (`-l 8081`), no-clipboard (`-n`), and SPA fallback (`-s`) flags for `bun x serve`
- Resolved ESLint lint errors across all component files

### Changed

- Design theme established as "Civic Editorial x Data-First Swiss"
- shadcn/ui style set to `new-york`
- Package name set to `@bpsprovkaltara/design-system`

## [2.x] - legacy

Version 2.x is no longer maintained. No migration guide is available. Upgrade directly to 4.0.0 (lihat `UPGRADE_NOTES.md` jika dari v3).

[Unreleased]: https://github.com/bpsprovkaltara/design-system/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/bpsprovkaltara/design-system/releases/tag/v4.0.0
[3.0.0]: https://github.com/bpsprovkaltara/design-system/releases/tag/v3.0.0
