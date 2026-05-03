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

The `Dockerfile` uses a multi-stage Bun build:

**Stage 1 — builder**

1. Base image: `oven/bun:latest`
2. Copies `package.json` and installs dependencies with `--ignore-scripts` (skips the `prepare` hook which runs `build:lib` — source files are not yet copied at that point)
3. Copies all source files
4. Runs `bun run build` (Vite showcase app build — produces `dist/`)

**Stage 2 — runtime**

1. Base image: `oven/bun:latest`
2. Copies only `dist/` from the builder stage
3. Exposes port 8081
4. Starts `bun x serve dist -l 8081 -s -n`
   - `-l 8081`: listen on port 8081
   - `-s`: SPA fallback (all paths serve `index.html`)
   - `-n`: no clipboard (required in container environments)

**Build the image:**

```bash
docker build -t design-system:latest .
```

**Run locally to verify:**

```bash
docker run --rm -p 8081:8081 design-system:latest
# Visit http://localhost:8081
```

> [!warning] Known issue: the `Dockerfile` has `COPY package.json package-lock.json* ./` on line 6. This project uses pnpm (`pnpm-lock.yaml`), not npm (`package-lock.json`). The npm lockfile does not exist. Bun can install from `package.json` alone so this works at runtime, but the lockfile copy line is misleading and should be changed to `COPY package.json pnpm-lock.yaml ./` with a corresponding `RUN bun install --frozen-lockfile --ignore-scripts` for reproducible builds.

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

> [!warning] The `docker-compose.yml` uses the deprecated top-level `version: '3.8'` key. This is harmless but should be removed in a future cleanup — Docker Compose v2 ignores it.

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

> [!todo] Need input from team: establish a tagging convention for Docker images (e.g. `design-system:3.0.0`) so rollbacks have a specific target rather than relying on `previous`.

---

## No CI/CD pipeline

There is currently no `.github/workflows/` directory. Builds and deploys are manual. Consider adding a GitHub Actions workflow that:

1. Runs `pnpm lint` and `pnpm test` on pull requests
2. Builds and pushes the Docker image on merge to `main`
3. SSHes into the production server and runs `docker compose up -d`
