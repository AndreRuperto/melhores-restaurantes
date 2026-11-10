import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metadataFor, metadataTags, restaurantForPath } from './metadata.mjs'

const profiles = import.meta.glob('../data/profiles/*.json', { import: 'default' })
export function applyMetadata(meta) {
  document.title = meta.title
  document.head.querySelectorAll('meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"]').forEach(node => node.remove())
  const canonical = document.createElement('link')
  canonical.rel = 'canonical'
  canonical.href = meta.canonical
  document.head.append(canonical)
  for (const [attribute, key, value] of metadataTags(meta)) {
    const node = document.createElement('meta')
    node.setAttribute(attribute, key)
    node.content = value
    document.head.append(node)
  }
}
export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    let active = true
    // Run after the existing page title effects, including their cleanup.
    queueMicrotask(async () => {
      if (!active) return
      applyMetadata(metadataFor(pathname))
      const restaurant = restaurantForPath(pathname)
      const load = restaurant && profiles[`../data/profiles/${restaurant.slug}.json`]
      if (!load) return
      try {
        const profile = await load()
        if (active) applyMetadata(metadataFor(pathname, profile))
      } catch {
        // Keep the factual ranking metadata if a profile chunk is unavailable.
      }
    })
    return () => { active = false }
  }, [pathname])
  return null
}
