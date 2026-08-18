import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Sparkles } from 'lucide-react'

const navLinks = [
  { label: 'Our Impact', href: '#impact' },
  { label: 'Programs', href: '#programs' },
  { label: 'Stories', href: '#stories' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-expo-out ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="A Ray of Hope — Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-saffron/20 group-hover:bg-saffron/30 transition-colors duration-300" />
              <Sparkles
                size={16}
                className="text-saffron relative z-10"
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display italic text-lg text-cream-DEFAULT tracking-tight">
                A Ray of Hope
              </span>
              <span className="text-2xs text-fg-muted tracking-widest uppercase font-body font-medium">
                Charitable Trust
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-fg-secondary hover:text-cream-DEFAULT transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#volunteer"
              className="text-sm font-body font-semibold text-fg-secondary hover:text-saffron transition-colors duration-200 px-4 py-2"
            >
              Volunteer
            </a>
            <a
              href="#donate"
              id="nav-donate-cta"
              className="flex items-center gap-2 bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-glow-gold-sm"
            >
              <Heart size={14} strokeWidth={2.5} aria-hidden="true" />
              Donate
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden w-10 h-10 flex items-center justify-center text-fg-secondary hover:text-cream-DEFAULT transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <Menu size={20} strokeWidth={2} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            className="fixed inset-0 z-40 bg-canvas flex flex-col pt-20 pb-10 px-6"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav
              className="flex flex-col gap-1 flex-1"
              aria-label="Mobile primary navigation"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-display italic text-display-md text-cream-DEFAULT hover:text-saffron transition-colors duration-200 py-3 border-b border-canvas-border"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-6">
              <a
                href="#volunteer"
                className="w-full text-center border border-canvas-border text-fg-secondary font-body font-semibold py-4 rounded-xl hover:border-saffron hover:text-cream-DEFAULT transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Volunteer
              </a>
              <a
                href="#donate"
                className="w-full text-center bg-saffron text-canvas font-body font-semibold py-4 rounded-xl hover:bg-saffron-light transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Donate Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
