import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Brain, Clock, MessageSquare, BookOpen, Smartphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Brain,
    title: "AI grading",
    desc: "Quizzes and assignments grade themselves. Review the AI's feedback in seconds, not hours.",
  },
  {
    icon: Clock,
    title: "Save 8+ hours a week",
    desc: "Auto-attendance, reusable lesson banks, and one-tap parent updates.",
  },
  {
    icon: MessageSquare,
    title: "Parent comms built in",
    desc: "Send updates, schedule meetings, and share progress without WhatsApp groups.",
  },
  {
    icon: BookOpen,
    title: "Lesson library",
    desc: "Build once, reuse forever. Share lesson plans with your department.",
  },
  {
    icon: Smartphone,
    title: "Works on your phone",
    desc: "Mark register, grade quizzes, message parents — entirely from mobile.",
  },
  {
    icon: BarChart3,
    title: "Spot at-risk students",
    desc: "Weekly dashboards flag students who are slipping before grades drop.",
  },
];

const day = [
  "Mark today's register in 30 seconds from your phone",
  "Review AI-graded quiz submissions over morning tea",
  "Push a video lesson and homework to your class with one tap",
  "Message the parents of two flagged students",
  "Export this week's progress report for the staff meeting",
];

const ForTeachers = () => (
  <>
    <SEO
      title="For Teachers"
      description="Litu Hub for tutors and teachers: AI grading, parent communication, mobile-first lesson tools. Save 8+ hours a week."
      path="/for-teachers"
    />

    <section className="bg-gradient-warm">
      <div className="container-wide grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            For Teachers
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Spend less time on paperwork. More time teaching.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Built with input from 200+ tutors across Kenya. Every feature exists to give you back hours each week.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/demo">
                See a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/features">All features</Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="border-border bg-card p-8">
            <h2 className="font-display text-xl font-semibold">A typical Monday with Litu Hub</h2>
            <ul className="mt-5 space-y-3">
              {day.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <Card className="h-full border-border p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">Try it with your class</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Free 30-day pilot.</p>
          <Button asChild size="lg" variant="hero" className="mt-8">
            <Link to="/demo">
              Request a Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </Reveal>
    </section>
  </>
);

export default ForTeachers;
