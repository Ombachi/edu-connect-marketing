import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Sparkles, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { FAQ, faqJsonLd, type FAQItem } from "@/components/FAQ";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    priceSub: "forever",
    sub: "Up to 30 students",
    desc: "Everything a small tutoring group needs to start teaching online today.",
    cta: "Get started",
    href: "https://lituhub.lovable.app",
    features: ["Up to 30 students", "1 tutor account", "Quizzes & assignments", "Basic analytics", "Community support"],
    highlight: false,
  },
  {
    name: "School",
    price: "KES 120",
    priceSub: "/ student / term",
    sub: "Volume discounts apply",
    desc: "For schools, universities, and tutoring centers ready to modernize.",
    cta: "Start free pilot",
    href: "/demo",
    features: [
      "Unlimited tutors & classes",
      "Multi-role dashboards",
      "AI grading & feedback",
      "Parent portal & M-Pesa fees",
      "Custom branding & subdomain",
      "Advanced analytics",
      "Dedicated onboarding",
      "99.9% uptime SLA",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSub: "annual contract",
    sub: "Multi-campus & districts",
    desc: "For ministries, large universities, and multi-campus institutions.",
    cta: "Contact sales",
    href: "/demo",
    features: [
      "Everything in School",
      "Multi-campus & district support",
      "SSO (SAML, OIDC)",
      "Dedicated infrastructure",
      "Custom integrations & API limits",
      "24/7 priority support",
      "On-prem & data residency options",
    ],
    highlight: false,
  },
];

const compareRows = [
  { label: "Students included", values: ["30", "Unlimited", "Unlimited"] },
  { label: "Tutor accounts", values: ["1", "Unlimited", "Unlimited"] },
  { label: "AI grading", values: [false, true, true] },
  { label: "Parent portal & M-Pesa fees", values: [false, true, true] },
  { label: "Custom branding & subdomain", values: [false, true, true] },
  { label: "SSO (SAML/OIDC)", values: [false, false, true] },
  { label: "Dedicated infrastructure", values: [false, false, true] },
  { label: "Onboarding manager", values: [false, true, true] },
  { label: "Support", values: ["Community", "Email + Chat", "24/7 Priority"] },
];

const faqs: FAQItem[] = [
  { q: "Is there really a free tier?", a: "Yes. Starter is free forever for groups up to 30 students. No credit card required." },
  { q: "How is the School plan priced?", a: "KES 120 per student per term, billed termly. Volume discounts kick in at 500, 1,000 and 2,500 students. The 30-day pilot is free with no commitment." },
  { q: "Are there any setup or hidden fees?", a: "No setup fees. Onboarding, training, and migration from your existing LMS are included on School and Enterprise plans." },
  { q: "Where is our data hosted?", a: "Data is hosted in Africa-region data centers with full backup and disaster recovery. Enterprise customers can request specific data residency." },
  { q: "Can we migrate from another LMS?", a: "Yes. Our team handles migration from Moodle, Google Classroom, spreadsheets, and most popular LMS platforms — included in onboarding." },
  { q: "Does Litu Hub work offline?", a: "Yes. The PWA caches content and queues submissions while offline. Everything syncs automatically when the device reconnects." },
  { q: "Is there a contract or lock-in?", a: "Termly or annual — your choice. You can export all your data at any time. We earn your business each term." },
];

