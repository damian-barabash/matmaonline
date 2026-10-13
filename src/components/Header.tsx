import { useEffect, useState } from 'react'
import type { Content, Lang } from '../content/types'
import { PATHS, PHONE_TEL, url, type PageKey } from '../lib/site'
import { PhoneIcon, Wordmark } from './Brand'

export function LangSwitch({ lang, page, label }: { lang: Lang; page: PageKey; label: string }) {
  const target = page === 'privacy' ? 'privacy' : 'home'
  return (
    <nav className="lang" aria-label={label}>
      <a href={url(PATHS.pl[target])} hrefLang="pl" lang="pl" aria-current={lang === 'pl' ? 'true' : undefined}>
        Polski
      </a>
      <a href={url(PATHS.ru[target])} hrefLang="ru" lang="ru" aria-current={lang === 'ru' ? 'true' : undefined}>
        Русский
      </a>
    </nav>
  )
}

export function Header({ c, page }: { c: Content; page: PageKey }) {
  const [open, setOpen] = useState(false)
  const home = url(PATHS[c.lang].home)
  const prefix = page === 'home' ? '' : home

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="top">
      <div className="top__bar">
        <a className="top__logo" href={home} aria-label="Matma Online">
          <Wordmark />
        </a>
        <nav className={`top__nav${open ? ' is-open' : ''}`} id="menu" aria-label={c.ui.menu}>
          {c.nav.map((n) => (
            <a key={n.href} href={prefix + n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="top__side">
          {/* the Polish version does not advertise the Russian one; the switch lives on /ru/ */}
          {c.lang === 'ru' && <LangSwitch lang={c.lang} page={page} label={c.ui.langSwitch} />}
          <a className="btn btn--sm top__call" href={PHONE_TEL}>
            <PhoneIcon />
            <span>{c.ui.callShort}</span>
          </a>
          <button
            type="button"
            className="top__burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={c.ui.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
