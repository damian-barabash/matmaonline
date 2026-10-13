import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH comes from the deploy workflow (actions/configure-pages):
// "/matmaonline/" on the default github.io address, "/" once a custom domain is attached.
const raw = process.env.BASE_PATH || '/'
const base = raw.endsWith('/') ? raw : raw + '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: { assetsInlineLimit: 0 },
})
