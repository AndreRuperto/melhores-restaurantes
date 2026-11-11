import assert from 'node:assert/strict'
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSeo, renderProfileData, serializeProfile } from './generate-seo.mjs'
import { ORIGIN, routePaths, restaurantForPath, metadataFor, metadataTags, escapeHtml } from '../src/seo/metadata.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))

// These tests do not touch dist or run a build (--source-only).
const profileScript = /<script id="profile-data" type="application\/json">([\s\S]*?)<\/script>/g
let embeddedCount = 0
for (const path of routePaths) {
  const restaurant = restaurantForPath(path)
  if (!restaurant) continue
  const profile = JSON.parse(await readFile(resolve(root, `src/data/profiles/${restaurant.slug}.json`), 'utf8'))
  const tag = renderProfileData(profile)
  const matches = [...tag.matchAll(profileScript)]
  assert.equal(matches.length, 1)
  const payload = matches[0][1]
  assert(!/[<\u2028\u2029]/.test(payload), `${path}: safe script data`)
  assert.equal(JSON.parse(payload).slug, restaurant.slug)
  assert.deepEqual(JSON.parse(payload), profile, `${path}: complete initial profile`)
  embeddedCount++
}
assert.equal(embeddedCount, 100)
assert.equal(renderProfileData(undefined), '')
const hostile = { slug: 'safe', lede: '</script><script>alert("x")</script><!--\u2028\u2029 & "' }
const serialized = serializeProfile(hostile)
assert(!/[<\u2028\u2029]/.test(serialized))
assert(serialized.includes('\\u003c'))
assert(serialized.includes('\\u2028'))
assert(serialized.includes('\\u2029'))
assert.deepEqual(JSON.parse(serialized), hostile)

// Run the actual hook with controlled state/effects and deferred import promises.
const hookSource = (await readFile(resolve(root, 'src/data/profiles.js'), 'utf8'))
  .replace(/^import .*\r?\n/m, '')
  .replace(/import\.meta\.glob\([^\n]*\)/, 'testFiles')
  .replace(/export /g, '')
