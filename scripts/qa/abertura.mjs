// Testa a abertura animada da home (PR #16) num motor de navegador.
// Uso: QA_BROWSER=webkit QA_URL=https://... QA_OUT=pasta node scripts/qa/abertura.mjs
import { chromium, firefox, webkit } from '@playwright/test'
import fs from 'node:fs'

const engineName = process.env.QA_BROWSER || 'webkit'
const engine = { chromium, firefox, webkit }[engineName]
const base = (process.env.QA_URL || 'http://127.0.0.1:4174').replace(/\/$/, '')
const out = process.env.QA_OUT || 'docs/qa-frontend/evidencias/abertura'
fs.mkdirSync(out, { recursive: true })

// Mesmos tempos de src/components/MenuOpening.jsx, com folga.
const AUTO_OPEN = 4500, FLIP = 1650, HOLD = 550, ZOOM = 1100, SLACK = 1500
const devices = [
  { name: 'celular', viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: engineName !== 'firefox', caption: 'Toque na carta para abrir' },
  { name: 'computador', viewport: { width: 1440, height: 900 }, hasTouch: false, isMobile: false, caption: 'Clique na carta para abrir' },
]
const dialog = '[role="dialog"][aria-label="Animação de abertura de A Carta"]'
const browser = await engine.launch({ headless: true })
const rows = []
const errors = []

async function fresh(device, extra = {}) {
  const context = await browser.newContext({ viewport: device.viewport, hasTouch: device.hasTouch, isMobile: device.isMobile, ...extra })
  const page = await context.newPage()
  page.on('pageerror', (e) => errors.push(`${device.name}: ${e.message}`))
  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' })
  return { context, page }
}

// O efeito que liga o teclado também trava a rolagem; esperar isso evita apertar
// teclas antes de o ouvinte existir (no WebKit o efeito roda um pouco depois).
async function ready(page) {
  await page.locator(dialog).waitFor()
  await page.waitForFunction(() => document.body.style.overflow === 'hidden')
}

// Estado da página depois que a abertura termina.
const afterState = (page) => page.evaluate((key) => {
  const h1 = document.querySelector('[data-abertura-titulo]')
  let opacity = 1
  for (let e = h1; e; e = e.parentElement) opacity *= Number(getComputedStyle(e).opacity)
  return {
    titleVisible: Boolean(h1) && getComputedStyle(h1).visibility === 'visible' && opacity > 0.99,
    travelLeft: document.querySelectorAll('.menu-opening__travel').length,
    bodyOverflow: document.body.style.overflow,
    remembered: sessionStorage.getItem(key) === 'seen',
    horizontalScroll: document.documentElement.scrollWidth > innerWidth + 1,
  }
}, 'a-carta-abertura-2026-v1')

async function check(name, device, fn) {
  const started = Date.now()
  try {
    const result = await fn()
    rows.push({ case: name, device: device.name, pass: result.pass, ms: Date.now() - started, ...result })
  } catch (e) {
    rows.push({ case: name, device: device.name, pass: false, error: e.message.split('\n')[0] })
  }
  console.log(engineName, device.name, name, rows.at(-1).pass ? 'ok' : 'FALHOU')
}

for (const device of devices) {
  await check('carta fechada espera o gesto', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    const caption = (await page.locator('.menu-opening__caption').innerText()).trim()
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
    await page.waitForTimeout(1500)
    const stillClosed = await page.locator('.menu-opening--closed').count()
    await page.screenshot({ path: `${out}/${engineName}-${device.name}-fechada.png` })
    await context.close()
    // No WebKit com toque, focus() programático não move o foco: registra, mas só exige no computador.
    const focusOk = focused === 'Abrir a carta' || (device.hasTouch && focused === null)
    return { caption, focused, stillClosed, focusOk, pass: caption === device.caption && focusOk && stillClosed === 1 }
  })

  await check('toque ou clique abre e o título assume', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    const button = page.getByRole('button', { name: 'Abrir a carta' })
    if (device.hasTouch) await button.tap()
    else await button.click()
    await page.locator('.menu-opening--opening').waitFor({ timeout: 1000 })
    await page.locator('.menu-opening--zooming').waitFor({ timeout: FLIP + HOLD + SLACK })
    await page.screenshot({ path: `${out}/${engineName}-${device.name}-titulo-viajando.png` })
    await page.locator(dialog).waitFor({ state: 'detached', timeout: ZOOM + SLACK })
    const state = await afterState(page)
    await page.screenshot({ path: `${out}/${engineName}-${device.name}-depois.png` })
    await context.close()
    return { ...state, pass: state.titleVisible && state.travelLeft === 0 && state.bodyOverflow === '' && state.remembered && !state.horizontalScroll }
  })

  await check('abre sozinha sem gesto', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    await page.locator(dialog).waitFor({ state: 'detached', timeout: AUTO_OPEN + FLIP + HOLD + ZOOM + SLACK })
    const state = await afterState(page)
    await context.close()
    return { ...state, pass: state.titleVisible && state.travelLeft === 0 && state.remembered }
  })

  await check('Pular introdução encerra na hora', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    const t = Date.now()
    await page.getByRole('button', { name: /Pular introdução/ }).click()
    await page.locator(dialog).waitFor({ state: 'detached', timeout: 1000 })
    const closeMs = Date.now() - t
    const state = await afterState(page)
    await context.close()
    return { closeMs, ...state, pass: state.titleVisible && state.remembered && state.bodyOverflow === '' }
  })

  await check('Esc encerra', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    await page.keyboard.press('Escape')
    await page.locator(dialog).waitFor({ state: 'detached', timeout: 1000 })
    const state = await afterState(page)
    await context.close()
    return { ...state, pass: state.titleVisible && state.remembered }
  })

  await check('Tab fica preso entre os dois botões', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    const seq = []
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Tab')
      seq.push(await page.evaluate(() => (document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent || '').trim().slice(0, 20)))
    }
    await context.close()
    const expected = ['Pular introdução', 'Abrir a carta', 'Pular introdução', 'Abrir a carta']
    return { seq, pass: seq.every((label, i) => label.startsWith(expected[i])) }
  })

  await check('recarga na mesma sessão não repete', device, async () => {
    const { context, page } = await fresh(device)
    await ready(page)
    await page.keyboard.press('Escape')
    await page.locator(dialog).waitFor({ state: 'detached', timeout: 1000 })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.locator('[data-abertura-titulo]').waitFor()
    await page.waitForTimeout(800)
    const shown = await page.locator(dialog).count()
    await context.close()
    return { shown, pass: shown === 0 }
  })

  await check('sem movimento não mostra a abertura', device, async () => {
    const { context, page } = await fresh(device, { reducedMotion: 'reduce' })
    await page.locator('[data-abertura-titulo]').waitFor()
    await page.waitForTimeout(800)
    const shown = await page.locator(dialog).count()
    const state = await afterState(page)
    await context.close()
    return { shown, ...state, pass: shown === 0 && state.titleVisible }
  })
}

await browser.close()
const summary = { engine: engineName, base, date: new Date().toISOString(), cases: rows.length, failed: rows.filter((r) => !r.pass).length, errors, rows }
fs.writeFileSync(`${out}/${engineName}.json`, JSON.stringify(summary, null, 2))
console.log(JSON.stringify({ engine: engineName, cases: summary.cases, failed: summary.failed, errors }, null, 2))
if (summary.failed || errors.length) process.exitCode = 1
