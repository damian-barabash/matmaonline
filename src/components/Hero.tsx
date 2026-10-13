import type { Content } from '../content/types'
import { STICKER } from '../lib/photos'
import { PHONE_FULL, PHONE_TEL } from '../lib/site'
import { PhoneIcon, Sign, type SignName } from './Brand'

const POINT_SIGNS: SignName[] = ['plus', 'equal', 'graph']

export function Hero({ c }: { c: Content }) {
  const h = c.hero
  return (
    <section className="hero">
      <div className="hero__text">
        <p className="hero__eyebrow">
          {h.eyebrow.map((e) => (
            <span className="ticket" key={e}>
              {e}
            </span>
          ))}
        </p>
        <h1>
          {h.h1[0]}
          <mark>{h.h1[1]}</mark>
          {h.h1[2]}
        </h1>
        <p className="hero__sub">{h.sub}</p>
        <div className="hero__cta">
          <a className="btn btn--lg" href={PHONE_TEL}>
            <PhoneIcon />
            {c.ui.callCta}
          </a>
          <a className="hero__phone" href={PHONE_TEL}>
            {PHONE_FULL}
          </a>
        </div>
        <p className="hero__note">{h.callNote}</p>
        <p className="hero__links">
          <a className="link" href="#kontakt">
            {h.formLink}
          </a>
          <a className="link" href="#przyklad">
            {h.demoLink}
          </a>
        </p>
      </div>

      <figure className="hero__card">
        <Sign name="plus" className="hero__sign hero__sign--plus" />
        <Sign name="pi" className="hero__sign hero__sign--pi" />
        <Sign name="root" className="hero__sign hero__sign--root" />
        <div className="hero__clip">
          <img className="hero__photo" src={STICKER.src} width={STICKER.w} height={STICKER.h} alt={h.photoAlt} fetchPriority="high" />
        </div>
        <span className="hero__hello">{c.ui.hello}</span>
        <span className="hero__price">
          <b>80 zł</b>
          <span>{c.ui.priceTag.split('/')[1].trim()}</span>
        </span>
        <figcaption className="hero__caption">
          <b>{h.name}</b>
          <span>{h.role}</span>
        </figcaption>
      </figure>

      <ul className="hero__points">
        {h.points.map((p, i) => (
          <li key={p}>
            <Sign name={POINT_SIGNS[i]} />
            {p}
          </li>
        ))}
      </ul>
    </section>
  )
}
