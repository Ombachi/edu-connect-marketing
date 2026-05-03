import { Link } from "react-router-dom";
import { Search, BookOpen, GraduationCap, Users, CreditCard, Settings, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const categories = [
  { icon: GraduationCap, title: "Getting Started", desc: "Set up your institution, invite users, and launch your first course.", count: 18 },
  { icon: BookOpen, title: "Courses & Content", desc: "Build lessons, upload materials, and structure curricula.", count: 24 },
  { icon: Users, title: "Roles & Permissions", desc: "Manage admins, tutors, students, and parents.", count: 12 },
  { icon: CreditCard, title: "Billing & Plans", desc: "Subscriptions, invoices, and changing tiers.", count: 9 },
  { icon: Settings, title: "Integrations", desc: "Connect SIS, payment gateways, and SSO providers.", count: 14 },
  { icon: ShieldCheck, title: "Privacy & Security", desc: "Data protection, exports, and account safety.", count: 11 },
];

const popular = [
  "How do I invite tutors and students in bulk?",
  "Setting up your school's branding and subdomain",
  "Importing a class roster from CSV",
  "Configuring auto-grading rubrics",
  "Enabling the parent portal for your institution",
  "Switching from Starter to School plan",
];

const faqAnswers: Record<string, string> = {
  "How do I invite tutors and students in bulk?":
    "Go to Settings → Members → Invite, then upload a CSV with columns for name, email, and role. Litu Hub sends branded invitations and tracks acceptances automatically.",
  "Setting up your school's branding and subdomain":
    "From Settings → Branding, upload your logo, set your colors, and choose a subdomain (e.g. yourschool.lituhub.app). Changes propagate within minutes.",
  "Importing a class roster from CSV":
    "Open the class, choose Import students, and upload your CSV. Litu Hub validates the file, flags duplicates, and lets you map columns to fields.",
  "Configuring auto-grading rubrics":
    "Inside any assignment, open the Rubric tab, define criteria and weight, and toggle AI-assisted grading. Tutors review and approve each grade before it is published.",
  "Enabling the parent portal for your institution":
    "Toggle Parent Portal in Settings → Modules. Parents are invited automatically when you link them to a student record.",
  "Switching from Starter to School plan":
    "Go to Settings → Billing → Change plan. Upgrades are pro-rated and take effect immediately; downgrades apply at the next renewal.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: popular.map((q) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: faqAnswers[q] },
  })),
};

const HelpCenter = () => (
  <>
    <SEO
      title="Help Center"
      description="Guides, tutorials, and answers for using Litu Hub. Find help with setup, courses, billing, and integrations."
      path="/help"
      jsonLd={faqJsonLd}
    />

    <section className="bg-gradient-hero text-primary-foreground">
      <div className="container-wide py-20 text-center">
        <Reveal>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Browse guides or search the knowledge base used by 50+ schools.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="mx-auto mt-8 flex max-w-xl gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="bg-background pl-9 text-foreground" placeholder="Search articles, e.g. 'invite parents'" />
            </div>
            <Button type="submit" variant="hero">Search</Button>
          </form>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight">Browse by category</h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <Card className="group h-full border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.count} articles</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="bg-secondary/40 py-20">
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight">Popular articles</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
          {popular.map((p) => (
            <a key={p} href="#" className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-secondary">
              <span className="text-sm font-medium text-foreground">{p}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="container-wide py-20">
      <Reveal>
        <Card className="flex flex-col items-center gap-6 border-border bg-card p-10 text-center sm:p-14">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Still need help?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">Our Nairobi-based team responds within 24 hours, weekdays.</p>
          </div>
          <Button asChild size="lg">
            <Link to="/demo">Contact support</Link>
          </Button>
        </Card>
      </Reveal>
    </section>
  </>
);

export default HelpCenter;
