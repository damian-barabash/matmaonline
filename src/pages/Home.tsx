import { useEffect, useRef } from 'react'
import { Sign, PhoneIcon } from '../components/Brand'
import { Hero } from '../components/Hero'
import { LeadForm } from '../components/LeadForm'
import { SectionView } from '../components/Sections'
import type { Content } from '../content/types'
import { PHONE_TEL } from '../lib/site'

export function Home({ c }: { c: Content }) {
  const bar = useRef<HTMLAnchorElement>(null)

  // The floating call button steps aside while the contact block or the footer is on screen.
  useEffect(() => {
    const targets = [document.getElementById('kontakt'), document.querySelector('.foot')].filter((el) => el !== null)
    const visible = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
      bar.current?.classList.toggle('is-hidden', visible.size > 0)
    })
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Hero c={c} />
      {c.sections.map((s) => (
        <SectionView key={s.title} s={s} c={c} />
      ))}
      <section className="sec contact" id="kontakt">
        <div className="contact__text">
          <Sign name="plus" className="contact__sign" />
          <h2>{c.contact.title}</h2>
          <p>{c.contact.text}</p>
          <a className="btn btn--lg" href={PHONE_TEL}>
            <PhoneIcon />
            {c.ui.callShort}
          </a>
        </div>
        <LeadForm c={c} />
      </section>
      <a className="callbar" href={PHONE_TEL} ref={bar}>
        <PhoneIcon />
        {c.ui.callShort}
      </a>
    </>
  )
}
