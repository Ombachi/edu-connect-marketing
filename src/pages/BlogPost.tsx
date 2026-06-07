import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { readingMinutes } from "@/lib/reading";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  category: string | null;
  tags: string[] | null;
  author_name: string | null;
  author_role: string | null;
  author_bio: string | null;
  author_avatar_url: string | null;
};

type RelatedPost = Pick<Post, "id" | "slug" | "title" | "excerpt" | "cover_image_url" | "category">;

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

const initials = (n: string | null) =>
  n ? n.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase() : "LH";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,content,cover_image_url,meta_title,meta_description,published_at,category,tags,author_name,author_role,author_bio,author_avatar_url")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setPost(data as Post | null);
      setLoading(false);

      if (data) {
        const p = data as Post;
        let q = supabase
          .from("blog_posts")
          .select("id,slug,title,excerpt,cover_image_url,category")
          .eq("status", "published")
          .neq("id", p.id)
          .limit(3);
        if (p.category) q = q.eq("category", p.category);
        const { data: rel } = await q.order("published_at", { ascending: false });
        setRelated((rel as RelatedPost[]) ?? []);
      }
    })();
  }, [slug]);

  if (loading) return <div className="container-wide py-20 text-sm text-muted-foreground">Loading…</div>;

  if (!post) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Post not found</h1>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/blog"><ArrowLeft className="h-4 w-4" /> Back to blog</Link>
        </Button>
      </div>
    );
  }

  const minutes = readingMinutes(post.content);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.meta_description || "",
    datePublished: post.published_at,
    image: post.cover_image_url || undefined,
    author: post.author_name ? { "@type": "Person", name: post.author_name } : undefined,
    articleSection: post.category || undefined,
    keywords: post.tags?.join(", ") || undefined,
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: "/blog" },
      { "@type": "ListItem", position: 2, name: post.title, item: `/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        path={`/blog/${post.slug}`}
        image={post.cover_image_url ?? undefined}
        jsonLd={[articleLd, crumbLd]}
      />
      <article className="container-wide max-w-3xl py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink>
            </BreadcrumbItem>
            {post.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/blog">{post.category}</Link></BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {post.category && <Badge variant="secondary" className="mb-4">{post.category}</Badge>}
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{fmt(post.published_at)}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{minutes} min read</span>
        </div>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
          />
        )}

        <div
          className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</span>
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">#{t}</span>
            ))}
          </div>
        )}

        {post.author_name && (
          <Card className="mt-10 flex flex-col items-start gap-4 border-border bg-secondary/40 p-6 sm:flex-row sm:items-center">
            <Avatar className="h-14 w-14">
              {post.author_avatar_url && <AvatarImage src={post.author_avatar_url} alt={post.author_name} />}
              <AvatarFallback>{initials(post.author_name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-display text-base font-semibold">{post.author_name}</p>
              {post.author_role && <p className="text-sm text-muted-foreground">{post.author_role}</p>}
              {post.author_bio && <p className="mt-2 text-sm leading-relaxed text-foreground">{post.author_bio}</p>}
            </div>
          </Card>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-xl font-semibold">Related articles</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group block">
                  <Card className="h-full overflow-hidden border-border transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                    {r.cover_image_url && (
                      <div className="aspect-[16/9] overflow-hidden bg-gradient-mesh">
                        <img src={r.cover_image_url} alt={r.title} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="p-4">
                      {r.category && <Badge variant="secondary" className="mb-2 text-[10px]">{r.category}</Badge>}
                      <h3 className="text-sm font-semibold group-hover:text-primary">{r.title}</h3>
                      {r.excerpt && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.excerpt}</p>}
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default BlogPost;