const asador = JSON.parse(await readFile(resolve(root, 'src/data/profiles/asador-etxebarri.json'), 'utf8'))
function hookHarness(node) {
  let state, initialized = false, pending, cleanup, previousSlug
  const requests = new Map()
  let loads = 0
  const files = Object.fromEntries(['asador-etxebarri', 'den', 'arca'].map(slug => [`./profiles/${slug}.json`, () => {
    loads++
    return new Promise((resolve, reject) => requests.set(slug, { resolve, reject }))
  }]))
  const document = { getElementById: () => node }
  const useState = initializer => {
    if (!initialized) { state = initializer(); initialized = true }
    return [state, next => { state = next }]
  }
  const useEffect = (effect, [slug]) => {
    if (slug !== previousSlug) { previousSlug = slug; pending = effect }
  }
  const hook = new Function('useState', 'useEffect', 'testFiles', 'document', `${hookSource}; return useProfile`)(useState, useEffect, files, document)
  return {
    render: slug => hook(slug), requests,
    flush() { if (pending) { cleanup?.(); cleanup = pending(); pending = undefined } },
    unmount() { cleanup?.() },
    get loads() { return loads },
  }
}
const h = hookHarness({ type: 'application/json', textContent: serializeProfile(asador) })
assert.deepEqual(h.render('asador-etxebarri'), asador, 'first render has the complete initial profile')
h.flush()
assert.equal(h.loads, 0, 'initial profile skips async import')
assert.equal(h.render('den'), undefined, 'slug change never returns the previous profile')
h.flush()
assert.equal(h.loads, 1)
assert.deepEqual(h.render('asador-etxebarri'), asador, 'back navigation uses initial cache')
h.flush() // cancels the Den request
h.requests.get('den').resolve({ slug: 'den', lede: 'Late response' })
await Promise.resolve()
assert.deepEqual(h.render('asador-etxebarri'), asador, 'cancelled import cannot replace current profile')
assert.equal(h.render('arca'), undefined)
h.flush()
const arca = { slug: 'arca', lede: 'Loaded profile' }
h.requests.get('arca').resolve(arca)
await Promise.resolve()
assert.deepEqual(h.render('arca'), arca)
h.render('asador-etxebarri'); h.flush()
assert.deepEqual(h.render('arca'), arca, 'SPA-loaded profiles are cached synchronously too')
h.flush()
assert.equal(h.loads, 2)
h.render('missing'); h.flush()
assert.equal(h.render('missing'), null)
h.unmount()
for (const node of [null, { type: 'application/json', textContent: '{invalid' }, { type: 'text/javascript', textContent: serializeProfile(asador) }, { type: 'application/json', textContent: JSON.stringify({ slug: 'den', lede: 'Other route' }) }]) {
  const fallback = hookHarness(node)
  assert.equal(fallback.render('asador-etxebarri'), undefined, 'missing, invalid or mismatched data uses async fallback')
  fallback.flush()
  assert.equal(fallback.loads, 1)
  fallback.requests.get('asador-etxebarri').reject(new Error('Network failure'))
  await Promise.resolve()
  assert.equal(fallback.render('asador-etxebarri'), null)
  fallback.unmount()
}
console.log('Initial profile verified: 100/100 slug/payload round trips; script escaping; synchronous hook, SPA cache, slug isolation, cancellation and fallback.')
// Exercise actual generation in an isolated fixture, without touching the shared dist.
const fixture = await mkdtemp(join(tmpdir(), 'a-carta-seo-'))
try {
  await writeFile(resolve(fixture, 'index.html'), '<!doctype html><html><head><title>Fixture</title></head><body><div id="root"></div></body></html>')
  await generateSeo(fixture)
  for (const path of routePaths) {
    const html = await readFile(resolve(fixture, `.${path}/index.html`), 'utf8')
    if (path !== '/') assert.equal(await readFile(resolve(fixture, `.${path}.html`), 'utf8'), html, `${path}: generated clean URL alias equals directory HTML`)
    const restaurant = restaurantForPath(path)
    const embedded = [...html.matchAll(profileScript)]
    assert.equal(embedded.length, restaurant ? 1 : 0)
    if (restaurant) assert.equal(JSON.parse(embedded[0][1]).slug, restaurant.slug)
    assert(html.includes(`rel="canonical" href="${ORIGIN}${path}"`))
  }
  const notFound = await readFile(resolve(fixture, '404.html'), 'utf8')
  assert(notFound.includes('name="robots" content="noindex,follow"'))
  assert(notFound.includes('<title>Página não encontrada · A Carta</title>'))
  assert(notFound.includes('<div id="root"></div>'), '404 retains the SPA app shell')
  assert.equal([...notFound.matchAll(profileScript)].length, 0, '404 has no profile data')
  // Rerunning postprocessing must not accumulate embedded data or aliases.
  await generateSeo(fixture)
  const html = await readFile(resolve(fixture, 'restaurante/asador-etxebarri.html'), 'utf8')
  assert.equal([...html.matchAll(profileScript)].length, 1)
  console.log('Alias generation verified: 102/102 flat .html aliases equal route indexes; correct payloads and canonicals; repeat generation is safe.')
} finally {
  await rm(fixture, { recursive: true, force: true })
}
if (process.argv.includes('--source-only')) process.exit(0)
const staticBases = process.argv.filter(arg => arg.startsWith('--http-static=')).map(arg => arg.slice(14).replace(/\/$/, ''))
const httpBases = [...new Set([...process.argv.filter(arg => arg.startsWith('--http=')).map(arg => arg.slice(7).replace(/\/$/, '')), ...staticBases])]


