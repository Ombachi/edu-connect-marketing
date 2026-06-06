import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  content: string;
  updated_at: string;
};

const HelpArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Pick<Article, "id" | "slug" | "title" | "excerpt">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      setLoading(true);
      const { data } = await supabase
        .from("help_articles")
        .select("id,slug,title,category,excerpt,content,updated_at")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setArticle(data as Article | null);
      setLoading(false);

      if (data) {
        const { data: rel } = await supabase
          .from("help_articles")
          .select("id,slug,title,excerpt")
          .eq("status", "published")
          .eq("category", (data as Article).category)
          .neq("id", (data as Article).id)
          .order("order_index", { ascending: true })
          .limit(3);
        setRelated((rel as typeof related) ?? []);
      }
    })();
  }, [slug]);

  if (loading) return <div className="container-wide py-20 text-sm text-muted-foreground">Loading…</div>;

  if (!article) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Article not found</h1>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/help"><ArrowLeft className="h-4 w-4" /> Back to Help Center</Link>
        </Button>
      </div>
    );
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || article.title,
    dateModified: article.updated_at,
    articleSection: article.category,
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Help Center", item: "/help" },
      { "@type": "ListItem", position: 2, name: article.category, item: "/help" },
      { "@type": "ListItem", position: 3, name: article.title, item: `/help/${article.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt || article.title}
        path={`/help/${article.slug}`}
        jsonLd={[articleLd, crumbLd]}
      />
      <article className="container-wide max-w-3xl py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/help">Help Center</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/help">{article.category}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{article.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Badge variant="secondary" className="mb-4">{article.category}</Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
        {article.excerpt && <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>}

        <div
          className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-xl font-semibold">Related articles</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} to={`/help/${r.slug}`} className="group">
                  <Card className="h-full border-border p-5 transition-colors hover:bg-secondary/40">
                    <h3 className="text-sm font-semibold group-hover:text-primary">{r.title}</h3>
                    {r.excerpt && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.excerpt}</p>}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      Read article <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Card className="mt-12 flex flex-col items-start gap-4 border-border bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Still need help?</p>
              <p className="text-sm text-muted-foreground">Our Nairobi team typically replies within 24 hours.</p>
            </div>
          </div>
          <Button asChild><Link to="/demo">Contact support</Link></Button>
        </Card>
      </article>
    </>
  );
};

export default HelpArticle;
