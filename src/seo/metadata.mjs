import { restaurants, bySlug } from '../data/restaurants.js'

export const ORIGIN = 'https://melhores-restaurantes.up.railway.app'
export const staticPages = {
  '/': {
    title: 'A Carta · Os 100 melhores restaurantes do mundo em 2026',
    description: 'Os 100 melhores restaurantes do mundo em 2026: explore o ranking, o mapa e os perfis de cada restaurante na A Carta.',
  },
  '/restaurantes': {
    title: 'Os 100 restaurantes · Ranking 2026 · A Carta',
    description: 'Consulte a lista dos 100 melhores restaurantes do mundo em 2026 e explore os restaurantes por nome, cidade, país e continente.',
  },
  '/como-funciona': {
    title: 'Como funciona a lista · A Carta',
    description: 'Entenda como é feita a lista The 50 Best Restaurants: votação dos jurados, critérios e calendário de 2026.',
  },
}
export const routePaths = [...Object.keys(staticPages), ...restaurants.map(r => `/restaurante/${r.slug}`)]
export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}
export function restaurantForPath(pathname) {
  const match = /^\/restaurante\/([^/]+)$/.exec(normalizePath(pathname))
  return match ? bySlug[match[1]] : undefined
}
function excerpt(value) {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= 190) return text
  return `${text.slice(0, 187).replace(/\s+\S*$/, '')}…`
}
export function metadataFor(pathname, profile) {
  const path = normalizePath(pathname)
  const restaurant = restaurantForPath(path)
  let data = staticPages[path]
  if (restaurant) {
    data = {
      title: `${restaurant.name} · ${restaurant.rank}º · A Carta`,
      description: excerpt(profile?.lede || `${restaurant.name}, em ${restaurant.city}, ${restaurant.country}: ${restaurant.rank}º lugar na lista de 2026. Conheça o perfil na A Carta.`),
    }
  }
  const known = Boolean(data)
  data ||= { title: 'Página não encontrada · A Carta', description: 'Página não encontrada. Explore a lista de restaurantes na A Carta.' }
  const image = [profile?.hero, profile?.facade, ...(profile?.gallery || []), ...(profile?.dishes || []).map(d => d.photo)]
    .find(photo => photo?.rightsStatus === 'approved' && /^https?:\/\//.test(photo.src))
  return { ...data, canonical: `${ORIGIN}${path}`, robots: known ? 'index,follow' : 'noindex,follow', image: image ? { src: image.src, alt: image.alt || image.caption || restaurant?.name || '' } : null }
}
export function metadataTags(meta) {
  const tags = [
    ['name', 'description', meta.description], ['name', 'robots', meta.robots],
    ['property', 'og:type', 'website'], ['property', 'og:site_name', 'A Carta'],
    ['property', 'og:locale', 'pt_BR'], ['property', 'og:title', meta.title],
    ['property', 'og:description', meta.description], ['property', 'og:url', meta.canonical],
    ['name', 'twitter:card', meta.image ? 'summary_large_image' : 'summary'],
    ['name', 'twitter:title', meta.title], ['name', 'twitter:description', meta.description],
    ['name', 'twitter:url', meta.canonical],
  ]
  if (meta.image) tags.push(['property', 'og:image', meta.image.src], ['property', 'og:image:alt', meta.image.alt], ['name', 'twitter:image', meta.image.src], ['name', 'twitter:image:alt', meta.image.alt])
  return tags
}
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
export function renderHead(meta) {
  return `<title>${escapeHtml(meta.title)}</title>\n    <link rel="canonical" href="${escapeHtml(meta.canonical)}" />\n    ${metadataTags(meta).map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`).join('\n    ')}`
}
