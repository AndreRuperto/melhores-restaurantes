import { useEffect, useRef, useState } from 'react'
import { restaurants } from '../data/restaurants'
import BrandMark from './BrandMark'
import './menu-opening.css'

const STORAGE_KEY = 'a-carta-abertura-2026-v1'
const featured = [...restaurants].sort((a, b) => a.rank - b.rank).slice(0, 4)

function shouldShowOpening() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== 'seen'
  } catch {
    return true
  }
}

function rememberOpening() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, 'seen')
  } catch {
    // A apresentação também funciona com o armazenamento bloqueado.
  }
}

export default function MenuOpening() {
  const [phase, setPhase] = useState(() => (shouldShowOpening() ? 'closed' : 'done'))
  const skipRef = useRef(null)
  const active = phase !== 'done'

  useEffect(() => {
    if (!active) return undefined

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    skipRef.current?.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        rememberOpening()
        setPhase('done')
      }
      if (event.key === 'Tab') {
        event.preventDefault()
        skipRef.current?.focus({ preventScroll: true })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [active])

  useEffect(() => {
    const transitions = {
      closed: ['opening', 450],
      opening: ['leaving', 2000],
      leaving: ['done', 650],
    }
    const transition = transitions[phase]
    if (!transition) return undefined
    if (phase === 'leaving') rememberOpening()

    const timer = window.setTimeout(() => setPhase(transition[0]), transition[1])
    return () => window.clearTimeout(timer)
  }, [phase])

  if (!active) return null

  return (
    <div className={`menu-opening menu-opening--${phase}`} role="dialog" aria-modal="true" aria-label="Animação de abertura de A Carta">
      <div className="menu-opening__masthead" aria-hidden="true">
        <BrandMark className="menu-opening__masthead-mark" />
        <span>A C A R T A</span>
      </div>
      <button
        ref={skipRef}
        type="button"
        className="menu-opening__skip"
        onClick={() => {
          rememberOpening()
          setPhase('done')
        }}
      >
        Pular introdução <span aria-hidden="true">↗</span>
      </button>

      <div className="menu-opening__stage" aria-hidden="true">
        <div className="menu-opening__book">
          <div className="menu-opening__page menu-opening__right-page">
            <div className="menu-opening__page-frame">
              <div className="menu-opening__eyebrow">A seleção</div>
              <div className="menu-opening__list-title">100 mesas<br /><em>extraordinárias</em></div>
              <ol className="menu-opening__ranking">
                {featured.map((restaurant) => (
                  <li key={restaurant.slug} className="menu-opening__rank-row">
                    <span className="menu-opening__rank-number">{String(restaurant.rank).padStart(2, '0')}</span>
                    <span className="menu-opening__rank-details">
                      <span className="menu-opening__rank-name">{restaurant.name}</span>
                      <span className="menu-opening__rank-country">{restaurant.country}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="menu-opening__leaf">
            <div className="menu-opening__cover">
              <div className="menu-opening__cover-frame">
                <span className="menu-opening__cover-kicker">Uma experiência</span>
                <BrandMark className="menu-opening__cover-mark" />
                <span className="menu-opening__cover-rule" />
                <span className="menu-opening__cover-title">A Carta</span>
                <span className="menu-opening__cover-rule" />
                <span className="menu-opening__cover-copy">Os 100 melhores<br />restaurantes<br />do mundo</span>
                <span className="menu-opening__cover-year">2026</span>
              </div>
            </div>

            <div className="menu-opening__page menu-opening__inside-page">
              <div className="menu-opening__page-frame menu-opening__inside-frame">
                <span className="menu-opening__eyebrow">Edição 2026</span>
                <span className="menu-opening__inside-heading">Os cem<br /><em>melhores</em><br />restaurantes<br />do mundo</span>
                <span className="menu-opening__inside-rule" />
                <span className="menu-opening__inside-copy">Explore sabores, histórias<br />e lugares extraordinários.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="menu-opening__caption" aria-hidden="true">
        {phase === 'closed' ? 'Uma viagem gastronômica começa aqui' : 'Abrindo a carta'}
      </p>
    </div>
  )
}
