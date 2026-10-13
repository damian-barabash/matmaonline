// Visual + technical check of the built site. Needs `npm run preview` and a headless Chrome:
//   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/qc-chrome about:blank
// Usage: node scripts/qc.mjs [baseUrl] [outDir]
import fs from 'node:fs'

const BASE = (process.argv[2] || 'http://localhost:4173/').replace(/\/?$/, '/')
const OUT = process.argv[3] || 'qc-shots'
const PAGES = ['', 'ru/', 'polityka-prywatnosci/', 'ru/privacy/']
const WIDTHS = [1440, 1024, 768, 390]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const list = await (await fetch('http://127.0.0.1:9333/json')).json()
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
let errors = []
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id) return pending.get(m.id)?.(m)
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text)
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value ?? a.description).join(' '))
  if (m.method === 'Network.loadingFailed' && !m.params.canceled) errors.push('network: ' + m.params.errorText)
  if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) errors.push(`${m.params.response.status} ${m.params.response.url}`)
}
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id
    pending.set(i, (m) => (pending.delete(i), m.error ? rej(new Error(m.error.message)) : res(m.result)))
    ws.send(JSON.stringify({ id: i, method, params }))
  })
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value

await send('Page.enable')
await send('Runtime.enable')
await send('Network.enable')
fs.mkdirSync(OUT, { recursive: true })
let bad = 0
for (const page of PAGES)
  for (const width of WIDTHS) {
    errors = []
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 })
    await send('Page.navigate', { url: BASE + page })
    await sleep(1200)
    // scroll through so lazy images load
    await evaluate(`(async()=>{const h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=600){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,60))}window.scrollTo({top:0,behavior:'instant'})})()`)
    await sleep(500)
    const info = await evaluate(`({
      overflow: document.documentElement.scrollWidth - innerWidth,
      height: document.documentElement.scrollHeight,
      h1: document.querySelectorAll('h1').length,
      lang: document.documentElement.lang,
      brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
      brackets: (document.body.innerText.match(/\\[[A-ZА-Я]+\\]/g) || []),
      wide: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed').slice(0,5).map(e => e.className || e.tagName)
    })`)
    const name = `${(page || 'pl/').replace(/\//g, '_')}${width}`
    await send('Emulation.setDeviceMetricsOverride', { width, height: Math.min(info.height, 16000), deviceScaleFactor: 1, mobile: width < 600 })
    await sleep(250)
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 72 })
    fs.writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(shot.data, 'base64'))
    const problems = [
      ...errors,
      info.overflow > 0 && `horizontal overflow ${info.overflow}px (${info.wide.join(', ')})`,
      info.h1 !== 1 && `h1 count ${info.h1}`,
      info.brokenImages.length && `broken images ${info.brokenImages}`,
      info.brackets.length && `placeholders ${info.brackets}`,
    ].filter(Boolean)
    if (problems.length) bad++
    console.log(problems.length ? 'FAIL' : 'ok  ', name, `lang=${info.lang} h=${info.height}`, problems.join(' | '))
  }
ws.close()
process.exit(bad ? 1 : 0)
