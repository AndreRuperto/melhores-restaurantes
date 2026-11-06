import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurants, CONTINENTS, countBy } from '../data/restaurants'
import { Flag, Search, Tags } from './ui'

const TIERS = [
  ['all', 'Todos'],
  ['top50', '1 a 50'],
  ['ext', '51 a 100'],
]

// Uma linha de cardápio: número · nome ........ cidade
export function MenuItem({ r, compact = false }) {
  return (
    <Link to={`/restaurante/${r.slug}`} className="group grid grid-cols-[2.6rem_1fr] items-baseline gap-x-3 py-3">
      <span className={`display text-right text-2xl italic lnum ${r.tier === 'top50' ? 'text-wine' : 'text-muted'}`}>{r.rank}</span>
      <span className="min-w-0">
        <span className="flex items-baseline">
          <span className="display truncate text-[22px] font-semibold leading-tight text-ink group-hover:text-wine">{r.name}</span>
          <span className="leader" />
          <span className="flex flex-none items-center gap-1.5 text-sm text-ink-2">
            <Flag code={r.code} />
            {compact ? r.country : r.city}
          </span>
        </span>
        {!compact && (
          <span className="block text-[13px] italic text-muted">
            {r.country} · {r.continent}
            {(r.isNew || r.returning || r.prev || r.rank === 1) && <> · <Tags r={r} /></>}
          </span>
        )}
      </span>
    </Link>
  )
}

export default function RankingTable({ initial = 20 }) {
  const [q, setQ] = useState('')
  const [tier, setTier] = useState('all')
  const [continent, setContinent] = useState('')
  const [country, setCountry] = useState('')
  const [all, setAll] = useState(false)

  const countries = useMemo(() => countBy(restaurants, 'country').map(([c]) => c).sort((a, b) => a.localeCompare(b, 'pt')), [])

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return restaurants.filter(
      (r) =>
        (tier === 'all' || r.tier === tier) &&
        (!continent || r.continent === continent) &&
        (!country || r.country === country) &&
        (!term || `${r.name} ${r.city} ${r.country}`.toLowerCase().includes(term)),
    )
  }, [q, tier, continent, country])

  const shown = all ? rows : rows.slice(0, initial)
  const half = Math.ceil(shown.length / 2)

  return (
    <div className="box px-5 py-8 sm:px-10 sm:py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Search value={q} onChange={(e) => setQ(e.target.value)} placeholder="Procurar por restaurante, cidade ou país…" />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TIERS.map(([k, label]) => (
            <button key={k} className="pill" aria-pressed={tier === k} onClick={() => setTier(k)}>{label}</button>
          ))}
          <select className="pill appearance-none" value={continent} onChange={(e) => setContinent(e.target.value)} aria-label="Continente">
            <option value="">Todos os continentes</option>
            {CONTINENTS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select className="pill appearance-none" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="País">
            <option value="">Todos os países</option>
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <p className="text-center text-sm italic text-muted">{rows.length} {rows.length === 1 ? 'restaurante' : 'restaurantes'}</p>
      </div>

      <div className="mt-8 grid gap-x-14 border-t border-rule pt-4 lg:grid-cols-2">
        {[shown.slice(0, half), shown.slice(half)].map((col, i) => (
          <div key={i} className="divide-y divide-rule/60">
            {col.map((r) => <MenuItem key={r.slug} r={r} />)}
          </div>
        ))}
      </div>
      {!rows.length && <p className="py-10 text-center italic text-muted">Nenhum restaurante encontrado.</p>}

      {rows.length > initial && (
        <div className="mt-8 text-center">
          <button onClick={() => setAll(!all)} className="smallcaps border-b border-ink pb-1 text-ink hover:border-wine hover:text-wine">
            {all ? 'Mostrar menos' : `Ver a lista inteira (${rows.length})`}
          </button>
        </div>
      )}
    </div>
  )
}
