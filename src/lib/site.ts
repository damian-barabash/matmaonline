export const WHATSAPP_URL = 'https://wa.me/48690376681'
export const PHONE_FULL = '+48 690 376 681'
export const PHONE_SHORT = '690 376 681'
export const TEACHER = 'Stasia Kulik'
export const BRAND = 'Matma Online'

import type { Lang } from '../content/types'

export type PageKey = 'home' | 'privacy' | 'notfound'
export interface Route { lang: Lang; page: PageKey }

export const PATHS: Record<Lang, Record<'home' | 'privacy', string>> = {
  pl: { home: '', privacy: 'polityka-prywatnosci/' },
  ru: { home: 'ru/', privacy: 'ru/privacy/' },
}

/** Path of a page relative to the site base, e.g. "ru/" → "/matmaonline/ru/". */
export const url = (path: string) => import.meta.env.BASE_URL + path

export function resolveRoute(pathname: string): Route {
  const base = import.meta.env.BASE_URL
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\//, '')
  p = p.replace(/index\.html$/, '')
  if (p && !p.endsWith('/')) p += '/'
  for (const lang of ['pl', 'ru'] as const)
    for (const page of ['home', 'privacy'] as const) if (PATHS[lang][page] === p) return { lang, page }
  return { lang: p.startsWith('ru/') ? 'ru' : 'pl', page: 'notfound' }
}
