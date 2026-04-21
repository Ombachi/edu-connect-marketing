import { Brain, ClipboardCheck, MessagesSquare, LayoutDashboard, Heart, BarChart3, Palette, Smartphone, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Grading & Feedback",
    desc: "Save tutors hours every week. Litu Hub auto-grades essays, code, and short answers with rubric-aware feedback students can actually learn from.",
    bullets: ["Rubric-aware essay scoring", "Plagiarism & AI-content detection", "Personalized study suggestions"],
  },
  {
    icon: ClipboardCheck,
    title: "Quiz Engine with Auto-Grading",
    desc: "Build quizzes in minutes with 12 question types. Auto-graded MCQs, randomized banks, and proctored modes for high-stakes exams.",
    bullets: ["12 question types incl. coding", "Question banks & randomization", "Lockdown / proctoring mode"],
  },
  {
    icon: MessagesSquare,
    title: "Real-Time Discussions & Messaging",
    desc: "Class threads, direct messages, and announcement broadcasts — all in one inbox with read receipts and translation built in.",
    bullets: ["Class & cohort channels", "Parent-tutor DMs", "Auto-translate Swahili ⇄ English"],
  },
  {
    icon: LayoutDashboard,
    title: "Multi-Role Dashboards",
    desc: "Tailored views for Admin, Tutor, Student, and Parent. Each role sees exactly what they need — nothing more, nothing less.",
    bullets: ["Admin command center", "Tutor gradebook", "Student & parent portals"],
  },
  {
    icon: Heart,
    title: "Parent Portal & Engagement",
    desc: "Give parents real-time visibility into grades, attendance, fees, and behavior — and a direct line to teachers.",
    bullets: ["Live grade & attendance feed", "Tutor messaging", "Weekly digest emails"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Cohort performance, course health, at-risk learners, and exportable reports for boards and ministries.",
    bullets: ["At-risk student detection", "Cohort comparisons", "PDF & Excel exports"],
  },
  {
    icon: Palette,
    title: "Multi-Tenant Institutional Branding",
    desc: "Your colors, your logo, your domain. Each institution feels like a custom-built platform — because it is.",
    bullets: ["Custom subdomain & domain", "Full theme control", "White-label emails"],
  },
  {
    icon: Smartphone,
    title: "Mobile-First PWA (Works Offline)",
    desc: "Install on any phone. Read materials, take quizzes, and queue submissions offline — they sync when you're back online.",
    bullets: ["Installable on Android/iOS", "Offline-first sync engine", "Optimized for 3G networks"],
  },
];

const Features = () => (
  <>
    <SEO
      title="Features — Everything Your Institution Needs"
      description="Explore Litu Hub features: AI grading, quiz engine, parent portal, analytics, multi-tenant branding, offline PWA. Built for African schools."
      path="/features"
    />

    <section className="bg-gradient-warm">
      <div className="container-wide py-20 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            Features
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            One platform. Every part of your institution.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            From admissions to graduation — and every quiz, message, and parent update in between.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-20">
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 2) * 0.08}>
            <Card className="group h-full border-border bg-card p-8 transition-all hover:shadow-elevated">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-xl font-semibold">{f.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.desc}</p>
              <ul className="mt-5 space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container-wide pb-24">
      <Reveal>
        <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            See it running on your school's data
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Book a 30-minute personalized walkthrough. We'll spin up a tenant pre-loaded with your courses.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="hero">
              <Link to="/demo">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="hero-outline">
              <Link to="/pricing">View pricing</Link>
            </Button>
          </div>
        </Card>
      </Reveal>
    </section>
  </>
);

export default Features;
