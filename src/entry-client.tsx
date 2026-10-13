import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/onest/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './styles/main.css'
import { App } from './App'
import type { Lang } from './content/types'
import { resolveRoute, type PageKey, type Route } from './lib/site'

const html = document.documentElement
const root = document.getElementById('root')!
const prerendered = root.childElementCount > 0

// Prerendered pages carry their route in <html lang data-page>; in dev it comes from the URL.
const route: Route = prerendered
  ? { lang: html.lang as Lang, page: html.dataset.page as PageKey }
  : resolveRoute(location.pathname)

const app = (
  <StrictMode>
    <App route={route} />
  </StrictMode>
)

if (prerendered) hydrateRoot(root, app)
else {
  html.lang = route.lang
  createRoot(root).render(app)
}
