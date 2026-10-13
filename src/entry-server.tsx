import { renderToString } from 'react-dom/server'
import { App, CONTENT } from './App'
import { privacy } from './content/privacy'
import { PATHS, type Route } from './lib/site'

export { CONTENT, PATHS, privacy }

export function render(route: Route): string {
  return renderToString(<App route={route} />)
}
