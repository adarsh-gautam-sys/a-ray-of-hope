# A Ray of Hope — Education Changes Lives

> A story-first digital outreach and donation platform for **A Ray of Hope Charitable Trust**, empowering children across India through quality education, scholarships, teacher training, and digital literacy.

---

## 🌟 Overview

**A Ray of Hope** is a modern, high-performance web platform designed to move beyond generic charity layouts. It combines editorial narrative design with interactive data visualization and streamlined engagement flows, driving direct action for educational equity across India.

### Key Highlights
- 📖 **Story-First Editorial Experience**: Centers real children and grassroots impact with respectful, high-contrast imagery and narrative context.
- 🗺️ **Interactive Geographic Impact Map**: Optimized SVG-based India map with state-level statistics (schools, teachers trained, students enrolled, regional impact stories).
- 📊 **Dynamic Animated Counters**: Intersection-observer driven metric counters displaying verified milestone numbers.
- 🤝 **Dual CTA Conversion Engine**:
  - **Volunteer Onboarding Flow**: Role-based signup with location selection, availability preferences, and instant validation.
  - **Tax-Exempt Donation Portal**: Flexible tier selector (monthly vs. one-time), 80G tax benefit calculation, PAN validation, and multi-rail payment options (UPI, NetBanking, Cards).
- ♿ **Accessibility & Performance**: Built with semantic HTML5, ARIA landmark roles, keyboard navigation, and reduced-motion support.

---

## 🏗️ Architecture & Component Hierarchy

The application is architected as a modular React single-page application built on Vite and Tailwind CSS. The unidirectional data flow ensures predictable state management across story cards, interactive maps, and conversion modals.

```mermaid
graph TD
    subgraph Client Application [React Single-Page Application]
        Index[index.html / main.jsx] --> App[App.jsx]
        
        App --> Nav[Nav.jsx - Navigation Bar & Quick Actions]
        App --> Hero[Hero.jsx - Cinematic Display & Mission Statement]
        App --> Counters[ImpactCounters.jsx - Live Animated Metrics]
        App --> Stories[StoryCards.jsx - Interactive Student Case Studies]
        App --> Programs[Programs.jsx - Core Initiative Modules]
        App --> Map[ImpactMap.jsx - Interactive India Geo-Visualizer]
        App --> Volunteer[VolunteerCTA.jsx - Volunteer Onboarding Flow]
        App --> Donate[DonateCTA.jsx - 80G Tax-Deductible Donation Portal]
        App --> Footer[Footer.jsx - Legal, Tax IDs, Social & Links]
    end

    subgraph Data & Assets Layer
        MapData[src/data/india-map-data.js] -->|Precomputed Coordinates & Stats| Map
        Icons[Lucide Icons] -->|SVG Micro-Icons| Nav & Hero & Programs & Donate & Volunteer
        Motion[Framer Motion Engine] -->|Hardware-accelerated transitions| Hero & Stories & Map & Donate
    end

    subgraph Design Tokens [Tailwind CSS Design System]
        Palette[Navy Canvas #0A0C14 | Warm Saffron #F5A623 | Card Surface #121624]
        Typography[Display: Crimson Pro | Body: Instrument Sans]
        Tokens[Custom Utilities & Blur/Glow Filters]
    end
```

---

## 🧭 Component Breakdown

| Component | Purpose & Functionality |
| :--- | :--- |
| **`Nav.jsx`** | Sticky glassmorphism header with active section spy, mobile drawer, and instant Donate CTA trigger. |
| **`Hero.jsx`** | Full-bleed editorial introduction with authentic photography, typography, and clear action pathways. |
| **`ImpactCounters.jsx`** | Animated count-up metrics (15,000+ Students, 10 States, 450+ Teachers, 100% Transparency). |
| **`StoryCards.jsx`** | Tabbed/interactive narrative cards highlighting individual student journeys (Riya, Aarav, Priya). |
| **`Programs.jsx`** | Four key pillars: Primary Education, Digital Classrooms, Teacher Mentorship, and Higher-Ed Scholarships. |
| **`ImpactMap.jsx`** | Custom D3-projected SVG map of India with interactive state pins, regional stats, and story popouts. |
| **`VolunteerCTA.jsx`** | Multi-step volunteer application modal with role selection and instant feedback. |
| **`DonateCTA.jsx`** | Tiered contribution selector, 80G tax receipt generator with PAN validation, and multi-rail checkout modal. |
| **`Footer.jsx`** | Trust badges (80G, 12A, FCRA registered), contact details, sitemap, and legal disclaimers. |

---

## 🔒 Security Architecture & Defensive Posture

A comprehensive security audit has been performed on the codebase:

1. **Input Validation & Sanitization**:
   - Client-side regex pattern enforcement for donor PAN cards (`[A-Z]{5}[0-9]{4}[A-Z]{1}`), Indian phone numbers (10 digits), and RFC-compliant email validation.
   - Elimination of unsafe DOM sinks (`dangerouslySetInnerHTML`, `innerHTML`, `eval()`).
2. **Reverse Tabnabbing & Navigation Defense**:
   - All outgoing external links enforce `target="_blank"` coupled with `rel="noopener noreferrer"`.
3. **Data Protection & Zero Secret Leakage**:
   - Strict `.gitignore` boundaries protecting PRDs, internal specifications, logs, `.env` configurations, and intermediate build scripts.
   - No payment credentials or secret API tokens are bundled or stored in client-accessible storage.
4. **Recommended Security Headers for Production**:
   ```http
   Content-Security-Policy: default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://images.unsplash.com data:; script-src 'self';
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

---

## 💻 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tooling**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Framer Motion 11](https://www.framer.com/motion/)
- **Cartographic Geometry**: [D3 Geo](https://d3js.org/d3-geo) (Precomputed SVG paths)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher) or pnpm / yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "NGO Site"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build

To build optimized, tree-shaken static assets for production:

```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

The output will be generated in the `dist/` directory ready for deployment to any static hosting provider (Vercel, Netlify, Cloudflare Pages, AWS S3 / CloudFront).

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
