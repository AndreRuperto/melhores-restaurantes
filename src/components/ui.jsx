import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { flagUrl } from '../data/restaurants'
import BrandMark from './BrandMark'

export const SITE = 'A Carta'

export function Flag({ code, className = '' }) {
  return <img src={flagUrl(code)} alt="" className={`flag ${className}`} />
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
export const roman = (n) => ROMAN[n - 1]

export function Logo() {
  return (
    <Link to="/" className="flex flex-none items-center gap-1.5 whitespace-nowrap text-ink sm:gap-2" aria-label="A Carta — início">
      <BrandMark className="text-[19px] text-wine sm:text-[25px]" />
      <span className="display text-2xl italic text-wine">A Carta</span>
      <span className="smallcaps hidden text-muted sm:inline">· 2026</span>
    </Link>
  )
}


function getTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch {}
  }
  const dark = theme === 'dark'
  return (
    <button
      onClick={flip}
      className="flex size-8 flex-none items-center justify-center border border-rule text-ink-2 transition-colors hover:border-ink-2 hover:text-wine"
      aria-label={dark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'}
      title={dark ? 'Tema claro' : 'Tema escuro'}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  )
}

export function Header({ sections = false, back = false }) {
  const link = 'smallcaps whitespace-nowrap !tracking-[0.08em] sm:!tracking-[0.28em] text-ink-2 hover:text-wine transition-colors'
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8">
        <Logo />
        <div className="flex min-w-0 items-center gap-3 sm:gap-7">
        {back ? (
          <Link
            to="/restaurantes"
            className={link}
            onClick={(e) => {
              if (window.history.state?.idx > 0) {
                e.preventDefault()
                window.history.back()
              }
            }}
          >
            ← Voltar
          </Link>
        ) : (
          <nav className="flex items-center gap-3 sm:gap-7">
            {sections && (
              <>
                <a href="#mapa" className={`${link} hidden lg:inline`}>Mapa</a>
                <a href="#continentes" className={`${link} hidden lg:inline`}>Continentes</a>
                <a href="#brasil" className={`${link} hidden lg:inline`}>Brasil</a>
                <a href="#paises" className={`${link} hidden lg:inline`}>Países</a>
                <a href="#carta" className={`${link} hidden lg:inline`}>A lista</a>
                <span className="hidden h-4 w-px bg-rule lg:block" />
              </>
            )}
            {!sections && <NavLink to="/" end className={({ isActive }) => `${link} hidden sm:inline ${isActive ? '!text-wine' : ''}`}>Início</NavLink>}
            <NavLink to="/restaurantes" className={({ isActive }) => `${link} ${isActive ? '!text-wine' : ''}`}>Restaurantes</NavLink>
            <NavLink to="/como-funciona" className={({ isActive }) => `${link} ${isActive ? '!text-wine' : ''}`}>Como funciona</NavLink>
          </nav>
        )}
        <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-wine ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-rule" />
      <BrandMark className="text-[22px]" />
      <span className="h-px w-16 bg-rule" />
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="rule-double" />
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-wine">
            <BrandMark className="text-[30px]" />
            <span className="display text-3xl italic">A Carta</span>
          </div>
          <p className="max-w-md text-sm text-ink-2">
            Os 100 melhores restaurantes do mundo em 2026, segundo{' '}
            <a className="link-u text-ink" href="https://www.theworlds50best.com/" target="_blank" rel="noreferrer">The 50 Best Restaurants</a>. Lista reproduzida via{' '}
            <a className="link-u text-ink" href="https://www.finedininglovers.com/explore/articles/50-best-restaurants-2026-full-list" target="_blank" rel="noreferrer">Fine Dining Lovers</a>.
          </p>
          <div className="smallcaps mt-2 flex flex-wrap justify-center gap-6 text-ink-2">
            <Link to="/restaurantes" className="hover:text-wine">Restaurantes</Link>
            <Link to="/como-funciona" className="hover:text-wine">Como funciona</Link>
            <a href="https://github.com/andreruperto" target="_blank" rel="noreferrer" className="hover:text-wine">GitHub</a>
            <a href="https://www.linkedin.com/in/andrerup/" target="_blank" rel="noreferrer" className="hover:text-wine">LinkedIn</a>
          </div>
          <p className="mt-4 text-xs italic text-muted">Um projeto de André Ruperto · © 2026</p>
        </div>
      </div>
    </footer>
  )
}

// Cabeçalho de seção centralizado, estilo capítulo de cardápio
export function Chapter({ n, kicker, children, sub, id }) {
  return (
    <div id={id} className="mb-12 text-center">
      <div className="smallcaps text-wine">{n ? `${roman(n)} · ` : ''}{kicker}</div>
      <h2 className="display mx-auto mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">{children}</h2>
      {sub && <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-2">{sub}</p>}
    </div>
  )
}

export function Em({ children }) {
  return <em className="italic text-wine">{children}</em>
}

export function Note({ children }) {
  return <span className="text-[13px] italic text-wine">{children}</span>
}

// marcações discretas, como as notas de rodapé de um menu
export function Tags({ r, sep = ' · ' }) {
  const t = []
  if (r.rank === 1) t.push('Nº 1 do mundo')
  if (r.isNew) t.push('estreante')
  if (r.returning) t.push('de volta à lista')
  if (r.prev) t.push(`subiu ${r.prev - r.rank} posições`)
  if (!t.length) return null
  return <Note>{t.join(sep)}</Note>
}

export function Search({ value, onChange, placeholder }) {
  return (
    <label className="relative block">
      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 21l-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" /></svg>
      </span>
      <input className="field" placeholder={placeholder} value={value} onChange={onChange} />
    </label>
  )
}
