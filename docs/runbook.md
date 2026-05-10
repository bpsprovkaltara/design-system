# Runbook

Operational procedures for diagnosing and resolving common issues with the BPS Kaltara design system showcase app.

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

4. Verify the Tailwind preset is registered in the consumer's `tailwind.config.ts`:
   ```ts
   import preset from '@bpsprovkaltara/design-system/tailwind-preset'
   export default { presets: [preset], content: [...] }
   ```
   Without the preset, the consumer's Tailwind output will not include design system utility classes.

5. If styles are still stale after the above steps, clear the consumer's Tailwind cache:
   ```bash
   rm -rf node_modules/.cache
   pnpm build
   ```

---

## Fonts not loading in production

**Symptom:** The showcase app or a consumer app renders with fallback system fonts instead of Fraunces, IBM Plex Sans, or IBM Plex Mono.

**Cause:** `colors_and_type.css` loads fonts via Google Fonts CDN. If the server or client network blocks outbound requests to `fonts.googleapis.com`, the fonts do not load.

**Mitigation:**

The `font-sans` stack in `tailwind-preset.ts` includes a system font fallback (`ui-sans-serif, system-ui, sans-serif`), so the app remains functional and readable.

**Long-term fix (not yet implemented):**

Self-host the font files in `public/fonts/`. The comment in `colors_and_type.css` line 15 already notes this intent:

```css
/* --- Google Fonts (fallback CDN; self-host in production via public/fonts/) --- */
```

To self-host:
1. Download Fraunces, IBM Plex Sans, and IBM Plex Mono WOFF2 files.
2. Place them in `public/fonts/`.
3. Replace the `@import url('https://fonts.googleapis.com/...')` line in `colors_and_type.css` with `@font-face` declarations pointing to `/fonts/`.

> [!todo] Need input from team: confirm whether the production server (`design.kaltarastats.id`) has unrestricted outbound internet access. If not, self-hosted fonts must be prioritized.

---

## Escalation

> [!todo] Need input from team: provide the primary contact (name, role, and communication channel) for escalating issues that cannot be resolved with this runbook.