// Compara sem CR: um build feito em checkout Windows (CRLF) deve bater com o deploy Linux (LF).
const lf = (text) => text.replace(/\r/g, '')
const titles = new Set()
const descriptions = new Set()
let count = 0
let images = 0
let structuredImages = 0
for (const path of routePaths) {
  const restaurant = restaurantForPath(path)
  const profile = restaurant ? JSON.parse(await readFile(resolve(root, `src/data/profiles/${restaurant.slug}.json`), 'utf8')) : undefined
  const html = await readFile(resolve(root, `dist/.${path}/index.html`), 'utf8')
  if (path !== '/') assert.equal(await readFile(resolve(root, `dist/.${path}.html`), 'utf8'), html, `${path}: built clean URL alias`)
  for (const base of httpBases) {
    for (const requestPath of path === '/' ? ['/'] : [path, `${path}/`]) {
      const response = await fetch(`${base}${requestPath}`, { signal: AbortSignal.timeout(10000) })
      assert.equal(response.status, 200, `${base}${requestPath}: HTTP status`)
      assert.equal(lf(await response.text()), lf(html), `${base}${requestPath}: HTTP must serve this route's HTML, not SPA root fallback`)
    }
  }
  const embedded = [...html.matchAll(profileScript)]
  assert.equal(embedded.length, restaurant ? 1 : 0, `${path}: initial profile script count`)
  if (restaurant) {
    assert.deepEqual(JSON.parse(embedded[0][1]), profile, `${path}: built HTML initial profile`)
    assert(!/[<\u2028\u2029]/.test(embedded[0][1]), `${path}: built HTML safe payload`)
  }
  const meta = metadataFor(path, profile)
  assert.equal((html.match(/<title\b/g) || []).length, 1, `${path}: unique title`)
  assert(html.includes(`<title>${escapeHtml(meta.title)}</title>`), `${path}: title`)
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${path}: unique canonical`)
  assert(html.includes(`href="${ORIGIN}${path}"`), `${path}: canonical`)
  for (const [attribute, key, value] of metadataTags(meta)) {
    assert.equal(html.split(`${attribute}="${key}"`).length - 1, 1, `${path}: unique ${key}`)
    assert(html.includes(`<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`), `${path}: ${key}`)
  }
  assert(html.includes('<div id="root"></div>'), `${path}: SPA root preserved`)
  assert(/<script type="module"[^>]*src="\/assets\//.test(html), `${path}: Vite entry preserved`)
  assert(!titles.has(meta.title), `${path}: distinct title`)
  titles.add(meta.title)
  assert(!descriptions.has(meta.description), `${path}: distinct description`)
  descriptions.add(meta.description)
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  assert.equal(ldBlocks.length, restaurant ? 1 : 0, `${path}: structured data count`)
  if (restaurant) {
    const ld = JSON.parse(ldBlocks[0][1])
    assert.deepEqual(ld, meta.structuredData, `${path}: structured data matches profile`)
    assert.equal(ld['@type'], 'Restaurant', `${path}: structured data type`)
    assert.equal(ld.name, restaurant.name, `${path}: structured data name`)
    assert.equal(ld.mainEntityOfPage, `${ORIGIN}${path}`, `${path}: structured data page`)
    for (const forbidden of ['aggregateRating', 'review', 'starRating', 'ratingValue']) assert(!JSON.stringify(ld).includes(forbidden), `${path}: no invented ${forbidden}`)
    if (ld.image) {
      const photos = [profile.hero, profile.facade, ...(profile.gallery || []), ...(profile.dishes || []).map(d => d.photo)]
      assert(photos.some(photo => photo?.src === ld.image && photo.rightsStatus === 'approved' && ['facade', 'interior', 'dish', 'chef'].includes(photo.kind)), `${path}: structured data image shows the restaurant`)
      structuredImages++
    }
    if (ld.address) assert.equal(ld.address, profile.practical.address, `${path}: structured data address`)
    if (ld.telephone) assert.equal(ld.telephone, profile.practical.phone, `${path}: structured data phone`)
    assert(!/[<\u2028\u2029]/.test(ldBlocks[0][1]), `${path}: structured data safe payload`)
  }
  if (restaurant) {
    count++
    assert(profile.lede.startsWith(meta.description.replace(/…$/, '')), `${path}: local lede`)
    if (meta.image) {
      images++
      const photos = [profile.hero, profile.facade, ...(profile.gallery || []), ...(profile.dishes || []).map(d => d.photo)]
      assert(photos.some(photo => photo?.src === meta.image.src && photo.rightsStatus === 'approved'), `${path}: approved image`)
    } else assert(!html.includes('property="og:image"'), `${path}: no unapproved image`)
  }
}
assert.equal(count, 100)
const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8')
assert.equal((sitemap.match(/<loc>/g) || []).length, 103)
for (const path of routePaths) assert(sitemap.includes(`<loc>${ORIGIN}${path}</loc>`))
assert.equal(await readFile(resolve(root, 'dist/robots.txt'), 'utf8'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`)
assert.equal(metadataFor('/restaurante/inexistente').robots, 'noindex,follow')
assert.equal(metadataFor('/restaurantes/').canonical, `${ORIGIN}/restaurantes`)
assert.equal(metadataFor('/restaurante/asador-etxebarri', { hero: { src: 'https://example.com/unapproved.jpg', rightsStatus: 'pending' } }).image, null)
assert.equal(escapeHtml('<script>"&\''), '&lt;script&gt;&quot;&amp;&#39;')

