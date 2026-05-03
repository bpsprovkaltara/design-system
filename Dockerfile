FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Skip lifecycle scripts: `prepare` runs `build:lib` which needs vite.lib.config.ts
# and full source — those are not in the image until the next COPY.
RUN bun install --ignore-scripts

# Copy all source files
COPY . .

# Build the application using Vite (via Bun)
RUN bun run build

# Final Stage: Use Bun to serve the static files
FROM oven/bun:latest

WORKDIR /app

# Copy only the built assets from the builder stage
COPY --from=builder /app/dist ./dist

# Install 'serve' package globally or just use bunx
# We'll use bun x serve directly in the CMD

# Expose port 8081
EXPOSE 8081

# serve (vercel): -l = listen port, -s = SPA fallback to index.html, -n = no clipboard (containers)
CMD ["bun", "x", "serve", "dist", "-l", "8081", "-s", "-n"]
