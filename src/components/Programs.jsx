import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Users, GraduationCap, Monitor, ArrowRight } from 'lucide-react'

const programs = [
  {
    id: 'school-support',
    icon: BookOpen,
    title: 'School Support',
    tagline: 'Infrastructure that unlocks learning.',
    description:
      'Classroom upgrades, learning materials, libraries, and science labs for under-resourced government schools across Maharashtra and beyond.',
    metric: '180+ schools',
    metricLabel: 'equipped since 2018',
    // Warm cream-gold variant — distinct from saffron, still within the brand warmth
    color: 'from-[#E8C97A]/10 to-[#E8C97A]/3',
    accentColor: '#E8C97A',
  },
  {
    id: 'teacher-training',
    icon: Users,
    title: 'Teacher Training',
    tagline: 'Modern methods. Lifelong impact.',
    description:
      'Workshops, mentorship, and digital tools that empower educators to teach with confidence, creativity, and lasting effect.',
    metric: '1,200+ teachers',
    metricLabel: 'trained and certified',
    // Primary saffron — the signature brand accent
    color: 'from-saffron/12 to-saffron/3',
    accentColor: '#F5A623',
  },
  {
    id: 'scholarships',
    icon: GraduationCap,
    title: 'Scholarships',
    tagline: 'Potential, not circumstance.',
    description:
      'Financial support for academically gifted students from low-income families, covering tuition, materials, and mentorship.',
    metric: '3,400+ scholars',
    metricLabel: 'supported to date',
    // Deep warm terracotta — grounded, human, non-tech
    color: 'from-[#D4856A]/10 to-[#D4856A]/3',
    accentColor: '#D4856A',
  },
  {
    id: 'digital-literacy',
    icon: Monitor,
    title: 'Digital Literacy',
    tagline: 'Technology as a right, not a privilege.',
    description:
      'Computer labs, internet access, and coding education reaching communities where a screen was once a luxury.',
    metric: '42 digital hubs',
    metricLabel: 'across 8 states',
    // Sky-hope blue — the one cool tone, kept muted and anchored to the palette
    color: 'from-sky-hope/10 to-sky-hope/3',
    accentColor: '#5B8FF9',
  },
]

function ProgramCard({ program, index }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = program.icon

  return (
    <motion.article
      ref={ref}
      className={`relative rounded-2xl bg-canvas-elevated border border-canvas-border p-7 sm:p-8 flex flex-col gap-5 cursor-pointer transition-all duration-300`}
      style={{
        boxShadow: hovered
          ? `0 0 0 1px ${program.accentColor}40, 0 12px 48px rgba(0,0,0,0.5)`
          : undefined,
        borderColor: hovered ? `${program.accentColor}60` : undefined,
      }}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={`Program: ${program.title} — ${program.tagline}`}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${program.color} opacity-0 transition-opacity duration-300`}
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
          style={{ background: `${program.accentColor}18` }}
        >
          <Icon
            size={22}
            strokeWidth={1.75}
            style={{ color: program.accentColor }}
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="font-display italic text-xl text-cream-DEFAULT leading-tight">
            {program.title}
          </h3>
          <p className="font-body font-medium text-sm text-fg-secondary">
            {program.tagline}
          </p>
        </div>

        <p className="font-body text-sm text-fg-secondary leading-relaxed">
          {program.description}
        </p>

        {/* Metric */}
        <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
          <div>
            <p className="font-display italic text-lg leading-tight" style={{ color: program.accentColor }}>
              {program.metric}
            </p>
            <p className="text-fg-muted text-xs font-body mt-0.5">{program.metricLabel}</p>
          </div>
          <motion.div
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={18} strokeWidth={2} className="text-fg-muted" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Programs() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      className="py-24 sm:py-32 bg-canvas-surface"
      id="programs"
      aria-labelledby="programs-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-4">
            What We Do
          </p>
          <h2
            id="programs-heading"
            className="font-display italic text-display-lg text-cream-DEFAULT max-w-2xl"
          >
            Four programmes. One mission.
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          role="list"
          aria-label="Our programs"
        >
          {programs.map((program, i) => (
            <div key={program.id} role="listitem">
              <ProgramCard program={program} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
