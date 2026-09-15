# Operations

Deployment, operasional, dan penanganan insiden untuk BPS Kaltara design
system — gabungan panduan deployment showcase dan runbook harian. Dokumen ini
menggabungkan `docs/deployment.md` dan `docs/runbook.md` lama (2026-09-15).

---

## Deployment

The design system showcase app is deployed as a Docker container behind a Traefik reverse proxy.

### Environments

| Environment | URL | Port | Notes |
|---|---|---|---|
| Local development | http://localhost:5173 | 5173 | Vite dev server, hot reload |
| Production | https://design.kaltarastats.id | 8081 (internal) | Docker + Traefik |

> [!todo] Need input from team: no staging environment is currently documented. Define a staging URL and document its deploy process if one exists or is planned.

### Docker build

The `Dockerfile` memakai **multi-stage build Node.js 20** + **pnpm** (selaras `engines` dan `packageManager` di `package.json`).

**Stage 1 — builder**

1. Base image: `node:20-bookworm-slim`
2. `corepack enable` lalu `COPY package.json pnpm-lock.yaml` dan `pnpm install --frozen-lockfile --ignore-scripts` (melewati `prepare` / `build:lib` sampai source lengkap tersalin)
3. Menyalin seluruh source
4. Menjalankan `pnpm run build` (showcase: `tsc && vite build` → `dist/`)

**Stage 2 — runtime**

1. Base image: `node:20-bookworm-slim`
2. Menginstal `serve` secara global (`npm install -g serve`)
3. Menyalin hanya `dist/` dari builder
4. Port **8081**, user non-root `node`, perintah: `serve dist -l 8081 -s -n`
   - `-l 8081`: listen pada 8081
   - `-s`: fallback SPA (`index.html`)
   - `-n`: tanpa clipboard (cocok untuk container)

**Build image:**

```bash
docker build -t design-system:latest .
```

**Jalankan lokal untuk verifikasi:**

```bash
docker run --rm -p 8081:8081 design-system:latest
# Buka http://localhost:8081
```

### Docker Compose deploy

The `docker-compose.yml` deploys the container and connects it to a Traefik reverse proxy via an external Docker network.

**Prerequisites:**

1. Traefik must already be running on the host with an entrypoint named `web`.
2. The external Docker network `proxy_network` must exist:

```bash
docker network create proxy_network
```

**Deploy:**

```bash
docker compose up -d --build
```

This builds the image and starts the container as `design-system` with `restart: unless-stopped`.

**Verify:**

```bash
docker compose ps
docker compose logs -f
```

### Traefik configuration notes

The relevant Traefik labels in `docker-compose.yml`:

| Label | Value | Notes |
|---|---|---|
| `traefik.enable` | `true` | Enables Traefik routing for this container |
| `traefik.http.routers.design-system.rule` | `Host(\`design.kaltarastats.id\`)` | Domain routing rule |
| `traefik.http.routers.design-system.entrypoints` | `web` | Must match an entrypoint name in your Traefik static config |
| `traefik.http.services.design-system.loadbalancer.server.port` | `8081` | Container-internal port |

> [!todo] Need input from team: confirm whether the Traefik entrypoint should be `web` (HTTP) or `websecure` (HTTPS with TLS termination). The comment in `docker-compose.yml` suggests `websecure` may be the intended value.

### Rollback procedure

```bash
# Pull the previous image tag (if tagged releases exist)
docker compose pull

# Stop and recreate
docker compose down
docker compose up -d

# Or for an immediate rollback to a specific image:
docker compose stop web
docker tag design-system:previous design-system:latest
docker compose up -d
```

> [!todo] Need input from team: establish a tagging convention for Docker images (e.g. `design-system:4.0.0`) so rollbacks have a specific target rather than relying on `previous`.

### CI (GitHub Actions)

Workflow `.github/workflows/ci.yml` berjalan pada **push** dan **pull request** ke `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm run typecheck`
3. `pnpm run lint`
4. `pnpm run test`
5. `pnpm run build:lib`
6. `pnpm run build`

Build dan deploy Docker ke server produksi tetap dapat dilakukan manual (`docker compose up -d --build`) atau diotomatisasi terpisah (mis. workflow kedua yang push image ke registry).

---

## Showcase app is down

**Symptom:** `https://design.kaltarastats.id` returns a 502, 503, or times out.

**Steps:**

1. SSH into the production server.

2. Check container status:
   ```bash
   docker compose ps
   ```
   The `design-system` container should show `Up`. If it shows `Exited`, proceed to step 3.

