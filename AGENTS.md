# Agent Guide — design-system

Applies to the whole repository and to any agent. Keep changes as small as
possible, preserve behavior that was not requested, and prove it with checks
that were actually run.

## Project identity

The private library `@bpsprovkaltara/design-system` version 4.8.1 and a Vite showcase SPA from the same source tree.

## Stack

Stack and resolved versions: [architecture](docs/architecture.md).

## Commands

From the repo root. All are verified to exist in `package.json`.

```bash
bun install
bun run dev            # showcase
bun run build          # tsc && vite build (showcase)
bun run build:lib      # build the library + copy tokens.css & fonts.css to dist/
bun run preview
bun run typecheck
bun run lint           # eslint; lint:fix, format, format:check available
bun run test           # test:watch, test:ui, test:coverage available
```

Choose the checks according to the matrix below; do not run heavy commands
that are not relevant to the change.

## Source of truth

When docs and implementation differ: (1) `package.json` + `bun.lock`
for versions, dependencies, scripts, entries, `exports`; (2) `vite.config.ts`,
`vite.lib.config.ts`, `vitest.config.ts`, `tsconfig*.json`, `eslint.config.js`
for tool behavior; (3) `src/index.ts`, `src/utils.ts`, `src/components/**`,
`src/hooks/**`, `src/App.tsx`, `src/components/layout/Sidebar.tsx` for the API and
active flows; (4) `tokens.css`, `colors_and_type.css`, `fonts.css`,
`scripts/copy-css-assets.mjs` for the CSS contract; (5) the tests next to
the source; (6) `DESIGN.md`, `docs/guide.md`, `README.md`.

`DESIGN.md` holds the normative tokens plus package consumption guidance for AI
agents. `dist/` is build output, not a place to
edit source. Do not invent scripts, paths, exports, or tokens.

## Structure / Layers

Layers, the export contract, and tokens: [architecture](docs/architecture.md); CSS/chrome consumption: [guide](docs/guide.md) and [consumer-chrome](docs/consumer-chrome.md). This repo is **not Next.js** — `'use client'` is only for consumer RSC compatibility. Keep `package.json#exports`, `src/index.ts`, and `build:lib` in sync.

## Invariants and flows

- React symbols are PascalCase; component file names are kebab-case.
- Named exports, and export the props types that are part of the public API.
- `@/` for internal source (pointing to `src/`). `cn()` for conditional classes.
- Create new objects/arrays; do not mutate props or state.
- Use semantic tokens or Tailwind utilities; do not hardcode colors in components.
- Keep light and `.dark` support.
- UI copy in formal Indonesian, without emoji. Numbers through `Intl.NumberFormat('id-ID')`.
- Keep keyboard navigation, focus states, labels, semantic HTML, and ARIA attributes.
- `'use client'` only on modules that need a client boundary or must be compatible with consumer client components.
- A component that navigates **must** have `asChild` or `renderLink`. Do not
  import Next.js into the package. The consumer contract: `docs/consumer-chrome.md`.

**Component checklist** — a new/changed component is not done until these six
parts are complete: the implementation in `src/components/{ui,patterns}/` → the export in
`src/index.ts` aligned with `package.json#exports` → a `.test.tsx` test next to it →
a page in `src/pages/components/` → a route in `src/App.tsx` → a navigation item in
`src/components/layout/Sidebar.tsx`. For a small change to a component that
already lives on a combined page, update only what is relevant — do not create a duplicate
route just to satisfy the checklist mechanically.

## Security

Validate external data at the component boundary (URLs, files, form values, table
data). Do not render raw HTML; if `dangerouslySetInnerHTML` is truly
proven necessary, sanitize first. Do not hardcode tokens, credentials, private
URLs, or personal data, and do not log payloads that may hold BPS personal
data. Runtime dependencies stay explicit dependencies/peers —
do not bundle a copy of React. Run `bun audit` before a release that
changes dependencies. Do not make a CDN font the default (privacy + availability).
Do not lower accessibility when replacing a Radix primitive with custom
markup.

## Working method

