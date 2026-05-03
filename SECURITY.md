# Security policy

## Supported versions

| Version | Supported |
|---|---|
| 3.0.0 | Yes — active maintenance |
| 2.x | No — end of life |

Only version 3.0.0 receives security fixes. Users on 2.x should upgrade to 3.0.0.

---

## Reporting a vulnerability

This is an internal BPS Provinsi Kalimantan Utara tool. It is not published to a public npm registry and is not externally accessible except via the showcase at `design.kaltarastats.id`.

**To report a vulnerability:**

1. Open a GitHub Issue at https://github.com/bpsprovkaltara/design-system/issues and apply the `security` label.
2. Describe the vulnerability clearly: affected component, reproduction steps, potential impact.
3. Do not include exploit code or sensitive data in the issue.

> [!todo] Need input from team: provide a direct internal email address or contact channel for confidential security disclosures that should not be public on GitHub Issues.

---

## Scope

The design system is a frontend UI library. It has no backend, no database, and no authentication logic of its own. Security considerations are limited to:

- Dependency vulnerabilities (check with `pnpm audit`)
- XSS risks from any component that renders unsanitized user-provided HTML (none currently do this)
- Supply chain risks from transitive dependencies

Run `pnpm audit` regularly and upgrade flagged dependencies via a `chore:` PR.
