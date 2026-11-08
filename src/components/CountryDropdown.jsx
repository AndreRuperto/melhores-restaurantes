import { useEffect, useId, useRef, useState } from 'react'
import { fold } from '../data/restaurants'
import { Flag } from './ui'

// Seletor do mapa: rolagem interna, bandeiras e busca, sem depender
// do estilo nativo das opções (que não aceita imagens e varia por navegador).
export default function CountryDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const inputRef = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return undefined

    const onOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setQuery('')
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onOutsideClick)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('pointerdown', onOutsideClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const selected = options.find((item) => item.name === value)
  const matches = options.filter((item) => fold(item.name).includes(fold(query.trim())))
  const total = options.reduce((sum, item) => sum + item.total, 0)

  const select = (next) => {
    onChange(next)
    setQuery('')
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={`pill flex min-w-[200px] max-w-[calc(100vw-2rem)] items-center gap-2.5 !bg-paper-2 !px-3 !py-2 text-ink transition-colors hover:!border-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${value ? '!border-wine' : ''}`}
        aria-label={`Filtrar mapa por país: ${value || 'todos os países'}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((current) => !current)
          setQuery('')
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {selected ? (
          <Flag code={selected.code} className="!h-5 !w-5" />
        ) : (
          <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full border border-rule text-xs text-wine">◎</span>
        )}
        <span className="min-w-0 flex-1 truncate text-left">{selected?.name || 'Todos os países'}</span>
        <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 flex-none text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="m5 7 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Selecionar país para o mapa"
          className="absolute left-1/2 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 border border-rule bg-paper shadow-[0_16px_40px_var(--c-shadow)]"
        >
          <div className="border-b border-rule p-2">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar país..."
              aria-label="Buscar país"
              className="w-full border border-rule bg-paper-2 px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-wine"
            />
          </div>
          <div className="max-h-[min(16rem,45vh)] overflow-y-auto overscroll-contain p-1">
            <button
              type="button"
              onClick={() => select('')}
              aria-pressed={!value}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-paper-2 focus-visible:bg-paper-2 focus-visible:outline-none ${!value ? 'bg-paper-2 text-wine' : 'text-ink'}`}
            >
              <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-rule text-xs">◎</span>
              <span className="flex-1">Todos os países</span>
              <span className="text-xs tabular-nums text-muted">{total}</span>
              {!value && <span aria-hidden="true" className="text-wine">✓</span>}
            </button>
            {matches.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => select(item.name)}
                aria-pressed={value === item.name}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-paper-2 focus-visible:bg-paper-2 focus-visible:outline-none ${value === item.name ? 'bg-paper-2 text-wine' : 'text-ink'}`}
              >
                <Flag code={item.code} className="!h-5 !w-5" />
                <span className="min-w-0 flex-1">{item.name}</span>
                <span className="text-xs tabular-nums text-muted">{item.total}</span>
                {value === item.name && <span aria-hidden="true" className="text-wine">✓</span>}
              </button>
            ))}
            {matches.length === 0 && (
              <p className="px-3 py-5 text-center text-sm italic text-muted">Nenhum país encontrado.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
