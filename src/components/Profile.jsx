// Seções do perfil de um restaurante: história, cozinha, chef, pratos, prêmios, galeria e informações práticas.
// Cada seção só aparece se o dado existir no JSON do perfil.

// Miniaturas do Wikimedia vêm como .../1920px-Arquivo.jpg; para cards e galeria basta 960px.
// (960 e 1920 estão entre os tamanhos padrão que o Wikimedia já tem prontos.)
export const sized = (src, w) => (/\/\d+px-[^/]+$/.test(src) ? src.replace(/\/\d+px-([^/]+)$/, `/${w}px-$1`) : src)

const host = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

const licenseUrl = (name) => {
  if (!name) return null
  if (name.startsWith('CC0')) return 'https://creativecommons.org/publicdomain/zero/1.0/'
  const match = name.match(/^CC (BY(?:-SA)?) (\d\.\d)$/)
  return match ? `https://creativecommons.org/licenses/${match[1].toLowerCase()}/${match[2]}/` : null
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
      {photo.license && <> · {licenseUrl(photo.license) ? (
        <a href={licenseUrl(photo.license)} target="_blank" rel="noreferrer" className="link-u hover:text-ink-2">{photo.license}</a>
      ) : photo.license}</>}
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
          alt={photo.alt || photo.caption || ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="photo h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 flex flex-col gap-0.5">
          {photo.caption && <span className="text-sm italic text-ink-2">{photo.caption}</span>}
          <Credit photo={photo} flag />
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
  const photos = (p.gallery || []).filter((g, i) => g?.src && i !== p.photoReference?.featuredGalleryIndex)
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

// Fotos publicadas diretamente apenas com crédito e licença documentados.
// Um registro de sede histórica/outra unidade pode ser destacado, desde que identificado
// como tal, e é retirado da galeria para evitar duplicação visual.
export function Facade({ p }) {
  const image = p.facade
  const reference = p.photoReference
  const preview = Number.isInteger(reference?.featuredGalleryIndex)
    ? p.gallery?.[reference.featuredGalleryIndex]
    : null
  if (image?.src && image.src === p.hero?.src) return null
  if (!image?.src && !preview?.src && !reference?.url) return null

  const externalFacade = reference?.kind === 'fachada'
  const photo = image?.src ? image : preview
  const title = image?.src ? 'A fachada' : preview?.src
    ? (reference?.previewTitle || 'O espaço')
    : externalFacade ? 'A fachada' : 'O espaço'

  return (
    <section className="pt-20" id="fachada">
      <Kicker kicker={preview?.src ? (reference?.previewKicker || "O lugar") : "O lugar"} title={title} center />
      {photo?.src ? (
        <div className="mx-auto mt-9 max-w-3xl">
          <Photo photo={photo} ratio="aspect-[4/3] sm:aspect-[16/10]" />
          {preview?.src && reference?.previewContext && (
            <p className="mt-4 border-l-2 border-wine pl-4 text-sm leading-relaxed text-ink-2">
              {reference.previewContext}
            </p>
          )}
        </div>
      ) : null}
      {reference?.url && (
        <div className="box mx-auto mt-6 flex max-w-3xl flex-col items-start gap-3 px-6 py-6 sm:px-10">
          <div className="smallcaps text-wine">{externalFacade ? 'Registro externo da fachada' : 'Imagens do espaço na fonte'}</div>
          {reference.note && <p className="text-base leading-relaxed text-ink-2">{reference.note}</p>}
          <a href={reference.url} target="_blank" rel="noopener noreferrer"
            className="link-u inline-flex items-center gap-1 font-medium text-ink hover:text-wine focus-visible:outline-2 focus-visible:outline-wine">
            {externalFacade ? 'Ver fachada na fonte original ↗' : 'Ver fotos na fonte original ↗'}
          </a>
          {(reference.additionalSources || []).length > 0 && (
            <div className="w-full border-t border-rule pt-4">
              <p className="mb-2 text-sm font-medium text-ink">Outros registros fotográficos do próprio restaurante</p>
              <ul className="space-y-2">
                {reference.additionalSources.map((source) => (
                  <li key={source.url} className="text-sm leading-relaxed text-ink-2">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="link-u font-medium text-ink hover:text-wine">{source.publisher} ↗</a>
                    {source.note ? <> — {source.note}</> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs italic leading-relaxed text-muted">
            Publicação: {reference.publisher}. Imagens de terceiros não são republicadas apenas com base no crédito da fonte.
          </p>
        </div>
      )}
    </section>
  )
}

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
// data ISO (AAAA-MM-DD) por extenso, sem passar por Date para não deslocar o dia pelo fuso
const longDate = (iso) => {
  const [y, m, d] = (iso || '').split('-').map(Number)
  return y && m && d ? `${d} de ${MONTHS[m - 1]} de ${y}` : null
}

// Rótulo do link conforme o canal: quem só reserva por telefone não ganha botão de "reservar online".
const reservationLinkLabel = (mode) => (mode === 'phone' ? 'Ver instruções de reserva ↗' : 'Abrir página de reservas ↗')

// minmax(0, 1fr) e overflow-wrap: anywhere impedem que e-mails e endereços longos,
// sem espaços, alarguem a coluna além da tela em celulares.
const ROW = 'grid grid-cols-[minmax(0,1fr)] gap-1 py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6'

function Row({ label, children }) {
  return (
    <div className={ROW}>
      <dt className="smallcaps pt-1 text-wine">{label}</dt>
      <dd className="min-w-0 [overflow-wrap:anywhere]">{children}</dd>
    </div>
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
  const reviewed = longDate(p.lastReviewedAt)
  return (
    <section className="pt-20">
      <Kicker kicker="Na prática" title="Antes de ir" center />
      <dl className="box mx-auto mt-10 max-w-3xl divide-y divide-rule px-6 sm:px-10">
        {rows.map(([k, v]) => (
          <div key={k} className={ROW}>
            <dt className="smallcaps pt-1 text-wine">{k}</dt>
            <dd className="min-w-0 leading-relaxed text-ink-2 [overflow-wrap:anywhere]">{v}</dd>
          </div>
        ))}
        {x.phone && (
          <Row label="Telefone">
            <a href={`tel:${x.phone.replace(/[^\d+]/g, '')}`} className="link-u text-ink lnum">{x.phone}</a>
          </Row>
        )}
        {x.email && (
          <Row label="E-mail">
            <a href={`mailto:${x.email}`} className="link-u text-ink">{x.email}</a>
          </Row>
        )}
        {x.reservationUrl && (
          <Row label="Reservar">
            <a href={x.reservationUrl} target="_blank" rel="noreferrer" className="link-u text-ink">{reservationLinkLabel(x.reservationMode)}</a>
          </Row>
        )}
        {x.website && (
          <Row label="Site">
            <a href={x.website} target="_blank" rel="noreferrer" className="link-u text-ink">{host(x.website)} ↗</a>
          </Row>
        )}
      </dl>
      {reviewed && (
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm italic text-muted">
          Informações conferidas nas fontes oficiais em {reviewed}. Preços, horários e regras de reserva podem mudar; confirme com o restaurante.
        </p>
      )}
    </section>
  )
}

// Atribuições detalhadas ao fim do perfil, inclusive para referências externas.
// Complementa os créditos junto às fotos e permite conferir a fonte e a licença.
export function PhotoCredits({ p }) {
  const photos = [p.hero, p.facade, ...(p.gallery || []), ...(p.dishes || []).map(d => d.photo)]
    .filter(photo => photo?.src && photo?.page)
  const unique = [...new Map(photos.map(photo => [photo.page, photo])).values()]
  const reference = p.photoReference
  if (!unique.length && !reference?.url) return null
  return (
    <section className="mx-auto mt-16 max-w-3xl border-t border-rule pt-8" id="creditos-fotograficos">
      <div className="smallcaps text-muted">Créditos fotográficos</div>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        Origem das imagens desta página. Clique no arquivo original para conferir autoria e licença;
        fotografias de contexto não representam necessariamente a fachada ou um prato servido no restaurante.
      </p>
      <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm text-ink-2 sm:grid-cols-2">
        {unique.map(photo => (
          <li key={photo.page} className="border-l border-rule pl-3">
            <a className="link-u font-medium text-ink hover:text-wine" href={photo.page} target="_blank" rel="noopener noreferrer">
              {photo.author || host(photo.page)}
            </a>
            <span className="text-muted"> · {host(photo.page)}</span>
            {photo.license && <span> · {licenseUrl(photo.license) ? (
              <a href={licenseUrl(photo.license)} className="link-u" target="_blank" rel="noopener noreferrer">{photo.license}</a>
            ) : photo.license}</span>}
            {photo.illustrative && <span className="italic text-muted"> · ilustrativa</span>}
          </li>
        ))}
        {reference?.url && (
          <li className="border-l border-rule pl-3">
            <a href={reference.url} className="link-u font-medium text-ink hover:text-wine" target="_blank" rel="noopener noreferrer">
              {reference.publisher || host(reference.url)}
            </a>
            <span className="text-muted"> · {host(reference.url)} · referência externa (sem republicação)</span>
          </li>
        )}
        {(reference?.additionalSources || []).map(source => (
          <li key={source.url} className="border-l border-rule pl-3">
            <a href={source.url} className="link-u font-medium text-ink hover:text-wine" target="_blank" rel="noopener noreferrer">{source.publisher}</a>
            <span className="text-muted"> · {host(source.url)} · referência fotográfica externa</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Sources({ p }) {
  if (!p.sources?.length) return null
  // agrupa por site: "the50.com 2 3" em vez de repetir o nome; cada número é o link de outra página do mesmo site
  const groups = new Map()
  p.sources.forEach((s) => groups.set(host(s), [...(groups.get(host(s)) || []), s]))
  return (
    <section className="mx-auto mt-16 max-w-3xl text-center">
      <div className="smallcaps text-muted">Fontes</div>
      <p className="mt-3 text-[13px] italic leading-relaxed text-muted">
        {[...groups].map(([h, urls], i) => (
          <span key={h}>
            {i > 0 && ' · '}
            <a href={urls[0]} target="_blank" rel="noreferrer" className="link-u hover:text-ink-2">{h}</a>
            {urls.slice(1).map((u, j) => (
              <a key={u} href={u} target="_blank" rel="noreferrer" className="ml-1 not-italic text-[10px] align-super hover:text-ink-2" aria-label={`${h}, página ${j + 2}`}>{j + 2}</a>
            ))}
          </span>
        ))}
      </p>
    </section>
  )
}
