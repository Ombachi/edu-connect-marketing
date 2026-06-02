import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,cover_image_url,published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      setPosts((data as Post[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const [featured, ...rest] = posts;

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

      {loading ? (
        <div className="container-wide py-20 text-sm text-muted-foreground">Loading posts…</div>
      ) : posts.length === 0 ? (
        <div className="container-wide py-20 text-center text-muted-foreground">
          No posts published yet. Check back soon.
        </div>
      ) : (
        <>
          <section className="container-wide py-16">
            <Reveal>
              <Card className="grid overflow-hidden border-border bg-card lg:grid-cols-2">
                <Link to={`/blog/${featured.slug}`} className="aspect-[4/3] overflow-hidden bg-gradient-hero lg:aspect-auto">
                  {featured.cover_image_url && (
                    <img src={featured.cover_image_url} alt={featured.title} className="h-full w-full object-cover" />
                  )}
                </Link>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                    Featured
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">{featured.title}</h2>
                  {featured.excerpt && <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>}
                  <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmt(featured.published_at)}</span>
                  </div>
                  <Button asChild className="mt-7 w-fit" variant="outline">
                    <Link to={`/blog/${featured.slug}`}>Read article <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </Card>
            </Reveal>
          </section>

          {rest.length > 0 && (
            <section className="container-wide pb-20">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.05}>
                    <Link to={`/blog/${p.slug}`} className="block h-full">
                      <Card className="group flex h-full flex-col overflow-hidden border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elevated">
                        <div className="aspect-[16/9] overflow-hidden bg-gradient-mesh">
                          {p.cover_image_url && (
                            <img src={p.cover_image_url} alt={p.title} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                          {p.excerpt && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>}
                          <div className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
                            {fmt(p.published_at)}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Blog;
