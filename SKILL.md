---
name: bps-kaltara-design
description: Use this skill to generate well-branded interfaces and assets for BPS Kaltara (Badan Pusat Statistik Provinsi Kalimantan Utara), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping government statistical dashboards.
user-invocable: true
---

Read [README.md](README.md), [PRODUCT.md](PRODUCT.md), and [DESIGN.md](DESIGN.md)
before building an interface or visual artifact for BPS Kaltara. DESIGN holds the
normative tokens; the actual API is in src/index.ts and the package exports.

For a mock/prototype, copy the relevant assets into an artifact that can be inspected.
For a production application, follow the CSS/font consumption contract, the types/exports, and
asChild/renderLink in the [guide](docs/guide.md) and
[consumer-chrome](docs/consumer-chrome.md). The dashboard prototype uses sample
data/maps/logos; do not treat it as production evidence.

If the skill is invoked without a target, clarify the product needs and scope
before building an artifact. Superpowers remains the main implementation workflow;
the global impeccable records the product context and the incumbent visual system.
