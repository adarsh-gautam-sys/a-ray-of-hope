import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../app.js'

process.env.STORE = 'memory'
const { createStore } = await import('../store.js')

// Fresh app + store per test so rate limits and data never leak between tests.
async function start() {
  const store = createStore()
  const sent = []
  const mailer = { send: async (m) => sent.push(m), toTeam: async (subject, text) => sent.push({ team: true, subject, text }) }
  const server = createApp({ store, mailer }).listen(0)
  await new Promise((r) => server.once('listening', r))
  const base = `http://127.0.0.1:${server.address().port}`
  const post = (path, body, raw) =>
    fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw ?? JSON.stringify(body) })
  return { store, sent, post, base, close: () => { server.closeAllConnections(); server.close() } }
}

const volunteer = { name: 'Asha', email: 'Asha@Example.com', interests: ['Teaching', 'Teaching'], availability: ['Weekends'] }
const donation = { name: 'Ravi', email: 'ravi@example.com', amount: 1000, recurring: true, method: 'UPI' }

test('volunteer: stores normalised record, returns reference, sends mail', async (t) => {
  const s = await start()
  t.after(s.close)
  const res = await s.post('/api/volunteers', volunteer)
  const body = await res.json()
  assert.equal(res.status, 201)
  assert.match(body.reference, /^VOL-[0-9A-F]{10}$/)
  const saved = s.store.data.get(`volunteers/${body.reference}`)
  assert.equal(saved.email, 'asha@example.com')
  assert.deepEqual(saved.interests, ['Teaching'])
  assert.equal(s.sent.length, 2)
})

test('volunteer: rejects unknown interest and missing name', async (t) => {
  const s = await start()
  t.after(s.close)
  assert.equal((await s.post('/api/volunteers', { ...volunteer, interests: ['Hacking'] })).status, 400)
  const { name, ...noName } = volunteer
  const res = await s.post('/api/volunteers', noName)
  assert.equal(res.status, 400)
  assert.equal((await res.json()).field, 'name')
})

test('donation: stored as a pledge, not a payment', async (t) => {
  const s = await start()
  t.after(s.close)
  const res = await s.post('/api/donations', donation)
  const body = await res.json()
  assert.equal(res.status, 201)
  const saved = s.store.data.get(`donations/${body.reference}`)
  assert.equal(saved.status, 'pledged')
  assert.equal(saved.amount, 1000)
  assert.equal(saved.recurring, true)
})

test('donation: enforces amount bounds and integer rupees', async (t) => {
  const s = await start()
  t.after(s.close)
  for (const amount of [99, 500001, 10.5, '1000', -5]) {
    assert.equal((await s.post('/api/donations', { ...donation, amount })).status, 400, `amount ${amount}`)
  }
})

test('subscribers: idempotent on repeat and case-insensitive', async (t) => {
  const s = await start()
  t.after(s.close)
  assert.equal((await s.post('/api/subscribers', { email: 'a@b.com' })).status, 201)
  assert.equal((await s.post('/api/subscribers', { email: 'A@B.com' })).status, 201)
  assert.equal(s.store.data.size, 1)
  assert.equal((await s.post('/api/subscribers', { email: 'nope' })).status, 400)
})

test('contact: validates message length and stores', async (t) => {
  const s = await start()
  t.after(s.close)
  assert.equal((await s.post('/api/contact', { name: 'A', email: 'a@b.com', message: 'short' })).status, 400)
  const res = await s.post('/api/contact', { name: 'A', email: 'a@b.com', message: 'Hello, I would like to partner.' })
  assert.equal(res.status, 201)
})

test('malformed JSON and oversized bodies return 4xx, not 500', async (t) => {
  const s = await start()
  t.after(s.close)
  assert.equal((await s.post('/api/subscribers', null, '{bad json')).status, 400)
  assert.equal((await s.post('/api/contact', null, JSON.stringify({ message: 'x'.repeat(20000) }))).status, 413)
})

test('rate limit kicks in after 10 writes per minute', async (t) => {
  const s = await start()
  t.after(s.close)
  const codes = []
  for (let i = 0; i < 12; i++) codes.push((await s.post('/api/subscribers', { email: `u${i}@b.com` })).status)
  assert.equal(codes.filter((c) => c === 429).length, 2)
})

test('security headers and unknown api route', async (t) => {
  const s = await start()
  t.after(s.close)
  const res = await fetch(s.base + '/api/nope')
  assert.equal(res.status, 404)
  assert.match(res.headers.get('content-security-policy'), /script-src 'self'/)
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff')
  assert.equal(res.headers.get('x-powered-by'), null)
  assert.equal((await fetch(s.base + '/healthz')).status, 200)
})
