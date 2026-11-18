#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { chromium } from '@playwright/test'
import { preview } from 'vite'

// Reserve a free loopback port, then have Vite refuse to fall back to another.
const socket = createServer()
await new Promise((ok, fail) => socket.listen(0, '127.0.0.1', ok).once('error', fail))
const port = socket.address().port
await new Promise((ok, fail) => socket.close((err) => err ? fail(err) : ok()))
if (!process.env.VERIFY_BUILD_DIR) throw new Error('Run scripts/verify-design-system.sh')
const server = await preview({ build: { outDir: process.env.VERIFY_BUILD_DIR }, preview: { host: '127.0.0.1', port, strictPort: true } })
let browser
try {
  const base = `http://127.0.0.1:${port}`
  const evidence = resolve('test-results/verify/buttons')
  await mkdir(evidence, { recursive: true })
  const response = await fetch(`${base}/r/button.json`)
  if (!response.ok) throw new Error(`registry button: HTTP ${response.status}`)
  const item = await response.json()
  const source = await readFile('src/components/ui/button.tsx', 'utf8')
  if (!item.files?.some((file) => file.content === source)) throw new Error('registry button does not match source')
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Buttons', exact: true }).first().click()
  await page.waitForURL('**/components/buttons')
  const title = page.getByRole('heading', { name: 'Buttons', exact: true })
  await title.waitFor({ state: 'visible' })
  await page.getByRole('button', { name: 'Default (Primary)' }).waitFor({ state: 'visible' })
  const toggle = page.getByRole('button', { name: 'Aktifkan mode gelap' }).first()
  await toggle.click()
  await page.waitForFunction(() => document.documentElement.classList.contains('dark'))
  await page.screenshot({ path: resolve(evidence, 'screenshot.png'), fullPage: true })
  await writeFile(resolve(evidence, 'aria.yml'), await page.locator('body').ariaSnapshot())
  await writeFile(resolve(evidence, 'registry.json'), JSON.stringify({ name: item.name, sourceMatches: true }, null, 2) + '\n')
  console.log(`PASS buttons, dark mode, registry: ${evidence}`)
} finally {
  await browser?.close()
  await new Promise((ok, fail) => server.httpServer.close((err) => err ? fail(err) : ok()))
}
