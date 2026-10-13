// Turns the client build into static pages: one HTML file per route, each with its own <head>.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssr = path.resolve('dist-ssr')
const { render, CONTENT, PATHS, privacy } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href)

// SITE_URL is the public address of the site root (set by the deploy workflow).
const SITE = (process.env.SITE_URL || 'https://matmaonline.pl').replace(/\/+$/, '')
const BASE = new URL(SITE + '/').pathname
// A github.io address is a staging copy: keep it out of search.
const STAGING = /\.github\.io$/.test(new URL(SITE).hostname)
const abs = (p) => `${SITE}/${p}`
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// hashed build files that the pages preload or cite
const assets = fs.readdirSync(path.join(dist, 'assets'))
const asset = (prefix) => {
  const f = assets.find((a) => a.startsWith(prefix))
  if (!f) throw new Error(`asset not found: ${prefix}`)
  return `assets/${f}`
}
const FONTS = {
  pl: ['onest-latin-wght-normal', 'onest-latin-ext-wght-normal'],
  ru: ['onest-cyrillic-wght-normal', 'onest-latin-wght-normal'],
}
const OG = { pl: 'og.png', ru: 'og-ru.png' }
const T = {
  pl: {
    serviceType: 'Korepetycje z matematyki online',
    category: 'Korepetycje z matematyki dla szkoły podstawowej',
    jobTitle: 'Korepetytorka matematyki',
    audience: 'Rodzice uczniów klas 1–6 szkoły podstawowej',
    level: 'Szkoła podstawowa, klasy 1–6',
    ogAlt: 'Matma Online — korepetycje z matematyki online dla klas 1–6. Stasia Kulik, 80 zł za 60 minut.',
    offer: 'Indywidualna lekcja matematyki online, 60 minut',
  },
  ru: {
    serviceType: 'Репетитор по математике онлайн',
    category: 'Математика для учеников польской начальной школы',
    jobTitle: 'Репетитор по математике',
    audience: 'Родители учеников 1–6 классов польской школы',
    level: 'Польская школа, 1–6 классы',
    ogAlt: 'Matma Online — репетитор по математике онлайн для 1–6 классов польской школы. Stasia Kulik, 80 zł за 60 минут.',
    offer: 'Индивидуальное онлайн-занятие по математике, 60 минут',
  },
}

function jsonLd(lang) {
  const c = CONTENT[lang]
  const t = T[lang]
  const url = abs(PATHS[lang].home)
  const faq = c.sections.find((s) => s.kind === 'faq')
  // the Polish page says nothing about Russian-language lessons
  const langs = lang === 'pl' ? ['pl'] : ['pl', 'ru']
  const image = abs(OG[lang])
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE}/#site`, url: `${SITE}/`, name: 'Matma Online', inLanguage: lang, publisher: { '@id': `${SITE}/#stasia` } },
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE}/#site` },
        about: { '@id': `${url}#service` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#stasia`,
        name: 'Stasia Kulik',
        jobTitle: t.jobTitle,
        image: abs(asset('stasia-portrait')),
        telephone: '+48690376681',
        url: `${SITE}/`,
        knowsLanguage: langs,
        knowsAbout: lang === 'pl' ? ['matematyka', 'nauczanie dzieci', 'szkoła podstawowa'] : ['математика', 'обучение детей', 'польская школа'],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: c.meta.title.split(' | ')[0],
        description: c.meta.description,
        serviceType: t.serviceType,
        category: t.category,
        url,
        image,
        inLanguage: lang,
        provider: { '@id': `${SITE}/#stasia` },
        brand: { '@type': 'Brand', name: 'Matma Online' },
        areaServed: { '@type': 'Country', name: 'Polska', identifier: 'PL' },
        audience: { '@type': 'EducationalAudience', educationalRole: 'parent', audienceType: t.audience },
        educationalLevel: t.level,
        availableLanguage: langs,
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: url,
          servicePhone: { '@type': 'ContactPoint', telephone: '+48690376681', contactType: 'customer service', availableLanguage: langs },
        },
        offers: {
          '@type': 'Offer',
          name: t.offer,
          url: `${url}#cena`,
          price: '80.00',
          priceCurrency: 'PLN',
          availability: 'https://schema.org/InStock',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '80.00', priceCurrency: 'PLN', unitCode: 'HUR', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' } },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang,
        mainEntity: faq.items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
      },
    ],
  }
}

