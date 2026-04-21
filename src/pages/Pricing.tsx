import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    sub: "for small tutoring groups",
    desc: "Everything a small group needs to start teaching online today.",
    cta: "Get started",
    href: "https://lituhub.lovable.app",
    features: ["Up to 30 students", "1 tutor account", "Quizzes & assignments", "Basic analytics", "Community support"],
    highlight: false,
  },
  {
    name: "School",
    price: "Custom",
    sub: "per institution",
    desc: "For schools, universities, and tutoring centers ready to modernize.",
    cta: "Talk to sales",
    href: "/demo",
    features: [
      "Unlimited students & tutors",
      "Multi-role dashboards",
      "AI grading & feedback",
      "Parent portal",
      "Custom branding & domain",
      "Advanced analytics",
      "Dedicated onboarding",
      "99.9% uptime SLA",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    sub: "for multi-campus & districts",
    desc: "For ministries, large universities, and multi-campus institutions.",
    cta: "Contact sales",
    href: "/demo",
    features: [
      "Everything in School",
      "Multi-campus & district support",
      "SSO (SAML, OIDC)",
      "Dedicated infrastructure",
      "Custom integrations",
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
  { label: "Parent portal", values: [false, true, true] },
  { label: "Custom branding", values: [false, true, true] },
  { label: "SSO (SAML/OIDC)", values: [false, false, true] },
  { label: "Dedicated infrastructure", values: [false, false, true] },
  { label: "Onboarding manager", values: [false, true, true] },
  { label: "Support", values: ["Community", "Email + Chat", "24/7 Priority"] },
];

const faqs = [
  { q: "Is there really a free tier?", a: "Yes. Starter is free forever for groups up to 30 students. No credit card required." },
  { q: "How is the School plan priced?", a: "We price per institution based on student count and needed modules. Most schools pay a fraction of what they spent on legacy LMS tools — and the pilot is free for 30 days." },
  { q: "Where is our data hosted?", a: "Data is hosted in Africa-region data centers with full backup and disaster recovery. Enterprise customers can request specific data residency." },
  { q: "Can we migrate from another LMS?", a: "Yes. Our team handles migration from Moodle, Google Classroom, spreadsheets, and most popular LMS platforms — included in onboarding." },
  { q: "Does Litu Hub work offline?", a: "Yes. The PWA caches content and queues submissions while offline. Everything syncs automatically when the device reconnects." },
  { q: "Do you offer training for tutors?", a: "Every School and Enterprise plan includes live training sessions, role-specific onboarding, and a dedicated success manager for the first 90 days." },
  { q: "Is there a contract or lock-in?", a: "Month-to-month or annual — your choice. You can export all your data at any time. We earn your business each year." },
];

const Pricing = () => {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Litu Hub LMS",
    description: "Multi-tenant Learning Management System for African schools, universities, and tutoring centers.",
    brand: { "@type": "Brand", name: "Litu Hub" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "0",
      priceCurrency: "USD",
      offerCount: "3",
    },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SEO
        title="Pricing — Plans for Every Institution"
        description="Litu Hub pricing: Starter free for small groups, School custom-priced per institution, Enterprise for multi-campus. 30-day free pilot."
        path="/pricing"
        jsonLd={[productLd, faqLd]}
      />

      <section className="bg-gradient-warm">
        <div className="container-wide py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
              Pricing
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Simple pricing that grows with you
            </h1>
            <p className="mt-5 text-lg text-muted-foreground text-pretty">
              Free for small groups. Custom-priced for schools. Enterprise-ready for multi-campus.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tier cards */}
      <section className="container-wide -mt-8 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Card
                className={cn(
                  "relative flex h-full flex-col p-8",
                  t.highlight
                    ? "border-primary bg-card shadow-elevated ring-1 ring-primary/30"
                    : "border-border bg-card"
                )}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-amber">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold">{t.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold tracking-tight">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.sub}</span>
                </div>
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
                    {tiers.map((t) => (
                      <th key={t.name} className="p-4 text-left font-semibold">{t.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={cn(i % 2 === 1 && "bg-secondary/20")}>
                      <td className="p-4 font-medium">{row.label}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="p-4">
                          {typeof v === "boolean" ? (
                            v ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground/50" />
                          ) : (
                            <span className="text-muted-foreground">{v}</span>
                          )}
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

      {/* FAQ */}
      <section className="container-wide py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-wide py-16">
        <Reveal>
          <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Talk to sales
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Tell us about your institution and we'll send back a tailored proposal within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="hero">
                <Link to="/demo">Talk to sales<ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </>
  );
};

export default Pricing;
