# ADR 0002: Tidak mengadopsi library motion JS di paket DS

**Date:** 2026-09-02
**Status:** Accepted
**Relates to:** GitHub #22

## Context

Audit konsumen Menara memakai library `motion` (framer-motion) untuk fade-up, stagger, dan reveal. RFC #22 menanyakan apakah DS sebaiknya mengadopsi `motion` dan mengekspor primitif animasi.

DS adalah library komponen yang dikonsumsi banyak aplikasi (termasuk yang sudah punya preflight/animasi sendiri). Menambah dependency JS berat mempengaruhi bundle, peer graph, dan kebebasan konsumen mengganti stack animasi.

## Decision

**Tidak** menambah `motion` (atau library animasi JS sejenis) sebagai dependency/peer paket `@bpsprovkaltara/design-system`.

Standar motion di DS tetap **token CSS** yang sudah ada di `tokens.css`:

- `--motion-duration-*` + utility `duration-fast` / `duration-base` / …
- `--motion-ease-*` + transisi terkait
- penghormatan `prefers-reduced-motion`

Animasi berbasis JS (page reveal, stagger list, dialog pop) tetap tanggung jawab aplikasi konsumen.

## Alternatives considered

1. **Adopsi `motion` penuh (Opsi A RFC)** — ditolak: biaya bundle, coupling jangka panjang, dan API yang spekulatif untuk library UI.
2. **Peer optional `motion` + primitif tipis** — ditolak untuk saat ini: tetap menarik tooling ke DS tanpa bukti kebutuhan lintas ≥2 konsumen yang berbagi kontrak API yang sama.
3. **Token CSS saja (status quo + dokumentasi)** — dipilih: sudah ada di tokens; cukup dokumentasikan keputusan.

## Consequences

- Positif: paket DS tetap ringan; konsumen bebas memilih `motion` / CSS / library lain.
- Positif: durasi/easing tetap bisa diselaraskan lewat token.
- Negatif: konsumen tetap menulis wrapper motion sendiri sampai ada kontrak API yang berulang dan terbukti.
- Tindak lanjut: tutup GitHub #22 dengan merujuk ADR ini.
