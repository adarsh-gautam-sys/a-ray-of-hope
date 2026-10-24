import { randomBytes, createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { volunteerSchema, donationSchema, subscribeSchema, contactSchema } from './schemas.js'

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')

const newRef = (prefix) => `${prefix}-${randomBytes(5).toString('hex').toUpperCase()}`
const inr = (n) => `INR ${n.toLocaleString('en-IN')}`

export function createApp({ store, mailer }) {
  const app = express()
  const isProd = process.env.NODE_ENV === 'production'

  app.disable('x-powered-by')
  app.set('trust proxy', 1) // Cloud Run sits behind one Google front end

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'script-src': ["'self'"],
          'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          'font-src': ["'self'", 'https://fonts.gstatic.com'],
          'img-src': ["'self'", 'data:', 'https://images.unsplash.com'],
          'connect-src': ["'self'"],
          'frame-ancestors': ["'none'"],
          'upgrade-insecure-requests': isProd ? [] : null,
        },
      },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  )
  app.use((_req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    next()
  })

  app.get('/healthz', (_req, res) => res.json({ ok: true }))

  // ── API ──────────────────────────────────────────────────────────────
  const api = express.Router()
  api.use(express.json({ limit: '10kb' }))
  api.use(
    rateLimit({
      windowMs: 60_000,
      limit: 10,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: { ok: false, message: 'Too many requests. Please wait a minute and try again.' },
    }),
  )

  // Parses req.body with a schema; responds 400 and returns null on failure.
  const parse = (schema, req, res) => {
    const result = schema.safeParse(req.body)
    if (result.success) return result.data
    const issue = result.error.issues[0]
    const field = issue.path.join('.') || 'body'
    res.status(400).json({ ok: false, field, message: `Please check "${field}": ${issue.message.toLowerCase()}.` })
    return null
  }

  api.post('/volunteers', async (req, res) => {
    const data = parse(volunteerSchema, req, res)
    if (!data) return
    const reference = newRef('VOL')
    await store.create('volunteers', reference, { ...data, status: 'new', createdAt: new Date() })
    const summary = `Interests: ${data.interests.join(', ')}\nAvailability: ${data.availability.join(', ')}`
    await Promise.all([
      mailer.send({
        to: data.email,
        subject: 'We received your volunteer application',
        text: `Hi ${data.name},\n\nThank you for offering your time. Our team will reach out within 3 business days.\n\n${summary}\n\nReference: ${reference}\n\nA Ray of Hope Charitable Trust`,
      }),
      mailer.toTeam(`New volunteer: ${data.name}`, `${data.name} <${data.email}>\n${summary}\nReference: ${reference}`),
    ])
    res.status(201).json({ ok: true, reference })
  })

  // Records a donation pledge only. No payment is taken until a gateway is wired in.
  api.post('/donations', async (req, res) => {
    const data = parse(donationSchema, req, res)
    if (!data) return
    const reference = newRef('DON')
    await store.create('donations', reference, {
      ...data,
      currency: 'INR',
      status: 'pledged',
      createdAt: new Date(),
    })
    const kind = data.recurring ? 'monthly' : 'one-time'
    await Promise.all([
      mailer.send({
        to: data.email,
        subject: 'Thank you for your pledge to A Ray of Hope',
        text: `Hi ${data.name},\n\nThank you for pledging a ${kind} gift of ${inr(data.amount)}. Our team will email you shortly with payment instructions. No money has been taken yet.\n\nReference: ${reference}\n\nA Ray of Hope Charitable Trust`,
      }),
      mailer.toTeam(`New ${kind} pledge: ${inr(data.amount)}`, `${data.name} <${data.email}>\n${kind} ${inr(data.amount)}\nReference: ${reference}`),
    ])
    res.status(201).json({ ok: true, reference })
  })

  api.post('/subscribers', async (req, res) => {
    const data = parse(subscribeSchema, req, res)
    if (!data) return
    const id = createHash('sha256').update(data.email).digest('hex').slice(0, 32)
    // Idempotent: subscribing twice is a success, not an error.
    await store.create('subscribers', id, { email: data.email, createdAt: new Date() })
    res.status(201).json({ ok: true })
  })

  api.post('/contact', async (req, res) => {
    const data = parse(contactSchema, req, res)
    if (!data) return
    const reference = newRef('MSG')
    await store.create('contacts', reference, { ...data, status: 'new', createdAt: new Date() })
    await Promise.all([
      mailer.send({
        to: data.email,
        subject: 'We got your message',
        text: `Hi ${data.name},\n\nThanks for writing to us. We will reply soon.\n\nReference: ${reference}\n\nA Ray of Hope Charitable Trust`,
      }),
      mailer.toTeam(`New message from ${data.name}`, `${data.name} <${data.email}>\n\n${data.message}\n\nReference: ${reference}`),
    ])
    res.status(201).json({ ok: true, reference })
  })

  api.use((_req, res) => res.status(404).json({ ok: false, message: 'Not found.' }))
  app.use('/api', api)

  // ── Frontend (built by Vite) ─────────────────────────────────────────
  app.use(
    express.static(DIST, {
      setHeaders(res, file) {
        res.setHeader(
          'Cache-Control',
          file.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
        )
      },
    }),
  )
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next()
    res.setHeader('Cache-Control', 'no-cache')
    res.sendFile(path.join(DIST, 'index.html'), (err) => err && next(err))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = err.status >= 400 && err.status < 500 ? err.status : 500
    if (status === 500) console.error(JSON.stringify({ severity: 'ERROR', msg: err.message, stack: err.stack }))
    res.status(status).json({
      ok: false,
      message: status === 500 ? 'Something went wrong on our side. Please try again.' : 'Invalid request.',
    })
  })

  return app
}
