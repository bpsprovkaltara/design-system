# Deployment

The design system showcase app is deployed as a Docker container behind a Traefik reverse proxy.

---

## Environments

| Environment | URL | Port | Notes |
|---|---|---|---|
| Local development | http://localhost:5173 | 5173 | Vite dev server, hot reload |
| Production | https://design.kaltarastats.id | 8081 (internal) | Docker + Traefik |

> [!todo] Need input from team: no staging environment is currently documented. Define a staging URL and document its deploy process if one exists or is planned.

---

## Docker build

The `Dockerfile` memakai **multi-stage build Bun 1.3.14** (selaras `packageManager` di `package.json`).

**Stage 1 — builder**

1. Base image: `oven/bun:1.3.14-slim`
2. `COPY package.json bun.lock` lalu `bun install --frozen-lockfile --ignore-scripts` (melewati `prepare` / `build:lib` sampai source lengkap tersalin)
3. Menyalin seluruh source
4. Menjalankan `bun run build` (showcase: `tsc && vite build` → `dist/`)

**Stage 2 — runtime**

1. Base image: `oven/bun:1.3.14-slim`
2. Menginstal `serve@14.2.4` (`bun add serve@14.2.4`)
3. Menyalin hanya `dist/` dari builder
4. Port **8081**, user non-root `bun`, perintah: `bun run --bun serve dist -l 8081 -s -n` (serve berjalan di runtime Bun)
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

---

## Docker Compose deploy

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

---

## Traefik configuration notes

The relevant Traefik labels in `docker-compose.yml`:

| Label | Value | Notes |
|---|---|---|
| `traefik.enable` | `true` | Enables Traefik routing for this container |
| `traefik.http.routers.design-system.rule` | `Host(\`design.kaltarastats.id\`)` | Domain routing rule |
| `traefik.http.routers.design-system.entrypoints` | `web` | Must match an entrypoint name in your Traefik static config |
| `traefik.http.services.design-system.loadbalancer.server.port` | `8081` | Container-internal port |

> [!todo] Need input from team: confirm whether the Traefik entrypoint should be `web` (HTTP) or `websecure` (HTTPS with TLS termination). The comment in `docker-compose.yml` suggests `websecure` may be the intended value.

---

## Rollback procedure

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

---

## CI (GitHub Actions)

Workflow `.github/workflows/ci.yml` berjalan pada **push** dan **pull request** ke `main`:

1. `bun install --frozen-lockfile`
2. `bun run typecheck`
3. `bun run lint`
4. `bun run test`
5. `bun run build:lib`
6. `bun run build`

Build dan deploy Docker ke server produksi tetap dapat dilakukan manual (`docker compose up -d --build`) atau diotomatisasi terpisah (mis. workflow kedua yang push image ke registry).
