import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { post } from '../lib/api'

const fieldClass =
  'w-full bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3.5 text-cream-DEFAULT font-body text-sm placeholder:text-fg-muted focus:border-saffron outline-none transition-colors'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await post('/contact', form)
      setReference(res.reference)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 sm:py-32 bg-canvas-DEFAULT"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        <motion.div
          className="flex-1 max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-4">Contact</p>
          <h2 id="contact-heading" className="font-display italic text-display-lg text-cream-DEFAULT mb-6">
            Questions, partnerships, or just hello.
          </h2>
          <p className="font-body text-fg-secondary text-lg leading-relaxed">
            Schools, CSR teams and curious supporters: write to us and a real person will reply.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 w-full max-w-lg"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-canvas-elevated rounded-2xl border border-canvas-border p-7 sm:p-8">
            {reference ? (
              <div className="flex flex-col items-center text-center gap-5" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full bg-saffron/20 flex items-center justify-center">
                  <Check size={28} className="text-saffron" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display italic text-xl text-cream-DEFAULT mb-2">Message sent</h3>
                  <p className="text-fg-secondary text-sm font-body leading-relaxed">
                    Thank you. We'll reply to <strong className="text-cream-muted">{form.email}</strong> soon.
                  </p>
                </div>
                <p className="text-fg-muted text-xs font-body">Reference {reference}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3" aria-label="Contact form">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-saffron/15 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={16} className="text-saffron" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="font-display italic text-xl text-cream-DEFAULT">Send us a message</h3>
                </div>
                <label htmlFor="contact-name" className="sr-only">Full name</label>
                <input id="contact-name" type="text" required maxLength={100} autoComplete="name"
                  placeholder="Full name" value={form.name} onChange={update('name')} className={fieldClass} />
                <label htmlFor="contact-email" className="sr-only">Email address</label>
                <input id="contact-email" type="email" required autoComplete="email"
                  placeholder="your@email.com" value={form.email} onChange={update('email')} className={fieldClass} />
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea id="contact-message" required minLength={10} maxLength={2000} rows={5}
                  placeholder="How can we help?" value={form.message} onChange={update('message')}
                  className={`${fieldClass} resize-y`} />
                {error && <p role="alert" className="text-red-400 text-sm font-body">{error}</p>}
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={sending}
                  className="w-full bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {sending ? 'Sending…' : 'Send message'}
                  {!sending && <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
