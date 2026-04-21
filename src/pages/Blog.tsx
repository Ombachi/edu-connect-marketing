import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";

const featured = {
  category: "Product",
  title: "How AI grading is giving Kenyan tutors back 8 hours a week",
  excerpt:
    "We followed three tutoring centers in Nairobi for a term as they rolled out auto-grading. Here's what changed — and what didn't.",
  author: "Wanjiru Kamau",
  date: "Apr 12, 2026",
  readTime: "7 min read",
};

const posts = [
  {
    category: "Education",
    title: "Designing offline-first learning for low-bandwidth classrooms",
    excerpt: "Notes from building a PWA that works in Turkana, Kisumu, and rural Meru — and why service workers matter.",
    author: "Samuel Otieno",
    date: "Apr 5, 2026",
    readTime: "6 min read",
  },
  {
    category: "Case Study",
    title: "Coastal University onboards 1,200 students in two weeks",
    excerpt: "How a private university in Mombasa moved off three legacy tools and consolidated onto one platform.",
    author: "Dr. Amina Hassan",
    date: "Mar 28, 2026",
    readTime: "5 min read",
  },
  {
    category: "Product",
    title: "Introducing Swahili ⇄ English auto-translation in messaging",
    excerpt: "Parents and tutors can now message in their preferred language — translated in real time.",
    author: "Litu Hub Team",
    date: "Mar 21, 2026",
    readTime: "3 min read",
  },
  {
    category: "Engineering",
    title: "How we keep 99.9% uptime on African infrastructure",
    excerpt: "A look at our multi-region setup, edge caching strategy, and what we learned from outages.",
    author: "Brian Mwangi",
    date: "Mar 14, 2026",
    readTime: "8 min read",
  },
  {
    category: "Education",
    title: "What 50 principals told us about parent engagement",
    excerpt: "Research from our 2026 survey on what actually moves the needle on parent involvement.",
    author: "Wanjiru Kamau",
    date: "Mar 7, 2026",
    readTime: "9 min read",
  },
  {
    category: "Product",
    title: "New: Custom report builder for institutional analytics",
    excerpt: "Drag-and-drop reports across cohorts, terms, and subjects — exportable to PDF and CSV.",
    author: "Litu Hub Team",
    date: "Feb 28, 2026",
    readTime: "4 min read",
  },
];

const categories = ["All", "Product", "Education", "Engineering", "Case Study"];

const Blog = () => {
  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Subscribed! Look out for our next post.");
  };

  return (
    <>
      <SEO
        title="Blog"
        description="Insights, product updates, and case studies on building modern education platforms for African schools and universities."
        path="/blog"
      />

      <section className="border-b border-border bg-secondary/30">
        <div className="container-wide py-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">The Litu Hub Blog</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Notes on education, technology, and Africa.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Stories from the schools we work with and lessons from building a modern LMS.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-wide py-16">
        <Reveal>
          <Card className="grid overflow-hidden border-border bg-card lg:grid-cols-2">
            <div className="aspect-[4/3] bg-gradient-hero lg:aspect-auto" aria-hidden />
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                {featured.category}
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">{featured.title}</h2>
              <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{featured.author}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
              </div>
              <Button asChild className="mt-7 w-fit" variant="outline">
                <a href="#">Read article <ArrowRight className="h-4 w-4" /></a>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="container-wide pb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                i === 0
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-wide pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <Card className="group flex h-full flex-col overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="aspect-[16/9] bg-gradient-mesh" aria-hidden />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{p.author}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-24">
        <Reveal>
          <Card className="border-border bg-gradient-hero p-10 text-center text-primary-foreground sm:p-14">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Get the monthly digest</h2>
            <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
              One email a month. Product updates, case studies, and education research.
            </p>
            <form onSubmit={onSubscribe} className="mx-auto mt-7 flex max-w-md gap-2">
              <Input type="email" required placeholder="you@school.edu" className="bg-background text-foreground" />
              <Button type="submit" variant="hero">Subscribe</Button>
            </form>
          </Card>
        </Reveal>
      </section>
    </>
  );
};

export default Blog;
