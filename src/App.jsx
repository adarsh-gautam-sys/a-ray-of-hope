import Nav from './components/Nav'
import Hero from './components/Hero'
import ImpactCounters from './components/ImpactCounters'
import StoryCards from './components/StoryCards'
import Programs from './components/Programs'
import ImpactMap from './components/ImpactMap'
import VolunteerCTA from './components/VolunteerCTA'
import DonateCTA from './components/DonateCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

/*
  THESIS: A story-first outreach platform that refuses the humanitarian-brochure layout.
  OWN-WORLD: Deep editorial navy (#0A0C14), saffron accent (#F5A623), Crimson Pro + Instrument Sans.
  STORY: Child → scale → programmes → map → act. Every section opens with a name or truth.
  FIRST VIEWPORT: Full-bleed photo, italic display headline bottom-left, dual CTAs.
  FORM: Dark editorial magazine × campaign microsite. Code-first.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
  the verdict, DESIGN.md, and every shipping raster carrying its provenance.
*/
export default function App() {
  return (
    <div className="min-h-screen bg-canvas-DEFAULT text-fg-DEFAULT">
      {/* Skip navigation for keyboard users */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-saffron focus:text-canvas focus:px-4 focus:py-2 focus:rounded-lg focus:font-body focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <Nav />

      <main id="main-content">
        {/* 1. Cinematic hero with dual CTAs */}
        <Hero />

        {/* 2. Animated impact counters */}
        <ImpactCounters />

        {/* 3. Meet the Children — story cards */}
        <StoryCards />

        {/* 4. Programs preview */}
        <Programs />

        {/* 5. Interactive India impact map */}
        <ImpactMap />

        {/* 6. Volunteer CTA */}
        <VolunteerCTA />

        {/* 7. Donation CTA */}
        <DonateCTA />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  )
}