const Pricing = () => {
  const [students, setStudents] = useState(500);
  const [tutors, setTutors] = useState(20);
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [tutorRate, setTutorRate] = useState(400); // KES/hour

  const calc = useMemo(() => {
    // 3 terms per year
    const lituAnnual = students * 120 * 3;
    // discount tiers
    let discount = 0;
    if (students >= 2500) discount = 0.25;
    else if (students >= 1000) discount = 0.15;
    else if (students >= 500) discount = 0.10;
    const lituAnnualDiscounted = Math.round(lituAnnual * (1 - discount));

    // tutor time saved: hours/week * 40 weeks * tutors * rate
    const tutorSavings = hoursPerWeek * 40 * tutors * tutorRate;
    // legacy LMS license assumption ~ KES 200/student/term
    const legacyAnnual = students * 200 * 3;
    const totalSavings = tutorSavings + (legacyAnnual - lituAnnualDiscounted);
    const roiMonths = lituAnnualDiscounted > 0 ? Math.max(1, Math.round((lituAnnualDiscounted / totalSavings) * 12)) : 0;

    return { lituAnnualDiscounted, discount, tutorSavings, legacyAnnual, totalSavings, roiMonths };
  }, [students, tutors, hoursPerWeek, tutorRate]);

  const fmt = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Litu Hub LMS",
    description: "Multi-tenant Learning Management System for African schools, universities, and tutoring centers.",
    brand: { "@type": "Brand", name: "Litu Hub" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "120",
      priceCurrency: "KES",
      offerCount: "3",
    },
  };

  return (
    <>
      <SEO
        title="Pricing — Plans for Every Institution"
        description="Litu Hub pricing: Starter free for small groups, School from KES 120 / student / term, Enterprise for multi-campus. 30-day free pilot."
        path="/pricing"
        jsonLd={[productLd, faqJsonLd(faqs)]}
      />

      <section className="bg-gradient-warm">
        <div className="container-wide py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">Pricing</span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">Simple pricing that grows with you</h1>
            <p className="mt-5 text-lg text-muted-foreground text-pretty">
              Free for small groups. From <strong className="text-foreground">KES 120 / student / term</strong> for schools. Enterprise-ready for multi-campus.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tier cards */}
      <section className="container-wide -mt-8 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Card className={cn("relative flex h-full flex-col p-8", t.highlight ? "border-primary bg-card shadow-elevated ring-1 ring-primary/30" : "border-border bg-card")}>
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-amber">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold">{t.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.priceSub}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{t.sub}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  {t.href.startsWith("/") ? (
                    <Button asChild className="w-full" variant={t.highlight ? "default" : "outline"} size="lg">
                      <Link to={t.href}>{t.cta}<ArrowRight className="h-4 w-4" /></Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full" variant={t.highlight ? "default" : "outline"} size="lg">
                      <a href={t.href}>{t.cta}<ArrowRight className="h-4 w-4" /></a>
                    </Button>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROI calculator */}
      <section className="container-wide py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Calculator className="h-3.5 w-3.5" /> ROI calculator
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">See your school's savings</h2>
          <p className="mt-3 text-muted-foreground">Estimate annual cost, tutor time saved, and payback period.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="mt-10 grid gap-8 border-border p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-7">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <Label>Number of students</Label>
                  <span className="font-display text-lg font-semibold">{students.toLocaleString()}</span>
                </div>
                <Slider value={[students]} onValueChange={(v) => setStudents(v[0])} min={30} max={5000} step={10} />
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <Label>Number of tutors</Label>
                  <span className="font-display text-lg font-semibold">{tutors}</span>
                </div>
                <Slider value={[tutors]} onValueChange={(v) => setTutors(v[0])} min={1} max={300} step={1} />
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <Label>Hours each tutor saves per week</Label>
                  <span className="font-display text-lg font-semibold">{hoursPerWeek} hrs</span>
                </div>
                <Slider value={[hoursPerWeek]} onValueChange={(v) => setHoursPerWeek(v[0])} min={1} max={15} step={1} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Average tutor hourly cost (KES)</Label>
                <Input id="rate" type="number" min={50} step={50} value={tutorRate} onChange={(e) => setTutorRate(Math.max(50, Number(e.target.value) || 0))} />
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-hero p-7 text-primary-foreground sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Your estimate</p>
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm text-primary-foreground/70">Litu Hub cost / year</p>
                  <p className="font-display text-3xl font-bold">{fmt(calc.lituAnnualDiscounted)}</p>
                  {calc.discount > 0 && <p className="mt-1 text-xs text-accent">{Math.round(calc.discount * 100)}% volume discount applied</p>}
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-primary-foreground/10 pt-5">
                  <div>
                    <p className="text-xs text-primary-foreground/70">Tutor time saved</p>
                    <p className="font-display text-xl font-semibold">{fmt(calc.tutorSavings)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/70">Legacy LMS replaced</p>
                    <p className="font-display text-xl font-semibold">{fmt(calc.legacyAnnual)}</p>
                  </div>
                </div>
                <div className="border-t border-primary-foreground/10 pt-5">
                  <p className="text-xs text-primary-foreground/70">Net annual value</p>
                  <p className="font-display text-3xl font-bold text-accent">{fmt(Math.max(0, calc.totalSavings))}</p>
                  <p className="mt-2 text-xs text-primary-foreground/70">Payback in ~{calc.roiMonths} months</p>
                </div>
                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/demo">Get a tailored quote<ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </Card>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Estimates use 3 terms × 40 teaching weeks. Legacy LMS assumed at KES 200 / student / term. Volume discounts: 10% @ 500+, 15% @ 1,000+, 25% @ 2,500+ students.
          </p>
        </Reveal>
      </section>

      {/* Comparison table */}
      <section className="container-wide py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Compare plans</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="mt-10 overflow-hidden border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="p-4 text-left font-semibold">Feature</th>
                    {tiers.map((t) => (<th key={t.name} className="p-4 text-left font-semibold">{t.name}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={cn(i % 2 === 1 && "bg-secondary/20")}>
                      <td className="p-4 font-medium">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="p-4">
                          {typeof v === "boolean" ? (v ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground/50" />) : <span className="text-muted-foreground">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Reveal>
      </section>

      <FAQ items={faqs} />

      <section className="container-wide py-16">
        <Reveal>
          <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">Talk to sales</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">Tell us about your institution and we'll send back a tailored proposal within 24 hours.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="hero"><Link to="/demo">Talk to sales<ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </>
  );
};

export default Pricing;
