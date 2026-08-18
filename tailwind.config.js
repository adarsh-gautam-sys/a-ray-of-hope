/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Visual world: Deep editorial navy ground, saffron/gold accent
        canvas: {
          DEFAULT: '#0A0C14',
          surface: '#111520',
          elevated: '#161B2E',
          border: '#1E2640',
        },
        saffron: {
          DEFAULT: '#F5A623',
          light: '#FFC84A',
          dark: '#D4891C',
          muted: '#F5A62320',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted: '#C8C0B0',
          faint: '#8A8070',
        },
        sky: {
          hope: '#5B8FF9',
        },
        // Named semantic roles
        fg: {
          DEFAULT: '#F5F0E8',
          secondary: '#C8C0B0',
          muted: '#8A8070',
        },
      },
      fontFamily: {
        display: ['"Crimson Pro"', 'Georgia', 'serif'],
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        ui: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1' }],
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        wide: '0.08em',
        widest: '0.15em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-vignette': 'linear-gradient(to bottom, transparent 40%, rgba(10,12,20,0.9) 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'counter-pulse': 'counterPulse 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        counterPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      boxShadow: {
        'glow-gold': '0 0 40px 8px rgba(245, 166, 35, 0.12)',
        'glow-gold-sm': '0 0 20px 4px rgba(245, 166, 35, 0.1)',
        'card': '0 4px 24px 0 rgba(0,0,0,0.4)',
        'card-hover': '0 12px 48px 0 rgba(0,0,0,0.6)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
