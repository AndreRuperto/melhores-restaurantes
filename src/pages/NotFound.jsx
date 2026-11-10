import { Link } from 'react-router-dom'
import { Header, Footer } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="mx-auto max-w-3xl px-4 sm:px-8 py-32 text-center">
        <div className="smallcaps text-wine">404</div>
        <h1 className="display mt-4 text-6xl">Esse prato <em className="italic text-wine">saiu do cardápio</em></h1>
        <p className="mt-5 text-lg italic text-ink-2">A página que você procurou não existe.</p>
        <Link to="/restaurantes" className="smallcaps mt-10 inline-block border-b border-ink pb-1 hover:border-wine hover:text-wine">
          Ver todos os restaurantes →
        </Link>
      </main>
      <Footer />
    </>
  )
}
