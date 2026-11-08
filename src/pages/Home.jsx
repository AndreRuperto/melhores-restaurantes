import { useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurants, CONTINENTS, COUNTRIES, countBy, bySlug } from '../data/restaurants'
import { Header, Footer, Chapter, Em, Flag, Ornament, Tags } from '../components/ui'
import WorldMap, { TIER_COLOR } from '../components/WorldMap'
import CountryDropdown from '../components/CountryDropdown'
import RankingTable from '../components/RankingTable'
import MenuOpening from '../components/MenuOpening'

const nCountries = new Set(restaurants.map((r) => r.code)).size
const nCities = new Set(restaurants.map((r) => r.city)).size
const joinPt = (a) => (a.length > 1 ? `${a.slice(0, -1).join(', ')} e ${a[a.length - 1]}` : a[0])
const codeOf = (country) => Object.entries(COUNTRIES).find(([, v]) => v.name === country)[0]

export default function Home() {
  const first = restaurants[0]
  const tuju = bySlug.tuju
  const [topCountry, topCountryN] = countBy(restaurants, 'country')[0]
  const [topCity, topCityN] = countBy(restaurants, 'city')[0]
  const topCityCode = restaurants.find((r) => r.city === topCity).code

  const specials = [
    { k: 'O melhor do mundo', title: first.name, sub: `${first.city}, ${first.country}`, code: first.code, val: 'Nº 1', to: `/restaurante/${first.slug}` },
    { k: 'A maior estreia', title: tuju.name, sub: `${tuju.city}, ${tuju.country}`, code: tuju.code, val: `${tuju.rank}º`, to: `/restaurante/${tuju.slug}` },
    { k: 'O país com mais mesas', title: topCountry, sub: `${topCountryN} restaurantes no top 100`, code: codeOf(topCountry), val: topCountryN, to: `/restaurantes?pais=${encodeURIComponent(topCountry)}` },
    { k: 'A cidade com mais mesas', title: topCity, sub: `${topCityN} restaurantes no top 100`, code: topCityCode, val: topCityN, to: `/restaurantes?q=${encodeURIComponent(topCity)}` },
  ]

  return (
    <>
      <MenuOpening />
      <Header sections />
      <main className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* CAPA */}
        <section className="pt-16 pb-6 text-center sm:pt-24">
          <div className="fade smallcaps text-ink-2">The 50 Best Restaurants · Lima, 4 de novembro de 2026</div>
          <div className="fade mx-auto mt-8 max-w-4xl border-y border-ink py-10 sm:py-14">
            <div className="smallcaps text-wine">Edição de 2026</div>
            <h1 className="display mt-5 text-[3.4rem] leading-[0.92] sm:text-8xl lg:text-[8.5rem]">
              Os cem <em className="italic text-wine">melhores</em>
              <br />
              restaurantes
              <br />
              <span className="italic">do mundo</span>
            </h1>
          </div>
          <p className="fade mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink-2">
            Mais de 1.100 especialistas votaram. O resultado saiu em Lima: cem restaurantes em {nCities} cidades de {nCountries} países. Veja onde eles ficam, quem domina a lista e como o Brasil se saiu.
          </p>
          <Ornament className="mt-12" />
        </section>

        {/* DESTAQUES DA CASA */}
        <section className="pt-10">
          <div className="smallcaps mb-6 text-center text-ink-2">Destaques da casa</div>
          <div className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-4">
            {specials.map((s, i) => (
              <Link key={i} to={s.to} className="group fade flex flex-col border-r border-b border-rule p-6 text-center transition-colors hover:bg-paper-2/70" style={{ animationDelay: `${i * 70}ms` }}>
                <span className="smallcaps text-muted">{s.k}</span>
                <span className="display mt-5 text-5xl italic text-wine lnum">{s.val}</span>
                <span className="display mt-4 text-3xl font-semibold leading-tight"><span className="link-u">{s.title}</span></span>
                <span className="mt-2 flex items-center justify-center gap-1.5 text-sm italic text-ink-2"><Flag code={s.code} /> {s.sub}</span>
              </Link>
            ))}
          </div>
        </section>

        <MapSection />
        <ContinentSection />
        <BrazilSection />
        <CountrySection />

        <section className="pt-28">
          <Chapter id="carta" n={5} kicker="A lista completa" sub="Do primeiro ao centésimo. Filtre por faixa, continente ou país e escolha um restaurante para ver a página dele.">
            A <Em>carta</Em> inteira
          </Chapter>
          <RankingTable />
        </section>

        <section className="pt-28">
          <div className="mx-auto max-w-3xl border-y border-ink py-12 text-center">
            <div className="smallcaps text-wine">Nota do editor</div>
            <p className="display mt-5 text-3xl leading-snug sm:text-4xl">
              “Ninguém se inscreve. <em className="italic text-wine">Os jurados vão até a mesa.</em>”
            </p>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-2">
              Os jurados só podem votar em restaurantes onde comeram nos últimos 18 meses. Quem já foi nº 1, como o Maido (campeão de 2025), sai da disputa.
            </p>
            <Link to="/como-funciona" className="smallcaps mt-7 inline-block border-b border-ink pb-1 hover:border-wine hover:text-wine">Como a lista é feita →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function MapSection() {
  const [cont, setCont] = useState('')
  const [country, setCountry] = useState('')
  const [tier, setTier] = useState('all')

  // Só mostra países presentes no continente escolhido; nomes em ordem alfabética.
  const countries = countBy(restaurants.filter((r) => !cont || r.continent === cont), 'country')
    .sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
    .map(([name, total]) => ({ name, total, code: codeOf(name) }))
  const items = restaurants.filter(
    (r) => (!cont || r.continent === cont) && (!country || r.country === country) && (tier === 'all' || r.tier === tier),
  )

  const changeContinent = (next) => {
    setCont(next)
    setCountry('') // não mantém um país incompatível ao trocar de continente
  }

  return (
    <section className="pt-28">
      <Chapter id="mapa" n={1} kicker="O mapa" sub="Cada ponto é um restaurante. Passe o cursor ou toque num ponto para ver o nome, e clique para abrir a página. Filtre por continente e país, use + e − ou arraste para explorar.">
        Cem mesas, <Em>{nCities} cidades</Em>
      </Chapter>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <button className="pill" aria-pressed={!cont && !country} onClick={() => changeContinent('')}>Todos</button>
        {CONTINENTS.map((c) => (
          <button key={c} className="pill" aria-pressed={cont === c} onClick={() => changeContinent(cont === c ? '' : c)}>{c}</button>
        ))}
      </div>
      <div className="relative z-30 mb-4 flex flex-wrap items-center justify-center gap-3">
        <span className="smallcaps text-ink-2">Filtrar por país</span>
        <CountryDropdown options={countries} value={country} onChange={setCountry} />
      </div>
      <p className="mb-4 text-center text-sm italic text-muted" role="status" aria-live="polite">
        {items.length} {items.length === 1 ? 'restaurante' : 'restaurantes'} no mapa
        {country ? ` · ${country}` : cont ? ` · ${cont}` : ''}
      </p>
      <WorldMap items={items} />
      <div className="mt-3 flex flex-wrap items-center justify-center gap-5 text-sm italic text-ink-2">
        {[['top50', '1 a 50'], ['ext', '51 a 100']].map(([k, l]) => (
          <button key={k} onClick={() => setTier(tier === k ? 'all' : k)} className={`flex items-center gap-2 ${tier !== 'all' && tier !== k ? 'opacity-40' : ''}`}>
            <span className="size-2.5 rounded-full" style={{ background: TIER_COLOR[k] }} /> {l}
          </button>
        ))}
      </div>
    </section>
  )
}

function ContinentSection() {
  const data = CONTINENTS.map((c) => {
    const list = restaurants.filter((r) => r.continent === c)
    return { c, list, top50: list.filter((r) => r.tier === 'top50').length, best: list[0] }
  })
  const eu = data.find((d) => d.c === 'Europa')
  const asia = data.find((d) => d.c === 'Ásia')
  const sa = data.find((d) => d.c === 'América do Sul')
  return (
    <section className="pt-28">
      <Chapter
        id="continentes"
        n={2}
        kicker="Continentes"
        sub={`A Europa tem ${eu.list.length} restaurantes no top 100, ${eu.top50} deles no top 50. A Ásia vem em seguida, com ${asia.list.length} e ${asia.top50}. A América do Sul aproveita melhor: ${sa.top50} dos seus ${sa.list.length} estão no top 50.`}
      >
        Europa na frente, <Em>Ásia logo atrás</Em>
      </Chapter>
      <div className="box divide-y divide-rule">
        <div className="hidden grid-cols-[1.4fr_0.6fr_0.6fr_1.6fr] gap-4 px-6 py-3 sm:grid">
          {['Continente', 'Top 100', 'Top 50', 'Melhor colocado'].map((h, i) => (
            <span key={h} className={`smallcaps text-muted ${i === 1 || i === 2 ? 'text-center' : ''} ${i === 3 ? 'text-right' : ''}`}>{h}</span>
          ))}
        </div>
        {data.map((d) => (
          <div key={d.c} className="grid grid-cols-2 items-baseline gap-x-4 gap-y-1 px-6 py-5 sm:grid-cols-[1.4fr_0.6fr_0.6fr_1.6fr]">
            <span className="display col-span-2 text-3xl sm:col-span-1">{d.c}</span>
            <span className="text-ink-2 sm:text-center"><span className="display text-3xl text-ink lnum">{d.list.length}</span><span className="text-sm italic sm:hidden"> no top 100</span></span>
            <span className="text-ink-2 sm:text-center"><span className="display text-3xl italic text-wine lnum">{d.top50}</span><span className="text-sm italic sm:hidden"> no top 50</span></span>
            <Link to={`/restaurante/${d.best.slug}`} className="group col-span-2 flex items-center gap-2 text-ink-2 sm:col-span-1 sm:justify-end">
              <Flag code={d.best.code} />
              <span className="display text-xl font-semibold text-ink group-hover:text-wine">{d.best.name}</span>
              <span className="italic text-wine">{d.best.rank}º</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function BrazilSection() {
  const br = restaurants.filter((r) => r.code === 'BR')
  return (
    <section className="pt-28">
      <Chapter
        id="brasil"
        n={3}
        kicker="Prato da casa"
        sub="O Brasil tem quatro restaurantes entre os 100 melhores do mundo, dois deles no top 50. Três ficam em São Paulo. O Tuju estreou direto em 16º e levou o prêmio de maior estreia do ano."
      >
        <span className="mr-3 inline-block -translate-y-1 align-middle"><Flag code="BR" className="!size-9" /></span>
        Brasil: <Em>quatro na lista, dois no top 50</Em>
      </Chapter>
      <div className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-4">
        {br.map((r) => (
          <Link key={r.slug} to={`/restaurante/${r.slug}`} className="group border-r border-b border-rule p-7 text-center transition-colors hover:bg-paper-2/70">
            <div className={`display text-7xl italic lnum ${r.tier === 'top50' ? 'text-wine' : 'text-muted'}`}>{r.rank}º</div>
            <div className="mx-auto my-4 h-px w-10 bg-rule" />
            <div className="display text-3xl font-semibold"><span className="link-u">{r.name}</span></div>
            <div className="mt-1 text-sm italic text-ink-2">{r.city}</div>
            <div className="mt-3 min-h-5"><Tags r={r} /></div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function CountrySection() {
  const rows = countBy(restaurants, 'country').map(([country, n]) => {
    const list = restaurants.filter((r) => r.country === country)
    return { country, n, code: list[0].code, top50: list.filter((r) => r.tier === 'top50').length }
  })
  const multi = rows.filter((r) => r.n >= 2)
  const singles = rows.filter((r) => r.n === 1)
  const top50Max = Math.max(...rows.map((r) => r.top50))
  const top50Leaders = rows.filter((r) => r.top50 === top50Max).map((r) => r.country)
  const half = Math.ceil(multi.length / 2)

  return (
    <section className="pt-28">
      <Chapter
        id="paises"
        n={4}
        kicker="Países"
        sub={`${nCountries} países aparecem no ranking. Contando só o top 50, quem lidera é ${joinPt(top50Leaders)}, com ${top50Max} restaurantes cada. Os pontos em vinho são do top 50, e os claros, do 51º ao 100º.`}
      >
        {rows[0].country} na frente, <Em>com {rows[0].n} restaurantes</Em>
      </Chapter>
      <div className="box px-5 py-6 sm:px-10">
        <div className="grid gap-x-14 lg:grid-cols-2">
          {[multi.slice(0, half), multi.slice(half)].map((col, i) => (
            <div key={i} className="divide-y divide-rule/60">
              {col.map((r) => (
                <Link key={r.country} to={`/restaurantes?pais=${encodeURIComponent(r.country)}`} className="group flex items-center gap-3 py-3">
                  <Flag code={r.code} />
                  <span className="display w-40 flex-none truncate text-xl font-semibold group-hover:text-wine">{r.country}</span>
                  <span className="flex flex-1 flex-wrap gap-1">
                    {Array.from({ length: r.n }).map((_, j) => (
                      <span key={j} className="size-2.5 rounded-full" style={{ background: j < r.top50 ? TIER_COLOR.top50 : 'var(--c-rule)' }} />
                    ))}
                  </span>
                  <span className="display text-2xl italic text-wine lnum">{r.n}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-6 border-t border-rule pt-5 text-center italic text-ink-2">
          Com um restaurante cada: {singles.map((r) => r.country).join(', ')}.
        </p>
      </div>
    </section>
  )
}

