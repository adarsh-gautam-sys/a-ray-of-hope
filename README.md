# A Ray of Hope — Education Changes Lives

> A story-first digital outreach, volunteer, and donation platform for **A Ray of Hope Charitable Trust**, empowering children across India through quality education, scholarships, teacher training, and digital literacy.

---

## 🌟 Overview

**A Ray of Hope** is a modern, high-performance web platform designed to move beyond generic charity layouts. It combines editorial narrative design with interactive cartographic visualization, streamlined volunteer and donation onboarding, and an enterprise-grade backend engineered for **Google Cloud Run** and **Google Cloud Firestore**.

### Key Highlights
- 📖 **Story-First Editorial Experience**: Centers real children and grassroots impact with high-contrast editorial photography and authentic narrative context.
- 🗺️ **Interactive Geographic Impact Map**: Custom D3-projected SVG map of India with state-level statistics (schools supported, teachers trained, students enrolled, regional impact stories).
- 📊 **Dynamic Animated Counters**: Intersection-observer driven metrics displaying verified milestone numbers.
- 🤝 **Dual CTA Conversion Engine**:
  - **Volunteer Onboarding Flow**: 4-step interactive role-matching wizard with interests, availability preferences, server validation, and unique reference codes.
  - **Donation Pledge Portal**: Flexible tier selector (monthly vs. one-time), custom amount calculation, and server-side pledge logging with reference issuance.
- 📬 **Connected Outreach & Inquiries**: Dedicated Contact form and Footer newsletter subscription backed by rate-limited JSON APIs.
- ☁️ **Full-Stack Cloud Run Architecture**: Single-origin deployment serving optimized React static assets and an Express.js REST API with zero CORS overhead.
- 🛡️ **Comprehensive Security Hardening**: Strict Content Security Policy (CSP), Zod schema enforcement, IP rate limiting, non-root container isolation, and least-privilege IAM.

---

## 🏗️ End-to-End System Architecture

```mermaid
flowchart TD
    User([Supporter / Visitor Browser]) -->|HTTPS / Port 443| GFE[Google Cloud Load Balancer / Google Front End]
    
    subgraph CloudRun [Google Cloud Run — Containerized Service]
        subgraph ExpressApp [Express.js Application — Node.js 22]
            MW_Sec[Helmet Security Layer\nCSP, Frame-Ancestors, Sniffing Defense]
            MW_Rate[Express Rate Limiter\n10 req/min per IP]
            MW_Body[Body Parser\n10KB max JSON limit]
            
            MW_Sec --> MW_Rate --> MW_Body
            
            subgraph StaticRoutes [Static File Server]
                SPA[Vite Production SPA\nReact 18, Tailwind, Assets]
            end
            
            subgraph APIRoutes [REST API Endpoints — /api]
                V_API["/api/volunteers\n(Zod Schema Validation)"]
                D_API["/api/donations\n(Zod Schema Validation)"]
                S_API["/api/subscribers\n(Zod Schema Validation)"]
                C_API["/api/contact\n(Zod Schema Validation)"]
                H_API["/healthz\n(Liveness Probe)"]
            end
            
            MW_Body -->|GET / & Assets| StaticRoutes
            MW_Body -->|POST /api/*| APIRoutes
        end
    end

    GFE --> CloudRun

    subgraph GCP_Services [Google Cloud Platform Managed Services]
        Firestore[(Cloud Firestore Database\nCollections: volunteers, donations, subscribers, contacts)]
        SecretMgr[Google Secret Manager\nSMTP_URL Credentials]
        IAM[IAM Least-Privilege Service Account\nroles/datastore.user]
    end

    subgraph External_Services [External Integrations]
        SMTP[SMTP Mail Server\nTransaction Notifications]
        GoogleFonts[Google Fonts\nCrimson Pro & Instrument Sans]
        Unsplash[Unsplash CDN\nOptimized Editorial Images]
    end

    APIRoutes -->|Async Reads/Writes| Firestore
    APIRoutes -->|Fetch Secret at Boot| SecretMgr
    CloudRun -.->|Identity & Access| IAM
    APIRoutes -->|Plaintext Email Alerts| SMTP
    User -.->|Fetch Typography| GoogleFonts
    User -.->|Fetch Visual Media| Unsplash
```

---

## 📸 Visual Walkthrough & Platform Workings

