import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { pl } from './content/pl'
import { ru } from './content/ru'
import type { Route } from './lib/site'
import { Home } from './pages/Home'
import { NotFound, Privacy } from './pages/Privacy'

export const CONTENT = { pl, ru }

export function App({ route }: { route: Route }) {
  const c = CONTENT[route.lang]
  return (
    <>
      <a className="skip" href="#main">
        {c.ui.skip}
      </a>
      <Header c={c} page={route.page} />
      <main id="main">
        {route.page === 'home' && <Home c={c} />}
        {route.page === 'privacy' && <Privacy lang={route.lang} />}
        {route.page === 'notfound' && <NotFound lang={route.lang} />}
      </main>
      <Footer c={c} page={route.page} />
    </>
  )
}
