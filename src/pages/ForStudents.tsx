import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Wifi, Trophy, MessageCircle, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";

const features = [
  { icon: Smartphone, title: "Built for your phone", desc: "Everything you need on Android or iOS. No huge downloads, no expensive laptops needed." },
  { icon: Wifi, title: "Works offline", desc: "Download lessons over WiFi, study on the bus. Submissions sync when you're back online." },
  { icon: Trophy, title: "Track your progress", desc: "See your grades, badges, and ranking — and exactly which topics to revise next." },
  { icon: MessageCircle, title: "Ask your tutor", desc: "Direct messaging with your tutor and classmates. Get help without waiting for the next class." },
  { icon: Calendar, title: "Never miss a deadline", desc: "Your timetable, assignments, and exam dates in one place with push reminders." },
  { icon: FileText, title: "Instant feedback", desc: "AI marks quizzes the moment you submit, so you know what to fix before the next lesson." },
];

const ForStudents = () => (
  <>
    <SEO
      title="For Students"
      description="Litu Hub for students: mobile-first, works offline, instant quiz feedback. Study smarter from your phone."
      path="/for-students"
    />

    <section className="bg-gradient-hero text-primary-foreground">
      <div className="container-wide py-20 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            For Students
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">Learning that fits in your pocket</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/80">
            Lessons, assignments, grades, and your tutor — all in one app that actually works on your phone, even offline.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="hero"><a href="https://lituhub.lovable.app">Log in to Litu Hub<ArrowRight className="h-4 w-4" /></a></Button>
            <Button asChild size="lg" variant="hero-outline"><Link to="/help">Browse help articles</Link></Button>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="container-wide py-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <Card className="h-full border-border p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container-wide py-16">
      <Reveal>
        <Card className="border-border bg-card p-10 text-center sm:p-14">
          <h2 className="font-display text-3xl font-bold tracking-tight">Is your school on Litu Hub?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            If your tutor has set you up, log in with the email your school provided. If not, ask them to start a free pilot.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><a href="https://lituhub.lovable.app">Log in</a></Button>
            <Button asChild size="lg" variant="outline"><Link to="/help">Help Center</Link></Button>
          </div>
        </Card>
      </Reveal>
    </section>
  </>
);

export default ForStudents;
