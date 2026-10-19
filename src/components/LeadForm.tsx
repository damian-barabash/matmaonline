import { useId, useState, type FormEvent } from 'react'
import type { Content } from '../content/types'
import { isValidContact, submitLead } from '../lib/leads'
import { PATHS, PHONE_FULL, WHATSAPP_URL, url } from '../lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

export function LeadForm({ c }: { c: Content }) {
  const f = c.contact.fields
  const id = useId()
  const [values, setValues] = useState({ name: '', contact: '', grade: '', language: c.lang as string, message: '' })
  const [errors, setErrors] = useState<{ contact?: string; grade?: string }>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (k === 'contact' || k === 'grade') setErrors((er) => ({ ...er, [k]: undefined }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!isValidContact(values.contact)) next.contact = c.contact.errors.contact
    if (!values.grade) next.grade = c.contact.errors.grade
    setErrors(next)
    if (next.contact || next.grade) {
      const first = next.contact ? 'contact' : 'grade'
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitLead({
        name: values.name.trim(),
        contact: values.contact.trim(),
        grade: Number(values.grade),
        language: values.language,
        message: values.message.trim(),
        page_lang: c.lang,
      })
      setStatus('sent')
    } catch {
      // filled-in values stay in place so the parent can retry
      setStatus('failed')
    }
  }

  if (status === 'sent')
    return (
      <div className="form form--done" role="status">
        <p>{c.contact.success}</p>
      </div>
    )

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <p className="form__note">{c.contact.formNote}</p>

      <label className="field">
        <span>
          {f.name} <i>({f.optional})</i>
        </span>
        <input name="name" autoComplete="given-name" value={values.name} onChange={set('name')} />
      </label>

      <label className="field">
        <span>{f.contact}</span>
        <input
          name="contact"
          inputMode="email"
          autoComplete="off"
          required
          value={values.contact}
          onChange={set('contact')}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? `${id}-contact` : undefined}
        />
        {errors.contact && (
          <em className="field__error" id={`${id}-contact`} role="alert">
            {errors.contact}
          </em>
        )}
      </label>

      <div className={f.languages.length ? 'form__row' : undefined}>
        <label className="field">
          <span>{f.grade}</span>
          <select
            name="grade"
            required
            value={values.grade}
            onChange={set('grade')}
            aria-invalid={Boolean(errors.grade)}
            aria-describedby={errors.grade ? `${id}-grade` : undefined}
          >
            <option value="" disabled>
              {f.gradePlaceholder}
            </option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {f.gradeOption(n)}
              </option>
            ))}
          </select>
          {errors.grade && (
            <em className="field__error" id={`${id}-grade`} role="alert">
              {errors.grade}
            </em>
          )}
        </label>

        {f.languages.length > 0 && (
        <fieldset className="field field--choice">
          <legend>{f.language}</legend>
          <div className="choice">
            {f.languages.map((l) => (
              <label key={l.value}>
                <input
                  type="radio"
                  name="language"
                  value={l.value}
                  checked={values.language === l.value}
                  onChange={set('language')}
                />
                <span>{l.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        )}
      </div>

      <label className="field">
        <span>
          {f.message} <i>({f.optional})</i>
        </span>
        <textarea name="message" rows={3} value={values.message} onChange={set('message')} aria-describedby={`${id}-hint`} />
        <small id={`${id}-hint`}>{f.messageHint}</small>
      </label>

      {status === 'failed' && (
        <p className="form__failed" role="alert">
          {c.contact.errors.send} <a href={WHATSAPP_URL} target="_blank" rel="noopener">{PHONE_FULL}</a>
        </p>
      )}

      <button className="btn btn--lg btn--dark" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? c.contact.sending : c.contact.submit}
      </button>

      <p className="form__consent">
        {c.contact.consent} <a href={url(PATHS[c.lang].privacy)}>{c.contact.consentLink}</a>
      </p>
    </form>
  )
}
