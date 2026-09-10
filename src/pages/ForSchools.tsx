import { Link } from "react-router-dom";
import { Check, ArrowRight, Building2, Users, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const painSolutions = [
  {
    pain: "Spreadsheets, WhatsApp groups, and paper registers everywhere",
    solution: "One unified platform for grading, attendance, and parent comms",
  },
  {
    pain: "Tutors burning hours grading the same quizzes",
    solution: "AI auto-grading with rubric-aware feedback in seconds",
  },
  {
    pain: "Parents only learn about issues at end-of-term",
    solution: "Real-time parent portal with grades, attendance & messaging",
  },
  {
    pain: "No clear view of at-risk students until it's too late",
    solution: "Live analytics surface struggling learners weekly",
  },
  {
    pain: "Generic LMS that ignores how African schools work",
    solution: "Built mobile-first, offline-ready, with local support",
  },
  {
    pain: "Chasing parents for school fees term after term",
    solution: "M-Pesa & card payments built in — students auto-unlock the moment fees clear",
  },
];

const checklist = [
  "Custom institutional branding (colors, logo, subdomain)",
  "Unlimited courses, classes, and learning materials",
  "Admin, Tutor, Student, and Parent role accounts",
  "AI-powered grading and feedback",
  "Real-time analytics and exportable reports",
  "Dedicated onboarding manager (Nairobi-based)",
  "Free 30-day pilot with full features",
  "99.9% uptime SLA & data hosted in Africa",
];

const flow = [
  { icon: Building2, label: "Admin", desc: "Sets up institution, courses, classes" },
  { icon: GraduationCap, label: "Tutors", desc: "Teach, grade, message, track" },
  { icon: Users, label: "Students", desc: "Learn, submit, collaborate" },
  { icon: Heart, label: "Parents", desc: "Stay informed, stay connected" },
];

const ForSchools = () => (
  <>
    <SEO
      title="For Schools — Run Your Entire Institution"
      description="Litu Hub gives African schools, universities, and tutoring centers one platform for admissions, classes, grading, and parent engagement."
      path="/for-schools"
    />

    <section className="bg-gradient-warm">
      <div className="container-wide py-20 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            For Schools
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Run your entire institution from one platform
          </h1>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            Replace spreadsheets, WhatsApp groups, paper registers with one platform
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/demo">
                Book a school demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Pain → Solution */}
    <section className="container-wide py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">From chaos to clarity</h2>
        <p className="mt-3 text-muted-foreground">
          The everyday pain points we hear from school leaders and what changes with Litu Hub.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <Card className="mt-12 overflow-hidden border-border">
          <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="bg-secondary/40 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">The pain</h3>
            </div>
            <div className="bg-primary/5 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">With Litu Hub</h3>
            </div>
            {painSolutions.map((row) => (
              <div key={row.pain} className="contents">
                <div className="border-t border-border p-6 text-muted-foreground">{row.pain}</div>
                <div className="border-t border-border p-6 font-medium">{row.solution}</div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </section>

    {/* Workflow */}
    <section className="bg-secondary/40 py-20">
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A workflow everyone in your institution understands
          </h2>
          <p className="mt-3 text-muted-foreground">Four roles. One platform. Zero confusion.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {flow.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <Card className="relative h-full border-border bg-card p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {i < flow.length - 1 && (
                  <div
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-muted-foreground md:block"
                    aria-hidden
                  >
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Case Study */}
    <section className="container-wide py-20">
      <Reveal>
        <Card className="grid gap-10 border-border p-10 md:grid-cols-[1.4fr_1fr] md:p-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">Case Study</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Nairobi Academy: 1,200 students onboarded in 14 days
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              After replacing three legacy tools with Litu Hub, Nairobi Academy cut tutor admin time by 62%, increased
              parent engagement by 4×, and identified at-risk students 6 weeks earlier on average.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-3xl font-bold text-primary">62%</div>
                <div className="mt-1 text-xs text-muted-foreground">Less admin time</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-primary">4×</div>
                <div className="mt-1 text-xs text-muted-foreground">Parent engagement</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-primary">14d</div>
                <div className="mt-1 text-xs text-muted-foreground">Time to launch</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-hero p-8 text-primary-foreground">
            <p className="text-lg leading-relaxed text-pretty">
              "Litu Hub gave us back time to actually teach. The team understands what running a school in Kenya really
              looks like."
            </p>
            <div className="mt-6 border-t border-primary-foreground/15 pt-4">
              <p className="text-sm font-semibold">Wanjiru Kamau</p>
              <p className="text-sm text-primary-foreground/70">Principal, Nairobi Academy</p>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>

    {/* Checklist */}
    <section className="bg-secondary/40 py-20">
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What you get on day one</h2>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {checklist.map((item, i) => (
            <Reveal key={item} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/demo">
              Book a school demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  </>
);

export default ForSchools;
