// Seções do perfil de um restaurante: história, cozinha, chef, pratos, prêmios, galeria e informações práticas.
// Cada seção só aparece se o dado existir no JSON do perfil.

// Miniaturas do Wikimedia vêm como .../1920px-Arquivo.jpg; para cards e galeria basta 960px.
// (960 e 1920 estão entre os tamanhos padrão que o Wikimedia já tem prontos.)
export const sized = (src, w) => (/\/\d+px-[^/]+$/.test(src) ? src.replace(/\/\d+px-([^/]+)$/, `/${w}px-$1`) : src)

const host = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

// quando a legenda não aparece (cards de prato), o crédito avisa que a imagem é ilustrativa
export function Credit({ photo, className = '', flag = false }) {
  if (!photo) return null
  return (
    <span className={`text-[11px] italic text-muted ${className}`}>
      {flag && photo.illustrative && <>Imagem ilustrativa · </>}
      Foto:{' '}
      <a href={photo.page} target="_blank" rel="noreferrer" className="link-u hover:text-ink-2">
        {photo.author || 'autor desconhecido'}
      </a>
      {photo.license && <> · {photo.license}</>}
    </span>
  )
}

export function Photo({ photo, className = '', ratio = 'aspect-[4/3]', caption = true, eager = false }) {
  if (!photo?.src) return null
  return (
    <figure className={className}>
      <div className={`${ratio} overflow-hidden border border-rule bg-paper-2`}>
        <img
          src={sized(photo.src, 960)}
          alt={photo.caption || ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="photo h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 flex flex-col gap-0.5">
          {photo.caption && <span className="text-sm italic text-ink-2">{photo.caption}</span>}
          <Credit photo={photo} />
        </figcaption>
      )}
    </figure>
  )
}

// cabeçalho de seção no mesmo tom das outras: rótulo em versalete e título em display
export function Kicker({ kicker, title, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className="smallcaps text-wine">{kicker}</div>
      <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">{title}</h2>
    </div>
  )
}

function Paragraphs({ items }) {
  return (
    <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-2">
      {items.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  )
}

export function Story({ p }) {
  const hasHistory = p.history?.length > 0
  const hasCuisine = p.cuisine?.paragraphs?.length > 0
  if (!hasHistory && !hasCuisine) return null
  return (
    <section className="grid gap-14 pt-20 md:grid-cols-2 md:gap-16">
      {hasHistory && (
        <div>
          <Kicker kicker="História" title="De onde veio" />
          {(p.founded || p.founders?.length > 0) && (
            <p className="mt-4 text-sm italic text-muted">
              {p.founded && <>Aberto em <span className="lnum">{p.founded}</span></>}
              {p.founded && p.founders?.length > 0 && ' · '}
              {p.founders?.length > 0 && <>por {p.founders.join(' e ')}</>}
            </p>
          )}
          <Paragraphs items={p.history} />
        </div>
      )}
      {hasCuisine && (
        <div>
          <Kicker kicker="A cozinha" title="O que se come" />
          {p.cuisine.style && <p className="mt-4 text-sm italic text-muted">{p.cuisine.style}</p>}
          <Paragraphs items={p.cuisine.paragraphs} />
        </div>
      )}
    </section>
  )
}

export function Chef({ p }) {
  if (!p.chef?.name) return null
  return (
    <section className="pt-20">
      <div className="mx-auto max-w-3xl border-y border-ink py-10 text-center">
        <div className="smallcaps text-wine">Quem cozinha</div>
        <div className="display mt-4 text-4xl italic sm:text-5xl">{p.chef.name}</div>
        {p.chef.bio && <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-2">{p.chef.bio}</p>}
      </div>
    </section>
  )
}

export function Dishes({ p }) {
  if (!p.dishes?.length) return null
  return (
    <section className="pt-20">
      <Kicker kicker="Pratos" title="O que pedir" center />
      <div className={`mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 ${p.dishes.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {p.dishes.map((d) => (
          <article key={d.name} className="flex flex-col">
            {d.photo?.src ? (
              <Photo photo={d.photo} caption={false} />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center border border-rule bg-paper-2 text-wine" aria-hidden="true">
                <span className="display text-5xl">❦</span>
              </div>
            )}
            <h3 className="display mt-4 text-2xl font-semibold leading-tight">{d.name}</h3>
            {d.desc && <p className="mt-1.5 leading-relaxed text-ink-2">{d.desc}</p>}
            {d.photo?.src && <Credit photo={d.photo} className="mt-2" flag />}
          </article>
        ))}
      </div>
    </section>
  )
}

export function Awards({ p }) {
  if (!p.awards?.length) return null
  const list = [...p.awards].sort((a, b) => (b.year || 0) - (a.year || 0))
  return (
    <section className="pt-20">
      <Kicker kicker="Prêmios" title="Na parede" center />
      <ol className="mx-auto mt-10 max-w-3xl divide-y divide-rule/60 border-y border-rule">
        {list.map((a, i) => (
          <li key={i} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-3.5">
            <span className="display text-right text-2xl italic text-wine lnum">{a.year || '—'}</span>
            <span className="text-[17px] text-ink">{a.title}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Gallery({ p }) {
  const photos = (p.gallery || []).filter((g) => g?.src)
  if (!photos.length) return null
  return (
    <section className="pt-20">
      <Kicker kicker="Em volta" title="Imagens" center />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {photos.map((g, i) => (
          <Photo key={g.src} photo={g} ratio={photos.length % 2 && i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'} className={photos.length % 2 && i === 0 ? 'sm:col-span-2' : ''} />
        ))}
      </div>
    </section>
  )
}

export function Practical({ p }) {
  const x = p.practical || {}
  const rows = [
    ['Preço', x.price],
    ['Reserva', x.reservation],
    ['Endereço', x.address],
  ].filter(([, v]) => v)
  if (!rows.length && !x.website) return null
  return (
    <section className="pt-20">
      <Kicker kicker="Na prática" title="Antes de ir" center />
      <dl className="box mx-auto mt-10 max-w-3xl divide-y divide-rule px-6 sm:px-10">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <dt className="smallcaps pt-1 text-wine">{k}</dt>
            <dd className="leading-relaxed text-ink-2">{v}</dd>
          </div>
        ))}
        {x.website && (
          <div className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <dt className="smallcaps pt-1 text-wine">Site</dt>
            <dd>
              <a href={x.website} target="_blank" rel="noreferrer" className="link-u text-ink">{host(x.website)} ↗</a>
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}

export function Sources({ p }) {
  if (!p.sources?.length) return null
  return (
    <section className="mx-auto mt-16 max-w-3xl text-center">
      <div className="smallcaps text-muted">Fontes</div>
      <p className="mt-3 text-[13px] italic leading-relaxed text-muted">
        {p.sources.map((s, i) => (
          <span key={s}>
            {i > 0 && ' · '}
            <a href={s} target="_blank" rel="noreferrer" className="link-u hover:text-ink-2">{host(s)}</a>
          </span>
        ))}
      </p>
    </section>
  )
}
