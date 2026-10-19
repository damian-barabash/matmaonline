import type { Content, Section } from '../content/types'
import { PHOTOS, PORTRAIT } from '../lib/photos'
import { PHONE_FULL, WHATSAPP_URL } from '../lib/site'
import { WhatsAppIcon, Sign, type SignName } from './Brand'
import { DemoArt } from './DemoArt'

type Of<K extends Section['kind']> = Extract<Section, { kind: K }>

function Photo({ k, alt, className }: { k: keyof typeof PHOTOS; alt: string; className?: string }) {
  const p = PHOTOS[k]
  return (
    <figure className={`snap ${className ?? ''}`}>
      <img src={p.src} width={p.w} height={p.h} alt={alt} loading="lazy" decoding="async" />
    </figure>
  )
}

function Situations({ s }: { s: Of<'situations'> }) {
  return (
    <section className="sec situations" id={s.id}>
      <div className="sec__head">
        <h2>{s.title}</h2>
        <p className="lead">{s.lead}</p>
      </div>
      <ul className="notes">
        {s.cards.map((card) => (
          <li className="note" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </li>
        ))}
      </ul>
      {s.outro && <p className="situations__outro">{s.outro}</p>}
    </section>
  )
}

function About({ s }: { s: Of<'about'> }) {
  return (
    <section className="sec about" id={s.id}>
      <figure className="snap snap--portrait about__photo">
        <img src={PORTRAIT.src} width={PORTRAIT.w} height={PORTRAIT.h} alt={s.photoAlt} loading="lazy" decoding="async" />
        <figcaption>{s.photoCaption}</figcaption>
      </figure>
      <div className="about__text">
        <h2>{s.title}</h2>
        {s.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <ul className="pills">
          {s.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Demo({ s }: { s: Of<'demo'> }) {
  return (
    <section className="sec demo" id={s.id}>
      <div className="demo__inner">
        <h2>{s.title}</h2>
        <div className="demo__task">
          <span className="demo__task-label">{s.taskLabel}</span>
          <p lang="pl">{s.task}</p>
        </div>
        <ol className="demo__steps">
          {s.steps.map((step, i) => (
            <li className="frame" key={step.title}>
              <span className="frame__tab" aria-hidden="true">
                {i + 1}
              </span>
              <div className="frame__art">
                <DemoArt art={step.art} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="demo__note">{s.note}</p>
      </div>
    </section>
  )
}

function Steps({ s }: { s: Of<'steps'> }) {
  return (
    <section className="sec steps" id={s.id}>
      <h2>{s.title}</h2>
      <ol className="steps__list" data-count={s.steps.length}>
        {s.steps.map((step, i) => (
          <li key={step.title}>
            <span className="steps__num" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

const FEATURE_SIGNS: SignName[] = ['infinity', 'root', 'pi']

function Features({ s }: { s: Of<'features'> }) {
  return (
    <section className={`sec features${s.photos ? ' features--photos' : ''}`} id={s.id}>
      <div className="features__top">
        <div className="features__text">
          <h2>{s.title}</h2>
          {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
        </div>
        {s.photos && (
          <div className="features__photos">
            {s.photos.map((p, i) => (
              <Photo key={p.key} k={p.key} alt={p.alt} className={i ? 'snap--b' : 'snap--a'} />
            ))}
          </div>
        )}
      </div>
      {s.cards && (
        <ul className="features__cards">
          {s.cards.map((card, i) => (
            <li key={card.title}>
              <Sign name={FEATURE_SIGNS[i % 3]} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Classes({ s }: { s: Of<'classes'> }) {
  return (
    <section className="sec classes" id={s.id}>
      <h2>{s.title}</h2>
      <div className="classes__grid">
        {s.cards.map((card) => (
          <article className="klasa" key={card.badge}>
            <span className="klasa__badge" aria-hidden="true">
              {card.badge}
            </span>
            <Photo k={card.photo} alt={card.alt} />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Progress({ s }: { s: Of<'progress'> }) {
  return (
    <section className="sec progress" id={s.id}>
      <div className="progress__text">
        <h2>{s.title}</h2>
        <p>{s.text}</p>
        <ul className="pills">
          {s.moments.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <figure className="memo">
        <figcaption>{s.exampleLabel}</figcaption>
        <blockquote>{s.example}</blockquote>
        <Sign name="graph" className="memo__sign" />
      </figure>
    </section>
  )
}

function Price({ s, c }: { s: Of<'price'>; c: Content }) {
  return (
    <section className="sec price" id={s.id}>
      <div className="price__card">
        <div className="price__main">
          <h2>{s.title}</h2>
          <p>{s.text}</p>
          <p className="price__included-label">{s.includedLabel}:</p>
          <ul className="price__included">
            {s.included.map((x) => (
              <li key={x}>
                <Sign name="plus" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="price__stub">
          <p className="price__amount">
            <b>{s.amount}</b>
            <span>/ {s.per}</span>
          </p>
          <a className="btn btn--lg" href={WHATSAPP_URL} target="_blank" rel="noopener">
            <WhatsAppIcon />
            {c.ui.callCta}
          </a>
          <a className="price__phone" href={WHATSAPP_URL} target="_blank" rel="noopener">
            {PHONE_FULL}
          </a>
        </div>
      </div>
    </section>
  )
}

function Faq({ s, c }: { s: Of<'faq'>; c: Content }) {
  return (
    <section className="sec faq" id={s.id}>
      <div className="faq__head">
        <h2>{s.title}</h2>
        <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noopener">
          <WhatsAppIcon />
          {c.ui.callShort}
        </a>
      </div>
      <div className="faq__list">
        {s.items.map((item) => (
          <details key={item.q}>
            <summary>
              <h3>{item.q}</h3>
              <Sign name="plus" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function SectionView({ s, c }: { s: Section; c: Content }) {
  switch (s.kind) {
    case 'situations':
      return <Situations s={s} />
    case 'about':
      return <About s={s} />
    case 'demo':
      return <Demo s={s} />
    case 'steps':
      return <Steps s={s} />
    case 'features':
      return <Features s={s} />
    case 'classes':
      return <Classes s={s} />
    case 'progress':
      return <Progress s={s} />
    case 'price':
      return <Price s={s} c={c} />
    case 'faq':
      return <Faq s={s} c={c} />
  }
}