3. Check container logs for the crash reason:
   ```bash
   docker compose logs --tail=100
   ```

4. Restart the container:
   ```bash
   docker compose restart
   ```

5. If the container fails to start, rebuild the image:
   ```bash
   docker compose up -d --build
   ```

6. If the container starts but the site is still unreachable, check Traefik routing:
   ```bash
   docker logs traefik 2>&1 | grep design-system
   ```
   Verify the `proxy_network` exists and the `design-system` container is attached:
   ```bash
   docker network inspect proxy_network | grep design-system
   ```

7. If Traefik cannot reach the container, verify the entrypoint name in `docker-compose.yml` matches the Traefik static config. The current label is `entrypoints=web`.

> [!todo] Need input from team: provide the SSH host, user, and path to the `docker-compose.yml` on the production server.

---

## Build failure

**Symptom:** `pnpm build:lib` or `pnpm build` exits with an error.

**Common causes and fixes:**

| Cause | Fix |
|---|---|
| Wrong Node version | Run `node -v` — must be >= 20. Use `nvm use 20` or install from https://nodejs.org |
| Missing or incompatible lockfile | Run `pnpm install` to regenerate. If `package-lock.json` was accidentally committed, delete it — the project uses `pnpm-lock.yaml` |
| TypeScript error | Run `pnpm typecheck` to identify the specific error before building |
| Vite config error | Check `vite.lib.config.ts` for syntax errors |
| Missing peer dependency | Run `pnpm install` and check `peerDependencies` in `package.json` |

---

## Stale or missing styles in a consumer app

**Symptom:** After upgrading `@bpsprovkaltara/design-system`, components in a consumer app appear unstyled or use old styles.

**Steps:**

1. In the design system repo, rebuild the library:
   ```bash
   pnpm build:lib
   ```

2. In the consumer app, update the installed version:
   ```bash
   pnpm update @bpsprovkaltara/design-system
   ```

3. Verify the consumer app imports `styles.css`:
   ```ts
   import '@bpsprovkaltara/design-system/styles.css'
   ```
   Without this import, all tokens are undefined and components render unstyled.

4. Verify the consumer app is using Tailwind 4 tooling and imports the design system stylesheet once:
   ```css
   @import "tailwindcss";
   @source "../src";
   @source "../node_modules/@bpsprovkaltara/design-system/dist";
   ```
   The package no longer requires a Tailwind preset; `tailwind-preset` is a deprecated shim.

5. If styles are still stale after the above steps, clear the consumer's Tailwind cache:
   ```bash
   rm -rf node_modules/.cache
   pnpm build
   ```

---

## Fonts not loading in production

**Symptom:** The showcase app or a consumer app renders with fallback system fonts (`system-ui`, `serif`, `monospace`) instead of Fraunces, IBM Plex Sans, or IBM Plex Mono.

**Cause:** Sejak v4.0.1 CSS paket sengaja **tidak memuat font apa pun** — `@import`
CDN dalam CSS library bersifat render-blocking dan memaksa konsumen mengambil font
pihak ketiga tanpa kontrol (privasi; lihat komentar di `colors_and_type.css`).
Showcase memuat Google Fonts lewat `<link>` di `index.html`; aplikasi konsumen
menyediakan font sendiri (self-host, atau `fonts.css` CDN opt-in). Bila jaringan
server atau klien memblokir `fonts.googleapis.com`, font CDN tidak termuat.

**Mitigation:**

- Font stack di `colors_and_type.css` menyertakan fallback sistem, jadi aplikasi
  tetap fungsional dan terbaca.
- Untuk showcase: pastikan `<link>` Google Fonts di `index.html` tidak diblokir
  firewall/CSP di server produksi.
- Solusi permanen (belum diimplementasi): self-host WOFF2 Fraunces, IBM Plex Sans,
  dan IBM Plex Mono di `public/fonts/`, lalu ganti `<link>` CDN di `index.html`
  dengan deklarasi `@font-face` yang menunjuk `/fonts/`. Aplikasi konsumen mengikuti
  bagian Font di `README.md` (`next/font` disarankan untuk Next.js).

> [!todo] Need input from team: confirm whether the production server (`design.kaltarastats.id`) has unrestricted outbound internet access. If not, self-hosted fonts must be prioritized.

---

## Escalation

> [!todo] Need input from team: provide the primary contact (name, role, and communication channel) for escalating issues that cannot be resolved with this runbook.
