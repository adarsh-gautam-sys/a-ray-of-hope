import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 10, suffix: '', label: 'States Reached', description: 'Across India' },
  { value: 35, suffix: '+', label: 'Active Projects', description: 'Schools & communities' },
  { value: 65, suffix: '+', label: 'Communities', description: 'Transformed by education' },
  { value: 20000, suffix: '+', label: 'Lives Touched', description: 'And counting' },
]

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

function AnimatedCounter({ target, suffix, duration = 2000, start }) {
  const [count, setCount] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => {
    if (!start) return
    prevRef.current = 0
    setCount(0)

    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Expo-out easing
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(eased * target)
      setCount(current)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return (
    <span className="tabular-nums">
      {formatNumber(count)}
      {suffix}
    </span>
  )
}

export default function ImpactCounters() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="impact"
      className="relative py-24 sm:py-32 bg-canvas-surface overflow-hidden"
      aria-label="Impact statistics"
    >
      {/* Background accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,166,35,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section label */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-4">
            Our Reach
          </p>
          <h2 className="font-display italic text-display-lg text-cream-DEFAULT max-w-2xl">
            Real impact, verifiable numbers.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-canvas-border rounded-2xl overflow-hidden"
          role="list"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative bg-canvas-surface p-8 sm:p-10 lg:p-12 flex flex-col gap-2 group"
              role="listitem"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(245,166,35,0.05), transparent 70%)' }}
                aria-hidden="true"
              />

              <div
                className="font-display italic font-light text-saffron leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} start={inView} duration={1800 + i * 200} />
              </div>

              <p className="font-body font-semibold text-cream-DEFAULT text-base sm:text-lg">
                {stat.label}
              </p>
              <p className="font-body text-fg-muted text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transparent note */}
        <motion.p
          className="mt-6 text-fg-muted text-xs font-body text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Numbers reflect cumulative reach as of 2024. Annual reports available on request.
        </motion.p>
      </div>
    </section>
  )
}
