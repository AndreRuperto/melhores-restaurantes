import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ORIGIN, routePaths, restaurantForPath, metadataFor, renderHead, escapeHtml } from '../src/seo/metadata.mjs'

export function serializeProfile(profile) {
  return JSON.stringify(profile).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
}

export function renderProfileData(profile) {
  return profile ? `<script id="profile-data" type="application/json">${serializeProfile(profile)}</script>` : ''
}

export async function generateSeo(outputDirectory) {
  const root = fileURLToPath(new URL('../', import.meta.url))
  const dist = outputDirectory ? resolve(outputDirectory) : resolve(root, 'dist')
  const template = await readFile(resolve(dist, 'index.html'), 'utf8')
  // Replace only metadata owned by SEO; preserve assets, fonts, theme and app shell.
  const shell = template
    .replace(/<script\b(?=[^>]*id=["']profile-data["'])[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b(?=[^>]*(?:name\s*=\s*["'](?:description|robots|twitter:[^"']*)["']|property\s*=\s*["']og:[^"']*["']))[^>]*>/gi, '')
    .replace(/<link\b(?=[^>]*rel\s*=\s*["']canonical["'])[^>]*>/gi, '')
  for (const path of routePaths) {
    const restaurant = restaurantForPath(path)
    const profile = restaurant ? JSON.parse(await readFile(resolve(root, `src/data/profiles/${restaurant.slug}.json`), 'utf8')) : undefined
    if (restaurant && (profile.slug !== restaurant.slug || !profile.lede?.trim())) throw new Error(`Invalid SEO profile: ${restaurant.slug}`)
    const output = resolve(dist, `.${path}`, 'index.html')
    await mkdir(dirname(output), { recursive: true })
    const html = shell.replace('</head>', `    ${renderHead(metadataFor(path, profile))}\n    ${renderProfileData(profile)}\n  </head>`)
    await writeFile(output, html)
    // sirv resolves clean URLs via .html; keep directory indexes for trailing slashes.
    if (path !== '/') await writeFile(resolve(dist, `.${path}.html`), html)
}
await writeFile(resolve(dist, '404.html'), shell.replace('</head>', `    ${renderHead(metadataFor('/404.html'))}\n  </head>`))
await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routePaths.map(path => `  <url><loc>${escapeHtml(ORIGIN + path)}</loc></url>`).join('\n')}\n</urlset>\n`)
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`)
console.log(`SEO: generated ${routePaths.length} route heads, ${routePaths.length - 1} clean URL aliases, 404.html (noindex), sitemap.xml and robots.txt`)

}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateSeo()
}
