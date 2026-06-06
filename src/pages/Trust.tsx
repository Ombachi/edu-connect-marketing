import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Server, FileCheck, KeyRound, Activity, Globe2, RefreshCcw, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const pillars = [
  { icon: Lock, title: "Encryption everywhere", desc: "TLS 1.2+ in transit, AES-256 at rest. Database backups encrypted with rotating keys." },
  { icon: KeyRound, title: "Identity & access", desc: "Role-based access (Admin / Tutor / Student / Parent). SSO via SAML & Google Workspace on Enterprise." },
  { icon: Server, title: "Tenant isolation", desc: "Every institution is logically isolated. Row-level security ensures one school never sees another's data." },
  { icon: Activity, title: "Monitoring & audit", desc: "24/7 monitoring, anomaly detection, and immutable admin audit logs you can export." },
  { icon: RefreshCcw, title: "Backups & recovery", desc: "Continuous backups, point-in-time restore up to 7 days, daily snapshots retained for 30 days." },
  { icon: Globe2, title: "Data residency", desc: "Africa-region primary hosting with EU/US options for Enterprise. Data stays where your country requires." },
];

const compliance = [
  { name: "Kenya Data Protection Act 2019", status: "Compliant" },
  { name: "GDPR", status: "Compliant" },
  { name: "FERPA-aligned controls", status: "Available" },
  { name: "SOC 2 Type II", status: "In progress" },
  { name: "ISO 27001", status: "Roadmap 2026" },
];

const Trust = () => (
  <>
    <SEO
      title="Trust & Security"
      description="How Litu Hub protects your institution's data: encryption, tenant isolation, Kenya DPA & GDPR compliance, backups, and uptime."
      path="/trust"
    />

    <section className="bg-gradient-hero text-primary-foreground">
      <div className="container-wide py-20 text-center">
        <Reveal>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">Trust & Security</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Schools trust us with their most sensitive data — students, grades, payments. Here's exactly how we protect it.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <Card className="h-full border-border p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container-wide py-12">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Compliance & certifications</h2>
        <p className="mt-3 text-muted-foreground">We meet the standards African schools and ministries require.</p>
      </Reveal>
      <Reveal delay={0.1}>
        <Card className="mx-auto mt-10 max-w-3xl divide-y divide-border border-border">
          {compliance.map((c) => (
            <div key={c.name} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-primary" />
                <span className="font-medium">{c.name}</span>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">{c.status}</span>
            </div>
          ))}
        </Card>
      </Reveal>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <Card className="grid gap-8 border-border p-10 sm:p-14 lg:grid-cols-3">
          <div>
            <div className="font-display text-4xl font-bold text-primary">99.9%</div>
            <p className="mt-2 text-sm text-muted-foreground">Uptime SLA on School & Enterprise plans</p>
          </div>
          <div>
            <div className="font-display text-4xl font-bold text-primary">&lt; 4 hrs</div>
            <p className="mt-2 text-sm text-muted-foreground">Recovery time objective (RTO)</p>
          </div>
          <div>
            <div className="font-display text-4xl font-bold text-primary">7 days</div>
            <p className="mt-2 text-sm text-muted-foreground">Point-in-time restore window</p>
          </div>
        </Card>
      </Reveal>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Need a security review?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            We share our security whitepaper, DPA, and pen-test summary with prospective Enterprise customers under NDA.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="hero"><Link to="/demo">Talk to security<ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="hero-outline"><Link to="/data-protection">Data Protection</Link></Button>
          </div>
        </Card>
      </Reveal>
    </section>
  </>
);

export default Trust;
