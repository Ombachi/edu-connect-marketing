import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import {
  Brain,
  GraduationCap,
  Heart,
  WifiOff,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  Sparkles,
  PlayCircle,
} from "lucide-react";

type Annotation = { x: number; y: number; label: string };

// ---------- Mock screens ----------
const GradebookMock = ({ highlight }: { highlight: number | null }) => (
  <div className="flex h-full flex-col bg-background p-5 text-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-display text-base font-semibold">Form 3 · Mathematics</p>
        <p className="text-xs text-muted-foreground">Term 2 — Continuous Assessment</p>
      </div>
      <Badge variant="secondary">42 students</Badge>
    </div>
    <div className="mt-4 grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground">
      <span>Student</span><span>Quiz 1</span><span>Essay</span><span>Mid-term</span><span>Average</span>
    </div>
    <div className="mt-2 divide-y divide-border rounded-lg border border-border">
      {[
        ["Achieng' A.", 86, 92, 78, 85, true],
        ["Brian K.", 72, 68, 81, 74, false],
        ["Cynthia O.", 91, 88, 94, 91, true],
        ["David M.", 58, 62, 55, 58, false],
        ["Esther N.", 79, 84, 77, 80, true],
      ].map(([name, q, e, m, avg, up], i) => (
        <div key={i} className={`grid grid-cols-5 gap-2 p-2 ${highlight === 1 && i === 0 ? "bg-accent-soft/60" : ""}`}>
          <span className="font-medium">{name as string}</span>
          <span>{q}</span><span>{e}</span><span>{m}</span>
          <span className="inline-flex items-center gap-1 font-semibold">
            {avg}{up ? <TrendingUp className="h-3 w-3 text-primary" /> : null}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-auto flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-xs text-primary">
      <Sparkles className="h-4 w-4" /> AI suggests review for 2 at-risk learners
    </div>
  </div>
);

const ParentAppMock = ({ highlight }: { highlight: number | null }) => (
  <div className="mx-auto flex h-full max-w-xs flex-col bg-background p-4 text-sm">
    <div className="rounded-2xl bg-gradient-hero p-4 text-primary-foreground">
      <p className="text-xs opacity-80">Hello, Mama Achieng'</p>
      <p className="mt-1 font-display text-lg font-bold">Achieng's week</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-primary-foreground/10 p-2"><p className="opacity-70">Avg</p><p className="text-base font-semibold">87%</p></div>
        <div className="rounded-lg bg-primary-foreground/10 p-2"><p className="opacity-70">Attend</p><p className="text-base font-semibold">100%</p></div>
        <div className={`rounded-lg p-2 ${highlight === 1 ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10"}`}><p className="opacity-70">Fees</p><p className="text-base font-semibold">Paid</p></div>
      </div>
    </div>
    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent</p>
    <div className="mt-2 space-y-2">
      <Card className="flex items-center gap-3 p-3"><CheckCircle2 className="h-4 w-4 text-primary" /><div className="flex-1 text-xs"><p className="font-medium">Math quiz: 92%</p><p className="text-muted-foreground">2 hours ago</p></div></Card>
      <Card className={`flex items-center gap-3 p-3 ${highlight === 2 ? "ring-2 ring-primary" : ""}`}><MessageCircle className="h-4 w-4 text-primary" /><div className="flex-1 text-xs"><p className="font-medium">Mr. Otieno: Great progress!</p><p className="text-muted-foreground">Yesterday</p></div></Card>
      <Card className="flex items-center gap-3 p-3"><Heart className="h-4 w-4 text-accent" /><div className="flex-1 text-xs"><p className="font-medium">Term report ready</p><p className="text-muted-foreground">3 days ago</p></div></Card>
    </div>
  </div>
);

const OfflineMock = ({ highlight }: { highlight: number | null }) => (
  <div className="flex h-full flex-col bg-background p-5 text-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-display text-base font-semibold">My downloaded lessons</p>
        <p className="text-xs text-muted-foreground">Available offline · syncs when online</p>
      </div>
      <Badge variant="outline" className={`gap-1 ${highlight === 1 ? "border-accent bg-accent-soft text-accent-foreground" : ""}`}>
        <WifiOff className="h-3 w-3" /> Offline mode
      </Badge>
    </div>
    <div className="mt-4 space-y-2">
      {[
        ["Biology · Photosynthesis", "12 MB", 100],
        ["English · Essay structure", "8 MB", 100],
        ["Math · Quadratic equations", "15 MB", 100],
        ["History · Pre-colonial Kenya", "10 MB", 64],
      ].map(([t, s, p], i) => (
        <Card key={i} className={`p-3 ${highlight === 2 && i === 3 ? "ring-2 ring-primary" : ""}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">{t}</p>
            <span className="text-[10px] text-muted-foreground">{s}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${p}%` }} />
          </div>
        </Card>
      ))}
    </div>
    <div className="mt-auto rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
      3 quiz submissions queued — will upload when connection returns.
    </div>
  </div>
);

const AIGradingMock = ({ highlight }: { highlight: number | null }) => (
  <div className="flex h-full flex-col bg-background p-5 text-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">English · Essay submission</p>
    <p className="mt-1 font-display text-base font-semibold">"The role of youth in nation building"</p>
    <Card className="mt-3 p-3 text-xs leading-relaxed text-muted-foreground">
      The youth are the backbone of every developing nation. In Kenya today, young people contribute to innovation, civic engagement…
    </Card>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {[
        ["Structure", 8, 10],
        ["Grammar", 7, 10],
        ["Argument", 9, 10],
      ].map(([k, s, m], i) => (
        <Card key={i} className={`p-3 text-center ${highlight === 1 && i === 2 ? "border-primary" : ""}`}>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
          <p className="mt-1 font-display text-lg font-semibold">{s}<span className="text-xs text-muted-foreground">/{m}</span></p>
        </Card>
      ))}
    </div>
    <Card className={`mt-3 flex gap-3 p-3 ${highlight === 2 ? "ring-2 ring-primary" : ""}`}>
      <Sparkles className="h-4 w-4 shrink-0 text-primary" />
      <div className="text-xs leading-relaxed">
        <p className="font-semibold">AI feedback</p>
        <p className="mt-1 text-muted-foreground">Strong thesis. Tighten paragraph 2 — three ideas competing. Cite a Kenyan example to strengthen the closing argument.</p>
      </div>
    </Card>
    <div className="mt-auto flex items-center justify-between text-xs">
      <span className="text-muted-foreground">Final grade</span>
      <span className="font-display text-2xl font-bold text-primary">24/30</span>
    </div>
  </div>
);

// ---------- Tour config ----------
const screens = [
  {
    id: "gradebook",
    icon: GraduationCap,
    label: "Gradebook",
    desc: "Track every score, flag at-risk learners.",
    render: (h: number | null) => <GradebookMock highlight={h} />,
    annotations: [
      { x: 8, y: 36, label: "Top performer highlighted automatically" },
      { x: 68, y: 88, label: "AI flags at-risk learners for follow-up" },
    ] as Annotation[],
  },
  {
    id: "parent",
    icon: Heart,
    label: "Parent app",
    desc: "Live grades, fees, and tutor chat on any phone.",
    render: (h: number | null) => <ParentAppMock highlight={h} />,
    annotations: [
      { x: 70, y: 24, label: "Fees status updates the moment M-Pesa clears" },
      { x: 40, y: 70, label: "Direct message tutors — no extra app" },
    ] as Annotation[],
  },
  {
    id: "offline",
    icon: WifiOff,
    label: "Offline mode",
    desc: "Learn, quiz, and submit even without data.",
    render: (h: number | null) => <OfflineMock highlight={h} />,
    annotations: [
      { x: 72, y: 12, label: "Auto-detects offline; UI keeps working" },
      { x: 30, y: 76, label: "Partial downloads resume on next signal" },
    ] as Annotation[],
  },
  {
    id: "ai",
    icon: Brain,
    label: "AI grading",
    desc: "Rubric-aware feedback in seconds, not days.",
    render: (h: number | null) => <AIGradingMock highlight={h} />,
    annotations: [
      { x: 78, y: 36, label: "Per-criterion scores, not just a number" },
      { x: 22, y: 64, label: "Actionable feedback students can learn from" },
    ] as Annotation[],
  },
];

export const ProductTour = () => {
  const [active, setActive] = useState(screens[0].id);
  const [highlight, setHighlight] = useState<number | null>(null);

  return (
    <section className="container-wide py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
          <PlayCircle className="h-3.5 w-3.5" /> Interactive tour
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          See Litu Hub without booking a call
        </h2>
        <p className="mt-3 text-muted-foreground">
          Click through real screens — gradebook, parent app, offline mode, AI grading. Hover the dots to learn what each part does.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <Tabs value={active} onValueChange={(v) => { setActive(v); setHighlight(null); }} className="w-full">
          <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-2 sm:grid-cols-4">
            {screens.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="gap-1.5 text-xs sm:text-sm">
                <s.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {screens.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-8">
              <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.4fr]">
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">{s.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">{s.desc}</h3>
                  <p className="mt-4 text-muted-foreground">
                    Hover the highlighted dots to reveal what each part does.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {s.annotations.map((a, i) => (
                      <li
                        key={i}
                        onMouseEnter={() => setHighlight(i + 1)}
                        onMouseLeave={() => setHighlight(null)}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:border-primary hover:bg-secondary/50"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {i + 1}
                        </span>
                        <span>{a.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-hero opacity-10 blur-2xl" aria-hidden />
                  <Card className="relative aspect-[4/3] overflow-hidden border-border bg-card shadow-elevated">
                    <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                      <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                      <span className="ml-2 text-[10px] text-muted-foreground">lituhub.app / {s.id}</span>
                    </div>
                    <div className="relative h-[calc(100%-2rem)] overflow-hidden">
                      {s.render(highlight)}
                      {s.annotations.map((a, i) => (
                        <button
                          key={i}
                          type="button"
                          onMouseEnter={() => setHighlight(i + 1)}
                          onMouseLeave={() => setHighlight(null)}
                          onFocus={() => setHighlight(i + 1)}
                          onBlur={() => setHighlight(null)}
                          aria-label={a.label}
                          style={{ left: `${a.x}%`, top: `${a.y}%` }}
                          className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                        >
                          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" aria-hidden />
                          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-elevated">
                            {i + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>
    </section>
  );
};
