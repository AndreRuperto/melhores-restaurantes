import { Header, Footer, Ornament, roman } from '../components/ui'

const STEPS = [
  ['Mais de 1.100 jurados', 'O ranking sai dos votos de mais de 1.100 especialistas internacionais em restaurantes.'],
  ['Só vale o que foi comido', 'Cada jurado só pode votar em restaurantes onde comeu nos 18 meses anteriores à votação.'],
  ['Ninguém se inscreve', 'Os restaurantes não podem se candidatar nem pedir para entrar na lista. A indicação vem só dos votos.'],
  ['Campeão sai da disputa', 'Quem já foi nº 1 entra para o grupo “Best of the Best” e não concorre mais. Foi o caso do Maido, de Lima, campeão de 2025.'],
]

const TIMELINE = [
  ['21 de outubro', 'Divulgação da lista estendida, do 51º ao 100º lugar.'],
  ['4 de novembro', 'Cerimônia no Teatro Municipal de Lima, no Peru, com o anúncio do top 50. O Asador Etxebarri, da Espanha, foi eleito o melhor restaurante do mundo.'],
]

export default function HowItWorks() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 sm:px-8 pt-16">
        <div className="text-center">
          <div className="smallcaps text-wine">Como funciona</div>
          <h1 className="display mt-4 text-6xl leading-none sm:text-7xl">Como a lista <em className="italic text-wine">é feita</em></h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">
            O The 50 Best Restaurants (antes chamado The World’s 50 Best Restaurants) publica todo ano um ranking dos melhores restaurantes do mundo. Em 2026, a cerimônia aconteceu em Lima, depois de ter sido anunciada para Abu Dhabi.
          </p>
        </div>

        <Ornament className="my-14" />

        <ol className="space-y-10">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="display text-4xl italic text-wine">{roman(i + 1)}</span>
              <div>
                <h2 className="display text-3xl font-semibold">{t}</h2>
                <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="display mt-20 border-b-[3px] border-double border-ink pb-3 text-center text-4xl italic">Calendário de 2026</h2>
        <dl className="divide-y divide-rule">
          {TIMELINE.map(([d, t]) => (
            <div key={d} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="smallcaps pt-1 text-wine">{d}</dt>
              <dd className="leading-relaxed text-ink-2">{t}</dd>
            </div>
          ))}
        </dl>

        <h2 className="display mt-20 border-b-[3px] border-double border-ink pb-3 text-center text-4xl italic">Sobre este site</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-ink-2">
          <p>
            As posições vêm da lista oficial do The 50 Best Restaurants, reproduzida pela{' '}
            <a className="link-u text-ink" href="https://www.finedininglovers.com/explore/articles/50-best-restaurants-2026-full-list" target="_blank" rel="noreferrer">Fine Dining Lovers</a>.
            As marcações de estreante e de volta à lista vêm do anúncio da lista estendida.
          </p>
          <p>
            No mapa, o ponto marca o centro da cidade, não o endereço exato do restaurante. Os continentes seguem a divisão geográfica comum: o México entra na América do Norte e Dubai, na Ásia.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
