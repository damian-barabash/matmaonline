export type Lang = 'pl' | 'ru'

export type Art =
  | { type: 'groups'; total: number; groups: number; item: 'sticker' | 'pencil'; equation?: string }
  | { type: 'equation'; text: string; answer: string }
  | { type: 'words'; pairs: [string, string][] }
  | { type: 'answer'; text: string }

export type PhotoKey = 'online' | 'young' | 'older' | 'pencils'

export type Section =
  | { kind: 'situations'; id?: string; title: string; lead: string; cards: { title: string; text: string }[]; outro?: string }
  | { kind: 'about'; id: string; title: string; paragraphs: string[]; photoAlt: string; photoCaption: string; facts: string[] }
  | { kind: 'demo'; id: string; title: string; taskLabel: string; task: string; steps: { title: string; text: string; art: Art }[]; note: string }
  | { kind: 'steps'; id?: string; title: string; steps: { title: string; text: string }[] }
  | {
      kind: 'features'
      id?: string
      title: string
      paragraphs?: string[]
      cards?: { title: string; text: string }[]
      photos?: { key: PhotoKey; alt: string }[]
    }
  | { kind: 'classes'; id: string; title: string; cards: { badge: string; title: string; text: string; photo: PhotoKey; alt: string }[] }
  | { kind: 'progress'; id?: string; title: string; text: string; moments: string[]; exampleLabel: string; example: string }
  | { kind: 'price'; id: string; title: string; amount: string; per: string; text: string; includedLabel: string; included: string[] }
  | { kind: 'faq'; id: string; title: string; items: { q: string; a: string }[] }

export interface Content {
  lang: Lang
  meta: { title: string; description: string }
  nav: { label: string; href: string }[]
  ui: {
    skip: string
    menu: string
    callShort: string
    callCta: string
    langSwitch: string
    priceTag: string
    footerNote: string
    privacy: string
    photoCredit: string
    hello: string
  }
  hero: {
    eyebrow: string[]
    h1: [string, string, string]
    sub: string
    points: string[]
    callNote: string
    formLink: string
    demoLink: string
    name: string
    role: string
    photoAlt: string
  }
  sections: Section[]
  contact: {
    title: string
    text: string
    formNote: string
    submit: string
    sending: string
    fields: {
      name: string
      contact: string
      grade: string
      gradePlaceholder: string
      gradeOption: (n: number) => string
      language: string
      languages: { value: string; label: string }[]
      message: string
      messageHint: string
      optional: string
    }
    errors: { contact: string; grade: string; send: string }
    success: string
    consent: string
    consentLink: string
  }
}
