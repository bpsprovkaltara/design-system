# Showcase app — Node 20 + pnpm (selaras package.json / engines)
FROM node:20-bookworm-slim AS builder

WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build

FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g serve@^14.2.4

COPY --from=builder /app/dist ./dist

EXPOSE 8081

USER node

CMD ["serve", "dist", "-l", "8081", "-s", "-n"]
