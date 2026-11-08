import { useEffect, useState } from 'react'

// Um arquivo individual por restaurante, carregado apenas na rota correspondente.
const files = import.meta.glob('./profiles/*.json', { import: 'default' })
const key = (slug) => `./profiles/${slug}.json`

export const hasProfile = (slug) => Object.hasOwn(files, key(slug))

// undefined = carregando · null = indisponível · objeto = perfil
export function useProfile(slug) {
  const [state, setState] = useState(undefined)
  useEffect(() => {
    const loader = files[key(slug)]
    if (!loader) {
      setState(null)
      return undefined
    }
    let active = true
    setState(undefined)
    loader().then(
      profile => { if (active) setState(profile) },
      () => { if (active) setState(null) },
    )
    return () => { active = false }
  }, [slug])
  return state
}
