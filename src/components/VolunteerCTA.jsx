import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Mail } from 'lucide-react'

const interests = [
  'Teaching', 'Event Support', 'Fundraising', 'Digital Marketing', 'Photography', 'Research',
]
const availability = [
  'Weekends', 'Remote / Online', 'Full-time', 'One-day Events',
]

// Unsplash image — volunteers with children
const VOLUNTEER_IMAGE =
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80&auto=format&fit=crop'

export default function VolunteerCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [selectedAvailability, setSelectedAvailability] = useState([])
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleInterest = (item) =>
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )

  const toggleAvailability = (item) =>
    setSelectedAvailability((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 bg-canvas-surface overflow-hidden"
      id="volunteer"
      aria-labelledby="volunteer-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={VOLUNTEER_IMAGE}
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-canvas-surface/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left — copy */}
          <motion.div
            className="flex-1 max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-4">
              Volunteer
            </p>
            <h2
              id="volunteer-heading"
              className="font-display italic text-display-lg text-cream-DEFAULT mb-6"
            >
              Your skills can write a child's future chapter.
            </h2>
            <p className="font-body text-fg-secondary text-lg leading-relaxed mb-8">
              Whether you teach, design, photograph, or simply show up — there is a role shaped exactly for you. We match volunteers to opportunities that fit their life.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-3">
              {[
                'Verified placement within 3 days',
                'Flexible — remote and in-person options',
                'Community of 2,400+ active volunteers',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-saffron" strokeWidth={3} aria-hidden="true" />
                  </div>
                  <p className="text-fg-secondary text-sm font-body">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — interactive mini-wizard */}
          <motion.div
            className="flex-1 w-full max-w-lg"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-canvas-elevated rounded-2xl border border-canvas-border p-7 sm:p-8">
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-7">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-2xs font-body font-bold transition-all duration-300 ${
                        s < step
                          ? 'bg-saffron text-canvas'
                          : s === step
                          ? 'bg-saffron/20 border border-saffron text-saffron'
                          : 'bg-canvas-border text-fg-muted'
                      }`}
                      aria-current={s === step ? 'step' : undefined}
                    >
                      {s < step ? <Check size={12} strokeWidth={3} aria-hidden="true" /> : s}
                    </div>
                    {s < 3 && <div className={`flex-1 h-px w-6 transition-colors duration-300 ${s < step ? 'bg-saffron' : 'bg-canvas-border'}`} aria-hidden="true" />}
                  </div>
                ))}
                <p className="ml-2 text-fg-muted text-xs font-body">Step {step} of 3</p>
              </div>

              {/* Step 1 — Interests */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display italic text-xl text-cream-DEFAULT mb-2">What do you love doing?</h3>
                  <p className="text-fg-muted text-sm font-body mb-5">Select all that apply.</p>
                  <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Select your interests">
                    {interests.map((item) => (
                      <button
                        key={item}
                        className={`px-4 py-2 rounded-full border text-sm font-body font-medium transition-all duration-200 ${
                          selectedInterests.includes(item)
                            ? 'bg-saffron/15 border-saffron text-saffron'
                            : 'border-canvas-border text-fg-secondary hover:border-saffron/50'
                        }`}
                        onClick={() => toggleInterest(item)}
                        aria-pressed={selectedInterests.includes(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <button
                    className="w-full bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold py-3.5 rounded-xl transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={() => setStep(2)}
                    disabled={selectedInterests.length === 0}
                    aria-label="Continue to availability"
                  >
                    Next
                    <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                  </button>
                </motion.div>
              )}

              {/* Step 2 — Availability */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display italic text-xl text-cream-DEFAULT mb-2">When can you volunteer?</h3>
                  <p className="text-fg-muted text-sm font-body mb-5">Select all that apply.</p>
                  <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Select your availability">
                    {availability.map((item) => (
                      <button
                        key={item}
                        className={`px-4 py-2 rounded-full border text-sm font-body font-medium transition-all duration-200 ${
                          selectedAvailability.includes(item)
                            ? 'bg-saffron/15 border-saffron text-saffron'
                            : 'border-canvas-border text-fg-secondary hover:border-saffron/50'
                        }`}
                        onClick={() => toggleAvailability(item)}
                        aria-pressed={selectedAvailability.includes(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 border border-canvas-border text-fg-secondary hover:text-cream-DEFAULT font-body font-semibold py-3.5 rounded-xl transition-colors duration-200"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className="flex-2 flex-1 bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold py-3.5 rounded-xl transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      onClick={() => setStep(3)}
                      disabled={selectedAvailability.length === 0}
                    >
                      Find my match
                      <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-saffron/15 flex items-center justify-center">
                    <Check size={28} className="text-saffron" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display italic text-xl text-cream-DEFAULT mb-2">We have opportunities for you!</h3>
                    <p className="text-fg-secondary text-sm font-body leading-relaxed">
                      Based on your interests in <strong className="text-cream-muted">{selectedInterests.slice(0, 2).join(', ')}</strong> and your <strong className="text-cream-muted">{selectedAvailability[0]}</strong> availability, we have matching roles.
                    </p>
                  </div>
                  <button
                    className="w-full bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                    id="volunteer-submit-cta"
                    onClick={() => setStep(4)}
                  >
                    Complete Your Application
                    <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                  </button>
                  <button
                    className="text-fg-muted text-sm font-body hover:text-fg-secondary transition-colors"
                    onClick={() => { setStep(1); setSelectedInterests([]); setSelectedAvailability([]) }}
                  >
                    Start over
                  </button>
                </motion.div>
              )}

              {/* Step 4 — Email form */}
              {step === 4 && !submitted && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-saffron/15 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-saffron" strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display italic text-xl text-cream-DEFAULT leading-tight">Almost there</h3>
                      <p className="text-fg-muted text-xs font-body">We'll match you and reach out within 3 days.</p>
                    </div>
                  </div>

                  <div className="bg-canvas-surface rounded-xl px-4 py-3 mb-5 border border-canvas-border">
                    <p className="text-fg-secondary text-sm font-body">
                      <strong className="text-cream-muted">Your profile:</strong> {selectedInterests.join(', ')} · {selectedAvailability.join(', ')}
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                    className="flex flex-col gap-3"
                    aria-label="Volunteer application form"
                  >
                    <div>
                      <label htmlFor="vol-email" className="sr-only">Email address</label>
                      <input
                        id="vol-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-canvas-elevated border border-canvas-border rounded-xl px-4 py-3.5 text-cream-DEFAULT font-body text-sm placeholder:text-fg-muted focus:border-saffron outline-none transition-colors"
                        aria-label="Your email address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-40"
                      disabled={!email}
                    >
                      Send My Application
                      <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="text-fg-muted text-sm font-body hover:text-fg-secondary transition-colors"
                      onClick={() => setStep(3)}
                    >
                      ← Back
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 4 submitted — Success state */}
              {step === 4 && submitted && (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center gap-5"
                  role="status"
                  aria-live="polite"
                  aria-label="Application submitted successfully"
                >
                  <div className="w-16 h-16 rounded-full bg-saffron/20 flex items-center justify-center">
                    <Check size={28} className="text-saffron" strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display italic text-xl text-cream-DEFAULT mb-2">Application sent!</h3>
                    <p className="text-fg-secondary text-sm font-body leading-relaxed max-w-xs mx-auto">
                      We've received your application for <strong className="text-cream-muted">{selectedInterests.slice(0, 2).join(' & ')}</strong>. Our team will reach out to <strong className="text-cream-muted">{email}</strong> within 3 business days.
                    </p>
                  </div>
                  <div className="w-full bg-canvas-surface border border-canvas-border rounded-xl px-4 py-3">
                    <p className="text-fg-muted text-xs font-body">Reference #{Math.floor(Math.random() * 90000) + 10000} — save this for your records.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
