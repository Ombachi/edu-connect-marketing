import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, TrendingUp, Clock, Users, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

const ICONS = [TrendingUp, Clock, Users, GraduationCap];

type Metric = { value: string; label: string };
type Study = {
  slug: string;
  institution: string;
  type: string;
  headline: string;
  summary: string;
  content: string;
  metrics: Metric[];
};

const fallbackStories: Record<string, Study> = {
  "nairobi-academy": {
    slug: "nairobi-academy",
    institution: "Nairobi Academy",
    type: "K-12 School · 850 students",
    headline: "Replaced three tools and cut admin work by 40%",
    summary:
      "Consolidated grading, parent communication, and attendance into Litu Hub. Parent satisfaction rose from 62% to 91% in one term.",
    metrics: [
      { value: "+47%", label: "Parent engagement" },
      { value: "8 hrs", label: "Saved per tutor / week" },
      { value: "850", label: "Active students" },
    ],
    content: `Nairobi Academy was running its operations across three disconnected tools: one for grading, a WhatsApp group for parents, and paper registers for attendance. Tutors spent hours every week copying data between systems, and parents only heard from the school when something went wrong.

## The switch

The school moved everything onto Litu Hub over a single half-term break. Class lists were imported in bulk, tutors were trained in two afternoon sessions, and parents were onboarded through SMS invitations.

## What changed

- **Grading** — tutors enter marks once and report cards generate automatically.
- **Attendance** — taken on a phone in under a minute per class, with instant alerts to parents of absent students.
- **Parent communication** — announcements, fee balances, and results now reach every parent through the portal and app.

## The results

Within one term, administrative work dropped by 40%. Parent satisfaction — measured by the school's own end-of-term survey — climbed from 62% to 91%. Tutors report saving around 8 hours each per week, time they now spend on lesson preparation and one-on-one student support.`,
  },
  "coastal-university": {
    slug: "coastal-university",
    institution: "Coastal University",
    type: "Private University · 4,200 students",
    headline: "Onboarded 1,200 new students in two weeks",
    summary:
      "Migrated from a legacy LMS during the semester break. Used bulk import, custom roles, and SSO with the existing student information system.",
    metrics: [
      { value: "1,200", label: "Students onboarded" },
      { value: "14 days", label: "Migration window" },
      { value: "99.9%", label: "Uptime since launch" },
    ],
    content: `Coastal University's legacy LMS had become a bottleneck. Every intake semester, registering new students took weeks of manual work, and the system buckled under exam-period load.

## The migration

Working with the Litu Hub team during the semester break, the university migrated four years of course materials, staff accounts, and student records in a 14-day window.

- **Bulk import** moved 1,200 incoming students and 4,200 continuing students from spreadsheets directly into class groups.
- **Custom roles** gave deans, lecturers, and exam officers exactly the permissions each needed — no more shared admin passwords.
- **SSO integration** with the existing student information system meant students log in with the same credentials they already knew.

## The results

The new intake was fully registered and attending online classes within two weeks — a process that previously took over a month. The platform has held 99.9% uptime since launch, including through two full exam periods.`,
  },
  "bright-futures": {
    slug: "bright-futures",
    institution: "Bright Futures Tutoring",
    type: "Tutoring Network · 12 centers",
    headline: "Standardized quality across 12 centers",
    summary:
      "Used multi-tenant branding to give each center its own portal while head office sees consolidated analytics across all locations.",
    metrics: [
      { value: "12", label: "Branded centers" },
      { value: "+31%", label: "Test score uplift" },
      { value: "2x", label: "Faster grading" },
    ],
    content: `Bright Futures runs 12 tutoring centers across Kenya. Each center had developed its own way of setting tests, recording marks, and reporting to parents — which made it impossible for head office to compare performance or guarantee a consistent standard.

## One platform, twelve brands

Litu Hub's multi-tenant setup gave each center its own branded portal — its own logo, colours, and domain — while all data flows into a single consolidated view for head office.

- **Shared question bank** — every center now sets tests from the same curriculum-aligned bank.
- **Auto-grading** — objective questions are marked instantly, cutting grading time in half.
- **Consolidated analytics** — head office sees pass rates, attendance, and score trends per center in real time.

## The results

Average test scores rose 31% across the network in two terms. Parents in every location now receive the same quality of progress reporting, and head office can spot an underperforming center within days rather than at the end of term.`,
  },
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [study, setStudy] = useState<Study | null>(slug ? fallbackStories[slug] ?? null : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("slug,institution,institution_type,headline,summary,content,metrics")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (data) {
        setStudy({
          slug: data.slug,
          institution: data.institution,
          type: data.institution_type ?? "",
          headline: data.headline,
          summary: data.summary ?? "",
          content: data.content ?? "",
          metrics: (Array.isArray(data.metrics) ? (data.metrics as Metric[]) : []).slice(0, 4),
        });
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="container-wide py-24 text-muted-foreground">Loading…</div>;

  if (!study) {
    return (
      <div className="container-wide py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Story not found</h1>
        <p className="mt-3 text-muted-foreground">This case study may have been moved or unpublished.</p>
        <Button asChild className="mt-6"><Link to="/case-studies">All case studies</Link></Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${study.institution} — Case Study`}
        description={study.summary || study.headline}
        path={`/case-studies/${study.slug}`}
      />

      <section className="border-b border-border bg-secondary/30">
        <div className="container-wide py-14">
          <Reveal>
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-3">
              <Link to="/case-studies"><ArrowLeft className="h-4 w-4" /> All case studies</Link>
            </Button>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{study.type}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {study.institution}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{study.headline}</p>
          </Reveal>
        </div>
      </section>

      {study.metrics.length > 0 && (
        <section className="container-wide py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.metrics.map((m, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={m.label + i} delay={i * 0.05}>
                  <Card className="flex items-center gap-4 border-border bg-card p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-2xl font-bold">{m.value}</div>
                      <div className="text-xs text-muted-foreground">{m.label}</div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      <section className="container-wide max-w-3xl py-12">
        <Reveal>
          {study.content ? (
            <div className="prose prose-neutral max-w-none dark:prose-invert">
              {study.content.split(/\n{2,}/).map((block, i) => {
                const trimmed = block.trim();
                if (trimmed.startsWith("## ")) {
                  return <h2 key={i} className="mt-10 font-display text-2xl font-bold">{trimmed.slice(3)}</h2>;
                }
                if (trimmed.startsWith("- ")) {
                  return (
                    <ul key={i} className="mt-4 list-disc space-y-2 pl-6">
                      {trimmed.split("\n").map((li, j) => (
                        <li key={j} className="text-muted-foreground">{li.replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, "$1")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="mt-5 leading-relaxed text-muted-foreground">{trimmed}</p>;
              })}
            </div>
          ) : (
            <p className="leading-relaxed text-muted-foreground">{study.summary}</p>
          )}
        </Reveal>
      </section>

      <section className="container-wide pb-24">
        <Reveal>
          <Card className="border-border bg-card p-10 text-center sm:p-14">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Could your school be next?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Book a demo and we'll walk you through how institutions like yours are getting value in the first 30 days.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/demo">Request a Demo <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Card>
        </Reveal>
      </section>
    </>
  );
};

export default CaseStudyDetail;
