import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Shield, FileText, ArrowRight, Check } from 'lucide-react'

const tiers = [
  {
    id: 't500',
    amount: 500,
    label: '₹500',
    impact: 'Learning materials for one child for a month',
    detail: 'Textbooks, stationery, and access to our digital library.',
  },
  {
    id: 't1000',
    amount: 1000,
    label: '₹1,000',
    impact: 'One month of classroom support',
    detail: 'Teaching aids, activity kits, and educator materials.',
    popular: true,
  },
  {
    id: 't2500',
    amount: 2500,
    label: '₹2,500',
    impact: 'Scholarship contribution for one student',
    detail: 'Tuition support, mentorship, and career guidance sessions.',
  },
  {
    id: 'custom',
    amount: null,
    label: 'Choose',
    impact: 'Your choice, your impact',
    detail: 'Every rupee goes directly to programme delivery.',
  },
]

const trustBadges = [
  { icon: Shield, label: '80G Benefits', sub: 'Tax deductible donation' },
  { icon: FileText, label: 'Annual Reports', sub: 'Full transparency' },
  { icon: Check, label: 'FCRA Registered', sub: 'Government certified' },
]

// Unsplash — child studying
const DONATE_IMAGE =
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80&auto=format&fit=crop'

export default function DonateCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState('t1000')
  const [customAmount, setCustomAmount] = useState('')
  const [recurring, setRecurring] = useState(false)
  // idle | checkout | confirmed
  const [donateState, setDonateState] = useState('idle')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')

  const resolvedAmount =
    selected === 'custom'
      ? customAmount ? `₹${customAmount}` : '₹—'
      : tiers.find((t) => t.id === selected)?.label

  const handleDonateClick = () => {
    if (selected === 'custom' && !customAmount) return
    setDonateState('checkout')
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    setDonateState('confirmed')
  }

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 bg-canvas-elevated overflow-hidden"
      id="donate"
      aria-labelledby="donate-heading"
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left — donation form */}
          <div className="flex-1 w-full max-w-lg order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section label + heading — always visible */}
              <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-4">
                Donate
              </p>
              <h2
                id="donate-heading"
                className="font-display italic text-display-lg text-cream-DEFAULT mb-8"
              >
                Give hope a number.
              </h2>

              {/* AnimatePresence switches idle / checkout / confirmed */}
              <AnimatePresence mode="wait">

                {/* ── IDLE STATE ── */}
                {donateState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Recurring toggle */}
                    <div className="flex items-center gap-3 mb-7">
                      <button
                        className={`px-4 py-2 rounded-full text-sm font-body font-medium border transition-all duration-200 ${
                          !recurring
                            ? 'bg-saffron/15 border-saffron text-saffron'
                            : 'border-canvas-border text-fg-muted hover:border-fg-muted'
                        }`}
                        onClick={() => setRecurring(false)}
                        aria-pressed={!recurring}
                      >
                        One-time
                      </button>
                      <button
                        className={`px-4 py-2 rounded-full text-sm font-body font-medium border transition-all duration-200 ${
                          recurring
                            ? 'bg-saffron/15 border-saffron text-saffron'
                            : 'border-canvas-border text-fg-muted hover:border-fg-muted'
                        }`}
                        onClick={() => setRecurring(true)}
                        aria-pressed={recurring}
                      >
                        Monthly ✦
                      </button>
                    </div>

                    {/* Tier cards */}
                    <div
                      className="grid grid-cols-2 gap-3 mb-5"
                      role="radiogroup"
                      aria-label="Donation amount"
                    >
                      {tiers.map((tier) => (
                        <button
                          key={tier.id}
                          role="radio"
                          aria-checked={selected === tier.id}
                          className={`donation-tier relative text-left rounded-xl border p-4 flex flex-col gap-1.5 ${
                            selected === tier.id
                              ? 'selected border-saffron bg-saffron/5'
                              : 'border-canvas-border hover:border-saffron/40'
                          }`}
                          onClick={() => setSelected(tier.id)}
                        >
                          {tier.popular && (
                            <span className="absolute -top-2.5 left-3 bg-saffron text-canvas text-2xs font-body font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                              Most popular
                            </span>
                          )}
                          <span className="font-display italic text-xl text-cream-DEFAULT">{tier.label}</span>
                          <span className="text-fg-secondary text-xs font-body leading-snug">{tier.impact}</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom amount input */}
                    {selected === 'custom' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-5"
                      >
                        <label htmlFor="custom-amount" className="sr-only">Enter custom amount in rupees</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted font-body text-lg" aria-hidden="true">₹</span>
                          <input
                            id="custom-amount"
                            type="number"
                            min="100"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            /* Hide browser number spinners */
                            className="w-full bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3.5 pl-9 text-cream-DEFAULT font-body text-base placeholder:text-fg-muted focus:border-saffron outline-none transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            aria-label="Custom donation amount in rupees"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Selected tier detail */}
                    {selected !== 'custom' && (
                      <div className="mb-5 bg-canvas-surface rounded-xl px-4 py-3 border border-canvas-border">
                        <p className="text-fg-secondary text-sm font-body">
                          {tiers.find((t) => t.id === selected)?.detail}
                        </p>
                      </div>
                    )}

                    {/* CTA button */}
                    <button
                      id="donate-submit-cta"
                      className="w-full flex items-center justify-center gap-2.5 bg-saffron hover:bg-saffron-light text-canvas font-body font-bold text-base py-4 rounded-xl transition-all duration-200 hover:shadow-glow-gold disabled:opacity-40 disabled:cursor-not-allowed"
                      onClick={handleDonateClick}
                      disabled={selected === 'custom' && !customAmount}
                      aria-label={`Donate ${resolvedAmount}`}
                    >
                      <Heart size={18} strokeWidth={2.5} aria-hidden="true" />
                      {recurring ? 'Start Monthly Giving' : 'Donate Now'} · {resolvedAmount}
                    </button>

                    {/* Payment methods */}
                    <p className="text-center text-fg-muted text-xs font-body mt-4">
                      UPI · Razorpay · Credit Card · Net Banking · Secure & encrypted
                    </p>
                  </motion.div>
                )}

                {/* ── CHECKOUT STATE ── */}
                {donateState === 'checkout' && (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Summary pill */}
                    <div className="flex items-center gap-3 mb-6 bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3">
                      <div className="w-9 h-9 rounded-lg bg-saffron/15 flex items-center justify-center flex-shrink-0">
                        <Heart size={16} className="text-saffron" strokeWidth={2} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-cream-DEFAULT font-body font-semibold text-sm">
                          {recurring ? 'Monthly' : 'One-time'} · {resolvedAmount}
                        </p>
                        <p className="text-fg-muted text-xs font-body truncate">
                          {tiers.find((t) => t.id === selected)?.impact ?? 'Custom contribution'}
                        </p>
                      </div>
                      <button
                        className="text-fg-muted hover:text-cream-DEFAULT text-xs font-body underline flex-shrink-0"
                        onClick={() => setDonateState('idle')}
                        aria-label="Change donation amount"
                      >
                        Change
                      </button>
                    </div>

                    <form
                      onSubmit={handleCheckoutSubmit}
                      className="flex flex-col gap-4"
                      aria-label="Donation details form"
                    >
                      <div>
                        <label htmlFor="donor-name" className="sr-only">Full name</label>
                        <input
                          id="donor-name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Full Name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3.5 text-cream-DEFAULT font-body text-sm placeholder:text-fg-muted focus:border-saffron outline-none transition-colors"
                          aria-label="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="donor-email" className="sr-only">Email address</label>
                        <input
                          id="donor-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="Email Address"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3.5 text-cream-DEFAULT font-body text-sm placeholder:text-fg-muted focus:border-saffron outline-none transition-colors"
                          aria-label="Your email address"
                        />
                      </div>

                      {/* Payment method selector */}
                      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Payment method">
                        {['UPI', 'Card', 'Net Banking'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            role="radio"
                            aria-checked={donorEmail && method === 'UPI'}
                            className="border border-canvas-border rounded-lg py-2.5 text-xs font-body font-medium text-fg-secondary hover:border-saffron/50 hover:text-cream-muted transition-all"
                          >
                            {method}
                          </button>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2.5 bg-saffron hover:bg-saffron-light text-canvas font-body font-bold text-base py-4 rounded-xl transition-all duration-200 hover:shadow-glow-gold disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={!donorName || !donorEmail}
                        aria-label={`Complete donation of ${resolvedAmount}`}
                      >
                        <Heart size={18} strokeWidth={2.5} aria-hidden="true" />
                        Pay {resolvedAmount} Securely
                      </button>

                      <p className="text-center text-fg-muted text-xs font-body">
                        256-bit SSL encrypted · 80G receipt by email · Refundable within 24h
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* ── CONFIRMED STATE ── */}
                {donateState === 'confirmed' && (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center gap-5 py-8"
                    role="status"
                    aria-live="polite"
                    aria-label="Donation confirmed"
                  >
                    <div className="w-16 h-16 rounded-full bg-saffron/20 flex items-center justify-center">
                      <Check size={28} className="text-saffron" strokeWidth={2.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display italic text-2xl text-cream-DEFAULT mb-2">
                        Thank you{donorName ? `, ${donorName.split(' ')[0]}` : ''}!
                      </h3>
                      <p className="text-fg-secondary text-sm font-body leading-relaxed max-w-xs mx-auto">
                        Your {recurring ? 'monthly' : ''} gift of <strong className="text-cream-muted">{resolvedAmount}</strong> will go directly to programme delivery. A receipt will be sent to <strong className="text-cream-muted">{donorEmail}</strong>.
                      </p>
                    </div>
                    <div className="w-full bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3 text-left">
                      <p className="text-fg-muted text-xs font-body">
                        80G certificate will be sent within 7 working days · Reference: #{Math.floor(Math.random() * 900000) + 100000}
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right — image + trust */}
          <motion.div
            className="flex-1 order-1 lg:order-2 flex flex-col gap-8"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={DONATE_IMAGE}
                alt="A child studying by candlelight — your donation brings them proper lighting, books, and a future."
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 story-card-overlay" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <p className="font-display italic text-lg text-cream-DEFAULT leading-tight">
                  "Education is the one thing no one can take from them."
                </p>
                <p className="text-fg-muted text-xs font-body mt-1">— Priya Deshpande, Programme Director</p>
              </div>
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-3 gap-3"
              role="list"
              aria-label="Trust and transparency indicators"
            >
              {trustBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <div
                    key={badge.label}
                    role="listitem"
                    className="bg-canvas-surface border border-canvas-border rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                  >
                    <Icon size={18} className="text-saffron" strokeWidth={1.75} aria-hidden="true" />
                    <p className="font-body font-semibold text-cream-muted text-xs">{badge.label}</p>
                    <p className="font-body text-fg-muted text-2xs">{badge.sub}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
