# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [3.0.0] - 2025-04-15

### Added

- BPS app shell components: `BpsAppTopbar`, `BpsPageHeader`, `BpsFilterBar`, `BpsBulkActionBar`
- Data-management components: `BpsDataTable` (with sorting, pagination, column visibility), `BpsDataStatePanel`, `BpsConfirmActionDialog`
- Form workflow components: `BpsFormSection`, `BpsDatePicker`, `BpsCombobox`
- Feedback and status components: `BpsProgressAudit`, `BpsReviewTimeline`, `BpsValidationSummary`
- `BpsPerformanceCard` with sparkline, delta badge, and target percentage display
- `BpsKpiCard` for KPI metric display
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

Version 2.x is no longer maintained. No migration guide is available. Upgrade directly to 3.0.0.

[Unreleased]: https://github.com/bpsprovkaltara/design-system/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/bpsprovkaltara/design-system/releases/tag/v3.0.0
