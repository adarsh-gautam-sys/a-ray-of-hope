import { createApp } from './app.js'
import { createStore } from './store.js'
import { createMailer } from './mail.js'

const port = Number(process.env.PORT) || 8080
const server = createApp({ store: createStore(), mailer: createMailer() }).listen(port, '0.0.0.0', () =>
  console.log(JSON.stringify({ severity: 'INFO', msg: `listening on ${port}` })),
)

// Cloud Run sends SIGTERM on shutdown; finish in-flight requests first.
process.on('SIGTERM', () => server.close(() => process.exit(0)))
