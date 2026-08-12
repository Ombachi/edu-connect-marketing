# Litu Hub Marketing

Build a marketing website for "Litu Hub" — a multi-tenant Learning Management System (LMS) built for African schools, universities, and tutoring centers. This is a public, SEO-optimized marketing site, completely separate from the actual product (the PWA lives at app.lituhub.com). This site lives at lituhub.com / www.lituhub.com.

🎯 Goal

Drive school administrators, parents, and education decision-makers to either (a) request a demo or (b) log in to the existing PWA. No authentication, no dashboard, no database needed for v1 — just a fast, beautiful, conversion-focused marketing site.

🎨 Brand & Design System

Inspiration: Kenyan-inspired, modern, premium-but-approachable (think Notion meets Linear, with warm African accents)

Primary color: Forest green hsl(150 45% 25%)

Accent color: Golden amber hsl(38 92% 55%)

Background: Warm off-white hsl(40 20% 98%) (light) / Deep charcoal hsl(150 15% 8%) (dark)

Fonts: Space Grotesk for headings, DM Sans for body (load via Google Fonts)

Use semantic Tailwind tokens — define everything in index.css and tailwind.config.ts. Never hardcode colors in components.

Subtle gradients, generous whitespace, large typography, soft shadows, rounded-xl corners

Smooth scroll, fade-in-on-scroll animations (use Framer Motion or CSS), micro-interactions on hover

📄 Pages (use React Router)

/ — Home

Hero: "The Modern LMS Built for African Education" + subheading + two CTAs ("Request a Demo" → /demo, "Log in to Litu Hub" → https://app.lituhub.com)

Hero visual: dashboard mockup screenshot (use a generated image)

Logos strip ("Trusted by schools across Kenya") — placeholder logos

3-column feature highlights (AI-Native, Multi-Tenant, Built for Africa)

Social proof: 2-3 testimonial cards

Stats band: "10,000+ students • 50+ schools • 99.9% uptime"

Final CTA section

/features — Features

Sectioned overview of all major capabilities, each with an icon, headline, description, and a small visual:

AI-powered grading & feedback

Quiz engine with auto-grading

Real-time discussions & messaging

Multi-role dashboards (Admin, Tutor, Student, Parent)

Parent portal & engagement tracking

Analytics & reporting

Multi-tenant institutional branding

Mobile-first PWA (works offline)

/for-schools — For Schools

Headline: "Run your entire institution from one platform"

Pain points → Solutions table

Workflow diagram (Admin → Tutors → Students → Parents)

Case study card (placeholder)

"What you get" checklist (institutional branding, unlimited courses, dedicated support, etc.)

CTA: "Book a school demo"

/for-parents — For Parents

Headline: "Stay connected to your child's learning journey"

Benefits grid (real-time grades, direct messaging with tutors, attendance, performance trends)

Mockup of parent portal

Parent testimonial

CTA: "Ask your school about Litu Hub"

/pricing — Pricing

3 tiers in cards:

Starter — Free for small tutoring groups (up to 30 students)

School — Custom pricing per institution (most popular, highlighted)

Enterprise — Multi-campus, SSO, dedicated infra

Feature comparison table below

FAQ accordion (5–7 questions)

CTA: "Talk to sales"

/demo — Request a Demo

Two-column layout: left = value prop + bullet points of what they'll see in the demo; right = form

Form fields: Name, Work Email, Institution Name, Role (dropdown: School Admin / Tutor / IT Lead / Other), Number of Students (dropdown), Message (optional)

Submit button: For v1, just show a success toast and log to console (no backend yet — note in a TODO that this will hook into Lovable Cloud later)

Trust signals below form: "We respond within 24 hours" • "No credit card required" • "Free 30-day pilot"

🧩 Shared Components

Sticky top nav with logo, links (Features, For Schools, For Parents, Pricing), and two right-aligned buttons: "Log in" (outline, links to https://app.lituhub.com) + "Request Demo" (solid, links to /demo)

Footer with 4 columns (Product, Company, Resources, Legal), social icons, newsletter signup (just UI), and copyright

Mobile hamburger menu with smooth slide-in

Theme toggle (light/dark) using next-themes

🔍 SEO (critical — this is a marketing site)

Per-page <title> (under 60 chars) and <meta description> (under 160 chars) using react-helmet-async

Single <h1> per page, semantic HTML (<header>, <main>, <section>, <article>, <footer>)

Open Graph + Twitter card meta tags on every page

JSON-LD structured data: Organization schema on home, Product schema on pricing, FAQPage schema on pricing FAQ

sitemap.xml and robots.txt in public/

Canonical tags

Alt text on every image

Lazy-load images below the fold

Responsive viewport meta

🛠 Tech

React 18 + Vite + TypeScript + Tailwind CSS v3

react-router-dom for routing

react-helmet-async for per-page SEO

lucide-react for icons

framer-motion for scroll animations

next-themes for dark mode

shadcn/ui components (Button, Card, Input, Textarea, Select, Accordion, Sheet for mobile nav)

✅ Acceptance Criteria

All 6 pages render with no console errors

Lighthouse SEO score ≥ 95 on every page

Fully responsive from 320px → 1920px

Light/dark mode both look polished

Every "Log in" button links to https://app.lituhub.com (open in same tab)

Every "Request Demo" CTA routes to /demo

Form on /demo validates and shows a success toast on submit

Start by setting up the design system (index.css + tailwind.config.ts), then build the shared layout (Nav + Footer), then scaffold all 6 pages with placeholder content, then iterate on visuals.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ca337480-6f92-48bd-b8c9-66129a3c9ad6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