// Exercise the actual client updater across image/no-image/404 transitions.
const source = await readFile(resolve(root, 'src/seo/Seo.jsx'), 'utf8')
const updater = source.slice(source.indexOf('export function applyMetadata'), source.indexOf('export default function Seo')).replace('export function', 'function')
const nodes = []
const document = {
  title: '',
  createElement(tag) {
    return { tag, setAttribute(key, value) { this[key] = value }, remove() { nodes.splice(nodes.indexOf(this), 1) } }
  },
  head: { querySelectorAll() { return [...nodes] }, append(node) { nodes.push(node) } },
}
const apply = new Function('document', 'metadataTags', `${updater}; return applyMetadata`)(document, metadataTags)
for (const path of ['/restaurante/asador-etxebarri', '/restaurantes', '/nao-existe', '/como-funciona', '/']) {
  const restaurant = restaurantForPath(path)
  const profile = restaurant ? JSON.parse(await readFile(resolve(root, `src/data/profiles/${restaurant.slug}.json`), 'utf8')) : undefined
  const meta = metadataFor(path, profile)
  apply(meta)
  apply(meta) // StrictMode / repeated updates must not duplicate tags.
  assert.equal(document.title, meta.title)
  assert.equal(nodes.filter(n => n.rel === 'canonical').length, 1)
  assert.equal(nodes.find(n => n.rel === 'canonical').href, meta.canonical)
  assert.equal(nodes.length, metadataTags(meta).length + 1)
  assert.equal(nodes.find(n => n.name === 'robots').content, meta.robots)
  assert.equal(nodes.some(n => n.property === 'og:image'), Boolean(meta.image))
}
console.log(`SEO verified: ${count}/100 profiles; 103 unique HTML heads; ${images} approved social images; 100 Restaurant JSON-LD blocks (${structuredImages} with a photo of the restaurant itself); sitemap/robots; client metadata transitions and duplicate prevention.`)

if (httpBases.length) console.log(`HTTP verified against ${httpBases.join(', ')}: all 103 clean routes and 102 trailing-slash routes serve their route-specific HTML.`)
else console.log('HTTP not checked. Pass --http=http://127.0.0.1:4174 for preview and --http-static=http://127.0.0.1:4177 for static serve; only supplied endpoints are verified.')

const notFoundHtml = await readFile(resolve(root, 'dist/404.html'), 'utf8')
assert(notFoundHtml.includes('name="robots" content="noindex,follow"'))
assert(notFoundHtml.includes('<div id="root"></div>'))
assert(/<script type="module"[^>]*src="\/assets\//.test(notFoundHtml), '404 preserves Vite app entry')
assert.equal([...notFoundHtml.matchAll(profileScript)].length, 0)
for (const base of staticBases) {
  for (const path of ['/seo-missing-route-check', '/restaurante/seo-missing-profile-check']) {
    const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(10000) })
    assert.equal(response.status, 404, `${base}${path}: real HTTP 404`)
    assert.equal(lf(await response.text()), lf(notFoundHtml), `${base}${path}: custom noindex SPA shell`)
  }
  console.log(`Static HTTP 404 verified against ${base}: missing page and profile return the custom noindex app shell.`)
}

// Emit a report only after every requested check above has passed.
const reportArgument = process.argv.find(arg => arg.startsWith('--report='))
if (reportArgument) {
  const endpointRows = httpBases.length
    ? httpBases.map(base => `<li>${escapeHtml(base)}: 103 rotas sem barra e 102 com barra verificadas por HTTP${staticBases.includes(base) ? '; duas rotas inexistentes retornam HTTP 404 com shell noindex' : '; fallback 404 não testado neste endpoint'}.</li>`).join('')
    : '<li>HTTP não executado. Preview e servidor de produção não verificados nesta execução.</li>'
  await writeFile(resolve(root, reportArgument.slice(9)), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Validação SEO</title></head><body><h1>Validação SEO</h1><p>Execução: ${escapeHtml(new Date().toISOString())}</p><p>100 perfis; 103 metadados de rota; 102 aliases; JSON inicial seguro; cache, navegação e cancelamento; sitemap, robots e shell 404 validados.</p><h2>HTTP efetivamente testado</h2><ul>${endpointRows}</ul><p>CLS e Lighthouse não foram medidos por este script. A validação em disco não substitui testes HTTP.</p></body></html>`)
  console.log(`SEO report saved to ${reportArgument.slice(9)}`)
}
