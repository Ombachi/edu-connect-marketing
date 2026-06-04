import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("help_articles")
        .select("id,slug,title,category,excerpt,content,updated_at")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      setArticle(data as Article | null);
      setLoading(false);
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

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt || article.title}
        path={`/help/${article.slug}`}
      />
      <article className="container-wide max-w-3xl py-16">
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link to="/help"><ArrowLeft className="h-4 w-4" /> Help Center</Link>
        </Button>

        <Badge variant="secondary" className="mb-4">{article.category}</Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{article.title}</h1>
        {article.excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>
        )}

        <div
          className="prose prose-neutral dark:prose-invert mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </>
  );
};

export default HelpArticle;
