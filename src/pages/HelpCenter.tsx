import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, GraduationCap, Users, CreditCard, Settings, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
};

const CATEGORY_META: Record<string, { icon: any; desc: string }> = {
  "Getting Started": { icon: GraduationCap, desc: "Set up your institution, invite users, and launch your first course." },
  "Courses & Content": { icon: BookOpen, desc: "Build lessons, upload materials, and structure curricula." },
  "Roles & Permissions": { icon: Users, desc: "Manage admins, tutors, students, and parents." },
  "Billing & Plans": { icon: CreditCard, desc: "Subscriptions, invoices, and changing tiers." },
  "Integrations": { icon: Settings, desc: "Connect SIS, payment gateways, and SSO providers." },
  "Privacy & Security": { icon: ShieldCheck, desc: "Data protection, exports, and account safety." },
};

const HelpCenter = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("help_articles")
        .select("id,title,slug,category,excerpt")
        .eq("status", "published")
        .order("order_index", { ascending: true });
      setArticles((data as Article[]) ?? []);
    })();
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    for (const a of articles) map.set(a.category, (map.get(a.category) ?? 0) + 1);
    return Array.from(map.entries()).map(([title, count]) => ({
      title,
      count,
      ...CATEGORY_META[title] ?? { icon: BookOpen, desc: "" },
    }));
  }, [articles]);

  const filtered = useMemo(() => {
    if (!query.trim()) return articles.slice(0, 8);
    const q = query.toLowerCase();
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || (a.excerpt ?? "").toLowerCase().includes(q),
    );
  }, [articles, query]);

  return (
    <>
      <SEO
        title="Help Center"
        description="Guides, tutorials, and answers for using Litu Hub. Find help with setup, courses, billing, and integrations."
        path="/help"
      />

      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-wide py-20 text-center">
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Browse guides or search the knowledge base used by schools across Kenya.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="mx-auto mt-8 flex max-w-xl gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-background pl-9 text-foreground"
                  placeholder="Search articles, e.g. 'invite parents'"
                />
              </div>
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
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.count} {c.count === 1 ? "article" : "articles"}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {query.trim() ? "Search results" : "Popular articles"}
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No articles found.</div>
            ) : (
              filtered.map((a) => (
                <Link
                  key={a.id}
                  to={`/help/${a.slug}`}
                  className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground">{a.title}</div>
                    {a.excerpt && (
                      <div className="mt-1 truncate text-xs text-muted-foreground">{a.excerpt}</div>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))
            )}
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
};

export default HelpCenter;
