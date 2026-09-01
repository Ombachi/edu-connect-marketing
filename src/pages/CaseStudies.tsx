import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Clock, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

const ICONS = [TrendingUp, Clock, Users, GraduationCap];

const fallback = [
  {
    slug: "nairobi-academy",
    institution: "Nairobi Academy",
    type: "K-12 School · 850 students",
    headline: "Replaced three tools and cut admin work by 40%",
    summary:
      "Consolidated grading, parent communication, and attendance into Litu Hub. Parent satisfaction rose from 62% to 91% in one term.",
    metrics: [
      { icon: TrendingUp, value: "+47%", label: "Parent engagement" },
      { icon: Clock, value: "8 hrs", label: "Saved per tutor / week" },
      { icon: Users, value: "850", label: "Active students" },
    ],
  },
  {
    slug: "coastal-university",
    institution: "Coastal University",
    type: "Private University · 4,200 students",
    headline: "Onboarded 1,200 new students in two weeks",
    summary:
      "Migrated from a legacy LMS during the semester break. Used bulk import, custom roles, and SSO with the existing student information system.",
    metrics: [
      { icon: GraduationCap, value: "1,200", label: "Students onboarded" },
      { icon: Clock, value: "14 days", label: "Migration window" },
      { icon: TrendingUp, value: "99.9%", label: "Uptime since launch" },
    ],
  },
  {
    slug: "bright-futures",
    institution: "Bright Futures Tutoring",
    type: "Tutoring Network · 12 centers",
    headline: "Standardized quality across 12 centers",
    summary:
      "Used multi-tenant branding to give each center its own portal while head office sees consolidated analytics across all locations.",
    metrics: [
      { icon: Users, value: "12", label: "Branded centers" },
      { icon: TrendingUp, value: "+31%", label: "Test score uplift" },
      { icon: Clock, value: "2x", label: "Faster grading" },
    ],
  },
];

type Study = {
  slug: string;
  institution: string;
  type: string;
  headline: string;
  summary: string;
  metrics: { icon: typeof TrendingUp; value: string; label: string }[];
};

const CaseStudies = () => {
  const [studies, setStudies] = useState<Study[]>(fallback);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("case_studies")
        .select("slug,institution,institution_type,headline,summary,metrics,display_order")
        .eq("status", "published")
        .order("display_order", { ascending: true });
      if (data && data.length > 0) {
        setStudies(data.map((d) => ({
          slug: d.slug,
          institution: d.institution,
          type: d.institution_type ?? "",
          headline: d.headline,
          summary: d.summary ?? "",
          metrics: (Array.isArray(d.metrics) ? d.metrics : []).slice(0, 4).map((m: { value: string; label: string }, i: number) => ({
            icon: ICONS[i % ICONS.length],
            value: m.value,
            label: m.label,
          })),
        })));
      }
    })();
  }, []);

  return (
  <>
    <SEO
      title="Case Studies"
      description="See how schools, universities, and tutoring centers across Africa modernize their operations with Litu Hub."
      path="/case-studies"
    />

    <section className="border-b border-border bg-secondary/30">
      <div className="container-wide py-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Customer Stories</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Real schools. Real results.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            How institutions across Kenya use Litu Hub to teach more students, support more parents, and free up tutor time.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-20">
      <div className="space-y-12">
        {studies.map((s, i) => (
          <Reveal key={s.institution + i} delay={i * 0.05}>
            <Card className="grid overflow-hidden border-border bg-card lg:grid-cols-[1.2fr_2fr]">
              <div className="flex flex-col justify-between gap-6 bg-gradient-hero p-8 text-primary-foreground sm:p-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">{s.type}</p>
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">{s.institution}</h2>
                </div>
                <div className="space-y-4">
                  {s.metrics.map((m) => (
                    <div key={m.label} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 text-accent">
                        <m.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-bold">{m.value}</div>
                        <div className="text-xs text-primary-foreground/70">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <h3 className="font-display text-2xl font-bold tracking-tight">{s.headline}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.summary}</p>
                <Button asChild variant="outline" className="mt-7 w-fit">
                  <Link to={`/case-studies/${s.slug}`}>Read full story <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
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

export default CaseStudies;
