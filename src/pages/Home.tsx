import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Building2, Globe2, Star, Users, BarChart3, ShieldCheck, MessageSquare, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import dashboardHero from "@/assets/dashboard-hero.jpg";


const features = [
  {
    icon: Brain,
    title: "AI-Native",
    desc: "Auto-grading, instant feedback, and adaptive learning paths powered by modern AI — built into every workflow.",
  },
  {
    icon: Building2,
    title: "Multi-Tenant",
    desc: "Each institution gets its own branded space, custom roles, and isolated data — all on one resilient platform.",
  },
  {
    icon: Globe2,
    title: "Built for Africa",
    desc: "Mobile-first PWA that works offline, supports low-bandwidth, and reflects how African schools really teach.",
  },
];

const fallbackTestimonials = [
  {
    quote: "Litu Hub replaced three separate tools and our parents finally feel involved in their kids' learning.",
    name: "Wanjiru Kamau",
    role: "Principal, Nairobi Academy",
  },
  {
    quote: "The auto-grading saves my tutors 8 hours a week. The dashboard is the cleanest I've ever used.",
    name: "Samuel Otieno",
    role: "Director, Bright Futures Tutoring",
  },
  {
    quote: "We onboarded 1,200 students in two weeks. The team in Nairobi understands our reality.",
    name: "Dr. Amina Hassan",
    role: "Dean, Coastal University",
  },
];



const stats = [
  { value: "10,000+", label: "Active students" },
  { value: "50+", label: "Partner schools" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Local support" },
];

const logos = ["Nairobi Academy", "Coastal University", "Bright Futures", "Rift Valley School", "Mombasa Tech", "Kisumu Prep"];

const Home = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("quote,author_name,author_role,author_company,display_order")
        .eq("status", "published")
        .order("display_order", { ascending: true })
        .limit(3);
      if (data && data.length > 0) {
        setTestimonials(
          data.map((t) => ({
            quote: t.quote,
            name: t.author_name,
            role: [t.author_role, t.author_company].filter(Boolean).join(", "),
          }))
        );
      }
    })();
  }, []);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Litu Hub",
    url: "https://lituhub.com",
    logo: "https://lituhub.com/og-image.jpg",
    description: "Modern multi-tenant Learning Management System built for African schools, universities, and tutoring centers.",
    sameAs: ["https://lituhub.lovable.app"],
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  };

  return (
    <>
      <SEO
        title="Litu Hub — The Modern LMS for African Education"
        description="Multi-tenant learning platform for African schools, universities, and tutoring centers. AI-powered grading, parent portals, offline-ready PWA."
        path="/"
        jsonLd={orgLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" aria-hidden />

        <div className="container-wide relative grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          <div className="flex flex-col justify-center">
            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                The Modern LMS Built for{" "}
                <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">African Education</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
                Run your entire institution — admissions, classes, grading, and parent communication — from one fast,
                offline-ready platform designed for the way African schools actually teach.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" variant="hero">
                  <Link to="/demo">
                    Request a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="hero-outline">
                  <a href="https://lituhub.lovable.app">Log in to Litu Hub</a>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-2xl" aria-hidden />
              <img
                src={dashboardHero}
                alt="Litu Hub dashboard showing courses, student progress, and calendar"
                width={1536}
                height={1024}
                className="relative w-full rounded-2xl border border-primary-foreground/10 shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Logo strip */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-wide py-10">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by schools across Kenya
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="text-center font-display text-sm font-semibold text-muted-foreground/80">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-wide py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Everything an institution needs, nothing it doesn't</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three principles guide every feature we build.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <Card className="group h-full border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-24">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Loved by educators</h2>
            <p className="mt-4 text-lg text-muted-foreground">From Nairobi to Mombasa, schools trust Litu Hub.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <Card className="h-full border-border bg-card p-7">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-foreground text-pretty">
                    "{t.quote}"
                  </blockquote>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-wide py-24">
        <Reveal>
          <div className="rounded-3xl bg-gradient-hero px-8 py-14 text-primary-foreground shadow-glow sm:px-14">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-bold tracking-tight text-accent sm:text-5xl">{s.value}</div>
                  <div className="mt-2 text-sm text-primary-foreground/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mini features icon row */}
      <section className="container-wide pb-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Users, label: "Multi-role dashboards" },
            { icon: MessageSquare, label: "Real-time messaging" },
            { icon: BarChart3, label: "Live analytics" },
            { icon: ShieldCheck, label: "Bank-level security" },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-foreground">
                <m.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-wide py-24">
        <Reveal>
          <Card className="overflow-hidden border-border bg-card p-10 text-center sm:p-16">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ready to modernize your institution?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Book a 30-minute demo. We'll show you how Litu Hub fits your school — no slides, just the product.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/demo">
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </>
  );
};

export default Home;
