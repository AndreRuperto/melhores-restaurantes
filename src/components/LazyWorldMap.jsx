import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react'

const WorldMap = lazy(() => import('./WorldMap'))
// Keep the legend independent of the atlas chunk; same existing theme tokens.
export const TIER_COLOR = { top50: 'var(--c-wine)', ext: 'var(--c-muted)' }

class MapBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? <span className="text-sm italic text-muted" role="status">Mapa indisponível. Consulte os restaurantes na página.</span> : this.props.children
  }
}

export default function LazyWorldMap({ className = 'aspect-[960/470]', ...props }) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setNear(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect() }
    }, { rootMargin: '300px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const placeholder = <div className={`relative w-full ${className} overflow-hidden border border-rule bg-[var(--m-bg)]`} role="status" aria-label="Carregando mapa" />
  return (
    <div ref={ref}>
      {near ? <MapBoundary><Suspense fallback={placeholder}><WorldMap {...props} className={className} /></Suspense></MapBoundary> : placeholder}
    </div>
  )
}
