import { useEffect, useRef, useState } from 'react'
import { restaurants } from '../data/restaurants'
import BrandMark from './BrandMark'
import './menu-opening.css'

const STORAGE_KEY = 'a-carta-abertura-2026-v1'
const featured = [...restaurants].sort((a, b) => a.rank - b.rank).slice(0, 4)

// Tempos da abertura (ms). A carta espera o toque; se ninguém tocar, abre sozinha.
const AUTO_OPEN = 4500
const FLIP = 1650
const HOLD = 550
const ZOOM = 1100

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

function hasMouse() {
  return typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
}

// Cópia do título da Home posicionada exatamente sobre ele. A animação parte
// do título dentro da carta e termina no lugar do título real, que então assume.
function createTitleTravel(target, source, host) {
  const to = target.getBoundingClientRect()
  const from = source.getBoundingClientRect()
  const visible = to.width > 0 && to.bottom > 0 && to.top < window.innerHeight
  if (!visible || from.width === 0) return null

  const style = window.getComputedStyle(target)
  const clone = target.cloneNode(true)
  clone.removeAttribute('data-abertura-titulo')
  clone.setAttribute('aria-hidden', 'true')
  clone.className = `${target.className} menu-opening__travel`
  Object.assign(clone.style, {
    left: `${to.left}px`,
    top: `${to.top}px`,
    width: `${to.width}px`,
    height: `${to.height}px`,
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textAlign: style.textAlign,
    color: style.color,
  })

  const scale = Math.min(from.width / to.width, from.height / to.height)
  const dx = from.left + from.width / 2 - (to.left + (to.width * scale) / 2)
  const dy = from.top + from.height / 2 - (to.top + (to.height * scale) / 2)
  host.appendChild(clone)

  const animation = clone.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 },
      { opacity: 1, offset: 0.28 },
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    ],
    { duration: ZOOM, easing: 'cubic-bezier(0.65, 0, 0.25, 1)', fill: 'forwards' },
  )
  return { clone, animation }
}

export default function MenuOpening() {
  const [phase, setPhase] = useState(() => (shouldShowOpening() ? 'closed' : 'done'))
  const rootRef = useRef(null)
  const openRef = useRef(null)
  const skipRef = useRef(null)
  const headingRef = useRef(null)
  const active = phase !== 'done'
  const finish = () => {
    rememberOpening()
    setPhase('done')
  }
  const open = () => setPhase((current) => (current === 'closed' ? 'opening' : current))

  useEffect(() => {
    if (!active) return undefined

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    openRef.current?.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        finish()
      }
      if (event.key === 'Tab') {
        // Foco preso entre "Abrir a carta" e "Pular introdução".
        event.preventDefault()
        const targets = [openRef.current, skipRef.current].filter((el) => el && !el.disabled)
        const index = targets.indexOf(document.activeElement)
        const next = targets[(index + (event.shiftKey ? -1 : 1) + targets.length) % targets.length]
        next?.focus({ preventScroll: true })
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
      closed: ['opening', AUTO_OPEN],
      opening: ['zooming', FLIP + HOLD],
    }
    const transition = transitions[phase]
    if (!transition) return undefined
    if (phase === 'opening' && document.activeElement === openRef.current) {
      skipRef.current?.focus({ preventScroll: true })
    }
    const timer = window.setTimeout(() => setPhase(transition[0]), transition[1])
    return () => window.clearTimeout(timer)
  }, [phase])

  // O título de dentro da carta vira o título da página.
  useEffect(() => {
    if (phase !== 'zooming') return undefined
    rememberOpening()
    const target = document.querySelector('[data-abertura-titulo]')
    const travel = target && headingRef.current && rootRef.current
      ? createTitleTravel(target, headingRef.current, rootRef.current)
      : null

    const previousVisibility = target?.style.visibility ?? ''
    if (travel) target.style.visibility = 'hidden'
    const timer = window.setTimeout(() => setPhase('done'), ZOOM)

    return () => {
      window.clearTimeout(timer)
      travel?.animation.cancel()
      travel?.clone.remove()
      if (target) target.style.visibility = previousVisibility
    }
  }, [phase])

  if (!active) return null

  const closed = phase === 'closed'
  const caption = closed
    ? `${hasMouse() ? 'Clique' : 'Toque'} na carta para abrir`
    : 'Uma viagem gastronômica começa aqui'

  return (
    <div ref={rootRef} className={`menu-opening menu-opening--${phase}`} role="dialog" aria-modal="true" aria-label="Animação de abertura de A Carta">
      <div className="menu-opening__masthead" aria-hidden="true">
        <BrandMark className="menu-opening__masthead-mark" />
        <span>A C A R T A</span>
      </div>
      <button ref={skipRef} type="button" className="menu-opening__skip" onClick={finish}>
        Pular introdução <span aria-hidden="true">↗</span>
      </button>

      <div className="menu-opening__stage">
        <div className="menu-opening__book" aria-hidden="true">
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
                <span ref={headingRef} className="menu-opening__inside-heading">Os cem<br /><em>melhores</em><br />restaurantes<br />do mundo</span>
                <span className="menu-opening__inside-rule" />
                <span className="menu-opening__inside-copy">Explore sabores, histórias<br />e lugares extraordinários.</span>
              </div>
            </div>
          </div>
        </div>

        {/* A capa inteira é o botão: tocar abre a carta. */}
        <button
          ref={openRef}
          type="button"
          className="menu-opening__open"
          onClick={open}
          disabled={!closed}
          tabIndex={closed ? 0 : -1}
          aria-label="Abrir a carta"
        />
      </div>

      <p className="menu-opening__caption" aria-live="polite">
        {caption}
      </p>
    </div>
  )
}