| 01. Hero & Mission Statement | 02. Interactive Geographic Impact Map |
| :---: | :---: |
| ![Hero Section](screenshots/01_hero_section.png) | ![Interactive Map](screenshots/02_interactive_impact_map.png) |

| 03. Volunteer Onboarding Wizard | 04. Verified Volunteer Submission |
| :---: | :---: |
| ![Volunteer Wizard](screenshots/03_volunteer_wizard.png) | ![Volunteer Confirmed](screenshots/04_volunteer_application_confirmed.png) |

| 05. Donation Pledge & Method Selector | 06. Donation Pledge Confirmation |
| :---: | :---: |
| ![Donation Pledge](screenshots/05_donation_pledge_checkout.png) | ![Donation Confirmed](screenshots/06_donation_pledge_confirmed.png) |

| 07. CSR & General Inquiry Contact Form |
| :---: |
| ![Contact Inquiry](screenshots/07_contact_inquiry_sent.png) |

---

## 🧭 Component & Module Breakdown

### Frontend Components (`src/components/`)

| Component | File | Purpose & Functionality |
| :--- | :--- | :--- |
| **Navbar** | [`Nav.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/Nav.jsx) | Sticky glassmorphic header with active scroll spy, mobile navigation drawer, and instant Donate CTA trigger. |
| **Hero** | [`Hero.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/Hero.jsx) | Full-bleed editorial introduction with authentic photography, typography, and primary engagement pathways. |
| **Impact Counters** | [`ImpactCounters.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/ImpactCounters.jsx) | Dynamic viewport-triggered animated metric counters (15,000+ Students, 10 States, 450+ Teachers, 100% Transparency). |
| **Student Stories** | [`StoryCards.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/StoryCards.jsx) | Interactive narrative case studies highlighting individual journeys (Riya, Aarav, Priya). |
| **Core Programs** | [`Programs.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/Programs.jsx) | Four foundational pillars: School Support, Teacher Training, Higher-Ed Scholarships, and Digital Literacy. |
| **Interactive Map** | [`ImpactMap.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/ImpactMap.jsx) | D3-projected SVG map of India with interactive state pins, regional performance statistics, and localized stories. |
| **Volunteer Wizard** | [`VolunteerCTA.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/VolunteerCTA.jsx) | 4-step guided application flow with interest selection, availability matching, and direct `/api/volunteers` submission. |
| **Donation Portal** | [`DonateCTA.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/DonateCTA.jsx) | Tiered contribution selector, recurring pledge toggle, and honest pledge submission via `/api/donations`. |
| **Contact Section** | [`Contact.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/Contact.jsx) | Direct outreach form for CSR partnerships and queries connected to `/api/contact` with instant reference codes. |
| **Footer & Newsletter**| [`Footer.jsx`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/src/components/Footer.jsx) | Trust certifications (80G, 12A, FCRA), legal disclosures, social channels, and an active `/api/subscribers` newsletter form. |

### Backend Service (`server/`)

| Module | File | Responsibility |
| :--- | :--- | :--- |
| **Express App** | [`server/app.js`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/server/app.js) | Security headers (Helmet), IP rate limiting, payload parsing, REST API routes, error handling, and SPA fallback. |
| **Validation Schemas** | [`server/schemas.js`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/server/schemas.js) | Zod schema definitions with strict whitelists, string trimming, bounds checking, and email canonicalization. |
| **Data Store** | [`server/store.js`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/server/store.js) | Abstracted persistence seam: Google Cloud Firestore in production, in-memory store for local testing (`STORE=memory`). |
| **Mailer Engine** | [`server/mail.js`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/server/mail.js) | Timeout-bounded (5s) Nodemailer wrapper sending plaintext alerts to team and applicants. Failures are non-blocking. |
| **Runtime Entry** | [`server/index.js`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/server/index.js) | Service bootstrapper with `PORT` binding and graceful `SIGTERM` connection draining. |
| **Automated Tests** | [`server/test/api.test.js`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/server/test/api.test.js) | Comprehensive integration test suite verifying validation, rate limits, error responses, and headers. |

---

## 🔒 Security Architecture & Defensive Posture

A multi-layered defense-in-depth model is implemented across the stack:

```mermaid
graph LR
    subgraph Layer1 [1. Network & Client Perimeter]
        CSP[Strict Content Security Policy]
        Headers[Nosniff, No-Referrer, No-iFrame]
        Tabnab[Reverse Tabnabbing Defense]
    end

    subgraph Layer2 [2. Request Inspection & Throttling]
        RL[IP Rate Limiter: 10 req/min]
        BS[Payload Size Ceiling: 10KB]
        San[Zod Whitelist Sanitization]
    end

    subgraph Layer3 [3. Execution & Host Isolation]
        NonRoot[Docker User: node non-root]
        MultiStage[Slim Multi-Stage Build]
        Drain[Graceful SIGTERM Handling]
    end

    subgraph Layer4 [4. Cloud IAM & Data Access]
        LeastPriv[Service Account: roles/datastore.user]
        SecMgr[Secret Manager for Credentials]
        NoLeak[Zero Secret Leakage in Client Code]
    end

    Layer1 --> Layer2 --> Layer3 --> Layer4
```

### Security Checklist & Implemented Controls

| Defense Category | Control Implemented | Technical Specification |
| :--- | :--- | :--- |
| **Cross-Site Scripting (XSS)** | Content Security Policy (CSP) | Strict CSP directives: `default-src 'self'`, `script-src 'self'`, fonts restricted to Google Fonts, images restricted to Unsplash and self, `connect-src 'self'`. |
| **DOM XSS Elimination** | Zero Unsafe Sinks | Codebase completely avoids `dangerouslySetInnerHTML`, `innerHTML`, and `eval()`. |
| **Clickjacking Defense** | Frame Restriction | `frame-ancestors 'none'` and `X-Frame-Options: DENY` prevent framing/embedding on third-party sites. |
| **MIME Sniffing** | Content Type Options | `X-Content-Type-Options: nosniff` enforced on all static and API responses. |
| **Tabnabbing Protection** | Rel Isolation | All external links strictly use `target="_blank"` with `rel="noopener noreferrer"`. |
| **Input Validation** | Strict Server-Side Zod Schemas | Client inputs are never trusted. Zod validates lengths, email regex RFC compliance, and enforces enum whitelists. |
| **Donation Integrity** | Strict Bounds & Types | Amount must be an integer between ₹100 and ₹5,00,000. Rejects negative numbers, floating points, and strings. |
| **DoS Mitigation** | Payload Size Limiting | JSON request bodies capped at `10kb` via Express body parser; requests exceeding this return HTTP 413. |
| **Brute Force & Spam** | IP Rate Limiting | Writes to `/api/*` are throttled to a maximum of **10 requests per minute per IP**; excessive attempts return HTTP 429. |
| **Email Injection Defense**| Plaintext-Only Mailers | Transactional emails use pure plaintext strings (`text`), eliminating HTML markup injection risks. |
| **Container Isolation** | Non-Root Container Execution | Docker container executes as unprivileged user `node` (`UID/GID 1000`), reducing container breakout surface. |
| **Privilege Minimization**| Dedicated Cloud Run IAM | Cloud Run executes under `arayofhope-api@<project>.iam.gserviceaccount.com` granted strictly `roles/datastore.user`. |
| **Credential Management** | Zero Repo Secrets | No API keys or credentials stored in git. Optional `SMTP_URL` is fetched securely from GCP Secret Manager. |

---

## ☁️ API Reference & Cloud Run Integration

The backend exposes a lightweight, highly responsive REST API on the same origin:

### `POST /api/volunteers`
Submits a volunteer application.
- **Request Body**:
  ```json
  {
    "name": "Asha Rao",
    "email": "asha@example.com",
    "interests": ["Teaching", "Digital Marketing"],
    "availability": ["Weekends"]
  }
  ```
- **Response `201 Created`**:
  ```json
  { "ok": true, "reference": "VOL-E9A284F17C" }
  ```

### `POST /api/donations`
Registers a donation **pledge**. *(Note: No payment gateway is attached; records intent and triggers follow-up).*
- **Request Body**:
  ```json
  {
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "amount": 1000,
    "recurring": false,
    "method": "UPI"
  }
  ```
- **Response `201 Created`**:
  ```json
  { "ok": true, "reference": "DON-C481A09F2D" }
  ```

### `POST /api/subscribers`
Adds an email address to the newsletter distribution list. Idempotent by SHA-256 hash.
- **Request Body**:
  ```json
  { "email": "supporter@example.com" }
  ```
- **Response `201 Created`**:
  ```json
  { "ok": true }
  ```

### `POST /api/contact`
Sends an inquiry from schools, corporate partners, or supporters.
- **Request Body**:
  ```json
  {
    "name": "Vikram Patel",
    "email": "vikram@csr-partner.com",
    "message": "We would like to explore a CSR education initiative in Pune."
  }
  ```
- **Response `201 Created`**:
  ```json
  { "ok": true, "reference": "MSG-B7281D5E90" }
  ```

### `GET /healthz`
Liveness and readiness probe for Cloud Run and container orchestration.
- **Response `200 OK`**: `{ "ok": true }`

---

## ⚙️ Environment Variables & Configuration

| Variable | Environment | Required | Default / Example | Purpose |
| :--- | :--- | :---: | :--- | :--- |
| `PORT` | Cloud Run / Local | No | `8080` | Port for the HTTP server to listen on. |
| `NODE_ENV` | Production | No | `production` | Enables production optimizations and security rules. |
| `STORE` | Local Testing | No | *(unset = Firestore)* / `memory` | Set to `memory` to run without GCP credentials. |
| `NOTIFY_TO` | Cloud Run | Optional | `admin@arayofhope.org` | Internal mailbox notified upon new submissions. |
| `SMTP_URL` | Cloud Run (Secret) | Optional | `smtps://user:pass@smtp.mailgun.org` | Mail server URI. If omitted, emails are logged and skipped safely. |
| `MAIL_FROM` | Cloud Run | Optional | `A Ray of Hope <no-reply@arayofhope.org>` | Transactional email 'From' header. |

---

## 💻 Tech Stack

- **Client Framework**: [React 18](https://react.dev/)
- **Build Engine**: [Vite 5](https://vitejs.dev/)
- **CSS Architecture**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Motion System**: [Framer Motion 11](https://www.framer.com/motion/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Cartographic Visualizer**: [D3 Geo](https://d3js.org/d3-geo) (precomputed GeoJSON SVG projection)
- **Server Framework**: [Express.js](https://expressjs.com/) (Node.js 22 Slim)
- **Validation Library**: [Zod](https://zod.dev/)
- **Security Middleware**: [Helmet](https://helmetjs.github.io/) & [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)
- **Cloud Infrastructure**: [Google Cloud Run](https://cloud.google.com/run), [Google Cloud Firestore](https://cloud.google.com/firestore), [Google Secret Manager](https://cloud.google.com/security/products/secret-manager)

---

## 🚀 Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/adarsh-gautam-sys/a-ray-of-hope.git
cd a-ray-of-hope

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Run Local Development Server
Open two terminal windows:

**Terminal 1 — Backend API (In-Memory Mode, No GCP credentials needed):**
```bash
# In PowerShell:
$env:STORE='memory'; npm run dev --prefix server

# In Bash / macOS / Linux:
STORE=memory npm run dev --prefix server
```

**Terminal 2 — Frontend (Vite Dev Server with Proxy to :8080):**
```bash
npm run dev
```
Navigate to [http://localhost:5173](http://localhost:5173). Requests to `/api/*` are automatically forwarded to `http://localhost:8080`.

### 3. Run Automated Backend Tests
```bash
cd server
npm test
```
Executes all 9 automated HTTP test suites (schema validations, boundary limits, rate-limiting, and error-handling).

---

## 🐳 Docker & Cloud Run Deployment

### Local Container Build & Verification
```bash
# Build multi-stage production container
docker build -t a-ray-of-hope .

# Run container locally
docker run -p 8080:8080 -e STORE=memory a-ray-of-hope
```
Visit [http://localhost:8080](http://localhost:8080) to inspect the unified production build.

### Production Deployment to Cloud Run
An idempotent PowerShell deployment script is provided in [`scripts/deploy.ps1`](file:///c:/Users/conta.LAPTOP-IR41J1UC/NGO%20Site/scripts/deploy.ps1):

```powershell
./scripts/deploy.ps1 -ProjectId "<YOUR_GCP_PROJECT_ID>" `
                    -Region "asia-south1" `
                    -NotifyTo "team@yourdomain.org" `
                    -SmtpUrl "smtps://user:password@smtp.mailprovider.com"
```

The script automatically:
1. Enables necessary Google Cloud APIs (`run`, `cloudbuild`, `artifactregistry`, `firestore`, `secretmanager`).
2. Configures a production Cloud Firestore database.
3. Provisions a least-privilege service account (`arayofhope-api`) with `roles/datastore.user`.
4. Securely stores your `SMTP_URL` in Secret Manager (if provided).
5. Builds and deploys the container image directly to Cloud Run with automatic scaling (up to 3 instances) and returns your live HTTPS URL.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