function head({ lang, page }) {
  const meta = page === 'home' ? CONTENT[lang].meta : page === 'privacy' ? privacy[lang].meta : { title: '404 | Matma Online', description: '' }
  const tags = [`<title>${esc(meta.title)}</title>`]
  if (meta.description) tags.push(`<meta name="description" content="${esc(meta.description)}" />`)

  // privacy text is a working draft until the owner confirms the controller details
  if (STAGING || page !== 'home') tags.push('<meta name="robots" content="noindex" />')
  else tags.push('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />')

  if (page === 'home' && lang === 'pl') {
    // ownership tokens for Google Search Console / Bing Webmaster Tools (repository variables)
    if (process.env.GOOGLE_SITE_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(process.env.GOOGLE_SITE_VERIFICATION)}" />`)
    if (process.env.BING_SITE_VERIFICATION) tags.push(`<meta name="msvalidate.01" content="${esc(process.env.BING_SITE_VERIFICATION)}" />`)
  }

  for (const f of FONTS[lang]) tags.push(`<link rel="preload" as="font" type="font/woff2" href="${BASE}${asset(f)}" crossorigin />`)

  if (page !== 'notfound') {
    const self = abs(PATHS[lang][page])
    const other = lang === 'pl' ? 'ru' : 'pl'
    tags.push(`<link rel="canonical" href="${self}" />`)
    tags.push(`<link rel="alternate" hreflang="pl" href="${abs(PATHS.pl[page])}" />`)
    tags.push(`<link rel="alternate" hreflang="ru" href="${abs(PATHS.ru[page])}" />`)
    tags.push(`<link rel="alternate" hreflang="x-default" href="${abs(PATHS.pl[page])}" />`)
    tags.push(`<meta property="og:type" content="website" />`)
    tags.push(`<meta property="og:site_name" content="Matma Online" />`)
    tags.push(`<meta property="og:locale" content="${lang === 'pl' ? 'pl_PL' : 'ru_RU'}" />`)
    tags.push(`<meta property="og:locale:alternate" content="${other === 'pl' ? 'pl_PL' : 'ru_RU'}" />`)
    tags.push(`<meta property="og:url" content="${self}" />`)
    tags.push(`<meta property="og:title" content="${esc(meta.title)}" />`)
    tags.push(`<meta property="og:description" content="${esc(meta.description)}" />`)
    tags.push(`<meta property="og:image" content="${abs(OG[lang])}" />`)
    tags.push(`<meta property="og:image:type" content="image/png" />`)
    tags.push(`<meta property="og:image:width" content="1200" />`)
    tags.push(`<meta property="og:image:height" content="630" />`)
    tags.push(`<meta property="og:image:alt" content="${esc(T[lang].ogAlt)}" />`)
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
    tags.push(`<meta name="twitter:title" content="${esc(meta.title)}" />`)
    tags.push(`<meta name="twitter:description" content="${esc(meta.description)}" />`)
    tags.push(`<meta name="twitter:image" content="${abs(OG[lang])}" />`)
  }
  if (page === 'home') {
    tags.push(`<link rel="preload" as="image" type="image/webp" href="${BASE}${asset('stasia-sticker')}" fetchpriority="high" />`)
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd(lang)).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}

function write(route, file) {
  const html = template
    .replace('<html lang="pl" data-page="home">', `<html lang="${route.lang}" data-page="${route.page}">`)
    .replace('<!--head-->', head(route))
    .replace('<!--app-->', render(route))
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)
  console.log('prerendered', '/' + file)
}

for (const lang of ['pl', 'ru'])
  for (const page of ['home', 'privacy']) write({ lang, page }, PATHS[lang][page] + 'index.html')
write({ lang: 'pl', page: 'notfound' }, '404.html')

const today = new Date().toISOString().slice(0, 10)
const alternates =
  ['pl', 'ru'].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(PATHS[l].home)}"/>`).join('') +
  `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(PATHS.pl.home)}"/>`
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    ['pl', 'ru']
      .map(
        (l) =>
          `  <url><loc>${abs(PATHS[l].home)}</loc><lastmod>${today}</lastmod>${alternates}` +
          `<image:image><image:loc>${abs(asset('stasia-portrait'))}</image:loc></image:image></url>`,
      )
      .join('\n') +
    `\n</urlset>\n`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\n${STAGING ? 'Disallow: /' : 'Allow: /'}\n\nSitemap: ${abs('sitemap.xml')}\n`)
fs.rmSync(ssr, { recursive: true, force: true })
