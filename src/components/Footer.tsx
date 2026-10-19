import type { Content } from '../content/types'
import { PATHS, PHONE_FULL, WHATSAPP_URL, url, type PageKey } from '../lib/site'
import { Wordmark } from './Brand'
import { LangSwitch } from './Header'

export function Footer({ c, page }: { c: Content; page: PageKey }) {
  return (
    <footer className="foot">
      <div className="foot__inner">
        <div className="foot__brand">
          <Wordmark />
          <p>{c.ui.footerNote}</p>
        </div>
        <div className="foot__links">
          <a className="foot__phone" href={WHATSAPP_URL} target="_blank" rel="noopener">
            {PHONE_FULL}
          </a>
          {c.lang === 'ru' ? (
            <LangSwitch lang={c.lang} page={page} label={c.ui.langSwitch} />
          ) : (
            <a className="foot__alt" href={url(PATHS.ru[page === 'privacy' ? 'privacy' : 'home'])} hrefLang="ru" aria-label={c.ui.langSwitch}>
              RU
            </a>
          )}
          <a href={url(PATHS[c.lang].privacy)}>{c.ui.privacy}</a>
        </div>
        <p className="foot__small">
          © 2026 Matma Online · {c.ui.photoCredit}
        </p>
      </div>
    </footer>
  )
}
