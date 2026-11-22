# Testing

The workspace standard is in `TESTING.md`. This document records how it is applied in the design system.

## Lanes and commands

Lanes: browser, docker (`TESTING.md` §2a; the docker lane = the showcase Dockerfile, its image job is in a separate CI/image ticket). The component code runs in the browser,
so Vitest runs on Node 24 (`.node-version`), not on Bun. This Node pin is
only for the repo tooling; consumer applications of the package or the registry are not bound
to it. The tests still use jsdom + Testing Library; migrating to Vitest Browser
Mode is not part of this contract yet.

| Script | Contents |
|---|---|
| `bun run check` | lint + typecheck + test; this lane has no separate `unit` project, so `test` is used as the fast tier |
| `bun run lint` | ESLint over `src`, including the test rules; CI adds `--max-warnings 0` |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run test` | the whole Vitest suite (jsdom) |
| `bun run test:coverage` | `test` with coverage thresholds; this is what CI runs |

## Verification ladder

| Scope | Command |
|---|---|
| quick | `bun run check`, or `bunx vitest run <file>` for one file |
| standard | `bun run test` (the whole Vitest/Testing Library/jsdom suite) |
| complex | + `bun run build:lib` if CSS, the public API, or the build changes; `bun run build` if the showcase/routes change |
| high-risk | + `bun run test:coverage` and test the `build:lib` package output in a consumer application (Tailwind, non-Tailwind, RSC) before a release |

`build:lib` and `build` rewrite the committed `dist/`. Restore
`dist/` if the change is not meant for a release.

## CI

- Job `quality`: typecheck, lint, the `"use client"` directive check,
  `test:coverage`, `build:lib`, the showcase build.
- Job `security`: `bun audit --audit-level=critical`, the gitleaks CLI (the PR
  range, or `HEAD` on a push), and zizmor over the workflows.
- The audit threshold is `critical`. As of 2026-11-03 there are 37 high findings; in the
  production scope only the `zod` peer (<4.6.6), the rest are dev dependencies (vite,
  react-router, undici, postcss, and others). Tracked in
  [#35](https://github.com/bpsprovkaltara/design-system/issues/35).
- `release.yml` (publish to GitHub Packages) only gets hygiene: SHA pinning,
  `permissions`, timeout, no cache. Its retirement follows ADR 0003.

## Coverage

The V8 provider (the browser lane on Node). `include` covers all the source roots
shipped to consumers: `src/components/ui`, `src/components/patterns`,
`src/hooks`, `src/lib`, `src/index.ts`, `src/utils.ts`, `src/tailwind-preset.ts`.
The showcase (`src/pages`, `src/layouts`, `src/components/{layout,showcase}`,
`src/App.tsx`, `src/main.tsx`) is not shipped, so it is not counted; it
is proven through `bun run build`. These roots are derived from the barrel
`src/index.ts` and `package.json#exports`, because the ADR 0003 registry does not exist
on `main` yet; recheck the list when the registry is built. The excludes are in `vitest.config.ts` with
a reason per line.

| Metric | Baseline | Threshold | Measured | Follow-up |
|---|---|---|---|---|
| lines | 68.48% | 68 | 2026-11-03 | toward 80%, [#34](https://github.com/bpsprovkaltara/design-system/issues/34) |
| functions | 62.47% | 62 | 2026-11-03 | toward 80%, [#34](https://github.com/bpsprovkaltara/design-system/issues/34) |
| branches | 74.56% | 74 | 2026-11-03 | toward 80%, [#34](https://github.com/bpsprovkaltara/design-system/issues/34) |
| statements | 67.89% | 67 | 2026-11-03 | toward 80%, [#34](https://github.com/bpsprovkaltara/design-system/issues/34) |

- Measured three times on Node 22 and three times on Node 24 (the `.node-version` pin)
  with `test:coverage` (232 green tests); all six runs identical. Threshold = the baseline floor, and it may only go up.
- The previous threshold (34/42/26/34) only counted `src/components/**`
  including the showcase, and CI did not run it.

## Test lint rules

`eslint.config.js` (the block `src/**/*.{test,spec}.{ts,tsx}`) enforces
`TESTING.md` §5b as errors: `vitest/expect-expect`,
`vitest/no-focused-tests`, `vitest/no-disabled-tests`,
`vitest/no-conditional-expect`, `vitest/valid-expect` (`maxArgs: 2`),
`vitest/no-identical-title`, and
`@eslint-community/eslint-comments/require-description`. A temporary skip needs an
`eslint-disable` with a reason that links an issue. There is no Playwright in
this repo, so the `eslint-plugin-playwright` rules do not apply.

## No DB and no login

This package is a component library: it has no database, accounts, or login. There is no per-worktree test DB, test accounts, or role-matrix smoke. Auth components (login form, chrome) are tested as components in Vitest; the real login flow is tested in the consumer application repo.

There is no Playwright or browser E2E suite. Visual checks of the showcase (navigation, responsive, light/dark) are done manually through `bun run dev`, or with headless Playwright Chromium from outside the repo when needed.

## Verification skill

None yet. `.claude/skills/verify-design-system/` and the feature map
`features/` are tracked in fachriizzudin/project-rules#85.
