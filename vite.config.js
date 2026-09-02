import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dev-only middleware so `/api/*` works under `npm run dev` exactly as it
 * will on Vercel. In production Vercel runs the files in /api directly and
 * this plugin is not part of the build.
 */
function devApi(env) {
  return {
    name: 'ventura-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next()
        const route = req.url.split('?')[0].replace(/\/$/, '')
        const file = `.${route}.js`
        for (const [k, v] of Object.entries(env)) {
          if (process.env[k] === undefined) process.env[k] = v
        }
        try {
          const mod = await server.ssrLoadModule(file)
          const chunks = []
          for await (const c of req) chunks.push(c)
          const raw = Buffer.concat(chunks).toString('utf8')
          req.body = raw ? JSON.parse(raw) : {}
          res.status = (c) => ((res.statusCode = c), res)
          res.json = (o) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(o))
            return res
          }
          await mod.default(req, res)
        } catch (err) {
          server.config.logger.error(`[dev-api] ${route}: ${err.message}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Dev API error: ' + err.message }))
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), devApi(env)],
    build: {
      outDir: 'dist',
      assetsInlineLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    server: {
      port: 5173,
    },
  }
})
