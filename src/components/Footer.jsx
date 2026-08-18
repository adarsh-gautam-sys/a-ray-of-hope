import { useState } from 'react'
import { Sparkles, Twitter, Instagram, Linkedin, Youtube, Heart, Check } from 'lucide-react'

const footerLinks = {
  'What We Do': [
    { label: 'School Support', href: '#programs' },
    { label: 'Teacher Training', href: '#programs' },
    { label: 'Scholarships', href: '#programs' },
    { label: 'Digital Literacy', href: '#programs' },
  ],
  'Get Involved': [
    { label: 'Volunteer', href: '#volunteer' },
    { label: 'Donate', href: '#donate' },
    { label: 'Corporate Partnership', href: '#partner' },
    { label: 'Events', href: '#events' },
  ],
  'Know More': [
    { label: 'Our Story', href: '#story' },
    { label: 'Impact', href: '#impact' },
    { label: 'Annual Reports', href: '#publications' },
    { label: 'Contact', href: '#contact' },
  ],
}

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer() {
  const [newsletterDone, setNewsletterDone] = useState(false)
  return (
    <footer
      className="bg-canvas-DEFAULT border-t border-canvas-border pt-16 sm:pt-20 pb-10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 border-b border-canvas-border">
          {/* Brand */}
          <div className="flex-shrink-0 max-w-xs">
            <a
              href="#"
              className="flex items-center gap-2.5 mb-5 group"
              aria-label="A Ray of Hope — Home"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-saffron/20" />
                <Sparkles size={16} className="text-saffron relative z-10" strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display italic text-lg text-cream-DEFAULT tracking-tight">
                  A Ray of Hope
                </span>
                <span className="text-2xs text-fg-muted tracking-widest uppercase font-body">
                  Charitable Trust
                </span>
              </div>
            </a>

            <p className="font-display italic text-cream-muted text-base leading-relaxed mb-6">
              Education changes lives. Hope changes futures. Since 2014, operating across 10 states, 35 projects, 65 communities.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-cream-DEFAULT font-body font-semibold text-sm mb-3">
                Stay informed
              </p>
              {newsletterDone ? (
                <div
                  className="flex items-center gap-2 text-saffron text-sm font-body py-2"
                  role="status"
                  aria-live="polite"
                >
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  You&apos;re subscribed — thank you!
                </div>
              ) : (
                <form
                  className="flex gap-2"
                  onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true) }}
                  aria-label="Newsletter signup"
                >
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="flex-1 min-w-0 bg-canvas-elevated border border-canvas-border rounded-lg px-4 py-2.5 text-sm text-cream-DEFAULT placeholder:text-fg-muted focus:border-saffron outline-none transition-colors font-body"
                    aria-label="Email address for newsletter"
                    required
                  />
                  <button
                    type="submit"
                    id="footer-newsletter-submit"
                    className="bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors duration-200 flex-shrink-0"
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([section, links]) => (
              <nav key={section} aria-label={`${section} links`}>
                <h3 className="font-body font-semibold text-cream-DEFAULT text-sm mb-4 tracking-wide">
                  {section}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body text-fg-muted text-sm hover:text-cream-muted transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex flex-col gap-1">
            <p className="font-body text-fg-muted text-xs">
              © {new Date().getFullYear()} A Ray of Hope Charitable Trust. All rights reserved.
            </p>
            <p className="font-body text-fg-muted text-xs">
              Registered under the Indian Trusts Act · 80G · FCRA · CIN: [Registration Number]
            </p>
          </div>

          <div className="flex items-center gap-5">
            {/* Social */}
            <div
              className="flex items-center gap-4"
              role="list"
              aria-label="Social media links"
            >
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-saffron transition-colors duration-200"
                  aria-label={`Follow us on ${label}`}
                  role="listitem"
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Made with love */}
            <span className="text-fg-muted text-xs font-body flex items-center gap-1">
              Made with <Heart size={11} className="text-saffron" fill="currentColor" aria-hidden="true" /> for India's children
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
