import { useEffect, useState } from 'react'

// Um arquivo individual por restaurante, carregado apenas na rota correspondente.
const files = import.meta.glob('./profiles/*.json', { import: 'default' })
const key = (slug) => `./profiles/${slug}.json`
const cache = new Map()

export const hasProfile = (slug) => Object.hasOwn(files, key(slug))

function cachedProfile(slug) {
  if (cache.has(slug)) return cache.get(slug)
  if (typeof document === 'undefined' || !hasProfile(slug)) return undefined
  const node = document.getElementById('profile-data')
  if (node?.type !== 'application/json') return undefined
  try {
    const profile = JSON.parse(node.textContent)
    if (profile?.slug !== slug || typeof profile.lede !== 'string' || !profile.lede.trim()) return undefined
    cache.set(slug, profile)
    return profile
  } catch {
    return undefined
  }
}

// undefined = carregando · null = indisponível · objeto = perfil
export function useProfile(slug) {
  const initial = cachedProfile(slug)
  const [state, setState] = useState(() => ({ slug, profile: initial }))
  useEffect(() => {
    const cached = cachedProfile(slug)
    if (cached !== undefined) {
      setState({ slug, profile: cached })
      return undefined
    }
    const loader = files[key(slug)]
    if (!loader) {
      setState({ slug, profile: null })
      return undefined
    }
    let active = true
    setState({ slug, profile: undefined })
    loader().then(
      profile => {
        if (active) {
          cache.set(slug, profile)
          setState({ slug, profile })
        }
      },
      () => { if (active) setState({ slug, profile: null }) },
    )
    return () => { active = false }
  }, [slug])
  // Never expose the previous route's profile while the new effect is pending.
  return initial !== undefined ? initial : state.slug === slug ? state.profile : undefined
}
