import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const services = [
  { name: "Web Application (lituhub.lovable.app)", status: "operational", uptime: "99.99%" },
  { name: "API & GraphQL Gateway", status: "operational", uptime: "99.98%" },
  { name: "Authentication", status: "operational", uptime: "100%" },
  { name: "File Storage & Uploads", status: "operational", uptime: "99.97%" },
  { name: "Real-time Messaging", status: "operational", uptime: "99.95%" },
  { name: "AI Grading Service", status: "operational", uptime: "99.92%" },
  { name: "Email & Notifications", status: "operational", uptime: "99.99%" },
  { name: "Analytics & Reporting", status: "operational", uptime: "99.96%" },
];

const incidents = [
  {
    date: "Apr 8, 2026",
    title: "Brief delay on email notifications",
    status: "Resolved",
    detail: "Email queue backlog cleared after 22 minutes. No data loss.",
  },
  {
    date: "Mar 19, 2026",
    title: "Scheduled maintenance — DB upgrade",
    status: "Completed",
    detail: "Planned 15-minute window. Read-only mode during upgrade.",
  },
  {
    date: "Feb 27, 2026",
    title: "Intermittent file upload failures",
    status: "Resolved",
    detail: "Storage region failover completed in 38 minutes.",
  },
];

const StatusPage = () => (
  <>
    <SEO
      title="System Status"
      description="Real-time status and uptime history for Litu Hub services. View current incidents and past reports."
      path="/status"
    />

    <section className="border-b border-border bg-secondary/30">
      <div className="container-wide py-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">System Status</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">All systems operational</h1>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary-glow" />
            <span className="font-medium">Updated just now</span>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <h2 className="font-display text-2xl font-bold tracking-tight">Services</h2>
      </Reveal>
      <Card className="mt-6 divide-y divide-border border-border bg-card">
        {services.map((s) => (
          <div key={s.name} className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary-glow" />
              <span className="font-medium text-foreground">{s.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-muted-foreground sm:inline">{s.uptime} · 90 days</span>
              <span className="rounded-full bg-primary-glow/10 px-3 py-1 text-xs font-semibold text-primary-glow">
                Operational
              </span>
            </div>
          </div>
        ))}
      </Card>
    </section>

    <section className="container-wide pb-16">
      <Reveal>
        <h2 className="font-display text-2xl font-bold tracking-tight">90-day uptime</h2>
      </Reveal>
      <Card className="mt-6 border-border bg-card p-8">
        <div className="grid grid-cols-30 gap-1 sm:gap-1.5" style={{ gridTemplateColumns: "repeat(45, minmax(0, 1fr))" }}>
          {Array.from({ length: 90 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded-sm bg-primary-glow/80"
              title={`Day ${90 - i}: operational`}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>90 days ago</span>
          <span>Today</span>
        </div>
      </Card>
    </section>

    <section className="container-wide pb-24">
      <Reveal>
        <h2 className="font-display text-2xl font-bold tracking-tight">Recent incidents</h2>
      </Reveal>
      <div className="mt-6 space-y-4">
        {incidents.map((inc) => (
          <Card key={inc.date} className="border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="mt-1 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold">{inc.title}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {inc.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{inc.date}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{inc.detail}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default StatusPage;
