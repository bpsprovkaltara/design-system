# BPS Kaltara Design System Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers of internal BPS Provinsi Kalimantan Utara applications use the library; developers and designers browse the showcase to choose components, review tokens, and take integration examples.

## Product Purpose

Provide consistent React components, CSS tokens, application patterns, and examples for internal applications. The showcase SPA presents an interactive reference from the same source as the library package.

## Operating Context

The private package `@bpsprovkaltara/design-system` is published to GitHub Packages. The v4/main track uses React 19 and Tailwind 4 with the dist-tag latest; v3/the v3 branch uses React 18 and Tailwind 3.4 with legacy. The Vite showcase is deployed through Docker/Traefik; the URL in the configuration is `design.kaltarastats.id`.

## Capabilities and Constraints

shadcn/Radix primitives, BPS composites, light charts, forms, tables, shell, overlays, search, and hooks are exported with types and ESM/CJS/subpaths. Business data, auth, search/notification fetching, framework routing, and the backend stay the consumer application's. The repo provides no HTTP service or database. Optional form peers are installed only when used. The client directive supports RSC consumers; the showcase stays Vite.

## Brand Commitments

The incumbent direction Civic Editorial × Data-First Swiss: the BPS Kaltara identity and formal Indonesian copy without emoji. The detailed visual identity is in DESIGN, not a new direction decision.

## Evidence on Hand

`src/index.ts`, components, hooks, showcase pages, CSS tokens, the `ui_kits/dashboard/` prototype, tests, git tags, and the CHANGELOG. The prototype uses sample data/visuals; it is not evidence of production statistical data or official maps.

## Product Principles

- The library and the showcase use the same source.
- Consumers control data, routing, authentication, and production fonts.
- Exports and types define the usage contract.
- Components keep keyboard, semantic HTML, focus, and light/dark.

## Accessibility & Inclusion

Indonesian language and id-ID number format follow internal usage. Keep labels, ARIA, keyboard, skip links, and reduced motion; an audit of the consumer application is still needed.
