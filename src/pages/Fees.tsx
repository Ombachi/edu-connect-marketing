import { Link } from "react-router-dom";
import {
  ArrowRight,
  Smartphone,
  CreditCard,
  Building2,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  Bell,
  Lock,
  Unlock,
  Wallet,
  MessageSquare,
  Megaphone,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const methods = [
  { icon: Smartphone, title: "M-Pesa STK Push", desc: "One-tap mobile money payment — the dominant rail in Kenya, Tanzania, and Uganda." },
  { icon: CreditCard, title: "Card payments", desc: "Visa, Mastercard, and Verve via Flutterwave & Paystack — tokenized, PCI-compliant, no card data stored on Litu Hub." },
  { icon: Building2, title: "Bank transfer", desc: "Each invoice gets a unique reference code so the bursar can reconcile EFTs in seconds." },
  { icon: Banknote, title: "Cash at the office", desc: "Bursar marks invoices paid manually — receipts auto-generated and sent to the parent." },
];

const tiers = [
  { status: "Paid / current", access: "Full access", tone: "ok" },
  { status: "Installment plan on track", access: "Full access", tone: "ok" },
  { status: "Overdue · less than 14 days", access: "Grace period — full access with banner reminder", tone: "warn" },
  { status: "Overdue · 14 days or more", access: "Read-only: existing material yes, new term registration no", tone: "warn" },
  { status: "Blocked by admin", access: "Login only — sees fee statement & payment options", tone: "block" },
];

const channels = [
  { icon: MessageSquare, title: "Parent ↔ Tutor (per child)", desc: "1:1 threads, audited and visible to school admin for safeguarding." },
  { icon: Users, title: "Class channels", desc: "Tutor announcements to a whole class — students and parents subscribed automatically." },
  { icon: Megaphone, title: "School broadcasts", desc: "Admin → role (all parents, Form 2 parents, all staff). Push, email, and optional SMS." },
  { icon: Bell, title: "System notifications", desc: "Fee reminders, attendance alerts, grade releases — multi-channel with quiet hours." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which payment methods does Litu Hub support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "M-Pesa (via Daraja STK push), Visa/Mastercard/Verve cards through Flutterwave and Paystack, bank transfer with unique reference codes, and manual cash reconciliation by the bursar.",
      },
    },
    {
      "@type": "Question",
      name: "Will students be locked out the moment fees are overdue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Litu Hub uses a humane grace period. Students keep full access for the first 14 days overdue, then move to read-only — they can review existing material but cannot register for new terms or classes until fees are settled.",
      },
    },
    {
      "@type": "Question",
      name: "Is Litu Hub safe for storing card details?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Card numbers are tokenized by PCI-DSS certified providers (Flutterwave, Paystack). Litu Hub never stores raw card data on its servers.",
      },
    },
    {
      "@type": "Question",
      name: "Can parents and tutors message each other directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Parents and tutors can DM about a specific child. All conversations are logged and visible to school administrators for safeguarding. Schools can disable parent-tutor DMs entirely if their policy requires it.",
      },
    },
  ],
};

