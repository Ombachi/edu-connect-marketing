import { Link } from "react-router-dom";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Cell = boolean | "partial" | string;
const competitors = ["Litu Hub", "Google Classroom", "Zeraki", "Moodle"];

const rows: { feature: string; cells: Cell[] }[] = [
  { feature: "Built for African schools", cells: [true, false, true, false] },
  { feature: "Multi-tenant with branding", cells: [true, false, "partial", "partial"] },
  { feature: "AI auto-grading & feedback", cells: [true, "partial", false, false] },
  { feature: "Parent portal", cells: [true, false, true, false] },
  { feature: "M-Pesa & card fees", cells: [true, false, true, false] },
  { feature: "Offline-first PWA", cells: [true, "partial", false, false] },
  { feature: "Local Nairobi support", cells: [true, false, true, false] },
  { feature: "SSO (SAML/OIDC)", cells: [true, true, false, true] },
  { feature: "Custom domain", cells: [true, false, "partial", true] },
  { feature: "Open API & webhooks", cells: [true, "partial", false, true] },
  { feature: "Data residency in Africa", cells: [true, false, true, false] },
  { feature: "Free 30-day pilot", cells: [true, "Always free*", false, "Self-hosted"] },
];

const cell = (v: Cell) => {
  if (v === true) return <Check className="h-5 w-5 text-primary" aria-label="Yes" />;
  if (v === false) return <X className="h-5 w-5 text-muted-foreground/50" aria-label="No" />;
  if (v === "partial") return <Minus className="h-5 w-5 text-accent" aria-label="Partial" />;
  return <span className="text-xs text-muted-foreground">{v}</span>;
};

const summaries = [
  { name: "vs Google Classroom", body: "Classroom is great for assignments inside a single Google Workspace. It isn't an institutional LMS — no fees, parent portal, branding, or analytics across schools. Litu Hub is the full operating system for your institution." },
  { name: "vs Zeraki", body: "Zeraki is strong on school administration. Litu Hub goes deeper on teaching: AI-graded quizzes, lesson libraries, real-time analytics on student outcomes, and a modern mobile experience for students." },
  { name: "vs Moodle", body: "Moodle is powerful but you carry the cost of hosting, upgrades, plugins, and security. Litu Hub gives you the modern UX and AI features out of the box — with local support and no DevOps team needed." },
];

const Compare = () => (
  <>
    <SEO
      title="Litu Hub vs Google Classroom, Zeraki, Moodle"
      description="See how Litu Hub compares to Google Classroom, Zeraki, and Moodle for African schools — features, pricing, and support."
      path="/compare"
    />

    <section className="bg-gradient-warm">
      <div className="container-wide py-20 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            Comparison
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">How Litu Hub compares</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            An honest look at where Litu Hub wins, where competitors are stronger, and what to consider.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <Card className="overflow-hidden border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="p-4 text-left font-semibold">Feature</th>
                  {competitors.map((c, i) => (
                    <th key={c} className={cn("p-4 text-left font-semibold", i === 0 && "text-primary")}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={cn(i % 2 === 1 && "bg-secondary/20")}>
                    <td className="p-4 font-medium">{row.feature}</td>
                    {row.cells.map((v, j) => (
                      <td key={j} className={cn("p-4", j === 0 && "bg-primary/5")}>{cell(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">* Google Classroom is free for Google Workspace for Education. Premium features require Education Plus.</p>
      </Reveal>
    </section>

    <section className="container-wide py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {summaries.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.05}>
            <Card className="h-full border-border p-7">
              <h3 className="font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">See it on your school's data</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">A 30-minute walkthrough is the fastest way to decide.</p>
          <Button asChild size="lg" variant="hero" className="mt-8"><Link to="/demo">Request a Demo<ArrowRight className="h-4 w-4" /></Link></Button>
        </Card>
      </Reveal>
    </section>
  </>
);

export default Compare;
