#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { chromium } from '@playwright/test'
import { preview } from 'vite'

const root = process.env.VERIFY_CONSUMER_DIR
if (!root) throw new Error('Set VERIFY_CONSUMER_DIR to the built, disposable Vite application')
const socket = createServer()
await new Promise((ok, fail) => socket.listen(0, '127.0.0.1', ok).once('error', fail))
const port = socket.address().port
await new Promise((ok, fail) => socket.close((err) => err ? fail(err) : ok()))
const server = await preview({ root, configFile: false, preview: { host: '127.0.0.1', port, strictPort: true } })
let browser
try {
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle' })
  const button = page.getByRole('button', { name: 'Registry proof' })
  await button.waitFor({ state: 'visible' })
  await button.click()
  const evidence = resolve('test-results/verify/konsumen')
  await mkdir(evidence, { recursive: true })
  await page.screenshot({ path: resolve(evidence, 'screenshot.png'), fullPage: true })
  await writeFile(resolve(evidence, 'aria.yml'), await page.locator('body').ariaSnapshot())
  console.log(`PASS consumer button: ${evidence}`)
} finally {
  await browser?.close()
  await new Promise((ok, fail) => server.httpServer.close((err) => err ? fail(err) : ok()))
}
