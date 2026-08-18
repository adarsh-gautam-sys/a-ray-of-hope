import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { MapPin, X, Sparkles, Building2, Users, GraduationCap } from 'lucide-react'
import { indiaStates, activeStates } from '../data/india-map-data'

function StateMarker({ state, isActive, isHovered, onHover, onClick }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <g
      transform={`translate(${state.x}, ${state.y})`}
      className="cursor-pointer group"
      onClick={() => onClick(state)}
      onMouseEnter={() => onHover(state.id)}
      onMouseLeave={() => onHover(null)}
      role="button"
      tabIndex={0}
      aria-label={`View impact in ${state.name}`}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(state)
        }
      }}
    >
      {/* Invisible enlarged hit area for easy touch / mouse targets (44x44px minimum) */}
      <circle r={22} fill="transparent" />

      {/* Animated ripple pulse */}
      {!shouldReduceMotion && (
        <circle
          r={12}
          fill="rgba(245, 166, 35, 0.25)"
          className="origin-center animate-ping"
          style={{ animationDuration: '2.8s' }}
        />
      )}

      {/* Outer ambient glow */}
      <circle
        r={isActive ? 14 : isHovered ? 12 : 8}
        fill={isActive ? 'rgba(245, 166, 35, 0.35)' : 'rgba(245, 166, 35, 0.15)'}
        className="transition-all duration-300"
      />

      {/* Core glowing dot */}
      <circle
        r={isActive ? 5.5 : isHovered ? 5 : 3.8}
        fill={isActive ? '#F5A623' : '#F5A623'}
        stroke="#FFF8E7"
        strokeWidth={isActive ? 2 : 1.2}
        className="transition-all duration-200"
        style={{
          filter: isActive
            ? 'drop-shadow(0 0 8px rgba(245, 166, 35, 0.9))'
            : isHovered
            ? 'drop-shadow(0 0 6px rgba(245, 166, 35, 0.8))'
            : 'drop-shadow(0 0 3px rgba(245, 166, 35, 0.5))',
        }}
      />

      {/* Label on hover / active */}
      {(isActive || isHovered) && (
        <g transform="translate(0, -14)" className="pointer-events-none">
          <rect
            x={-state.name.length * 4.2 - 8}
            y={-14}
            width={state.name.length * 8.4 + 16}
            height={20}
            rx={10}
            fill="#0F1522"
            stroke="#F5A623"
            strokeWidth={1}
          />
          <text
            textAnchor="middle"
            y={-1}
            fill="#FFF8E7"
            fontSize="10px"
            fontFamily="inherit"
            fontWeight="600"
            letterSpacing="0.02em"
          >
            {state.name}
          </text>
        </g>
      )}
    </g>
  )
}

