import { useEffect, useState } from 'react'
import { bySlug } from './restaurants'

// Os perfis originais são arquivos individuais. As posições 28–100 ficam em
// dois pacotes editoriais carregados somente quando alguém visita uma página.
// Isso preserva a velocidade de carregamento da home e do ranking.
const files = import.meta.glob('./profiles/*.json', { import: 'default' })
const key = (slug) => `./profiles/${slug}.json`
const rankOf = (slug) => bySlug[slug]?.rank
const bundled = (slug) => {
  const rank = rankOf(slug)
  if (!rank) return null
  if (rank >= 28 && rank <= 50) return import('./profiles-28-50.json').then((m) => m.default[String(rank)] || null)
  if (rank >= 51 && rank <= 100) return import('./profiles-51-100.json').then((m) => m.default[String(rank)] || null)
  return null
}

export const hasProfile = (slug) => key(slug) in files || !!bundledRank(slug)

function bundledRank(slug) {
  const rank = rankOf(slug)
  return rank >= 28 && rank <= 100
}

// undefined = carregando · null = sem perfil · objeto = perfil
export function useProfile(slug) {
  const [state, setState] = useState(() => (hasProfile(slug) ? undefined : null))

  useEffect(() => {
    const individual = files[key(slug)]
    const request = individual ? individual() : bundled(slug)

    if (!request) {
      setState(null)
      return undefined
    }

    let alive = true
    setState(undefined)
    request.then(
      (profile) => alive && setState(profile),
      () => alive && setState(null),
    )
    return () => { alive = false }
  }, [slug])

  return state
}
