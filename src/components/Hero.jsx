import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'

// High-quality Unsplash photos — education / India theme
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=85&auto=format&fit=crop'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-label="Hero — One child's education can change an entire future"
    >
      {/* Full-bleed background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yImg }}
        aria-hidden="true"
      >
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 hero-overlay z-10" aria-hidden="true" />
      <div className="absolute inset-0 hero-overlay-side z-10" aria-hidden="true" />

      {/* Subtle grain */}
      <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none" aria-hidden="true">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28"
        style={{ opacity: opacityText }}
      >
        {/* Eyebrow — replaced with a meaningful label, no decorative kicker */}
        <motion.p
          className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-6"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          10 States · 35 Projects · 20,000+ Lives
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-display italic text-display-xl text-cream-DEFAULT max-w-3xl mb-6 leading-none"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          One child's education can change an entire future.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-body text-lg sm:text-xl text-cream-muted max-w-xl mb-10 leading-relaxed"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          Join thousands creating opportunities across India. Your support teaches, funds, and transforms.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0.65}
        >
          <a
            href="#volunteer"
            id="hero-volunteer-cta"
            className="inline-flex items-center justify-center gap-2.5 bg-cream-DEFAULT text-canvas-DEFAULT font-body font-semibold text-base px-8 py-4 rounded-full hover:bg-white transition-all duration-200 hover:shadow-card"
          >
            Become a Volunteer
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
          <a
            href="#donate"
            id="hero-donate-cta"
            className="inline-flex items-center justify-center gap-2.5 border border-cream-DEFAULT/30 hover:border-saffron text-cream-DEFAULT hover:text-saffron font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <Heart size={18} strokeWidth={2} aria-hidden="true" />
            Donate Today
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-fg-muted text-2xs tracking-widest uppercase font-body">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-fg-muted to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        />
      </motion.div>
    </section>
  )
}
