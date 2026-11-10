import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { restaurants, CONTINENTS, countBy, matches } from '../data/restaurants'
import { Header, Footer, Search, Ornament } from '../components/ui'
import WorldMap from '../components/LazyWorldMap'
import { MenuItem } from '../components/RankingTable'
import CountryDropdown from '../components/CountryDropdown'

export default function Restaurants() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const cont = params.get('continente') || ''
  const country = params.get('pais') || ''
  const tier = params.get('faixa') || ''

  const set = (k, v) => {
    const next = new URLSearchParams(params)
    v ? next.set(k, v) : next.delete(k)
    if (k === 'continente') next.delete('pais')
    setParams(next, { replace: true })
  }

  const countries = useMemo(() => countBy(
    restaurants.filter((r) => !cont || r.continent === cont), 'country',
  ).sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
    .map(([name, total]) => ({
      name,
      total,
      code: restaurants.find((r) => r.country === name).code,
    })), [cont])

  const list = useMemo(() => {
    return restaurants.filter(
      (r) =>
        (!cont || r.continent === cont) &&
        (!country || r.country === country) &&
        (!tier || r.tier === tier) &&
        matches(r, q),
    )
  }, [q, cont, country, tier])

  const top = list.filter((r) => r.tier === 'top50')
  const ext = list.filter((r) => r.tier === 'ext')

  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="mx-auto max-w-6xl px-4 sm:px-8 pt-16">
        <div className="text-center">
          <div role="status" aria-live="polite" className="smallcaps text-wine">{list.length} de 100 restaurantes</div>
          <h1 className="display mt-4 text-6xl sm:text-7xl">Todos os <em className="italic text-wine">restaurantes</em></h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-2">Os cem restaurantes do ranking de 2026, no mapa e em lista. Escolha um para ver a página dele.</p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-5">
          <Search value={q} onChange={(e) => set('q', e.target.value)} placeholder="Procurar por restaurante, cidade ou país…" />
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CONTINENTS.map((c) => (
              <button key={c} className="pill" aria-pressed={cont === c} onClick={() => set('continente', cont === c ? '' : c)}>{c}</button>
            ))}
            <CountryDropdown options={countries} value={country} onChange={(next) => set('pais', next)} />
            <button className="pill" aria-pressed={tier === 'top50'} onClick={() => set('faixa', tier === 'top50' ? '' : 'top50')}>1 a 50</button>
            <button className="pill" aria-pressed={tier === 'ext'} onClick={() => set('faixa', tier === 'ext' ? '' : 'ext')}>51 a 100</button>
          </div>
          {(q || cont || country || tier) && (
            <button className="smallcaps mx-auto text-ink-2 hover:text-wine" onClick={() => setParams({}, { replace: true })}>Limpar filtros ×</button>
          )}
        </div>

        <div className="mt-10">
          <WorldMap items={list} />
        </div>

        <Ornament className="my-16" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          {[['Os cinquenta', top], ['Do 51º ao 100º', ext]].map(([title, items]) => (
            <section key={title}>
              <h2 className="display border-b-[3px] border-double border-ink pb-3 text-center text-3xl italic">{title}</h2>
              {items.length ? (
                <div className="mt-2 divide-y divide-rule/60">
                  {items.map((r) => <MenuItem key={r.slug} r={r} />)}
                </div>
              ) : (
                <p className="py-8 text-center italic text-muted">Nenhum restaurante nessa faixa.</p>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