const Fees = () => (
  <>
    <SEO
      title="Fees, Payments & Communication"
      description="How Litu Hub handles school fees, payment confirmation, student access, and communication between parents, tutors, students, and admins."
      path="/fees"
      jsonLd={faqJsonLd}
    />

    {/* Hero */}
    <section className="bg-gradient-warm">
      <div className="container-wide py-20 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            Fees & Communication
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Fee status, payments, and access — built into the platform
          </h1>
          <p className="mt-5 text-lg text-muted-foreground text-pretty">
            Parents pay fees from their phone. Payments unlock students automatically. Bursars get a clean reconciliation
            view. And every message — parent, tutor, student, admin — lives in one safeguarded inbox.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/demo">See it in a demo<ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://lituhub.lovable.app">Open the platform</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Workflow diagram */}
    <section className="container-wide py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">The fee → access workflow</h2>
        <p className="mt-3 text-muted-foreground">Three roles. One automated handoff. Zero spreadsheets.</p>
      </Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          {
            step: "01",
            role: "School admin / bursar",
            icon: Building2,
            title: "Issue invoices",
            desc: "Define the fee structure per class and term. Litu Hub generates invoices, sends them to parents, and tracks status in one dashboard.",
          },
          {
            step: "02",
            role: "Parent",
            icon: Wallet,
            title: "Pay from the parent portal",
            desc: "Parents see invoices on their phone, pick M-Pesa, card, or bank transfer, and pay in under a minute. Saved methods speed up next term.",
          },
          {
            step: "03",
            role: "Student",
            icon: Unlock,
            title: "Auto-unlock access",
            desc: "The moment payment confirms, the student is unlocked — class registration, assignments, and report cards open automatically.",
          },
        ].map((s, i) => (
          <Reveal key={s.step} delay={i * 0.08}>
            <Card className="relative h-full border-border bg-card p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-bold text-primary/30">{s.step}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.role}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Payment methods */}
    <section className="bg-secondary/40 py-20">
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Pay the way African families actually pay</h2>
          <p className="mt-3 text-muted-foreground">Mobile money first. Cards second. Bank and cash for the rest.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m, i) => (
            <Reveal key={m.title} delay={(i % 4) * 0.06}>
              <Card className="h-full border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-xl border border-border bg-card p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              Card details are tokenized by PCI-DSS certified processors. Litu Hub never stores raw card numbers — and
              all transactions run over TLS 1.3 with audit logs retained for seven years.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Access tiers */}
    <section className="container-wide py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Access gating — humane by default</h2>
        <p className="mt-3 text-muted-foreground">
          Students should never be cut off from learning material they've already started. Litu Hub gates new term
          registration and official reports — not the lessons themselves.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <Card className="mx-auto mt-12 max-w-4xl overflow-hidden border-border">
          <div className="grid grid-cols-[1fr_1.4fr] divide-x divide-border bg-secondary/40 px-6 py-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fee status</h3>
            <h3 className="pl-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Student access</h3>
          </div>
          {tiers.map((t) => {
            const Icon =
              t.tone === "ok" ? CheckCircle2 : t.tone === "warn" ? Bell : Lock;
            const color =
              t.tone === "ok"
                ? "text-primary"
                : t.tone === "warn"
                  ? "text-accent-foreground"
                  : "text-destructive";
            return (
              <div
                key={t.status}
                className="grid grid-cols-[1fr_1.4fr] divide-x divide-border border-t border-border px-6 py-5"
              >
                <div className="flex items-center gap-3 pr-4">
                  <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                  <span className="text-sm font-medium">{t.status}</span>
                </div>
                <p className="pl-6 text-sm text-muted-foreground">{t.access}</p>
              </div>
            );
          })}
        </Card>
      </Reveal>
    </section>

    {/* Communication */}
    <section className="bg-gradient-warm py-20">
      <div className="container-wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">One unified, safeguarded inbox</h2>
          <p className="mt-3 text-muted-foreground">
            Replace the WhatsApp groups, paper letters, and missed phone calls with a single audited channel — with the
            right notification reaching the right person at the right time.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <Card className="h-full border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{c.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Card className="mx-auto mt-10 max-w-3xl border-border bg-card p-6">
            <h3 className="font-display text-base font-semibold">Built-in safeguarding rules</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {[
                "All parent ↔ tutor messages are logged and visible to school administrators.",
                "Tutors cannot DM students 1:1 unless the school explicitly enables that policy.",
                "Quiet hours (default 8pm–7am) defer non-urgent notifications — emergencies still bypass.",
                "Fee reminders go via SMS for cut-through; announcements via push and email.",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </section>

    {/* CTA */}
    <section className="container-wide py-24">
      <Reveal>
        <Card className="bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            See the fees & messaging workflow on your school's data
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Book a 30-minute walkthrough — we'll spin up a tenant pre-loaded with sample invoices, a parent payment
            flow, and a live tutor conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="hero">
              <Link to="/demo">Request a Demo<ArrowRight className="h-4 w-4" /></Link>
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

export default Fees;