- Search narrowly first; do not read a large file in full if a search is enough.
- For complex tasks, state the plan and the verification criteria before writing code.
- Edit in a targeted way, protect other people's changes, do not refactor beyond the request.
- **Do not rely on model memory for framework APIs.** Match against
  `package.json`/the lockfile, then consult the official docs of the active version for React,
  TypeScript, Vite, Tailwind, Vitest, and Radix UI.
- Examples for Next.js/Laravel/other frameworks are consumer guidance, not the repo architecture.
- Do not edit `node_modules/`, `dist/`, or generated artifacts as source.
- Findings outside the scope are reported as notes, not fixed quietly.
- Review the diff before declaring done.

### Cross-agent workflow

If `../../WORKFLOW.md` exists, this repo lives in the owner's workspace: read and follow the relevant workspace rules as an addition. If it does not exist, the instructions in this repo are enough; the absence of workspace docs or tools is not a blocker to developing the project.

The invariants, security, and verification in this file still apply in both
environments. If an additional rule conflicts with a repo rule, explain the
conflict. Do not weaken the invariants, security, or verification.

## Verification

| Type of change | Minimum check |
|---|---|
| Documentation only | check paths/identifiers, review the diff, `git diff --check` |
| Types or pure utilities | `bun run typecheck`, `bun run lint`, related tests |
| Component or hook | `bun run typecheck`, `bun run lint`, `bun run test`, check interaction + accessibility |
| Tokens or CSS | `bun run build:lib`, check light/dark and Tailwind/non-Tailwind consumers |
| Public export or build config | `bun run build:lib`, check ESM/CJS/types/subpaths and the CSS output |
| Route or showcase | `bun run build`, check direct routes, navigation, responsive display |
| Dependency or release | the relevant checks above + `bun audit` |

CI (`.github/workflows/ci.yml`) on `main`/`v3` also checks the client directive; it runs `bun install --frozen-lockfile`
then `typecheck` → `lint` → `test:coverage` → `build:lib` → `build`, plus a `security`
job (`bun audit`, gitleaks, zizmor). `bun run check` = lint + typecheck + test.

The coverage threshold in `vitest.config.ts` is currently **67% statements, 74%
branches, 62% functions, 68% lines** (a ratchet, baseline in `docs/testing.md`) —
that is not a repo-wide 80% gate. The target
>=80% applies to new/changed code including error paths; do not claim the
repo has a global 80% gate, and do not state that tests/coverage/lint/build/audit
passed without actually running them.

## Definition of Done

The request is met with no change outside the scope · the API/type/CSS contract stays
compatible or a breaking change is documented · the six-part checklist
is met as relevant · the checks in the matrix pass and are reported as
they are · coverage of new/changed code >=80% · accessibility, dark mode, Indonesian
language, security, and privacy are reviewed · public docs and `CHANGELOG.md`
are updated if consumer behavior changes · the diff is free of secrets, debug code,
build output, and unrelated changes.

## References

The deep documentation map is in `README.md` (the Documentation section). Product
facts in `PRODUCT.md`; the visual language, tokens, and brand rules in `DESIGN.md`;
structure in `docs/architecture.md`; the component API in `docs/api.md`; build and
deploy in `docs/operations.md`; local setup in `docs/development.md`;
the verification ladder in `docs/testing.md`; the consumer application chrome
in `docs/consumer-chrome.md`; usage guidance for consumer projects
in `docs/guide.md`; upgrade notes between versions in `docs/upgrading.md`;
architecture decisions in `docs/adr/`.


<!-- SKILL-ROUTING:START -->
## Skills

This routing is maintained **by hand**; all the skills in the table are in `.claude/skills/` (not part of the clone). Impeccable is available globally, not as a repo-local skill.

| Skill | Trigger |
|---|---|
| `release-tag` | Open when preparing an annotated git release tag of the library version from `package.json` + `CHANGELOG.md` |
| `shadcn` | Open before adding or modifying a primitive component from the shadcn registry (`components.json`) |
| `vercel-composition-patterns` | Open before designing a high-level reusable component API (compound components, render props, context) |
| `vercel-react-best-practices` | Open when optimizing the performance of React/Vite modules, tree-shaking, and library bundle size |
<!-- SKILL-ROUTING:END -->
