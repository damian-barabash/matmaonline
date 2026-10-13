import { privacy } from '../content/privacy'
import type { Lang } from '../content/types'
import { PATHS, url } from '../lib/site'

export function Privacy({ lang }: { lang: Lang }) {
  const p = privacy[lang]
  return (
    <article className="doc">
      <h1>{p.title}</h1>
      <p className="doc__meta">{p.updated}</p>
      {p.blocks.map((b) => (
        <section key={b.title}>
          <h2>{b.title}</h2>
          {b.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </section>
      ))}
      <p>
        <a className="link" href={url(PATHS[lang].home)}>
          {p.back}
        </a>
      </p>
    </article>
  )
}

export function NotFound({ lang }: { lang: Lang }) {
  const t =
    lang === 'ru'
      ? { h: 'Такой страницы нет', p: 'Возможно, адрес изменился.', a: 'Вернуться на главную' }
      : { h: 'Nie ma takiej strony', p: 'Być może adres się zmienił.', a: 'Wróć na stronę główną' }
  return (
    <article className="doc doc--center">
      <p className="doc__404" aria-hidden="true">
        4 + 0 + 4
      </p>
      <h1>{t.h}</h1>
      <p>{t.p}</p>
      <p>
        <a className="btn" href={url(PATHS[lang].home)}>
          {t.a}
        </a>
      </p>
    </article>
  )
}
