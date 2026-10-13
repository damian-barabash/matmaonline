// Renders the link-preview images (public/og.png, public/og-ru.png) from scripts/og/card.html.
// Needs a headless Chrome on port 9333 (see scripts/qc.mjs). Usage: node scripts/og/render.mjs
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const list = await (await fetch('http://127.0.0.1:9333/json')).json()
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id) pending.get(m.id)?.(m.result) }
const send = (method, params = {}) => new Promise((res) => { pending.set(++id, res); ws.send(JSON.stringify({ id, method, params })) })

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
const card = pathToFileURL(path.resolve('scripts/og/card.html')).href
for (const [lang, file] of [['pl', 'og.png'], ['ru', 'og-ru.png']]) {
  await send('Page.navigate', { url: `${card}?lang=${lang}` })
  await sleep(900)
  await send('Runtime.evaluate', { expression: 'document.fonts.ready', awaitPromise: true })
  await sleep(300)
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join('public', file), Buffer.from(shot.data, 'base64'))
  console.log('wrote public/' + file)
}
ws.close()