export default function ImpactMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)
  const [hoveredStateId, setHoveredStateId] = useState(null)

  const handleSelect = (state) => {
    setSelected((prev) => (prev?.id === state.id ? null : state))
  }

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 bg-canvas-DEFAULT overflow-hidden relative"
      id="impact-map"
      aria-labelledby="map-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-saffron/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase">
              Where We Work
            </p>
          </div>
          <h2
            id="map-heading"
            className="font-display italic text-display-lg text-cream-DEFAULT max-w-2xl mb-4"
          >
            Tap a state. See its story.
          </h2>
          <p className="font-body text-fg-secondary text-base max-w-xl leading-relaxed">
            We operate across 10 key states in India. Every dot represents active schools, dedicated teachers, and children empowered through education.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* ── Interactive India Map Card ── */}
          <motion.div
            className="relative w-full lg:w-[58%] flex-shrink-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-full rounded-3xl bg-canvas-elevated border border-canvas-border shadow-2xl p-4 sm:p-6 overflow-hidden"
              role="region"
              aria-label="Interactive Map of India with authentic state boundaries"
            >
              {/* Subtle top badge */}
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-2xs font-body font-semibold tracking-wider text-fg-muted uppercase flex items-center gap-1.5">
                  <Sparkles size={12} className="text-saffron" />
                  Official Geographic Boundary Map
                </span>
                <span className="text-2xs font-body text-saffron bg-saffron/10 border border-saffron/20 px-2.5 py-0.5 rounded-full font-medium">
                  10 Active States
                </span>
              </div>

              {/* Native SVG Map */}
              <div className="relative w-full" style={{ aspectRatio: '600/700' }}>
                <svg
                  viewBox="0 0 600 700"
                  className="w-full h-full select-none"
                  aria-label="Map of India showing program locations"
                >
                  <defs>
                    {/* Background grid pattern */}
                    <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#161F30" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* Grid background */}
                  <rect width="600" height="700" fill="url(#mapGrid)" opacity="0.6" />

                  {/* ── State boundary paths ── */}
                  <g className="states-group">
                    {indiaStates.map((state) => {
                      const isActive = state.isActive
                      const isSelected = selected?.geoName === state.geoName
                      const isHovered = hoveredStateId && activeStates.find(s => s.id === hoveredStateId)?.geoName === state.geoName

                      return (
                        <path
                          key={state.id}
                          d={state.d}
                          className="transition-colors duration-200"
                          style={{
                            fill: isSelected
                              ? 'rgba(245, 166, 35, 0.22)'
                              : isHovered
                              ? 'rgba(245, 166, 35, 0.14)'
                              : isActive
                              ? 'rgba(245, 166, 35, 0.06)'
                              : '#0E1420',
                            stroke: isSelected
                              ? '#F5A623'
                              : isHovered
                              ? '#F5A623'
                              : isActive
                              ? 'rgba(245, 166, 35, 0.55)'
                              : '#1E2A3E',
                            strokeWidth: isSelected ? 1.5 : isHovered ? 1.2 : isActive ? 0.9 : 0.6,
                            cursor: isActive ? 'pointer' : 'default',
                          }}
                          onClick={() => {
                            if (isActive) {
                              const activeObj = activeStates.find(s => s.geoName === state.geoName)
                              if (activeObj) handleSelect(activeObj)
                            }
                          }}
                          onMouseEnter={() => {
                            if (isActive) {
                              const activeObj = activeStates.find(s => s.geoName === state.geoName)
                              if (activeObj) setHoveredStateId(activeObj.id)
                            }
                          }}
                          onMouseLeave={() => setHoveredStateId(null)}
                        >
                          <title>{state.name}</title>
                        </path>
                      )
                    })}
                  </g>

                  {/* ── Geographic Centroid Pulse Markers ── */}
                  <g className="markers-group">
                    {activeStates.map((state) => (
                      <StateMarker
                        key={state.id}
                        state={state}
                        isActive={selected?.id === state.id}
                        isHovered={hoveredStateId === state.id}
                        onHover={setHoveredStateId}
                        onClick={handleSelect}
                      />
                    ))}
                  </g>
                </svg>
              </div>

              {/* Bottom Legend */}
              <div className="mt-3 pt-3 border-t border-canvas-border flex flex-wrap items-center justify-between gap-3 px-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-saffron border border-white/60 shadow-[0_0_6px_rgba(245,166,35,0.8)] block" />
                    <span className="text-fg-secondary text-xs font-body font-medium">Active Programmes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0E1420] border border-[#1E2A3E] block" />
                    <span className="text-fg-muted text-xs font-body">Other Regions</span>
                  </div>
                </div>
                <span className="text-fg-muted text-xs font-body hidden sm:inline">
                  Click any state or dot to explore
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: State Story & Details Panel ── */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-canvas-elevated border border-saffron/40 shadow-xl rounded-3xl p-7 sm:p-8 flex flex-col gap-6"
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-fg-muted hover:text-cream-DEFAULT transition-colors rounded-xl hover:bg-canvas-surface"
                  onClick={() => setSelected(null)}
                  aria-label="Close state details"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-saffron" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-2xs font-body tracking-wider uppercase text-saffron font-bold">
                      Active Region
                    </span>
                    <h3 className="font-display italic text-2xl sm:text-3xl text-cream-DEFAULT leading-tight">
                      {selected.name}
                    </h3>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-canvas-surface border border-canvas-border rounded-2xl p-4 text-center">
                    <div className="flex justify-center mb-1 text-saffron">
                      <Building2 size={16} />
                    </div>
                    <p className="font-display italic text-xl text-cream-DEFAULT tabular-nums">
                      {selected.schools}
                    </p>
                    <p className="text-fg-muted text-xs font-body mt-0.5">Schools</p>
                  </div>
                  <div className="bg-canvas-surface border border-canvas-border rounded-2xl p-4 text-center">
                    <div className="flex justify-center mb-1 text-saffron">
                      <Users size={16} />
                    </div>
                    <p className="font-display italic text-xl text-cream-DEFAULT tabular-nums">
                      {selected.teachers}
                    </p>
                    <p className="text-fg-muted text-xs font-body mt-0.5">Teachers</p>
                  </div>
                  <div className="bg-canvas-surface border border-canvas-border rounded-2xl p-4 text-center">
                    <div className="flex justify-center mb-1 text-saffron">
                      <GraduationCap size={16} />
                    </div>
                    <p className="font-display italic text-xl text-cream-DEFAULT tabular-nums">
                      {selected.students.toLocaleString('en-IN')}
                    </p>
                    <p className="text-fg-muted text-xs font-body mt-0.5">Students</p>
                  </div>
                </div>

                {/* Story Quote */}
                <div className="bg-canvas-surface/70 border-l-4 border-saffron rounded-r-2xl p-5">
                  <p className="text-xs font-body text-saffron font-semibold uppercase tracking-wider mb-1">
                    On-Ground Impact Story
                  </p>
                  <p className="font-display italic text-cream-muted text-lg leading-relaxed">
                    &ldquo;{selected.story}&rdquo;
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="#donate"
                    className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-saffron hover:bg-saffron-light text-canvas font-body font-semibold text-sm transition-colors duration-200"
                  >
                    Support Programs in {selected.name}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-canvas-elevated border border-canvas-border border-dashed rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center gap-4 text-center"
                style={{ minHeight: '340px' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-canvas-surface border border-canvas-border flex items-center justify-center text-fg-muted">
                  <MapPin size={28} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display italic text-xl text-cream-DEFAULT mb-2">
                    Select a state on the map
                  </p>
                  <p className="text-fg-secondary text-sm font-body max-w-xs leading-relaxed">
                    Tap any state boundary or glowing pulse marker to see our schools, teachers, student counts, and field stories.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Quick State Pills */}
            <div>
              <p className="text-xs font-body uppercase tracking-wider text-fg-muted mb-3 font-semibold">
                Quick Select State:
              </p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Active States">
                {activeStates.map((state) => {
                  const isCurSelected = selected?.id === state.id
                  return (
                    <button
                      key={state.id}
                      role="listitem"
                      className={`text-xs font-body font-medium px-3.5 py-2 rounded-xl border transition-all duration-200 ${
                        isCurSelected
                          ? 'bg-saffron text-canvas border-saffron font-semibold shadow-glow-gold-sm'
                          : 'bg-canvas-elevated border-canvas-border text-fg-secondary hover:border-saffron/50 hover:text-cream-DEFAULT'
                      }`}
                      onClick={() => handleSelect(state)}
                      onMouseEnter={() => setHoveredStateId(state.id)}
                      onMouseLeave={() => setHoveredStateId(null)}
                      aria-label={`Select ${state.name}`}
                      aria-pressed={isCurSelected}
                    >
                      {state.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
