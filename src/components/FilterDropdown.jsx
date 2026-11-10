import { useEffect, useId, useRef, useState } from 'react'
import { fold } from '../data/restaurants'
import { Flag } from './ui'

// Menu próprio para evitar as opções nativas (brancas/azuis) do navegador.
export default function FilterDropdown({
  options,
  value,
  onChange,
  allLabel,
  ariaLabel,
  searchable = false,
  showCounts = false,
  showFlags = false,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [placement, setPlacement] = useState({ left: 16, top: 16, width: 288, maxHeight: 300 })
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const searchRef = useRef(null)
  const listRef = useRef(null)
  const panelId = useId()

  const choices = options.map((option) => (
    typeof option === 'string'
      ? { value: option, label: option }
      : {
          value: option.value ?? option.name,
          label: option.label ?? option.name,
          code: option.code,
          total: option.total,
        }
  ))
  const selected = choices.find((choice) => choice.value === value)
  const filtered = choices.filter((choice) => fold(choice.label).includes(fold(query.trim())))
  const total = choices.reduce((sum, choice) => sum + (choice.total || 0), 0)

  const close = (restoreFocus = false) => {
    setOpen(false)
    setQuery('')
    if (restoreFocus) triggerRef.current?.focus()
  }
  const select = (next) => {
    onChange(next)
    close(true)
  }

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close()
    }
    const onFocusIn = (event) => {
      if (!rootRef.current?.contains(event.target)) close()
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close(true)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const position = () => {
      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) return
      const gap = 8
      const margin = 8
      const menuWidth = Math.min(304, window.innerWidth - margin * 2)
      const topMargin = Math.max(margin, (document.querySelector('header')?.getBoundingClientRect().bottom || 0) + gap)
      const below = window.innerHeight - rect.bottom - gap - margin
      const above = rect.top - gap - topMargin
      const opensAbove = below < 310 && above > below
      const maxHeight = Math.max(60, Math.min(310, opensAbove ? above : below))
      setPlacement({
        left: Math.max(margin, Math.min(rect.left, window.innerWidth - menuWidth - margin)),
        top: Math.min(window.innerHeight - maxHeight - margin, Math.max(topMargin, opensAbove ? rect.top - gap - maxHeight : rect.bottom + gap)),
        width: menuWidth,
        maxHeight,
      })
    }
    position()
    window.addEventListener('resize', position)
    window.addEventListener('scroll', position, true)
    if (searchable) {
      searchRef.current?.focus()
    } else {
      const index = Math.max(0, choices.findIndex((choice) => choice.value === value) + 1)
      listRef.current?.querySelectorAll('button')[index]?.focus()
    }
    return () => {
      window.removeEventListener('resize', position)
      window.removeEventListener('scroll', position, true)
    }
  }, [open, searchable])

  const move = (event) => {
    const buttons = Array.from(listRef.current?.querySelectorAll('button') || [])
    const current = buttons.indexOf(document.activeElement)
    let next = current
    if (event.key === 'ArrowDown') next = (current + 1) % buttons.length
    else if (event.key === 'ArrowUp') next = (current - 1 + buttons.length) % buttons.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = buttons.length - 1
    else return
    event.preventDefault()
    buttons[next]?.focus()
  }

  return (
    <div ref={rootRef} className="relative max-w-full">
      <button
        ref={triggerRef}
        type="button"
        className={[
          'pill flex min-h-9 min-w-[190px] max-w-full items-center gap-2.5 !bg-paper !px-3 !py-2 text-ink-2',
          'transition-colors hover:!border-wine hover:!text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine',
          value ? '!border-wine !text-ink' : '',
        ].join(' ')}
        aria-label={ariaLabel + ': ' + (selected?.label || allLabel)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => { setOpen((current) => !current); setQuery('') }}
        onKeyDown={(event) => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        {showFlags && (selected?.code
          ? <Flag code={selected.code} className="!size-5" />
          : <span aria-hidden="true" className="flex size-5 flex-none items-center justify-center rounded-full border border-rule text-xs text-wine">◎</span>)}
        <span className="min-w-0 flex-1 truncate text-left">{selected?.label || allLabel}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={['size-4 flex-none text-muted transition-transform', open ? 'rotate-180' : ''].join(' ')}>
          <path d="m5 7 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          style={placement}
          id={panelId}
          role="dialog"
          aria-label={ariaLabel}
          className={[
            'fixed z-50 flex flex-col overflow-hidden border border-rule bg-paper text-ink shadow-[0_18px_42px_var(--c-shadow)]',
          ].join(' ')}
        >
          {searchable && (
            <div className="shrink-0 border-b border-rule p-2">
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    listRef.current?.querySelector('button')?.focus()
                  } else if (event.key === 'Enter' && filtered.length) {
                    event.preventDefault()
                    select(filtered[0].value)
                  }
                }}
                placeholder="Buscar país..."
                aria-label="Buscar país"
                className="w-full border border-rule bg-paper-2 px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-wine"
              />
            </div>
          )}
          <div ref={listRef} className="filter-dropdown-scroll min-h-0 overflow-y-auto overscroll-contain p-1" onKeyDown={move}>
            <button
              type="button"
              onClick={() => select('')}
              aria-pressed={!value}
              className={['flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-paper-2 focus-visible:bg-paper-2 focus-visible:outline-none', !value ? 'bg-paper-2 text-wine' : 'text-ink'].join(' ')}
            >
              {showFlags && <span aria-hidden="true" className="flex size-5 flex-none items-center justify-center rounded-full border border-rule text-xs">◎</span>}
              <span className="min-w-0 flex-1">{allLabel}</span>
              {showCounts && <span className="text-xs tabular-nums text-muted">{total}</span>}
              {!value && <span aria-hidden="true" className="text-wine">✓</span>}
            </button>
            {filtered.map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => select(choice.value)}
                aria-pressed={value === choice.value}
                className={['flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors hover:bg-paper-2 focus-visible:bg-paper-2 focus-visible:outline-none', value === choice.value ? 'bg-paper-2 text-wine' : 'text-ink'].join(' ')}
              >
                {showFlags && choice.code && <Flag code={choice.code} className="!size-5" />}
                <span className="min-w-0 flex-1">{choice.label}</span>
                {showCounts && typeof choice.total === 'number' && <span className="text-xs tabular-nums text-muted">{choice.total}</span>}
                {value === choice.value && <span aria-hidden="true" className="text-wine">✓</span>}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-5 text-center text-sm italic text-muted">Nenhum país encontrado.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
