import nodemailer from 'nodemailer'

// Email is optional. Without SMTP_URL (e.g. smtps://user:pass@smtp.example.com)
// messages are logged and skipped, so the API still works. All bodies are
// plain text on purpose: user input is never rendered as HTML.

const SEND_TIMEOUT_MS = 5000

export function createMailer() {
  const url = process.env.SMTP_URL
  const from = process.env.MAIL_FROM || 'A Ray of Hope <no-reply@arayofhope.org>'
  const notifyTo = process.env.NOTIFY_TO
  const transport = url ? nodemailer.createTransport(url) : null

  async function send(message) {
    if (!transport) {
      console.log(JSON.stringify({ severity: 'INFO', msg: 'mail skipped (SMTP_URL not set)', subject: message.subject }))
      return
    }
    try {
      // Awaited, not fire-and-forget: Cloud Run may throttle CPU once the response is sent.
      await Promise.race([
        transport.sendMail({ from, ...message }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('mail timeout')), SEND_TIMEOUT_MS)),
      ])
    } catch (err) {
      // A mail failure must never fail the request: the record is already saved.
      console.error(JSON.stringify({ severity: 'ERROR', msg: 'mail failed', subject: message.subject, error: err.message }))
    }
  }

  const toTeam = (subject, text) => (notifyTo ? send({ to: notifyTo, subject, text }) : Promise.resolve())

  return { send, toTeam }
}
