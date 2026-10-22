# Showcase app — Bun 1.3.14 (selaras packageManager di package.json)
FROM oven/bun:1.3.14-slim AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build

FROM oven/bun:1.3.14-slim

WORKDIR /app

ENV NODE_ENV=production

RUN bun add serve@14.2.4

COPY --from=builder /app/dist ./dist

EXPOSE 8081

USER bun

CMD ["bun", "run", "--bun", "serve", "dist", "-l", "8081", "-s", "-n"]
