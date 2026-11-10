import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
import { Flag } from './ui'

const W = 960
const H = 470
const land = feature(world, world.objects.countries)

export const TIER_COLOR = { top50: 'var(--c-wine)', ext: 'var(--c-muted)' }

// raio mínimo (em px de tela) da área de toque de cada ponto
const HIT_PX = 11

// Mapa em estilo gravura: papel, contorno a tinta, pontos vinho (1–50) e sépia (51–100).
export default function WorldMap({ items, focus = null, className = 'aspect-[960/470]', interactive = true, spreadOverlapping = false }) {
  const navigate = useNavigate()
  const svgRef = useRef(null)
  const [hover, setHover] = useState(null) // mouse: ponto sob o cursor
  const [picked, setPicked] = useState(null) // toque: ponto escolhido, abre no segundo toque
  const [zoom, setZoom] = useState(focus ? 3.2 : 1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [ppu, setPpu] = useState(1) // px de tela por unidade do viewBox
  const drag = useRef(null)
  const pointerType = useRef('mouse')

  const boxRef = useRef(null)
  useEffect(() => {
    // mede a <figure>: no <svg> o ResizeObserver devolve unidades do viewBox
    const el = boxRef.current
    if (!el) return
    setPpu(el.getBoundingClientRect().width / W || 1)
    const ro =new ResizeObserver(([e]) => setPpu(e.contentRect.width / W || 1))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const projection = useMemo(() => geoEqualEarth().fitExtent([[12, 12], [W - 12, H - 12]], { type: 'Sphere' }), [])
  const path = useMemo(() => geoPath(projection), [projection])
  const sphere = useMemo(() => path({ type: 'Sphere' }), [path])
  const grat = useMemo(() => path(geoGraticule10()), [path])
  const countries = useMemo(() => land.features.map((f) => path(f)), [path])
  const points = useMemo(() => {
    const projected = items.map((r) => ({ r, p: projection([r.lng, r.lat]), anchor: null }))

    if (spreadOverlapping && !focus) {
      // Vários restaurantes podem ocupar a mesma cidade (ex.: 3 em São Paulo).
      // Separa os pontos visualmente, mantendo linhas até a coordenada aproximada.
      // A distância é em pixels de tela, mesmo ao alterar zoom ou tamanho do mapa.
      const groups = new Map()
      projected.forEach((pt) => {
        const cityKey = `${pt.r.code}:${pt.r.city}`
        if (!groups.has(cityKey)) groups.set(cityKey, [])
        groups.get(cityKey).push(pt)
      })
      groups.forEach((group) => {
        if (group.length <= 1) return
        group.sort((a, b) => a.r.rank - b.r.rank)
        const anchor = [
          group.reduce((sum, pt) => sum + pt.p[0], 0) / group.length,
          group.reduce((sum, pt) => sum + pt.p[1], 0) / group.length,
        ]
        const radiusPx = group.length === 2 ? 16 : Math.min(44, Math.max(19, group.length * 4.2))
        const radius = radiusPx / (ppu * zoom)
        group.forEach((pt, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / group.length
          pt.anchor = anchor
          pt.p = [anchor[0] + Math.cos(angle) * radius, anchor[1] + Math.sin(angle) * radius]
        })
      })
    }

    return projected.sort((a, b) => b.r.rank - a.r.rank)
  }, [items, projection, spreadOverlapping, focus, zoom, ppu])

  // Se o ponto escolhido ou sob o cursor saiu do filtro, esconda a etiqueta.
  useEffect(() => {
    if (picked && !items.includes(picked.r)) setPicked(null)
    if (hover && !items.includes(hover.r)) setHover(null)
  }, [items, picked, hover])

  const center = focus ? projection([focus.lng, focus.lat]) : [W / 2, H / 2]
  const tx = W / 2 - center[0] * zoom + pan.x
  const ty = H / 2 - center[1] * zoom + pan.y
  // em telas estreitas os pontos crescem um pouco para continuarem visíveis
  const dot = Math.min(2.2, Math.max(1, 0.9 / ppu))
  const k = (v) => (v * dot) / Math.sqrt(zoom)
  const hitR = HIT_PX / (ppu * zoom)

  const toSvg = (e) => {
    const b = svgRef.current.getBoundingClientRect()
    return { x: ((e.clientX - b.left) / b.width) * W, y: ((e.clientY - b.top) / b.height) * H }
  }
  const onDown = (e) => {
    pointerType.current = e.pointerType
    if (interactive) drag.current = { start: toSvg(e), pan, moved: false }
  }
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

  const open = (r) => navigate(`/restaurante/${r.slug}`)
  const onPoint = (pt) => {
    if (!interactive || drag.current?.moved) return
    // no toque não há "passar o cursor": o primeiro toque mostra o nome, o segundo abre
    if (pointerType.current !== 'mouse' && picked?.r !== pt.r) return setPicked(pt)
    open(pt.r)
  }

  // Resolve o ponto atual para reposicionar a etiqueta após zoom ou redimensionamento.
  const tip = points.find((pt) => pt.r === (hover?.r || picked?.r))
  const hp = tip && { x: tx + tip.p[0] * zoom, y: ty + tip.p[1] * zoom }
  const below = hp && hp.y < H * 0.3 // perto do topo, a etiqueta desce para não ser cortada

  return (
    <figure ref={boxRef} className={`relative w-full ${className} select-none overflow-hidden border border-rule bg-[var(--m-bg)]`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={`absolute inset-0 h-full w-full ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
        // sem zoom, deixa o dedo rolar a página; ampliado, o arrasto move o mapa
        style={{ touchAction: interactive && zoom > 1 ? 'none' : 'pan-y' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
        onPointerLeave={() => { drag.current = null; setHover(null) }}
        onClick={(e) => e.target.tagName !== 'circle' && !drag.current?.moved && setPicked(null)}
        role="group"
        aria-label="Mapa-múndi com a localização dos restaurantes"
      >
        <g transform={`translate(${tx},${ty}) scale(${zoom})`}>
          <path d={sphere} fill="var(--m-sphere)" stroke="var(--m-edge)" strokeWidth={0.8 / zoom} />
          <path d={grat} fill="none" stroke="var(--m-grat)" strokeWidth={0.4 / zoom} strokeDasharray={`${2 / zoom} ${2 / zoom}`} />
          {countries.map((d, i) => (
            <path key={i} d={d} fill="var(--m-land)" stroke="var(--m-border)" strokeWidth={0.45 / zoom} />
          ))}
          {points.map((pt) => {
            const { r, p } = pt
            const isF = focus && focus.slug === r.slug
            const isP = picked?.r === r
            const vr = k(isF || isP ? 6.5 : r.tier === 'top50' ? 4 : 3.2)
            return (
              <g key={r.slug}>
                {pt.anchor && (
                  <line
                    x1={pt.anchor[0]} y1={pt.anchor[1]}
                    x2={p[0]} y2={p[1]}
                    stroke="var(--m-border)" strokeOpacity="0.75"
                    strokeWidth={0.8 / zoom}
                    pointerEvents="none"
                  />
                )}
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r={vr}
                  fill={TIER_COLOR[r.tier]}
                  fillOpacity={focus && !isF ? 0.4 : 0.9}
                  stroke="var(--m-sphere)"
                  strokeWidth={k(isF || isP ? 2 : 1)}
                  pointerEvents="none"
                />
                {/* área de toque invisível, maior que o ponto */}
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r={Math.max(vr, hitR)}
                  fill="transparent"
                  tabIndex={interactive ? 0 : undefined}
                  role={interactive ? 'link' : undefined}
                  aria-label={interactive ? `${r.rank}º: ${r.name}, ${r.city}, ${r.country}` : undefined}
                  onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) setPicked(pt) }}
                  onBlur={() => setPicked(null)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      open(r)
                    } else if (event.key === 'Escape') {
                      setPicked(null)
                    }
                  }}
                  className={interactive ? 'cursor-pointer' : ''}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(pt)}
                  onPointerLeave={() => setHover(null)}
                  onClick={() => onPoint(pt)}
                />
              </g>
            )
          })}
          {focus && (() => {
            const p = projection([focus.lng, focus.lat])
            return <circle cx={p[0]} cy={p[1]} r={k(15)} fill="none" stroke="var(--c-wine)" strokeWidth={k(1)} strokeDasharray={`${k(3)} ${k(2)}`} pointerEvents="none" />
          })()}
        </g>
      </svg>

      {interactive && (
        <div className="absolute right-3 top-3 z-20 flex flex-col border border-rule bg-paper">
          <button className="display h-8 w-8 text-xl leading-none text-ink hover:text-wine" onClick={() => setZ(zoom * 1.6)} aria-label="Aproximar">+</button>
          <button className="display h-8 w-8 border-t border-rule text-xl leading-none text-ink hover:text-wine" onClick={() => setZ(zoom / 1.6)} aria-label="Afastar">−</button>
        </div>
      )}

      {tip && (
        <div
          className={`absolute z-10 w-max max-w-[240px] -translate-x-1/2 border border-ink bg-paper px-3 py-2 text-left shadow-[3px_3px_0_var(--c-shadow)] ${
            below ? 'translate-y-[14px]' : '-translate-y-[calc(100%+12px)]'
          } ${picked && !hover ? 'cursor-pointer' : 'pointer-events-none'}`}
          style={{ left: `${Math.min(88, Math.max(12, (hp.x / W) * 100))}%`, top: `${(hp.y / H) * 100}%` }}
          onClick={() => picked && !hover && open(picked.r)}
        >
          <div className="flex items-baseline gap-2">
            <span className="display text-lg italic" style={{ color: TIER_COLOR[tip.r.tier] }}>{tip.r.rank}</span>
            <span className="display text-lg font-semibold leading-tight">{tip.r.name}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs italic text-ink-2">
            <Flag code={tip.r.code} className="!size-3" /> {tip.r.city}, {tip.r.country}
          </div>
          {picked && !hover && <div className="smallcaps mt-1.5 !text-[10px] text-wine">Toque para abrir →</div>}
        </div>
      )}
    </figure>
  )
}
