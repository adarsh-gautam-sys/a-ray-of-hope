import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Real Unsplash images — Indian children / education
const stories = [
  {
    id: 'riya',
    name: 'Riya Sharma',
    age: 16,
    location: 'Pune, Maharashtra',
    headline: 'From a government school classroom to engineering dreams.',
    body: 'Riya grew up in a two-room home in Hadapsar. When A Ray of Hope provided her school with a full science lab, her curiosity became unstoppable. She now ranks in the top 5% of her state.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80&auto=format&fit=crop&crop=top',
    tag: 'Scholarship',
  },
  {
    id: 'arjun',
    name: 'Arjun Pawar',
    age: 14,
    location: 'Nashik, Maharashtra',
    headline: 'A first-generation learner who taught his village to read.',
    body: "Arjun's village had no library. Our mobile books program reached him in class 6. By class 8, he was running weekend reading circles for younger children.",
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80&auto=format&fit=crop&crop=faces',
    tag: 'School Support',
  },
  {
    id: 'priya',
    name: 'Priya Kadam',
    age: 13,
    location: 'Aurangabad, Maharashtra',
    headline: "Digital literacy opened doors she didn't know existed.",
    body: 'The first time Priya used a computer, she was 12. Six months into our Digital Literacy programme, she built her first presentation and showed her parents what she could do.',
    image: 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?w=600&q=80&auto=format&fit=crop&crop=top',
    tag: 'Digital Literacy',
  },
]

function StoryCard({ story, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className="relative group rounded-2xl overflow-hidden bg-canvas-elevated flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-500 cursor-pointer"
      style={{ minHeight: '520px' }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      aria-label={`Read ${story.name}'s story`}
      onKeyDown={(e) => { if (e.key === 'Enter') {} }}
    >
      {/* Image */}
      <div className="relative flex-1 min-h-[300px] overflow-hidden">
        <img
          src={story.image}
          alt={`${story.name}, ${story.age}, from ${story.location}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Story overlay gradient */}
        <div className="absolute inset-0 story-card-overlay" aria-hidden="true" />

        {/* Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-saffron/90 text-canvas font-body font-semibold text-2xs uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm">
            {story.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display italic text-xl text-cream-DEFAULT leading-tight">
            {story.name}
          </h3>
          <span className="text-fg-muted text-sm font-body">
            · {story.location}
          </span>
        </div>

        <p className="font-body font-medium text-cream-DEFAULT text-base leading-snug line-clamp-2">
          {story.headline}
        </p>
        <p className="font-body text-fg-secondary text-sm leading-relaxed line-clamp-3">
          {story.body}
        </p>

        <button
          className="mt-2 self-start flex items-center gap-2 text-saffron font-body font-semibold text-sm hover:gap-3 transition-all duration-200 group/btn"
          aria-label={`Read ${story.name}'s full story`}
        >
          Read their story
          <ArrowRight
            size={15}
            strokeWidth={2.5}
            className="group-hover/btn:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  )
}

export default function StoryCards() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      className="py-24 sm:py-32 bg-canvas-DEFAULT"
      id="stories"
      aria-labelledby="stories-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 sm:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-saffron font-body font-semibold text-sm tracking-widest uppercase mb-4">
              Meet the Children
            </p>
            <h2
              id="stories-heading"
              className="font-display italic text-display-lg text-cream-DEFAULT max-w-lg"
            >
              Every number is a name.
            </h2>
          </div>
          <a
            href="#stories"
            className="self-start sm:self-auto flex items-center gap-2 font-body font-semibold text-sm text-fg-secondary hover:text-saffron transition-colors duration-200 whitespace-nowrap"
          >
            All stories
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </motion.div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Beneficiary stories"
        >
          {stories.map((story, i) => (
            <div key={story.id} role="listitem">
              <StoryCard story={story} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
