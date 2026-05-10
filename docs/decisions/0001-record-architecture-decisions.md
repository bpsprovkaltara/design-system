# ADR 0001: Record architecture decisions

**Date:** 2025-04-15
**Status:** Accepted

---

## Context

As the BPS Kaltara design system grows and more team members contribute, decisions about architecture, tooling, and component patterns are made and then forgotten. New contributors have no way to understand why a particular approach was chosen, which leads to repeated debates, accidental reversals of intentional decisions, and onboarding friction.

Architecture Decision Records (ADRs) are short documents that capture a single significant decision: what was decided, why it was decided, and what alternatives were considered. They are committed to the repository alongside the code so they are always in context.

---

## Decision

We will use ADRs to document significant architecture, tooling, and design decisions for this project. ADR files are stored in `docs/decisions/` and numbered sequentially starting from `0001`.

Each ADR follows the MADR (Markdown Architecture Decision Record) format:

```
# ADR NNNN: <short title>

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXXX

## Context
<What situation or problem prompted this decision?>

## Decision
<What was decided?>

## Alternatives considered
<What other options were evaluated and why were they rejected?>

## Consequences
<What are the positive and negative results of this decision?>
```

An ADR is never deleted. If a decision is reversed, the original ADR is marked `Superseded by ADR-XXXX` and a new ADR documents the new decision.

---

## Alternatives considered

**No documentation** — the status quo before this ADR. Fast in the short term, but creates confusion as the team grows and the system evolves. Rejected.

**Wiki or Confluence** — external to the repository. Becomes stale because it is not co-located with the code it describes. Rejected.

**Inline code comments** — too granular for cross-cutting architectural decisions. Comments explain what the code does; ADRs explain why the system is structured the way it is. Both have a place, but neither replaces the other. Rejected as the sole mechanism.

---

## Consequences

- Positive: new contributors can read `docs/decisions/` to understand why the system is built the way it is without asking the original authors.
- Positive: decisions that were right at one point but should be revisited are clearly marked with their original rationale, making it easier to argue for change with full context.
- Negative: small overhead per significant decision — writing a short ADR takes 15–30 minutes.
- Neutral: ADRs do not replace discussion. They record the outcome of a discussion, not the discussion itself.

---

## Existing decisions to migrate

The following decisions are described in `docs/architecture.md` but predate the ADR process. They should be migrated to individual ADRs over time:

- Why shadcn/ui (owned source, no runtime dependency)
- Why a three-layer design token system
- Why Vite for library build (dual ESM/CJS output)
- Tailwind preset export pattern
