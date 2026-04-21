import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, MessageSquare, CalendarCheck, TrendingUp, Bell, Wallet, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import parentPortal from "@/assets/parent-portal.jpg";

const benefits = [
  { icon: BookOpen, title: "Real-time grades", desc: "See every quiz, assignment, and exam result the moment it's posted." },
  { icon: MessageSquare, title: "Direct tutor messaging", desc: "Chat with your child's teachers — no more hunting down phone numbers." },
  { icon: CalendarCheck, title: "Attendance alerts", desc: "Instant notifications when your child arrives, leaves, or misses class." },
  { icon: TrendingUp, title: "Performance trends", desc: "Weekly digests show progress, strengths, and where extra support helps." },
  { icon: Bell, title: "Smart notifications", desc: "Important updates only — never spammy, always actionable." },
  { icon: Wallet, title: "Fees & payments", desc: "View invoices, payment history, and pay school fees from your phone." },
];

const ForParents = () => (
  <>
    <SEO
      title="For Parents — Stay Connected to Your Child's Learning"
      description="Litu Hub gives parents real-time grades, attendance alerts, direct messaging with tutors, and weekly performance trends — all on your phone."
      path="/for-parents"
    />

    <section className="bg-gradient-warm">
      <div className="container-wide grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            For Parents
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Stay connected to your child's learning journey
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
            No more waiting for parent-teacher meetings. With Litu Hub, you see grades, attendance, and tutor messages in real-time — straight from your phone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="https://lituhub.lovable.app">Log in to parent portal</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/demo">Ask your school about Litu Hub<ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-accent/15 blur-2xl" aria-hidden />
            <img
              src={parentPortal}
              alt="Litu Hub parent portal mobile app showing child's grades, attendance, and tutor messages"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative w-full max-w-sm rounded-3xl shadow-elevated"
            />
          </div>
        </Reveal>
      </div>
    </section>

    {/* Benefits */}
    <section className="container-wide py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to support your child</h2>
        <p className="mt-3 text-muted-foreground">Designed for busy parents — fast, simple, and works on any phone.</p>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <Reveal key={b.title} delay={(i % 3) * 0.08}>
            <Card className="h-full border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{b.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Testimonial */}
    <section className="container-wide pb-20">
      <Reveal>
        <Card className="border-border bg-gradient-warm p-10 sm:p-14">
          <div className="flex gap-0.5 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-foreground text-pretty sm:text-3xl">
            "I used to find out about my daughter's struggles only at term-end. Now I get a weekly summary on my phone
            and can message her math tutor directly. It's changed how involved I am."
          </blockquote>
          <div className="mt-6 border-t border-border pt-5">
            <p className="font-semibold">Grace Mwangi</p>
            <p className="text-sm text-muted-foreground">Parent, Form 2 student at Nairobi Academy</p>
          </div>
        </Card>
      </Reveal>
    </section>

    {/* CTA */}
    <section className="container-wide pb-24">
      <Reveal>
        <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Want Litu Hub at your child's school?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Forward this page to your school administrator or principal — and we'll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="hero">
              <Link to="/demo">Ask your school about Litu Hub<ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="hero-outline">
              <a href="https://lituhub.lovable.app">Log in</a>
            </Button>
          </div>
        </Card>
      </Reveal>
    </section>
  </>
);

export default ForParents;
