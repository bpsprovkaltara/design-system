# BPS Kaltara Design System Development

## Prerequisites

Node 24 from `.node-version` (CI runs vitest and tsc on Node 24; tooling only, not a consumer requirement) and Bun 1.3.14 according to the manifest; `preinstall` rejects pnpm/npm. Check node --version and bun --version. The lockfile `bun.lock` (a second runtime document): React 19.2.6, Vite 8.0.11, TS 6.0.3, Vitest 4.1.5.

## Local setup

```bash
git clone https://github.com/bpsprovkaltara/design-system.git
cd design-system
bun install
bun run dev
```

The showcase runs at http://localhost:5173. Do not use another package manager or edit the dist/node_modules output.

## Scripts

| Script | Manifest implementation |
|---|---|
| dev | bun --bun vite |
| build | tsc && bun --bun vite build |
| build:lib | bun --bun vite build --config vite.lib.config.ts && bun scripts/copy-css-assets.mjs |
| preview | bun --bun vite preview |
| prepublishOnly | bun run build:lib |
| test | vitest run |
| test:watch | vitest |
| test:ui | vitest --ui |
| test:coverage | vitest run --coverage |
| lint | eslint src |
| lint:fix | eslint src --fix |
| format | prettier --write "src/**/*.{ts,tsx,css}" |
| format:check | prettier --check "src/**/*.{ts,tsx,css}" |
| typecheck | tsc --noEmit |
| prepare | bun run prepare:hooks |
| prepare:hooks | husky |

The showcase/library builds share dist; the last build decides the folder contents. prepare only installs hooks, it does not build the library. A release triggers prepublishOnly.

## Branching and commits

An internal repo; external contributions are not accepted. Branch from main with feat/, fix/, chore/, docs/; PR to main, do not commit directly to main. The v3 legacy track is separate. Conventional Commits, optional scope, a lowercase imperative subject of at most 72 characters. At least one approval; the author merges and deletes the branch according to the team process.

## Flow for adding a feature

1. Read AGENTS and the Git status, identify the public API/consumer impact.
2. Implement in src/components/ui or patterns with named exports and props types.
3. Export in src/index.ts aligned with the package.json exports.
4. Add a regression test next to it, .test.tsx.
5. Update the showcase page, the route in src/App.tsx, and the navigation in src/components/layout/Sidebar.tsx.
6. Run the relevant gates and document the consumer/release change.

For a component that is already on a combined page, just update what is relevant; do not create a duplicate route mechanically.

## Code conventions

PascalCase symbols, kebab-case component files; @/ for internal source; cn for conditional classes; immutable state/props. Semantic/Tailwind colors, not hardcoded hex; support light/.dark. UI in formal Indonesian without emoji; numbers with Intl.NumberFormat('id-ID'). Keyboard, semantic HTML, focus, labels, and ARIA are required. Navigation components provide asChild/renderLink, without a Next.js dependency. The normative tokens are in tokens.css and [DESIGN](../DESIGN.md), not the colors_and_type.css entry.

## Testing

```bash
bun run typecheck
bun run lint
bun run test
```

The verification ladder is in [testing](testing.md). Vitest/Testing Library/jsdom; tests next to the source. The global threshold is currently 67% statements, 74% branches, 62% functions, 68% lines (a ratchet, baseline in testing.md); the target for new/changed code is >=80% without excluding files falsely. CI main/v3 checks the client directives, test:coverage, build:lib, and the showcase build, plus a security job (audit, gitleaks, zizmor). A CSS/API/build change needs build:lib and Tailwind/non-Tailwind/RSC integration; a route/showcase change needs the build and navigation/responsive checks. A dependency/release also needs an audit. Documentation only uses a path/link/version check and git diff --check, without a build.

## Debugging

- Focus on CommandInput: do not remove the whole focus indicator; use wrapperClassName/focus-visible that matches the primitive.
- Invalid warm token: var(--warm-50) directly or hsl(var(--warm-50-hsl)); not hsl(var(--warm-50)).
- Styling missing: choose the CSS entry according to the consumer's tool, the dist source for Tailwind; do not double the preflight.
- Font fallback: the package CSS does not load a default font; the showcase index.html uses a link, and consumers self-host/opt in to a CDN.
- require is not defined/RSC: trace the external deps, preserveModules, exports, and client directives.

## Contributing

A PR includes the API/type/CSS contract, tests, the showcase if relevant, accessibility/light-dark, documentation, and the CHANGELOG for release changes. Do not stage env/secrets, generated output, or other parties' WIP. Deployment/release details: [operations](operations.md); consumption: [api](api.md), [guide](guide.md), [consumer chrome](consumer-chrome.md).
