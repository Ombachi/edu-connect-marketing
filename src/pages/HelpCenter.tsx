import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  GraduationCap,
  Users,
  CreditCard,
  Settings,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
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
  "Getting Started": {
    icon: GraduationCap,
    desc: "Set up your institution, invite users, and launch your first course.",
  },
  "Courses & Content": { icon: BookOpen, desc: "Build lessons, upload materials, and structure curricula." },
  "Roles & Permissions": { icon: Users, desc: "Manage admins, tutors, students, and parents." },
  "Billing & Plans": { icon: CreditCard, desc: "Subscriptions, invoices, and changing tiers." },
  Integrations: { icon: Settings, desc: "Connect SIS, payment gateways, and SSO providers." },
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
    const map = new Map<string, Article[]>();
    for (const a of articles) {
      if (!map.has(a.category)) map.set(a.category, []);
      map.get(a.category)!.push(a);
    }
    return Array.from(map.entries()).map(([title, items]) => ({
      title,
      items,
      ...(CATEGORY_META[title] ?? { icon: BookOpen, desc: "" }),
    }));
  }, [articles]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter((a) => a.title.toLowerCase().includes(q) || (a.excerpt ?? "").toLowerCase().includes(q));
  }, [articles, query]);

  const isSearching = query.trim().length > 0;

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
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">Browse guides.</p>
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

      {isSearching ? (
        <section className="container-wide py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">Search results</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchResults.length} {searchResults.length === 1 ? "match" : "matches"} for "{query}"
            </p>
          </Reveal>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {searchResults.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No articles found.</div>
            ) : (
              searchResults.map((a) => (
                <Link
                  key={a.id}
                  to={`/help/${a.slug}`}
                  className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-secondary"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {a.category}
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">{a.title}</div>
                    {a.excerpt && <div className="mt-1 truncate text-xs text-muted-foreground">{a.excerpt}</div>}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              ))
            )}
          </div>
        </section>
      ) : (
        <section className="container-wide py-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">Browse by category</h2>
            <p className="mt-3 text-muted-foreground">Pick a category to jump straight into the articles.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <Card className="flex h-full flex-col border-border bg-card p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                  <ul className="mt-6 divide-y divide-border border-t border-border">
                    {c.items.map((a) => (
                      <li key={a.id}>
                        <Link
                          to={`/help/${a.slug}`}
                          className="group flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:text-primary"
                        >
                          <span className="min-w-0 truncate">{a.title}</span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {c.items.length} {c.items.length === 1 ? "article" : "articles"}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-wide py-20">
        <Reveal>
          <Card className="flex flex-col items-center gap-6 border-border bg-card p-10 text-center sm:p-14">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Still need help?</h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Our Nairobi-based team responds within 24 hours, weekdays.
              </p>
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
