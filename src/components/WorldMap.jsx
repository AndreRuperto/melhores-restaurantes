import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { Flag } from './ui'

const W = 960
const H = 470
const land = feature(world, world.objects.countries)

export const TIER_COLOR = { top50: 'var(--c-wine)', ext: 'var(--c-muted)' }

// Mapa em estilo gravura: papel, contorno a tinta, pontos vinho (1–50) e sépia (51–100).
export default function WorldMap({ items, focus = null, className = 'aspect-[960/470]', interactive = true }) {
  const navigate = useNavigate()
  const svgRef = useRef(null)
  const [hover, setHover] = useState(null)
  const [zoom, setZoom] = useState(focus ? 3.2 : 1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const drag = useRef(null)

  const projection = useMemo(() => geoEqualEarth().fitExtent([[12, 12], [W - 12, H - 12]], { type: 'Sphere' }), [])
  const path = useMemo(() => geoPath(projection), [projection])
  const sphere = useMemo(() => path({ type: 'Sphere' }), [path])
  const grat = useMemo(() => path(geoGraticule10()), [path])
  const countries = useMemo(() => land.features.map((f) => path(f)), [path])
  const points = useMemo(
    () => items.map((r) => ({ r, p: projection([r.lng, r.lat]) })).sort((a, b) => b.r.rank - a.r.rank),
    [items, projection],
  )

  const center = focus ? projection([focus.lng, focus.lat]) : [W / 2, H / 2]
  const tx = W / 2 - center[0] * zoom + pan.x
  const ty = H / 2 - center[1] * zoom + pan.y
  const k = (v) => v / Math.sqrt(zoom)

  const toSvg = (e) => {
    const b = svgRef.current.getBoundingClientRect()
    return { x: ((e.clientX - b.left) / b.width) * W, y: ((e.clientY - b.top) / b.height) * H }
  }
  const onDown = (e) => interactive && (drag.current = { start: toSvg(e), pan, moved: false })
  const onMove = (e) => {
    if (!drag.current) return
    const p = toSvg(e)
    const dx = p.x - drag.current.start.x
    const dy = p.y - drag.current.start.y
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true
    setPan({ x: drag.current.pan.x + dx, y: drag.current.pan.y + dy })
  }
  const onUp = () => setTimeout(() => (drag.current = null), 0)
  const setZ = (z) => {
    const nz = Math.min(8, Math.max(1, z))
    setPan((p) => ({ x: (p.x * nz) / zoom, y: (p.y * nz) / zoom }))
    setZoom(nz)
  }
  const hp = hover && { x: tx + hover.p[0] * zoom, y: ty + hover.p[1] * zoom }

  return (
    <figure className={`relative w-full ${className} select-none overflow-hidden border border-rule bg-[var(--m-bg)]`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={`absolute inset-0 h-full w-full ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={() => { drag.current = null; setHover(null) }}
        role="img"
        aria-label="Mapa-múndi com a localização dos restaurantes"
      >
        <g transform={`translate(${tx},${ty}) scale(${zoom})`}>
          <path d={sphere} fill="var(--m-sphere)" stroke="var(--m-edge)" strokeWidth={0.8 / zoom} />
          <path d={grat} fill="none" stroke="var(--m-grat)" strokeWidth={0.4 / zoom} strokeDasharray={`${2 / zoom} ${2 / zoom}`} />
          {countries.map((d, i) => (
            <path key={i} d={d} fill="var(--m-land)" stroke="var(--m-border)" strokeWidth={0.45 / zoom} />
          ))}
          {points.map(({ r, p }) => {
            const isF = focus && focus.slug === r.slug
            return (
              <circle
                key={r.slug}
                cx={p[0]}
                cy={p[1]}
                r={k(isF ? 6.5 : r.tier === 'top50' ? 4 : 3.2)}
                fill={TIER_COLOR[r.tier]}
                fillOpacity={focus && !isF ? 0.4 : 0.9}
                stroke="var(--m-sphere)"
                strokeWidth={k(isF ? 2 : 1)}
                className={interactive ? 'cursor-pointer' : ''}
                onPointerEnter={() => setHover({ r, p })}
                onPointerLeave={() => setHover(null)}
                onClick={() => interactive && !drag.current?.moved && navigate(`/restaurante/${r.slug}`)}
              />
            )
          })}
          {focus && (() => {
            const p = projection([focus.lng, focus.lat])
            return <circle cx={p[0]} cy={p[1]} r={k(15)} fill="none" stroke="var(--c-wine)" strokeWidth={k(1)} strokeDasharray={`${k(3)} ${k(2)}`} />
          })()}
        </g>
      </svg>

      {interactive && (
        <div className="absolute right-3 top-3 flex flex-col border border-rule bg-paper">
          <button className="display h-8 w-8 text-xl leading-none text-ink hover:text-wine" onClick={() => setZ(zoom * 1.6)} aria-label="Aproximar">+</button>
          <button className="display h-8 w-8 border-t border-rule text-xl leading-none text-ink hover:text-wine" onClick={() => setZ(zoom / 1.6)} aria-label="Afastar">−</button>
        </div>
      )}

      {hover && (
        <div
          className="pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 -translate-y-[calc(100%+12px)] border border-ink bg-paper px-3 py-2 shadow-[3px_3px_0_var(--c-shadow)]"
          style={{ left: `${(hp.x / W) * 100}%`, top: `${(hp.y / H) * 100}%` }}
        >
          <div className="flex items-baseline gap-2">
            <span className="display text-lg italic" style={{ color: TIER_COLOR[hover.r.tier] }}>{hover.r.rank}</span>
            <span className="display text-lg font-semibold leading-tight">{hover.r.name}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs italic text-ink-2">
            <Flag code={hover.r.code} className="!size-3" /> {hover.r.city}, {hover.r.country}
          </div>
        </div>
      )}
    </figure>
  )
}
