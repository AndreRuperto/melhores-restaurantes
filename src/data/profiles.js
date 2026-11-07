import { useEffect, useState } from 'react'

// Perfis com história, pratos, prêmios e fotos: um JSON por restaurante em ./profiles.
// Carregados sob demanda, para o pacote inicial não crescer com o conteúdo dos cem.
const files = import.meta.glob('./profiles/*.json', { import: 'default' })
const key = (slug) => `./profiles/${slug}.json`

export const hasProfile = (slug) => key(slug) in files

// undefined = carregando · null = sem perfil · objeto = perfil
export function useProfile(slug) {
  const [state, setState] = useState(() => (hasProfile(slug) ? undefined : null))
  useEffect(() => {
    if (!hasProfile(slug)) return setState(null)
    let alive = true
    setState(undefined)
    files[key(slug)]().then(
      (p) => alive && setState(p),
      () => alive && setState(null),
    )
    return () => { alive = false }
  }, [slug])
  return state
}
