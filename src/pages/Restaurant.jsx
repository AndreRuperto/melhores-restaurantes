import ResponsiveImage from '../components/ResponsiveImage'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { restaurants, bySlug } from '../data/restaurants'
import { Header, Footer, Flag, Ornament, Tags, SITE } from '../components/ui'
import WorldMap from '../components/LazyWorldMap'
import { MenuItem } from '../components/RankingTable'
import NotFound from './NotFound'
import { useProfile } from '../data/profiles'
import { Photo, Credit, Story, Chef, Dishes, Awards, Gallery, Facade, Practical, Sources, PhotoCredits } from '../components/Profile'

function Section({ kicker, title, children }) {
  return (
    <section className="pt-20">
      <div className="text-center">
        <div className="smallcaps text-wine">{kicker}</div>
        <h2 className="display mt-3 text-4xl sm:text-5xl">{title}</h2>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function Restaurant() {
  const { slug } = useParams()
  const r = bySlug[slug]
  const profile = useProfile(slug) // undefined enquanto carrega, null se não houver

  useEffect(() => {
    window.scrollTo(0, 0)
    if (r) document.title = `${r.name} · ${r.rank}º · ${SITE}`
    return () => { document.title = `${SITE} · Os 100 melhores restaurantes do mundo em 2026` }
  }, [slug, r])

  if (!r) return <NotFound />

  const sameCont = restaurants.filter((x) => x.continent === r.continent)
  const sameCountry = restaurants.filter((x) => x.code === r.code)
  const sameCity = restaurants.filter((x) => x.city === r.city && x.code === r.code)
  const posCont = sameCont.indexOf(r) + 1
  const posCountry = sameCountry.indexOf(r) + 1
  const posCity = sameCity.indexOf(r) + 1

  const neighbors = restaurants.filter((x) => Math.abs(x.rank - r.rank) <= 2)
  const prev = restaurants[r.rank - 2]
  const next = restaurants[r.rank]
  const otherCity = sameCity.filter((x) => x !== r)
  const otherCountry = sameCountry.filter((x) => x.city !== r.city)

  const stats = [
    ['No mundo', r.rank, 100],
    [`Na ${r.continent}`, posCont, sameCont.length],
    ['No país', posCountry, sameCountry.length],
    ['Na cidade', posCity, sameCity.length],
  ]

  const notes = []
  if (r.award) notes.push(r.award)
  if (r.isNew) notes.push('Primeira vez no ranking')
  if (r.returning) notes.push('Volta ao ranking depois de ficar de fora')
  if (r.prev) notes.push(`Subiu de ${r.prev}º, em 2025, para ${r.rank}º`)
  if (posCountry === 1 && sameCountry.length > 1) notes.push('O melhor colocado do país')
  if (posCont === 1) notes.push(`O melhor colocado da ${r.continent}`)

  return (
    <>
      <Header back />
      <main id="conteudo" tabIndex={-1} className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* capa do prato */}
        <section className="pt-16 text-center sm:pt-20">
          <div className="fade smallcaps flex items-center justify-center gap-2 text-ink-2">
            <Flag code={r.code} /> {r.city} · {r.country}
          </div>
          <div className="fade mx-auto mt-8 max-w-3xl border-y border-ink py-10">
            <div className={`display text-8xl italic leading-none lnum sm:text-9xl ${r.tier === 'top50' ? 'text-wine' : 'text-muted'}`}>{r.rank}º</div>
            <h1 className="display mt-4 text-5xl font-semibold leading-[0.95] sm:text-7xl">{r.name}</h1>
            <div className="mt-5 min-h-5"><Tags r={r} /></div>
          </div>
          {profile?.lede && (
            <p className="display mx-auto mt-8 max-w-2xl text-2xl leading-snug text-ink sm:text-[28px]">{profile.lede}</p>
          )}
          <p className={`fade mx-auto max-w-xl leading-relaxed text-ink-2 ${profile?.lede ? 'mt-4 text-base italic' : 'mt-8 text-lg'}`}>
            {r.rank === 1 ? (
              <>Eleito o <em className="italic text-wine">melhor restaurante do mundo</em> em 2026 pelo The 50 Best Restaurants.</>
            ) : (
              <>
                {r.rank}º lugar no The 50 Best Restaurants 2026,{' '}
                {r.tier === 'top50' ? <>entre os <em className="italic text-wine">cinquenta melhores</em></> : <>na lista estendida, <em className="italic text-wine">do 51º ao 100º</em></>}.
              </>
            )}
          </p>
        </section>

        {profile?.hero?.src && (
          <figure className="fade mt-14 sm:-mx-8">
            <div className="aspect-[4/3] overflow-hidden border border-rule bg-paper-2 sm:aspect-[16/8]">
              <ResponsiveImage eager sizes="(min-width: 1024px) 1024px, 100vw" src={profile.hero.src} alt={profile.hero.alt || profile.hero.caption || r.name} className="photo h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 px-0 sm:px-8">
              <span className="flex flex-col gap-1">
                {profile.facade?.src === profile.hero.src && (
                  <span className="smallcaps !tracking-[0.14em] text-wine">Vista externa verificada</span>
                )}
                {profile.hero.caption && <span className="text-sm italic text-ink-2">{profile.hero.caption}</span>}
              </span>
              <Credit photo={profile.hero} flag />
            </figcaption>
          </figure>
        )}

        <Section kicker="Na lista" title="Onde ele aparece">
          <div className="grid border-t border-l border-rule grid-cols-2 lg:grid-cols-4">
            {stats.map(([label, pos, of]) => (
              <div key={label} className="border-r border-b border-rule p-6 text-center">
                <div className="smallcaps truncate text-muted">{label}</div>
                <div className="display mt-3 text-6xl italic text-wine lnum">{pos}º</div>
                <div className="mt-1 text-sm italic text-ink-2">de {of}</div>
              </div>
            ))}
          </div>
          {notes.length > 0 && (
            <div className="mx-auto mt-10 max-w-2xl text-center">
              <div className="smallcaps text-muted">Notas</div>
              <ul className="mt-4 space-y-2">
                {notes.map((n) => (
                  <li key={n} className="display text-2xl italic">
                    <span className="mr-2 text-wine">✦</span>{n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>

        {profile && (
          <>
            <Story p={profile} />
            <Chef p={profile} />
            <Dishes p={profile} />
            <Awards p={profile} />
            <Gallery p={profile} />
            <Facade p={profile} />
            <Practical p={profile} />
          </>
        )}

        <Section kicker="Onde fica" title={`${r.city}, ${r.country}`}>
          <WorldMap items={restaurants} focus={r} className="aspect-[4/3] sm:aspect-[960/470]" />
          <p className="mt-3 text-center text-sm italic text-muted">O ponto marca o centro da cidade, não o endereço exato.</p>
        </Section>

        <Section kicker="Na mesma página da carta" title="Vizinhos de posição">
          <div className="box mx-auto max-w-3xl divide-y divide-rule/60 px-5 sm:px-8">
            {neighbors.map((x) => (
              <div key={x.slug} className={x === r ? 'bg-paper-2/80 -mx-5 px-5 sm:-mx-8 sm:px-8' : ''}>
                <MenuItem r={x} />
              </div>
            ))}
          </div>
        </Section>

        {(otherCity.length > 0 || otherCountry.length > 0) && (
          <Section kicker="Para continuar" title="Mais por perto">
            <div className="grid gap-10 md:grid-cols-2">
              {otherCity.length > 0 && (
                <div>
                  <h3 className="display border-b-[3px] border-double border-ink pb-2 text-center text-2xl italic">Também em {r.city}</h3>
                  <div className="divide-y divide-rule/60">{otherCity.map((x) => <MenuItem key={x.slug} r={x} compact />)}</div>
                </div>
              )}
              {otherCountry.length > 0 && (
                <div>
                  <h3 className="display border-b-[3px] border-double border-ink pb-2 text-center text-2xl italic">Outras cidades do país</h3>
                  <div className="divide-y divide-rule/60">
                    {otherCountry.map((x) => <MenuItem key={x.slug} r={{ ...x, country: x.city }} compact />)}
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {profile && <Sources p={profile} />}
        {profile && <PhotoCredits p={profile} />}

        <Ornament className="mt-20" />

        <nav className="mt-10 grid grid-cols-2 gap-4">
          {prev ? (
            <Link to={`/restaurante/${prev.slug}`} className="group">
              <div className="smallcaps text-muted">← {prev.rank}º lugar</div>
              <div className="display mt-1 text-2xl font-semibold group-hover:text-wine sm:text-3xl">{prev.name}</div>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/restaurante/${next.slug}`} className="group text-right">
              <div className="smallcaps text-muted">{next.rank}º lugar →</div>
              <div className="display mt-1 text-2xl font-semibold group-hover:text-wine sm:text-3xl">{next.name}</div>
            </Link>
          )}
        </nav>
      </main>
      <Footer />
    </>
  )
}
